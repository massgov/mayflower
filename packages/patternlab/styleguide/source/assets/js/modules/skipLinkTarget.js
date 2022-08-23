/**
 * Control display of a skip link target component.
 */

// For figure content skip links
document.querySelectorAll(".ma__figure__skip-link").forEach(link => {

  link.addEventListener("click", (e) => {
    // Find the matched linkTarget.
    let targetId = e.target.getAttribute("href");
    let skipTarget = document.querySelector(targetId);
    let skipTargetAnchor = skipTarget.querySelector("a");
    skipTarget.style.paddingTop = "80px";
    skipTargetAnchor.setAttribute("tabindex", "0");
    skipTargetAnchor.style.display = "block";
    // Offset timing to set focus from going to the link target.
    setTimeout(function timeoutFunction() {
      skipTargetAnchor.focus();
    }, 200);
  });
});

// Hide the skipTargetAnchor/e.target as users move to next element.
// Check a keypress action with tab or arrow keys,
// which indicates that users attempts to leave the active anchor to another element.
// No need to display the active anchor at this point until its corresponding link gets clicked again.
document.querySelectorAll(".ma__figure__skip-link_target a").forEach(anchor => {

  anchor.addEventListener("keydown", (e) => {

    if (e.target.getAttribute("tabindex") === "0") {
      if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" ) {
        if (e.target === document.activeElement) {
          e.target.closest(".ma__figure__skip-link_target").removeAttribute("style");
          e.target.removeAttribute("style");
          e.target.setAttribute("tabindex", -1);
        }
      }
    }
  });

  // For screen readers:
  // When using arrow keys to move to another element, focus stays on the anchor.
  // This results the anchor remains visible. Hide the anchor when another element gets focus to make it less distracting
  // to screen reader users.
  anchor.addEventListener("blur", (e) => {

    if ((e.target !== document.activeElement) && (e.target.getAttribute("tabindex") === "0")) {
      e.target.closest(".ma__figure__skip-link_target").removeAttribute("style");
      e.target.removeAttribute("style");
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


