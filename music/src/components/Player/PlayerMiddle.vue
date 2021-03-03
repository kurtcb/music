<template>
  <!--swiper的bug,如果数据是从网络获取的, 那么自动轮播到最后一页之后就不轮播了-->
  <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="play">
        <img :src="currentSong.picUrl" alt="" />
      </div>
      <p>{{ getFirstLyric() }}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="ScrollView">
        <div class="iscroll">
          <ul>
            <li v-for="(value, key) in this.currentLyric" :key="key" :class="{'active' :currentLineNumber===key}">
              {{ value }}
            </li>
          </ul>
        </div>
      </ScrollView>
    </swiper-slide>
    <div class="miss"></div>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import "swiper/swiper-bundle.css";
// import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters, mapActions } from "vuex";
import { getSongDetail } from "../../api/index";
import ScrollView from "../ScrollView";
export default {
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  name: "Banner",
  methods: {
    ...mapActions(["getSongLyric"]),
    getFirstLyric() {
      for (let key in this.currentLyric) {
        return this.currentLyric[key];
      }
    },
    getActiveLineNum(lineNum){
      let result=this.currentLyric[lineNum]
      if(result===undefined||result===''){
        lineNum--
        return this.getActiveLineNum(lineNum)
      }else{
        return lineNum+''
      }
    }
  },
  computed: {
    ...mapGetters(["currentSong", "isPlaying", "currentLyric"]),
  },

  data() {
    return {
      currentLineNumber:'0',
      swiperOption: {
        // loop: true, // 循环模式选项
        //  preventClicks : false,
        //  touchMoveStopPropagation:false,
        // autoplay: {
        //   delay:1500, // 自动切换的时间间隔，单位ms
        //   stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
        //   disableOnInteraction: false ,// 用户操作swiper之后，是否禁止autoplay。
        //   //  paginationClickable: true,
        // },

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
    ScrollView,
  },
  watch: {
    isPlaying(n, o) {
      if (n) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    currentSong(n, o) {
      this.getSongLyric(n.id);
      if (n.id === undefined) {
        return;
      }
      this.$refs.ScrollView.refresh();
    },
    currentTime(n,o){
      // console.log(n);
      let lineNum=Math.floor(n)
      this.currentLineNumber=this.getActiveLineNum(lineNum)
      // console.log(this.currentLineNumber);
      // let result=this.currentLyric[lineNum]
      // if(result!==undefined && result!==''){
      //   this.currentLineNumber=lineNum
            let currentLyricTop=document.querySelector("li.active").offsetTop
      // console.log(currentLyricTop);
      let lyricHeight=this.$refs.lyric.$el.offsetHeight
      // console.log(lyricHeight);
      if(currentLyricTop>lyricHeight/2){
        this.$refs.ScrollView.scrollTo(0,lyricHeight/2-currentLyricTop,100)
      }else{
        this.$refs.ScrollView.scrollTo(0,0,100)
      }
      }
  

  },
};
</script>

<style scoped lang="scss">
.banner {
  position: fixed;
  top: 100px;
  bottom: 120px;
  left: 0;
  right: 0;

  .cd {
    .cd-wrapper {
      // display: block;
      margin: 0 auto;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 50px solid black;
      overflow: hidden;
      animation: sport 10s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      margin-top: 50px;
      color: #ccc;
    }
  }
  .lyric {
    text-align: center;
    margin-bottom: 50px;

    .iscroll {
      //  height: 1500px;
      //  overflow: hidden;
      li {
        margin: 10px 0;
        list-style: none;
        color: #ccc;
        &:last-of-type{
          padding-bottom: 55%;
        }
        &.active {
          color: #fff;
        }
      }
    }
  }
  .miss {
    width: 100px;
    height: 100px;
    background-color: #fff;
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
<style lang="scss">
/*注意点: 如果想覆盖swiper的样式, 那么style标签不能是scoped的, 否则无法覆盖*/
.banner {
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #f00;
    opacity: 0.2;
  }
  .swiper-pagination-bullet-active {
    width: 10px;
    height: 10px;
    background: #f00;
    opacity: 1;
  }
}
</style>
