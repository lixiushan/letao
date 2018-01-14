/**
 * Created by shan on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
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