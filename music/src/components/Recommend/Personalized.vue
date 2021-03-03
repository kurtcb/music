<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
        <img v-lazy="value.picUrl" alt="" />
        <p>{{ value.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default:'',
      required: true,
    },
    type:{
         type: String,
      default:'',
      required: true,
    }
    
  },
  methods:{
   
      selectItem(id){
        //   console.log(id);
        this.$emit('select',id,this.type)
       
      } 
  }
};
</script>

<style lang="scss" scoped>
.personalized {
  .personalized-top {
    width: 100%;
    line-height: 34px;
    height: 34px;
    padding: 15px 20px;
    h3 {
      font-size: 26px;
      font-weight: bold;
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding:5px 0 ;
    .item {
        margin-bottom: 15px;
     width: 30%;
      img {
        width: 100%;
        height: width;
        border-radius: 20px;
      }
      p{
             white-space: nowrap; 
    text-overflow:ellipsis; 
    overflow:hidden;
      }
    }
  }
}
</style>>

</style>