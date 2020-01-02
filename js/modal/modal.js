$(function () {
  $(document).bind("click", function (e) {
    var input = $("input.zh-input");
    if (!input.is(e.target) && input.has(e.target).length === 0) {
      $(".zh-select-dropdown").hide();//需要隐藏的元素
    }
  })
});
// 弹窗X 按钮点击事件
function closeModal() {
  $('.zh-modal-box').addClass('dn');
  $('.zh-modal-background').addClass('dn');
};
// 动态创建(删除提示框)
function delete_message(url, id) {
  var zh_modal_box = $('.zh-modal-box');
  zh_modal_box.html('');
  zh_modal_box.css({
    top: '50%',
    width: '350px',
    height: '170px',
    'margin-top': "-85px",
    'margin-left': '-175px',
  });
  var div = "<div class='zh-modal-content'>" +
    "<div class='zh-modal-head'>系统提示" +
    "<div class='close-modal' onclick='closeModal()'>X</div>" +
    "</div>" +
    "<div class='zh-modal-body'>" +
    "<div class='zh-message-body'>" +
    "<div class='zh-modal-icon'><img src='" + url + "' alt='图片加载失败'></div>" +
    "<div class='zh-modal-title'>您确定要删除该科目吗？删除后不可恢复?</div>" +
    "</div>" +
    "</div>" +
    "<div class='zh-modal-footer'>" +
    "<div class='zh-button' size='mini' onclick='closeModal()'>取消</div>" +
    "<div class='zh-button' type='primary' size='mini' onclick='delet_this(" + id + ")'>确定</div>" +
    "</div>" +
    "</div>";
  zh_modal_box.append(div);
};
//动态创建新增科目弹窗
function create_subject(subject_name) {
  $('.zh-modal-box').html('');
  debugger
  $('.zh-modal-box').css({
    left:'50%',
    width:'452px',
    top:'132px',
    height: 'auto',
    'margin-left': '-226px',
  });
  var div = "<div class='zh-modal-content'>" +
    "<div class='zh-modal-head'>新增" + subject_name + "科目<div class='close-modal' onclick='closeModal()'>X</div></div>" +
    "<div class='zh-modal-body'>" +
    "<div class='zh-form-box'>" +
    "<form class='zh-form'>" +
    "<ul class='zh-form-item'>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>科目编码</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-input-box'>" +
    "<input type='text' class='zh-input'>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>科目名称</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-input-box'>" +
    "<input type='text' class='zh-input'>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>上级科目</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-input-box'>" +
    "<input type='text' class='zh-input' disabled>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>科目类别</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-input-box' style='position:relative'>" +
    "<input type='text' class='zh-input subjectType' readonly>" +
    "<div class='zh-select-dropdown' style='position:absolute'>" +
    "<ul class='zh-select-dropdown_items'>" +
    "<li class='zh-select-dropdown_item'>流动资产</li>" +
    "<li class='zh-select-dropdown_item'>非流动资产</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>余额方向</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-input-box'>" +
    "<input type='text' class='zh-input'>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>" +
    "<span class='zh-check'>✔</span>" +
    "<span>辅助核算</span>" +
    "</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-checkbox-group'>" +
    "<div>" +
    "<span class='zh-check'>✔</span>" +
    "<span>客户</span>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>" +
    "<span class='zh-check'>✔</span>" +
    "<span>数量核算</span>" +
    "</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-checkbox-group'>" +
    "<div>" +
    "<span class='zh-check'>✔</span>" +
    "<span>客户</span>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li class='zh-form-item'>" +
    "<div class='zh-form-item_label'>" +
    "<span class='zh-check'>✔</span>" +
    "<span>外币核算</span>" +
    "</div>" +
    "<div class='zh-form-item_content'>" +
    "<div class='zh-checkbox-group'>" +
    "<div>" +
    "<span class='zh-check'>✔</span>" +
    "<span>客户</span>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "</ul>" +
    "</form>" +
    "</div>" +
    "</div>" +
    "<div class='zh-modal-footer'>" +
    "<div class='zh-button' size='mini' onclick='closeModal()'>取消</div>" +
    "<div class='zh-button' type='primary' size='mini' onclick='createNumber()'>确定</div>" +
    "</div>" +
    "<div>";
  $('.zh-modal-box').append(div);
}