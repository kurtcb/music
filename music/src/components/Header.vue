<template>
  <div class="header">
      <div class="header-left"></div>
      <p class="header-title">柯本音乐</p>
      <div class="header-right" @click.stop="accountClick"></div>
  </div>
</template>

<script>
export default {
methods:{
    accountClick(){
        this.$router.push('/account')
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
    color: #fff;
    align-items: center;
    // position: relative;
    // z-index: 999;
    .header-left{
        width: 50px;
        height: 50px;
        
        // margin-top: 5px;
        background-image: url(./../assets/images/logo_163@2x.png) ;
    }
    .header-right{
        width: 50px;
        height: 50px;
        margin-bottom: 5px;
        // margin-top: 5px;
        background-image: url(./../assets/images/account_163@2x.png) ;
    }
    .header-title{
        text-align: center;
        line-height: 60px;
    }
}
</style>