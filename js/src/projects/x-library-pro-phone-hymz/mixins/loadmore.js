export default {
  data() {
    return {
      list: [],
      page: {
        pageStart: 0,
        pageOffset: 10
      },
      options: {
        pullUpLoad: {
          txt: {
            more: '加载中...',
            noMore: '暂无更多数据'
          },
          visible: true
        }
      },
      loaded: false
    }
  },
  methods: {
    async fetch(flag = false, args = {}) {
      if (flag) {
        this.page.pageStart = 0
        this.list = []
      }
      try {
        const {
          data,
          page
        } = await this.queryList({
          ...this.page,
          ...args
        })
        if (data && data.length) {
          this.list = flag ? data : [...this.list, ...data]
          this.page.pageStart = this.list.length
          if (this.list.length >= page.total) {
            this.loaded = true
          }
        }
      } catch (e) {
        console.warn(e.toString())
      }
    },
    async onPullingUp() {
      if (!this.loaded) {
        // 新数据
        await this.fetch()
      }
      this.$refs.scroll.forceUpdate(true, this.loaded)
    }
  }
}
