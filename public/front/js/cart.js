/**
 * Created by shan on 2018/1/18.
 */
$(function () {
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          $.ajax({
            type:'get',
            url:'/cart/queryCart',
            success: function (re) {
              console.log(re);
              if(re.error === 400){
                location.href = 'login.html?url='+location.href;
                return false;
              }
              setTimeout(function () {
                $('#OA_task_2').html(template('tpl',{list:re}));
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              },1000);
            }
          });

        }
      }
    }
  });

  $('#OA_task_2').on('tap','.btn-delete', function () {
    var id = $(this).parent().data('id');
    mui.confirm('是否删除商品','温馨提示',['否','是'], function (e) {
      if(e.index === 1){
        $.ajax({
          type:'get',
          url:'/cart/deleteCart',
          data:{id:[id]},
          success: function (re) {
            console.log(re);
            if(re.success){
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });
  });

  $('#OA_task_2').on('tap','.btn-edit', function () {
    var param = this.dataset;
    //console.log(param);
    console.log(template('tpl1', param)+'---');
    var html = template('tpl1',param).replace(/\n/g,'');

    mui.confirm(html,'编辑商品',['确定','取消'], function (e) {

      if(e.index===0){
        var id = param.id;
        var num = $('.num input').val();
        var size = $('.size span.active').text();
        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id:id,
            num:num,
            size:size
          },
          success: function (re) {
            console.log(re);
            if(re.success){
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    });
    $('.size span').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
    mui('.mui-numbox').numbox();
  });

  $('#OA_task_2').on('change','.ck', function () {
    //console.log($('input:checked'));
    var money = 0;
    $('input:checked').each(function () {
      var price = $(this).data('price');
      var num = $(this).data('num');
      money += price*num;
    });
    $('.money span').text(money.toFixed(2));
  });
});