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
	
	//레이어팝업
	$('[data-dialogCall]').on('click',function(e){
		if($(this).attr('data-dialogCall') == "false") return false;
		$('body').addClass('dialogOpen')
		//오픈할 다이얼로그창
		var callName = $(this).attr('data-dialogCall');
		$('[data-dialog='+callName+']').fadeIn('fast');
		e.preventDefault();
		//닫기버튼 이벤트 입력
		$('[data-dialog='+callName+']').find('.close, .dialog_bg').on('click',function(){
			dialogWindowClose(callName)
			$('body').removeClass('dialogOpen')
			return false;
		})
	})
	function dialogWindowClose(target){
		$('[data-dialog='+target+']').fadeOut('fast');
	}
	
	//탭 기본
	$('*[data-tab="tab-default"]').each(function(){
		$(this).find('.tab-button > a').on('click',function(){
			$(this).siblings().removeClass('active')
			$(this).addClass('active')
			var abc = parseInt($(this).index()) + 1
			$(this).parents().parents().find('.tab-container > .tab-contents').hide()
			$(this).parents().parents().find('.tab-container > .tab-contents:nth-child('+abc+')').show()
			return false;
		})
	})
	
	//메인메뉴 - 전문가 목록
	$('.all_anal').hover(function(){
		$(this).find('.list').fadeIn('fast')
	},function(){
		$(this).find('.list').fadeOut('fast')
	})

	$('.all_anal .list  .body  .tr  .td a').on('mouseover',function(){
		var data1 = $(this).attr('data-anal')
		var data2 = $(this).attr('data-ment')
		var data3 = $(this).attr('data-src')
		$('.all_anal .list .head .txt .anal').html(data1)
		$('.all_anal .list .head .txt .ment').html(data2)
		$('.all_anal .list .head .pic img').attr('src',data3)
	})
	
});
