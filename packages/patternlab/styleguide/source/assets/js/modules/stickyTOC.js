export default (function (window, document) {

  const tocs = Array.from(document.getElementsByClassName("ma__sticky-toc"));
  tocs.forEach((toc) => {
    // The container for the links in the table of contents.
    const tocContent = toc.querySelector(".ma__sticky-toc__links");
    // The parent that should be checked for sections.
    const tocParent = toc.closest(toc.dataset.parent);
    const tocSectionHeadings= Array.from(tocParent.querySelectorAll(toc.dataset.sections + ":not(.ma__sticky-toc__title)"));
    let tocSections = {
      headings: tocSectionHeadings,
      links: []
    };

    let tocSectionCount = tocSections.headings.length;
    var i;
    var totalSections = tocSectionCount;


    // Remove Related and Contact sections from total amount of sections.
    for (i = 0; i < tocSectionCount; i++) {
      // Remove visually hidden elements from the heading
      tocSections.headings[i].querySelectorAll('.ma__visually-hidden').forEach((hidden) => hidden.remove());

      // Get the cleaned text content
      const headingText = tocSections.headings[i].textContent.trim().toLowerCase();
      // Check for "Related" or "Contact" and update totalSections
      if (headingText == "related" || headingText == "contact") {
        totalSections--;
      }
    }
    tocSectionCount = totalSections;
    // Another wrapper around the links, probably originally to put the links in two columns.
    const tocColumn = toc.querySelector(".ma__sticky-toc__column");
    // List container for links
    const tocListContainer = toc.querySelector(".ma__sticky-toc__column ul");
    // Container in the sticky header to hold the current sections header.
    const stickyToc = toc.querySelector(".ma__sticky-toc__current-section");
    // The minimum number of sections set by data
    const minToShow = Number(toc.getAttribute('data-min-to-show'))
    // The minimum number of sections required on the page to display the table of contents, default to 2.
    const minSectionsToShow = minToShow || 3;
    // The overlay div that shows when the stuck menu is shown.
    const stuckOverlay = toc.querySelector(".ma__sticky-toc__overlay");
    // The stuck header.
    const stuckNav = toc.querySelector(".ma__sticky-toc__stuck");
    // The menu that slides out after the sticky menu is clicked.
    let stuckMenu;
    let pauseScroll = false;

    // Initialize the TOC by creating links and target spans.
    function initializeToc() {
      // To set an overflow rule for jumpy IE wrapping
      document.documentElement.classList.add("stickyTOC");
      toc.style.display = "block";
      // Add a class to the parent to help with consistent handling across applications.
      tocParent.classList.add("toc-parent");
      // Use headers to fill TOC.
      Array.from(tocSections.headings).forEach((section, index) => {
        let sectionId = section.id;
        // Remove span element before passing to the a tag.
        if (section.querySelector('span.ma__visually-hidden') !== null) {
          section.querySelector('span.ma__visually-hidden').remove();
        }
        const sectionTitle = section.innerText;
        const titleCheck = sectionTitle.trim();
        if (titleCheck.length == 0 || titleCheck.toLowerCase() == 'related') {
          tocSections.headings.splice(index, 1);
          return;
        }

        // If the section doesn't have an ID, create one from the heading text.
        if (!sectionId) {
              sectionId = section.textContent.replace(/\s+/g, "-").toLowerCase();
          }
        // A section ID is needed to become the target for a link.
        section.id = sectionId;
        // Class to identify a section to style it properly and avoid
        // toolbars to cover the section when clicked.
        section.classList.add("sticky-toc-jump-target");

        // Create a link for the sticky TOC.
        const tocLink = document.createElement("li");
        tocLink.className = "ma__sticky-toc__link";
        tocLink.setAttribute("data-link", `#${sectionId}`);
        tocLink.setAttribute("role", "none");
        tocLink.innerHTML = `<a href="#${sectionId}" role="menuitem"><svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"35\" height=\"35\" viewBox=\"0 0 35 35\"><path class=\"st0\" d=\"M17.5 35C7.8 35 0 27.2 0 17.5 0 7.8 7.8 0 17.5 0 27.2 0 35 7.8 35 17.5 35 27.2 27.2 35 17.5 35zM16 9l-3 2.9 5.1 5.1L13 22.1l3 2.9 8-8L16 9z\"/></svg>${sectionTitle}</a>`;
        tocListContainer.appendChild(tocLink);
        tocSections.links.push(tocLink);

      });
    }

    // Set the various visibility rules.
    function handleResize() {
      tocSectionCount = 0;
      Array.from(tocSections.headings).forEach((heading, index) => {
        // If the section isn't visible, set the link not to display.
        const isVisible = heading.offsetHeight * heading.offsetWidth;
        if (isVisible) {
          tocSections.links[index].style.display = "";
          // If the section is the related or contact sections we don't want to count those.
          if ((heading.innerText.toLowerCase() != 'related')) {
            tocSectionCount++;
          }
          else {
            tocSections.links[index].style.display = "none";
          }
        }
        else {
          tocSections.links[index].style.display = "none";
        }
      });

      // Show expander when more than 10 links.
      if (tocSectionCount <= 10 && window.innerWidth > 480 ) {
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
        // When .ma__sticky-toc__link or icon is clicked.
        if (e.target.hasAttribute("data-link")) {
          pauseScroll = true;
          setTimeout(() => { pauseScroll = false; }, 20);
          stickyToc.innerHTML = e.target.querySelector("a").textContent;
          toc.classList.add("stuck");
        }
      }, true);

      // Toggle mobile TOC open.
      toc.querySelector(".ma__sticky-toc__toggle-link").addEventListener("click", () => {
        tocContent.classList.toggle("is-open");
        // Update aria-expanded.
        const tocButton  = document.querySelector(".ma__sticky-toc__toggle-link");
        let expanderState = tocButton.getAttribute('aria-expanded') === 'true' ? (tocButton.setAttribute('aria-expanded', 'false')) : (tocButton.setAttribute('aria-expanded', 'true'));
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

          const lastSection = tocSections.headings[tocSectionCount - 1];
          let lastHeading = null;
          if (lastSection) {
           lastHeading = lastSection.innerHTML;
          }

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
          stuckMenu.querySelector("ul li:last-of-type a").addEventListener("keyup", (e) => {
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
        || e.target.matches(".ma__sticky-toc__stuck-menu a")
        || e.target.matches(".ma__sticky-toc__stuck-menu .ma__sticky-toc__link"))) {
          if (typeof stuckMenu !== "undefined" && stuckMenu.matches(".sticky-nav-open")) {
            // Add a open-link feature with clicking item container.
            const clicked = e.target;
            if ( clicked.matches(".ma__sticky-toc__link")) {
              window.location = clicked.getAttribute("data-link");
            }
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

    // Do not render or intialize the TOC if sections don't reach the mininum requirement.
    if (tocSectionCount >= minSectionsToShow) {
      initializeToc();
      handleResize();
      setEventListeners();
    } else {
      toc.style.display = "none";
    }
  });
})(window, document);
