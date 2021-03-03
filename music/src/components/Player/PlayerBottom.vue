<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressMove" ref="progressBar">
        <div class="progress-lint" ref="progressLint">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleToltalTime">00:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorate" :class="{'active':isFavorate(currentSong)}"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import modeType from "../../store/modeType";
import mode from "../../store/modeType";
export default {
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurTime",
      "setFavorateList"
    ]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    mode() {
      if (this.modeType === modeType.loop) {
        console.log(this.modeType);
        this.setModeType(modeType.one);
        console.log(this.modeType);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
        console.log(this.modeType);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
        console.log(this.modeType);
      }
    },
    prev() {
        if (this.modeType == mode.loop) {
        this.setCurrentIndex(this.currentIndex - 1);
      }
      if (this.modeType == mode.one) {
        this.setCurrentIndex(this.currentIndex - 1);
      }
      if (this.modeType == mode.random) {
        let index=this.getRandomInt(0,this.songs.length-1)
        this.setCurrentIndex(index)
      }
    },
    next() {
      if (this.modeType == mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1);
      }
      if (this.modeType == mode.one) {
        this.setCurrentIndex(this.currentIndex + 1);
      }
      if (this.modeType == mode.random) {
        let index=this.getRandomInt(0,this.songs.length-1)
        this.setCurrentIndex(index)
      }
    },
    favorate(){
      this.setFavorateList(this.currentSong)
    },
    isFavorate(song){
      let result=this.favorateList.find(function(currentValue){
        return currentValue.id===song.id
      })
      return result !== undefined
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
    },
    formartTime(time) {
      // 2.得到两个时间之间的差值(秒)
      let differSecond = time;
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24));
      day = day >= 10 ? day : "0" + day;
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor((differSecond / (60 * 60)) % 24);
      hour = hour >= 10 ? hour : "0" + hour;
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor((differSecond / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60);
      second = second >= 10 ? second : "0" + second;
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
      };
    },
    progressMove(e) {
      let normalLeft = this.$refs.progressBar.offsetLeft
      // console.log(normalLeft);
      let eventLeft = e.pageX;
      // console.log(eventLeft);
      let clickLeft = eventLeft - normalLeft;
      // console.log(clickLeft);
      let progressWidth = this.$refs.progressBar.offsetWidth;
      // let progressWidth=this.$refs.bar.style.width
      // console.log(progressWidth);
      let value = clickLeft / progressWidth;
      // console.log(value);
      this.$refs.progressLint.style.width = value * 100 + "%";
      // console.log(this.$refs.progressLint.style.width);
      let curTime = this.totalTime * value;
      this.setCurTime(curTime);
    },
    
  },
  computed: {
    ...mapGetters(["isPlaying", "modeType", "currentIndex","songs","currentSong",'favorateList']),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },

    modeType(newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    totalTime(n, o) {
      let time = this.formartTime(n);
      this.$refs.eleToltalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(n, o) {
      let time = this.formartTime(n);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      let value = (n / this.totalTime) * 100;
      // console.log(value);
      this.$refs.progressLint.style.width = value + "%";
    },
  },
};
</script>

<style  scoped lang="scss">
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .progress-bar {
    width: 100%;
    margin: 0 10px;
    height: 5px;
    background-color: #fff;
    // position: relative;
    .progress-lint {
      width: 0%;
      height: 100%;
      background-color: #ccc;
      position: relative;
      .progress-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .bottom-control {
    // width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    div {
      width: 45px;
      height: 45px;
    }
    .mode {
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active{
         @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>