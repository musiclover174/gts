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
    
    search: () => {
      const search = document.querySelector('.search'),
          searchIcon = document.querySelector('.js-search-icon'),
          searchClose = document.querySelector('.js-search-close'),
          searchInp = document.querySelector('.search__inp'),
          searchRes = document.querySelector('.js-search-res'),
          html = document.querySelector('html');
      
      searchIcon.addEventListener('click', (e) => {
        search.classList.add('open');
        html.classList.add('burgeropen');
        e.preventDefault();
        e.stopPropagation();
      });
      
      searchClose.addEventListener('click', (e) => {
        searchInp.value = '';
        searchRes.classList.remove('open');
        search.classList.remove('open');
        html.classList.remove('burgeropen');
        e.preventDefault();
        e.stopPropagation();
      });
      
      searchInp.addEventListener('keyup', (e) => {
        if (searchInp.value.trim() !== '')
          searchRes.classList.add('open');
        else
          searchRes.classList.remove('open');
      });
      
    },
    
    burger: () => {
      const burger = document.querySelector('.js-burger'),
          burgerShadow = document.querySelector('.js-burger-shadow');
      
      burger.addEventListener('click', function(e){
        document.querySelector('.burger__menu').classList.toggle('open');
        this.classList.toggle('open');
        document.querySelector('html').classList.toggle('burgeropen');
        e.preventDefault();
        e.stopPropagation();
      })
      
      burgerShadow.addEventListener('click', function(e){
        let event = new Event('click');
        burger.dispatchEvent(event);
        e.preventDefault();
        e.stopPropagation();
      })

    },
    
    bannerCar: () => {
      
      const bannerSwiper = new Swiper ('.js-ibanner', {
        loop: true,
        speed: 800,
        navigation: {
          nextEl: '.js-ibanner .swiper-button-next',
          prevEl: '.js-ibanner .swiper-button-prev',
        },
        autoplay: {
          delay: 5000
        }
      });
      
    },
    
    reviewsCar: () => {
      
      const reviewsSwiper = new Swiper ('.js-ireviews', {
        loop: true,
        speed: 800,
        navigation: {
          nextEl: '.js-ireviews ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-ireviews ~ .swiper-buttons .swiper-button-prev',
        },
        effect: 'fade',
        autoHeight: true,
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 5000
        }
      });
      
    },
    
    clientsCar: () => {
      
      const projectsSwiper = new Swiper ('.js-iclients', {
        loop: true,
        speed: 800,
        slidesPerView: 5,
        spaceBetween: 26,
        navigation: {
          nextEl: '.js-iclients ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-iclients ~ .swiper-buttons .swiper-button-prev',
        },
        breakpoints: {
          700: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          999: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }
      });
      
    },
    
    projectsCar: () => {
      
      const projectsSwiper = new Swiper ('.js-iprojects', {
        loop: true,
        speed: 800,
        slidesPerView: 3,
        spaceBetween: 32,
        navigation: {
          nextEl: '.js-iprojects ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-iprojects ~ .swiper-buttons .swiper-button-prev',
        },
        breakpoints: {
          600: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          999: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      });
      
    },
    
    inewsToggler: () => {
      
      document.querySelectorAll('.js-inews-href').forEach((item, i) => {
        
        item.addEventListener('click', (e) => {
          if (item.classList.contains('active')) return false
          let curActive = document.querySelector('.js-inews-href.active'),
              curAttr = curActive.getAttribute('data-type'),
              newAttr = item.getAttribute('data-type');
          
          curActive.classList.remove('active');
          item.classList.add('active');
          
          $(`.i-news__type[data-type="${curAttr}"]`).fadeOut(400, function(){
            $(`.i-news__type[data-type="${newAttr}"]`).fadeIn(400);
          });
          
          e.stopPropagation();
          e.preventDefault();
          
        });
        
      });
      
    },
    
    resizeWatcher: () => {
      const tableSel = document.querySelectorAll('table'),
            scrollArray = [];
      if (tableSel.length){
        tableSel.forEach((item, i) => {
          let orgHtml = item.outerHTML;
          item.outerHTML = `<div class='table-scroller${i}'>${orgHtml}</div>`;
          let ps = new PerfectScrollbar(`.table-scroller${i}`, {
            wheelPropagation: true
          });
          scrollArray.push(ps);
        });
        $(window).resize(() => {
          if (scrollArray.length)
            scrollArray.forEach((item, i) => {
              item.update()
            });
        }).trigger('trigger')
      }
      
    },
    
    init: function() {

      if (document.querySelectorAll('.js-search-icon').length) 
      
      if (document.querySelectorAll('.js-ibanner').length) this.bannerCar();
      
      if (document.querySelectorAll('.js-iclients').length) this.clientsCar();
      
      if (document.querySelectorAll('.js-ireviews').length) this.reviewsCar();
      
      if (document.querySelectorAll('.js-iprojects').length) this.projectsCar();
      
      if (document.querySelectorAll('.js-inews-href').length) this.inewsToggler();
      
      if (document.querySelectorAll('.js-burger').length) this.burger();

      this.resizeWatcher();
      
    }
  }).init();

};