
<template>
  <!--swiper的bug,如果数据是从网络获取的, 那么自动轮播到最后一页之后就不轮播了-->
  <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
  <swiper :options="swiperOption" class="banner" v-if="banners.length > 0" >
    <!-- slides -->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>
<script>
import 'swiper/swiper-bundle.css'
// import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
         preventClicks : false,
        autoplay: {
          delay:1500, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false ,// 用户操作swiper之后，是否禁止autoplay。
          //  paginationClickable: true,  
        },
        
       
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
         clickable:true,
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner{
  .item{
    img{
      width: 94%;
      height: 150px;
      border-radius: 15px;
      margin-left: 3%;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="scss">
 
  /*注意点: 如果想覆盖swiper的样式, 那么style标签不能是scoped的, 否则无法覆盖*/
.banner{
  .swiper-pagination-bullet{
    width: 10px;
    height: 10px;
    background: #f00;
    opacity: 0.2;
  }
  .swiper-pagination-bullet-active{
    width: 10px;
    height: 10px;
    background: #f00;
    opacity: 1;
  }
 
}
</style>
