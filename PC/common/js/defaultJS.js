// JavaScript Document
$(document).ready(function(){
	//닫기
	$(document).on('click','.close',function(){
		var tar = String($(this).attr('data-target'));
		$('.'+tar).hide();
	});
	
	//메인메뉴
	$('.lnb_wrap').hover(function(){
		$('#header .lnb_wrap .lnb > li > ul').stop().fadeIn('fast');
		$('.lnb_2depth').stop().slideDown('fast');
	},function(){
		$('#header .lnb_wrap .lnb > li > ul').stop().fadeOut('fast');
		$('.lnb_2depth').stop().slideUp('fast');
	});
	
	//레이어팝업
	$('[data-dialogCall]').on('click',function(){
		//오픈할 다이얼로그창
		var callName = $(this).attr('data-dialogCall');
		$('[data-dialog='+callName+']').fadeIn('fast');
		//닫기버튼 이벤트 입력
		$('[data-dialog='+callName+']').find('.close').on('click',function(){
			dialogWindowClose(callName)
		})
	})
	function dialogWindowClose(target){
		$('[data-dialog='+target+']').fadeOut('fast');
	}
	
});
