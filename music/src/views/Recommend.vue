<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized
          :personalized="personalized"
          :title="'推荐歌单'"
          @select="fatherSelectItem"
          :type="'personalized'"
        ></Personalized>
        <Personalized :personalized="album" :title="'最新专辑'"  @select="fatherSelectItem" :type="'album'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>

<script>
import Banner from "../components/Recommend/Banner";
import Personalized from "../components/Recommend/Personalized";
import SongList from "../components/Recommend/SongList";
import ScrollView from "../components/ScrollView";
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,

} from "../api/index";
export default {
  name: "Recommmend",
  data() {
    return {
      banners: [],
      personalized: [],
      album: [],
      songs: [],
    };
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  methods: {
    fatherSelectItem(id,type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`,
      });
      console.log(id);
    },
  },
  created() {
    getBanner()
      .then((data) => {
        // console.log(data)
        this.banners = data.banners;
      })
      .catch(function (err) {
        console.log(err);
      });
    getPersonalized()
      .then((data) => {
        // console.log(data)
        this.personalized = data.result;
      })
      .catch(function (err) {
        console.log(err);
      });
    getNewAlbum()
      .then((data) => {
        this.album = data.albums.splice(0, 6);
      })
      .catch(function (err) {
        console.log(err);
      });
    getNewSong()
      .then((data) => {
         console.log(data.result);
        // this.songs = data.result;
        let list=[]
        data.result.forEach((value) => {
          let obj={}
          obj.name=value.name
          obj.id=value.id
          obj.picUrl=value.song.album.picUrl
          let singer=''
          for(let i=0;i<value.song['artists'].length;i++){
            if(i===0){
              singer=value.song['artists'][i].name
            }else{
              singer+='-'+value.song['artists'][i].name
            }
          }
          obj.singer=singer
          list.push(obj)
        });
        this.songs=list
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 110px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>