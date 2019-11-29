<script>
import localforage from 'localforage'
import { mapState } from 'vuex'
import { readerService, home } from 'services/x-library-pro/implement/hymz'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as dbiServices from 'services/x-read/dbi'

export default {
  name: 'Reader',
  mounted() {
    this.query = this.$route.query
    this.getAccess()
  },
  data() {
    return {
      access_code: '',
      book_id: '',
      product_id: '',
      copyright: '',
      isNav: true,
      query: {},
      isShowX: false,
      preChapterId: 0,
      curChapterId: 0,
      vipInfo: {},
    }
  },
  methods: {
    async getAccess() {
      await this.$services.user.vipInfo().then(({ data }) => {
        this.vipInfo = data
        if (data.quote_count === -1) {
          readerService.render_reference = null
        }
      })
      await this.$services.book
        .getAccessCode({
          id: this.query.id,
        })
        .then(res => {
          this.access_code = res.data.access_code
          this.book_id = res.data.book_id
          this.product_id = res.data.product_id
          this.copyright = res.data.copyright
        })
      this.init()
    },
    async init() {
      if (!reader3) return
      this.query = this.$route.query
      // let p = { id: this.query.id, type: 3 }
      let start = null
      if (this.query.range) {
        start = JSON.parse(this.query.range).start
      }
      const validUser = true
      let chapterRid
      if (this.query.chapter_root) {
        chapterRid = this.query.chapter_root.split(' ')[1]
      } else {
        chapterRid = this.query.chapterRid
      }

      const watermark = await home.getWatermark()

      reader3.mergeI18n({
        LABEL: () => '批注',
        LABEL_BTN: () => '批注',
        LABEL_ADD: () => '添加批注',
        LABEL_MODIFY: () => '修改批注',
        LABEL_DELETE_CONFIRM: () => '是否删除批注',
      })
      console.warn(readerService)
      let reader = new reader3.Desktop({
        services: {
          ...readerService,
          go_back: () => {
            reader.unmount()
            reader = null
            this.$router.go(-1)
          },
          request_full_screen: () => {
            this.isNav = false
          },
          exit_full_screen: () => {
            this.isNav = true
          },
          show_toast: (message, type) => {
            this.$message({
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
          goXknow: () => {
            // const config = { id: this.$route.query.id }
            // if (this.$route.query.from === 'themeXknow') {
            //   config.clean = this.$route.query.clean
            //   config.from = 'theme'
            // }
            // this.$go('/home/xknow', config)
          },
          do_share: ({ bookId, bookName, chapterRid, chapterName }, app) => {
            if (isWeixin()) {
            } else {
            }
          },
          action_control: (params, app) => {
            const { type, action } = params
            for (const { type, action } of params) {
              if (
                action == 'read' &&
                (type == 'chapter' || type == 'section')
              ) {
                this.$confirm('您还未购买该章节，前往购买？')
                  .then(res => {
                    if (this.$route.query.from !== undefined) {
                      const params = {
                        type: 'Read',
                        id: this.$route.query.id,
                        inType: 'Read',
                      }
                      this.$go('/bookMedia', params)
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
        speakServerUrl: global.restUrl_xunfei,
        labelEnabled: true,
        bookmarkEnabled: true,
        searchEnabled: true,
        // preloadEnabled: true,
        // goBackEnabled: true,
        userEnabled: true,
        defaultBookCategory: 'tuwen',
        defaultPageLayout: 'normal',
        defaultTextLayout: 'lr/static',
        readModeList: [
          {
            title: '无',
            pageLayout: 'normal',
            textLayout: 'lr/static',
            scope: 'desktop',
          },
          { title: '分页', pageLayout: 'normal', textLayout: 'lr/auto' },
          { title: '对页', pageLayout: 'folio', scope: 'desktop' },
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
        product_id: this.product_id,
        user_id: this.$user && this.$user.id,
        release_id: this.query.id,
        id: this.query.id,
        watermark_img: watermark.img,
        watermark_transparency: watermark.transparency,
        ...this.vipInfo,
      }
      setTimeout(() => {
        // 放这里有点不科学
        reader.mount(this.$refs.root, {
          bookId: this.book_id,
          chapterRid: chapterRid || this.query.chapter_id || '',
          chapterId: this.query.chapter_id,
          keyword: this.query.keyword,
          paraIndex: this.query.paraIndex,
          range: JSON.parse(this.query.range || null),
          copyright: this.copyright,
          // chapterId: '8c50ebf580c240ec967a6ebcaf6666001661819',
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
    getUserId() {
      if (sessionStorage.userInfo) {
        const userInfo = JSON.parse(sessionStorage.userInfo)
        return (userInfo && userInfo.id) || ''
      }
      return ''
    },
    getThemeBookDetail() {
      //获取主题的所有内容
      bookinfoServices
        .getThemeBookDetail({ id: this.query })
        .then(res => (this.all = res.data))
    },
    declareOne(id, type, data) {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      // let data = res.data
      eventOpts = {
        event_class: 'PDAMBook',
        event_target: id,
        event_type: type,
        event_source: 'WEB', //默认为WEB
        event_operator: this.$user && this.$user.id,
      }
      addData = {
        data: [
          {
            res_id: data.id,
            res_type: data.type_name,
            res_name: data.books_info.name,
            res_cover: data.books_info.img_src,
            res_exp: data.books_info.abs,
            res_author: data.books_info.author,
            res_lables: data.books_info.tag,
            res_attr: data.books_info.attributes,
            res_money: data.audio_price,
          },
        ],
      }
      dbiServices.declare(eventOpts, addData, cb)
    },
    async getAccessCodes(data) {
      if (this.query.from === 'theme') {
        this.access_code = sessionStorage.getItem('access_code')
      } else {
        return await bookinfoServices.getAccessCode(data).then(res => {
          this.access_code = res.data
        })
      }
    },
    closeNav() {
      this.isNav = false
    },
    openNav() {
      this.isNav = true
    },
    getInfo() {
      return bookinfoServices.info({ id: this.book_id })
    },
    colse() {
      // this.$emit('update:readerDialog', false)
    },
  },
}
</script>

<template lang="pug">
.div.reader-layout
  .content(ref="root")
</template>

<style lang="stylus" scoped>
.reader-layout
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  .content
    height 100%
</style>
