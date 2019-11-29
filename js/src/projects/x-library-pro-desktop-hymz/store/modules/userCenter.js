import * as service from 'services/x-library-pro/implement/hymz'
const PAGESIZE = 10

export default {
  namespaced: true,
  state: () => ({
    name: 'userCenter',
    page: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: null,
    },
    list: [],
    bookRoomList: [],
    privilegeList: [],
  }),
  actions: {
    centerList({ commit, state }, data = {}) {
      //个人中心
      return service.userCenter.centerList({ ...data }).then(res => {
        state.list = res.data.readList
        state.bookRoomList = res.data.bookRoomList
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    readList({ commit, state }, data = {}) {
      //阅读历史
      return service.userCenter.readList({ ...data }).then(res => {
        state.list = res.data
        console.log(res, state.page.total, 'read')
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    bookRoomList({ commit, state }, data = {}) {
      //我的书房
      return service.userCenter.bookRoomList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    annotList({ commit, state }, data = {}) {
      //我的书房
      return service.userCenter.annotList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    recordList({ commit, state }, data = {}) {
      //引用记录
      return service.userCenter.recordList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    assessList({ commit, state }, data = {}) {
      //我的评论
      return service.userCenter.assessList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    vipList({ commit, state }, data = {}) {
      //我的vip
      return service.userCenter.vipList({ ...data }).then(res => {
        state.privilegeList = res.data.privilege
        state.list = res.data.orderList
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
  },
  mutations: {
    setList(state, data) {
      state.list = data
    },
    setPage(
      state,
      data = {
        pageNum: 1,
        pageOffset: PAGESIZE,
        total: null,
      }
    ) {
      state.page = data
    },
    setTotalMsg(state, num) {
      state.totalMessageNum = num
    },
  },
}
