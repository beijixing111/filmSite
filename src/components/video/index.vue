<template>
  <div class="video-box" >
    <div class="control-box" >
      <div class="video-btn" v-show="loadError" @click="onPlay" ><span>重试</span></div>
      <div class="video-btn spin" v-show="isLoad === 1"><i class="fi fi-circle-o-notch fi-spin"></i></div>
      <div class="video-btn" v-show="!loadError && !isPlay" @click="onPlay"><i class="fi fi-play normal"></i></div>
      <div class="video-btn" v-show="isShowStop" @click='onPause'><i class="fi fi-pause normal"></i></div>
    </div>
    <!-- <div class="dummy" @click='onShowStop'></div>  -->
    <div class="video-wrap" @click='onShowStop'>
      <video class="video-ctx" style="display: inline; object-fit:fill" 
        @canplay="onCanplay" @ended="onEnded"
       :width=" videoOptions.width || '100%'" :height=" videoOptions.height || '100%'"
       :id="'hlsvideo'+ videoId" v-bind='options' :src="isSafariAgent ? videoUrl : (isM3u8Url ? '' : videoUrl)"
      >
      </video>
    </div>
    <div v-show="loadError" class="load-err">
      <p>播放失败，请点击重试！</p>
    </div>
    <div class="controls-box" v-show="isShowStop">
      <div class="le">
        <div class="video-time" :style="{width: durationWidth + 'rem' }">
          <span>{{curDuration}}</span><em>/</em><span>{{videoDuration}}</span>
        </div>
        <div class="video-progress" :id="'progress-' + videoId">
          <div class="video-progress-suc"></div>
          <div class="video-progress-now"></div>
          <div class="video-progress-bar"></div>
        </div>
      </div>
      <div class="rig">
        <i @click="onFullScreen" class="fi fi-arrow-expand normal"></i>
      </div>
    </div>
  </div>
</template>

<script> 

import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'; 
import { isSafari, isMobile } from '../../common/utils'; 
import Hls from 'hls.js'; 
import { formatTime } from '../../common/utils'
export default defineComponent({
  name: 'mimyz-video', 
  components: { },
  props: {
    videoId: Number,
    videoUrl: String,
    videoOptions: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {  
    // console.log(Hls);
    const hls = new Hls();
    const hlsVideo = ref('');
    const videoCtrl = ref('');
    const isM3u8Url = ref(props.videoUrl.indexOf('.m3u8') > -1);
    const isSafariAgent = ref(isSafari());

    const options = reactive({
      poster: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg', 
      muted: false, //静音
      autoplay: false, //自动播放
      loop: false, //循环播放
      preload: 'auto',
      volume: 0.5, //默认音量大小
      controls: false, //是否显示控制器
      playsinline: true,
      "x-webkit-airplay": true, 
      "x5-video-ignore-metadata": true,
      "webkit-playsinline": true, 
      "x5-video-player-type": "h5", // 启用H5播放器 
      "x5-video-orientation": "portrait",
      "x5-video-player-fullscreen": false, // *全屏设置
      ...props.videoOptions
    });
    
    const isPlay = ref(false);
    const isLoad = ref(0);
    const loadError = ref(false);
    const isShowStop = ref(false); 
    const timerId = ref(null); // 播放控件的timerId
    const progressTimerId = ref(null); // 播放进度
    const videoDuration = ref('00:00');
    const curDuration = ref('00:00');
    const durationWidth = ref(1.5);
    const isHlsLoad = ref(false);

    onMounted(() => {
      hlsVideo.value = document.querySelector(`#hlsvideo${props.videoId}`);

      let videoProgressEls = document.querySelectorAll(`#progress-${props.videoId} div`);
      videoCtrl.value = videoProgressEls;
      
      let videoProgressBar = videoProgressEls[2];

      // let downX = 0, downL = 0, scale = 0;
      videoProgressBar.addEventListener('touchstart', onTouchStart);
      videoProgressBar.addEventListener('touchmove', onTouchMove);
      videoProgressBar.addEventListener('touchend', onTouchEnd);

      videoProgressBar.addEventListener('mousedown', onMouseDown);

    });

    onBeforeUnmount(() => { 

      let videoProgressBar = document.querySelectorAll(`#progress-${props.videoId} div`)[2];
      videoProgressBar.addEventListener('touchstart', onTouchStart);
      videoProgressBar.addEventListener('touchmove', onTouchMove);
      videoProgressBar.addEventListener('touchend', onTouchEnd);

      videoProgressBar.addEventListener('mousedown', onMouseDown);
      hls.destroy();
    });

    const videoPlay = () => {
      hlsVideo.value.play();  
      isPlay.value = true;  
      ctx.emit('play');
      progressTimerId.value = setInterval(playing, 1000);
    }
    

    // hls 流播放
    const hlsPlayRun = () => {
      if(Hls.isSupported()) {
        if(!isHlsLoad.value){ 
          hls.loadSource(props.videoUrl); 
          isHlsLoad.value = true;
          hls.attachMedia(hlsVideo.value);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoPlay();
          });
          hls.on(Hls.Events.ERROR, (event, data) => {
            // 监听出错事件
            console.log('加载失败', event, data);
            loadError.value = true;
            isLoad.value = 0;
            isPlay.value = false;
          });
        } else {
          videoPlay();
        }
      } else {
        console.log('浏览器不支持的格式');
      }
    }

    const onPlay = () => { 
      isPlay.value = true;
      if(isLoad.value === 0){
        loadError.value = false;
        isLoad.value = 1;
      }
      if(isM3u8Url.value) {
        if(isSafariAgent.value){
          videoPlay();
        } else {
          hlsPlayRun();
        }
      } else {
        videoPlay();
      }
      ctx.emit('play');
    }

    const onPause = (ev) => {
      // console.log(ev, '暂停')
      hlsVideo.value.pause(); 
      progressTimerId.value = null;
      clearInterval(progressTimerId.value);
      isPlay.value = isShowStop.value = false;
      ctx.emit('pause', ev);
    }

    const setCtrlsTimeout = (time = 3000) => {
      // console.log(timerId.value);
      if(timerId.value) {
        timerId.value = null;
        clearTimeout(timerId.value);  
      }
      if(time === 0){
        isShowStop.value = true; 
        return;
      }
      timerId.value = setTimeout(() => {
        isShowStop.value = false; 
        timerId.value = null;
        clearTimeout(timerId.value);
      }, time);
    }

    const onShowStop = () => { 
      isShowStop.value = true; 
      setCtrlsTimeout();
    }

    // canplaythrough
    const onCanplay = () => {
      // console.log('duration:', hlsVideo.value.duration);
      isLoad.value = 2; 
      videoDuration.value = formatTime(hlsVideo.value.duration);
      durationWidth.value = ((videoDuration.value.length * 2 + 1 ) * 0.13).toFixed(2);
      curDuration.value = formatCurDuration('00');
      if(options.autoplay) {
        videoPlay();
      }
    }

    const onFullScreen = () => {
      ctx.emit('fullScreenPlay');
      options.playsinline = false,
      options["webkit-playsinline"] = false,   
      options["x5-video-player-fullscreen"] = true; 
      if(isMobile()){
        // 手机端全屏无效，加上
        options['controls'] = true;
      }
      hlsVideo.value.requestFullscreen(); 
    }

    const formatCurDuration = (n) => {
      let str = formatTime(n);
      let len = videoDuration.value.length;
      if(str.length < len) {
        let _len = len - str.length;
        let arr = new Array(_len / 3).fill('00:');
        str = arr.join('') + str;
      }
      return str;
    }

    const playing = () => { 
      loadError.value = false;
      let videoEl = hlsVideo.value; 
      // console.log('playing', videoEl.paused);
      if(videoEl.paused){
        return;
      }
      let scale = videoEl.currentTime / videoEl.duration; 
      if(videoEl.buffered.length != 0){
        let scaleSuc = videoEl.buffered.end(0) / videoEl.duration; 
        curDuration.value = formatCurDuration(videoEl.currentTime);
        // 缓存成功的进度
        videoCtrl.value[0].style.width = scaleSuc * 100 + '%'; 
        // 当前进度和bar球的进度
        videoCtrl.value[1].style.width = scale * 100 + '%';
        videoCtrl.value[2].style.left = scale * 100 + '%';
      }
    }

    let downX = 0, downL = 0, scale = 0;
    const onTouchStart = (ev) => {
      if(isM3u8Url.value) return;
      hlsVideo.value.pause(); 
      progressTimerId.value = null; 
      clearInterval(progressTimerId.value); 
      setCtrlsTimeout(0);

      downX = ev.targetTouches ? ev.targetTouches[0].pageX : ev.pageX;
      downL = ev.target.offsetLeft;
      ev.preventDefault(); 
    }

    const onTouchMove = (ev) => { 
      if(isM3u8Url.value) return;
      let pageX = ev.changedTouches ? ev.changedTouches[0].pageX : ev.pageX; 
      scale = (pageX - downX + downL ) / ev.target.parentNode.offsetWidth;
      if(scale < 0) {
        scale = 0;
      }else if(scale > 1) {
        scale = 1;
      }
      videoCtrl.value[0].style.width = scale * 100 + '%';
      videoCtrl.value[1].style.width = scale * 100 + '%';
      videoCtrl.value[2].style.left = scale * 100 + '%';
      setCtrlsTimeout(0);
    }
    const onTouchEnd = (ev) => {
      // console.log(ev);
      if(isM3u8Url.value) return;
      hlsVideo.value.currentTime = scale * hlsVideo.value.duration;
      downX = 0;
      downL = 0;
      scale = 0;
      videoPlay();
      setCtrlsTimeout(); 
      ev.preventDefault();
    }
    const onMouseDown = (ev) => {
      let downX = ev.pageX;
      let downL = ev.target.offsetLeft; 
      document.onmousemove = (ev) => {
        hlsVideo.value.pause();
        setCtrlsTimeout(0);
        let scale = (ev.pageX - downX + downL) /ev.target.parentNode.offsetWidth;
        if(scale < 0) {
          scale = 0;
        }else if(scale > 1) {
          scale = 1;
        }
        videoCtrl.value[0].style.width = scale * 100 + '%';
        videoCtrl.value[1].style.width = scale * 100 + '%';
        videoCtrl.value[2].style.left = scale * 100 + '%'; 
        hlsVideo.value.currentTime = scale * hlsVideo.value.duration; 
      }
      document.onmouseup = () => {
        document.onmousemove =  document.onmouseup = null; 
        videoPlay();
        setCtrlsTimeout(); 
      } 
      ev.preventDefault();
    }

    const onEnded = () => {
      console.log('onEnded');
      isShowStop.value = isPlay.value = false;
      clearInterval(progressTimerId.value);
      progressTimerId.value = null; 
      videoCtrl.value[0].style.width = 0;
      videoCtrl.value[1].style.width = 0;
      videoCtrl.value[2].style.left = 0; 
    }

    return {  
      options,
      isSafariAgent,
      isM3u8Url,
      videoDuration, 
      curDuration,
      durationWidth,
      timerId,
      progressTimerId,
      isShowStop,
      isPlay,
      isLoad,
      loadError,
      onPause,
      onPlay,
      onCanplay, 
      onShowStop,
      onFullScreen,
      onEnded
    };
  }
})
</script>

<style lang="scss" scoped>

$margin: 0.25rem;

.video-box{
  position: relative;
  width: 100%;
  height: 4.26rem;
  max-height: 340px;
  background: #000;
  overflow: hidden;
  margin: 0 auto;
  .control-box{
    position: absolute;
    left: 0; right: 0;
    bottom: 0; top: 0;
  }
  .video-wrap{
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    video{
      width: 100%;
      height: 100%;
    }
  }
  .load-err{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 0.15rem;
    z-index: 3;
    height: 0.6rem;
    background: rgb(21 20 20 / 30%); 
    p{
      text-align: center;
      line-height: 0.6rem;
      color: #f00;
      font-size: 0.3rem;
    }
  }
  .controls-box{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 0.15rem;
    z-index: 3;
    height: 0.6rem;
    background: rgb(21 20 20 / 30%); 
    display: flex;
    justify-content: space-between;
    align-items: center;
    .le{
      display: flex;
      flex: auto;
      justify-content: flex-start;
      align-items: center;
      .video-time {
        margin-right: $margin;
        display: flex;
        width: 1.5rem;
        flex: none;
        color: #ccc;
        font-size: 0.24rem;
        em{
          font-size: 0.22rem;
          font-weight: normal;
          display: inline-block;
          margin-top: 0.02rem;
        }
        span:first-child{
          color: #fff;
        }
      }
      .video-progress{
        position: relative; 
        flex: auto;
        height: 4px; 
        justify-content: center;
        align-items: center;
        background: #888; 
        &-suc{
          position: absolute;
          left: 0; 
          top: 0;
          width: 50%;
          height: 4px;
          background: #ccc;
          z-index: 1;
        }
        &-now{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 4px;
          background: #ff6a03;
          z-index: 2;
        }
        &-bar{
          position: absolute;
          left: 0;
          top: -6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff6a03;
          z-index: 3;
          cursor: pointer;
        }
      }
        
    }
    .rig{
      display: flex;
      flex: none; 
      margin-left: $margin;
      i{
        font-size: 0.3rem;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .dummy{
    margin-top: 46%;
  }
  .video-btn{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: rgb(115 107 108 / 90%);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    i{
      cursor: pointer;
      color: #fff;
      font-size: 0.4rem;
      &.fi-play{
        margin-left: 0.05rem;
      }
      &.fi-spin{
        font-size: 0.44rem;
        color: #fff;
      }
    }
  }
  .video-btn.spin{
    background: rgb(115 107 108 / 50%);
  }
  p{
    font-size: 0.24rem; color: #f00;
  }
}

</style>