<template>
    <div class="template">
        <el-row class="banner">
      <transition name="el-fade-in-linear">
        <el-col :span="24" v-show="bannerShow" class="banner-img">
          <img src="@/assets/banner/AlbumBanner.jpg" />
        </el-col>
      </transition>
      <transition name="el-fade-in-linear">
        <el-col class="banner-header" v-show="bannerShow">
          <el-row type="flex" align="center">
            <el-col>用图片承载记忆</el-col>
          </el-row>
          <el-row type="flex" justify="center" class="banner-tip">
            <el-col>
              想看点啥
            </el-col>
          </el-row>
        </el-col>
      </transition>
    </el-row>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      bannerShow: false
    };
  },
  mounted() {
    this.bannerShow = true;
  }
};
</script>

<style scoped>
.template {
  width: 100%;
  background: #f2f2f2;
}
.banner {
  height: 40rem;
  overflow: hidden;
  position: relative;
}
.banner-img {
  transition: 0.5s;
}
.banner-img img {
  width: 100% !important;
}
.banner-header {
  transition: 1s;
  position: absolute;
  font-size: 5rem;
  font-family: "STHupo", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  top: 30%;
  color: rgb(23, 56, 6);
}
.banner-tip {
    margin-top: 8rem;
  font-family:'STXinwei', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 4rem;
}
</style>