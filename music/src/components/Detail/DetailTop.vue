<template>
  <div class="detail-top">
    <div class="img">
      <img :src="coverImgUrl" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coverImgUrl: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 300px;
//   overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
