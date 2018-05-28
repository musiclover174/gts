'use strict';

window.onload = function () {

  window.gts = {};

  window.gts.form = {

    init: function init() {

      var _th = this;

      $('.js-phone').mask('+7(999) 999-9999');

      $('form').submit(function () {
        if (!_th.checkForm($(this))) return false;
      });
    },

    checkForm: function checkForm(form) {
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

  }.init();

  window.gts.main = {

    bannerCar: function bannerCar() {

      var bannerSwiper = new Swiper('.js-ibanner', {
        loop: true,
        speed: 800,
        navigation: {
          nextEl: '.js-ibanner .swiper-button-next',
          prevEl: '.js-ibanner .swiper-button-prev'
        },
        autoplay: {
          delay: 5000
        }
      });
    },

    inewsToggler: function inewsToggler() {

      document.querySelectorAll('.js-inews-href').forEach(function (item, i) {

        item.addEventListener('click', function (e) {
          if (item.classList.contains('active')) return false;
          var curActive = document.querySelector('.js-inews-href.active'),
              curAttr = curActive.getAttribute('data-type'),
              newAttr = item.getAttribute('data-type');

          curActive.classList.remove('active');
          item.classList.add('active');

          $('.i-news__type[data-type="' + curAttr + '"]').fadeOut(400, function () {
            $('.i-news__type[data-type="' + newAttr + '"]').fadeIn(400);
          });

          e.stopPropagation();
          e.preventDefault();
        });
      });
    },

    init: function init() {

      if (document.querySelectorAll('.js-ibanner').length) this.bannerCar();

      if (document.querySelectorAll('.js-inews-href').length) this.inewsToggler();

      $('[data-fancybox]').fancybox(); // fancy init
    }
  }.init();
};