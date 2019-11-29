export default  {
  state:{
    list: null,
    page: null,
  },
  mutations:{
    setlist(state, data){
      state.list = data
    },
    setPage(state, data){
      state.page = data
    },
  },
  actions:{}, //异步操作state
  getters:{
    getPage: (state) => (type) => {
      log('---------------',type)
      return state.page
    }
  },
}
