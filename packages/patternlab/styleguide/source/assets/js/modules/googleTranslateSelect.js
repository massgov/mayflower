(function() {
  const translateContainers = Array.from(document.querySelectorAll('.ma__translate-container'));

  if (!translateContainers.length) {
    return;
  }

  const translateControls = translateContainers
    .map((container) => {
      const languageSelect = container.querySelector('.ma__translate-select');
      const applyButton = container.querySelector('.ma__translate-button:not(.ma__translate-reset-button)');
      const resetButton = container.querySelector('.ma__translate-reset-button');
      const statusMessage = container.parentElement
        ? container.parentElement.querySelector('.ma__status-message')
        : null;

      if (!languageSelect || !applyButton || !resetButton) {
        return null;
      }

      return {
        languageSelect,
        applyButton,
        resetButton,
        statusMessage
      };
    })
    .filter(Boolean);

  if (!translateControls.length) {
    return;
  }

  const primaryControls = translateControls[0];
  const languageData = Array.from(primaryControls.languageSelect.options).reduce((accumulator, option) => {
    accumulator[option.value] = option.text;
    return accumulator;
  }, {});

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

  function syncSelectValue(selectedLanguage) {
    translateControls.forEach(({ languageSelect }) => {
      languageSelect.value = selectedLanguage;

      const options = languageSelect.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === selectedLanguage) {
          options[i].setAttribute('selected', 'selected');
        } else {
          options[i].removeAttribute('selected');
        }
      }
    });
  }

  function updateStatusMessages(message) {
    translateControls.forEach(({ statusMessage }) => {
      if (statusMessage) {
        statusMessage.textContent = message;
      }
    });
  }

  function initializeLanguageSelects() {
    if (!hasInitialized) {
      const optionExists = Array.from(primaryControls.languageSelect.options).some(opt => opt.value === currentLanguageCode);

      if (!optionExists) {
        console.warn(`Language code "${currentLanguageCode}" not found in dropdown. Defaulting to original page language.`);
        currentLanguageCode = originalPageLang;
      }

      syncSelectValue(currentLanguageCode);

      document.documentElement.lang = currentLanguageCode;
      hasInitialized = true;
    }
  }

  initializeLanguageSelects();

  setTimeout(() => {
    if (document.documentElement.lang === 'auto') {
      document.documentElement.lang = currentLanguageCode;
      console.log(`Corrected lang attribute from "auto" to "${currentLanguageCode}"`);
    }
  }, 100);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSelects);
  }

  translateControls.forEach(({ languageSelect, applyButton, resetButton }) => {
    applyButton.addEventListener('click', function() {
      const selectedLanguage = languageSelect.value;
      const selectedText = languageData[selectedLanguage] || selectedLanguage;

      if (selectedLanguage === currentLanguageCode) {
        updateStatusMessages(`Already displaying in ${selectedText}`);
        return;
      }

      currentLanguageCode = selectedLanguage;
      syncSelectValue(selectedLanguage);

      if (selectedLanguage === originalPageLang) {
        resetToOriginalLanguage();
      } else {
        triggerGoogleTranslate(selectedLanguage, selectedText);
      }
    });

    resetButton.addEventListener('click', function() {
      resetToOriginalLanguage();
    });

    languageSelect.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyButton.click();
      }
    });
  });

  function setButtonState(buttonTextOverrides = {}) {
    translateControls.forEach(({ applyButton, resetButton }) => {
      applyButton.disabled = Boolean(buttonTextOverrides.applyDisabled);
      resetButton.disabled = Boolean(buttonTextOverrides.resetDisabled);

      if (buttonTextOverrides.applyText) {
        applyButton.textContent = buttonTextOverrides.applyText;
      }

      if (buttonTextOverrides.resetText) {
        resetButton.textContent = buttonTextOverrides.resetText;
      }
    });
  }

  function resetToOriginalLanguage() {
    document.documentElement.lang = originalPageLang;
    syncSelectValue(originalPageLang);

    const originalLangName = languageData[originalPageLang] || originalPageLang;
    updateStatusMessages(`Resetting to original language: ${originalLangName}`);

    setButtonState({
      applyDisabled: true,
      resetDisabled: true,
      resetText: 'Resetting...'
    });

    clearAllGoogleTranslateCookies();

    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  function triggerGoogleTranslate(langCode, langName) {
    document.documentElement.lang = langCode;
    updateStatusMessages(`Changing page language to ${langName}`);

    setButtonState({
      applyDisabled: true,
      applyText: 'Translating...'
    });

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
