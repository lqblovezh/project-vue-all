export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setSerieslist(state, data){
      state.list = data
    },
    setSerieslistPage(state, data){
      state.page = data
    },
    setSeriesGrouplist(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
