<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/system'
import Ueditor from 'projects/x-publish-mgr/components/1-contentLibrary/question/Ueditor'

export default {
  mixins: [main],
  components: { Ueditor },
  data() {
    return {
      service,
      isShowUeditor: false,
    }
  },
  computed: {
    isCurrentProject() {
      return __SUFFIX__ == 'hymz'
    },
  },
  methods: {
    getList() {
      service.getList().then(res => {
        this.detailInfo = res.data
        this.isShowUeditor = true
        console.log(this.detailInfo)
      })
    },
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>


<template lang="pug">
Template(ref="child")
  span(slot="title") 基本设置
  .setting(slot="list")
    VaForm
      form#pustSetForm
        el-timeline
          el-timeline-item(timestamp="基本信息" placement="top")
            el-card
              .group
                .label.must 平台名称：
                input.form-control(v-va="{ type:'required' }" max="20" v-model="detailInfo.name")
              .group
                .label.must logo：
                .right
                  el-button(type="primary" size="small" @click="$refs.updateImg.click()") 选择上传文件
                  input.hide(type="file" @change="previewImg($event,50)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
                  span.tip 只能上传jpg/png格式文件，文件不能超过50kb
                  img.img(:src="detailInfo.img_src" alt="logo")
              .group
                .label.must 书籍评价是否需要审核：
                .div
                  el-radio(v-model="detailInfo.radio" label="1") 是
                  el-radio(v-model="detailInfo.radio" label="2") 否
              .group
                .label.must 正常订单超过：
                .div
                  el-input-number(v-model="detailInfo.order_timeout" controls-position="right" @change="handleChange" :min="1")
                  span 分未付款，订单自动关闭
          el-timeline-item(timestamp="APP二维码" placement="top" v-if="isCurrentProject")
            el-card
              .group
                .label.must 二维码：
                .right
                  el-button(type="primary" size="small" @click="$refs.codeUpdateImg.click()") 选择上传文件
                  input.hide(type="file" @change="previewImg($event,50,'code')" ref="codeUpdateImg" accept="image/jpeg,image/jpg,image/png")
                  span.tip 只能上传jpg/png格式文件，文件不能超过50kb
                  img.img(:src="detailInfo.code_src" alt="二维码")
          el-timeline-item(timestamp="用户协议" placement="top")
            el-card(v-if="isShowUeditor")
              Ueditor(:isImage="true" id="agreement" :item="detailInfo" name='agreement' @uechange="uechange" :frameHeight='300' :frameWidth='700')
        .btns
          el-button.save(type="primary" size="small" @click="save") 保存
</template>

<style lang="stylus" scoped>
.setting
  .btns
    text-align center
  .group
    display flex
    .el-radio
      line-height inherit
    .save
      margin-left 70px
    .label
      min-width 200px
    .right
      display flex
      flex-direction column
      .tip
        color #999999
      .img
        width 150px
        height 150px
        object-fit contain
    .form-control
      max-width 200px
</style>
