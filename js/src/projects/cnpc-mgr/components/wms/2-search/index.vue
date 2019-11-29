<script>
import * as service from 'services/x-library-pro/implement/mgr/search'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  data() {
    return {
      service,
      checkAll: false,
      checkedSearch: [],
      checkedSenior: [],
      searchList: [],
      seniorList: [],
      isIndeterminate: true,
    }
  },
  methods: {
    getList() {
      service.getList().then(res => {
        const {
          searchList,
          seniorList,
          checkedSearch,
          checkedSenior,
        } = res.data
        this.searchList = searchList
        this.seniorList = seniorList
        this.checkedSearch = checkedSearch
        this.checkedSenior = checkedSenior
      })
    },
    handleCheckAllChange(val) {
      this.checkedSenior = val ? this.seniorList.map(item => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.searchList.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.searchList.length
    },
    save() {
      console.log({
        checkedSearch: this.checkedSearch,
        checkedSenior: this.checkedSenior,
      })
      service
        .save({
          checkedSearch: this.checkedSearch,
          checkedSenior: this.checkedSenior,
        })
        .then(res => {
          this.$message.success('保存成功')
        })
    },
  },
}
</script>


<template lang="pug">
Template(ref="child")
  span(slot="title") 检索管理
  .searchMgr(slot="list")
    .search-box
      label 检索栏（勾选下方检索字段，前台检索框即可检索时选择，最多可勾选四个）
      el-checkbox-group(v-model="checkedSearch" :max="4")
        el-checkbox(v-for="item in searchList" :label="item.id" :key="item.id") {{item.name}}
    .search-box
      el-checkbox(:indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange") 高级检索（勾选下方检索字段，勾选后高级检索即可进行相应检索，可全选）
      el-checkbox-group(v-model="checkedSenior" @change="handleCheckedCitiesChange")
        el-checkbox(v-for="item in seniorList" :label="item.id" :key="item.id") {{item.name}}
    .btns
      el-button.save(type="primary" size="small" @click="save") 保存
</template>

<style lang="stylus" scoped>
.searchMgr
  .search-box
    margin-bottom 20px
    >label
      background rgba(228, 228, 228, 1)
      padding 10px
      display block
      margin-bottom 20px
      color #333
  .btns
    text-align center
</style>
