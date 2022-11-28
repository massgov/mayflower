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
        isExpanded = !isExpanded;
        if (expanded) {
          helpText.classList.remove('collapsed');
          helpText.classList.add('expanded');
          trigger.classList.add('ma__help-tip__trigger--active');
          trigger.setAttribute('aria-expanded', true);
        } else {
          helpText.classList.add('collapsed');
          helpText.classList.remove('expanded');
          trigger.classList.remove('ma__help-tip__trigger--active');
          trigger.setAttribute('aria-expanded', false);
        }
      }

      trigger.onclick = ((e) => {
        e.preventDefault()
        toggleExpansion(isExpanded);
      })

      // close button mobile
      closeButtons[0].onclick = ((e) => {
        e.preventDefault();
        toggleExpansion(false);
      })
      // close button desktop
      closeButtons[1].onclick = ((e) => {
        e.preventDefault();
        toggleExpansion(false);
      })
    })
  }
})(document);
