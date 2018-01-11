/**
 * Created by shan on 2018/1/11.
 */
$(function () {
    $('form').bootstrapValidator({
        //message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名错误'
                    }

                }
            },
            password:{
                validators:{
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12位之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    });
    $('form').on('success.form.bv',function(e){
        e.preventDefault();
        console.log(11);
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),

            success:function(re){
                if(re.success){
                    location.href = 'index.html';
                }
                console.log(re);
                if(re.error == 1001){
                    $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(re.error == 1000){
                    $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }



        })
    })
    $('[type="reset"]').on('click', function () {
        $('form').data('bootstrapValidator').resetForm();
    })
});
