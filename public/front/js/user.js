/**
 * Created by shan on 2018/1/18.
 */
$(function () {
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success: function (re) {
      console.log(re);
      if(re.error===400){
        location.href = 'login.html';
      }
      $('.user').html(template('tpl',re));
    }
  });

  $('.logout').on('click', function () {
    $.ajax({
      type:'get',
      url:'/user/logout',
      success: function (re) {
        console.log(re);
        if(re.success){
          location.href = 'login.html';
        }
      }
    })
  })
});