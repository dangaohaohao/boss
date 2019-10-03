(function () {

  // 当点击 title-item 的时候，给当前点击的 title-item 加上 now 样式，兄弟元素移除 now 的样式
  let $titleWrap = $('.titleWrap');
  let $titleItems = $('.title-item');
  let $chat = $('.chat');
  let $interact = $('.interact');

  // 初始化
  let $contentScroll = $('.contentWrap');
  let mycontentScroll = new IScroll($contentScroll[0], {
    click: true,
    tap: true,
    scrollX: false,
    scrollY: true,
    startX: 0,
    startY: 0
  });

  // 页面显示 以及滚动容器 
  $titleWrap.on('click', '.title-item', function () {
    $(this).addClass('now').siblings().removeClass('now');

    // 遍历判断
    for (let i = 0, len = $titleItems.length; i < len; i++) {
      if (this == $titleItems[i]) {
        if (i == 0) {
          // 显示 chat 隐藏 interact
          $chat.css('display', 'block');
          $interact.css('display', 'none');
          mycontentScroll = new IScroll($contentScroll[0], {
            click: true,
            tap: true,
            scrollX: false,
            scrollY: true,
            startX: 0,
            startY: 0
          });

        } else if (i == 1) {
          // 显示 interact 隐藏 chat
          $interact.css('display', 'block');
          $chat.css('display', 'none');
          mycontentScroll = new IScroll($contentScroll[1], {
            click: true,
            tap: true,
            scrollX: false,
            scrollY: true,
            startX: 0,
            startY: 0
          });

        }
      }
    }

  });

  // 互动页面的判断

  // tag 样式的切换
  let $interactHead = $('.interactHead');
  $interactHead.on('click', '.tag', function() {
    $(this).addClass('active').parent().siblings().children().removeClass('active');
  });

  // selection 的切换
  let $selection = $('.selection');
  $selection.on('click', '.selec-item', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });



})();