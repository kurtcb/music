<template>
  <div class="mini-player" v-show="isShowMiniPlayer">
    <div class="player-wrapper">
      <div class="player-left" @click="showNormalPlayer">
        <div class="miniCdWrapper" ref="miniPlay">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <div class="player-title">
          <h3>{{ currentSong.name }}</h3>
          <p>{{ currentSong.singer }}</p>
        </div>
      </div>
      <div class="play-right">
        <!-- <img src="../../assets/play_163@2x.png" alt="" / ref="play" @click="play"> -->
        <div class="play" ref="play" @click="play"></div>
        <img src="../../assets/list_163@2x.png" alt="" @click="showsList" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["setMiniPlayer", "setFullScreen", "setIsPlaying","setListPlayer"]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
   showsList(){
     this.setListPlayer(true)
   },
    showNormalPlayer() {
      this.setFullScreen(true);
      this.setMiniPlayer(false);
    },
  },
  computed: {
    ...mapGetters(["isShowMiniPlayer", "currentSong", "isPlaying",'isShowListPlayer']),
  },
  watch: {
    isPlaying(n, o) {
      if (n) {
        this.$refs.play.classList.add("active");
        this.$refs.miniPlay.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
        this.$refs.miniPlay.classList.remove("active");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #f00;
  .player-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .player-left {
      display: flex;
      //   justify-content: center;
      //   flex-direction: column;
      align-items: center;
      .miniCdWrapper {
        animation: sport 10s linear infinite;
        animation-play-state: paused;
      
      &.active {
        animation-play-state: running;
      }
      }
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 10px;
        padding-left: 10px;
      }
      .player-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        h3 {
          margin-bottom: 10px;
        }
      }
    }
    .play-right {
      display: flex;
      align-items: center;
      img,
      div {
        width: 60px;
        height: 60px;
      }
      .play {
        @include bg_img("../../assets/images/play");
        &.active {
          @include bg_img("../../assets/images/pause");
        }
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>