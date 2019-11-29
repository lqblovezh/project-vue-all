<script>
import { main } from '@/util/mixins'
import { getList as roleList } from 'services/x-library-pro/implement/mgr/role'
import * as service from 'services/x-library-pro/implement/mgr/user'

export default {
  mixins: [main],
  data() {
    return {
      service,
      currentItem: null,
      gradeList: [],
    }
  },
  methods: {
    getList() {
      this.getRoleList()
    },
    getRoleList() {
      roleList().then(res => {
        this.gradeList = res.data
      })
    },
    synchroVip() {
      const { ec_user_id, rule_id, maturity_time } = this.detailInfo
      if (!ec_user_id || !rule_id || !maturity_time) {
        return this.$message.error('请填写完整信息!')
      }
      service.synchroVip(this.detailInfo).then(
        res => {
          this.$message.success('同步成功!')
          this.detailInfo = {}
        },
        err => {
          this.$message.error(err.payload.message)
        }
      )
    },
  },
}
</script>


<template lang="pug">
Template(ref="child")
  span(slot="title") 会员同步
  .setting(slot="list")
    .group
      .label.must 电商用户id：
        el-input( v-model="detailInfo.ec_user_id" placeholder="电商用户id" style="width:200px;")
      .label.must 用户等级：
        //- el-input( v-model="detailInfo.rule_id" placeholder="规则id" style="width:200px;")
        el-select(v-model="detailInfo.rule_id" placeholder="请选择")
          el-option(
            v-for="(item,index) in gradeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          )
      .label.must 到期时间：
        el-date-picker(
          v-model="detailInfo.maturity_time"
          :unlink-panels="true"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="23:59:59"
          type="datetime"
          placeholder="选择日期"
        )
    .btn
      el-button.save(type="primary" size="small" @click="synchroVip") 保存
</template>

<style lang="stylus" scoped>
.setting
  .group
    .label
      display block
      margin-bottom 20px
      text-align left
</style>
