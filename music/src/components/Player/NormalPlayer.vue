<template>
<transition>
  <!-- <div class="player" v-show="this.$store.getters.isFullScreen"> -->
        <div class="player" v-show="this.isFullScreen">
    <div class="player-wrapper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
      <PlayerBottom :totalTime='totalTime' :currentTime="currentTime"></PlayerBottom>
    </div>
    <div class="img"><img :src="currentSong.picUrl" alt=""></div>
  </div>
</transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import {mapGetters} from 'vuex'
export default {
  props:{
    totalTime:{
      type:Number,
      default:0,
      required:true,
    },
     currentTime:{
      type:Number,
      default:0,
      required:true,
    }
  },
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  computed:{
      ...mapGetters( ['isFullScreen','currentSong'])
         
      
  }
  
};
</script>

<style lang="scss" scoped>
.player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  .player-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: relative;
    z-index: 19999;
    // overflow: hidden;
  }
  .img {
    width: 100%;
    height: 100%;

    // -webkit-filter: grayscale(50%) blur(10px);
        img{
            width: 116%;
            height: 116%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            // filter: blur(20px) ;

    filter:  blur(15px);
            // filter: alpha(opacity=80);

        }
  }
}
</style>