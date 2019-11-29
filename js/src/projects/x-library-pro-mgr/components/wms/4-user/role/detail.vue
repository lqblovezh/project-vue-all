<script>
import * as service from 'services/x-library-pro/implement/mgr/role'

export default {
  props: ['dialogVisible', 'detailInfo'],
  methods: {
    colse() {
      this.$emit('update:dialogVisible', false)
    },
  },
  computed: {
    isCurrentProject() {
      return __SUFFIX__ == 'hymz'
    },
  },
}
</script>

<template lang="pug">
.dialogVisible
  el-dialog(
    width="1000px"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="colse"
    title="等级权限设置"
    top="50px"
  )
    .content()
      .group
        .label.must 全站资源阅读
        .div
          span.mLabel 单本书籍可阅读章节：
          el-input-number(v-model="detailInfo.chapter" controls-position="right" :min="0")
          |
          |
          span.tips 章 输入0代表无限制。
      .group(v-if="isCurrentProject")
        .label.must 复制功能
        .div
          span.mLabel 书籍单次可复制字数：
          el-input-number(v-model="detailInfo.copy" controls-position="right" :min="-1")
          |
          |
          span.tips 字 输入0代表无限制、-1代表关闭该功能。
      .group(v-if="isCurrentProject")
        .label.must 多方式阅读
        .div
          .flex
            span.mLabel 双屏阅读：
            .right
              el-switch(
                v-model="detailInfo.screen"
                active-color="#13ce66"
                inactive-color="#ddd"
              )
          .flex
            span.mLabel 图文对照：
            .right
              el-switch(
                v-model="detailInfo.ImageText"
                active-color="#13ce66"
                inactive-color="#ddd"
              )
          .flex
            span.mLabel 多语言对照：
            .right
              el-switch(
                v-model="detailInfo.language"
                active-color="#13ce66"
                inactive-color="#ddd"
              )
      .group(v-if="isCurrentProject")
        .label.must 引用功能
        .div
          span.mLabel 书籍单次可引用字数：
          el-input-number(v-model="detailInfo.import" controls-position="right" :min="-1")
          |
          |
          span.tips 字 输入0代表无限制、-1代表关闭该功能。
      .group
        .label.must 超大书房
        .div
          span.mLabel 用户书房容量：
          el-input-number(v-model="detailInfo.study" controls-position="right" :min="-1")
          |
          |
          span.tips 本 输入0代表无限制、-1代表关闭该功能。
    div(slot="footer" class="dialog-footer")
      el-button(type="info" @click="colse" size="small") 取消
      el-button(type="primary" @click="$emit('saveInfo',detailInfo)" size="small") 确定
</template>

<style lang="stylus" scoped>
.page
  text-align center
  width 100%
.group
  .label
    min-width 100px
  .div
    padding-left 100px
    .flex
      display flex
    .mLabel
      min-width 150px
      display inline-block
  .right
    display flex
    flex-direction column
    justify-content center
    width 100%
</style>
