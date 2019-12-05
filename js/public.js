$(function () {
  $(document).bind("click",function(e){
    var input = $(".zh-input input");
    if(!input.is(e.target) && input.has(e.target).length === 0){ 
      $(".zh-select-dropdown").hide();//需要隐藏的元素
      if($(".zh-drop-tag").hasClass("transform")){
        $(".zh-drop-tag").removeClass("transform")
      }
    }
  })
  //输入框获点击事件
  $("input").click(function(event){
    $(this).parent().next(".zh-select-dropdown").toggle();
    $(this).next(".zh-drop-tag").toggleClass("transform");
    event.stopPropagation(); //阻止事件冒泡
  });
  //下拉菜单栏点击(li 点击选择)
  $(".zh-select-dropdown ul li").click(function(event){
    $(this).addClass("selected-this").siblings().removeClass("selected-this"); //只选中一个
    $(this).parents(".zh-select-dropdown").prev(".zh-input").children("input").val($(this).text());//获取点击的值，赋给输入框
    $(this).parents(".zh-select-dropdown").hide();
    $(this).next(".zh-drop-tag").removeClass("transform");
    event.stopPropagation(); //阻止事件冒泡
  });
})
