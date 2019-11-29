export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setRecommendlist(state, data){
      state.list = data
    },
    setRecommendlistPage(state, data){
      log(data)
      state.page = data
    },
    setRecommendGrouplist(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
