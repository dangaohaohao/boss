(function () {

  // 适配屏幕像素比
  function resetRem() {
    let width = document.documentElement.clientWidth || window.innerWidth || document.documentElement.getBoundingClientRect;
    document.documentElement.style.fontSize = 100 * width / 640 + 'px';
  }
  resetRem();
  window.onresize = resetRem;


  // 设置请求的基础 url 
  let host = 'localhost';

  // headerWrap
  let $tagScroll = $('.tagScroll');
  let myTagScroll = new IScroll($tagScroll[0], {
    click: true,
    tap: true,
    scrollX: true,
    scrollY: false,
    startX: 0,
    startY: 0
  });

  // 当点击对应的 tag 便签时，加上 active 标签，其他兄弟标签移除 active 标签
  let $tagsWrap = $('.tagsWrap');
  $tagsWrap.on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });


  // 使用 mock 拦截头部的 ajax 请求  host/jobs/header/tags
  Mock.mock(`host/jobs/header/tags`, {
    "tags|2-5": [{
      // 从属性值 array 中随机选取 1 个元素，作为最终值。
      'tag|1': ['前端工程师', '后端工程师', 'web前端', 'java架构师', 'h5小游戏开发'],
    }]
  });

  $.ajax({
    type: 'GET',
    url: `host/jobs/header/tags`,
    success: function (data) {
      let obj = JSON.parse(data);

      // 使用 mock 拿到了数据 遍历 对象的 tags 数据
      //  用 tmpStr 来临时存放
      // 将 遍历的 每个对象的 tag 值 作为 li 的 内容
      // 添加给 tagsWrap 元素 tagsWrap.innerHTML
      let tmpStr = '';
      for (let i = 0, len = obj.tags.length; i < len; i++) {
        tmpStr += `<li class="tag-item">${obj.tags[i].tag}</li>`;
      }
      console.log(tmpStr);
      $tagsWrap.html(tmpStr);

      $tagsWrap.children().eq(0).addClass('active').siblings().removeClass('active');


    },
    error: function (err) {
      console.log(err);
    }
  })






  // navWrap
  // 当点击 .leftNav .nav-item 时添加 active 类，兄弟元素移除
  let $leftNav = $('.navWrap .leftNav');
  $leftNav.on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');

    // 当点击的时候发送对应的 ajax 请求
    // 如果是第一个 请求 url 为 host/jobs/contentWrap/recommend
    // 如果是第二个，请求 url 为 host/jobs/contentWrap/new
    if ($(this).index() == 0) {

      $.ajax({
        type: 'GET',
        url: `host/jobs/contentWrap/recommend`,
        success: function (data) {
          // console.log(data);
          let obj = JSON.parse(data);
    
          let tmpStr = '';
    
          for (let i = 0, len = obj.jobs.length; i < len; i ++) {
    
            tmpStr += `<a href="./jobDetails.html" class="cont-item">
            <!-- title -->
            <h3 class="title">${obj.jobs[i].jobName}</h3>
            <!-- info -->
            <p class="info">${obj.jobs[i].info}</p>
            <!-- infoTagsWrap -->
            <nav class="infoTagsWrap clear">
          <li class="infotag-item">${obj.jobs[i].tags[0]}</li>
          <li class="infotag-item">${obj.jobs[i].tags[1]}</li>
          <li class="infotag-item">${obj.jobs[i].tags[2]}</li>
        </nav>
        <!-- userWrap -->
        <div class="userWrap">
          <div class="userAvar">
            <img src="${obj.jobs[i].avar}">
          </div>
          <span class="userName">${obj.jobs[i].username}</span>
        </div>
        <!-- sarary -->
        <div class="sarary">${obj.jobs[i].salary}</div>
        </a>`;
    
          } 
    
          $content.html(tmpStr);
          
        },
        error: function (err) {
          console.log(err);
        }
      })

    }else if ($(this).index() == 1) {

      $.ajax({
        type: 'GET',
        url: `host/jobs/contentWrap/new`,
        success: function (data) {
          // console.log(data);
          let obj = JSON.parse(data);
    
          let tmpStr = '';
    
          for (let i = 0, len = obj.jobs.length; i < len; i ++) {
    
            tmpStr += `<a href="./jobDetails.html" class="cont-item">
            <!-- title -->
            <h3 class="title">${obj.jobs[i].jobName}</h3>
            <!-- info -->
            <p class="info">${obj.jobs[i].info}</p>
            <!-- infoTagsWrap -->
            <nav class="infoTagsWrap clear">
          <li class="infotag-item">${obj.jobs[i].tags[0]}</li>
          <li class="infotag-item">${obj.jobs[i].tags[1]}</li>
          <li class="infotag-item">${obj.jobs[i].tags[2]}</li>
        </nav>
        <!-- userWrap -->
        <div class="userWrap">
          <div class="userAvar">
            <img src="${obj.jobs[i].avar}">
          </div>
          <span class="userName">${obj.jobs[i].username}</span>
        </div>
        <!-- sarary -->
        <div class="sarary">${obj.jobs[i].salary}</div>
        </a>`;
    
          } 
    
          $content.html(tmpStr);
          
        },
        error: function (err) {
          console.log(err);
        }
      })

    }else {
      console.log('出错了，没有其他的选项');
    }

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

  let $content = $('.contentWrap .content');


  // 使用 mock 拦截内容部分的 ajax 请求  host/jobs/contentWrap/recommend
  Mock.mock(`host/jobs/contentWrap/recommend`, {
    "jobs|5-8": [{
      'jobName|1': ['前端工程师', '后端工程师', 'web前端', 'java架构师', 'h5小游戏开发'],
      'salary|1': ['6-8k', '10-12k', '3-5k', '4-8k', '1-6k'],
      'info': '@csentence()',
      'tags': ['深圳 南山区', '实习生', '本科'],
      username: '@cname',
      'avar': '@image(200x200, @color, @color, @username)'
    }]
  });

   // 使用 mock 拦截内容部分的 ajax 请求  host/jobs/contentWrap/new
   Mock.mock(`host/jobs/contentWrap/new`, {
    "jobs|5-8": [{
      'jobName|1': ['前端工程师', '后端工程师', 'web前端', 'java架构师', 'h5小游戏开发'],
      'salary|1': ['6-8k', '10-12k', '3-5k', '4-8k', '1-6k'],
      'info': '@csentence()',
      'tags': ['杭州 南山区', '实习生', '本科'],
      username: '@cname',
      'avar': '@image(200x200, @color, @color, @username)'
    }]
  });


  // 进入首先要去请求推荐的页面
  $.ajax({
    type: 'GET',
    url: `host/jobs/contentWrap/recommend`,
    success: function (data) {
      // console.log(data);
      let obj = JSON.parse(data);

      let tmpStr = '';

      for (let i = 0, len = obj.jobs.length; i < len; i ++) {

        tmpStr += `<a href="./jobDetails.html" class="cont-item">
        <!-- title -->
        <h3 class="title">${obj.jobs[i].jobName}</h3>
        <!-- info -->
        <p class="info">${obj.jobs[i].info}</p>
        <!-- infoTagsWrap -->
        <nav class="infoTagsWrap clear">
      <li class="infotag-item">${obj.jobs[i].tags[0]}</li>
      <li class="infotag-item">${obj.jobs[i].tags[1]}</li>
      <li class="infotag-item">${obj.jobs[i].tags[2]}</li>
    </nav>
    <!-- userWrap -->
    <div class="userWrap">
      <div class="userAvar">
        <img src="${obj.jobs[i].avar}">
      </div>
      <span class="userName">${obj.jobs[i].username}</span>
    </div>
    <!-- sarary -->
    <div class="sarary">${obj.jobs[i].salary}</div>
    </a>`;

      } 

      $content.html(tmpStr);
      
    },
    error: function (err) {
      console.log(err);
    }
  })






})();