import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    playList: [],
    playContent: {},
    current: ""
}
const getters = {
}
const mutations = {
    setContent(state, payload) {
        state.playContent = payload
        state.playList.indexOf(payload)==-1?state.playList.push(payload):""
    },
    setLyric(state, payload) {
        state.playContent.lyric = payload
    },
    setCurrent(state, payload) {
        state.current =  Math.ceil(payload)
    },
    removeSong(state, payload) {
        let index = state.playList.indexOf(payload)
        state.playList.splice(index, 1)
    },
    addSong(state, payload) {
        let index = state.playList.indexOf(payload)
        state.playList.indexOf(payload)==-1?state.playList.push(payload):""
    }
}
const actions = {
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})