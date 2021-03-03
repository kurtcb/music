<template>
  <div class="singer">
    <ScrollView ref="ScrollView">
      <ul class="list-wrapper">
        <li
          class="list-group"
          v-for="(value, index) in list"
          :key="index"
          ref="group"
        >
          <h2 class="group-title">{{ keys[index] }}</h2>
          <ul>
            <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
              <img v-lazy="obj.img1v1Url" alt="" />
              <p>{{ obj.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
      <li
        v-for="(key, index) in keys"
        :key="key"
        @click.stop="keyDown(index)"
        :class="{ 'active': currentIndex === index }"
      >
        {{ key }}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
// import {getHotArtists} from '../api/index'
import { getAllArtists } from "../api/index";
import ScrollView from "../components/ScrollView";
export default {
  components: {
    ScrollView,
  },
  methods: {
    keyDown(index) {
      // this.currentIndex = index;
      // console.log(index);
      let offsetY = this.groupTop[index];
      // console.log(offsetY);
      this.$refs.ScrollView.scrollTo(0, -offsetY);
    },
    switchSinger(id){

          this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  created() {
    getAllArtists()
      .then((result) => {
        console.log(result);
        this.keys = result.keys;
        this.list = result.list;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  data() {
    return {
      keys: [],
      list: [],
      groupTop: [],
      currentIndex: 0,
    };
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.groupTop.push(group.offsetTop);
        });
        console.log(this.groupTop);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 110px;
  right: 0;
  left: 0;
  bottom: 0;
  // background-color:#f00;
  overflow: hidden;
  .list-wrapper {
    // width: 100%;
    // height: 100%;
    .list-group {
      .group-title {
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
        // margin-left: 90%;
        background-color: #f00;
        width: 100%;
      }
    }
    .group-item {
      display: flex;
      justify-content: flex-start;
      padding: 10px 20px;
      border: 1px solid #ccc;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
      }
      p {
        display: flex;
        align-items: center;
      }
    }
  }
  .list-keys {
    position: fixed;
    top: 60%;
    right: 10px;
    transform: translateY(-50%);
    li {
      font-size: 13px;
      color: #000;
      padding: 1px 0;
      &.active {
        text-shadow:2px 2px 8px #FF0000;
      }
    }
  }
}
</style>