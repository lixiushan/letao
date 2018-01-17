/**
 * Created by shan on 2018/1/15.
 */

    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

    mui('.mui-slider').slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    function getParamObj(){
        //console.log(location.search);
        var paramStr = decodeURI(location.search).slice(1);
        //console.log(paramStr.slice(1));
        var paramArr = paramStr.split('&');
        var paramObj = {};
        //console.log(paramArr);
        for(var i = 0; i < paramArr.length; i++){
            var key = paramArr[i].split('=')[0];
            var value = paramArr[i].split('=')[1];
            paramObj[key] = value;
        }
        //console.log(paramObj);
        return paramObj;
    }

    function getParam(key){
        return getParamObj()[key];
    }