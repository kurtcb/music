<template>
  <div class="account">
        <AccountHeader @switchItem="switchItem"></AccountHeader>
        <AccountBottom :switchNum="switchNum"></AccountBottom>
  </div>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
export default {
    data(){
        return{
            switchNum:0
        }
    },
    methods:{
        switchItem(num){
            this.switchNum=num
        }
    },
components:{
    AccountHeader,
    AccountBottom
}
}
</script>

<style lang="scss" scoped>
.account{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color:#fff;
}
</style>