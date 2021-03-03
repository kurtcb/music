<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailTop :coverImgUrl="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :tracks="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import DetailHeader from "../components/Detail/DetailHeader";
import DetailTop from "../components/Detail/DetailTop";
import DetailBottom from "../components/Detail/DetailBottom";
import ScrollView from "../components/ScrollView";
import { getPlayList,  getAlbum,getArtistsSong, getTopList } from "../api/index";
export default {
  data() {
    return {
      playlist: {},
    };
  },
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
  created() {
    console.log( this.$route.params.type);
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          console.log(data);
          this.playlist = data.playlist;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else if(this.$route.params.type === 'album'){
  getAlbum({ id: this.$route.params.id })
        .then((data) => {
          console.log(data);
          this.playlist= {
            name: data.album.name,
            coverImgUrl:data.album.picUrl,
            tracks:data.songs
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }  else if (this.$route.params.type === 'singer') {
      getArtistsSong({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }  else if (this.$route.params.type === 'rank') {
       getTopList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } 
  },
  mounted() {
    let defaulHeight = this.$refs.top.$el.offsetHeight;
    console.log(defaulHeight);
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY);

      if (offsetY < 0) {
        let scale = (10 * Math.abs(offsetY)) / defaulHeight;
        this.$refs.top.$el.style.filter = `blur(${scale}px)`;
      } else {
        let scale = 1 + offsetY / defaulHeight;
        // console.log(scale);
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  overflow: hidden;
  .bottom {
    width: 100%;
    position: fixed;
    top: 300px;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>
