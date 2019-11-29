<template lang="pug">
section.panel-knowledge.container
  HomePanel(v-bind="$props")
    //- .panel-knowledge-body(ref="wrapper")
    .tagcloud-box
      .box
        ul.tagcloud
          li.item(v-for="item,index in list" :key="index" @click="$go('/knowledge/chapters', {id:item.name_id,name:item.name})") {{item.name}}
</template>
<script>
import { mapState, mapActions } from 'vuex'
import HomePanel from './HomePanel'
// import { formatScatterData } from '@/utils/helpers'

export default {
  components: { HomePanel },
  props: {
    icon: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('knowledge', {
      list: state => state.home_knowledge_list,
    }),
  },
  async mounted() {
    await this.queryHomeKnowLedge().then(res => {
      this.$nextTick(() => {
        tagcloud({
          fontsize: 16, //基本字体大小
          radius: 300, //滚动半径
          mspeed: 'normal', //滚动最大速度
          ispeed: 'slow', //滚动初速度
          direction: 135, //初始滚动方向
          keep: false, //鼠标移出组件后是否继续随鼠标滚动
        })
      })
    })
  },
  methods: {
    ...mapActions('knowledge', ['queryHomeKnowLedge']),
  },
}
</script>
<style lang="stylus">
@media screen and (max-width: 1400px)
  .panel-knowledge-body
    height 77px
  .tagcloud-box
    height 130px
@media screen and (min-width: 1401px)
  .panel-knowledge-body
    height 247px
  .tagcloud-box
    height 300px
.panel-knowledge
  position relative
  .tagcloud-box
    position relative
    right 0
    overflow hidden
    left 0
    .box
      position relative
      left 0
      top -100%
      li
        width 100px
        position relative
        height 30px
        // right 5px
        // letter-spacing 5px
        line-height @height
        border-radius 30px
        cursor pointer
        background-color #f6f0e3
        color #c79846
        font-size 14px
        text-align center
</style>
