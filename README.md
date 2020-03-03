let parameter = {
id: "#my-swiper", //整体容器 （轮播+指示灯）
wrap: ".swiper-ul", // 轮播容器
indicatorShowType: true, //是否显示指示灯
indicator: "#indicator", //指示灯 dom id
arrow: true, //面板是否显示箭头指向
currentColor: "red", //指示灯颜色 默认 red
interTime: 3000, //定时播放时间间隔
autoPlay: true //自动播放
};
new mySwiper(parameter);
