<template>
  <div class="header">
      <div class="header-left" @click="back"></div>
      <p class="header-title">{{title}}</p>
      <div class="header-right"></div>
  </div>
</template>

<script>
export default {
props:{
     title: {
      type: String,
      default:'',
      required: true,
    },
},
methods:{
    back(){
        window.history.back()
    }
}
}
</script>

<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
}
.header{
    width: 100%;
    height: 50px;
    background-color: #f00;
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    position: relative;
    z-index: 1999;
    // position: relative;
    // z-index: 999;
    .header-left{
        width: 64px;
        height: 64px;
        
        // margin-top: 5px;
        background-image: url(./../../assets/images/back_163@2x.png) ;
    }
    .header-right{
        width: 64px;
        height: 64px;
        margin-bottom: 5px;
        // margin-top: 5px;
        background-image: url(./../../assets/images/more_163@2x.png) ;
    }
    .header-title{
        text-align: center;
        line-height: 50px;
    }
}
</style>