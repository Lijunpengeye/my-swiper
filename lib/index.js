class mySwiper {
  constructor(parameter) {
    this.$id = parameter.id || "#wrap";
    this.$wrap = parameter.wrap || ".wrap-ul";
    this.$indicator = parameter.indicator || "#indicator";
    this.indicatorShowType = parameter.indicatorShowType || false; //是否显示指示灯
    this.currentColor = parameter.currentColor || "#007aff"; // 指示灯颜色
    this.arrow = parameter.arrow || false; //是否显示箭头指示
    this.interTime = parameter.interTime || 3000; //定时间隔
    this.autoPlay = parameter.autoPlay || false; //自动播放
    this.width = this.getDom(this.$id)[0].clientWidth; //显示宽度
    this.pageNum = 0; //当前页码
    this.setIntervalId = 0; //定时器id
    this.wrapLength = this.getDom(this.$wrap)[0].children.length; //轮播长度
    this.position = 0; //当前位置
    this.init();
  }
  // 初始化
  init() {
    this.addEvent();
    if (this.indicatorShowType) this.indicator();
    if (this.arrow) this.arrowEvent();
    this.automaticPlay();
  }
  // 获取dom
  getDom(name) {
    return document.querySelectorAll(name);
  }
  // 滑动事件
  addEvent() {
    // 开始滑动
    const touchstart = e => {
      this.startTouchX = e.changedTouches[0].clientX; // 记录开始滑动的位置
    };
    // 滑动中
    const touchmove = e => {
      let moveTouchX = e.changedTouches[0].clientX;
      let value = moveTouchX - this.startTouchX - this.position;
      let $wrap_ul = this.getDom(this.$wrap)[0];
      $wrap_ul.style.transform = `translate3d(${value}px, 0px, 0px)`;
    };
    // 滑动结束
    const touchend = e => {
      let endTouchX = e.changedTouches[0].clientX; // 滑动结束的位置
      let value = this.startTouchX - endTouchX; // value 大于0 向左滑动；小于0 向右滑动
      if (Math.abs(value) > 40) {
        if (value > 0) {
          // 向左滑动
          if (this.pageNum < this.wrapLength - 1) this.pageNum++;
          this.changDom("touch");
        } else {
          // 向右滑动
          if (this.pageNum !== 0) this.pageNum--;
          this.changDom("touch");
        }
      }
    };
    let slideDom = this.getDom(this.$id)[0];
    slideDom.addEventListener("touchstart", touchstart, false);
    slideDom.addEventListener("touchmove", touchmove, false);
    slideDom.addEventListener("touchend", touchend, false);
  }
  // 修改dom
  changDom(type) {
    if (type === "touch") {
      clearInterval(this.setIntervalId);
      this.automaticPlay();
    }
    let $wrap_ul = this.getDom(this.$wrap)[0];
    $wrap_ul.style.transitionDuration = "300ms";
    this.position = this.pageNum * this.width;
    $wrap_ul.style.transform = `translate3d(${-this
      .position}px, 0px, 0px)`;
    setTimeout(() => {
      $wrap_ul.style.transitionDuration = "0ms";
    }, 300);
    if (this.indicatorShowType) this.indicator();
  }
  // 指示灯显示
  indicator() {
    let indexHtml = ``;
    const indicator = this.getDom(this.$indicator)[0];
    for (let i = 0; i < this.wrapLength; i++) {
      if (i === this.pageNum) {
        indexHtml += `<div class="light" style="backGround:${this.currentColor};"></div>`;
      } else {
        indexHtml += `<div class="light"></div>`;
      }
    }
    indicator.innerHTML = indexHtml;
    const light = document.getElementsByClassName("light");
    for (let i = 0; i < this.wrapLength; i++) {
      light[i].onclick = e => {
        this.pageNum = i;
        this.changDom();
      };
    }
  }
  // 自动轮播
  automaticPlay() {
    if (!this.autoPlay) return;
    this.setIntervalId = setInterval(e => {
      if (this.pageNum >= this.wrapLength - 1) {
        this.pageNum = 0;
      } else {
        this.pageNum++;
      }
      this.changDom("automatic");
    }, this.interTime);
  }
  // 箭头显示
  arrowEvent() {
    const html = `<div class="swiper-button-prev"> <svg  t="1583207045711"  class="icon"  viewBox="0 0 1024 1024"  version="1.1"  xmlns="http://www.w3.org/2000/svg"  p-id="2366"  width="50"  height="50"> <path d="M710.4 838.4 358.4 492.8c-12.8-12.8-32-12.8-44.8 0l0 0c-12.8 12.8-12.8 32 0 44.8l352 352c12.8 12.8 32 12.8 44.8 0l0 0C723.2 876.8 723.2 851.2 710.4 838.4z" p-id="2367" ></path> <path d="M358.4 531.2l352-352c12.8-12.8 12.8-32 0-44.8l0 0c-12.8-12.8-32-12.8-44.8 0L313.6 486.4c-12.8 12.8-12.8 32 0 44.8l0 0C326.4 544 345.6 544 358.4 531.2z" p-id="2368"></path> </svg></div>
  <div class="swiper-button-next" style="transform: rotate(180deg);"><svg t="1583207045711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2366" width="50" height="50"> <path d="M710.4 838.4 358.4 492.8c-12.8-12.8-32-12.8-44.8 0l0 0c-12.8 12.8-12.8 32 0 44.8l352 352c12.8 12.8 32 12.8 44.8 0l0 0C723.2 876.8 723.2 851.2 710.4 838.4z" p-id="2367"></path> <path d="M358.4 531.2l352-352c12.8-12.8 12.8-32 0-44.8l0 0c-12.8-12.8-32-12.8-44.8 0L313.6 486.4c-12.8 12.8-12.8 32 0 44.8l0 0C326.4 544 345.6 544 358.4 531.2z" p-id="2368"></path> </svg></div>`;
    let $id = this.getDom(this.$id)[0];
    $id.innerHTML += html;
    let prev = document.getElementsByClassName("swiper-button-prev")[0];
    let next = document.getElementsByClassName("swiper-button-next")[0];
    prev.onclick = e => {
      if (this.pageNum === 0) return;
      this.pageNum--;
      this.changDom();
    };
    next.onclick = e => {
      if (this.pageNum >= 3) return;
      this.pageNum++;
      this.changDom();
    };
  }
}