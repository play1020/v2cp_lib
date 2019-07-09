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

$(document).on('click','.m_nav',function(e){
 	e.preventDefault();
 	$('.menu_side').show();
	$('.ly_dimmed').fadeIn(240);
	var width = $('.menu_side').width();
	$('.menu_side > .inner').css({left:'-'+width+'px'});
	$('.menu_side > .inner').animate({left:'0px'},240);
	$('body').addClass('noscroll');

 	//아이폰 openMenuCallback 함수 호출 
 	setupWebViewJavascriptBridge(function(bridge) {
 	
 		bridge.callHandler('openMenuCallback', {'bsh': 'bsh'}, function(response) {
			//log('JS got response', response)
		})
	})
 	//안드로이드 openMenuCallback 함수 호출 
	window.AndroidJavascriptBridge.openMenuCallback("{'bsh': 'bsh'}");
});

var sideMenuSwipe=0; //스와이프 오류 방지
$(document).on('click scroll swipeleft','.menu_side .close, .menu_side .ly_dimmed',function(e){
	e.preventDefault();
	
	if(sideMenuSwipe==0){
		sideMenuSwipe = 1; //작동
		var width = $('.menu_side').width();
		$('.menu_side > .inner').animate({left:'-'+width+'px'}, 240, function(){
			$('.ly_dimmed').fadeOut(240,function(){
				$('.menu_side').delay(150).hide();
				sideMenuSwipe = 0; //정지
			})
		})
	};
	
	$('body').removeClass('noscroll');
	

 	//아이폰 closeMenuCallback 함수 호출 
	setupWebViewJavascriptBridge(function(bridge) {
	 	
 		bridge.callHandler('closeMenuCallback', {'bsh1': 'bsh1'}, function(response) {
			//log('JS got response', response)
		})
	})
	
 	//안드로이드 closeMenuCallback 함수 호출 
	window.AndroidJavascriptBridge.closeMenuCallback("{'bsh1': 'bsh1'}");
});