<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer ></MiniPlayer>
    <ListPlay></ListPlay>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import NormalPlayer from "../components/Player/NormalPlayer"
import MiniPlayer from "../components/Player/MiniPlayer"
import ListPlay from "../components/Player/ListPlay"
import {mapGetters,mapActions} from 'vuex'
import modeType from '../store/modeType'
export default {
components:{
    NormalPlayer,
    MiniPlayer,
    ListPlay
},
methods:{
  ...mapActions(['setModeType',"setCurrentIndex","setFavorateSong",'setHistorySong','setHistoryList']),
    timeupdate(e){
      // console.log(e.target.currentTime);
      this.currentTime= e.target.currentTime
    },
    end(){
      if(this.modeType==modeType.loop){
        this.setCurrentIndex(this.currentIndex+1)
      }
       if(this.modeType==modeType.one){
        this.$refs.audio.play()
      }
       if(this.modeType==modeType.random){
         let index=this.getRandomInt(0,this.songs.length-1)
         console.log(index);
        this.setCurrentIndex(index)
      }
    },
  getRandomInt  (min, max)  {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
}
   
   
},
computed:{
  ...mapGetters(['currentSong',"isPlaying","currentIndex","curTime","modeType",'songs','favorateList','historyList'])
},
watch:{
  isPlaying(n,o){
    if(n){
     this.setHistorySong(this.currentSong)
      this.$refs.audio.play()
    }else{
      this.$refs.audio.pause()
    }    
  },
  currentIndex(){
    this.$refs.audio.oncanplay=()=>{
      this.totalTime=this.$refs.audio.duration
      if(this.isPlaying){
         this.setHistorySong(this.currentSong)
         this.$refs.audio.play()
      }else{
              this.$refs.audio.pause()
      }
    }
  } ,
  curTime(n,o){
    this.$refs.audio.currentTime=n
  },
  favorateList(n,o){
    window.localStorage.setItem('favorateList',JSON.stringify(n))
  },
  historyList(n,o){
      window.localStorage.setItem('historyList',JSON.stringify(n))
  }
},
created(){
   let favorateList= JSON.parse(window.localStorage.getItem('favorateList'))
   if(favorateList===null){return}
   this.setFavorateSong(favorateList)

    let historyList= JSON.parse(window.localStorage.getItem('historyList'))
   if(historyList===null){return}
   this.setHistorySong(historyList)
},
mounted(){
   this.$refs.audio.oncanplay=()=>{
     this.totalTime= this.$refs.audio.duration
   }
},
data(){
  return{
    totalTime:0,
    currentTime:0,
  }
}
}
</script>

<style lang="scss" scoped>

</style>