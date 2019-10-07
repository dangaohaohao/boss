(function () {

  // 当点击 navWrap 的时候，相应的 list-item 加上 active 类,其他的移除 active 类
  let $list = $('.navWrap .list');
  $list.on('click', '.list-item', function () {
    if ($(this).index() == 3) {
      return
    }
    $(this).addClass('active').siblings().removeClass('active');
  });


  // 动态创建消息

  // 创建左边的消息
  // 动态创建一个 li 
  // 动态赋值类名
  // 创建内容
  // appendChild
  let $content = $('.contentWrap .content');

  function createLeft(val) {
    let msgLi = document.createElement('li');
    msgLi.className = 'left';
    msgLi.innerHTML = `<img src="../static/images/avar02.jpg" class="avar"><span>${val}</span>`;
    $content.append(msgLi);
  }

  // 创建右边的消息
  function createRight(val) {
    let msgLi = document.createElement('li');
    msgLi.className = 'right';
    msgLi.innerHTML = `<img src="../static/images/avar01.jpg" class="avar"><span>${val}</span>`;
    $content.append(msgLi);
  }

  // 监听 input 框的事件，如果有按下就发送获取输入的值，
  // 右边增加消息，并向上滚动一定距离
  // 发送 ajax 请求，拿到请求回来的数据，
  // 左边增加消息，并向上滚动一定距离
  let $input = $('.inputBox .input');
  $input.keyup(function (e) {
    if (e.keyCode == 13) {
      createRight($input.val());
      $content[0].scrollTop = 10000000;

      ajax({
        method: 'post',
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        datas: {
            "perception": {
                "inputText": {
                    "text": `${$input.val()}`
                }
            },
            "userInfo": {
                "apiKey": "b24150ce17244793af8421a02bbcba8d",
                "userId": ""
            }
        },
        succeed: function (str) {
          var json = JSON.parse(str);
          createLeft(json.text);
          $content[0].scrollTop = 10000000;
        },
        error: function (err) {
          console.log(err);
      }

      });
    }
  });

  $input.val('');


})();



