// 格式化数字
export const formatNumber = n => {
  n = n.toString();
  return !n[1] ? '0' + n : n; 
};

export const getCurDate = (d, format = '-') => {
  return [d.getFullYear(), formatNumber(d.getMonth() + 1), formatNumber(d.getDate())].join(format);
}; 

// 检测是否是Safari浏览器
export const isSafari = () => { 
  // return false;
  return navigator.vendor.indexOf('Apple') > -1;
}

export const isWechat = () => {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
}

//  
export const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag ? true : false;
}

export const formatTime = (num) => {
  num = Math.round(num);
  if(num < 60){
    return formatNumber(num);
  }
  let hour = 0, min = 0, sec=0;
  const arr = [];
  if(num >= 3600){
    hour = Math.floor(num / 3600);
    arr.push(hour);
    num = Math.floor(num % 3600);
  }
  min = Math.floor(num/60);
  sec = num % 60;
  arr.push(min, sec);
  return arr.map(item => formatNumber(item)).join(':');
}

// showdate 格式：2020-07-06
export const getSetDate = ( showdate, type) => {
  let dayX = showdate ? new Date(showdate.replace(/-/g, '/')) : new Date();
  let nowtime = dayX.getTime();
  let dtime = 1000 * 60 * 60 * 24;
  let millisecond;
  if(type < 0) {
    millisecond = nowtime + type * dtime;
  } else if(type > 0){
    millisecond = nowtime + type * dtime;
  } else{
    millisecond = nowtime;
  }   
  return getCurDate(new Date(millisecond));
}


export const formatMoneyNumber = (val) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = Number(val).toFixed(2) + '';
  // console.log(str);
  var intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
  var dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
  var ret = intSum + dot;
  return ret;
}