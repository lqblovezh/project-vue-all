<script>
import * as service from 'services/x-library-pro/implement/mgr/copyright'
import { main } from '@/util/mixins'
export default {
  mixins: [main],
  data() {
    return {
      service,
    }
  },
  methods: {
    getList(obj) {
      if (this.service) {
        this.service.getList().then(res => {
          this.detailInfo = res.data
        })
      }
    },
  },
}
</script>


<template lang="pug">
Template(ref="child")
  span(slot="title") 版权管理
  .copyright(slot="list")
    VaForm
      form#pustSetForm
        .group
          .label.must 水印图片：
          .right
            el-button(type="primary" size="small" @click="$refs.updateImg.click()") 选择上传文件
            input.hide(type="file" @change="previewImg($event,4096,null,'png')" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
            span.tip 只能上传png格式文件，文件不能超过4M
            img.img(:src="detailInfo.img_src" alt="水印图")
        //- .group
        //-   .label.must 水印密度：
        //-   el-input-number(v-model="detailInfo.density" :min="0")
        .group
          .label.must 水印透明度：
          el-input-number(v-model="detailInfo.opcity" :precision="2" :step="0.1" :min="0" :max="1")
        .group
          .label.must 用户阅读时单次可复制字数：
          el-input-number(v-model="detailInfo.number" :min="0")
        .group
          .label
          el-button.save(type="primary" size="small" @click="save") 保存
</template>

<style lang="stylus" scoped>
.copyright
  .group
    display flex
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
        width 250px
        height 250px
        object-fit contain
        background-color #ddd
    .form-control
      max-width 200px
</style>
