export default (function (window, document) {

  const tocs = Array.from(document.getElementsByClassName("ma__sticky-toc"));
  tocs.forEach((toc) => {
    // The container for the links in the table of contents.
    const tocContent = toc.querySelector(".ma__sticky-toc__links");
    // The parent that should be checked for sections.
    const tocParent = toc.closest(toc.dataset.parent);
    let tocSections = {
      headings: tocParent.querySelectorAll(toc.dataset.sections + ":not(.ma__sticky-toc__title)"),
      links: []
    };

    let tocSectionCount = tocSections.headings.length;
    var additionalCount = 0;
    var i;
    var totalSections = tocSectionCount;

    // Remove Related and Contact sections from total amount of sections.
    for (i = 0; i < tocSectionCount; i++) {
      if (tocSections.headings[i].innerText.toLowerCase() == "related" || tocSections.headings[i].innerText.toLowerCase() == "contact") {
        totalSections--;
      }
    };
    tocSectionCount = totalSections;
    // Another wrapper around the links, probably originally to put the links in two columns.
    const tocColumn = toc.querySelector(".ma__sticky-toc__column");
    // Container in the sticky header to hold the current sections header.
    const stickyToc = toc.querySelector(".ma__sticky-toc__current-section");
    // The minimum number of sections required on the page to display the table of contents.
    const minSectionsToShow = toc.dataset["min-to-show"] ? toc.dataset["min-to-show"] : 2;
    // The overlay div that shows when the stuck menu is shown.
    const stuckOverlay = toc.querySelector(".ma__sticky-toc__overlay");
    // The stuck header.
    const stuckNav = toc.querySelector(".ma__sticky-toc__stuck");
    // The menu that slides out after the sticky menu is clicked.
    let stuckMenu;
    let pauseScroll = false;

    // Initialize the TOC by creating links and target spans.
    function initializeToc() {
      // Add a class to the parent to help with consistent handling across applications.
      tocParent.classList.add("toc-parent");
      // Use headers to fill TOC.
      Array.from(tocSections.headings).forEach((section) => {
        let sectionId = section.id;
        const sectionTitle = section.innerHTML;
        // If the section doesn't have an ID, create one from the heading text.
        if (!sectionId) {
          sectionId = section.textContent.replace(/\s+/g, "-").toLowerCase();
        }
        // Create a link for the sticky TOC.
        const tocLink = document.createElement("div");
        tocLink.className = "ma__sticky-toc__link";
        tocLink.innerHTML = `<a href="#${sectionId}"><svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"35\" height=\"35\" viewBox=\"0 0 35 35\"><path class=\"st0\" d=\"M17.5 35C7.8 35 0 27.2 0 17.5 0 7.8 7.8 0 17.5 0 27.2 0 35 7.8 35 17.5 35 27.2 27.2 35 17.5 35zM16 9l-3 2.9 5.1 5.1L13 22.1l3 2.9 8-8L16 9z\"/></svg>${sectionTitle}</a>`;
        tocColumn.appendChild(tocLink);
        tocSections.links.push(tocLink);

        // To scroll all the way to the heading would make the heading covered by the sticky header.
        // Instead, add a span that will be invisible, but be placed above each heading as the scroll target.
        const dest = document.createElement("span");
        dest.className = "sticky-toc-jump-target";
        dest.id = sectionId;

        section.id = "";
        section.parentElement.insertBefore(dest, section);
      });
    }

    // Set the various visibility rules.
    function handleResize() {
      tocSectionCount = 0;
      additionalCount = 0;
      Array.from(tocSections.headings).forEach((heading, index) => {
        // If the section isn't visible, set the link not to display.
        const isVisible = heading.offsetHeight * heading.offsetWidth;
        if (isVisible) {
          tocSections.links[index].style.display = "";
          // If the section is the related or contact sections we don't want to count those.
          if ((heading.innerText.toLowerCase() != 'related') && (heading.innerText.toLowerCase() != 'contact')) {
            tocSectionCount++;
          }
          else if (heading.innerText.toLowerCase() == 'contact') {
            additionalCount++;
          }
        }
        else {
          tocSections.links[index].style.display = "none";
        }
      });

      // Get the final count of sections we'll use to determine if we display.
      if ((tocSectionCount >= 1) && (additionalCount >= 1)) {
        tocSectionCount = tocSectionCount + additionalCount;
      }

      // Remove wrapper if not enough links.
      if (tocSectionCount < minSectionsToShow) {
        toc.style.display = "none";
      }
      else {
        // To set an overflow rule for jumpy IE wrapping
        document.documentElement.classList.add("stickyTOC");
        toc.style.display = "block";
      }

      // Show expander when more than 10 links.
      if (tocSectionCount <= 9 && window.innerWidth > 480 ) {
        toc.querySelector(".ma__sticky-toc__footer").style.display = "none";
      }
    }

    // Add the event listeners to handle all of the interaction.
    function setEventListeners() {
      // Update the sticky header text when a link is clicked, even if another header is visible.
      tocParent.addEventListener("click", (e) => {
        if (e.target.matches(".ma__sticky-toc__link a").textContent) {
          pauseScroll = true;
          setTimeout(() => { pauseScroll = false; }, 20);
          stickyToc.innerHTML = e.target.innerHTML;
          toc.classList.add("stuck");
        }
      }, true);

      // Toggle mobile TOC open.
      toc.querySelector(".ma__sticky-toc__toggle-link").addEventListener("click", () => {
        tocContent.classList.toggle("is-open");
        // Update aria-expanded.
        const tocButton  = document.querySelector(".ma__sticky-toc__toggle-link");
        let expanderState = tocButton.getAttribute('aria-expanded') === 'true' ? (tocButton.setAttribute('aria-expanded', 'false')) : (tocButton.setAttribute('aria-expanded', 'true'));
        // Button label for screen reader.
        const popupLabel = tocButton.querySelector(".js-sticky-toc__state");
        let popupLabelContent = popupLabel.innerHTML === "Show" ? popupLabel.innerHTML = "Hide" : popupLabel.innerHTML= "Show";
      });

      // Expander for additional links to show.
      toc.querySelector(".ma__sticky-toc__footer button").addEventListener("click", function() {
        // Toggle hidden links open.
        tocContent.classList.toggle("open");
        this.classList.toggle("open");

        // Toggle button text.
        this.textContent = (this.textContent === "show less" ? "show more" : "show less");
      });

      // Handle window resize events.
      window.addEventListener("resize", () => {
        // Reset menu for each form factor on resize.
        const button = toc.querySelector(".ma__sticky-toc__footer button");
        tocContent.classList.remove("open");
        button.classList.remove("open");
        button.textContent = "show more";
        // Reset visibility.
        handleResize();
      });

      // Handler for showing or hiding the sticky TOC.
      window.addEventListener("scroll", () => {
        if (!pauseScroll) {
          const windowTop = window.pageYOffset;
          const windowBottom = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const stickyNavDemensions = toc.getBoundingClientRect();
          const stickyNavActive  = stickyNavDemensions.top + stickyNavDemensions.height;
          const stuckNavDemensions = stuckNav.getBoundingClientRect();
          const stuckNavBottom = stuckNavDemensions.top + stuckNavDemensions.height;
          // The text of the last heading.
          const lastHeading = tocSections.headings[tocSectionCount - 1].innerHTML;

          // Active Sticky TOC when on page TOC scrolls past.
          if (stickyNavActive > 0) {
            toc.classList.remove("stuck");
          }
          else {
            toc.classList.add("stuck");

            // Force showing the last heading if we are at the bottom of the page.
            if (windowTop + windowBottom === docHeight) {
              stickyToc.innerHTML = lastHeading;
            }
            else {
              // Identify the section to show for the heading.
              const active = Array.from(tocSections.headings).reverse().find((section) => {
                const top = section.getBoundingClientRect().top;
                return top <= stuckNavBottom;
              });
              if (active) {
                stickyToc.innerHTML = active.innerHTML;
              }
            }
          }
        }
      });

      // Back to top button in the sticky header.
      toc.querySelector(".stickyTOC-top").addEventListener("click", (e) => {
        e.preventDefault();
        window.scroll({top: 0, left: 0, behavior: "smooth"});
        tocParent.focus();
      });

      // Add and/or open the sticky table of contents when the button is clicked.
      toc.querySelector(".stickyTOC-open").addEventListener("click", () => {
        // Append sticky menu when first called
        if (typeof stuckMenu === "undefined") {
          const menuCopy = tocColumn.cloneNode(true);
          menuCopy.classList.add("ma__sticky-toc__stuck-menu");
          stuckMenu = tocParent.appendChild(menuCopy);

          // Move focus from the button.stickyTOC-open to the flyout toc
          focusSwitch();

          // When the last item in the TOC flyout is tabbed, focus is set on the first focusable element in the flyout container.
          stuckMenu.lastChild.getElementsByTagName("a")[0].addEventListener("keyup", (e) => {
            stuckMenu.querySelector(".secondary-label-close").focus();
          });

          // Close button.
          stuckMenu.querySelector(".secondary-label-close").addEventListener("click", () => {
            menuToggle();
            // Move the focus to the Table of Contents button.
            toc.querySelector(".stickyTOC-open").focus();
            stuckMenu.setAttribute("tabindex", "-1");
          });

          // Wait a beat so the slide in can work on first click.
          setTimeout(() => {
            menuToggle();
          }, 100);
        }
        else {
          menuToggle();
          focusSwitch();
        }
      });

      // Close sticky menu on click off or link click.
      document.body.addEventListener("click", (e) => {
        if (!e.target.matches(".ma__sticky-toc__stuck-menu")
          && (e.target.closest(".ma__sticky-toc__stuck-menu") === null
          || e.target.matches(".ma__sticky-toc__stuck-menu a"))) {
          if (typeof stuckMenu !== "undefined" && stuckMenu.matches(".sticky-nav-open")) {
            menuToggle();
          }
        }
      }, true);
    }

    // The toggle function to show hide the slide out menu.
    function menuToggle() {
      stuckMenu.classList.toggle("sticky-nav-open");
      stuckOverlay.style.display = stuckOverlay.style.display === "block" ? "none" : "block";
    }

    // Move focus from the button.stickyTOC-open to the flyout toc
    function focusSwitch() {
      stuckMenu.setAttribute("tabindex", "0");
      stuckMenu.focus();
    }

    initializeToc();
    handleResize();
    if (tocSectionCount > 0) {
      setEventListeners();
    }
  });
})(window, document);
