<script>
import releaseDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/release/detail'
import audioDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/audio/detail'
import themeDetail from 'projects/x-publish-mgr/components/4-myDistributed/detail'
import videoDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/video/detail'
import courseDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/course/detail'
import resourceDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/resource/detail'
import seriesDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/series/detail'
import articlesDetail from 'projects/x-publish-mgr/components/1-contentLibrary/database/detail'
import resourDetail from 'projects/x-publish-mgr/components/3-digitalProductLibrary/qrcode/detail'

export default {
  components: {
    releaseDetail,
    audioDetail,
    themeDetail,
    videoDetail,
    courseDetail,
    resourceDetail,
    seriesDetail,
    articlesDetail,
    resourDetail,
  },
  props: {
    detailVisible: Boolean,
    defaultData: Object,
    detailValue: String,
    detailType: [String, Number],
    type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      detailDialoaType: 'info',
    }
  },
  created() {
    log(this.type)
    if (this.type != 1 && this.detailValue == 'metadata') {
      this.detailDialoaType = 'info'
    } else {
      this.detailDialoaType = this.detailValue
    }
  },
  computed: {
    currComp() {
      console.log(this.type, 1111)
      switch (this.type) {
        case 1:
          return 'themeDetail'
          break
        case 5:
          return 'videoDetail'
          break
        case 4:
          return 'releaseDetail'
          break
        case 7:
        case 9:
          return 'courseDetail'
          break
        case 8:
          return 'resourceDetail'
          break
        case 3:
        case 6:
          return 'audioDetail'
          break
        case 10:
          return 'seriesDetail'
          break
        case 11:
          return 'articlesDetail'
          break
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
          return 'resourDetail'
          break
        default:
          break
      }
    },
  },
  methods: {
    colse() {
      this.$emit('update:detailVisible', false)
    },
  },
  mounted() {},
}
</script>

<template lang="pug">
.readOnlyDetail
  el-dialog(
    width="1000px"
    :visible.sync="detailVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="50px"
    :show-close="false"
  )
    .header(slot="title")
      div(class="el-icon-close" @click="colse")
      component(
        :is="currComp"
        :type="detailDialoaType"
        :defaultData="defaultData"
        :readOnly="true"
        :detailType="detailType"
        :media="type==6?1:2"
      )
    div(slot="footer" class="dialog-footer")
      el-button(type="info" @click="colse" ) 取消
</template>


<style lang="stylus" scoped>
.readOnlyDetail >>> .el-dialog__body
  padding 0
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
</style>
