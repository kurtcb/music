<template>
  <div class="account-bottom">
      <div class="bottom-play" @click="selectAllMusic">
          <span><img src="../../assets/images/small_play_163.png" alt=""></span>
          <span>播放全部</span>
      </div>
      <div class="bottom-wrapper">
          <ScrollView ref="ScrollView">
              <SongListItem :songs="switchNum===0?favorateList:historyList"></SongListItem>
            
          </ScrollView>
      </div>
  </div>
</template>

<script>
import ScrollView from '../../components/ScrollView'
import SongListItem from '../../components/SongListItem'
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
components:{
    ScrollView,
    SongListItem

},
computed:{
    ...mapGetters(['favorateList','historyList'])
},
props:{
 switchNum:{
        type:Number,
    default:0,
    required:true
 }
},
methods:{
    ...mapActions(['setSongDetail','setFullScreen','setMiniPlayer','setIsPlaying','setCurrentIndex']),
    ...mapMutations(['changeSongDetail']),
       selectAllMusic () {
      // let ids = []
      if (this.switchNum === 0) {
        // ids = this.favoriteList.map(function (item) {
        //   return item.id
        // })
        // this.$store.commit('SET_SONG_DETAIL', this.favoriteList)
        this.changeSongDetail(this.favorateList)
      } else {
        // ids = this.historyList.map(function (item) {
        //   return item.id
        // })
        this.changeSongDetail(this.historyList)
      }
      // this.setSongDetail(ids)
      this.setFullScreen(true)
      this.setCurrentIndex(0)
    }
  
}
// watch:{
//     historyList(n,o){
//        this.$refs.ScrollView.refresh();
//     }
// }
}
</script>

<style lang="scss" scoped>
.account-bottom{
position: fixed;
top: 50px;
left: 0;
bottom: 0;
right: 0;
// background-color: aqua;
.bottom-play{
    width: 170px;
    height: 40px; 
    margin: 35px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #f00;
    border-radius: 20px;
    span{  
        &:nth-of-type(1){
             margin-right: 10px;
        }
       
    }
}
.bottom-wrapper{
    overflow: hidden;
    position: fixed;
    top: 150px;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color: #fff;
}
}
</style>