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

  function ajax(option) {
    // 1.创建ajax对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();//非IE5 IE6
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE5 IE6
    }

    if (option.method == 'get' || option.method == 'GET') {
        // 2.连接服务器
        xhr.open(option.method,option.url+'?'+option.datas+'&_='+new Date().getTime(),true);//解决get缓冲问题
        // 3.将请求发送到服务器
        xhr.send(null);//get请求
    } else if (option.method == 'post' || option.method == 'POST'){
        // 2.连接服务器
        xhr.open(option.method,option.url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // 3.将请求发送到服务器
        xhr.send(option.datas);//post请求
    } else {
        alert('暂时只支持get与post请求.');
        return;
    }

    // 4.服务器响应情况
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {//请求完成
            if (xhr.status == 200) {//ok 成功
                option.succeed(xhr.responseText);
            }else {
                option.succeed(xhr.status);
            }
            
        }
    }
}