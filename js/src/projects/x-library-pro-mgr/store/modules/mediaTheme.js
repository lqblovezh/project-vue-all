export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setMediaThemelist(state, data){
      state.list = data
    },
    setMediaThemelistPage(state, data){
      state.page = data
    },
    setMediaThemeGrouplist(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
