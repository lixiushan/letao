/**
 * Created by shan on 2018/1/16.
 */
$(function () {
  var key = getParam('key');
  $('.search_text').val(key);

  function render(){
    $('.product').html('<div class="loading"></div>');
    var param = {};
    var key = $('.search_text').val();
    param.page = 1;
    param.pageSize = 100;
    param.proName = key;
    var sort = $('.sort a.active');
    if(sort.length != 0){
      var key1 = sort.data('type');
      var value1 = sort.children('.fa').hasClass('fa-angle-up')? 2:1;
      param[key1] = value1;
    }

    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:param,
      success: function (re) {
        console.log(re);
        setTimeout(function () {
          $('.product').html(template('productTpl',re));
        },1000);

      }
    })
  }
  render();

  $('.search_btn').on('click', function () {
    render();
  });

  $('.sort a[data-type]').on('click', function () {
    if($(this).hasClass('active')){
      $(this).children('.fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else{
      $(this).addClass('active').siblings().removeClass('active');
      $('.sort a .fa').removeClass('fa-angle-up').addClass('fa-angle-down');
    }

    render();
  });


});