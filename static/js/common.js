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