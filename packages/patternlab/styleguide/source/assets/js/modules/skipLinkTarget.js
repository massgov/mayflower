/**
 * Control display of a skip link target component.
 */

// For non-TOC skip links.
// ------------------------
// To set up a skip link, use classes 'ma__COMPONENT-NAME__skip-link' and 'ma__COMPONENT-NAME__skip-link_target'
// for styling for a skip link and its target repectively.  Use the mixin ma-skip-link.
// To add JS feature, use the classes, 'js-skiplink' and 'js-skiplink-target'.
// See figure.twig and video.twig for markup.
// ------------------------
// Manage visibiliy of the link and its target.
  document.querySelectorAll(".js-skiplink").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Find the matched linkTarget.
      let targetId = e.target.getAttribute("href");
      let skipTarget = document.querySelector(targetId);
      skipTarget.setAttribute("tabindex", "0");
      skipTarget.classList.add("visible");
      // Offset timing to set focus from going to the link target.
      setTimeout(function timeoutFunction() {
        skipTarget.focus();
      }, 200);
    });
  });

  // Hide the skipTargetAnchor/e.target as users move to next element.
  // Check a keypress action with tab or arrow keys,
  // which indicates that users attempts to leave the active anchor to another element.
  // No need to display the active anchor at this point until its corresponding link gets clicked again.
  document.querySelectorAll(".js-skiplink-target > a").forEach((anchor) => {
    // For screen readers:
    // When using arrow keys to move to another element, focus stays on the anchor and the anchor remains visible.
    // Hide the anchor as they move to next element.
    anchor.addEventListener("keydown", (e) => {
      if (e.target.getAttribute("tabindex") === "0") {
        if (
          e.key === "Tab" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft"
        ) {
          e.target.classList.remove("visible");
          e.target.setAttribute("tabindex", -1);
        }
      }
    });

    // For keyboard users, the anchor goes invisible as it loses focus.
    anchor.addEventListener("blur", (e) => {
      if (
        e.target !== document.activeElement &&
        e.target.getAttribute("tabindex") === "0"
      ) {
        e.target.classList.remove("visible");
        e.target.setAttribute("tabindex", -1);
      }
    });
  });



// For TOC skip link target
const skipLinkTOC = document.querySelector(".ma__jump-links__skip-link");
const skipLinkTOCTarget = document.querySelector("#ma-end-sticky-toc");

if(skipLinkTOC && skipLinkTOCTarget) {
  skipLinkTOC.addEventListener("click", (e) => {
    skipLinkTOCTarget.setAttribute("tabindex", "0");
    skipLinkTOCTarget.focus();
  });

  skipLinkTOC.addEventListener("keydown", (e) => {
    if (e.key === " " || e.code === "Space") {
      skipLinkTOCTarget.setAttribute("tabindex", "0");
      skipLinkTOCTarget.focus();
    }
  });

  skipLinkTOC.addEventListener("focusout", (e) => {
    skipLinkTOCTarget.setAttribute("tabindex", "-1");
    skipLinkTOCTarget.removeAttribute("style");
  });
}


