// navWrap
// 事件委托 添加点击事件
let $tab = $('.navWrap .tab');
$tab.on('click', '.tab-item', function () {
  $(this).addClass('active').siblings().removeClass('active');
});

// 点击的时候发送 ajax 请求，请求数据，动态渲染



