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

// Hide the skipTargetAnchor/activeAnchor as users move to next element.
// Check a keypress action with tab or arrow keys,
// which indicates that users attempts to leave the activeAnchor to another element.
// No need to display activeAnchor at this point until its corresponding link gets clicked again.
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" ) {
    let activeTarget = document.querySelector(location.hash);
    let activeAnchor = activeTarget.querySelector("a");
    if (activeAnchor === document.activeElement) {
      activeTarget.removeAttribute("style");
      activeAnchor.removeAttribute("style");
      activeAnchor.setAttribute("tabindex", "-1");
    }
  }
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


