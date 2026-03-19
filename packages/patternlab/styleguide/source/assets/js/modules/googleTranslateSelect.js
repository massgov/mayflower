(function() {
  const languageSelect = document.getElementById('ma__translate-select');
  const applyButton = document.getElementById('ma__translate-apply');
  const resetButton = document.getElementById('ma__translate-reset');
  const statusMessage = document.getElementById('ma__translate-status');

  const languageData = Array.from(languageSelect.options, option => [ option.value, option.text ]);

  // Store the original page language
  const ORIGINAL_LANG_COOKIE = 'original_page_lang';

  function getOriginalPageLanguage() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === ORIGINAL_LANG_COOKIE) {
        return value;
      }
    }

    let originalLang = window.originalPageLang || 'en';

    if (!window.originalPageLang || window.originalPageLang.trim() === '') {
      console.log('Warning: HTML tag is missing lang attribute. Defaulting to "en" (English). Please add lang attribute to <html> tag for proper accessibility.');
      originalLang = 'en';
    }

    const cookieDomain = getCookieDomain();
    const maxAge = 60 * 60 * 24 * 365;

    if (cookieDomain) {
      document.cookie = `${ORIGINAL_LANG_COOKIE}=${originalLang}; path=/; domain=${cookieDomain}; max-age=${maxAge}; SameSite=Lax`;
    } else {
      document.cookie = `${ORIGINAL_LANG_COOKIE}=${originalLang}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }

    return originalLang;
  }

  const originalPageLang = getOriginalPageLanguage();

  function getCookieDomain() {
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      return null;
    }

    const parts = hostname.split('.');

    if (parts.length <= 2) {
      return `.${hostname}`;
    }

    return `.${parts.slice(-2).join('.')}`;
  }

  function getCurrentLanguage() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'googtrans') {
        const match = value.match(/\/[^\/]+\/(.+)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }

    return originalPageLang;
  }

  let currentLanguageCode = getCurrentLanguage();
  let hasInitialized = false;

  function initializeLanguageSelect() {
    if (!hasInitialized) {

      const optionExists = Array.from(languageSelect.options).some(opt => opt.value === currentLanguageCode);

      if (!optionExists) {
        console.warn(`Language code "${currentLanguageCode}" not found in dropdown. Defaulting to original page language.`);
        currentLanguageCode = originalPageLang;
      }

      languageSelect.value = currentLanguageCode;

      const options = languageSelect.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === currentLanguageCode) {
          options[i].setAttribute('selected', 'selected');
        } else {
          options[i].removeAttribute('selected');
        }
      }

      document.documentElement.lang = currentLanguageCode;
      hasInitialized = true;
    }
  }

  initializeLanguageSelect();

  setTimeout(() => {
    if (document.documentElement.lang === 'auto') {
      document.documentElement.lang = currentLanguageCode;
      console.log(`Corrected lang attribute from "auto" to "${currentLanguageCode}"`);
    }
  }, 100);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSelect);
  }

  applyButton.addEventListener('click', function() {
    const selectedLanguage = languageSelect.value;
    const langInfo = languageData[selectedLanguage];
    const selectedText = langInfo ? langInfo : selectedLanguage;

    if (selectedLanguage === currentLanguageCode) {
      statusMessage.textContent = `Already displaying in ${selectedText}`;
      return;
    }

    currentLanguageCode = selectedLanguage;

    if (selectedLanguage === originalPageLang) {
      resetToOriginalLanguage();
    } else {
      triggerGoogleTranslate(selectedLanguage, selectedText);
    }
  });

  resetButton.addEventListener('click', function() {
    resetToOriginalLanguage();
  });

  function resetToOriginalLanguage() {
    document.documentElement.lang = originalPageLang;

    const originalLangData = languageData[originalPageLang];
    const originalLangName = originalLangData ? originalLangData : originalPageLang;
    statusMessage.textContent = `Resetting to original language: ${originalLangName}`;

    applyButton.disabled = true;
    resetButton.disabled = true;
    resetButton.textContent = 'Resetting...';

    clearAllGoogleTranslateCookies();

    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  languageSelect.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyButton.click();
    }
  });

  function triggerGoogleTranslate(langCode, langName) {
    document.documentElement.lang = langCode;
    statusMessage.textContent = `Changing page language to ${langName}`;

    applyButton.disabled = true;
    applyButton.textContent = 'Translating...';

    const cookieDomain = getCookieDomain();
    const cookieValue = `/${originalPageLang}/${langCode}`;
    const maxAge = 60 * 60 * 24 * 365;

    clearAllGoogleTranslateCookies();

    setTimeout(() => {
      if (cookieDomain) {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${cookieDomain}; max-age=${maxAge}; SameSite=Lax`;
      } else {
        document.cookie = `googtrans=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax`;
      }

      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 150);
  }

  function clearAllGoogleTranslateCookies() {
    const cookieDomain = getCookieDomain();
    const hostname = window.location.hostname;

    const cookies = document.cookie.split(';');
    const googtransCookies = cookies.filter(c => c.trim().startsWith('googtrans='));

    googtransCookies.forEach(() => {
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      document.cookie = `googtrans=; path=/; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

      if (cookieDomain) {
        document.cookie = `googtrans=; path=/; domain=${cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      }
    });
  }

  function monitorAndCleanCookies() {
    const cookieDomain = getCookieDomain();
    const hostname = window.location.hostname;

    setInterval(() => {
      const cookies = document.cookie.split(';');
      let googtransCount = 0;
      let rootDomainCookieValue = null;

      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'googtrans' && value) {
          googtransCount++;
          if (googtransCount === 1) {
            rootDomainCookieValue = value;
          }
        }
      });

      if (googtransCount > 1 && rootDomainCookieValue) {
        document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        document.cookie = `googtrans=; path=/; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        if (cookieDomain) {
          document.cookie = `googtrans=; path=/; domain=${cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        }

        setTimeout(() => {
          if (cookieDomain) {
            document.cookie = `googtrans=${rootDomainCookieValue}; path=/; domain=${cookieDomain}; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
          } else {
            document.cookie = `googtrans=${rootDomainCookieValue}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
          }
        }, 50);
      }
    }, 500);
  }

  monitorAndCleanCookies();

  function addLangToNotranslateElements() {
    const notranslateByClass = document.querySelectorAll('.notranslate');
    notranslateByClass.forEach(element => {
      if (!element.hasAttribute('lang')) {
        element.setAttribute('lang', originalPageLang);
      }
    });

    const notranslateByAttribute = document.querySelectorAll('[translate="no"]');
    notranslateByAttribute.forEach(element => {
      if (!element.hasAttribute('lang')) {
        element.setAttribute('lang', originalPageLang);
      }
    });
  }

  addLangToNotranslateElements();

  const observer = new MutationObserver(() => {
    addLangToNotranslateElements();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();