<template>
  <div id="app">
    <Header></Header>
    <tabbar></tabbar>
    <router-view/>
        <player></player>
  </div>
</template>
<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
import Player from './views/Player.vue'
export default {
  name:'App',
  components:{
    Header,
    Tabbar,
    Player
    
  }
  
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
   overflow-x: hidden;height: 100%;overflow: hidden;
   touch-action: none;
   
}
</style>
