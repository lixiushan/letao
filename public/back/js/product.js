/**
 * Created by shan on 2018/1/14.
 */
$(function () {
    var page = 1;
    var pageSize = 2;
    var arr = [];
    //var imgStr = '';
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
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
                    size:'small',
                    useBootstrapTooltip: true,
                    tooltipTitles: function (type, page, current) {
                        switch (type){
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'page':
                                return page;
                        }
                    },
                    itemTexts: function (type, page, current) {
                        //console.log(type);
                        //console.log(page);
                        switch (type){
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'page':
                                return page;
                        }
                    },
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

    $('.btn-add').on('click', function () {
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
        $('.dropdown input').val($(this).data('id'));
        $('form').data('bootstrapValidator').updateStatus('brandId','VALID');
    });

    $('#fileupload').fileupload({
        dataType:'json',
        done: function (e,data) {
            arr.push(data.result);
            if(arr.length > 3){
                return;
            }

            if(arr.length === 3){
                $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
            }else{
                $('form').data('bootstrapValidator').updateStatus('brandLogo','INVALID');
            }
            $('.img').append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');
        }
    });

    $('form').bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的库存'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'库存数据开头不为0'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的尺码(32-49)'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入商品的尺码(32-49)'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的原价'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品的价格'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传3张图片'
                    }
                }
            }
        }
    });

    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        var imgStr = '&picName1='+arr[0].picName+'&picAddr1='+arr[0].picAddr;
        imgStr += '&picName2='+arr[1].picName+'&picAddr2='+arr[1].picAddr;
        imgStr += '&picName3='+arr[2].picName+'&picAddr3='+arr[2].picAddr;
        var dataStr = $('form').serialize()+imgStr;
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:dataStr,
            success: function (re) {
                console.log(re);
                if(re.success){
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    $('form').data('bootstrapValidator').resetForm(true);
                    $('.pickCate').text('请选择二级分类');
                    $('.img img').remove();
                    arr = [];
                }
            }
        })
    })

});