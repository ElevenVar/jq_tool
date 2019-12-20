//导航菜单切换
$('.zh-menubar').on('click','li',function(){
  $('.zh-loading').removeClass('dn');
  $(this).addClass('zh-active').siblings().removeClass('zh-active');
  console.log($(this).children('div').text());
  var sType=$(this).children('div').attr('sType');
  var iTexy=$(this).children('div').text()
  setTimeout(()=>{
    $('.zh-loading').addClass('dn');
  },300)
})
