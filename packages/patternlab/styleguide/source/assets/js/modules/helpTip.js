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
        trigger.setAttribute('aria-expanded', expanded);
        trigger.classList.toggle('ma__help-tip__trigger--active');
        helpText.classList.toggle('collapsed');
      }

      trigger.onclick = ((e) => {
        e.preventDefault()
        isExpanded = !isExpanded;
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
