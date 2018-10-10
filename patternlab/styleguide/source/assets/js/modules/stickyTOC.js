export default (function (window,document,$,undefined) {

  const tocs = Array.from(document.getElementsByClassName("ma__sticky-toc"));
  tocs.forEach((toc) => {
    // The container for the links in the table of contents.
    const tocContent = toc.querySelector(".ma__sticky-toc__links");
    // The parent that should be checked for sections.
    const tocParent = toc.closest(toc.dataset.parent);
    // The destinations for each table of content link.
    const tocSections = tocParent.querySelectorAll(toc.dataset.sections);
    // The number of sections / links.
    const tocSectionCount = tocSections.length;
    // The text of the last heading.
    const lastHeading = tocSections[tocSectionCount - 1].textContent;
    // Another wroapper around the links, probably originally to put the links in two columns.
    const tocColumn = toc.querySelector(".ma__sticky-toc__column");
    // Container in the sticky header to hold the current sections header.
    const stickyToc = toc.querySelector(".ma__sticky-toc__current-section");
    // The minimum number of sections required on the page to display the table of contents.
    const minSectionsToShow = toc.dataset["min-to-show"];
    // The overlay div that shows when the stuck menu is shown.
    const stuckOverlay = toc.querySelector(".ma__sticky-toc__overlay");
    // The menu that slides out after the sticky menu is clicked.
    let stuckMenu;
    

    // Remove wrapper if not enough links.
    if (minSectionsToShow && (tocSectionCount < minSectionsToShow) || !minSectionsToShow && tocSectionCount < 3 ) {
      toc.parentElement.removeChild(toc);
    }
    else {
      // To set an overflow rule for jumpy IE wrapping
      document.firstElementChild.classList.add('stickyTOC');
    }
    // Show expander when more than 10 links.
    if (tocSectionCount <= 10 && window.innerWidth > 480 ) {
      toc.querySelector(".ma__sticky-toc__footer").style.display = 'none';
    }

    // Use headers to fill TOC.
    Array.from(tocSections).forEach((section) => {
      let sectionId = section.id;
      let sectionTitle = section.textContent;
      if (!sectionId) {
        sectionId = sectionTitle.replace(/\s+/g, '-').toLowerCase();
      }
      const tocLink = document.createElement('div');
      tocLink.className = "ma__sticky-toc__link";
      tocLink.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"35\" height=\"35\" viewBox=\"0 0 35 35\"><path class=\"st0\" d=\"M17.5 35C7.8 35 0 27.2 0 17.5 0 7.8 7.8 0 17.5 0 27.2 0 35 7.8 35 17.5 35 27.2 27.2 35 17.5 35zM16 9l-3 2.9 5.1 5.1L13 22.1l3 2.9 8-8L16 9z\"/></svg><a href="#${sectionId}" >${sectionTitle}</a>`;
      const dest = document.createElement('span');
      dest.className = "sticky-toc-jump-target";
      dest.id = sectionId;

      section.id = "";
      section.parentElement.prepend(dest);
      tocColumn.appendChild(tocLink);
    });

    tocParent.addEventListener("click", (e) => {
      if (e.target.matches(".ma__sticky-toc__link a")) {
        stickyToc.textContent = e.target.textContent;
      }
    }, true);

    // Toggle mobile TOC open.
    toc.querySelector(".ma__sticky-toc__toggle-link").addEventListener("click", () => {
      tocContent.classList.toggle("is-open");
    });

    toc.querySelector(".ma__sticky-toc__footer").addEventListener("click", () => {
      const button = this.firstChild;

      // Toggle hidden links open.
      tocContent.classList.toggle("open");
      button.classList.toggle("open");

      // Toggle button text.
      button.textContent = (button.textContent === "show less" ? "show more" : "show less");
    });

    window.addEventListener("resize", () => {
      const button = toc.querySelector(".ma__sticky-toc__footer button");
      // Reset menu for each form factor on resize.
      tocContent.classList.remove("open");
      button.classList.remove("open");
      button.textContent = "show more";
    });

    window.addEventListener("scroll", () => {
      const windowTop = window.pageYOffset;
      const windowBottom = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const stickyNavActive  = toc.offsetTop + toc.offsetHeight;

      // Active Sticky TOC when on page TOC scrolls past.
      if (stickyNavActive > windowTop) {
        toc.classList.remove("stuck");
      }
      else {
        toc.classList.add("stuck");

        if (windowTop + windowBottom === docHeight) {
          stickyToc.textContent = lastHeading;
        }
        else {
          // Identify the section to show for the heading.
          const active = Array.from(tocSections).reverse().find((section) => {
            const target = section.parentElement.querySelector(".sticky-toc-jump-target");
            const top = target.getBoundingClientRect().top;
            return top < 10;
          });
          stickyToc.textContent = active.textContent;
        }
      }
    });
    // Back to top button
    toc.querySelector(".stickyTOC-top").addEventListener("click", (e) => {
      e.preventDefault();
      try {
        $("html, body").stop(true,true).animate({scrollTop:0}, '750');
      }
      catch(e) {
        $('body').scrollTop(0);
      }
      // Bring keyboard focus back to top as well.
      $("#main-content").focus();
      return false;
    });

    function menuToggle() {
      stuckMenu.classList.toggle("sticky-nav-open");
      stuckOverlay.style.display = stuckOverlay.style.display === "block" ? "none" : "block";
    }

    toc.querySelector(".stickyTOC-open").addEventListener('click', () => {
      // Append sticky menu when first called
      if (typeof stuckMenu === "undefined") {
        const menuCopy = tocColumn.cloneNode(true);
        menuCopy.classList.add("ma__sticky-toc__stuck-menu");
        stuckMenu = tocParent.appendChild(menuCopy);

        // Close button
        stuckMenu.querySelector(".secondary-label-close").addEventListener("click", () => {
          menuToggle();
        });

        // wait a beat so the slide in can work on first click
        setTimeout(() => {
          menuToggle();
        }, 100);
      }
      else {
        menuToggle();
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
  });
})(window,document,jQuery);
