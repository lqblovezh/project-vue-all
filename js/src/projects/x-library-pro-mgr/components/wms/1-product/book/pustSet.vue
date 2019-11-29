<script>
import formSerialize from 'form-serialize'
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/book'

export default {
  // mixins: [main],
  props: ['pustSetDialog', 'putData'],
  data() {
    return {
      service,
      currentPut: null, // 上架信息
      radio2: '2',
      currIndex: 'books',
      putDetailData: {}, //上架数据
    }
  },
  created() {
    log(this.putData)
    this.setDate()
  },
  methods: {
    setDate() {
      //上架设置详情
      let data = this.putData.prices
      this.currentPut = this.putData
      this.putDetailData.books_free_ids = this.getFreeids(this.putData) //阅读免费章节id
      this.putDetailData.books_all_price = this.putData.price || '' //阅读总价格
      this.radio2 = this.currentPut.price_type || '2'
    },
    getFreeids(data) {
      let array = []
      if (!data || !data.chapters) {
        return []
      }
      let datas = data.chapters
      for (let list of datas) {
        if (list.price == 0) {
          array.push(list.id)
        }
      }
      return array
    },
    noFree(id, e) {
      //不免费
      let array = this.putDetailData[`${this.currIndex}_free_ids`]
      let indexOf = this.currentPut.chapters.findIndex(item => item.id === id)
      let index = array.indexOf(id)
      if (index > -1) {
        array.splice(index, 1)
      }
      let price = this.currentPut.chapters[indexOf].old_price
      this.currentPut.chapters[indexOf].price = price > 0 ? price : null
    },
    free(id, e) {
      //免费
      let array = this.putDetailData[`${this.currIndex}_free_ids`]
      let indexOf = this.currentPut.chapters.findIndex(item => item.id === id)
      let index = array.indexOf(id)
      if (index > -1) {
        array.splice(index, 1)
      }
      array.push(id)
      this.currentPut.chapters[indexOf].price = '0'
    },
    pustSetSave() {
      //上架设置
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let form = formSerialize(document.getElementById('pustSetForm'), {
        hash: true,
      })
      this.service
        .putSave({
          ...this.putDetailData,
          book_id: this.currentPut.product_id,
          ...form,
        })
        .then(res => {
          loading.close()
          this.$emit('save')
        }).catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    computePrice() {
      //计算价格
      let all_price = document.querySelector(`.${this.currIndex}_all_price`)
        .value
      log(all_price)
      let form = formSerialize(document.getElementById('pustSetForm'), {
        hash: true,
      })
      let id = this.putDetailData[`${this.currIndex}_free_ids`]
      if (!all_price) {
        return this.$message.error('请填写价格')
      }
      this.service
        .computePrice({
          book_id: this.currentPut.product_id,
          type: form.books_type,
          all_price,
          id,
        })
        .then(res => {
          this.currentPut = res.data
        })
    },
    getText(name) {
      switch (this.currIndex) {
        case 'pictures':
          return `图片${name}`
          break
        case 'audios':
          return `音频${name}`
          break
        case 'videos':
          return `视频${name}`
          break
        case 'resources':
          return `资源${name}`
          break
        case 'books':
        default:
          return `章节${name}`
          break
      }
    },
    handleClose() {
      this.$emit('close')
    },
  },
  computed: {
    constitute() {
      return this.currentPut.chapters
    },
  },
  watch: {
    putData() {
      this.setDate()
    },
  },
}
</script>


<template lang="pug">
.div
  //- 上架设置
  el-dialog(
      title="上架设置"
      :visible="pustSetDialog"
      v-if="pustSetDialog"
      width="1000px"
      top="50px"
      :before-close="handleClose"
    )
    .header(slot="title")
      el-tabs(value="detail")
        el-tab-pane(label="上架设置" name="detail")
      .formWrap
        VaForm(ref="pustSetForm")
          form#pustSetForm
            .group.constiuteGroup
              .label 书籍构成:
              span.constiute
                span.li.isCurrType 阅读
              .btns
                el-button(size="mini"  @click="computePrice()" type="primary"  plain  ) 计算价格
              .line
              .headerNav
                .left#all_price
                  span(v-text="getText('合集定价:')")
                  input.form-control(v-show='currIndex=="books"' class="books_all_price" type='text' name="books_all_price" v-model='putDetailData.books_all_price')
                  span 元
                .right
                  span(v-text="getText('定价策略:')")
                  el-radio(label="1" v-model="radio2" name="books_type" v-if="currIndex == 'books'") 平均定价
                  el-radio(label="2" v-model="radio2" name="books_type" v-if="currIndex == 'books'") 篇幅定价
              .tableBox(v-if="currentPut")
                table.table
                  thead
                    tr
                      th(v-text="getText('名称')")
                      th(v-text="getText('价格')")
                      th 操作
                  tbody
                      tr(v-for="(item,index) in constitute")
                        td(v-if='currIndex == "books"')
                          .th-name {{item.name}}
                        td(v-if='currIndex == "books"')
                          .th-name {{item.price}}
                        td(v-if='currIndex != "books"')
                          .th-name {{item.name}}
                        td(v-if='currIndex != "books"')
                          .th-name {{item.price}}
                        td
                          .th-name
                            el-button(size="mini" v-if="item.price==0" data-type='free' @click="noFree(item.id,$event)" type="primary"  plain  v-text="'已免费'") 已免费
                            el-button(size="mini" v-if="item.price!=0" data-type='nofree' @click="free(item.id,$event)" type="primary"  plain  v-text="getText('免费')")
      .dialog-footer.btns( slot="footer" class="")
        el-button(type="info" @click="$emit('close')" ) 取消
        el-button(type="primary" @click="pustSetSave" v-if="putData.status!='1'") 确定
</template>


<style lang="stylus" scoped>
.line
  border-bottom 1px solid #E4E7ED
.headerNav
  padding 10px 0
  margin-left 120px
  border-bottom 1px solid #E4E7ED
  >div
    width 50%
    display inline-block
    &.right
      text-emphasis right
    >span
      margin-right 20px
.putPlate
  >div
    padding-left 120px
    line-height 50px
.tableBox
  padding 0
  padding-left 120px
  box-sizing border-box
  width 100%
  max-height 40vh
  overflow auto
.form-control
  width 170px
.constiute .li
  cursor pointer
.constiuteGroup
  .btns
    float right
.el-radio
  line-height inherit
.isCurrType
  color #44c3aa
.select
  margin-left 20px
</style>




