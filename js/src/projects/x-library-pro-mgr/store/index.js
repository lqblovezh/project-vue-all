import Vue from 'vue'
import Vuex from 'vuex'
import mediaBook from './modules/mediaBook'
import mediaTheme from './modules/mediaTheme'
import recommend from './modules/recommend'
import bookCircle from './modules/bookCircle'
import article from './modules/article'
import series from './modules/series'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    mediaBook,
    mediaTheme,
    recommend,
    circle: bookCircle,
		article,
		series,
  },
  state:{
    count:0,
    userInfo: null,
    authority: null,
    // list:'xx'
    xDataVisible:false,
  },
  mutations:{
    updateUser(state,userInfo){
      state.userInfo = userInfo
    },
    updateAuthority(state,authority){
      state.authority = authority
    },
    incrment(state){
      state.count++;
    },
    setList(state) {
      log(state)
      // state.bookCircle.setList(state)
    },
    openXData(state,xDataVisible){
      state.xDataVisible=true
    },
    closeXData(state,xDataVisible){
      state.xDataVisible=false
    }
  }

})
