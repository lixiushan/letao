/**
 * Created by shan on 2018/1/16.
 */
$(function(){

  function getHistory(){
    var history = localStorage.getItem('lt_history') || '[]';
    history = JSON.parse(history);
    return history;
  }
  $('.history').html(template('tpl',{list:getHistory()}));

  $('.history').on('click','.btn_empty',function(){
    mui.confirm('是否全部清空？','温馨提示',['是','否'],function(type){
      if(type.index == 0){
        localStorage.removeItem('lt_history');
        $('.history').html(template('tpl',{list:getHistory()}));
      }
    });

  });

  $('.search_btn').on('click', function () {
    var key = $('.search_text').val();
    if(!key.trim()){
      mui.toast('请输入搜索关键字');
      return;
    }
    var history = getHistory();
    var index = history.indexOf(key);
    if(index != -1){
      history.splice(index,1);
    }
    history.unshift(key);

    if(history.length > 10){
      history.pop();
    }
    localStorage.setItem('lt_history',JSON.stringify(history));
    $('.history').html(template('tpl',{list:getHistory()}));

    location.href = 'searchList.html?key='+key;
  });

  $('.history').on('click','.btn_delete', function () {
    var index = $(this).data('index');
    var history = getHistory();
    history.splice(index,1);
    mui.confirm('是否删除？','温馨提示',['是','否'],function(type){
      if(type.index == 0){
        localStorage.setItem('lt_history',JSON.stringify(history));
        $('.history').html(template('tpl',{list:getHistory()}));
        $('.search_text').val('');
      }
    });

  })
});