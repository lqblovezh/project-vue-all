import { mapState, mapActions, mapMutations } from 'vuex'
import * as service from 'services/x-library-pro/implement/hymz'

export default {
  data() {
    return {
      detailInfo: {},
    }
  },
  filters: {
    formatText(value, num = 10) {
      if (value && value.length > num) {
        return value.substr(0, num) + '...'
      }
      return value
    },
  },
  methods: {
    getList(query) {
      let path = this.$route.path.split('/').pop()
      return this.$store.dispatch(`userCenter/${path}List`, {
        ...this.page,
        ...query,
      })
    },
    goStudy(item) {
      this.$go('/video', { course_id: item.id })
    },
    del(id, type) {
      let path = this.$route.path.split('/').pop()
      this.$confirm('你是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          service.userCenter
            .del({ id, type: type || path })
            .then(res => {
              if (res && res.status) {
                this.getList()
                this.$message.success('删除成功!')
              }
            })
            .catch(({ payload, message }) => {
              this.$message.error(payload.message || message)
            })
        })
        .catch(err => {
          //console.log(err)
        })
    },
    pageChangeHandler(pageNum) {
      this.$go(this.$route.path, {
        ...this.$route.query,
        pageNum,
      })
    },
    ...mapMutations('userCenter', ['setList', 'setPage']),
  },
  computed: {
    ...mapState({
      tableData: state => state.userCenter.list,
      privilegeList: state => state.userCenter.privilegeList,
      bookRoomList: state => state.userCenter.bookRoomList,
      page: state => state.userCenter.page,
    }),
  },
  mounted() {
    this.setList([])
    this.setPage()
    this.getList({ ...this.$route.query })
      .then(res => {})
      .catch(err => {
        if (err.message == '没有登录或登录超时') {
          this.$message.warning('没有登录或登录超时')
          this.$resetUserInfo()
          // this.$go('/home')
        }
      })
  },
  beforeRouteUpdate(to, from, next) {
    this.getList(to.query)
    next()
  },
}
