<script>
import { mapState, mapActions } from 'vuex'
export default {
  // asyncData({ store, route }) {
  //   store.dispatch('indexTable/init', {
  //     ...route.query,
  //   })
  // },
  computed: {
    ...mapState('indexTable', {
      page: state => state.page,
      list: state => state.indexTableList,
    }),
    bookCategories() {
      return this.$recursive(this.list)
    },
    setHolder() {
      let list = this.categoryList.find(item => item.type == this.currentType)
      return list && list.holder
    },
    setName() {
      let list = this.categoryList.find(item => item.type == this.currentType)
      return list && list.name
    },
  },
  created() {
    this.getDate()
  },
  data() {
    // let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z']
    return {
      // 作者国籍
      author_nationality: '',
      categoryName: '',
      categoryList: [
        { name: '人物', type: 'person', holder: '柏拉图' },
        { name: '地域', type: 'address', holder: '埃及' },
      ],
      currentType: 'person',
      currentLette: 'A',
      letterList: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      keyword: '',
      scrollTop: 0,
      setScrollTop: false,
      timer: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll, false)
    })
  },
  methods: {
    ...mapActions('indexTable', ['queryIndexList']),
    changeCategoryChild(type) {
      this.keyword = ''
      this.currentLette = 'A'
      this.currentType = type
    },
    getDate() {
      this.queryIndexList({
        ...this.$route.query,
        type: this.currentType,
        keywords: this.keyword,
      })
    },
    pageChangeHandler(pageNum) {
      this.$go('/indexTable', {
        ...this.$route.query,
        pageNum,
      })
    },
    search() {
      this.getDate()
    },
    ooContView(item) {
      this.currentLette = item
      let dom = document.querySelector(`#letter_${item}`)
      const currentY =
        document.documentElement.scrollTop || document.body.scrollTop
      if (dom) {
        this.scrollToTop(currentY, dom.offsetTop - 170)
      }
    },
    scrollToTop(currentY, targetY) {
      let el = document.documentElement || document.body
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      this.timer = setTimeout(() => {
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        el.scrollTop = currentY
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollToTop(_currentY, targetY)
        } else {
          el.scrollTop = currentY
        }
      }, 1)
    },
    handleScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
    },
    setHtml(name) {
      if (this.keyword) {
        return this.$highlight(name, this.keyword)
      } else {
        return name
      }
    },
    go(item) {
      this.$go('/indexTable/chapters', {
        id: item.id,
        name: item.name,
        ntype: this.currentType,
      })
    },
  },
  watch: {
    scrollTop(nVal, oVal) {
      if (nVal > 230) {
        this.setScrollTop = true
      } else {
        this.setScrollTop = false
      }
    },
    currentType() {
      this.currentLette = 'A'
      this.getDate()
    },
  },
}
</script>

<template lang="pug">
.indexTable
  VScrollTop
  .indexTable-content#scroller-box(ref="content")
    .indexTable-content-head.container
      .warp.container(:class="{fadeIn:setScrollTop}")
        .line
          .label 图书分类：
          .ls.f14.top-items
            .item(
              v-for="item in categoryList"
              :key="item.id"
              @click="changeCategoryChild(item.type)"
              :class="{ active : currentType == item.type}"
            )  {{item.name}}
        .line
          .label 拼音筛选：
          .ls.f14.top-items
            .item(
              v-for="citem in letterList"
              @click="ooContView(citem)"
              :class="{ active : currentLette == citem }"
              :key="citem"
            )  {{citem}}
        .line.search
          .label 检索：
          .ls
            el-input(
              :placeholder="`请输入涉及到的${setName}，如${setHolder}`"
              class="input-with"
              clearable
              v-model="keyword"
              @keyup.enter.native="search"
            )
              el-button(slot="append" class="el-button--search" @click="search") 查 询
    .indexTable-main.container
      .item(v-for="item,key in list" :key="item.id")
        .ib(v-if="key")
          .label(:id="`letter_${key}`" :class='{active:currentLette==key}') {{key}}
          .list-box
            .list(v-for="items in item")
              router-link(:to="{path:'/indexTable/chapters',query:{id:items.id,name:items.name,ntype:currentType}}" target="_blank" v-html="setHtml(items.name)")

</template>

<style lang="stylus" scoped>
@keyframes fadeInAnimate
  from
    transform translateY(-100px)
  to
    transform translateY(0)
.indexTable
  .icon-topBtn
    position fixed
    bottom 60px
    right 20px
    cursor pointer
  &-content
    // padding-top 30px
    &-head
      margin-top 20px
      margin-bottom 20px
      min-height 160px
      .warp
        padding 20px
        background-color #fffdf7
        border solid 1px #d5ccb2
        box-sizing border-box
        &.fadeIn
          position fixed
          top 0px
          left 0
          right 0
          z-index 99
          box-shadow 0 -2px 10px #888
          animation fadeInAnimate 0.5s
        >.line
          line-height 24px
          color #2d4148
          margin-bottom 16px
          position relative
          &:last-child
            margin-bottom 0
          &.search
            >>> .input-with
              input
                width 350px
                height 38px
                border 1px solid #7fcabc
            >>> .el-button--search
              width 70px
              color #fff
              background #2da493
              border-radius 0
              border none
            .label
              line-height 38px
          >.label
            display inline-block
            min-width 70px
            font-size 14px
            text-align right
            position absolute
            left 0
            top 0
            color #878787
          >.ls
            display inline-block
            padding-left 75px
            color #666
            .active
              background-color #009882
              border-radius 2px
              color #fff
          >.top-items
            >.item
              display inline-block
              padding 0 11px
              cursor pointer
              box-sizing border-box
              &:last-child
                margin-right 0
  &-main
    background-color #fffdf7
    border solid 1px #d5ccb2
    padding 40px 20px
    box-sizing border-box
    .item
      margin-top -20px
      .label
        font-size 18px
        line-height 40px
        color #c79846
        &.active
          color #009882
      .list-box
        .list
          display inline-block
          margin-bottom 20px
          margin-right 20px
          font-size 14px
          color #878787
          cursor pointer
          >>> span
            color #D32B2B
</style>
