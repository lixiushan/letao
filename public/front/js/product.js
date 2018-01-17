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
    }
  })
});