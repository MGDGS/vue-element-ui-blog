<template>
    <div class="template">
        <el-row class="banner">
     <transition name="el-fade-in-linear">
        <el-col :span="24" v-show="bannerShow" class="banner-img">
          <img src="@/assets/banner/InformationBanner.png" />
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
img { 
    width: 100%;
}
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
</style>