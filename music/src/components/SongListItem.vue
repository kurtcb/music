<template>
   <div class="song-list">
          <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
              <img v-lazy="value.picUrl" alt="">
              <div>
                  <h3>{{value.name}}</h3>
                  <p>{{value.singer}}</p>
              </div>
          </li>
      </div>
</template>

<script>
import {mapActions, mapGetters}from 'vuex'
export default {
    
 props: {
    songs: {
      type: Array,
      default: () => [],
      required: true,
    },
},
methods:{
    ...mapActions(['setFullScreen','setMiniPlayer','setSongDetail','setIsPlaying']),
    selectMusic(id){
        // this.$store.dispatch('setFullScreen',true)
        this.setFullScreen(true)
          this.setMiniPlayer(false)
          this.setSongDetail([id])
          this.setIsPlaying(true)
    }
},
}
</script>

<style lang="scss" scoped>
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