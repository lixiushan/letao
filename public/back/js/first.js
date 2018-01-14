/**
 * Created by shan on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (re) {
                console.log(re);
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

    $('.btn-add').on('click',function(){
        $('#addModal').modal();
    });
    $('form').bootstrapValidator({
        //message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    });
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        //console.log(1);
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('form').serialize(),
            success: function (re) {
                console.log(re);
                if(re.success){
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    $('form').data('bootstrapValidator').resetForm(true);
                }
            }
        })
    });

});