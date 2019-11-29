<template lang="pug">
.category-list
  //- .category-list__head
  .category-list__head
    //- span(v-if="categoryList") {{setTitle}}
    .left.ib
      span(v-if="categoryList.length") {{setTitle}}
      p.ib.f14 共有
        |
        span {{ page.total }}
        | 条数据
    .right.ib
      el-input(
        placeholder="输入关键字"
        class="input-with"
        clearable
        v-model="keyword"
        maxlength=20
        @keyup.enter.native="search()"
      )
        el-select(
          v-model="keyType"
          slot="prepend"
          placeholder="请选择"
        )
          el-option(v-for="item in types" :label='item.type' :value='item.value' :key="item.value")
        el-button.searchBtn(slot="append" class="el-button--search" @click="search()") 检索
  .category-list__body
    CategoryItem(
      v-for="item,index in list"
      :item="item"
      :key="item.id+'-'+index"
    )
  .noDate(v-if="!page.total&&pageShow")
    .tips
      span 没有找到
      span(v-if="keyword") “{{keyword}}”
      span 相关的书籍，请重新检索！
  VipPurchaseTips(v-if="pageShow")
  .pages(v-if="pageShow&&userInfo&&userInfo.vip")
    PageMy(
      @currentChange="pageChangeHandler"
      :total="page.total"
      :pageOffset="page.pageOffset"
      :pageNum="page.pageNum"
    )
</template>

<script>
import { mapState } from 'vuex'
import CategoryItem from './CategoryItem'
export default {
  props: ['country'],
  components: { CategoryItem },
  data() {
    return {
      keyword: '',
      keyType: 'all',
      types: [
        {
          type: '全部',
          value: 'all',
        },
        {
          type: '书籍名',
          value: 'book_name',
        },
        {
          type: '作者',
          value: 'author_name',
        },
        {
          type: '译者',
          value: 'translator',
        },
        {
          type: '简介',
          value: 'abs',
        },
      ],
    }
  },
  computed: {
    ...mapState('category', {
      page: state => state.page,
      list: state => state.book_list,
      pageShow: state => state.pageShow,
      categoryList: state => state.category_list,
    }),
    ...mapState('user', {
      userInfo: state => state.info,
    }),
    setTitle() {
      let id = this.$route.query.id || this.categoryList[0].id
      let cur = this.findItem(id)
      if (this.country) {
        return `${cur['name']} —【${this.country}】`
      } else {
        return `${cur['name']}`
      }
    },
  },
  methods: {
    findItem(id) {
      let obj
      for (let i in this.categoryList) {
        if (this.categoryList[i].id == id) {
          obj = this.categoryList[i]
        } else {
          let child = this.categoryList[i].chlidren
          for (let k in child) {
            if (child[k].id == id) {
              obj = child[k]
            }
          }
        }
      }
      return obj
    },
    clear() {
      this.keyword = ''
      this.keyType = 'all'
    },
    search(pageNum) {
      this.$emit('click-event', {
        type: this.keyType == 'all' ? '' : this.keyType,
        keyword: this.keyword,
        pageNum,
        keepSearch: true,
      })
    },
    pageChangeHandler(pageNum) {
      // this.$go('/category', {
      //   ...this.$route.query,
      //   pageNum,
      // })
      this.search(pageNum)
    },
  },
}
</script>
<style lang="stylus">
.category-list
  margin-top 10px
  padding 20px
  background-color #fffdf7
  border 1px solid #d5ccb2
  .noDate
    min-height 20vh
    width 100%
    text-align center
    display table
    .tips
      display table-cell
      vertical-align middle
      color #333
      font-size 16px
  &__head
    font-size 18px
    color #c79846
    overflow hidden
    line-height 40px
    padding-bottom 16px
    border-bottom 1px solid #e6dace
    .left
      >p
        color #666666
        >span
          color #f00
    .right
      float right
      .input-with
        border 1px solid #78b4b4
        >input
          width 120px
          padding 0 10px
          border none
        .el-select
          background #fff
          .el-input
            width 90px
        .searchBtn
          color #fff
          height 40px
          background #2da493
          border-radius 0
          border none
</style>
