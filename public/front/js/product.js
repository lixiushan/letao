/**
 * Created by shan on 2018/1/16.
 */
$(function () {
  var id = getParam('productId');
  //alert(id);
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success: function (re) {
      console.log(re);
      $('.mui-scroll').html(template('tpl',re));
      mui('.mui-slider').slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      mui('.mui-numbox').numbox();

      $('.size span').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
      });

      $('.btn-add').on('click', function (e) {
        //e.preventDefault();
        var size = $('.size span.active').text();
        if(!size){
          mui.toast('请选择尺码');
          return;
        }
        var num = $('input[type="number"]').val();
        mui.confirm('是否添加购物车','温馨提示',['前往购物车','继续浏览'], function (e) {
          if(e.index==0){
            $.ajax({
              type:'post',
              url:'/cart/addCart',
              data:{
                productId: id,
                num:num,
                size: size
              },
              success: function (re) {
                console.log(re);
                if(re.error == 400){
                  location.href = 'login.html?url='+location.href;
                }
                if(re.success){
                  location.href = 'cart.html';
                }
              }
            })
          }
        });

      })
    }
  })


});