<template>
<div class="rank">
<ScrollView>
<ul>
  <li v-for="(value,key) in category.titles" :key="key">
    <h3 class="group-title">{{value}}</h3>
    <ul class="normal-group" v-if="value==='官方榜'">
    <li v-for="obj in category[key]" :key="obj.id" @click.stop="selectedItem(obj.id)">
        <div class="rank-left">
          <img v-lazy="obj.rank.coverImgUrl" alt="">
           <p>{{obj.rank.updateFrequency}}</p>
        </div>
        <div class="rank-right">
         <p v-for="(song,index) in obj.rank.tracks" :key="song.first">{{index}}.{{song.first}}-{{song.second}}</p>
        </div>
      </li>
    </ul>
    <ul class="other-group" v-else>
      <li v-for="obj in category[key]" :key="obj.id" @click.stop="selectedItem(obj.id)">
           <div class="rank-top">
             <img v-lazy="obj.rank.coverImgUrl" alt="">
           <p>{{obj.rank.updateFrequency}}</p>
           </div>
        <div class="rank-bottom">
          <p>{{obj.rank.name}}</p>
        </div>
      </li>
    </ul>
  </li>
</ul>
</ScrollView>
<router-view></router-view>
</div>

</template>

<script>
import{getTopListDetail}from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  data(){
    return{
      category:{}
    }
  },
  components:{
    ScrollView
  },
  methods:{
    selectedItem(id){
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
created(){
  getTopListDetail()
  .then((data)=>{
    console.log(data);
    this.category=data
  })
  .catch(function(err){
    console.log(err);
  })
}
}
</script>

<style lang="scss" scoped>
.rank{
  overflow: hidden;
  position: fixed;
  top: 110px;
  right: 0;
  bottom: 0;
  left: 0;
  .group-title{
    padding: 20px 10PX;
  }
  .normal-group{
    li{
      display: flex;
      padding: 5px 5px;
      align-items: center;
      .rank-left{
           position: relative;
        img{
          width: 100px;
          height: 100px;
          border-radius: 10px;
       
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          font-size: 12px;
        }
      }
      .rank-right{
        margin-left: 10px;
        p{
          font-size: 12px;
          padding: 5px 0;
          }
      }
    }
  }
  .other-group{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
     li{

       padding: 5px 5px;

      .rank-top{
           position: relative;
        img{
          width: 100px;
          height: 100px;
          border-radius: 10px;
       
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          font-size: 12px;
        }
      }
      .rank-bottom{
        margin-left: 10px;
         width: 100px;
          overflow: hidden;
          white-space: nowrap;
        p{
         
          font-size: 12px;
          padding: 5px 0;
          }
      }
    }
  }
}

</style>