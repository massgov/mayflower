// Find the skip link which has focus.
document.querySelectorAll(".ma__figure__skip-link").forEach(link => {

  let linkTarget = "";
  let linkTargetHash = "";

  link.addEventListener("focus", (e) => {
    // Find the matched linkTarget.
    let sibling = e.currentTarget.nextElementSibling;

    // Remove inline style when users move backward while the target is still active
    // to display the link target as the link is clicked.
    if (linkTarget.hasAttribute("style")) {
      linkTarget.removeAttribute("style");
    }

    // let figure;
    while (sibling) {
      if (sibling.hasAttribute("id") && sibling.id.includes("figure-")) {
        linkTarget = sibling;
      }

      sibling = sibling.nextElementSibling;
    }

    // After the skip link is clicked, check a keypress action with tab or arrow keys,
    // which indicates that users attempts to leave the link target to another element.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" ) {
        linkTarget.style.display = "none";
        linkTargetHash = location.hash;
      }
    });
  });

  // Check for hash change to clean up the inline style.
  window.addEventListener("hashchange", () => {
    // Below runs only with a skip link hash.
    if (location.hash.includes("figure-")) {
      let newHash = location.hash;
      if (linkTargetHash !== location.hash && linkTarget.hasAttribute("style")) {
        // Remove inline syle added earlier.
        linkTarget.removeAttribute("style");
        // Update linkTargetHash with the current hash.
        linkTargetHash = newHash;
      }
    }
  }, false);
});
