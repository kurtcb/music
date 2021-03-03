<template>
  <div class="list-play" v-show="isShowListPlayer">
    <div class="player-wrapper">
      <div class="player-top">
        <div class="top-left">
          <!-- <img src="../../assets/loop_163@2x.png" alt="" /> -->
          <div class="mode loop" ref="mode" @click="mode"></div>
          <p>顺序播放</p>
        </div>
        <div class="top-right" @click="del()">
          <!-- <img src="../../assets/small_del_163@2x.png" alt="" /> -->
        </div>
      </div>
      <div class="player-middle">
        <ScrollView ref="ScrollView">
          <!-- <ul  ref="play">
            <li v-for="value in songs" :key="value.id" class="item">
              <div class="item-left">
                <div class="item-play" @click="play"></div>
                <p>{{ value.name }}</p>
              </div>

              <div class="item-right">
                <img src="../../assets/favorite_163@2x.png" alt="" />
                <img src="../../assets/small_close_163@2x.png" alt="" />
              </div>
            </li>
          </ul> -->
          <ul ref="play">
              <li class="item" v-for="(value, index) in songs" :key="value.index" @click="selectMusic(index)">
                <div class="item-left" >
                  <div class="item-play" @click.stop="play" v-show="currentIndex==index"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" @click="favorate(value)" :class="{'active':isFavorate(value)}"></div>
                  <div class="item-del"  @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
        </ScrollView>
      </div>
      <div class="player-bottom" @click="hideList">关闭</div>
    </div>
  </div>
</template>

<script>
import ScrollView from "../ScrollView";
import { mapActions, mapGetters } from "vuex";
import modeType from "../../store/modeType";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    ScrollView,
  },
  methods: {
    ...mapActions(["setIsPlaying", "setModeType", "setListPlayer","setDelSong","setCurrentIndex","setFavorateList"]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    hideList() {
      this.setListPlayer(false);
    },
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    del(index){
      this.setDelSong(index)
    },
    favorate(value){
      this.setFavorateList(value)
    },
     isFavorate(song){
      let result=this.favorateList.find(function(currentValue){
        return currentValue.id===song.id
      })
      return result !== undefined
    },
    selectMusic(index){
      this.setCurrentIndex(index)
    }
  },
  computed: {
    ...mapGetters(["isPlaying", "modeType", "songs", "isShowListPlayer","currentIndex","favorateList"]),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    modeType(n, o) {
      if (n === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (n === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (n === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    isShowListPlayer(n, o) {
      if (n) {
        this.$refs.ScrollView.refresh();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.list-play {
  // padding: 20px;
  margin: 0 auto;
  width: 100%;
  background-color: #ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 30px;
          height: 30px;
          margin-right: 10px;
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
      }
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      .top-right  {
        @include bg_img("../../assets/images/small_del");
        width: 50px;
        height: 50px;
      }
    }
    .player-middle{
      height: 400px;
      overflow: hidden;
      ul{
        &.active{
          .item{
            .item-play{
              @include bg_img('../../assets/images/pause');
            }
          }
        }
      }
      .item{
        border-top: 1px solid #ccc;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          width: 70%;
          display: flex;
          align-items: center;
          .item-play{
            width: 30px;
            height: 30px;
            margin-right: 20px;
            @include bg_img('../../assets/images/play');
          }
          p{
            width: 80%;
            @include font_size($font_medium_s);
            @include font_color();
            @include no-wrap();
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-favorite{
            width: 30px;
            height: 30px;
            @include bg_img('../../assets/images/un_favorite');
           &.active{
             @include bg_img('../../assets/images/favorite');
           }
          }
          .item-del{
            width: 30px;
            height: 30px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close')
          }
        }
      }
    }
    .player-bottom {
      height: 50px;
      background-color: #f00;
      text-align: center;
      line-height: 50px;
      color: #fff;
      margin: 20px;
    }
  }
}
</style>