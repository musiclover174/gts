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
  
  window.animation.scrollTo = (to, duration) => {
    if (duration <= 0) return;
    const element = document.documentElement,
          difference = to - element.scrollTop,
          perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      window.animation.scrollTo(to, duration - 10);
    }, 10);
  }
  
  window.gts.form = ({

    init: function () {

      const _th = this,
            inputs = document.querySelectorAll('.common__input, .common__textarea'),
            forms = document.querySelectorAll('form'),
            selectors = document.querySelectorAll('.js-select'),
            choicesArr = [];

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
      
      for (let selector of selectors){
        let choice = new Choices(selector, {
          searchEnabled: false,
          itemSelectText: '',
          position: 'bottom'
        });
        choicesArr.push(choice);
      }
      
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
    
    page404: () => {
      let sidebar = new StickySidebar('.js-page404-sticky', {
        containerSelector: '.page404',
        innerWrapperSelector: '.page404__sideover',
        topSpacing: document.querySelector('.header').offsetHeight + 20,
        bottomSpacing: 0
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
          let orgHtml = item.outerHTML,
              def = 'default';
          
          if (item.getAttribute('class')) def = '';
          
          item.outerHTML = `<div class='table-scroller${i} ${def}'>${orgHtml}</div>`;
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
    
    services: () => {
      const servCost = document.querySelector('.js-serv-cost'),
            servSticky = document.querySelector('.js-serv-sticky'),
            carElem = document.querySelectorAll('.js-serv-img'),
            mainImg = document.querySelector('.js-device-main'),
            mainOver = document.querySelector('.js-device-mainover');
      
      function calc(){
        let inputs = document.querySelectorAll('.services__variants-table tr.choosed .services__variants-checkbox'),
            totalSumm = 0;
        
        inputs.forEach( item => {
          totalSumm += parseFloat(item.getAttribute('data-cost').replace(/[,]+/g, '.'));
        })
        
        servCost.textContent = (totalSumm).toLocaleString('ru');
      }
      
      document.querySelector('body').addEventListener('click', (e) => {
        let item = e.target;
        if (item.classList.contains('js-serv-checkbox')) {
          if (item.classList.contains('clicked'))
            item.querySelector('input').removeAttribute('checked')
          else
            item.querySelector('input').setAttribute('checked', true)
          item.classList.toggle('clicked');
          item.parentNode.parentNode.classList.toggle('choosed');
          calc();
        }
      })
      
      let sidebar = new StickySidebar('.js-serv-sticky', {
        containerSelector: '.services__content',
        innerWrapperSelector: '.services__cost-sticky',
        topSpacing: document.querySelector('.header').offsetHeight + 20,
        bottomSpacing: 0
      });
      
      window.addEventListener('resize', () => {
        sidebar.updateSticky();
      });
      
      const gallerySwiper = new Swiper ('.js-serv-car', {
        loop: false,
        speed: 800,
        slidesPerView: 6,
        spaceBetween: 18,
        navigation: {
          nextEl: '.js-serv-car ~ .swiper-button-next',
          prevEl: '.js-serv-car ~ .swiper-button-prev',
        },
        breakpoints: {
          479: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 18
          },
          1199: {
            slidesPerView: 5,
            spaceBetween: 18
          }
        }
      });
      
      for (let item of carElem){
        item.addEventListener('click', () => {
          if (!item.classList.contains('active')){
            for (let item of carElem) item.classList.remove('active')
            item.classList.add('active');
            
            let imgOriginal = item.querySelector('img').getAttribute('data-original'),
                imgIndex = item.querySelector('img').getAttribute('data-index');

            mainImg.setAttribute('data-index', imgIndex);
            mainImg.src = imgOriginal;
          }
        })
      }
      
      const servLightbox = GLightbox({
        'selector': 'services__device-glightbox',
      });
      
      window.serv = servLightbox;
      
      mainOver.addEventListener('click', () => {
        let eventClick = new Event('click'),
            lightImgs = document.querySelectorAll('.services__device-glightbox'),
            index = parseInt(mainImg.getAttribute('data-index')) - 1;
        
        lightImgs[index].dispatchEvent(eventClick);
      });
    },
    
    comparison: () => {
      const diffsBut = document.querySelector('.js-comparison-diffs'),
            allBut = document.querySelector('.js-comparison-all'),
            paramsInfo = document.querySelectorAll('.comparison__elem-params'),
            fixers = document.querySelectorAll('.js-comparison-fixer');
      
      const comparisonSwiper = new Swiper ('.js-comparison-car', {
        loop: false,
        speed: 800,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '.js-comparison-car ~ .swiper-buttons .swiper-button-next',
          prevEl: '.js-comparison-car ~ .swiper-buttons .swiper-button-prev',
        },
        breakpoints: {
          600: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          999: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      });
      
      const comparisonHrefs = document.querySelectorAll('.js-comparison-shaver');
      
      window.addEventListener('scroll', () => {
        let fixers = document.querySelectorAll('.js-comparison-fixer'),
            header = document.querySelector('.header'),
            diff = fixers[0].parentNode.getBoundingClientRect().top -  header.offsetHeight,
            btnHeight = document.querySelector('.comparison__elem-tocart').offsetHeight + parseInt(getComputedStyle(document.querySelector('.comparison__elem-tocart')).marginTop) / 2,
            fixerHeight = fixers[0].offsetHeight,
            mainHeight = fixers[0].parentNode.parentNode.offsetHeight - btnHeight,
            scrollFixed = 0;
        
        if (diff < 20){
          scrollFixed = Math.abs(diff) + 20;
        }
        
        if ((Math.abs(diff) + 20 + fixerHeight) < mainHeight){
          fixers.forEach(fixer => {
            if (scrollFixed){
              fixer.parentNode.style.height = fixerHeight + 'px'
              fixer.style.top = scrollFixed + 'px'
              fixer.classList.add('fixed')
            }
            else{
              fixer.parentNode.removeAttribute('style')
              fixer.removeAttribute('style')
              fixer.classList.remove('fixed')
            }
          })
        }
      });
      
      for (let comparisonHref of comparisonHrefs)
        shave(comparisonHref, 50);
      
      allBut.addEventListener('click', (e) => {
        e.preventDefault();
        
        for (let paramInfo of paramsInfo)
          paramInfo.querySelectorAll('.hidden').forEach(item => item.classList.remove('item'));
      });
      
      diffsBut.addEventListener('click', (e) => {
        e.preventDefault();
        if (diffsBut.classList.contains('active')) return;
        
        diffsBut.classList.add('active');
        allBut.classList.remove('active');
        
        for (let i = 0; i < paramsInfo[0].querySelectorAll('.comparison__elem-params-row').length; i++) {
          let defaultVal = paramsInfo[0].querySelectorAll('.comparison__elem-params-row')[i].querySelector('.comparison__elem-params-val').textContent,
              haveDiff = false;
          
          paramsInfo.forEach( (paramElem, index) => {
            if (index && !haveDiff && paramElem.querySelectorAll('.comparison__elem-params-row')[i].querySelector('.comparison__elem-params-val').textContent !== defaultVal){
              haveDiff = !haveDiff;
            }
          });
          
          if (!haveDiff)
            for (let paramElem of paramsInfo)
              paramElem.querySelectorAll('.comparison__elem-params-row')[i].classList.add('hidden');
        }
      });
      
      allBut.addEventListener('click', (e) => {
        e.preventDefault();
        if (allBut.classList.contains('active')) return;
        
        diffsBut.classList.remove('active');
        allBut.classList.add('active');
        
        for (let paramInfo of paramsInfo)
          paramInfo.querySelectorAll('.hidden').forEach(item => item.classList.remove('hidden'));
      });
    },
    
    init: function() {

      const _self = this;
      
      if (document.querySelectorAll('.card__list .card__elem-info').length)
        this.cardHeight();
      
      if (document.querySelectorAll('.js-search-icon').length) this.search();
      
      if (document.querySelectorAll('.js-ibanner').length) this.bannerCar();
      
      if (document.querySelectorAll('.js-iclients').length) this.clientsCar();
      
      if (document.querySelectorAll('.js-ireviews').length) this.reviewsCar();
      
      if (document.querySelectorAll('.js-iprojects').length) this.projectsCar();
      
      if (document.querySelectorAll('.js-inews-href').length) this.inewsToggler();
      
      if (document.querySelectorAll('.js-serv-checkbox').length) this.services();
      
      if (document.querySelectorAll('.js-page404-sticky').length) this.page404();
      
      if (document.querySelectorAll('.js-comparison-car').length) this.comparison();
      
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
            const dstData = item.getAttribute('data-to'),
                  dstPx = document.querySelector(`[data-scroll="${dstData}"]`).getBoundingClientRect().top + document.body.scrollTop - document.querySelector('header').offsetHeight - 20;
            window.animation.scrollTo(dstPx, 800);
          })
        });
      }
      

      this.resizeWatcher();
      
      let eventResize = new Event('resize');
      window.dispatchEvent(eventResize);
      let eventScroll = new Event('scroll');
      window.dispatchEvent(eventScroll);
      
    }
  }).init();

};