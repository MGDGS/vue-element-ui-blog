# vue-element-ui-blog
基于VUE+Element-ui的个人博客实现
[演示地址](http://106.52.104.235/)

当前更新: 

## 播放控制组件
同样的，先上一下效果图
![歌曲控制组件](https://img-blog.csdnimg.cn/20200523113246667.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDIwMDI4OA==,size_16,color_FFFFFF,t_70#pic_center)
可以看到这里主要分为两个部分，一个是放置歌曲进度条、控制歌曲播放顺序等，一个就是当前播放列表了。

### 1、引入vuex

在这之前，我们先来看看我们的`store`里需要管理的内容。

刚刚已经说过，播放控制组件与歌曲信息组件是需要数据的交互的，如
![组件交互](https://img-blog.csdnimg.cn/20200523121239647.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDIwMDI4OA==,size_16,color_FFFFFF,t_70#pic_center)

所以我们创建一个`store`来对它们需要同步的信息进行管理，我们在项目的src文件夹下新建一个`vuex`文件夹，并在里面新建个`store.js`文件，我们之后就在这个文件里写状态管理的代码了。

 1.  下载vuex ： ```npm install vuex --save```
 2. 在`store.js`里添加下面内容，刚入门的小伙伴可以和我一样使用下面这个模板，这样的格式看起来会比较清晰。

这里推荐一个文章 [Vue.js——十分钟入门Vuex](https://www.jianshu.com/p/a804606ad8e9)

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
}
const getters = {
}
const mutations = {
}
const actions = {
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
```
我们这里主要用到的属性就`state`和`mutations`。

`state`就是Vuex中的公共的状态, 相当于我们组件里的`data`属性，用于保存所有组件的公共数据，下面就来看看我们需要的公共数据
```javascript
const state = {
    playList: [], //播放列表
    playContent: {},   //当前播放的歌曲信息
    current: ""  //当前歌曲的播放进度
}
```

 - 播放列表：在歌曲列表中点击播放或者添加时，就更新播放列表，而播放控制部分的循环模式也是需要通过播放列表来实现的
 - 播放信息：不管是在歌词页面还是播放控制组件上都需要进行展示
 - 播放进度：控制歌词滚动以及播放进度条的更新

接下来我们需要用到`mutaions`属性，它相当于我们组件中的`methods`，当我们在这里可以处理组件提交的事件，然后对state的值进行一个更新修改。
```javascript
const mutations = {
    //获取当前播放歌曲的信息
    setContent(state, payload) {
        state.playContent = payload
        state.playList.indexOf(payload)==-1?state.playList.push(payload):""
    },
    //获取当前播放歌曲的歌词
    setLyric(state, payload) {
        state.playContent.lyric = payload
    },
    //设置当前播放歌曲的进度
    setCurrent(state, payload) {
        state.current =  Math.ceil(payload)
    },
    //从播放列表中移除歌曲
    removeSong(state, payload) {
        let index = state.playList.indexOf(payload)
        state.playList.splice(index, 1)
    },
    //往播放列表中加入歌曲
    addSong(state, payload) {
        let index = state.playList.indexOf(payload)
        state.playList.indexOf(payload)==-1?state.playList.push(payload):""
    }
}
```
到这里，我们对`store`的设置已经结束，下面就回到播放控制组件的实现上
### 2、播放控制
为了能在不同页面下都能够控制歌曲的播放，我将该组件挂载在根组件下，并设置`fixed`定位把它固定在底部，如果担心影响其他内容的浏览，可以给它设置个透明度，用到的时候在通过个`hover`把它显示出来就好了。

（1）data
下面看一下我们组件需要的数据
```javascript
data() {
    return {
      playStatus: false, //播放状态，用来控制播放、暂停按钮的显示
      Timer: "", //定时器，我们需要实时监听到歌曲的播放进度
      currentBar: 0, //进度条长度，默认为0，根据歌曲进度同步更新
      currentText: "00:00", //进度条旁边的播放时间，同样要实时更新
      durationText: "00:00", //当前歌曲的播放时长
      listShow: false,  //控制播放列表的显示
      loopStyle: "list" //not:单曲播放 list:列表循环 single:单曲循环 random:随机循环
    };
  }
  //从store中获取
computed: {
    //当前播放信息
    songContent() {
      return this.$store.state.playContent;
    },
    //播放列表信息
    playList() {
      return this.$store.state.playList;
    }
  }
```
如果直接获取`store`中的数据时，当`state`改变时，组件是不会同步更新的，所以我们需要把他们放到`computed`属性下，这样当数据有变化时，`computed`下的函数会重新执行，从而达到实时更新的效果。

然后我们再用`watch`对播放信息进行一个监听，当他发生改变的时候，说明需要进行一个重新播放功能
```javascript
watch: {
    songContent() {
      this.playSong(this.songContent); //传入当前播放歌曲对象
    }
  }
```
对数据的监听获取部分已经完成，接下来我们开始在`methods`里进行功能函数的实现

 （1） **初始化播放信息**
对播放控件上的信息进行一个初始化渲染
```javascript
    //初始化播放歌曲
    playSong(obj) {
      this.durationText = obj.dt;
      this.playStatus = true;
      this.currentText = "00:00";
      this.currentBar = 0;
      let song_url = "https://api.imjad.cn/cloudmusic/?type=song&id=" + obj.id;
      this.getSong(song_url); //获取歌曲资源
    }
    //获取歌曲资源并播放
    getSong(url) {
      this.$axios
        .get(url)
        .then(
          res => (
            (this.$refs.audio.src = res.data.data[0].url), this.setTimer() //设置定时器
          )
        )
        .catch(function(err) {
          console.log(err);
        });
    }
```
然后我们在`audio`标签里设置`autoplay`，当src改变时就会自动播放

```html
<audio ref="audio" autoplay></audio>
```
 （2） **更新进度条**
 
 开始播放后我们需要设置一个定时器，用以更新进度条
```javascript
    //设置定时器
    setTimer() {
      this.clearTimer(); //先清除上一个定时器
      this.Timer = setInterval(this.updateCurrent, 1000);
    },
    //清除定时器
    clearTimer() {
      clearInterval(this.Timer);
      this.Timer = "";
    }
```
三元表达式用上瘾了...

还是简单解释一下吧

进度条用的是element-ui的`<el-slider>`标签，进度值0-100
```html
<el-slider v-model="currentBar" :show-tooltip="false" @click.native="skipBar"></el-slider>
```

当进度条等于100时，也就是歌曲播放结束时，进行循环方式的判断，然后按照当前循环方式进行相应的歌曲切换。如果歌曲还在播放中，就通过`this.$refs.audio.currentTime`获取播放进度，最后还要更新`store`里的播放进度。
```javascript
    //更新进度条
    updateCurrent() {
      this.currentBar == 100
        ? (this.clearTimer(),this.loopStyle == "not"
          ? this.notLoop()
          : this.loopStyle == "list"
          ? this.listLoop()
          : this.loopStyle == "single"
          ? this.singleLoop()
          : this.randomLoop()
          )
        : (this.currentBar =
            (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100),
        (this.currentText = this.formatTime(this.$refs.audio.currentTime)), //formatTime()是对播放时间进行一个格式化
        this.$store.commit("setCurrent", this.$refs.audio.currentTime);
    }
    //格式化播放时间
    formatTime(string) {
      var m = parseInt(string / 60);
      var s = parseInt(string % 60);
      m >= 10 ? m : (m = "0" + m);
      s >= 10 ? s : (s = "0" + s);
      return m + ":" + s;
    }
```
 （3） **不同的播放方式**
 在播放控制组件内还有个播放暂停功能，播放列表上也会有切换歌曲播放的按钮，这几种播放的前置条件都不完全相同，所以需要有分别对应的函数。
```javascript
    //点击播放
    play() {
      this.$refs.audio.ended  //先判断歌曲是否播放完成了，如果是则重新播放，否则继续
        ? this.playSong(this.songContent)
        : this.$refs.audio.play(),
        this.setTimer();
      this.playStatus = true; //改变播放状态主要是为了隐藏播放按钮
    },
    //点击暂停
    pause() {
      this.playStatus = false;
      this.$refs.audio.pause(), this.clearTimer(); //暂停时需要清除计时器，直到下次播放
    }
    //在列表上点击播放歌曲
    cutSong(obj) {
      obj == this.songContent
        ? this.play()
        : this.$store.commit("setContent", obj);
    }
```
 （4） **切换歌曲**
 
 歌曲的循环方式有单曲播放、列表循环、单曲循环、以及随机播放，所以我们要在歌曲完成后判断是否切换下一首，以及如何切换下一首。
```javascript
    //单曲播放
    notLoop() {
      this.playStatus = false; 
      this.clearTimer();
    },
    //列表循环
    listLoop() {
      let index = this.playList.indexOf(this.songContent); 
      let length = this.playList.length;
      index == length - 1 ? index = 0 : index++; //如果是最后一首，就从头再来 
      this.$store.commit("setContent", this.playList[index]); //更新store
    },
    //单曲循环
    singleLoop() {
      this.play();  //单曲循环可以直接调用我们前面的play()
    },
    //随机播放
    randomLoop() {
      //随机播放有两种实现思路
      //第一种是直接将播放列表打乱，再按打乱后的顺序进行顺序切换
      //第二种是不改动播放列表顺序，通过随机数进行下一首的切换
      //这里使用的是第二种
      let length = this.playList.length;
      let index = this.playList.indexOf(this.songContent);
      let random = parseInt(Math.random() * this.playList.length);
      while(index==random) { //这里主要是进行一个过滤，如果随机到的歌曲还是当前歌曲，则再进行一次随机
        random = parseInt(Math.random() * this.playList.length);
      }
      this.$store.commit("setContent", this.playList[random]);
    }
    //上一首
    prevSong() {
      let index = this.playList.indexOf(this.songContent);
      let length = this.playList.length;
      index == 0 ? index = length-1 : index--;
      this.$store.commit("setContent", this.playList[index]);
    }
    //下一首
    nextSong() {
      //点击下一首时，主要判断当前循环方式是不是随机，如果不是可以直接调用列表循环方式切换
      this.loopStyle=="random"?this.randomLoop():this.listLoop() 
    }
```
最后还有进度条跳转以及将歌曲移除出播放列表功能，但实现方式其实都比较简单了，这里就不再继续了。



# 以下是旧内容


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
