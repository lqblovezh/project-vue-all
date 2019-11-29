<script>
import localforage from 'localforage'
import { mapState } from 'vuex'
import { readerService } from 'services/x-library-pro/implement/hymz'
import { book } from 'services/x-library-pro/implement/hymz'

export default {
  name: 'Reader',
  props: {
    params: {},
    readerDialog: {
      //模态框状态
      type: Boolean,
      default: false,
    },
    readerId: {
      //书籍id
      type: String,
      default: '',
    },
    readConfig: {
      type: [Object, Array],
      default: () => {
        return {
          fontSize: {
            list: [
              { title: '小', value: '14px' },
              { title: '中', value: '16px' },
              { title: '大', value: '18px' },
              { title: '特大', value: '20px' },
            ],
            index: 0,
          },
          copyEnabled: true,
          labelEnabled: true,
          fullScreenEnabled: !true,
          bookmarkEnabled: true,
          searchEnabled: true,
          preloadEnabled: true,
          goBackEnabled: true,
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
          ],
        }
      },
    },
  },
  created() {
    console.log(this.$props, 11111)
    this.query = this.params
  },
  async mounted() {
    this.$services.book.getAccessCode({ id: this.readerId }).then(res => {
      this.access_code = res.data.access_code
      this.product_id = res.data.product_id
      this.book_id = res.data.book_id
      this.init()
    })
  },
  data() {
    return {
      access_code: '',
      isNav: true,
      query: {},
      preChapterId: 0,
      curChapterId: 0,
      reader: null,
      product_id: null,
      book_id: null,
    }
  },
  methods: {
    async init() {
      if (!reader3) return
      if (this.query.range) {
        this.params.start = JSON.parse(this.query.range).start
      }
      if (this.query.chapter_root) {
        this.params.chapterRid = this.query.chapter_root.split(' ')[1]
      }
      this.reader = new reader3.Desktop({
        services: {
          ...readerService,
          show_confirm: text => {
            return this.$confirm(text)
              .then(res => {
                return true
              })
              .catch(console.log)
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
                  })
                return false
              }
              return true
            }
          },
        },
        ...this.readConfig,
      })
      this.reader.extraParams = {
        version: 'release',
        content_version: 'release',
        access_code: this.access_code,
        product_id: this.product_id,
        user_id: this.$user && this.$user.id,
        release_id: this.query.id,
        id: this.readerId,
      }
      this.reader.mount(this.$refs.root, {
        bookId: this.book_id,
        chapterRid: this.params && this.params.chapterRid,
        chapterId: this.params && this.params.chapterId,
        range: JSON.parse(this.query.range || null),
      })
    },
    close() {
      this.reader.unmount()
      this.reader = null
      this.$emit('update:readerDialog', false)
    },
    add_label(data) {
      console.log(data, 'read')
    },
  },
}
</script>

<template lang="pug">
.div.reader-layout
  el-dialog.restBody(
    :center="false"
    :visible="readerDialog"
    top="50px"
    width="1000px"
    :before-close="close"
    append-to-body
    title="阅读器"
    )
    .content(ref="root")
    .btns(slot="footer" class="dialog-footer")
      el-button( @click="close" type="info" ) 关闭
</template>

<style lang="stylus" scoped>
.content
  height 70vh
</style>
