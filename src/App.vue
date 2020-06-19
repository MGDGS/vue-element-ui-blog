<template>
  <div id="app">
    <el-collapse-transition>
      <HeaderNav v-show="navShow" :class="{ active : navHover }"></HeaderNav>
    </el-collapse-transition>
    <router-view></router-view>
    <el-backtop :bottom="100" :right="50">
      <i class="el-icon-s-promotion"></i>
    </el-backtop>
    <PlayControl></PlayControl>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav";
import PlayControl from "@/components/PlayComponent";
export default {
  name: "App",
  data() {
    return {
      scrollTop: 0, //距离顶部
      scroll: 0, //上下滚动
      down: "",
      up: "",
      navShow: true,
      navHover: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    // 监听（绑定）滚轮 滚动事件
  },
  watch: {
    scroll() {
      if (this.scroll == 0) {
        this.navHover = false;
      } else if (this.scroll > 0) {
        this.navShow = false;
        this.navHover = false;
      } else {
        this.navShow = true;
        this.navHover = true;
      }
    },
    scrollTop() {
      this.scrollTop == 0 ? (this.navHover = false) : (this.navHover = true);
    }
  },
  methods: {
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let i = 0; //当前距离
      this.scroll = scrollTop - this.i;
      this.i = scrollTop;
      this.scrollTop = scrollTop;
      this.scrollTop == 0 ? (this.navHover = false) : (this.navHover = true);
    }
  },
  components: {
    HeaderNav,
    PlayControl
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 50rem;
}
.active {
  background: rgba(0, 0, 0, 0.3);
}
.el-backtop {
  background: none;
  border: none !important;
  font-size: 5vh;
}
</style>
