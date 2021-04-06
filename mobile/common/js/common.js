//아아폰 WebViewJavascriptBridge 설정
function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
/** 메뉴 스크립트 **/
//0. penLeft 설정
$(document).ready(function(){
	var closeSwipe = $('.menu_side')['0']
	var meunSwipe = new Hammer(closeSwipe);
	meunSwipe.on("swipeleft", function(e) {
		menuClose(e)
	});
})

//1. 메뉴열기
$(document).on('click','.m_nav',function(e){
 	e.preventDefault();
	menuOpen(e)

 	//아이폰 openMenuCallback 함수 호출 
 	setupWebViewJavascriptBridge(function(bridge) {
 	
 		bridge.callHandler('openMenuCallback', {'menustatus': 'open'}, function(response) {
			//log('JS got response', response)
		})
	})
 	//안드로이드 openMenuCallback 함수 호출 
	window.AndroidJavascriptBridge.openMenuCallback("{'menustatus': 'open'}");
});

//2. 메뉴닫기
$(document).on('click scroll swipeleft','.menu_side .close, .menu_side .ly_dimmed',function(e){
	e.preventDefault();
	menuClose (e)
	
 	//아이폰 closeMenuCallback 함수 호출 
	setupWebViewJavascriptBridge(function(bridge) {
 		bridge.callHandler('closeMenuCallback', {'menustatus': 'close'}, function(response) {
			//log('JS got response', response)
		})
	})
	
 	//안드로이드 closeMenuCallback 함수 호출 
	window.AndroidJavascriptBridge.closeMenuCallback("{'menustatus': 'close'}");
});

// 계좌번호 복사하기
$(document).ready(function(){
	var clipboard = new ClipboardJS('.copyAccount > a');
	clipboard.on('success', function(e) {
		window.alert('복사완료:'+ e.text)
	});
})

//메뉴 열림
function menuOpen(e){
	$('.menu_side').show();
	$('.menu_side .ly_dimmed').fadeIn(240);
	var width = $('.menu_side').width();
	$('.menu_side > .inner').css({left:'-'+width+'px'});
	$('.menu_side > .inner').animate({left:'0px'},240);
	$('body').addClass('noscroll');
}

//메뉴 닫힘 
var sideMenuSwipe=0; //스와이프 오류 방지
function menuClose (e){
	if(sideMenuSwipe==0){
		sideMenuSwipe = 1; //작동
		var width = $('.menu_side').width();
		$('.menu_side > .inner').animate({left:'-'+width+'px'}, 240, function(){
			$('.menu_side > .inner > .con').animate({'scrollTop':'-9999px'})
			$('.menu_side .ly_dimmed').fadeOut(240,function(){
				$('.menu_side').delay(150).hide();
				sideMenuSwipe = 0; //정지
			})
		})
	};	
	$('body').removeClass('noscroll');
}

/***재료달력***/
//오픈
$(document).on('click','.calendar_month td a[data-more]',function(e){
 	e.preventDefault();
	calendarOpen(e)
})
//닫기
$(document).on('click','.viewArea .close, .viewArea .ly_dimmed',function(e){
	e.preventDefault();
	calendarClose (e)
})
function calendarOpen(e){
	var dataMore = e.currentTarget.attributes['data-more'].nodeValue;
	var classList = e.currentTarget.classList.contains('click')
	if(dataMore == "false" && dataMore != "true" && classList == false) {
		$(e.currentTarget).parents('tbody').find('a').removeClass('click')
		$(e.currentTarget).toggleClass('click')
		return false;
	} else if(dataMore == "false" && classList == true){
		$(e.currentTarget).removeClass('click')
		return false;
	} else{
		$(e.currentTarget).parents('tbody').find('a').removeClass('click')
		$('.viewArea').css({'width':'100%','height':'100%'}).addClass('visible');;
		return false;	
	}
}
function calendarClose (e){
	$('.viewArea').removeClass('visible').delay(200).animate({'width':'0%','height':'0%'},0);;
}

$(document).ready(function(){
	
	//공지사항 아코디언형 게시판
	$('.accordion').find('.item').on('click',function(e){
		$(this).siblings().find('.hiddenText').slideUp('fast');
		$(this).find('.hiddenText').slideToggle('fast');
		e.preventDefault();
	});
	
	//탭 스크립트
	function tabControl(){
		var tabName = $("[data-tabControl]");
		
		$(tabName).find('.tab-head ul > li').each(function(e){
			var indexNumber = $(this).index() + 1
			var tabContents = $(this).parent().parent().siblings('.tab-body')

			$(this).on('click',function(e){
				$(this).siblings().removeClass('active')
				$(this).addClass('active')
				tabContents.find('.tab-contents').hide()
				tabContents.find('.tab-contents:nth-child('+ indexNumber +')').show()
				e.preventDefault()
			})
		})
	}
	tabControl()
})

//동영상사이즈 리사이즈
function moiveSize(){
	var movieW = $('.youtubeFrame').width();
	var movieRe = (movieW / 16) * 9;
	$('.youtubeFrame').height(movieRe);
}
$(document).ready(function(){
	moiveSize();
})
$(window).resize(function(){
	moiveSize();
})

//ESC, F5 막기
//document.onkeydown = function (e) {
//    key = (e) ? e.keyCode : event.keyCode;
//    if (key == 27 || key == 116) {
//        if (e) {
//            e.preventDefault();
//        } else {
//            event.keyCode = 0;
//            event.returnValue = false;
//        }
//    }
//}

//오른쪽마우스 막기
//document.oncontextmenu = function (e) {
//    if (e) {
//        e.preventDefault();
//    } else {
//        event.keyCode = 0;
//        event.returnValue = false;
//    }
//}
