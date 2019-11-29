export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setMediaBooklist(state, data){
      state.list = data
    },
    setMediaBooklistPage(state, data){
      state.page = data
    },
    setMediaBookGrouplist(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
