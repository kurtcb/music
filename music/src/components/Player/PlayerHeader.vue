<template>
  <div class="header">
    <div class="header-left" @click="hideMucis"></div>
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    methods:{
      ...mapActions(['setMiniPlayer','setFullScreen']),
        hideMucis(){
            this.setFullScreen(false)
            this.setMiniPlayer(true)
        }
    },
    computed:{
      ...mapGetters(['currentSong'])
    }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  height: 60px;
//   background-color: #f00;
  display: flex;
  justify-content: space-between;
  // position: relative;
  // z-index: 999;
  .header-left {
    width: 60px;
    height: 60px;
    background-image: url(../../assets/back_163@3x.png);
  }
  .header-right {
    width: 60px;
  }
  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h3 {
      color: #fff;
      font-weight: 400;
    }
    p {
      color: #ccc;
      margin-top: 8px;
    }
  }
}
</style>