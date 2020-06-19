<template>
  <div class="template">
    <el-row class="banner">
      <transition name="el-fade-in-linear">
        <el-col :span="24" v-show="bannerShow" class="banner-img">
          <img src="@/assets/banner/MusicBanner.jpg" />
        </el-col>
      </transition>
      <transition name="el-fade-in-linear">
        <el-col class="banner-header" v-show="bannerShow">
          <el-row type="flex" align="center">
            <el-col>用声音感受美好</el-col>
          </el-row>
          <el-row type="flex" justify="center" class="banner-btn">
            <el-col :span="4">
              <el-button type="primary">电音</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="success">后摇</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="danger">说唱</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="warning">民谣</el-button>
            </el-col>
          </el-row>
        </el-col>
      </transition>
    </el-row>
    <!-- 一个歌单容器 -->
    <el-row class="container" type="flex" justify="center">
      <el-col :span="24" class="verticle-content">
        <el-row type="flex" style="height:100%">
          <el-col
            v-for="item in verticleCover"
            :key="item.id"
            class="content-col"
            @click.native="gotoMusiccontent(item.name)"
          >
            <img :src="item.cover" />
            <el-row class="verticle-overlay">
              <el-col :span="24" class="overlay-text">{{item.name}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 再一个容器 -->
  </div>
</template>
<script>
export default {
  name: "music",
  data() {
    return {
      bannerShow: false,
      verticleCover: [
        {
          id: 0,
          name: "陈奕迅",
          cover: require("@/assets/cover/陈奕迅-verticle.jpg")
        },
        {
          id: 1,
          name: "王嘉尔",
          cover: require("@/assets/cover/王嘉尔-verticle.jpg")
        },
        {
          id: 2,
          name: "梁博",
          cover: require("@/assets/cover/梁博-verticle.jpg")
        },
        {
          id: 3,
          name: "李荣浩",
          cover: require("@/assets/cover/李荣浩-verticle.jpg")
        }
      ],
      songlistCover: [
        { id: 0, name: "周杰伦", cover: require("@/assets/cover/周杰伦.jpg") },
        { id: 1, name: "陈奕迅", cover: require("@/assets/cover/陈奕迅.jpg") },
        { id: 2, name: "王嘉尔", cover: require("@/assets/cover/王嘉尔.jpg") },
        { id: 3, name: "梁博", cover: require("@/assets/cover/梁博.jpg") },
        { id: 4, name: "李荣浩", cover: require("@/assets/cover/李荣浩.jpg") }
      ]
    };
  },
  methods: {
    gotoMusiccontent(name) {
      this.$router.push({ path: "/MusicContent", query: { name: name } })
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
}
.banner-btn {
  margin-top: 3rem;
}
.el-button {
  font-size: 3vh;
  padding: 30px 60px;
  border-radius: 20px;
  transition: 0.8s;
  background: rgba(0, 0, 0, 0.3);
}
.el-button:hover {
  background: rgba(0, 0, 0, 0.9);
}

.container:last-child {
  padding-bottom: 5rem;
}
.content {
  margin-top: 5rem;
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
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  cursor: pointer;
  opacity: 0;
  color: rgb(240, 240, 240);
  font-family: "KaiTi";
  font-size: 2rem;
}
.overlay:hover {
  opacity: 1;
}
.overlay-text {
  position: absolute;
  top: 45%;
  height: 3rem !important;
  text-align: center !important;
}

.verticle-content {
  margin-top: 5rem;
  height: 35rem;
}
.content-col {
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: 0.3s;
}
.content-col:hover {
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0 2px 16px rgb(50, 50, 50);
}
.verticle-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  cursor: pointer;
  opacity: 0;
  color: rgb(240, 240, 240);
  font-family: "KaiTi";
  font-size: 2rem;
}
.verticle-overlay:hover {
  opacity: 1;
}
.content-col img {
  width: 100%;
}
</style>