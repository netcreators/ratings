/* see http://www.ajaxbuch.de/lokris/ for description, manual and legal information */
var Lokris=new Object();Lokris.Defaults={rawResponse:false,async:true,method:"GET",postBody:null,user:undefined,password:undefined,timeoutHandler:undefined,timeout:60000,postMime:"application/x-www-form-urlencoded",errorHandler:function(req){alert("HTTP error: "+req.status)}};Lokris.MSIEIDS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","Microsoft.XMLHTTP"];Lokris.AjaxCall=function(uri,callbackFunction,options){var lwAjax=new Object;var req=null;Lokris.XMLHTTPRequestImplementation="";var raw=(options!=undefined&&options.rawResponse!=undefined)?options.rawResponse:Lokris.Defaults.rawResponse;var async=(options!=undefined&&options.async!=undefined)?options.async:Lokris.Defaults.async;var method=(options!=undefined&&options.method!=undefined)?options.method:Lokris.Defaults.method;var body=(options!=undefined&&options.postBody!=undefined)?options.postBody:Lokris.Defaults.postBody;var user=(options!=undefined&&options.user!=undefined)?options.user:Lokris.Defaults.user;var password=(options!=undefined&&options.password!=undefined)?options.password:Lokris.Defaults.password;var timeoutHandler=(options!=undefined&&options.timeoutHandler!=undefined)?options.timeoutHandler:Lokris.Defaults.timeoutHandler;var timeout=(options!=undefined&&options.timeout!=undefined)?options.timeout:Lokris.Defaults.timeout;var postMime=(options!=undefined&&options.mime!=undefined)?options.mime:Lokris.Defaults.postMime;var errorHandler=(options!=undefined&&options.errorHandler!=undefined)?options.errorHandler:Lokris.Defaults.errorHandler;if(window.XMLHttpRequest){req=new XMLHttpRequest();Lokris.XMLHTTPRequestImplementation="XMLHttpRequest";}else if(window.ActiveXObject){for(var i=0;i<Lokris.MSIEIDS.length;i++){try{req=new ActiveXObject(Lokris.MSIEIDS[i]);Lokris.XMLHTTPRequestImplementation=Lokris.MSIEIDS[i];break;}catch(e){}}}
if(req===null){alert("Ajax not available");return null;}
lwAjax.request=req;if(timeoutHandler!=undefined){lwAjax.timeoutHandler=timeoutHandler;lwAjax.timeoutId=window.setTimeout(function(){lwAjax.request.abort();lwAjax.timeoutHandler(lwAjax.request)},timeout);};lwAjax.request.onreadystatechange=Lokris.getReadyStateHandler(lwAjax,callbackFunction,raw,errorHandler);lwAjax.request.open(method,uri,async,user,password);if(method.toLowerCase()=="post"){lwAjax.request.setRequestHeader("Content-Type",postMime);}
lwAjax.request.send(body);return lwAjax.request;}
Lokris.getReadyStateHandler=function(lwAjax,responseHandler,raw,errorHandler){if(responseHandler==null||responseHandler===undefined){return function(){};}
return function(){if(lwAjax.request.readyState==4){if(lwAjax.timeoutId!=undefined){window.clearTimeout(lwAjax.timeoutId);}
if(lwAjax.request.status==200){if(raw!=undefined&&raw){responseHandler(lwAjax.request);}else{var mimeType=String(""+lwAjax.request.getResponseHeader("Content-Type")).split(';')[0];if(mimeType=="text/xml"){responseHandler(lwAjax.request.responseXML);}else{responseHandler(lwAjax.request.responseText);}}}else{errorHandler(lwAjax.request);}}}}
lwAjaxCall=Lokris.AjaxCall;