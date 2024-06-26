export default (function (window,document,$,undefined) {

  $('form').each(function(){
    let $form = $(this);

    $form.find('button[type="submit"], input[type="submit"]').on('click',function(e){
      let submitForm = true,
          requiredFields = [];

      // find all required fields
      $('.js-is-required').each(function(){
        let $field = $(this)

        // Don't validate not displayed required field. 
        if ($field.css('display') === 'none') {
          return;
        }
        let type = $field.data('type'),
        value = $field.val(),
        valid = validate(value,type);

        requiredFields.push({type,valid,$el:$field});
        $(this).data('index',requiredFields.length);
      });

      // if there aren't any required fields, don't do anything
      if(requiredFields.length === 0) {
        return;
      }

      // validate each required field
      requiredFields.forEach(function(item) {
        let value = item.$el.val();

        item.valid = validate(value,item.type);

        if(item.valid) {
          clearError(item.$el);
        } else {
          submitForm = false;
          addError(item.$el);
        }
      });

      if(!submitForm) {
        // prevent the form from submitting
        e.preventDefault();
        // show the form error message 
        $form.addClass('has-error');

        const $firstRequired = $('.js-is-required.has-error').get(0);

        // scroll up to the error message
        let position = $form.offset();
        
        // scroll to the top of the form where the list of errors should be
        // using 100px offset to compenstate for possible sticky headers
        $("html,body").stop(true,true).animate({scrollTop:position.top - 100}, '750', function(){
          // bring focus to the first required field that has an error
          $firstRequired.focus();
        });
      }
    });
  });

  // receives the jquery object of the input
  function clearError($el){
    $el.removeClass('has-error');
    $el.prev('.ma__error-msg').removeClass('has-error');
    // textarea error message
    $el.parent().next('.ma__error-msg').removeClass('has-error');
  }

  // receives the jquery object of the input
  function addError($el) {
    $el.addClass('has-error');
    $el.prev('.ma__error-msg').addClass('has-error');
    // textarea error message
    $el.parent().next('.ma__error-msg').addClass('has-error');
  }

  function validate(value,type='text'){
    let valid = false;

    switch(type) {
      case 'email':
        valid = !!(value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i));
        break;
      default:
        valid = value.length !== 0;
    }

    return valid;
  }

})(window,document,jQuery);
