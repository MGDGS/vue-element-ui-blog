// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import showdown from 'showdown'// 引入md文件
import hljs from "highlight.js"
import 'highlight.js/styles/default.css'
// 定义自定义指令 highlight 代码高亮
Vue.directive('highlight',function (el) {
 let blocks = el.querySelectorAll('pre code');
 blocks.forEach((block)=>{
  hljs.highlightBlock(block)
 })
})

//axios全局配置
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(mavonEditor)
// 使用md文件
Vue.prototype.md2html = (md)=> {
  let converter = new showdown.Converter();
  let text = md.toString();
  let html = converter.makeHtml(text);
  return html
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.afterEach((to,from,next) => {

  window.scrollTo(0,0);

})