window.onload = function () {

  window.animation = {};
  window.gts = {};
  
  window.animation.fadeIn = (elem, ms, cb) => {
    if (!elem)
      return;

    elem.style.opacity = 0;
    elem.style.display = "block";

    if (ms) {
      var opacity = 0;
      var timer = setInterval(function () {
        opacity += 50 / ms;
        if (opacity >= 1) {
          clearInterval(timer);
          opacity = 1;
          if (cb) cb()
        }
        elem.style.opacity = opacity;
      }, 50);
    } else {
      elem.style.opacity = 1;
      if (cb) cb()
    }
  }
  
  window.animation.fadeOut = (elem, ms, cb) => {
    if (!elem)
      return;

    elem.style.opacity = 1;

    if (ms) {
      var opacity = 1;
      var timer = setInterval(function () {
        opacity -= 50 / ms;
        if (opacity <= 0) {
          clearInterval(timer);
          opacity = 0;
          elem.style.display = "none";
          if (cb) cb()
        }
        elem.style.opacity = opacity;
      }, 50);
    } else {
      elem.style.opacity = 0;
      elem.style.display = "none";
      if (cb) cb()
    }
  }
  
  window.gts.form = ({

    init: function () {

      const _th = this,
            inputs = document.querySelectorAll('.common__input, .commot__textarea'),
            forms = document.querySelectorAll('form');

      $('.js-phone').mask('+7(999) 999-9999'); // jquery
      
      inputs.forEach( item => {
        item.addEventListener('keyup', emptyCheck)
        item.addEventListener('blur', emptyCheck)
      });
      
      function emptyCheck(event){
        event.target.value.trim() === '' ? 
          event.target.classList.remove('notempty') :
          event.target.classList.add('notempty')
      }
      
      const choices = new Choices(document.querySelector('.js-select'), {
        searchEnabled: false,
        itemSelectText: '',
        position: 'bottom'
      });
      
      forms.forEach( form => {
        form.addEventListener('submit', e => !_th.checkForm(form) && e.preventDefault())
      })
      
    },

    checkForm: function (form) {
      let checkResult = true;
      const warningElems = form.querySelectorAll('.warning');
      
      if (warningElems.length)
        warningElems.forEach( warningElem => 
          warningElem.classList.remove('warning')
        );
      
      form.querySelectorAll('input, textarea, select').forEach((elem) => {
        if (elem.getAttribute('data-req')) {
          switch (elem.getAttribute('data-type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test(elem.value)) {
                elem.classList.add('warning');
                checkResult = false;
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.classList.add('warning');
                checkResult = false;
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.classList.add('warning');
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
    
    prevAll: (elem) => {
      let result = [];

      while (elem = elem.previousElementSibling)
        result.push(elem);
      return result;
    },
    
    cardHeight: () => {
      let cardInfo = document.querySelectorAll('.card__list .card__elem-info'),
          cardParent = document.querySelector('.card__list'),
          elemsOnRow, maxH;
      
      function skippedAutoHeight(){
        document.querySelectorAll('.card__elem-info.skipped').forEach(elem => {
          elem.style.height = maxH + 'px';
          elem.classList.remove('skipped');
        });
        maxH = 0;
      }
      
      function autoHeight(){
        maxH = 0;
        cardInfo.forEach((item, i) => {
          if (i % elemsOnRow === 0) skippedAutoHeight()

          if (item.offsetHeight > maxH) {
            maxH = item.offsetHeight;
          }
          item.classList.add('skipped');
        });

        if (document.querySelectorAll('.card__elem-info.skipped').length) skippedAutoHeight()
      }
      
      window.addEventListener('resize', () => {
        cardInfo.forEach(elem => elem.style.height = 'auto');
        elemsOnRow = Math.floor(cardParent.offsetWidth / cardInfo[0].offsetWidth)
        autoHeight();
      });
      
    },
    
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
    
    recentCar: () => {
      
      const projectsSwiper = new Swiper ('.js-recent', {
        loop: true,
        speed: 800,
        slidesPerView: 3,
        spaceBetween: 32,
        navigation: {
          nextEl: '.js-recent ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-recent ~ .swiper-buttons .swiper-button-prev',
        },
        breakpoints: {
          767: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          1199: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      });
      
      let cardInfo = document.querySelectorAll('.js-recent .card__elem-info'), maxH = 0;
      
      function autoHeight(){
        cardInfo.forEach(elem => elem.style.height = 'auto');
        
        cardInfo.forEach((item, i) => {
          if (item.offsetHeight > maxH) {
            maxH = item.offsetHeight;
          }
        });

        cardInfo.forEach(elem => elem.style.height = maxH + 'px');
      }
      
      window.addEventListener('resize', () => {
        autoHeight();
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
          
          let fadeOutElem = document.querySelector(`.i-news__type[data-type="${curAttr}"]`),
              fadeInElem = document.querySelector(`.i-news__type[data-type="${newAttr}"]`);
          window.animation.fadeOut(fadeOutElem, 400, () => {
            window.animation.fadeIn(fadeInElem, 400)
          })
          
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
        window.addEventListener('resize', () => {
          if (scrollArray.length)
            scrollArray.forEach((item, i) => {
              item.update()
            });
        });
      }
      
    },
    
    init: function() {

      const _self = this;
      
      if (document.querySelectorAll('.card__elem-info').length)
        this.cardHeight();
      
      if (document.querySelectorAll('.js-search-icon').length) this.search();
      
      if (document.querySelectorAll('.js-ibanner').length) this.bannerCar();
      
      if (document.querySelectorAll('.js-iclients').length) this.clientsCar();
      
      if (document.querySelectorAll('.js-ireviews').length) this.reviewsCar();
      
      if (document.querySelectorAll('.js-iprojects').length) this.projectsCar();
      
      if (document.querySelectorAll('.js-inews-href').length) this.inewsToggler();
      
      if (document.querySelectorAll('.js-burger').length) this.burger();
      
      if (document.querySelectorAll('.js-recent').length) this.recentCar();
      
      if (document.querySelectorAll('.js-reviews-star').length) {
        let stars = document.querySelectorAll('.js-reviews-star');
        stars.forEach(star => {
          star.addEventListener('click', () => {
            stars.forEach(star => star.classList.remove('choosed'));
            _self.prevAll(star).forEach(elem => elem.classList.add('choosed'))
            star.classList.add('choosed');
            document.querySelector('.js-reviews-starinput').value = star.getAttribute('data-star');
          })
        })
      }
      
      if (document.querySelectorAll('.js-checkfake').length) {
        let checkFake = document.querySelectorAll('.js-checkfake');
        checkFake.forEach(item => {
          item.addEventListener('click', () => {
            if (item.classList.contains('clicked'))
              item.nextElementSibling.removeAttribute('checked')
            else
              item.nextElementSibling.setAttribute('checked', true)
            item.classList.toggle('clicked');
          })
        });
      }
      
      if (document.querySelectorAll('.js-print').length) {
        let printBtn = document.querySelectorAll('.js-print');
        printBtn.forEach(item => {
          item.addEventListener('click', () => window.print())
        });
      }
      
      if (document.querySelectorAll('.js-common-file').length) {
        let commonFile = document.querySelectorAll('.js-common-fileinput'),
            commonFileDelete = document.querySelectorAll('.js-common-filedelete')
        
        commonFile.forEach(fileInp => {
          fileInp.addEventListener('change', (e) => {
            let el = fileInp.nextElementSibling,
                path = fileInp.value.split('\\'),
                pathName = path[path.length - 1].split('');
            
            pathName.length >= 20 ? 
              pathName = pathName.slice(0, 18).join('') + '...' :
              pathName = pathName.join('')
            
            el.textContent = pathName;
            el.classList.add('choosed');
          })
        });
        
        commonFileDelete.forEach(fileDelete => {
          fileDelete.addEventListener('click', (e) => {
            let el = fileDelete.previousElementSibling,
                fileInput = fileDelete.previousElementSibling.previousElementSibling;
            el.textContent = el.getAttribute('data-default');
            fileInput.value = '';
            el.classList.remove('choosed');
          })
        });
      }
      
      if (document.querySelectorAll('.js-scrollTo').length) {
        let scrollTo = document.querySelectorAll('.js-scrollTo');
        scrollTo.forEach(item => {
          item.addEventListener('click', () => {
            let dst = item.getAttribute('data-to');
            $('html, body').animate({
              scrollTop: $(`[data-scroll="${dst}"]`).offset().top - $('.header').height() - 20
            }, 2000); // jquery
          })
        });
      }
      

      this.resizeWatcher();
      
      let eventResize = new Event('resize');
      window.dispatchEvent(eventResize);
      
    }
  }).init();

};