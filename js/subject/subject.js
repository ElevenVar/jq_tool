httpUrl={
  getMenu: '/api/subject/classification/get/allSubjectClassification',//查询头部导航栏
  getTable:'/api/subject/findlist', //查询表格数据
};
var loading;
loading === true ? $('.zh-loading').removeClass('dn') : $('.zh-loading').addClass('dn');
$(function(){
  getMenu();
});
//导航菜单切换
$('.zh-menubar').on('click','li',function(){
  $('.zh-loading').removeClass('dn');
  $(this).addClass('zh-active').siblings().removeClass('zh-active');
  console.log($(this).children('div').text());
  var sType=$(this).children('div').attr('sType');
  var iTexy=$(this).children('div').text();
  setTimeout(()=>{
    $('.zh-loading').addClass('dn');
  },300)
})
//多选框点击事件
$('.zh-table').on('click','.checkbox',function(){
  $(this).toggleClass('checked');
});
//查询头部导航菜单
function getMenu(){
  loading = true;
  Https({
    url:httpUrl.getMenu,
    type:"get",
    data:{},
    success:function(res){
      loading = false;
      if(res && res.length > 0){
        setMenu(res)
      }
    }
  })
};
//设置导航栏数据
function setMenu(res){
  $('#subjectMenu').html(""); //清空原始值
  for(var i=0;i<res.length;i++){
    if(i == 0){
      var  li ="<li class='zh-active'><div sType='"+res[i].code+"'>"+res[i].name+"</div></li>";
    }else{
      var  li ="<li><div sType='"+res[i].code+"'>"+res[i].name+"</div></li>";
    }
   $('#subjectMenu').append(li);
  } 
}

