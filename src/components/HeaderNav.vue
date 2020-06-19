<template>
  <div class="header-nav">
    <el-row type="flex" align-items:="center">
      <el-col :span="4" class="logo">
        <img src="@/assets/mylogo.png" />
      </el-col>
      <el-col :span="12">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          background-color="rgba(255,255,255,0)"
          text-color="white"
          active-text-color="#409eff"
        >
          <el-menu-item index="1" @click="gotoIndex">首页</el-menu-item>
          <el-menu-item index="2" @click="gotoArticle">博文</el-menu-item>
          <el-menu-item index="3" @click="gotoMusic">音乐</el-menu-item>
          <el-menu-item index="4" @click="gotoAlbum">相册</el-menu-item>
          <el-menu-item index="5" @click="gotoBoard">留言</el-menu-item>
          <el-menu-item index="6" @click="gotoAbout">关于</el-menu-item>
          
        </el-menu>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="input"></el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name:"HeaderNav",
  data() {
    return {
      input: '',
      activeIndex: '1'
    }
  },
  methods:{
    gotoIndex() {
      this.$router.push('/IndexComponent');
      sessionStorage.setItem("index","1")
    },
    gotoArticle() {
      this.$router.push('/ArticleComponent');
      sessionStorage.setItem("index","2")
    },
    gotoMusic() {
       this.$router.push('/MusicComponent');
       sessionStorage.setItem("index","3")
    },
    gotoBoard() {
      this.$router.push('/BoardComponent');
      sessionStorage.setItem("index","4")
    },
    gotoAlbum() {
      this.$router.push('/AlbumComponent');
      sessionStorage.setItem("index","5")
    },
    gotoAbout() {
      this.$router.push('/MyInformation');
      sessionStorage.setItem("index","6")
    }
  },
  beforeMount() {
    this.activeIndex = sessionStorage.getItem("index")
  }
};
</script>
<style scoped>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 30px;
  transition: 0.5s;
  z-index: 999;
  background: rgba(50, 50, 50, 0.2);
}
.header-nav:hover {
  background: rgba(0, 0, 0, 0.5);
}
.logo {
  height: 60px;
}
.logo img {
  height: 100%;
}
.el-row {
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.el-menu {
  border-bottom: none !important;
}
.el-menu-item {
  font-size: 2vh;
}
.el-menu-item:hover {
  background: rgba(250, 250, 250, 0.3) !important;
}
</style>