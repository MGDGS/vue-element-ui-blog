# vue-element-ui-blog
基于VUE+Element-ui的个人博客实现

当前更新: 

## VUE获取网易云音乐接口，并实现歌词滚动效果
最近在捣腾个人博客，加了个播放音乐的模块，所以在这里记录一下歌曲播放歌词实时滚动效果的实现，顺便总结加深一下对各个知识点的理解。

先放一下效果图吧
![效果图](https://img-blog.csdnimg.cn/20200521162619475.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDIwMDI4OA==,size_16,color_FFFFFF,t_70#pic_center)
这里主要有两个组件：**歌曲信息组件**和**歌曲控制组件**，歌曲控制组件还没有完善，这里主要记录一下歌曲信息组件的实现
## 歌曲信息组件
这一部分主要是歌曲列表和当前歌曲信息
### 1、歌曲列表实现
在这之前，关于网易云音乐接口的使用可以看[网易云音乐API文档](https://api.imjad.cn/cloudmusic.md)

思路：

 1. 获取歌曲数据
 2. 处理歌曲数据
 3. 渲染到视图上

（1）在实例创建完成，也就是在**created钩子函数**这个时期，我们能够访问到data，computed，methods上的方法和数据了，那我们就可以向接口发送请求了
```javascript
created() {
    //通过getSong()获取对应歌曲信息
    this.getSong(this.$route.query.name); //在这之前，我是通过路由进入的该组件，所以会传递一个name歌手名字作为参数
};
```
（2）接下来编写getSong()，通过axios获取数据，我们可以先打印出来看看
```javascript
    getSong(name) {
      let url =
        "https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=" +
        name +
        "&offset=1&limit=10"; //这里以第一页的十条数据为例
      this.$axios
        .get(url)
        .then(res => console.log(res.data))
        .catch();
    }
```
（3）打开控制台，很明显获取到的并不是我们最终想要的结果，所以接下来就需要在众多数据中提取出我们想要的信息。

一般歌曲列表需要的数据不外乎这几样

 - 歌曲id
 - 歌曲名字
 - 歌手名字
 - 歌曲时长

我们随便点开一条去找，至于怎么找...就是一个个找，比如里面有个name属性，那么大概就是歌名了，接口文档里歌手对应的type是artist，那我们就找这个属性，如果没有的话那么大概率就是该单词缩写，所以我们点进去ar属性找到了我们想要的。

在这一步我们也能感受到在打代码的过程中，参数语义化的重要性了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521205936764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDIwMDI4OA==,size_16,color_FFFFFF,t_70#pic_center)
（4）最后定位到我们想要的数据，我们用formatSongs()这个方法来进行整理
```javascript
    //提取歌曲信息，arr为接口返回的初始数据
    formatSongs(arr) {
      let n = arr.length;
      for (let i = 0; i < n; i++) {
        let obj = {}; //我们将每首歌的信息以对象的方式存储
        obj.id = arr[i].id;
        obj.song = arr[i].name;
        obj.singer = arr[i].ar[0].name;
        obj.dt = this.formatDt(arr[i].dt); //由于返回的歌曲时长单位是ms，我们还要将其转换成00：00的格式
        this.songList.push(obj); //最后将这个歌曲对象存储到组件的songList歌曲列表属性上，最后用个v-for就可以在视图上呈现出来了
      }
    }
    //格式化播放时长
    formatDt(time) {
      let dt = time / 1000;
      let m = parseInt(dt / 60);
      let s = parseInt(dt % 60); //这里用Math.ceil取整会更严谨些
      m >= 10 ? m : (m = "0" + m);
      s >= 10 ? s : (s = "0" + s);
      return m + ":" + s;
    }
```
歌曲列表的实现比较简单，标签样式就不放了

### 2、获取当前播放歌曲的信息
思路：

 1. 获取歌曲信息（主要是歌词）
 2. 处理歌曲数据（主要是对歌词格式进行处理）
 3. 实现歌词滚动效果

（1）获取歌词信息
直接上代码
```javascript
//获取歌词信息，id为歌曲id
    getLyric(id) {
      let url = "https://api.imjad.cn/cloudmusic/?type=lyric&id=" + id; //获取歌词信息要设置type=lyric，详情看接口文档
      this.$axios
        .get(url)
        .then(res => ((this.lyric = []), this.formatLyric(res.data.lrc.lyric))) 
        .catch();//同样的，我们先要在接口返回的数据中提取出我们需要的那部分，并用一个formatLyric方法来对它进行格式化
    }
```

（2）在对歌词格式化之前，我们先来随便播放一首歌，看原本的歌词文本是怎样的

![歌词文本](https://img-blog.csdnimg.cn/20200521215300902.png#pic_center)
看起来还不错，有一定规律，还帮我们换好行了。
我们需要做的是将时间和文本部分分离开来...一切都在掌握之中，直到我就发现了这个...
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521223805929.png#pic_center)
ok，fine！原来还有这种写法，不同时间的重复歌词还能写在一起，确实这样的写法简洁了很多，然而我们需要处理的东西也变多了...
好了直接上代码

（3）处理歌词文本
```javascript
//传入初始歌词文本text
formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach(element => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
      this.$store.commit("setLyric", this.lyric); //把歌词提交到store里，为了重新进入该组件时还能再次渲染
    },
    sortRule(a, b) { //设置一下排序规则
      return a.time - b.time;
    }
```
（4）格式化完成后我们同样是通过一个v-for把歌词渲染到视图上，接下来我们要做的就是让这个歌词随着播放进度滚动起来。
主要有如下思路：

 - 设置定时器，监听播放进度
 - 改变元素位置让歌词滚动到当前进度
 - 改变当前歌词字体大小（高亮），突出显示

我们先看一下歌词元素的放置，这里主要分为三个部分：红色框为歌词放置的位置，我们设置个position: relative;不用去管它，蓝色框才是我们需要移动的部位，通过设置aabsolute绝对定位，在歌曲进度更新时我们改变它的top值就可以实现向上滚动的效果了，而且只要在给红色框加个overflow: hidden;就能把超出的部分隐藏，最终得到上面第一张图的效果。
![歌词位置](https://img-blog.csdnimg.cn/20200521232348925.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDIwMDI4OA==,size_16,color_FFFFFF,t_70#pic_center)
我们用watch来监听歌曲进度的变化，也就是当前播放时间
```javascript
watch: {
    lyricCurrent() {
      this.lyric.forEach((element, index) => {
        if (this.lyricCurrent == element.time) {
          this.lyricMove.top = -index * 2.5 + 6 + "rem";
          this.currentRow = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
        }
      });
    }
  }
```
```html
<el-row type="flex" justify="center" class="lyric-contain">
          <el-col :span="23" class="song-lyric" :style="lyricMove">
          <!-- 这里用内联样式来实现当前歌词的高亮显示 -->
            <el-row
              v-for="(item,index) in lyric"
              :key="index"
              :style="{'font-size': (index==currentRow ? '1.3rem':'.9rem')}"
              class="lyric-row"
            >{{item.text}}</el-row>
          </el-col>
        </el-row>
```
