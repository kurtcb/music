<template>
  <div class="detailbottom">
    <ul>
      <li class="top" @click="selectAllMusic">
        <span><img src="../../assets/play_163@2x.png" alt="" /></span>
        <p>播放全部</p>
      </li>
      <li v-for="(value,index) in tracks" :key="index" @click="selectMusic(value.id)">
        <h3>{{ value.name }}</h3>
        <p>{{ value.ar[0].name }}-{{ value.al.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import modeType from '../../store/modeType';
import { mapActions,mapGetters } from "vuex";
export default {
  props: {
    tracks: {
      type: Array,
      default: () => [],
      required: true,
    },
     props:{
    totalTime:{
      type:Number,
      default:0,
      required:true,
    }
  },
  },
  computed:{
    ...mapGetters(['isPlaying','songs','currentIndex'])
  },
  methods: {
         ...mapActions(["setFullScreen","setMiniPlayer","setSongDetail","setIsPlaying"]),
    selectMusic(id) {
      //   this.$store.dispatch('setFullScreen',true)
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      this.setSongDetail([id]);
      this.setIsPlaying(true)
      let ids=this.tracks.map(function(item){
         return item.id
       })
      //  console.log(this.currentIndex);
        // this.setSongDetail(ids);
        
    },
    selectAllMusic(){
       this.setFullScreen(true);
          this.setMiniPlayer(false);
      this.setIsPlaying(true)
       let ids=this.tracks.map(function(item){
         return item.id
       })
        this.setSongDetail(ids);
    }
  },
  
};
</script>

<style lang="scss" scoped>
.detailbottom {
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    background-color: #ccc;
    img {
      margin-left: 15px;
      margin-right: 20px;
      width: 35px;
      height: 35px;
    }
  }
  li {
    width: 100%;
    height: 40px;
    background-color: #fff;
    border: 0.2px solid #ccc;
    padding: 5px;

    h3 {
      font-weight: 500;
      font-size: 17px;
    }
    p {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 5px;
    }
  }
}
</style>