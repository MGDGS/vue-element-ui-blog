<template>
  <div class="template">
    <el-row class="banner">
     <transition name="el-fade-in-linear">
        <el-col :span="24" v-show="bannerShow" class="banner-img">
          <img src="@/assets/banner/IndexBanner.jpg" />
        </el-col>
     </transition>
      <transition name="el-fade-in-linear">
        <el-col class="banner-header" v-show="bannerShow">
          <el-row type="flex" align="center">
            <el-col class="logo">
              <img src="@/assets/mylogo.png" />
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" class="banner-header-s">
            <el-col :span="24">新新的博客</el-col>
          </el-row>
          <el-row type="flex" justify="end" class="motto">
            <el-col :span="12">
              <i class="el-icon-star-off"></i> Shine bright like a diamond.
            </el-col>
          </el-row>
        </el-col>
      </transition>
    </el-row>
    <el-row class="container photo-wall" type="flex" justify="center">
      <el-col :span="20" class="photo-content">
        <el-card class="photo img-1">
          <img src="@/assets/banner/AlbumBanner.jpg" />
        </el-card>
        <el-card class="photo img-2">
          <img src="@/assets/banner/BoardBanner.jpg" />
        </el-card>
        <el-card class="photo img-3">
          <img src="@/assets/BannerFive.jpg" />
        </el-card>
        <el-card class="photo img-4">
          <img src="@/assets/banner/ArticleBanner.jpg" />
        </el-card>
        <el-card class="photo img-5">
          <img src="@/assets/banner/MusicBanner.jpg" />
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="container" type="flex" justify="center">
      <el-col :span="14" class="content">
        <el-row>
          <el-col class="content-title">【喵系电音】给夏日加点撩人</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="content-tag">
            <i class="el-icon-collection-tag icon-size">音乐</i>
          </el-col>
          <el-col :span="3" class="content-tag">
            <i class="el-icon-collection-tag icon-size">电音</i>
          </el-col>
          <el-col class="content-tag" :span="5">
            <i class="el-icon-time icon-size">2020-05-11</i>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="content-cover">
          <el-col :span="24" @click.native="test">
            <img src="@/assets/banner/MusicBanner.jpg" />
          </el-col>
        </el-row>
        <el-row class="content-lable">
          <el-col>清新又性感，电音集合</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row type="flex" justify="end">
          <el-col :span="3" class="footer-icon">
            <i class="el-icon-view icon-size">1133</i>
          </el-col>
          <el-col :span="4" class="footer-icon">
            <i class="el-icon-chat-line-round icon-size">1533</i>
          </el-col>
        </el-row>
      </el-col>
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
  methods: {
    test() {
      this.$axios
        .get("http://localhost:3000")
        .then(response => console.log(response.data))
        .catch();
    }
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
  height: 100%;
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
  top: 20%;
  color: white;
}
.logo {
  height: 13rem;
}
.logo img {
  transition: 0.5s;
  height: 100%;
  cursor: pointer;
}
.logo img:hover {
  transform: scale(1.2) rotate(360deg);
}
.banner-header-s {
  margin-top: 1.2rem;
  font-family: "STHupo", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 3rem;
  text-shadow: 0 0 2rem rgba(0, 0, 0, 1);
}
.motto {
  margin-top: 5rem;
  font-family: "STXinwei", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans",
    Arial, sans-serif;
  font-size: 2rem;
}
.container {
  position: relative;
}
.content {
  margin: 5rem;
  background: white;
  border-radius: 1.2rem;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
}
.content:hover {
  box-shadow: 0 0 1.5rem rgb(150, 150, 150);
}
.el-divider {
  margin: 0;
}
.content .el-col {
  text-align: left;
}
.content-cover {
  flex: 1;
  margin-top: 1rem;
  overflow: hidden;
  cursor: pointer;
}
.content-cover .el-col {
  height: 100%;
  overflow: hidden;
}
.content-cover .el-col img {
  width: 100%;
}
.content-lable {
  font-size: 1.5rem;
  padding: 1rem;
  font-family: "STXingkai";
}
.content-title {
  padding-top: 1rem;
  padding-left: 1rem;
  font-family: "KaiTi";
  font-size: 2rem;
  font-weight: bold;
  color: rgb(50, 50, 50);
}
.content-tag {
  padding-left: 0.5rem;
}
.icon-size {
  font-size: 1rem;
  margin: 1rem 1rem;
  color: rgb(100, 100, 100);
}
.footer-icon {
  padding: 0.8rem;
}
.photo-content {
  height: 50rem;
  position: relative;
}
.photo-wall {
  height: 100%;
}
.photo {
  position: absolute;
  background: white;
  transition: 0.5s;
}
.photo img {
  width: 100%;
}

.img-1 {
  max-width: 15rem;
  max-height: 15rem;
  top: 15%;
  left: 5%;
  transform: rotate(-30deg);
}
.img-2 {
  max-width: 20rem;
  max-height: 20rem;
  top: 20%;
  right: 20%;
  transform: rotate(20deg);
}
.img-3 {
  max-width: 25rem;
  max-height: 25rem;
  top: 60%;
  right: 50%;
  transform: rotate(10deg);
}
.img-4 {
  max-width: 16rem;
  max-height: 16rem;
  top: 50%;
  left: 60%;
  transform: rotate(-10deg);
}
.img-5 {
  max-width: 30rem;
  max-height: 30rem;
  top: 20%;
  left: 25%;
  transform: rotate(2deg);
}
.photo:hover {
  transform: rotate(0);
  z-index: 99;
  transform: scale(1.1);
}
</style>