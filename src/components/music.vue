<template>
  <!--音乐播放器-->
  <div class="box">
    <div :class="{ 'right-button1': !offsetThreshold, 'right-button': offsetThreshold }"
         @click="iconDisplay">
      <div>
        <i class="iconfont  icon-jiantouyou"></i>
      </div>
    </div>
    <div class="music-container"
         :class="{ 'music-active-switch': offsetThreshold }">

      <div class="right_set"
           @click="listFlag = !listFlag">
        <i class="iconfont icon-liebiao-copy"></i>
      </div>

      <transition-group name="slide-fade">
        <div 
        :class="{ 'radio_list': offsetThreshold, 'radio_list1': !offsetThreshold }"
             v-if="listFlag">
          <div class="serch">
            <div class="serch-box">
              <input v-model="inputVal"
                     @input="serchInput()"  placeholder="请输入歌曲名字搜索"/>
              <div class="icons" @click="serchInput()">
                <i class="iconfont icon-seach-copy"></i>
              </div>
              <div class="iconsclone"
                   v-if="inputVal"
                   @click="serchInput(1)">
                <i class="iconfont icon-guanbi-copy"></i>
              </div>
            </div>

          </div>
          <div class="item_box"
               v-for="(item, index) in videoArr"
               :key="item.id"
               @click="stopMusic(item, index)">
            <div class="items"
                 :style="item.flag? 'background-color:#E9E9E9;' :  '' ">
              <div class="lefts">
                <div class="num">{{ index + 1 }}</div>
                <div>{{ item.img_text }}</div>
              </div>
              <div class="rights">
                {{ item.singer }}
              </div>
            </div>
          </div>
        </div>

      </transition-group>

      <div class="music-disk">
        <!--唱片图片-->
        <img class="music-disk-picture"
             :class="{ 'music-disk-playing-style': playState }"
             :src="imgurl"
             alt="" />
      </div>

      <!--进度条-->
      <div class="music-slider">
        <el-slider v-model="playTime"
                   :format-tooltip="tooltipFormat"
                   size="small"
                   :max="sliderLength"
                   @change="changePlayTime" />
      </div>

      <!--按钮组-->
      <div class="button-group">
        <!--上一曲 按钮-->
        <button class="play-button"
                @click="lastButtonClick"
                title="上一首">
          <icon-go-start theme="outline"
                         size="23"
                         fill="#939393"
                         :strokeWidth="3"
                         strokeLinejoin="miter"
                         strokeLinecap="butt" />
        </button>
        <!--播放 按钮-->
        <button class="play-button"
                @click="playButtonClick">
          <icon-play-one v-if="!playState"
                         theme="outline"
                         size="23"
                         fill="#939393"
                         :strokeWidth="3"
                         strokeLinejoin="miter"
                         strokeLinecap="butt"
                         title="播放" />
          <icon-pause v-if="playState"
                      theme="outline"
                      size="23"
                      fill="#939393"
                      :strokeWidth="3"
                      strokeLinejoin="miter"
                      strokeLinecap="butt"
                      title="暂停" />
        </button>
        <!--下一曲 按钮-->
        <button class="play-button"
                @click="nextButtonClick"
                title="下一首">
          <icon-go-end theme="outline"
                       size="23"
                       fill="#939393"
                       :strokeWidth="3"
                       strokeLinejoin="miter"
                       strokeLinecap="butt" />
        </button>
        <!--音量按钮-->
        <div class="voice-container">
          <button class="voice-button"
                  @click="voiceButtonClick">
            <icon-volume-notice v-if="!voiceMute"
                                theme="outline"
                                size="23"
                                fill="#939393"
                                :strokeWidth="3"
                                strokeLinejoin="miter"
                                strokeLinecap="butt" />
            <icon-volume-mute v-if="voiceMute"
                              theme="outline"
                              size="23"
                              fill="#939393"
                              :strokeWidth="3"
                              strokeLinejoin="miter"
                              strokeLinecap="butt" />
          </button>
          <!-- <div class="voice-slider">
          <el-slider v-model="voicePower" :max="1" :step="0.1" size="small" @change="changeVoicePower" />
        </div> -->

          <div class="voice-slider">
            <el-slider v-model="voicePower"
                       vertical
                       :max="100"
                       :step="1"
                       height="70px" />
          </div>
        </div>
      </div>

      <audio ref="musicAudio"
             class="audio-component"
             controls
             preload="auto"
             @canplay="changeDuration">
        <source ref="musicSource"
                type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { videoList } from "@/api/home";

//这里是自己封装的axios请求，可以将这里替换成自己的请求逻辑
// import requests from "@/api/ajax";

export default {
  name: "index",
  setup() {
    // 歌曲数组
    let videoArr = ref([
      {
        img_text: "",
        singer: "",
        id: 1,
        music_url: "",
        img_url: "",
        flag: false,
      },
    ]);

    let imgurl = ref("http://cdn.xlong.tech/southeast.jpg");

    let inputVal = ref<string>("");

    // 列表Flag
    let listFlag = ref(false);

    //是否正在播放
    const playState = ref(false);

    //现在的播放时间
    const playTime = ref(0.0);

    //歌曲的时间长度
    const playDuration = ref(0.0);

    //进度条长度
    const sliderLength = ref(100);

    //歌曲URL
    const musicUrl = ref<any>("");

    //播放器标签
    const musicAudio = ref<any>(null);

    //实现音乐播放的标签
    const musicSource = ref<any>(null);

    //是否静音
    const voiceMute = ref(false);

    //音量大小
    const voicePower = ref(100);

    // 播放器是否显示隐藏
    let videoFlag = ref(false);

    const musicState = reactive<any>({
      musicArr: [],
      musicCount: 0,
    });

    const musicCursor = ref(0);

    //页面偏移量
    const pageOffset = ref(0);

    //是否达到阈值，达到阈值就显示播放器，反之
    const offsetThreshold = ref(true);

    //激活播放器
    const operateMusicPlayer = () => {
      // pageOffset.value = window.scrollY;
      // //当页面滚动偏移达到800，激活用户框
      // if (pageOffset.value > 800) {
      //   offsetThreshold.value = true;
      // } else {
      //   //反之
      //   offsetThreshold.value = false;
      // }
    };

    //播放按钮点击回调
    const playButtonClick = () => {
      if (playState.value) {
        musicAudio.value.pause();
      } else {
        musicAudio.value.play();
      }

      //修改播放时间【设置这个，当一首歌正常播放结束之后，再次点击播放按钮，进度条会得到重置】
      playTime.value = musicAudio.value.currentTime;

      //重新设置播放状态
      playState.value = !playState.value;
    };

    //上一曲按钮点击回调
    const lastButtonClick = () => {
      if (musicCursor.value === 1) {
        musicCursor.value = videoArr.value.length;
      } else {
        musicCursor.value -= 1;
      }

      changeMusic();
    };

    //下一曲按钮点击回调
    const nextButtonClick = () => {
      if (musicCursor.value >= videoArr.value.length) {
        musicCursor.value = 1;
      } else {
        musicCursor.value += 1;
      }

      changeMusic();
    };

    //歌曲进度条文本提示
    const tooltipFormat = (val: any) => {
      let strTime = playTime.value;

      let strMinute = parseInt(strTime / 60 + "");

      let strSecond = parseInt((strTime % 60) + "");

      return strMinute + ":" + strSecond;
    };

    //当歌曲能播放时【亦即在canplay钩子函数中】，musicAudio.value.duration才不会是NaN，才能进行歌曲长度的设置
    const changeDuration = () => {
      if (playDuration.value != musicAudio.value.duration) {
        //修改进度条的最大值
        sliderLength.value = musicAudio.value.duration;

        //修改歌曲播放时间
        playDuration.value = musicAudio.value.duration;
      }
    };

    //el-slider的钩子函数，拖动进度条时快进歌曲，改变当前播放进度
    const changePlayTime = (val: any) => {
      console.log(val, "valll");
      musicAudio.value.currentTime = val;
    };

    //音量按钮点击回调
    const voiceButtonClick = () => {
      voiceMute.value = !voiceMute.value;

      if (!voiceMute.value) {
        voicePower.value = 1;

        musicAudio.value.volume = 1;
      } else {
        voicePower.value = 0;

        musicAudio.value.volume = 0;
      }
    };

    //el-slider的钩子函数，用于调节音量
    const changeVoicePower = (val: any) => {
      musicAudio.value.volume = val / 100;
      voicePower.value = val;
      if (val > 0) {
        voiceMute.value = false;
      } else {
        voiceMute.value = true;
      }
    };

    //播放状态下，进度条里的数值每秒递增。而Audio因为在播放状态下，currentTime会自己递增，所以不用处理
    const updatePlayTimePerSecond = () => {
      if (playState.value) {
        playTime.value += 1;
        if (playTime.value >= playDuration.value) {
          //代表当前歌曲已经播放完毕，进行切歌
          if (musicCursor.value == musicState.musicCount) {
            musicCursor.value = 1;
          } else {
            musicCursor.value++;
          }

          // 播放完毕进度条置0
          // playTime.value = 0 ;
          changeMusic();
        }
      }
    };

    //切歌
    const changeMusic = (index?: number) => {
      // 切歌【这里的music_url是后端返回给前端的json字符串中，用于存储歌曲在线链接的属性名是：
      // music_url，所以要实现自己的请求逻辑，将这里的music_url改为自己的即可】
      // musicSource.value.src = musicState.musicArr[musicCursor.value % musicState.musicCount].music_url
      videoArr.value.forEach((item) => {
        item.flag = false;
      });
      if (index) {
        musicSource.value.src = videoArr.value[index].music_url;
        videoArr.value[index].img_url
          ? (imgurl.value = videoArr.value[index].img_url)
          : (imgurl.value = "http://cdn.xlong.tech/southeast.jpg");
        videoArr.value[index].flag = true;
      } else {
        musicSource.value.src = videoArr.value[musicCursor.value - 1].music_url;
        videoArr.value[musicCursor.value - 1].img_url
          ? (imgurl.value = videoArr.value[musicCursor.value - 1].img_url)
          : (imgurl.value = "http://cdn.xlong.tech/southeast.jpg");
        videoArr.value[musicCursor.value - 1].flag = true;
      }

      // 当刷新了url之后，需要执行load方法才能播放这个音乐
      musicAudio.value.load();

      playTime.value = musicAudio.value.currentTime;

      sliderLength.value = musicAudio.value.duration;

      musicAudio.value.play();

      playState.value = true;
    };

    //初始化歌曲源【将这里替换成自己的请求逻辑】
    const initMusicArr = () => {
      videoList(inputVal.value).then((res) => {
        if (res.code == 200) {
          videoArr.value = res.data;
          musicState.musicArr = videoArr.value;
          musicState.musicCount = videoArr.value.length;
          musicUrl.value = videoArr.value[0];
          videoArr.value.forEach((item) => {
            item.flag = false;
          });
          console.log(
            videoArr.value,
            "videoArr.valuevideoArr.valuevideoArr.valuevideoArr.value"
          );
          // if( videoArr.value[0].img_url){
          //   imgurl.value =  videoArr.value[0].img_url
          // }
        }
      });

      // requests.get("/Music/QueryAllMusic").then(function (res) {
      //   musicState.musicArr = res
      //   musicState.musicCount = res.length

      // })
    };

    const serchInput = (num?:number) => {

      num? inputVal.value = ''  :
      console.log(1)
      let t = null;
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        initMusicArr();
      }, 200);
    };

    // 点击切歌
    const stopMusic = (item: any, index: number) => {
      console.log(item, index, "itemmm");
      changeMusic(index);
    };

    // 隐藏播放器按钮
    const iconDisplay = () => {
      // videoFlag.value = !videoFlag.value
      offsetThreshold.value = !offsetThreshold.value;
    };

    watch(voicePower, (newval) => {
      musicAudio.value.volume = newval / 100;
      voicePower.value = newval;
      if (newval > 0) {
        voiceMute.value = false;
      } else {
        voiceMute.value = true;
      }
    });

    onMounted(() => {
      initMusicArr();
      //播放状态下，使播放进度自增1，以与Audio内置的currentTime相匹配
      setInterval(updatePlayTimePerSecond, 1000);
      //添加滚动事件
      window.addEventListener("scroll", operateMusicPlayer);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", operateMusicPlayer);
    });

    return {
      inputVal,
      imgurl,
      listFlag,
      videoArr,
      musicAudio,
      musicSource,
      playState,
      playTime,
      playDuration,
      sliderLength,
      musicUrl,
      voiceMute,
      voicePower,
      musicState,
      musicCursor,
      pageOffset,
      offsetThreshold,
      playButtonClick,
      lastButtonClick,
      nextButtonClick,
      voiceButtonClick,
      tooltipFormat,
      changeMusic,
      changeDuration,
      changePlayTime,
      changeVoicePower,
      updatePlayTimePerSecond,
      initMusicArr,
      iconDisplay,
      stopMusic,
      serchInput,
    };
  },
};
</script>

<style scoped lang="scss">
.box {
  position: fixed;
  z-index: 9999;
}
.items {
  border-bottom: 1px solid #fff;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  text-align: center;
  color: #707778;
  cursor: pointer;
}

.lefts {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.num {
  margin-right: 10px;
  margin-top: 4px;
}

.rights {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.items:hover {
  background-color: #e9e9e9;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.right_set {
  position: absolute;
  right: 10px;
  top: 6px;
  cursor: pointer;
}

.radio_list {
  position: absolute;
  width: 300px;
  height: 170px;
  background-color: #eaecf0;
  bottom: 102px;
  overflow: auto;

  .serch {
    width: 100%;
    padding-bottom: 4px;
    .serch-box {
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        outline-style: none;
        width: 97%;
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #f5f5f5;
        height: 20px;
      }
      .icons {
        position: absolute;
        top: 2px;
        right: 8px;
        cursor: pointer;
      }
      .iconsclone {
        position: absolute;
        top: 2px;
        right: 27px;
        cursor: pointer;
      }
    }
  }
}
.radio_list1{
  display: none;
}

.item_box {
  height: 25px;
}

.right-button1 {
  width: 20px;
  height: 40px;
  background: #eaecf0;
  position: fixed;
  left: 0px;
  bottom: 44px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}

.right-button {
  width: 20px;
  height: 40px;
  background: #eaecf0;
  position: fixed;
  left: 310px;
  bottom: 44px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}

.music-container {
  position: fixed;
  justify-content: center;
  width: 300px;
  height: 110px;
  background-color: #eaecf0;
  border-radius: 15px;
  bottom: 15px;
  left: 10px;
  opacity: 0;
  transition: 0.5s;
}

.music-disk {
  position: absolute;
  width: 90px;
  height: 90px;
  left: 15px;
  top: 10px;
  border-radius: 50%;
}

.music-disk-picture {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  /*设置图片不可点击*/
  pointer-events: none;
}

.music-disk-playing-style {
  animation: music-disk-rotate 5s linear infinite;
}

@keyframes music-disk-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.button-group {
  position: absolute;
  width: 330px;
  height: 38px;
  left: 90px;
  bottom: 13px;
  margin-left: 10px;
}

.button-group > button {
  margin-left: 10px;
}

.play-button {
  float: left;
  width: 31px;
  height: 31px;
  padding: 4px;
  /*margin: 0px;*/
  border: 0px;
  border-radius: 50%;
  margin: 7px 0px 0px 0px;
  cursor: pointer;
}

.voice-button {
  float: left;
  width: 31px;
  height: 31px;
  padding: 0px;
  /*margin: 0px;*/
  border: 0px;
  border-radius: 50%;
  margin: 7px 0px 0px 0px;
  background-color: transparent;
  cursor: pointer;
}

.music-slider {
  position: absolute;
  top: 20px;
  left: 120px;
  width: 50%;
}

.voice-container {
  float: left;
  margin-left: 12px;
  width: 31px;
  height: 38px;
  overflow: hidden !important;
  transition: 0.5s;
}

.voice-container:hover {
  width: 160px;
  .voice-slider {
    opacity: 1;
  }
}

.voice-slider {
  opacity: 0;
  position: absolute;
  // top: 0px;
  bottom: 9px;
  right: 106px;
  /* width: 90px; */
  height: 35px;
  /* background-color: white; */
  border-radius: 10px;
  padding: 0px 15px 0px 15px;
  transition: 0.2s;
  :deep(.el-slider__button) {
    height: 14px !important;
    width: 14px !important;
  }
}

.audio-component {
  width: 300px;
  height: 200px;
  top: 100px;
  display: none;
}

.music-active-switch {
  opacity: 1;
}
</style>
