<script>
export default {
  inject: ['rootMenu'],
  props: {
    index: String,
    iconClass: String,
    txt: String
  },
  created() {
    // this.rootMenu  = this.findRootMenu(this.$parent)
    // 这种实现,每个字组件都要去找父类,多了性能有影响
  },
  data() {
    return {
      isFold: true,
      isCurr: false,
      compType: 'menuItem',
      currTip: false  // 当前rightTip是否打开
    }
  },
  computed: {
    currStyle() {
      if (this.isCurr) {
        return {
          color: this.rootMenu.activeTextColor
          // color: this.rootMenu.activeTextColor
        }
      } else {

      }

    }
  },

  methods: {
    goHref() {
      // console.dir(this)
      let rootMenu = this.rootMenu
      if (rootMenu.router) {
        this.$router.push({ path: this.index })
      }
      // 进入新路由,如果新页面包含菜单, 将会重新创建实例, 不需要手动变色当前
      // if (!this.rootMenu.changedRecreate) {
      //   // 如果菜单不在新页面里面, 需要自己去变色,
      //   rootMenu.findCurrChild(this.index) // 关闭其他选项, 标红当前选项
      //   rootMenu.itemClickHandler(this.index) // 发送点击事件
      // }


      if (!rootMenu.menuRecreate) { // 如果菜单不重新创建实例 => 手动变色
        this.isCurr = true
        rootMenu.normalizeOther(this.index) // 关闭其他选项, 标红当前选项
        rootMenu.itemClickHandler(this.index) // 发送点击事件
      }

    },
    findRootMenu(comp) {
      if (comp.rootMenu) {
        return comp
      } else {
        return this.findRootMenu(comp.$parent)
      }
    },
    showRightTip() {
      // console.log(this)
      this.currTip = true
    },
    mouseenterHander(e) {
      this.currTip = true
    },
    mouseleaveHandler(e) {
      this.currTip = false
    }
  }
}
</script>

<template>
  <div class="item-main curr"
    :style="currStyle">

    <div @click="goHref"
      @mouseleave="mouseleaveHandler"
      @mouseenter="mouseenterHander">
      <!-- ${-rootMenu.scrollTop}px tip滚动追加高度 -->
      <div class="rightTip"
        :style="{marginTop: `${-rootMenu.scrollTop}px`}"
        v-show="!rootMenu.isFold && currTip">
        <div>
          <span class="tiptxt">
            {{txt}}
          </span>
        </div>
      </div>
      <div class="title">
        <span class="icon"
          :class="iconClass"></span>
        <span class="name"
          :class=" rootMenu.isFold ? '':'hide' ">
          {{txt}}
        </span>
      </div>
    </div>

  </div>
</template>

<style lang="stylus" scoped>
.trangle-left
  display inline-block
  width 10px
  height 10px
  border 5px
  background red
.item-main
  height 50px
  width 100%
  font-size 14px
  background #333744
  line-height 50px
  color #bdc8d9
  .title
    &:hover
      background #42485b
  .icon
    font-size 16px
    margin 0 20px 0 15px
</style>
