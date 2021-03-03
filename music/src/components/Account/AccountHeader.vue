<template>
  <div class="header">
      <div class="header-left" @click="back"></div>
      <ul class="header-title">
        <li :class="{'active' : switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
        <li :class="{'active' : switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
      </ul>
      <div class="header-right"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            switchNum:0
        }
    },
methods:{
    back(){
        window.history.back()
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
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
    height: 60px;
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
        background-image: url(./../../assets/back_163@3x.png) ;
    }
    .header-right{
        width: 64px;
        height: 64px;
        margin-bottom: 5px;
        // margin-top: 5px;
        background-image: url(./../../assets/more_163@3x.png) ;
    }
    .header-title{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #fff;
        border-radius: 10px;
        text-align: center;
        line-height: 60px;
        height: 30px;
        margin-top: 20px;
        li{
            height: 30px;
            line-height: 30px;
            color:#fff;
            font-weight:600;
            padding: 0 15px;
            &:nth-of-type(1){
                border-right: 1px solid #fff;               
            }
            &.active{
                background: rgba(255,255,255,0.3);
            }
        }
    }
}
</style>