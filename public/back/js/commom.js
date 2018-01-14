/**
 * Created by shan on 2018/1/12.
 */

$(function(){
    if(location.href.indexOf('login.html') == -1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(re){
                //console.log(re);
                if(re.error == 400){
                    location.href = 'login.html';
                }
            }
        })
    }
    NProgress.configure({ showSpinner: false });
    $(document).on('ajaxStart', function () {
        NProgress.start();
    });

    $(document).on('ajaxStop', function () {
        setTimeout(function () {
            NProgress.done();
        },500);
    });
    var $main = $('.main');
    var $aside = $('.aside');
    var $header = $('.main .header');
    $('.main .header .menu').on('click',function(){
       //alert(1)
        $main.toggleClass('current');
        $aside.toggleClass('current');
        $header.toggleClass('current');
    });

    $('.level').prev().on('click',function(){
        $('.level').slideToggle();
    });

    $('.leave').on('click',function(){
       $('#myModal').modal();
    });
    $('.quit').on('click', function () {
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success: function (re) {
                //console.log(re);
                if(re.success){
                    location.href = 'login.html';
                }
            }
        })

    });





});