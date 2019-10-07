(function () {

  // 当点击 navWrap 的时候，相应的 list-item 加上 active 类,其他的移除 active 类
  let $list = $('.navWrap .list');
  $list.on('click', '.list-item', function () {
    if ($(this).index() == 3) {
      return
    }
    $(this).addClass('active').siblings().removeClass('active');
  });



})();



