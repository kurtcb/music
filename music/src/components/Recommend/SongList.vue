<template>
  <div class="song">
      <div class="song-top">
          <h3>最新音乐</h3>
      </div>
     <SongListItem :songs='songs'></SongListItem>
  </div>
</template>

<script>
import {mapActions, mapGetters}from 'vuex'
import SongListItem from '../SongListItem'
export default {
components:{
    SongListItem
},
 props: {
    songs: {
      type: Array,
      default: () => [],
      required: true,
    },
},
computed:{
    ...mapGetters(['isPlaying'])
}
}
</script>

<style lang="scss" scoped>
 .song-top {
    width: 100%;
    line-height: 34px;
    height: 34px;
    padding: 15px 20px;
    h3 {
      font-size: 26px;
      font-weight: bold;
    }
  }
  .song-list>.item{
      list-style: none;
      display: flex;
      align-items: center;
      border: 0.2px solid #ccc;
  >img{
      width: 70px;
      height: 70px;
      border-radius: 5px;
      margin: 5px 0;
  }
  h3{
      font-weight: normal;
      margin-left: 20px;
  }
  p{
      margin-left: 20px;
      margin-top: 10px;
      opacity: 0.7;
  }
  }
</style>