export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setArtList(state, data){
      state.list = data
    },
    setArtListPage(state, data){
      state.page = data
    },
    setArtGroupList(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
