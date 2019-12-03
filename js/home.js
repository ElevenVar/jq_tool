
$(function () {
	var company = JSON.parse(sessionStorage.getItem('company'));
	var auth = JSON.parse(company.auth);
	if (auth) {
		// setItemMenu(auth);
	}
})
//左边菜单栏移动上去
$("#nav").on('mouseenter', ".item", function () {
	var h = - (($(this).children('.sub-nav-wrap').children('.sub-nav').children('.sub-navList').length * 25 / 2) - 20.5)
	$(this).children('.sub-nav-wrap').css({
		'display': 'block',
		'top': h + 'px'
	})
})
$("#nav").on('mouseleave', ".item", function () {
	$(this).children('.sub-nav-wrap').css({
		'display': 'none'
	})
});
$("#nav").on('click', ".item", function () {
	if($(this).children().length == 0){
		$(this).addClass("bg-blue").siblings().removeClass("bg-blue");
	}
});
$("#nav").on("click",".sub-navList",function(){
	$(this).parents(".item").addClass('bg-blue').siblings().removeClass("bg-blue")
})
//循环渲染左边菜单栏
function setItemMenu(auth) {
	var li = "";
	for(var i = 0; i < auth.length; i++){
		if(auth[i].children.length == 0){
			li+="<li class='item richardPaper' src='../bill/richardPaper.html'>"+auth[i].menuName+"</li>"
		}else{
			li += "<li class='item'>";
			li += "<div>" + auth[i].menuName + "</div>";
			if (auth[i].children.length > 0) {
				li += "<div class='sub-nav-wrap'><ul class='sub-nav'>";
				for (var j = 0; j < auth[i].children.length; j++) {
					li += "<li class='sub-navList richardPaper' src='../bill/richardPaper.html'>" + auth[i].children[j].menuName + "</li>"
				}
				li += "</ul><b></b></div>";
			}
			li += "</li>";
		}
	}
	$('#nav').html("");
	$('#nav').append(li);
	$("#contentRightMenu").html("");
	createTitle("./homeWork.html","工作台"); //创建一个标签按钮
}
var createIframs = ["./homeWork.html"], //储存是否已经存在此iframe
		createTitles = [{url:"./homeWork.html",text:"工作台"}]; //储存是否已经存在此标签
//左边菜单栏点击
$('#nav').on('click','.richardPaper', function(event){
	var thisSrc = $(this).attr("src"); //获取要跳转的页面
	var items = {
		url:$(this).attr("src"),
		text:$(this)[0].innerText
	}
	// 动态生成右边iframe
	if(createIframs.indexOf(thisSrc) == -1){
		createIframs.push(thisSrc);
		$("#contentRightMenuContent .iframeBox").removeClass("block");
		createIfram(thisSrc); //生成一个iframe 容器
	}else{
		$("#contentRightMenuContent .iframeBox").eq(createIframs.indexOf(thisSrc)).addClass("block").siblings().removeClass("block");
	}
	//动态生成右边的标签导航
	var hasButton = createTitles.filter((res)=>{
		return res.url == thisSrc
	})
	if(hasButton.length == 0){
		createTitles.push(items);
		$("#contentRightMenu .menulist-box .yuan").removeClass("on");
		createTitle(thisSrc,$(this)[0].innerText); //生成标签
	}else{
		for(var i in createTitles){
			if(createTitles[i].url == thisSrc){
				$("#contentRightMenu .menulist-box").eq(i).children(".yuan").addClass("on");
				$("#contentRightMenu .menulist-box").eq(i).siblings().children(".yuan").removeClass("on");
			}
		}
	}
});
//右边标签菜单点击事件
$('#contentRightMenu').on('click','.menulist-box',function(){
	var thisSrc = $(this).attr("src"),
			index = createIframs.indexOf(thisSrc);
	$(this).children('.yuan').addClass('on');
	$(this).siblings().children('.yuan').removeClass('on');
	if(index != -1){
		$('#contentRightMenuContent .iframeBox').eq(index).addClass("block").siblings().removeClass("block")
	}
});
//右边标签菜单关闭按钮点击事件
$('#contentRightMenu').on('click','.closeThis',function(event){
	var thisSrc = $(this).parent().attr("src");
	for(var i in createTitles){
		if(createTitles[i].url == thisSrc && createTitles[i].text == $(this).prev()[0].innerText){
			if(i>0){//工作台标签不允许移除
				if(i == createTitles.length -1 ){//如果是关闭最后一个，则前面一个打开
					$('.menulist-box').eq(i-1).children('.yuan').addClass('on');//前面一个打开
					$("#contentRightMenuContent .iframeBox").eq(i-1).addClass("block").siblings().removeClass("block")
				}else{

				}
				createTitles.splice(i,1); //移除关闭的路由
				$('.menulist-box').eq(i).remove();
			}
		}
	}
	event.stopPropagation(); //阻止事件冒泡
})
//生成右边iframe 容器部分
function createIfram(src){
	var div="<div class='iframeBox block'>"+
						"<div class='loading' style='display: none;'></div>"+
						"<iframe src='"+src+"' frameborder='0'></iframe>"+
					"</div>";
	$("#contentRightMenuContent").append(div);
}
//生成右边标签导航
function createTitle(src,innerText){
	var button ="<div class='menulist-box' src='"+ src +"'>"+
								"<div class='yuan on'></div>"+
								"<div class='text'>"+innerText+"</div>"+
								"<div class='closeThis'>X</div>"+
							"</div>";
	$("#contentRightMenu").append(button);
}