<script>
import * as readerService from 'services/common/reader'
import { addAnchor } from 'services/x-publish/nowledges'

export default {
  props: {
    readerDialog: {
      //模态框状态
      type: Boolean,
      default: false,
    },
    title: {
      //模态框标题
      type: String,
      default: '阅读器',
    },
    readerId: {
      //书籍id
      type: String,
      default: '',
    },
    currId: {
      //知识点id
      type: String,
      default: '',
    },
    version: {
      //后台版本
      type: String,
      default: 'production',
    },
    markBtn: {
      //锚点功能
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      const services = {}
      services.do_mark = this.do_mark
      services.get_chapter = this.get_chapter
      services.get_book = this.get_book
      var reader = new Reader3({
        imagePath: 'http://xcloud.kf.gli.cn/pc/', // 内网
        markBtnText: this.markBtn,
        copyEnabled: true,
        services,
        params: {
          bookId: this.readerId,
        },
      })
      reader.mount(document.getElementById('readerIframe'), function() {
        // reader.unmount()
      })
    })
  },
  methods: {
    colse() {
      this.$emit('update:readerDialog', false)
    },
    do_mark({
      // 阅读器选择之后的回调
      bookId,
      rangeJSON,
      selectedText,
      chapterRid,
      chapterName = '',
    }) {
      addAnchor({
        //添加锚点
        name: [chapterName],
        range: rangeJSON,
        point: selectedText,
        n_id: this.currId,
        b_id: [chapterRid],
        c_id: [bookId],
        type: '内容锚点',
      })
        .then(res => {
          this.$emit('addAnchorSuccess')
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    async get_chapter({ bookId, chapterRid }) {
      return await readerService.get_chapter({
        bookId,
        chapterRid,
        version: this.version,
      })
    },
    async get_book({ bookId }) {
      return await readerService.get_book({ bookId, version: this.version })
    },
  },
}
</script>

<template lang="pug">
  div
    el-dialog(
      :center="false"
      :visible="readerDialog"
      top="50px"
      width="1000px"
      :show-close="false"
      append-to-body
      )
      .header(slot="title")
        <i class="el-icon-close" @click="colse"></i>
        el-tabs(value="reader")
          el-tab-pane(:label="title" name="reader")
      .content(ref="readerIframe")
        #readerIframe(style="height:500px")
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="colse" type="info" ) 关闭
</template>


<style lang="stylus" scoped>
.btns
  text-align right
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.content
  iframe
    width 100%
</style>


