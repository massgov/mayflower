export default (function (window,document) {
  const helptipTriggerClass = '.ma__help-tip__trigger';
  const helptipTriggers = document.querySelectorAll(helptipTriggerClass);
  
  if(helptipTriggers && helptipTriggers.length > 0) {
    helptipTriggers.forEach((trigger) => {
      let isExpanded = trigger.getAttribute('aria-expanded') === 'true' ? true : false;
      const helpTextID = trigger.getAttribute('aria-controls');
      const helpText = document.getElementById(helpTextID);

      const toggleExpansion = (expanded) => {
        trigger.setAttribute('aria-expanded', expanded);
        trigger.classList.toggle('ma__help-tip__trigger--active');
        helpText.classList.toggle('collapsed');
      }

      trigger.onclick = (() => {
        isExpanded = !isExpanded;
        toggleExpansion(isExpanded);
      })

    })
  }
})(window,document);
