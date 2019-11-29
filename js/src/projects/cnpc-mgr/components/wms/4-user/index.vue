<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/system'

export default {
  mixins: [main],
  data() {
    return {
      service,
      currentItem: null,
    }
  },
  created() {},
  methods: {
    getList() {
      service.getVipList().then(res => {
        this.detailInfo = res.data
      })
    },
    save() {
      service.saveVip(this.detailInfo).then(
        res => {
          if (res.status) {
            this.$message.success('保存成功')
            this.getList(this.query)
            if (this.$refs.child) {
              this.$refs.child.dialogVisible = false
            }
          } else {
            this.$message.error(res.message || '保存失败')
          }
        },
        err => {
          this.$message.error(err.payload.message)
        }
      )
    },
    choiseFile(item) {
      this.currentItem = item
      this.$refs.updateImg.click()
    },
    async previewImg(e, size, type) {
      let node = e.target
      let file = node.files[0]
      this.$refs.updateImg.setAttribute('type', 'text')
      this.$refs.updateImg.setAttribute('type', 'file')
      if (file && type) {
        const types = type.split('/')
        if (!types.includes(file.type.split('/')[1])) {
          return this.$message.error(`只能上传${type}格式`)
        }
      }
      if (size) {
        let files = this.$isFileBig(file, size)
        if (!files) return
      }
      const { url, path } = await this.$globalUpdateFile(file, size)
      this.$set(this.currentItem, 'img', path)
      this.$set(this.currentItem, 'img_src', url)
    },
  },
}
</script>


<template lang="pug">
Template(ref="child")
  span(slot="title") 会员相关设置
  .setting(slot="list")
    .group(v-for="item,index in detailInfo" :key="item.name")
      .label.must(v-if="item.key!='privilege'") 标识{{index+1}}：
      .right(v-if="item.key!='privilege'")
        .top
          el-input(type="textarea" v-model="item.name" placeholder="特权名称" style="width:200px;")
          span.tip 只能上传jpg/png格式图片，文件大小不能超过4MB
          .btn
            el-button(type="primary" size="small" @click="choiseFile(item)") 选择上传文件
          img.img(:src="item.img_src" alt="logo")
        .abs
          el-input(type="textarea"  v-model="item.abs" placeholder="特权介绍")
      .label.must(v-if="item.key=='privilege'") 特权对比图：
      .right(v-if="item.key=='privilege'" style='width:550px;')
        .top
          .btn
            el-button(type="primary" size="small" @click="choiseFile(item)") 选择上传文件
          span.tip(style="position: initial;") 只能上传jpg/png格式图片，文件大小不能超过4MB(建议宽高比2.5)
        .img-box
          img.img(:src="item.img_src" alt="logo")
    .btn-s
      input.hide(type="file" @change="previewImg($event,4096,'jpg/jpeg/png')" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
      el-button.save(type="primary" size="small" @click="save") 保存
</template>

<style lang="stylus" scoped>
.setting
  .btn-s
    padding-left 350px
  .group
    display flex
    .el-radio
      line-height inherit
    .save
      margin-left 70px
    .label
      min-width 100px
    .right
      .top
        display flex
        flex-direction row
        justify-content space-between
        position relative
        margin-bottom 10px
        >>> .el-input
          width 200px
      .abs
        .el-textarea
          width 550px
          height 140px
        >>> textarea
          width 100%
          height 100%
          resize none
      .tip
        color #999999
        position absolute
        top 50px
      .img-box
        .img
          width 100%
          height inherit
      .img
        width 80px
        height @width
        object-fit contain
    .form-control
      max-width 200px
</style>
