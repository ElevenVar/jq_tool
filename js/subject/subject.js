
httpUrl={
  getMenu: '/api/subject/classification/get/allSubjectClassification',//查询头部导航栏
  getTable:'/api/subject/findlist', //查询表格数据
  subjectEnable: '/api/subject/enable', //状态切换
};
 //查询表格数据传递的参数
 var formTable = {
  pageNum: 1,
  pageSize: 10000,
  subjectCategory: "ASSETS"
};
$(function(){
  asyncInit();
});
//同步执行
async function asyncInit(){
  await getMenu();
  await getTableData();
}
//loading 效果的添加和移除
var loading = function setLoading(data){
  return data == true ? $('.zh-loading').removeClass('dn') : $('.zh-loading').addClass('dn');
}
//导航菜单切换
$('.zh-menubar').on('click','li',function(){
  $(this).addClass('zh-active').siblings().removeClass('zh-active');
  var sType=$(this).children('div').attr('sType');
  var iTexy=$(this).children('div').text();
  formTable.subjectCategory = sType;
  getTableData();
});
//多选框点击事件
$('.zh-table').on('click','.zh-checkbox',function(){
  $(this).toggleClass('zh-checked');
});
//开关按钮点击事件
$('.zh-table').on('click','.zh-switch',function(){
  if($(this).hasClass('selected')){
    $(this).removeClass('selected');
  }else{
    $(this).addClass('selected');
  }
})
//查询头部导航菜单
function getMenu(){
  loading(true);
  return Https({
    url:httpUrl.getMenu,
    type:"get",
    data:{},
    success:function(res){
      loading(false);
      if(res && res.length > 0){
        setMenu(res);
        formTable.subjectCategory = res[0].code;
      }
    }
  })
};
//查询列表数据
function getTableData(){
  loading(true);
  return Https({
    url:httpUrl.getTable,
    type:'post',
    data:formTable,
    success:function(res){
      loading(false);
      setTableData(res);
    },
  })
};
//新增按钮点击事件
function add_subject(){
  console.log(1)
};
//删除按钮(单个删除)
function deletRow(id){ //id:要删除的数据的id
  $('.zh-modal-background').removeClass('dn');
  $('.zh-modal-box').removeClass('dn');
  delete_message('../../../img/confirm.gif',id); //创建删除提示框
};
//确定删除
function delet_this(id){
  console.log(id)
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
};
// 设置表格数据
function setTableData(res){
  $('.zh-table tbody').html('');
  if(res && res.length > 0){
    var tr;
    for(var i = 0;i<res.length;i++){
      tr+="<tr id="+res[i].id+">"+
      "<td checkbox><div class='zh-checkbox'>✔</div></td>"+
      "<td>"+res[i].code+"</td>";
      if(res[i].subjectSeries == 1){
        tr+= "<td align='left'><p>"+res[i].name+"</p></td>";
      }else if(res[i].subjectSeries == 2){
        tr+= "<td align='left'><p style='margin-left:10px;'>"+res[i].name+"</p></td>";
      }else if(res[i].subjectSeries == 3){
        tr+= "<td align='left'><p style='margin-left:20px;'>"+res[i].name+"</p></td>";
      }else if(res[i].subjectSeries == 4){
        tr+= "<td align='left'><p style='margin-left:30px;'>"+res[i].name+"</p></td>";
      }else if(res[i].subjectSeries == 5){
        tr+= "<td align='left'><p style='margin-left:40px;'>"+res[i].name+"</p></td>";
      }else{
        tr+= "<td align='left'><p style='margin-left:50px;'>"+res[i].name+"</p></td>";
      }
      tr+="<td align='left'>"+res[i].subjectDetailCategoryValue+"</td>";
      //判断余额方向
      if(res[i].balanceDirection == 'DEBIT'){
        tr+="<td>借</td>"
      }else{
        tr+="<td>贷</td>"
      };
      //渲染辅助核算
      if(res[i].auxiliaryCategoryList){
        if(res[i].auxiliaryCategoryList.length>0){
          tr+="<td align='left'>";
          for(var j=0;j<res[i].auxiliaryCategoryList.length;j++){
            tr+="<span>"+res[i].auxiliaryCategoryList[j].name+"</span>"
          }
          tr+= "</td>"
        }else{
          tr+="<td></td>";
        }
      };
      //渲染外币
      if(res[i].currencyList){
        if(res[i].currencyList.length>0){
          tr+="<td align='left'>";
          for(var j=0;j<res[i].currencyList.length;j++){
            tr+="<span>"+res[i].currencyList[j].code+"</span>";
          }
          tr+= "</td>";
        }else{
          tr+="<td></td>";
        }
      }
      tr+="<td>"+res[i].unit+"</td>";
      if(res[i].whetherEnable == 1){
        tr+="<td><div class='zh-switch selected' whetherEnable="+res[i].whetherEnable+"></div></td>"
      }else{
        tr+="<td><div class='zh-switch' whetherEnable="+res[i].whetherEnable+"></div></td>"
      }
      tr+="<td style='width:235px;'>"+
        "<div class='zh-button' size='small' type='primary'>增加下级</div>"+
        "<div class='zh-button' size='small'>修改</div>"+
        "<div class='zh-button' size='small' onclick='deletRow("+res[i].id+")'>删除</div>"+
      "</td></tr>";
    };
    $('.zh-table tbody').append(tr);
  }
}

