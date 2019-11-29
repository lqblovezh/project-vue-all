<template lang="pug">
.home-search-input.clearfix.flex(:class="{'inner': type === 'inner'}")
  .search-input
    el-input(
      placeholder="请输入要搜索的内容"
      v-model="keyword"
      class="input-with-select"
      @keyup.enter.native="searchNormal"
      maxlength="20"
    )
      el-select(
        v-model="keyType"
        slot="prepend"
        placeholder="请选择"
      )
        el-option(v-for="item in types" :label='item.type' :value='item.value' :key="item.value")
  el-button(type="search" @click="searchNormal") 搜索
  el-button(type="adv-search" @click="searchAdvance") 高级检索
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      keyword: '',
      keyType: 'all',
    }
  },
  computed: {
    ...mapState('search', {
      types: state => state.types,
    }),
    ...mapState('category', {
      list: state => state.category_list,
    }),
  },
  methods: {
    ...mapActions('search', ['searchType']),
    ...mapMutations('search', ['resetPage']),
    searchNormal() {
      if (!this.keyword) {
        return this.$message.warning('请输入检索词')
      }
      // this.resetPage()
      if (this.$route.path == '/category') {
        let id = this.$route.query.id
        if (!id) {
          id = this.list[0].id
        }
        this.$go('/result', {
          keyword: this.keyword,
          type: this.keyType,
          category: id,
        })
      } else {
        this.$go('/result', {
          keyword: this.keyword,
          type: this.keyType,
          pageNum: 1,
        })
      }
    },
    searchAdvance() {
      this.resetPage()
      this.$go('/advance-search')
    },
    advSearch() {
      this.$toggleLoginPanel()
    },
  },
  mounted() {
    this.searchType()
  },
  watch: {
    $route: {
      handler() {
        this.keyword = this.$route.query.keyword
        this.keyType = this.$route.query.type || 'all'
      },
      immediate: true,
    },
  },
}
</script>
<style lang="stylus">
$input-height = 50px
$input-height-inner = 40px
.home-search-input
  &.inner
    input
      height $input-height-inner
    button
      height $input-height-inner
      border none
  .search-input
    flex 1
    border 1px solid #78b4b4
    >>> .el-input
      >>> .el-input-group__prepend
        border none
    input
      border none
      height $input-height
  button
    width 104px
    height $input-height
    color #fff
</style>
