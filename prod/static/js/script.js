"use strict";window.onload=function(){window.animation={};window.gts={};window.animation.fadeIn=function(elem,ms,cb){if(!elem)return;elem.style.opacity=0;elem.style.display="block";if(ms){var opacity=0;var timer=setInterval(function(){opacity+=50/ms;if(opacity>=1){clearInterval(timer);opacity=1;if(cb)cb()}elem.style.opacity=opacity},50)}else{elem.style.opacity=1;if(cb)cb()}};window.animation.fadeOut=function(elem,ms,cb){if(!elem)return;elem.style.opacity=1;if(ms){var opacity=1;var timer=setInterval(function(){opacity-=50/ms;if(opacity<=0){clearInterval(timer);opacity=0;elem.style.display="none";if(cb)cb()}elem.style.opacity=opacity},50)}else{elem.style.opacity=0;elem.style.display="none";if(cb)cb()}};window.animation.scrollTo=function(to,duration){if(duration<=0)return;var element=document.documentElement,difference=to-element.scrollTop,perTick=difference/duration*10;setTimeout(function(){element.scrollTop=element.scrollTop+perTick;window.animation.scrollTo(to,duration-10)},10)};window.gts.form={init:function init(){var _th=this,inputs=document.querySelectorAll(".common__input, .common__textarea"),forms=document.querySelectorAll("form"),selectors=document.querySelectorAll(".js-select"),choicesArr=[];$(".js-phone").mask("+7(999) 999-9999");// jquery
inputs.forEach(function(item){item.addEventListener("keyup",emptyCheck);item.addEventListener("blur",emptyCheck)});function emptyCheck(event){event.target.value.trim()===""?event.target.classList.remove("notempty"):event.target.classList.add("notempty")}var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=selectors[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var selector=_step.value;var choice=new Choices(selector,{searchEnabled:false,itemSelectText:"",position:"bottom"});choicesArr.push(choice)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}forms.forEach(function(form){form.addEventListener("submit",function(e){return!_th.checkForm(form)&&e.preventDefault()})})},checkForm:function checkForm(form){var checkResult=true;var warningElems=form.querySelectorAll(".warning");if(warningElems.length)warningElems.forEach(function(warningElem){return warningElem.classList.remove("warning")});form.querySelectorAll("input, textarea, select").forEach(function(elem){if(elem.getAttribute("data-req")){switch(elem.getAttribute("data-type")){case"tel":var re=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;if(!re.test(elem.value)){elem.classList.add("warning");checkResult=false}break;case"email":var re=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;if(!re.test(elem.value)){elem.classList.add("warning");checkResult=false}break;default:if(elem.value.trim()===""){elem.classList.add("warning");checkResult=false}break;}}});return checkResult}}.init();window.gts.main={prevAll:function prevAll(elem){var result=[];while(elem=elem.previousElementSibling){result.push(elem)}return result},cardHeight:function cardHeight(){var cardInfo=document.querySelectorAll(".card__list .card__elem-info"),cardParent=document.querySelector(".card__list"),elemsOnRow=void 0,maxH=void 0;function skippedAutoHeight(){document.querySelectorAll(".card__elem-info.skipped").forEach(function(elem){elem.style.height=maxH+"px";elem.classList.remove("skipped")});maxH=0}function autoHeight(){maxH=0;cardInfo.forEach(function(item,i){if(i%elemsOnRow===0)skippedAutoHeight();if(item.offsetHeight>maxH){maxH=item.offsetHeight}item.classList.add("skipped")});if(document.querySelectorAll(".card__elem-info.skipped").length)skippedAutoHeight()}window.addEventListener("resize",function(){cardInfo.forEach(function(elem){return elem.style.height="auto"});elemsOnRow=Math.floor(cardParent.offsetWidth/cardInfo[0].offsetWidth);autoHeight()})},page404:function page404(){var sidebar=new StickySidebar(".js-page404-sticky",{containerSelector:".page404",innerWrapperSelector:".page404__sideover",topSpacing:document.querySelector(".header").offsetHeight+20,bottomSpacing:0})},search:function search(){var search=document.querySelector(".search"),searchIcon=document.querySelector(".js-search-icon"),searchClose=document.querySelector(".js-search-close"),searchInp=document.querySelector(".search__inp"),searchRes=document.querySelector(".js-search-res"),html=document.querySelector("html");searchIcon.addEventListener("click",function(e){search.classList.add("open");html.classList.add("burgeropen");e.preventDefault();e.stopPropagation()});searchClose.addEventListener("click",function(e){searchInp.value="";searchRes.classList.remove("open");search.classList.remove("open");html.classList.remove("burgeropen");e.preventDefault();e.stopPropagation()});searchInp.addEventListener("keyup",function(e){if(searchInp.value.trim()!=="")searchRes.classList.add("open");else searchRes.classList.remove("open")})},burger:function burger(){var burger=document.querySelector(".js-burger"),burgerShadow=document.querySelector(".js-burger-shadow");burger.addEventListener("click",function(e){document.querySelector(".burger__menu").classList.toggle("open");this.classList.toggle("open");document.querySelector("html").classList.toggle("burgeropen");e.preventDefault();e.stopPropagation()});burgerShadow.addEventListener("click",function(e){var event=new Event("click");burger.dispatchEvent(event);e.preventDefault();e.stopPropagation()})},bannerCar:function bannerCar(){var bannerSwiper=new Swiper(".js-ibanner",{loop:true,speed:800,navigation:{nextEl:".js-ibanner .swiper-button-next",prevEl:".js-ibanner .swiper-button-prev"},autoplay:{delay:5000}})},reviewsCar:function reviewsCar(){var reviewsSwiper=new Swiper(".js-ireviews",{loop:true,speed:800,navigation:{nextEl:".js-ireviews ~ .swiper-buttons .swiper-button-next",prevEl:".js-ireviews ~ .swiper-buttons .swiper-button-prev"},effect:"fade",autoHeight:true,fadeEffect:{crossFade:true},autoplay:{delay:5000}})},clientsCar:function clientsCar(){var projectsSwiper=new Swiper(".js-iclients",{loop:true,speed:800,slidesPerView:5,spaceBetween:26,navigation:{nextEl:".js-iclients ~ .swiper-buttons .swiper-button-next",prevEl:".js-iclients ~ .swiper-buttons .swiper-button-prev"},breakpoints:{700:{slidesPerView:2,spaceBetween:20},999:{slidesPerView:4,spaceBetween:20}}})},recentCar:function recentCar(){var projectsSwiper=new Swiper(".js-recent",{loop:true,speed:800,slidesPerView:3,spaceBetween:32,navigation:{nextEl:".js-recent ~ .swiper-buttons .swiper-button-next",prevEl:".js-recent ~ .swiper-buttons .swiper-button-prev"},breakpoints:{767:{slidesPerView:1,spaceBetween:10},1199:{slidesPerView:2,spaceBetween:20}}});var cardInfo=document.querySelectorAll(".js-recent .card__elem-info"),maxH=0;function autoHeight(){cardInfo.forEach(function(elem){return elem.style.height="auto"});cardInfo.forEach(function(item,i){if(item.offsetHeight>maxH){maxH=item.offsetHeight}});cardInfo.forEach(function(elem){return elem.style.height=maxH+"px"})}window.addEventListener("resize",function(){autoHeight()})},projectsCar:function projectsCar(){var projectsSwiper=new Swiper(".js-iprojects",{loop:true,speed:800,slidesPerView:3,spaceBetween:32,navigation:{nextEl:".js-iprojects ~ .swiper-buttons .swiper-button-next",prevEl:".js-iprojects ~ .swiper-buttons .swiper-button-prev"},breakpoints:{600:{slidesPerView:1,spaceBetween:10},999:{slidesPerView:2,spaceBetween:20}}})},inewsToggler:function inewsToggler(){document.querySelectorAll(".js-inews-href").forEach(function(item,i){item.addEventListener("click",function(e){if(item.classList.contains("active"))return false;var curActive=document.querySelector(".js-inews-href.active"),curAttr=curActive.getAttribute("data-type"),newAttr=item.getAttribute("data-type");curActive.classList.remove("active");item.classList.add("active");var fadeOutElem=document.querySelector(".i-news__type[data-type=\""+curAttr+"\"]"),fadeInElem=document.querySelector(".i-news__type[data-type=\""+newAttr+"\"]");window.animation.fadeOut(fadeOutElem,400,function(){window.animation.fadeIn(fadeInElem,400)});e.stopPropagation();e.preventDefault()})})},resizeWatcher:function resizeWatcher(){var tableSel=document.querySelectorAll("table"),scrollArray=[];if(tableSel.length){tableSel.forEach(function(item,i){var orgHtml=item.outerHTML,def="default";if(item.getAttribute("class"))def="";item.outerHTML="<div class='table-scroller"+i+" "+def+"'>"+orgHtml+"</div>";var ps=new PerfectScrollbar(".table-scroller"+i,{wheelPropagation:true});scrollArray.push(ps)});window.addEventListener("resize",function(){if(scrollArray.length)scrollArray.forEach(function(item,i){item.update()})})}},services:function services(){var servCost=document.querySelector(".js-serv-cost"),servSticky=document.querySelector(".js-serv-sticky"),carElem=document.querySelectorAll(".js-serv-img"),mainImg=document.querySelector(".js-device-main"),mainOver=document.querySelector(".js-device-mainover");function calc(){var inputs=document.querySelectorAll(".services__variants-table tr.choosed .services__variants-checkbox"),totalSumm=0;inputs.forEach(function(item){totalSumm+=parseFloat(item.getAttribute("data-cost").replace(/[,]+/g,"."))});servCost.textContent=totalSumm.toLocaleString("ru")}document.querySelector("body").addEventListener("click",function(e){var item=e.target;if(item.classList.contains("js-serv-checkbox")){if(item.classList.contains("clicked"))item.querySelector("input").removeAttribute("checked");else item.querySelector("input").setAttribute("checked",true);item.classList.toggle("clicked");item.parentNode.parentNode.classList.toggle("choosed");calc()}});var sidebar=new StickySidebar(".js-serv-sticky",{containerSelector:".services__content",innerWrapperSelector:".services__cost-sticky",topSpacing:document.querySelector(".header").offsetHeight+20,bottomSpacing:0});window.addEventListener("resize",function(){sidebar.updateSticky()});var gallerySwiper=new Swiper(".js-serv-car",{loop:false,speed:800,slidesPerView:6,spaceBetween:18,navigation:{nextEl:".js-serv-car ~ .swiper-button-next",prevEl:".js-serv-car ~ .swiper-button-prev"},breakpoints:{479:{slidesPerView:2,spaceBetween:10},700:{slidesPerView:3,spaceBetween:18},1199:{slidesPerView:5,spaceBetween:18}}});var _loop=function _loop(item){item.addEventListener("click",function(){if(!item.classList.contains("active")){var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=carElem[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var _item=_step3.value;_item.classList.remove("active")}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}item.classList.add("active");var imgOriginal=item.querySelector("img").getAttribute("data-original"),imgIndex=item.querySelector("img").getAttribute("data-index");mainImg.setAttribute("data-index",imgIndex);mainImg.src=imgOriginal}})};var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=carElem[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var item=_step2.value;_loop(item)}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var servLightbox=GLightbox({"selector":"services__device-glightbox"});window.serv=servLightbox;mainOver.addEventListener("click",function(){var eventClick=new Event("click"),lightImgs=document.querySelectorAll(".services__device-glightbox"),index=parseInt(mainImg.getAttribute("data-index"))-1;lightImgs[index].dispatchEvent(eventClick)})},comparison:function comparison(){var diffsBut=document.querySelector(".js-comparison-diffs"),allBut=document.querySelector(".js-comparison-all"),paramsInfo=document.querySelectorAll(".comparison__elem-params"),fixers=document.querySelectorAll(".js-comparison-fixer");var comparisonSwiper=new Swiper(".js-comparison-car",{loop:false,speed:800,slidesPerView:4,spaceBetween:30,navigation:{nextEl:".js-comparison-car ~ .swiper-buttons .swiper-button-next",prevEl:".js-comparison-car ~ .swiper-buttons .swiper-button-prev"},breakpoints:{600:{slidesPerView:1,spaceBetween:10},999:{slidesPerView:2,spaceBetween:20},1200:{slidesPerView:3,spaceBetween:30}}});var comparisonHrefs=document.querySelectorAll(".js-comparison-shaver");window.addEventListener("scroll",function(){var fixers=document.querySelectorAll(".js-comparison-fixer"),header=document.querySelector(".header"),diff=fixers[0].parentNode.getBoundingClientRect().top-header.offsetHeight,btnHeight=document.querySelector(".comparison__elem-tocart").offsetHeight+parseInt(getComputedStyle(document.querySelector(".comparison__elem-tocart")).marginTop)/2,fixerHeight=fixers[0].offsetHeight,mainHeight=fixers[0].parentNode.parentNode.offsetHeight-btnHeight,scrollFixed=0;if(diff<20){scrollFixed=Math.abs(diff)+20}if(Math.abs(diff)+20+fixerHeight<mainHeight){fixers.forEach(function(fixer){if(scrollFixed){fixer.parentNode.style.height=fixerHeight+"px";fixer.style.top=scrollFixed+"px";fixer.classList.add("fixed")}else{fixer.parentNode.removeAttribute("style");fixer.removeAttribute("style");fixer.classList.remove("fixed")}})}});var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=comparisonHrefs[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var comparisonHref=_step4.value;shave(comparisonHref,50)}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}allBut.addEventListener("click",function(e){e.preventDefault();var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=paramsInfo[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var paramInfo=_step5.value;paramInfo.querySelectorAll(".hidden").forEach(function(item){return item.classList.remove("item")})}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}});diffsBut.addEventListener("click",function(e){e.preventDefault();if(diffsBut.classList.contains("active"))return;diffsBut.classList.add("active");allBut.classList.remove("active");var _loop2=function _loop2(i){var defaultVal=paramsInfo[0].querySelectorAll(".comparison__elem-params-row")[i].querySelector(".comparison__elem-params-val").textContent,haveDiff=false;paramsInfo.forEach(function(paramElem,index){if(index&&!haveDiff&&paramElem.querySelectorAll(".comparison__elem-params-row")[i].querySelector(".comparison__elem-params-val").textContent!==defaultVal){haveDiff=!haveDiff}});if(!haveDiff){var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=paramsInfo[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var paramElem=_step6.value;paramElem.querySelectorAll(".comparison__elem-params-row")[i].classList.add("hidden")}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}}};for(var i=0;i<paramsInfo[0].querySelectorAll(".comparison__elem-params-row").length;i++){_loop2(i)}});allBut.addEventListener("click",function(e){e.preventDefault();if(allBut.classList.contains("active"))return;diffsBut.classList.remove("active");allBut.classList.add("active");var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=paramsInfo[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var paramInfo=_step7.value;paramInfo.querySelectorAll(".hidden").forEach(function(item){return item.classList.remove("hidden")})}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}})},init:function init(){var _self=this;if(document.querySelectorAll(".card__list .card__elem-info").length)this.cardHeight();if(document.querySelectorAll(".js-search-icon").length)this.search();if(document.querySelectorAll(".js-ibanner").length)this.bannerCar();if(document.querySelectorAll(".js-iclients").length)this.clientsCar();if(document.querySelectorAll(".js-ireviews").length)this.reviewsCar();if(document.querySelectorAll(".js-iprojects").length)this.projectsCar();if(document.querySelectorAll(".js-inews-href").length)this.inewsToggler();if(document.querySelectorAll(".js-serv-checkbox").length)this.services();if(document.querySelectorAll(".js-page404-sticky").length)this.page404();if(document.querySelectorAll(".js-comparison-car").length)this.comparison();if(document.querySelectorAll(".js-burger").length)this.burger();if(document.querySelectorAll(".js-recent").length)this.recentCar();if(document.querySelectorAll(".js-reviews-star").length){var stars=document.querySelectorAll(".js-reviews-star");stars.forEach(function(star){star.addEventListener("click",function(){stars.forEach(function(star){return star.classList.remove("choosed")});_self.prevAll(star).forEach(function(elem){return elem.classList.add("choosed")});star.classList.add("choosed");document.querySelector(".js-reviews-starinput").value=star.getAttribute("data-star")})})}if(document.querySelectorAll(".js-checkfake").length){var checkFake=document.querySelectorAll(".js-checkfake");checkFake.forEach(function(item){item.addEventListener("click",function(){if(item.classList.contains("clicked"))item.nextElementSibling.removeAttribute("checked");else item.nextElementSibling.setAttribute("checked",true);item.classList.toggle("clicked")})})}if(document.querySelectorAll(".js-print").length){var printBtn=document.querySelectorAll(".js-print");printBtn.forEach(function(item){item.addEventListener("click",function(){return window.print()})})}if(document.querySelectorAll(".js-common-file").length){var commonFile=document.querySelectorAll(".js-common-fileinput"),commonFileDelete=document.querySelectorAll(".js-common-filedelete");commonFile.forEach(function(fileInp){fileInp.addEventListener("change",function(e){var el=fileInp.nextElementSibling,path=fileInp.value.split("\\"),pathName=path[path.length-1].split("");pathName.length>=20?pathName=pathName.slice(0,18).join("")+"...":pathName=pathName.join("");el.textContent=pathName;el.classList.add("choosed")})});commonFileDelete.forEach(function(fileDelete){fileDelete.addEventListener("click",function(e){var el=fileDelete.previousElementSibling,fileInput=fileDelete.previousElementSibling.previousElementSibling;el.textContent=el.getAttribute("data-default");fileInput.value="";el.classList.remove("choosed")})})}if(document.querySelectorAll(".js-scrollTo").length){var scrollTo=document.querySelectorAll(".js-scrollTo");scrollTo.forEach(function(item){item.addEventListener("click",function(){var dstData=item.getAttribute("data-to"),dstPx=document.querySelector("[data-scroll=\""+dstData+"\"]").getBoundingClientRect().top+document.body.scrollTop-document.querySelector("header").offsetHeight-20;window.animation.scrollTo(dstPx,800)})})}this.resizeWatcher();var eventResize=new Event("resize");window.dispatchEvent(eventResize);var eventScroll=new Event("scroll");window.dispatchEvent(eventScroll)}}.init()};