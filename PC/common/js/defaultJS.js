// JavaScript Document
$(document).ready(function(){
	//닫기
	$('.close').on('click',function(){
		var tar = String($(this).attr('data-target'));
		$('.'+tar).slideUp('fast');
	});
	
	//메인메뉴
	$('.lnb_wrap').hover(function(){
		$('#header .lnb_wrap .lnb > li > ul').stop().fadeIn('fast');
		$('.lnb_2depth').stop().slideDown('fast');
	},function(){
		$('#header .lnb_wrap .lnb > li > ul').stop().fadeOut('fast');
		$('.lnb_2depth').stop().slideUp('fast');
	});
});
