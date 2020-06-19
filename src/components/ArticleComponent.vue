<template>
  <div class="template">
    <el-row type="flex" justify="center">
      <el-col :span="15" class="section">
        <el-row>
          <el-carousel height="20rem">
            <el-carousel-item v-for="item in 4" :key="item">
              <img src="@/assets/ArticleCover/rainbow.jpg" />
            </el-carousel-item>
          </el-carousel>
        </el-row>
        <el-row class="content">
          <el-col class="mood">
            <i class="el-icon-sunny">&nbsp;&nbsp;&nbsp;&nbsp;今天心情不错</i>
          </el-col>
        </el-row>
        <el-row class="content article-content" justify="center" align="center">
          <el-col :span="10" class="cover">
            <img src="@/assets/ArticleCover/rainbow.jpg" />
          </el-col>
          <el-col :span="14" class="article-describe">
            <el-row class="article-title">文章名称</el-row>
            <el-row class="article-label">一堆文字描述</el-row>
            <el-row class="article-others" type="flex">
              <el-col :span="9">
                <i class="el-icon-time" style="color:#606266">2020-05-28</i>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-view" style="color:#409EFF">152</i>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-chat-line-square" style="color:#F56C6C">165</i>
              </el-col>
              <el-col :span="5">
                <i class="el-icon-collection-tag">技术</i>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5" class="aside">
        <el-row class="search" type="flex" justify="center">
          <el-col :span="23">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="aside-content" type="flex" justify="center">
          <el-col :span="23">
            <el-row class="title">
              <i class="el-icon-folder">&nbsp;&nbsp;文章分类</i>
            </el-row>
            <el-row class="category" type="flex">
              <el-col :span="18" class="category-name">技术笔记</el-col>
              <el-col :span="6" class="category-count">
                <el-tag size="small">10</el-tag>
              </el-col>
            </el-row>
             <el-row class="category" type="flex">
              <el-col :span="18" class="category-name">杂</el-col>
              <el-col :span="6" class="category-count">
                <el-tag size="small">10</el-tag>
              </el-col>
            </el-row>
             <el-row class="category" type="flex">
              <el-col :span="18" class="category-name">诗词鉴赏</el-col>
              <el-col :span="6" class="category-count">
                <el-tag size="small">10</el-tag>
              </el-col>
            </el-row> <el-row class="category" type="flex">
              <el-col :span="18" class="category-name">原创</el-col>
              <el-col :span="6" class="category-count">
                <el-tag size="small">10</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="aside-content" type="flex" justify="center">
          <el-col :span="23">
            <el-row class="title">
              <i class="el-icon-collection-tag">&nbsp;&nbsp;标签</i>
            </el-row>
            <el-row type="flex" class="tag-container">
              <el-button type="primary" plain>JavaScript</el-button>
              <el-button type="warning" plain>Vue</el-button>
              <el-button type="success" plain>CSS</el-button>
              <el-button type="info" plain>笔试题</el-button>
              <el-button type="warning" plain>诗歌</el-button>
              <el-button type="danger" plain>古诗词鉴赏</el-button>
              <el-button type="info" plain>生活</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="aside-content" type="flex" justify="center">
          <el-col :span="23">
            <el-row class="title">
              <i class="el-icon-s-data">&nbsp;&nbsp;热门文章</i>
            </el-row>
            <el-row class="hot-article" type="flex" justify="center" v-for="item in 9" :key="item">
              <el-tag size="mini" type="danger">{{item}}</el-tag>
              <el-col class="article-name">排名第一的文章</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "articleComponent",
  data() {
    return {
      bannerShow: false
    };
  },
  methods: {
    gotoArticlecontent() {
      this.$router.push("/Articlecontent");
    },
    test() {
      this.$axios
        .get("http://localhost:3000")
        .then()
        .catch();
    }
  },
  mounted() {
    this.bannerShow = true;
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
img {
  width: 100%;
}
.template {
  width: 100%;
  background: #f2f2f2;
}
.section,
.aside {
  min-height: 500px;
  margin: 6rem 0.5rem;
}

.section .el-row,
.aside .el-row {
  background: white;
}

.content {
  margin-top: 0.5rem;
  position: relative;
}
.el-carousel-item {
  overflow: hidden;
}
.mood {
  padding: 1rem;
  color: blue;
}
.cover {
  display: flex;
  padding: 0.2rem;
}

.article-content {
  transition: .3s;
}
.article-content:hover {
  box-shadow: 0 0 .5rem rgb(150, 150, 150);
}
.article-describe {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-title,
.article-label,
.article-others {
  text-align: left;
  font-size: 1rem;
  padding: 1rem;
}
.article-title {
  font-size: 1.8rem;
  font-family: "KaiTi";
}
.article-label {
  font-size: 1rem;
  flex: 1;
}

.search {
  padding: 0.5rem;
}
.aside-content {
  margin-top: 0.5rem;
  padding-bottom: 1rem;
}
.title {
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid rgb(200, 200, 200);
}
.category {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid rgb(240, 240, 240);
}
.category:hover {
  color: white;
  background: #409eee;
}
.category-name {
  text-align: left;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
}
.tag-container .el-button:first-child {
  margin-left: 0.6rem;
}
.tag-container .el-button {
  margin-top: 0.5rem;
}
.hot-article {
  padding: 0.3rem 0.5rem;
  cursor: pointer;
}
.hot-article:hover {
  background: #f56c6c;
  color: white;
}
.article-name {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}
.el-icon-s-data {
  color: #f56c6c;
}
.el-icon-collection-tag {
  color: #e6a23c;
}
.el-icon-folder {
  color: #409eee;
}
</style>