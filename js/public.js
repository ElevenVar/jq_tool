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
});
// 弹窗X 按钮点击事件
function closeModal(){
  $('.zh-modal-box').addClass('dn');
  $('.zh-modal-background').addClass('dn');
};
// 动态创建(删除提示框)
function delete_message(url,id){
  var zh_modal_box = $('.zh-modal-box');
  zh_modal_box.html('');
  zh_modal_box.css({
    width:'350px',
    height:'170px',
    'margin-top':"-85px",
    'margin-left':'-175px',
  })
  var div ="<div class='zh-modal-content'>"+
      "<div class='zh-modal-head'>系统提示"+
        "<div class='close-modal' onclick='closeModal()'>X</div>"+
      "</div>"+
      "<div class='zh-modal-body'>"+
        "<div class='zh-message-body'>"+
          "<div class='zh-modal-icon'><img src='"+url+"' alt='图片加载失败'></div>"+
          "<div class='zh-modal-title'>您确定要删除该科目吗？删除后不可恢复?</div>"+
        "</div>"+
      "</div>"+
      "<div class='zh-modal-footer'>"+
        "<div class='zh-button' size='mini' onclick='closeModal()'>取消</div>"+
        "<div class='zh-button' type='primary' size='mini' onclick='delet_this("+id+")'>确定</div>"+
      "</div>"+
    "</div>";
    zh_modal_box.append(div);
};
//动态创建新增弹窗