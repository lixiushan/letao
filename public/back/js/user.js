/**
 * Created by shan on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 10;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
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
                    totalPages: Math.ceil(re.total/re.size),
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    $('tbody').on('click','.btn',function(){
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-danger')? '0':'1';
        //alert(isDelete);
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success: function (re) {
                //console.log(re);
                if(re.success){
                    render();
                }
            }
        })
    })
});