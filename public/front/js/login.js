/**
 * Created by shan on 2018/1/18.
 */
$(function () {

  $('.btn-reset').on('click', function () {
    $('form')[0].reset();
  });

  $('.btn-login').on('click', function () {
    var username = $('input[name="username"]').val();
    var password = $('[name="password"]').val();
    if(!username){
      mui.toast('请输入用户名');
      return false;
    }
    if(!password){
      //console.log(username,password);
      mui.toast('请输入密码');
      return false;
    }
    //console.log(username,password);
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success: function (re) {
        console.log(re);
        if(re.error == 403){
          mui.toast(re.message);
        }
        if(re.success){
          var url = location.search;
          if(url.indexOf('url') != -1){
            url = url.replace('?url=','');
            location.href = url;
          }else{
            location.href = 'user.html';
          }
        }
      }
    })
  });
});