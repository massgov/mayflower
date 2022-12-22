export default (function (document) {
  const helptipTriggerClass = '.ma__help-tip__trigger';
  const helptipTriggers = document.querySelectorAll(helptipTriggerClass);
  
  if(helptipTriggers && helptipTriggers.length > 0) {
    helptipTriggers.forEach((trigger) => {
      let isExpanded = trigger.getAttribute('aria-expanded') === 'true' ? true : false;
      const helpTextID = trigger.getAttribute('aria-controls');
      const helpText = document.getElementById(helpTextID);
      const closeButtons = helpText.getElementsByTagName('button');

      const toggleExpansion = (expanded) => {
        if (expanded) {
          helpText.classList.remove('collapsed');
          helpText.classList.add('expanded');
          trigger.classList.add('ma__help-tip__trigger--active');
          trigger.setAttribute('aria-expanded', true);

          // On mobile, when page scrolls, the help text should only stay expanded if its bottom boundary is below the trigger text, or else it should collapse automatically. As when the page is scrolled up past the trigger text, users lose context over the help text and it risks colliding with other elements on the page.
          const topOffset = trigger.offsetTop;
          const stickyOnScroll = () => {
            const helpTextOffset = helpText.getBoundingClientRect().bottom + window.scrollY;
            if (topOffset > helpTextOffset) {
              isExpanded = false;
              toggleExpansion(false);
            }
          }
    
          window.onscroll = function () {
            stickyOnScroll();
          };
      
        } else {
          helpText.classList.add('collapsed');
          helpText.classList.remove('expanded');
          trigger.classList.remove('ma__help-tip__trigger--active');
          trigger.setAttribute('aria-expanded', false);
        }
      }

      // initialize
      toggleExpansion(isExpanded);


      // toggle on trigger click
      trigger.onclick = ((e) => {
        e.preventDefault()
        isExpanded = !isExpanded;
        toggleExpansion(isExpanded);
      })

      // close button mobile
      closeButtons[0].onclick = ((e) => {
        e.preventDefault();
        isExpanded = false;
        toggleExpansion(false);
      })
      // close button desktop
      closeButtons[1].onclick = ((e) => {
        e.preventDefault();
        isExpanded = false;
        toggleExpansion(false);
      })
    })
  }
})(document);
