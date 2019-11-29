<script>
import { main } from '@/util/mixins'
import Ueditor from 'projects/x-publish-mgr/components/1-contentLibrary/question/Ueditor'
import * as service from 'services/x-library-pro/implement/mgr/help'

export default {
  mixins: [main],
  components: { Ueditor },
  data() {
    return {
      service,
      detailInfo: {},
      isShowUeditor: false,
    }
  },
  methods: {
    getList(obj) {
      service.getList().then(res => {
        this.isShowUeditor = true
        this.detailInfo = res.data
      })
    },
  },
}
</script>


<template lang="pug">
Template(ref="child")
  span(slot="title") 帮助管理
  .setting(slot="list" v-if="isShowUeditor")
    Ueditor(:isImage="true" id="agreement" :item="detailInfo" name='text' @uechange="uechange" :frameHeight='300' :frameWidth='700')
    .btns
      el-button.save(type="primary" size="small" @click="save") 保存
</template>

<style lang="stylus" scoped>
.setting
  .btns
    text-align left
    margin-top 30px
    padding-left 320px
</style>
