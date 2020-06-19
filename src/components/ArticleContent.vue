<template>
  <div class="template">
    <el-row class="banner">
      <transition name="el-fade-in-linear">
        <el-col :span="24" v-show="bannerShow" class="banner-img">
          <img src="@/assets/banner/ArticleBanner.jpg" />
        </el-col>
      </transition>
    </el-row>
    <el-row type="flex" justify="center" style="margin:10rem 0 2rem 0">
      <el-col :span="18" class="article-content">
        <el-row type="flex" justify="center">
          <el-col :span="24" class="article-title">{{article.l_title}}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2" class="article-tag">
            <i class="el-icon-view">{{article.readCount}}次</i>
          </el-col>
          <el-col :span="2" class="article-tag">
            <i class="el-icon-collection-tag">{{article.tag}}</i>
          </el-col>
          <el-col :span="4" class="article-tag">
            <i class="el-icon-time">{{article.time}}</i>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col class="article-lable">{{article.lable}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row type="flex" justify="center">
          <el-col :span="24" class="article-details" v-html="readme" v-highlight></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col>
            <i class="el-icon-watermelon">看完了点个西瓜叭</i>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="other-article">
          <el-col :span="12" class="other-content">
            <el-row>
              <el-image :src="require('@/assets/banner/ArticleBanner.jpg')"></el-image>
            </el-row>
            <el-row class="other-mask" type="flex">
              <span class="prev other-click">Prev</span>
              <el-col class="other-title">点我查看上一篇博客噢</el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="other-content">
            <el-row>
              <el-image :src="require('@/assets/banner/MusicBanner.jpg')"></el-image>
            </el-row>
            <el-row class="other-mask" type="flex">
              <span class="next other-click">Next</span>
              <el-col class="other-title">点我查看上一篇博客噢</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="comment-divider">
          <el-divider>
            <i class="el-icon-chat-line-round"></i>
          </el-divider>
        </el-row>
        <el-row>
          <el-col class="comment-icon">
            <i class="el-icon-edit">说点什么？</i>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="7">
            <div class="demo-input-suffix">
              <el-input placeholder="（必填）你的用户名噢" v-model="input4">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="demo-input-suffix">
              <el-input placeholder="（必填）还有你的邮箱" v-model="input4">
                <i slot="prefix" class="el-input__icon el-icon-message"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="demo-input-suffix">
              <el-input placeholder="（选填）如果你也有个人网站的话" v-model="input4">
                <i slot="prefix" class="el-input__icon el-icon-paperclip"></i>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="comment-input" type="flex" justify="center">
          <el-col :span="21">
            <mavon-editor v-model="value" />
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="6" class="send-btn">
            <el-button>
              <i class="el-icon-truck">Send du..dudu...</i>
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import readme from "@/assets/Node.md"; //引入MD文件
export default {
  name: "articleContent",
  data() {
    return {
      bannerShow: false,
      article: {
        l_title: "第一篇博客",
        readCount: "1",
        tag: "技术",
        time: "2020-05-18",
        lable: "这是我的第一篇博客"
      },
      readme: this.md2html(readme) // 在data里边声明
    };
  },
  methods: {},
  mounted() {
    this.bannerShow = true;
     window.scrollTo(0,0);
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
  position: fixed;
  top: 0;
  left: 0;
  filter: blur(5px);
}
.banner-img {
  transition: 0.5s;
}
.banner-img img {
  width: 100% !important;
}

.article-content {
  background: white;
  border-radius: 1rem;
}
.article-title {
  padding: 2rem;
  font-size: 1.5rem;
}
.article-tag {
  padding: 0.5rem;
}
.article-lable {
  margin: 1rem 0 0 1rem;
  display: flex;
  padding-left: 1rem;
  border-left: 0.3rem solid;
}
.article-details {
  text-align: left;
  padding: 2rem;
  min-height: 25rem;
}
.other-article {
  height: 15rem;
  margin-bottom: 2rem;
}
.other-content {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
}
.other-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  cursor: pointer;
}
.other-mask:hover {
  background: rgba(0, 0, 0, 0.3);
}
.other-click {
  position: absolute;
  color: white;
  font-size: 1.2rem;
  font-family: "Courier New", Courier, monospace;
  opacity: 0.8;
}
.prev {
  left: 10%;
  top: 10%;
}
.next {
  right: 10%;
  top: 10%;
}
.other-title {
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  font-size: 1.5rem;
  border: 1px solid;
}
.comment-divider {
  padding: 2rem 0 2rem 0;
}
.el-icon-chat-line-round {
  padding: 2rem;
  font-size: 3rem;
}
.comment-icon {
  padding: 2rem;
  font-size: 1.5rem;
  text-align: left;
}
.comment-input {
  margin: 2rem 0 2rem 0;
}
.send-btn .el-button {
    font-size: 1.2rem;
    margin-bottom: 5rem;
}
.el-icon-watermelon {
    cursor: pointer;
}
.el-icon-watermelon:hover {
    color: #409EFF;
}
</style>