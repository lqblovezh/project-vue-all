<script>
import localforage from 'localforage'
import { readerService, home } from 'services/x-library-pro/implement/hymz'
import { mapState } from 'vuex'
import { isIos } from '@/common/js/base'

export default {
  name: 'Reader',
  mounted() {
    this.query = this.$route.query
    this.getAccess()
    // localforage.getItem('access_code').then(res => {
    //   this.access_code = res
    //   this.init()
    // })
  },
  data() {
    return {
      access_code: '',
      isNav: true,
      query: {},
      isShowX: false,
      infoData: null,
      preChapterId: 0,
      curChapterId: 0,
      vipInfo: {},
    }
  },
  computed: {
    ...mapState({
      // info: state => state.bookinfo.info,
    }),
    rootClass() {
      return `${isIos() ? 'root--ios' : ''}`
    },
  },
  methods: {
    async getAccess() {
      await this.$services.user.vipInfo().then(({ data }) => {
        this.vipInfo = data
        if (data.quote_count === -1) {
          readerService.render_reference = null
        }
      })
      localforage.getItem('access_code').then(res => {
        this.access_code = res
        this.init()
      })
    },
    getInfo() {
      return bookinfoServices.info(this.query)
    },
    getUserId() {
      if (sessionStorage.userInfo) {
        const userInfo = JSON.parse(sessionStorage.userInfo)
        return (userInfo && userInfo.id) || ''
      }
      return ''
    },
    async getAccessCodes(data) {
      return await bookinfoServices.getAccessCode(data).then(res => {
        this.access_code = res.data
      })
    },
    closeNav() {
      this.isNav = false
    },
    openNav() {
      this.isNav = true
    },
    async init() {
      if (!reader3) return
      // this.declareOne(this.info.id, '阅读', this.info)
      let p = { id: this.query.id, type: 3 }
      // await this.getAccessCodes(p) // 3表示书籍的code
      let start = null
      if (this.query.range) {
        start = JSON.parse(this.query.range).start
      }

      // const validUser = !!this.getUserId()
      let chapterRid
      if (this.query.chapter_root) {
        chapterRid = this.query.chapter_root.split(' ')[1]
      } else {
        chapterRid = null
      }

      const watermark = await home.getWatermark()

      // let res = await this.getInfo()
      let reader = new reader3.Mobile({
        // restUrl: '/reader_api',
        restUrl: 'http://xcloud.kf.gli.cn/publish/reader',
        imagePath: '/res', // 内网
        //speakServerUrl: 'http://119.253.45.249:18080/textspeack',
        services: {
          ...readerService,
          go_back: () => {
            reader.unmount()
            reader = null
            this.$back()
          },
          request_full_screen: () => {
            this.isNav = false
          },
          exit_full_screen: () => {
            this.isNav = true
          },
          show_toast: (message, type) => {
            this.$Toast({
              message,
              type,
            })
          },
          show_confirm: text => {
            return this.$confirm(text)
              .then(res => {
                return true
              })
              .catch(console.log)
          },
          do_share: ({ bookId, bookName, chapterRid, chapterName }, app) => {
            // if (isWeixin()) {
            // } else {
            // }
          },
          action_control: (params, app) => {
            const { type, action } = params
            for (const { type, action } of params) {
              if (
                action == 'read' &&
                (type == 'chapter' || type == 'section')
              ) {
                this.$MessageBox
                  .confirm('您还未购买该章节，前往购买？')
                  .then(res => {
                    if (this.$route.query.from !== undefined) {
                      const params = {
                        type: 'Read',
                        id: this.$route.query.id,
                        inType: 'Read',
                      }
                      this.$go('-1')
                    }
                    this.$router.go(-1)
                  })
                  .catch(() => {
                    if (this.$route.query.from !== undefined) {
                      this.$router.go(-1)
                    }
                    // const toPath = decodeURIComponent(this.$route.fullPath)
                    // const finalPath = toPath.replace(new RegExp('\\b' + this.curChapterId + '\\b', 'g'), this.preChapterId)
                    // this.$router.replace(finalPath)
                  })
                return false
              }
              return true
            }
          },
        },
        fontSize: {
          list: [
            { title: '小', value: '14px' },
            { title: '中', value: '16px' },
            { title: '大', value: '18px' },
            { title: '特大', value: '20px' },
          ],
          index: 0,
        },
        contrastTextEnabled: this.vipInfo.language_contrast, // 多语言对照开关
        contrastImageEnabled: this.vipInfo.picture_text_contrast, // 图文对照开关
        copyEnabled: this.vipInfo.copy_count !== -1, // 复制开关
        readableChapterMax: this.vipInfo.read_chapter_count, // 可读章节限制，0 表示不限制
        labelEnabled: true,
        fullScreenEnabled: !true,
        bookmarkEnabled: true,
        searchEnabled: true,
        preloadEnabled: true,
        goBackEnabled: true,
        userEnabled: true,
        toolBarActions: [
          // this.isShowX && { title: 'X一下', className: 'xBtn', service: 'goXknow', active: false },
        ].filter(item => item),
        defaultBookCategory: 'tuwen',
        defaultPageLayout: 'normal',
        defaultTextLayout: 'lr/static',
        readModeList: [
          {
            title: '无',
            pageLayout: 'slide',
            textLayout: 'lr/static',
            scope: 'mobile',
          },
          { title: '分页', pageLayout: 'normal', textLayout: 'lr/auto' },
          {
            title: '平滑',
            pageLayout: 'slide',
            textLayout: 'lr/auto',
            scope: 'mobile',
          },
        ].concat(
          this.vipInfo.double_screen_read
            ? [{ title: '对照', pageLayout: 'contrast', scope: 'desktop' }]
            : []
        ), //双屏
        watermarkUrl: watermark.img_src,
        watermarkRepeat: watermark.density > 1,
        watermarkOpacity: watermark.transparency,
      })

      reader.extraParams = {
        version: 'release',
        content_version: 'release',
        access_code: this.access_code,
        product_id: this.query.product_id,
        user_id: this.getUserId(),
        release_id: this.query.id,
        id: this.query.id,
        watermark_img: watermark.img,
        watermark_transparency: watermark.transparency,
        ...this.vipInfo,
      }
      setTimeout(() => {
        // 放这里有点不科学
        reader.mount(this.$refs.root, {
          bookId: this.query.book_id,
          chapterRid: chapterRid || this.query.chapter_id,
          chapterId: this.query.chapter_id,
          // range: JSON.parse(this.query.range || null),
        })

        reader.emitter.on('updateURL', arg => {
          if (typeof arg.chapterRid == undefined) {
            return
          }
          const toPath = decodeURIComponent(this.$route.fullPath)
          let finalPath, chapterId
          if (this.$route.query.chapter_id === undefined) {
            chapterId = arg.chapterRid
            finalPath = toPath.replace('index=root', `index=root ${chapterId}`)
            finalPath = `${finalPath}&chapter_id=${chapterId}`
          } else {
            chapterId = this.$route.query.chapter_id
            finalPath = toPath.replace(
              new RegExp('\\b' + chapterId + '\\b', 'g'),
              arg.chapterRid
            )
          }
          this.preChapterId = chapterId
          this.curChapterId = arg.chapterRid
          this.$router.replace(finalPath)
        })

        reader.emitter.on('copy', data => {
          this.$services.user
            .copyAdd(data)
            .then(res => {
              console.log('复制成功')
            })
            .catch(err => {
              console.log('复制失败')
            })
        })

        reader.emitter.on('reference', data => {
          this.$services.user
            .quoteAdd(data)
            .then(res => {
              console.log('引用成功')
            })
            .catch(err => {
              console.log('引用失败')
            })
        })
      }, 30)
    },
  },
}
</script>

<template lang="pug">
.div
  //- Head(:name="info.name" v-show="false" )
  .root(ref="root" :class="rootClass")
</template>

<style lang="stylus" scoped>
.root
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  width 100%
  user-select none
  &.root--ios
    top 0.6rem
</style>
