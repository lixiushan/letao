/**
 * Created by shan on 2018/1/15.
 */
;(function () {
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success: function (re) {
            //console.log(re);
            $('.category_left .mui-scroll').html(template('leftTpl',re));
            render();
        }
    });

    function render(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id || 1
            },
            success: function (re) {
                //console.log(re);
                $('.category_right .mui-scroll').html(template('rightTpl',re));
            }
        })
    }

    $('.category_left .mui-scroll').on('click','li',function () {
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0);//滚动到顶
        var id = $(this).data('id');
        $(this).addClass('active').siblings().removeClass('active');
        render(id);
    })

})();
