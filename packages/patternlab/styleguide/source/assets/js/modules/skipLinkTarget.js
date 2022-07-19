/**
 * Control display of a skip link target component.
 */

// For figure content skip links
document.querySelectorAll(".ma__figure__skip-link").forEach(link => {

  let linkTarget = "";
  let linkTargetHash = "";

  link.addEventListener("click", (e) => {
    // Find the matched linkTarget.
    let sibling = e.currentTarget.nextElementSibling;

    while (sibling) {
      if (sibling.hasAttribute("id") && sibling.id.includes("figure-")) {
        linkTarget = sibling;

        // Show the linkTarget.
        linkTarget.style.display = "block";
      }
      sibling = sibling.nextElementSibling;
    }
  });

  // Hide the linkTarget as users move to next element.
  // After the skip link is clicked, check a keypress action with tab or arrow keys,
  // which indicates that users attempts to leave the link target to another element.
  // No need to display the link target at this point.
  // a link target never gets focus.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" ) {
      document.querySelector(location.hash).style.display = "none";
    }
  });

  // For TOC skip link target
  const skipLinkTOC = document.querySelector(".ma__jump-links__skip-link");
  const skipLinkTOCTarget = document.querySelector("#ma-end-sticky-toc");

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
});

