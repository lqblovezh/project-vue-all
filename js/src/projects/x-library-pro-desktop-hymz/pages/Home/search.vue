<template lang="pug">
.advance-search.container
  .advance-search__wrap
    h4.tc.form-title 高级检索
    form()
      .input-control(v-for="item in AdvTypes" :key="item.type")
        .input-inline(v-if="item.value!='category'")
          label {{item.type}}:
          el-input(:placeholder="'请输入'+item.type" maxlength="20" v-model="form[item.value]")
        .input-inline(v-else)
          label 学科领域:
          el-select(placeholder="请选择" v-model="form[item.value]")
            el-option(
              v-for="{name, id} in list"
              :key="id"
              :label="name"
              :value="id"
            )
      .form-btns.tc
        el-button(@click="search" type="theme") 检索
        el-button(native-type="reset") 重置
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('category', {
      list: state => state.category_list,
    }),
    ...mapState('search', {
      AdvTypes: state => state.AdvTypes,
    }),
  },
  data() {
    return {
      sub_list: [],
      form: {},
    }
  },
  methods: {
    categoryChangeHandler(id) {
      this.b = ''
      const item = this.list.find(item => item.id === id)
      this.sub_list = item.chlidren
    },
    isEmptyForm() {
      for (let i in this.form) {
        if (this.form[i]) {
          return false
        }
      }
      return true
    },
    search() {
      // console.log(this.form);
      // return
      if (!this.isEmptyForm()) {
        this.$go('/result', { ...this.form })
      } else {
        this.$message({
          message: '请至少填写一项查询参数',
          type: 'warning',
        })
      }
    },
  },
}
</script>
<style lang="stylus">
.advance-search
  padding-top 30px
  &__wrap
    padding-bottom 134px
    background-color #fffdf7
    border 1px solid #d5ccb2
    >h4
      margin 60px 0
      font-size 18px
      color #c79846
    >form
      margin 0 auto
      width 840px
      .input-control
        margin-bottom 20px
        width 390px
        display inline-block
        margin-right 60px
        &:nth-of-type(2n)
          margin-right 0
        .input-inline
          display flex
          align-items center
        .el-input
          flex 1
        .el-select
          width 312px
        label
          display inline-block
          width 78px
          font-size 14px
          color #737373
</style>
