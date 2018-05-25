window.onload = function () {

  window.gts = {};

  window.gts.form = ({

    init: function () {

      var _th = this;

      $('.js-phone').mask('+7(999) 999-9999');

      $('form').submit(function () {
        if (!_th.checkForm($(this)))
          return false;
      });
    },

    checkForm: function (form) {
      var checkResult = true;
      form.find('.warning').removeClass('warning');
      form.find('input, textarea, select').each(function () {
        if ($(this).data('req')) {
          switch ($(this).data('type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test($(this).val())) {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test($(this).val())) {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
            default:
              if ($.trim($(this).val()) === '') {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
          }
        }
      });
      return checkResult;
    }

  }).init();

  window.gts.main = ({

    animationInProgress: false,

    init: function () {

      var _self = this;

      $('select').styler(); // styler initialize

      $('.js-dot').dotdotdot(); // dots initialize

      $('[data-fancybox]').fancybox(); // fancy init

    }
  }).init();

};