/**
 * Created by shan on 2018/1/18.
 */
$(function () {

  $('.btn-code').on('click', function (e) {
    e.preventDefault();
    var mobile = $('input[name="mobile"]').val().trim();
    //alert(mobile);
    if(!/^1\d{10}$/.test(mobile)){
      mui.toast('请输入正确的手机号');
      return false;
    }

    $(this).text('发送中...').addClass('active');
    $.ajax({
      type:'get',
      url:'/user/vCode',
      success: function (re) {
        console.log(re);
        var count = 5;
        var id = setInterval(function () {
          //alert(count);
          count--;
          $(this).text(count+'秒后再次发送');
          if(count<=0){
            $(this).text('再次发送').removeClass('active');
            clearInterval(id);
          }
        }.bind(this),1000)
      }.bind(this)
    })
  });



  $('.btn-register').on('click', function (e) {
    e.preventDefault();
    var username = $('input[name="username"]').val().trim();
    var password = $('input[name="password"]').val().trim();
    var repass = $('input[name="repass"]').val().trim();
    var vCode = $('input[name="vCode"]').val().trim();
    var mobile = $('input[name="mobile"]').val().trim();

    if(!username){
      mui.toast('请输入用户名');
      return false;
    }
    if(!password){
      mui.toast('请输入密码');
      return false;
    }
    if(repass!=password){
      mui.toast('请确认密码');
      return false;
    }
    if(!/^1\d{10}$/.test(mobile)){
      mui.toast('请输入正确号码');
      return false;
    }
    if(!vCode){
      mui.toast('请输入验证码');
      return false;
    }
    if(!$('#xy').prop('checked')){
      mui.toast('请同意协议');
      return false;
    }
    $.ajax({
      type:'post',
      url:'/user/register',
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success: function (re) {
        console.log(re);
        if(re.error == 403){
          mui.toast(re.message);
        }
        if(re.success){
          mui.toast('恭喜你注册成功，1秒钟后跳转登录页');
          setTimeout(function () {
            location.href = 'login.html';
          },1000);

        }
      }
    })
  });
});