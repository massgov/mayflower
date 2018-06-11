export default function (window,document,$,undefined) {
  
  $('.js-input-date').each(function(){
    let $el = $(this);
    let restrict = $el.data('restrict');
    let picker = new Pikaday({ 
      field: this,
      format: 'MM/DD/YYYY',
    });

    switch(restrict) {
      case 'max':
        picker.setMaxDate(new Date());
        break;
      case 'min':
        picker.setMinDate(new Date());
        break;
    }

    $el.attr('type','text');
  });

}(window,document,jQuery);
