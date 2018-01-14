/**
 * Created by shan on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (re) {
                //console.log(re);
                $('tbody').html(template('tabTpl',re));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(re.total/re.size),
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }
    render();

    $('.btn-add').on('click',function(){
        $('#addModal').modal();
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success: function (re) {
                //console.log(re);
                $('.dropdown-menu').html(template('cateTpl',re));
            }
        })
    });

    $('.dropdown-menu').on('click','a', function () {
        $('.pickCate').text($(this).text());
        var id = $(this).data('id');
        $('.dropdown input').val(id);
        $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data.result.picAddr);
            $('.img').attr('src',data.result.picAddr)
                .next().val(data.result.picAddr);
            $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');

        }
    });

    $('form').bootstrapValidator({
        excluded: [],//不校验的内容
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    });

    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            success: function (re) {
                console.log(re);
                if(re.success){
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    $('form').data('bootstrapValidator').resetForm(true);
                    $('.pickCate').text('请选择一级分类');
                    $('.img').attr('src','images/none.png');
                }
            }
        })
    })
});