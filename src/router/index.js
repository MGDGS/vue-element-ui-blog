import Vue from 'vue'
import Router from 'vue-router'
import IndexComponent from '@/components/IndexComponent'
import ArticleComponent from '@/components/ArticleComponent'
import MusicComponent from '@/components/MusicComponent'
import BoardComponent from '@/components/BoardComponent'
import AlbumComponent from '@/components/AlbumComponent'
import MyInformation from '@/components/MyInformation'
import ArticleContent from '@/components/ArticleContent'
import MusicContent from '@/components/MusicContent'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: IndexComponent
    },
    {
      path: '/IndexComponent',
      name: 'index',
      component: IndexComponent
    },
    {
      path : '/ArticleComponent',
      name : 'article',
      component: ArticleComponent
    },
    {
      path : '/MusicComponent',
      name : 'music',
      component: MusicComponent
    },
    {
      path : '/BoardComponent',
      name : 'board',
      component: BoardComponent
    },
    {
      path : '/AlbumComponent',
      name : 'Album',
      component: AlbumComponent
    },
    {
      path : '/MyInformation',
      name : 'myinformation',
      component : MyInformation
    },
    {
      path : '/ArticleContent',
      name : 'articlecontent',
      component: ArticleContent
    },
    {
      path : '/MusicContent',
      name : 'musiccontent',
      component: MusicContent
    }
  ]
})
