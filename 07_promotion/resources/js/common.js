(function($){
	// to avoid crash caused by browser not support 'console' object;
	var log = (console && console.log) ? function(){console.log.apply(console, arguments);} : function(){};
	
	var map = null;

	// start ajax plugin
	log('Setup default common ajax callback.');
	
	// ajax handlers
	function handleRedirect(event, jqXHR, ajaxOps, data){
		log('[' + event.type + ']ajax.handleRedirect(), ', arguments);
		
		if(data && data.__redirectUri__){
			if(confirm(data.resultMessage))
				location.href = data.__redirectUri__;
			else
				log('Page Redirect was canceled. [' + data.__redirectUri__ + ']');
		}
	}
	
	// function for ajax setup
	// Ref := http://api.jquery.com/category/ajax/global-ajax-event-handlers/
	//TODO : ajax 호출흐름 정리
	function ajaxSetup(){
		var $document = $(document);
		$document.ajaxSuccess(handleRedirect);
		$document.ajaxComplete(handleRedirect);
		//$document.ajaxStop(handleRedirect);
	}

	// lazy bind plug-in
	$(document).ready(ajaxSetup);
	
	/*
	// common ajax callback for 30x.
	function _30x(){
		console.log("30x was responsed. ", arguments);
	}
	
	// for ajaxSetup() and statusCode option
	//   := http://api.jquery.com/jQuery.ajaxSetup/
	//   := http://api.jquery.com/jQuery.Ajax/
	// for http status code := http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	var setup = {statusCode:{}};
	setup.statusCode['301'] = _30x;
	setup.statusCode['302'] = _30x;
	setup.statusCode['303'] = _30x;
	setup.statusCode['307'] = _30x;

	$.ajaxSetup();
	*/
	
})(jQuery);

// Redirect에 대한 테스트 객체. template()을 제외한 나머지 function()으로 테스트를 수행
var ajax_test = {
	template: function(url){
		var deferred = $.getJSON('http://localhost:8080/simple-web/ajax-redirect/' + url);
		
		function fac(deferred, callback){
			deferred[callback](
				function(){
					console.log('ajax.' + callback + '()', arguments);
				}
			);
		};
		
		fac(deferred, 'done');
		fac(deferred, 'fail'); // call by logical error. server response with not success code(1000)
		fac(deferred, 'always');
		fac(deferred, 'then');
	},
	success : function(){ this.template("getBoardInfo.json?seqNo=1"); },
	jsonResponse : function(){ this.template('response-body'); },
	http30x : function(){ this.template('http-status'); }
};

//2017.02 추가
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//사용자 아이디 정합성 체크
function checkId(inputUserId, layerId){
	var logid = document.getElementById(inputUserId);
	
	var availableCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=+\|()*&^%$#@!~`?></;,.:'";  	
	var availableCharacterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var availableCharacterNum = "0123456789";
	
	logid.value = logid.value.replace(/^\s+|\s+$/g, '');
  	
	// 길이체크
	if((logid.value.length < 4)||(logid.value.length > 20)){

		var errStr = "회원아이디는 4자리이상 20자리 미만으로 입력 가능 합니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}		
		logid.value = ""; logid.focus();
		return false;
	}
	/*
	re = /[~!@\#$%^&*\()\-=+_']/gi;
    if(re.test(logid.value)){

		var errStr = "특수문자는 입력하실수 없습니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}        
        logid.value = "";
        return
    }
	*/
    re2 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
    if(re2.test(logid.value)){
        
		var errStr = "한글은 입력하실수 없습니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
		
        logid.value = "";
        return
    }
    

	// 적합성 체크
	var a, b, c, d; a = b = c = d = 0;
  		
	for(var i = 0; i < logid.value.length; i++) {
		if(availableCharacter.indexOf(logid.value.charAt(i)) != -1) d++;
		if(availableCharacterStr.indexOf(logid.value.charAt(i)) != -1) a++;
		if(availableCharacterNum.indexOf(logid.value.charAt(i)) != -1) b++;
	}
  	
	if(d == 0) { 
 
		var errStr = "회원아이디로 사용할 수 있는 문자열이 아닙니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
		
		logid.value = ""; logid.focus(); 
		return false; 
	}

  	var f=0;
	for(var i=0; i<logid.value.length; i++){
		for(var j=0; j<	logid.value.length; j++){
			if(logid.value.charAt(i) == logid.value.charAt(j)){
				f++;
				if(f == 4){ 

					var errStr = "회원아이디는 4자 이상 중복된 값은 사용할 수 없습니다.";
					if(layerId == ''){
						alert(errStr);
					}else{
						$("#"+layerId).text(errStr);
					}					
					logid.value = ""; logid.focus();  return false; 
				}
		    }else{f = 0;}
		}
	}
  	/*
	for(var i=0; i<availableCharacter.length-4; i++){
		for( var j=0; j<logid.value.length -4; j++){
			if((availableCharacter.charAt(i) == logid.value.charAt(j) 
					&& availableCharacter.charAt(i+1) == logid.value.charAt(j+1)
					&& availableCharacter.charAt(i+2) == logid.value.charAt(j+2)
					&& 	availableCharacter.charAt(i+3) == logid.value.charAt(j+3)) 
			|| (availableCharacter.charAt(i+3) == logid.value.charAt(j)
					&& availableCharacter.charAt(i+2) == logid.value.charAt(j+1)
					&& availableCharacter.charAt(i+1) == logid.value.charAt(j+2)
					&& availableCharacter.charAt(i) == logid.value.charAt(j+3))){
			    alert("회원아이디는 4자 이상 연속된 값은 사용할 수 없습니다");
			    logid.value = ""; logid.focus();
			    return false;
			}
		}
	}
	*/	  	
	return true;
}


//패스워드 정합성 체크
function checkPasswordLayerShow(pwsId,pwsReId,loginId,layerId) {
	
	var pws = document.getElementById(pwsId);
	var pwsRe = document.getElementById(pwsReId);
	var ukey = document.getElementById(loginId);
	
	var availableCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=+\|()*&^%$#@!~`?></;,.:'";  	
	var availableCharacterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var availableCharacterNum = "0123456789";
	var availableCharacterSpc = "!@#$%^&*()";
	
	pws.value = pws.value.replace(/^\s+|\s+$/g, '');
  	
	// 길이체크
	if((pws.value.length < 10)||(pws.value.length > 20)){
		var errHtml = "띄어쓰기 없이 영문, 숫자, 특수문자 포함 10~20자 이내로 등록해 주십시오. <br/>- 한글 불가 / 4자 이상 중복된 값은 사용 불가합니다.";
		var errStr = "띄어쓰기 없이 영문, 숫자, 특수문자 포함 10~20자 이내로 등록해 주십시오. 한글 불가 / 4자 이상 중복된 값은 사용 불가합니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).html(errHtml);
		}
		pws.value = ""; pwsRe.value = "";
		//pws.focus();
		return false;
	}
  	
	// 유저 아이디는 패스워드로 사용할 수 없다.
	if(ukey.value == ''){
		var errStr = "먼저 사용자 아이디를 입력해주세요.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}		
		pws.value = ""; pwsRe.value = "";
		//pws.focus();
		return false;		
	}
	
	if(pws.value.indexOf(ukey.value)>-1){
		var errStr = "비밀번호는 사용자 아이디를 포함할 수 없습니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}		
		pws.value = ""; pwsRe.value = "";
		//pws.focus();
		return false;
	}
	/*
	re = /[~!@\#$%^&*\()\-=+_']/gi;
    if(re.test(pws.value)){

		var errStr = "특수문자 및 한글 불가 / 4자 이상 중복된 값은 사용 불가합니다. ";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
		
        pws.value = ""; pwsRe.value = "";
        return
    }
	 */
	re = /[!@#$%^&+=0123456789']/gi;
    if(!re.test(pws.value)){

    	var errStr = "하나 이상의 숫자나 특수문자(! @ # $ % ^ & + =)를 사용 하셔야 합니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
		
        pws.value = ""; pwsRe.value = "";
        return
    }
    var epw = pws.value;
    for (var i=0; i < epw .length; i++) {
		var ch_char = epw .charAt(i);
		var ch = ch_char.charCodeAt();
		if( (ch >= 32 && ch <= 47) || (ch >= 58 && ch <= 64) || (ch >= 91 && ch <= 96) || (ch >= 123 && ch <= 126) || (ch < 33 || ch > 126) ) {
			if( (ch != 33 && ch != 64 && ch != 35 && ch != 36 && ch != 37 && ch != 94 && ch != 38 && ch != 43 && ch != 61 ) ) {
				var errStr = "하나 이상의 숫자나 특수문자(! @ # $ % ^ & + =)를 사용 하셔야 합니다.";
				if(layerId == ''){
					alert(errStr);
				}else{
					$("#"+layerId).text(errStr);
				}
				
				 pws.value = ""; pwsRe.value = "";
			     return
			}
		}
	}
    
    re2 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
    if(re2.test(pws.value)){
		var errStr = "한글 불가 / 4자 이상 중복된 값은 사용 불가합니다. ";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
        
        pws.value = ""; pwsRe.value = "";
        return
    }
    

	// 적합성 체크
    var pattern_eng = /[a-zA-Z]/;	// 문자
    var checkValue = 0;
    
    if(!pattern_eng.test(pws.value)){
		var errStr = "띄어쓰기 없이 영문, 숫자, 특수문자 포함 10~20자 이내로 등록해 주십시오. - 한글 불가 / 4자 이상 중복된 값은 사용 불가합니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
        
        pws.value = ""; pwsRe.value = "";
        return
    }
    for(var i = 0; i < pws.value.length; i++) {
		if(availableCharacterNum.indexOf(pws.value.charAt(i)) != -1) {
			checkValue=  checkValue+1;
			break;
		}		 
	}
    for(var i = 0; i < pws.value.length; i++) {
		if(availableCharacterSpc.indexOf(pws.value.charAt(i)) != -1) {
			checkValue = checkValue +1;
			break;
		}		
	}
    //console.log("checkValue = "+checkValue);
    if(checkValue <= 0){
		var errStr = "띄어쓰기 없이 영문, 숫자, 특수문자 포함 10~20자 이내로 등록해 주십시오. - 한글 불가 / 4자 이상 중복된 값은 사용 불가합니다.";
		if(layerId == ''){
			alert(errStr);
		}else{
			$("#"+layerId).text(errStr);
		}
        
        pws.value = ""; pwsRe.value = "";
        return
    }

	var f=0;
	for(var i=0; i<pws.value.length; i++){
		for(var j=0; j<	pws.value.length; j++){
			if(pws.value.charAt(i) == pws.value.charAt(j)){
				f++;
				if(f == 4){ 
					var errStr = "한글 불가 / 4자 이상 중복된 값은 사용 불가합니다.";
					if(layerId == ''){
						alert(errStr);
					}else{
						$("#"+layerId).text(errStr);
					}							
					pws.value = ""; pwsRe.value = ""; pws.focus();  return false;
				}
			}else{f = 0;}
		}
	}	
  	
	for(var i=0; i<availableCharacter.length-4; i++){
	  for( var j=0; j<pws.value.length -4; j++){
			if((availableCharacter.charAt(i) == pws.value.charAt(j) 
					&& availableCharacter.charAt(i+1) == pws.value.charAt(j+1)
					&& availableCharacter.charAt(i+2) == pws.value.charAt(j+2)
					&& 	availableCharacter.charAt(i+3) == pws.value.charAt(j+3)) 
			|| (availableCharacter.charAt(i+3) == pws.value.charAt(j)
					&& availableCharacter.charAt(i+2) == pws.value.charAt(j+1)
					&& availableCharacter.charAt(i+1) == pws.value.charAt(j+2)
					&& availableCharacter.charAt(i) == pws.value.charAt(j+3))){

				var errStr = "한글 불가 / 4자 이상 연속된 값은 사용 불가합니다.";
				if(layerId == ''){
					alert(errStr);
				}else{
					$("#"+layerId).text(errStr);
				}			    
			    pws.value = ""; pwsRe.value = "";
			    pws.focus();
			    return false;
			}
	  }
	}	  	
	return true;	
}

//이메일 유효성 검사
function emailChkValid(emailstr){
	
	var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	 
	if(regex.test(emailstr) === false) {
		return false;
	} else {
	 return true;
	}	
}

function checkPassword(pwsId,pwsReId,loginId) {
	return checkPasswordLayerShow(pwsId,pwsReId,loginId,"");
}

//숫자인지 확인한다.
function isNumber(val){
	regNumber = /^[0-9]*$/;
	if(!regNumber.test(val)) {
	    return false;
	}else{
		return true;
	}	
}

/**
 * 주소 검색 팝업 Start
**/
function search_post(){
	window.open("/rent/info/pop_searchaddr.do","pop","width=400, height=480");
}

function jusoCallBack(roadAddrPart1,addrDetail,jibunAddr, zipNo){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	$("[name=zip]").val(zipNo);
	$("[name=addr]").val(roadAddrPart1);
	$("[name=dtladdr]").val(addrDetail);
}

/**
 * 주소 검색 팝업 End
**/

function checkEngNumStr(val){
	var str = val;
	if ( str.match(/[^a-zA-Z0-9]/) != null ) {
	  alert("숫자와 영문만 입력할 수 있습니다.");
	  return false;
	}		
	return true;
}


function newCheckEngNumStr(obj){
	var str = obj.value;
	if ( str.match(/[^a-zA-Z0-9]/) != null ) {
	  alert("숫자와 영문만 입력할 수 있습니다.");
	  $(obj).val(str.substring(0,str.length-1));
	  //$(obj).val( str.trim() );
	  //$(obj).val("");
	}		
}

/**
 * 입력 변수에 3 자리마다 콤마(,)를 붙여 반환한다.
 * @param field 콤마를 붙일 값
 */
function formatCommas(numString) {
    var re = /,|\s+/g;
    numString = numString.replace(re, "");

    re = /(-?\d+)(\d{3})/;
    while (re.test(numString)) {
        numString = numString.replace(re, "$1,$2");
    }
    return numString;
}

//날짜차이 계산
function calBetnDate(stDate, endDate){
	var stDateArr = stDate.split("-");  
	var endDateArr = endDate.split("-");
	  
	var stDateObj = new Date(stDateArr[0], Number(stDateArr[1])-1, stDateArr[2]);  
	var endDateObj = new Date(endDateArr[0], Number(endDateArr[1])-1, endDateArr[2]);
	  
	var betweenDay = (endDateObj.getTime() - stDateObj.getTime());
	
	return betweenDay;
}

//loading 이미지 보이기
function showloading(){
	$("#loading").attr("style","visibility: visible !important; display: table !important;");
}
//loading 이미지 숨기기
function hideloading(){
	$("#loading").attr("style","visibility: visible !important; display: none;");
}

//input 입력 제한[S]
function check_key() {
	 var char_ASCII = event.keyCode;
console.log("char_ASCII="+char_ASCII);
	  //숫자
	 if ((char_ASCII >= 48 && char_ASCII <= 57) || (char_ASCII>=96 && char_ASCII<=105))
		   return 1;
	 //영어
	 else if ((char_ASCII>=65 && char_ASCII<=90) || (char_ASCII>=97 && char_ASCII<=122))
		    return 2;
	 //특수기호
	 else if ((char_ASCII>=33 && char_ASCII<=47) || (char_ASCII>=58 && char_ASCII<=64) 
	   || (char_ASCII>=91 && char_ASCII<=96) || (char_ASCII>=123 && char_ASCII<=126))
		 return 4;
	 
	 else if (char_ASCII == 8 || char_ASCII == 9)
		 return 5;
	 
	 else
		 return 0;
}

function noNumberKey() {
	var flag = true;
	if(check_key() == 1) {
		event.returnValue = false;
	  //alert("숫자는 입력 불가합니다.");
		flag = false;
	}
	return flag;
}

function onlyNumberKey() {
	var flag = true;
	if(!(check_key() == 1 || check_key() ==5)) {
		event.returnValue = false;
		//alert("숫자만 입력 가능합니다.");
		flag = false;
	}
	return flag;
}

function newOnlyNumberKey(obj) {
	var str = obj.value;
	var pattern = /^[0-9]+$/; //숫자 패턴
	var checkedLength = str.length
	
	if(!pattern.test(str) && checkedLength != 0){
		alert("숫자만 입력 가능합니다.");
		$(obj).val("");
	}
	
	/*
	if(!(check_key() == 1)) {
		alert("숫자만 입력 가능합니다.");
		$(obj).val(str.substring(0,str.length-1));
	}
	*/
}

function noKorKey(obj) {
	var kor_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	var val = obj.value;
	var length = val.length;
	var flag = true;
	
	if(kor_pattern.test(val)){
		if(length == 1){
			obj.value="";
		}else{
			obj.value=val.substring(0,length-1);
		}
		alert("한글은 입력 불가합니다.");
		flag = false;
	}
	return flag;
}

function checkLength(num, obj){
	if(obj.value.length == num){
		event.returnValue = false;
		//alert("최대 "+num+"자 입력가능합니다.");
		return;
	}
}
//input 입력 제한[E]
//쿠키 처리[S]
function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; 
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
         start += cName.length;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}
//쿠키 처리[E]

//자세히보기(지도보기(지점))
function viewBranch(branchId, type, corpCode){
	
	if(corpCode == "P00000028170" || corpCode == "P00000001067" || corpCode == "P00000028232"){
		alert("임직원 제휴사 페이지 에서는 네이버 지도 서비스를 이용 할 수 없습니다.")
		return false;
	}
	
	//버튼 append 된거 초기화
	$(".btn-box.text-c.popup-btn").empty();
	
	//var shortBranchInfo.clear();
	var jsonData = {"branchId" : branchId};
	var jsonUrl = '/rent/custcnte/branch/viewBranchMap.json';
	var data = JSON.stringify(jsonData);
	
	if(type == "long"){
		jsonUrl = '/rent/custcnte/branch/viewLongBranchMap.json';
	}else{
		jsonUrl = '/rent/custcnte/branch/viewBranchMap.json';
	}
	
	/*
	$.ajaxSetup({
		   'beforeSend': function(xhr) {           
		      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		    }
	});
	*/
	$.ajax({ 
		url : jsonUrl,
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		mimeType: 'application/json',
		processData : false,
		data : data,
		cache : false,			   
		error : function(x, e){
		   alert("요청하신 작업을 수행하던 중 예상치 않게 중지되었습니다. \n\n다시 시도해 주십시오.");
		}, 
		success : function(data){
			$(".dimd").css({display:"block"});
			$("#modal-office-detail").css("display", "block");
		   
			var mapOptions = {
				zoom: 16
			};
			map = new naver.maps.Map('iframe-map', mapOptions);
		   
			var shortBranchInfo =data.shortBranchInfo;
			
			if(type == "long"){
				shortBranchInfo =data.longBranchInfo;
			}else{
				shortBranchInfo =data.shortBranchInfo;
			}
			
			var myaddress = shortBranchInfo.addr + shortBranchInfo.dtladdr;
		   
			//[S]팝업(footer에 위치)열고 지도 삽입
			naver.maps.Service.geocode({address: myaddress}, function(status, response) {
				if (status !== naver.maps.Service.Status.OK) {
					return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
				}
				var resultData = response.result;
				var myaddr = new naver.maps.Point(resultData.items[0].point.x, resultData.items[0].point.y);
				
				map.setCenter(myaddr);
				
				var marker = new naver.maps.Marker({
					position: myaddr,
					map: map
				});
				
				naver.maps.Event.addListener(marker, "click", function(e) {
					if (infowindow.getMap()) {
						infowindow.close();
					} else {
						infowindow.open(map, marker);
					}
				});
				
				var html = '<a href="#none" onclick="quickMapSearch(\''+shortBranchInfo.addr+"', '"+ resultData.items[0].point.x +"', '"+ resultData.items[0].point.y +"'"+")\" class='btn btn-line1 btn-fix3 btn-large'>"+"빠른 길찾기"+"</a>";
				/*html += "<a href='#none' onclick='mapPopupPrint()' class='btn btn-color1 btn-fix3 btn-large'>"+"프린트하기"+"</a>";*/
				$(".btn-box.text-c.popup-btn").append(html);
				
			});
			//[E]팝업열고 지도 삽입
		   
			$("#modal-office-detail .modal-box .office-name.clearfix.text-r .fl.cl-bold").text(shortBranchInfo.branchNm);
		   
			//월간대여 셋팅
			if(shortBranchInfo.mmRentYn == "Y"){
				$("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point2").show();	   
			}else{
				$("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point2").hide();
			}
			
			//단기대여 셋팅
			if(shortBranchInfo.shRentYn == "Y"){
				$("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point1").show();	   
			}else{
				$("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point1").hide();
			}
			
			//기사포함 셋팅
			if(shortBranchInfo.branchId == ""){
				$("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-deafult").show();	   
			}else{
				$("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-deafult").hide();
			}
			
			$("#modal-office-detail .list-info.v1 .addr-area").text(myaddress);
			$("#modal-office-detail .list-info.v1 .tel-area").text(shortBranchInfo.telNo);

//		   $(".dimd").css({display:"block"});
//		   //[S]팝업(footer에 위치)열고 지도 삽입
//		   $("#modal-office-detail").css("display", "block");
//		   
//		   var lng = data.rMap.addresses[0].x;
//		   var lat = data.rMap.addresses[0].y;
//		   
//		   //var lng = data.rMap.result.items[0].point.x;
//		   //var lat = data.rMap.result.items[0].point.y;
//		   var mapOptions = {
//				    center: new naver.maps.LatLng(lat, lng),
//				    zoom: 10
//				};
//				
//		   var map = new naver.maps.Map('iframe-map', mapOptions);
//		   
//		   var marker = new naver.maps.Marker({
//			   position: new naver.maps.LatLng(lat, lng),
//			   map : map
//		   });
//		   //[E]팝업열고 지도 삽입
//		   
//		   var shortBranchInfo = null;
//		   shortBranchInfo = data.shortBranchInfo;
//		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .fl.cl-bold").text(shortBranchInfo.branchNm);
//		   
//		   //월간대여 셋팅
//		   if(shortBranchInfo.mmRentYn == "Y"){
//			   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point2").show();	   
//		   }else{
//			   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point2").hide();
//		   }
//		   
//		   //단기대여 셋팅
//		   if(shortBranchInfo.shRentYn == "Y"){
//			   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point1").show();	   
//		   }else{
//			   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point1").hide();
//		   }
//		   
//		   //기사포함 셋팅
//		   if(shortBranchInfo.branchId == ""){
//			   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-deafult").show();	   
//		   }else{
//		       $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-deafult").hide();
//		   }
//		   
//		   $("#modal-office-detail .list-info.v1 .addr-area").text(shortBranchInfo.addr+shortBranchInfo.dtladdr);
//		   $("#modal-office-detail .list-info.v1 .tel-area").text(shortBranchInfo.telNo);
//		   
//		   var html = '<a href="#none" onclick="quickMapSearch(\''+shortBranchInfo.addr+"', '"+ lng +"', '"+ lat +"'"+")\" class='btn btn-line1 btn-fix3 btn-large'>"+"빠른 길찾기"+"</a>";
//		   /*html += "<a href='#none' onclick='mapPopupPrint()' class='btn btn-color1 btn-fix3 btn-large'>"+"프린트하기"+"</a>";*/
//		   
//		   $(".btn-box.text-c.popup-btn").append(html);
	   }
	});
}		

//자세히보기(지도보기(공업사))
function viewGarage(indstryCoId){
	//버튼 append 된거 초기화
	$(".btn-box.text-c.popup-btn").empty();
	
	var jsonData = {"indstryCoId" : indstryCoId};
	var data = JSON.stringify(jsonData);
	
	$.ajaxSetup({
		   'beforeSend': function(xhr) {           
		      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		    }
	});
	
	$.ajax({ 
		url : '/rent/custcnte/garage/viewGarageMap.json',
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		mimeType: 'application/json',
		processData : false,
		data : data,
		cache : false,			   
	    error : function(x, e){
		   alert("요청하신 작업을 수행하던 중 예상치 않게 중지되었습니다. \n\n다시 시도해 주십시오.");
	   }, success : function(data){
		   $(".dimd").css({display:"block"});
			$("#modal-office-detail").css("display", "block");
		   
			var mapOptions = {
				zoom: 16
			};
			map = new naver.maps.Map('iframe-map', mapOptions);
		   
			var skGarageInfo = data.skGarageInfo;
			var myaddress = skGarageInfo.addr + skGarageInfo.dtladdr;
			
			//[S]팝업(footer에 위치)열고 지도 삽입
			naver.maps.Service.geocode({address: myaddress}, function(status, response) {
				if (status !== naver.maps.Service.Status.OK) {
					return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
				}
				var resultData = response.result;
				var myaddr = new naver.maps.Point(resultData.items[0].point.x, resultData.items[0].point.y);
				
				map.setCenter(myaddr);
				
				var marker = new naver.maps.Marker({
					position: myaddr,
					map: map
				});
				
				naver.maps.Event.addListener(marker, "click", function(e) {
					if (infowindow.getMap()) {
						infowindow.close();
					} else {
						infowindow.open(map, marker);
					}
				});
				
				var html = '<a href="#none" onclick="quickMapSearch(\''+skGarageInfo.addr+"', '"+ resultData.items[0].point.x +"', '"+ resultData.items[0].point.y +"'"+")\" class='btn btn-line1 btn-fix3 btn-large'>"+"빠른 길찾기"+"</a>";
				/*html += "<a href='#none' onclick='mapPopupPrint()' class='btn btn-color1 btn-fix3 btn-large'>"+"프린트하기"+"</a>";*/
				$(".btn-box.text-c.popup-btn").append(html);
				
			});
			//[E]팝업열고 지도 삽입
		   
		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .fl.cl-bold").text(skGarageInfo.indstryCoNm);
		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point2").hide();
		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point1").hide();
		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-deafult").hide();
		   
		   $("#modal-office-detail .list-info.v1 .addr-area").text(skGarageInfo.addr+' '+skGarageInfo.dtladdr);
		   $("#modal-office-detail .list-info.v1 .tel-area").text(skGarageInfo.telNo);
		   
		   
//		   $(".dimd").css({display:"block"});
//		   //[S]팝업(footer에 위치)열고 지도 삽입
//		   $("#modal-office-detail").css("display", "block");
//		   
//		   var lng = data.rMap.addresses[0].x;
//		   var lat = data.rMap.addresses[0].y;
//		   
//		   //var lng = data.rMap.result.items[0].point.x;
//		   //var lat = data.rMap.result.items[0].point.y;
//		   var mapOptions = {
//				    center: new naver.maps.LatLng(lat, lng),
//				    zoom: 10
//				};
//				
//		   var map = new naver.maps.Map('iframe-map', mapOptions);
//		   
//		   var marker = new naver.maps.Marker({
//			   position: new naver.maps.LatLng(lat, lng),
//			   map : map
//		   });
//		   //[E]팝업열고 지도 삽입
//		   
//		   var skGarageInfo = data.skGarageInfo;
//		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .fl.cl-bold").text(skGarageInfo.indstryCoNm);
//		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point2").hide();
//		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-point1").hide();
//		   $("#modal-office-detail .modal-box .office-name.clearfix.text-r .cl-deafult").hide();
//		   
//		   $("#modal-office-detail .list-info.v1 .addr-area").text(skGarageInfo.addr+skGarageInfo.dtladdr);
//		   $("#modal-office-detail .list-info.v1 .tel-area").text(skGarageInfo.telNo);
//		   
//		   var html = '<a href="#none" onclick="quickMapSearch(\''+skGarageInfo.addr+"', '"+ lng +"', '"+ lat +"'"+")\" class='btn btn-line1 btn-fix3 btn-large'>"+"빠른 길찾기"+"</a>";
//		   /*html += "<a href='#none' onclick='mapPopupPrint()' class='btn btn-color1 btn-fix3 btn-large'>"+"프린트하기"+"</a>";*/
//		   
//		   $(".btn-box.text-c.popup-btn").append(html);
	   }
	});
}

//지도(빠른 길찾기)
function quickMapSearch(addr, lng, lat){
	var params = "";
	
	params += "?eX=" + lng;
    params += "&eY=" + lat;
    params += "&eText=" + addr; 
	
	var winfocus = window.open(encodeURI("http://maps.naver.com/" + params), "_blank");
    winfocus.focus();
}

//지도 프린트
function mapPopupPrint(){
	document.pz.printZone.value = $("#modal-office-detail").html();
	
	var frm = document.pz;
	var url = "/rent/print/pop_branchPrint.do";
	window.open("", "pz","width=800,height=700,top=0,left=0,noresizable,toolbar=no,status=no,scrollbars=yes,directory=no");
	frm.action = url;
	frm.method = "post";
	frm.target = "pz";
	frm.submit();
}

//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function removeComma(val){
	return ($.trim(val)).replace(/,/gi,'');
}

/* 숫자만 입력받기 */
function fn_press(event, type) {
    if(type == "numbers") {
        if((event.keyCode < 48) || (event.keyCode > 57)) return false;
        //onKeyDown일 경우 좌, 우, tab, backspace, delete키 허용 정의 필요
    }
}
/* 한글입력 방지 */
function fn_press_han(obj)
{
    //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
    if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
    || event.keyCode == 46 ) return;
    //obj.value = obj.value.replace(/[\a-zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
}	


function chkDate(str){
	if( str.length == 8 ){ 
		vDate = new Date();
		vDate.setFullYear(str.substring(0, 4));
		vDate.setMonth(Number(str.substring(4, 6))-1);
		vDate.setDate(str.substring(6));
		console.log(vDate);
		
		/*
		var vYear;
		
		if(str.substring(4,6) == 12){
			vYear = vDate.getFullYear() -1;
		}else{
			vYear = vDate.getFullYear();
		}
		*/
		
		var vYear = vDate.getFullYear();
		
		if( vYear != str.substring(0, 4) ||
			12 <  Number(str.substring(4, 6)) ||
			vDate.getDate()     != str.substring(6) ){
			return false;
		}
		return true;
	}
	return false;
}
/*
 * 날짜포맷에 맞는지 검사
 */
function isDateFormat(d) {
    var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return d.match(df);
}


/*
 * 윤년여부 검사
 */
function isLeaf(year) {
    var leaf = false;

    if(year % 4 == 0) {
        leaf = true;

        if(year % 100 == 0) {
            leaf = false;
        }

        if(year % 400 == 0) {
            leaf = true;
        }
    }

    return leaf;
}

/*
 * 날짜가 유효한지 검사
 */
function isValidDate(d) {
    // 포맷에 안맞으면 false리턴
    if(!chkDate(d)) {
        return false;
    }

    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var year = Number(d.substring(0, 4));
    var month = Number(d.substring(4, 6));
    var day = Number(d.substring(6));
    // 날짜가 0이면 false
    if(day == 0) {
        return false;
    }

    var isValid = false;
    
    // 윤년일때
    if(isLeaf(year)) {
        if(month == 2) {
            if(day <= month_day[month-1] + 1) {
                isValid = true;
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }
    } else {
        if(day <= month_day[month-1]) {
            isValid = true;
        }
    }

    return isValid;
}

// Backspace 기능 중지 
$(document).keydown(function(e) {
	if(e.keyCode === 8 &&e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA") {
		return false;
	}
});


function startKakaoTalkClick() {
	window.open("https://directtalk.skcarrental.com/front/v1/jsp/thirdparty/forwardKakao.jsp");
}

function startCommTalkClick() {
	//window.open("https://talk.skcarrental.com/sharedfront/jsp/thirdparty/forwardKakao.jsp");
	//window.open("http://pf.kakao.com/_csgBK");
	//goOutLinkPage('https://bizmessage.kakao.com/chat/open/@sk렌터카new고객센터');
	
	$.ajax({
		type : "post",
		url : "/rent/login/pop_chat_data.json",
		dataType : "json",
		data :  "",
		success : function(data){			
			console.log(data);
			var hostUrl = location.host;
			var goUrl = "https://"+hostUrl+"/rent/login/pop_kakao_chat.do?sessUserId="+data.userId+"&sessFinalInfo="+data.sessFinalInfo+"&inChannelId="+data.inChannelId+"&inChannelType=00";
			//sessUserId:${userId};sessFinalInfo:${sessFinalInfo};inChannelId:${inChannelId};inChannelType:${inChannelType}
			console.log(goUrl);
			
			goOutLinkPage(goUrl);
		},
		error : function(){
			alert('데이터 통신이 실패했습니다.\n잠시 후 다시 시도하세요.');
			return false;
		}
	})
	
}

function dateConvert(obj, type, differ){
	//obj는 $("#sDate").val() 혹은 $("#lDate").val()
	var day;
	if(obj == null || obj == ""){
		day = new Date();
	}else if(obj.indexOf("-") > 0){
		var year 	=  	obj.substring(0,4);
		var month 	= 	obj.substring(5,7);
		var day 	=	obj.substring(8,10);
		day = new Date(Date.parse(parseInt(year)+'/'+parseInt(month)+'/'+parseInt(day)));
	}else{
		var year 	=  	obj.substring(0,4);
		var month 	= 	obj.substring(4,6);
		var day 	=	obj.substring(6,8);
		day = new Date(Date.parse(parseInt(year)+'/'+parseInt(month)+'/'+parseInt(day)));
	}
	
	if(differ > 0){
		day.setDate(parseInt(day.getDate() + differ));
	}
	
	var d_yr = day.getFullYear();
	var d_mon = day.getMonth()+1;
	if(d_mon < 10){
		d_mon="0"+d_mon;
	}
	var d_day = day.getDate();
	if(d_day < 10){
		d_day = "0"+d_day;
	}
	
	var date;
	switch(type){
	case "yyyy-MM-dd":
		date = d_yr+"-"+d_mon+"-"+d_day;
		break;
	case "yyyy/MM/dd":
		date = d_yr+"/"+d_mon+"/"+d_day;
		break;
	case "yyyy.MM.dd":
		date = d_yr+"."+d_mon+"."+d_day;
		break;
	default:
		date = d_yr+d_mon+d_day;//yyyyMMdd
		break;
	}
	return date;
}

	
function isMobile() {
    var filter = "win16|win32|win64|mac|macintel|linux";
    if( navigator.platform  ){
      if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
        return true;
      }else{
        return false;
      }
    }
}

function goPrsnMypageSubMain(){
	showloading();
	location.href = "/rent/myrnt/prsn/sub_main.do";
}

function goCorpMypageSubMain(){
	showloading();
	location.href = "/rent/myrnt/corp/sub_main.do";
}

function getDigitNum(num) 
{	
    if (num < 10) return "0" + num;
    return "" + num;	
}

function convDateStr(date)
{
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y + "-" + getDigitNum(m) + "-" + getDigitNum(d);
}

function convDateFormat(date)
{
	return date.substr(6,4) + "-" + date.substr(0,2) + "-" + date.substr(3,2);
}

function printValue(selector)
{
	$(selector ).each(function( idx ) {
		  console.log( "*" + idx + ":" + this.name + ": " + this.value );
		});
}


var dateUtil = 
{
		getDigitNum:function (num) {	
		    if (num < 10) return "0" + num;
		    return "" + num;	
		},
		toYmd:function(date)
		{
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y + this.getDigitNum(m) + this.getDigitNum(d);
		},		
		toDate:function(ymd)
		{
			if  (ymd instanceof Date) return ymd;
			
			var y = ymd.substr(0,4);
			var m = ymd.substr(4,2);
			var d = ymd.substr(6,2);
			return new Date(y,parseInt(m)-1,d);
		},
		toDateStr:function(ymd, seperator)
		{
			if (ymd == null || ymd == "") return "";			
			var wkArry = ['일','월','화','수','목','금','토'];			
			var y = ymd.substr(0,4);
			var m = ymd.substr(4,2);
			var d = ymd.substr(6,2);
			var dt = new Date(y,parseInt(m)-1,d);			
			return y + seperator + m + seperator + d;
		},
		isWeekEnd:function(ymd) //금요일이나 토요일이면 true
		{
			var y = ymd.substr(0,4);
			var m = ymd.substr(4,2);
			var d = ymd.substr(6,2);
			var dt = new Date(y,parseInt(m)-1,d);	
			var day = dt.getDay();
			return day == 5 || day == 6; // 5나 6(금요일이나 토요일)이면 true
		},
		toDateDay:function(ymd)
		{
			if (ymd == null || ymd == "") return "";			
			var wkArry = ['일','월','화','수','목','금','토'];			
			var y = ymd.substr(0,4);
			var m = ymd.substr(4,2);
			var d = ymd.substr(6,2);
			var dt = new Date(y,parseInt(m)-1,d);			
			return y + "." + m + "." + d + "(" + wkArry[dt.getDay()] + ")"
		},
		addDates: function( ymd, days ) {
			
			var date = this.toDate(ymd);
			date.setDate(date.getDate() + days);
			return this.toYmd(date);
		},
		diffDate:function(ymd1, ymd2) {
			
			var date1 = this.toDate(ymd1);
			var date2 = this.toDate(ymd2);
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			return diffDays;
		}
}


//위탁 업체 리스트 목록
function getCompanyPopList(revDate, revSeq, revCd){
	// 팝업 타이틀 설정
	if(revCd == "SP"){
		$("#modal-pop-h3-title").text("Sales Partner");
		$("#modal-pop-table-title").text("사업자명");
		
	}else if(revCd == "SM"){
		$("#modal-pop-h3-title").text("스피드메이트 가맹점 600여 개소");
		$("#modal-pop-table-title").text("공업사명");
		
	}else if(revCd == "CO"){
		$("#modal-pop-h3-title").text("렌터카 차량수리 (협력정비) 업체");
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "SC"){
		//영업점/고객센터 등의 업무 위탁 업체
		$("#modal-pop-h3-title").text("영업점/고객센터 등의 업무위탁 계약을 체결한 업체").css('font-size','29px');
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "SS"){
		$("#modal-pop-h3-title").text("단기렌탈 및 보험대차 서비스 제공 업체");
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "AC"){
		$("#modal-pop-h3-title").text("애니카랜드 40여 개소");
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "CF"){
		$("#modal-pop-h3-title").text("차량수리 관련 업무위탁계약을 체결한 업체");
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "IC"){
		$("#modal-pop-h3-title").text("보험회사");
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "PE"){
		$("#modal-pop-h3-title").text("과태료 등 부과주체");
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "SC"){
		$("#modal-pop-h3-title").text("영업점/고객센터 등의 업무위탁 계약을 체결한 업체").css('font-size','29px');
		$("#modal-pop-table-title").text("업체명");
		
	}else if(revCd == "SI"){
		$("#modal-pop-h3-title").text("단기렌탈 및 보험대차 관련 업무위탁 계약을 체결한 업체").css('font-size','29px');
		$("#modal-pop-table-title").text("업체명");
		
	}
	
	$.ajax({
		url : '/rent/info/getSelCompanyList.json',
		type : 'POST',
		dataType : 'json',
		data : {"revDate" : revDate, "revSeq" : revSeq, "revCd" : revCd},
		error : function(x, e){
			alert("요청하신 작업을 수행하던 중 예상치 않게 중지되었습니다. \n\n다시 시도해 주십시오.");
		},
		success : function(data){
			$(".dimd").css({display:"block"});
			$("#modal-policy-company-list").css("display", "block");
			var str = "";
			var list = data.compList;
			var num = -1;
			//console.log("DATA ---------- : ", list);
			for(var i=0; i<list.length; i++){
				if(i%2 == 0){
					str += "<tr>";
						for(var j=0; j<2; j++){
							num++;
							if(num > list.length-1){
								str += "<td></td>";
							}else{
								str += "<td data-revcd='"+list[num].revCd+"'>"+list[num].revListNm+"</td>";
							}
						}
					str += "</tr>";
				}
			}
			$("#companyListData").html(str);
		}
	});
}


function goOutLinkPage(url){
	var isMobile = navigator.userAgent;
	if((isMobile.indexOf("SKRENT-app-Agent")>0)){
		location.href = "skrent://outLink?url=" + url;
	}else{
		window.open(url);
	}
}

function downloadLink(fileName, fileNameH, fileType){
	location.href="/resources/download/downloadLink.jsp?fileName="+fileName+"&fileNameH="+btoa(unescape(encodeURIComponent(fileNameH)))+"&fileType="+fileType;
}

function xssFilter(str){
	return str.replace(/<script>|javascript|%3Cscript|JaVaScRiPt|ScRiPt%20%0a%0d|ja%0Av%0Aa%0As%0Ac%0Aript|script|vbscript|binding|allowscriptaccess|expression|applet|meta|xml|blink|link|style|embed|object|iframe|frame|frameset|background|layer|ilayer|bgsound|title|base|eval|innerHTML|charset|refresh|string|void|create|append|%3Ealert|alert|msgbox|document|cookie|href|nabort|@import|\+ADw|\+AD4|aim:|%0da=eval|xmlns:html|http-equiv=refresh|http-equiv="refresh"|xmlns:html=|<htmlxmln|list-style-image|x-scriptlet|echo\(|0%0d%0a%00|moz-binding|res:\/\/|#exec|%u0|&#x|fromcharcode|firefoxurl|<br size=|wvs-xss|acunetix_wvs|lowsrc|dynsrc|behavior|activexobject|microsoft.xmlhttp|clsid:cafeefac-dec7-0000-0000-abcdeffedcba|application\/npruntime-scriptable-plugin|deploymenttoolkit|onactivae|onafterprint|onafterupdate|onbefore|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditfocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onblur|onbounce|oncellchange|onchange|onclick|oncontextmenu|oncontrolselect|oncopy|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondblclick|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onerror|onerrorupdate|onfilterchange|onfinish|onfocus|onfocusin|onfocusout|onhelp|onkeydown|onkeypress|onkeyup|onlayoutcomplete|onload|onlosecapture|onmousedown|onmouseenter|onmouseleave|onmousemove|onmouseout|onmouseover|onmouseup|onmousewheel|onmove|onmoveend|onmovestart|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizeend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|onstop|onsubmit|onunload|\";|onMessage|onRowDelete|;\/\/|onOffline|onRowInserted|FSCommand|onOnline|onSeek|onAbort|onOutOfSync|onStorage|onActivate|onPause|onSyncRestored|onBegin|onPopState|onTimeError|onDragDrop|onProgress|onTrackChange|onEnd|onRedo|onUndo|onHashChange|onRepeat|onURLFlip|onInput|onResume|seekSegmentTime|onMediaComplete|onReverse|onRowsEnter|onMediaError|java.lang.Runtime|getRuntime|onwheel|onpageshow|oncanplaythrough|onloadedmetadata|onplay|onseeking|ontimeupdate|onemptied|audio|onsearch|oninvalid|oncuechange|onloadstart|onplaying|onstalled|onvolumechange|ontoggle|details|onpagehide|oncanplay|ondurationchange|onseeked|onratechange|onsuspend|onwating|video/gi, function xssReplace(x){return "_" + x + "_"});
}
