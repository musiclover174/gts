'use strict';window.onload=function(){window.gts={};window.gts.form={init:function init(){var _th=this;$('.js-phone').mask('+7(999) 999-9999');$('form').submit(function(){if(!_th.checkForm($(this)))return false})},checkForm:function checkForm(form){var checkResult=true;form.find('.warning').removeClass('warning');form.find('input, textarea, select').each(function(){if($(this).data('req')){switch($(this).data('type')){case'tel':var re=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;if(!re.test($(this).val())){$(this).addClass('warning');checkResult=false}break;case'email':var re=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;if(!re.test($(this).val())){$(this).addClass('warning');checkResult=false}break;default:if($.trim($(this).val())===''){$(this).addClass('warning');checkResult=false}break;}}});return checkResult}}.init();window.gts.animator={hideBlock:function hideBlock(block){block.clearQueue().stop().animate({'opacity':0},400,function(){block.removeAttr('style').removeClass('visible')})},showBlock:function showBlock(block,dir,duration,pause){if(dir===undefined){dir='btt'}if(duration===undefined){duration=1200}if(pause===undefined){pause=0}if(/Mobi/.test(navigator.userAgent)){pause=0;duration=400}setTimeout(function(){switch(dir){case'rtl':block.animate({'right':0,'opacity':1},duration,'linear',function(){$(this).addClass('visible')});break;case'ltr':block.animate({'left':0,'opacity':1},duration,'linear',function(){$(this).addClass('visible')});break;case'ttb':block.animate({'top':0,'opacity':1},duration,'linear',function(){$(this).addClass('visible')});break;case'btt':block.animate({'bottom':0,'opacity':1},duration,'linear',function(){$(this).addClass('visible')});break;case'fi':block.animate({'opacity':1},duration,'linear',function(){$(this).addClass('visible')});break;default:break;}},pause)},startCheckVis:function startCheckVis(){var _th=this;var visArea=$(window).scrollTop()+$(window).height();$('.animator').each(function(){if($(this).offset().top>=visArea)$(this).removeClass('visible')})},checkVisibility:function checkVisibility(block){var visArea=$(window).scrollTop()+$(window).height()*.7;if(block.offset().top<visArea)return true;else return false},scrollVis:function scrollVis(){var _th=this;$('.animator').each(function(){if(!$(this).hasClass('visible')){if(_th.checkVisibility($(this)))_th.showBlock($(this),$(this).data('dir'),$(this).data('duration'),$(this).data('pause'))}else{if(!_th.checkVisibility($(this)))_th.hideBlock($(this))}})},init:function init(){var _th=this;_th.startCheckVis();$(window).scroll(function(){_th.scrollVis()});return this}}.init();window.gts.obj={animationInProgress:false,init:function init(){var _self=this;$('select').styler();// styler initialize
$('.js-dot').dotdotdot();// dots initialize
$('[data-fancybox]').fancybox();// fancy init
$(window).trigger('scroll');return}}.init()};