
(function () {

  // 适配屏幕像素比
  function resetRem() {
    let width = document.documentElement.clientWidth || window.innerWidth || document.documentElement.getBoundingClientRect;
    document.documentElement.style.fontSize = 100 * width / 640 + 'px';
  }
  resetRem();
  window.onresize = resetRem;


  // 设置请求的基础 url 
  let host = '10.20.152.38:8080'

  // headerWrap
  let $tagScroll = $('.tagScroll');
  let myTagScroll = new IScroll($tagScroll[0], {
   click: true,
   tap: true,
   scrollX: true,
   scrollY: false
  });

  // 当点击对应的 tag 便签时，加上 active 标签，其他兄弟标签移除 active 标签
  let $tagsWrap = $('.tagsWrap');
  $tagsWrap.on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  
  
  // 不知道为什么就是出错了
  // 使用 mock 拦截头部的 ajax 请求
 /*  Mock.mock(`host/header/tags`, {
    "tags|2-5": [
      {
        // 从属性值 array 中随机选取 1 个元素，作为最终值。
        'tag|1': ['前端工程师', '后端工程师', 'web前端', 'java架构师', 'h5小游戏开发'],
      }
    ]
  });

  $.ajax({
    type: 'GET',
    url: `host/header/tags`,
    success: function(data){
      console.log(data);
    },
    error: function(err){
      console.log(err);
    }
  }) */


  // navWrap
  // 当点击 .leftNav .nav-item 时添加 active 类，兄弟元素移除
  let $leftNav = $('.navWrap .leftNav');
  $leftNav.on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });



  // 初始化   contentWrap

  let $contentScroll = $('.contentWrap');
  let mycontentScroll = new IScroll($contentScroll[0], {
   click: true,
   tap: true,
   scrollX: false,
   scrollY: true,
   startX: 0,
   startY: 0
  });




  


})();
