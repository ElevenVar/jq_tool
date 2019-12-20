var httpAjax = function(options){
	var defaults = {
		type:'post',
		headers:{},
		dataType:'json',
		async:true, //异步请求
		cache:false,
		token:'', //
		beforeSend:null, //请求前的处理
		success:null, //请求成功的处理
		error:null, //请求失败的处理
		complete:null, //请求完成的处理
	},
	baseUrl = 'https://ttoolsbackstage.dgg188.cn';
	var da = $.extend({}, defaults, options);
	$.ajax({
		url:baseUrl+ da.url, //请求地址
		type:da.type, // 请求方式
		headers:{
			'Content-Type':da.contentType,
			'token':da.token
		},
		data:da.data, //请求参数
		success:function(res){
			if(res.code == 0){
				da.success && da.success(res.data)
			}else{
				alert(res.msg)
			}
		},
		error:function(error){
			da.success && da.success(error)
		}
	})
}
// 登录的请求
var loginHttp = function (options){
	if(options.type === 'post' && options.contentType != "application/json"){
		options.contentType = 'application/x-www-form-urlencoded';
	}
	httpAjax(options);
}
//登录以后的请求
var Https = function(options){
	if (options.type == 'post' && options.contentType != "application/json") {
    options.contentType = 'application/x-www-form-urlencoded';
	}
	options.token = sessionStorage.getItem('setToken');
	httpAjax(options);
}