<script>
import './font.styl'
export default {
  // name: 'GliMenu',
  compName: 'GliMenu',//通过this.$options.compName获取, 结构遍历的时候用到

  provide() {
    return {
      rootMenu: this,
    }
  },
  props: {
    defaultActive: String,
    keepOneOpen: { //只保持一个菜单的打开
      type: Boolean,
      default: false,
    },
    menuRecreate: { //路由改变, 菜单组件是否会重新创建
      type: Boolean,
      default: true,
    },
    changedRecreate: {
      type: Boolean,
      default: false,
    },
    router: { //是否路由转跳
      type: Boolean,
      default: true,
    },
    collapse: { // 折叠
      type: Boolean,
      default: false,
    },
    topPx: {// 距离顶部多少px
      type: String,
      default: '10px',
    },
    topBarClass: {
      type: String,
      default: 'icon-menuown-fold'
    }, //开关的字体图标
    arrowClass: {
      type: String,
      default: 'icon-menuown-right'
    }, //开关的字体图标
    backgroundColor: {
      type: String,
      default: '#333744',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    activeTextColor: {
      type: String,
      default: '#44c3aa',
    },
  },
  created() {
    this.isFold = !this.collapse
    if (!this.isFold) {
      // setTimeout(() => { //这个时候solt还没有渲染,因此还没有子组件
      //   this.hideChildrenName(this.$children)
      // }, 0);
    }
  },
  mounted() {
    this.findCurrChild(true)
  },
  data() {
    return {
      isFold: true,
      styleObj: {
        backgroundColor: this.backgroundColor,
      },
      scrollTop: 0,
      rootMenu: true, // 用来标识, 他是根菜单
    }
  },
  watch:{
    defaultActive(){
      this.findCurrChild(true)
    }
  },
  methods: {
    fold() {
      this.isFold = !this.isFold
      // console.dir(this)
      if (!this.isFold) {
        this.hideChildrenName(this.$children)
      }
      this.$emit('foldHandler', this.isFold)
    },
    hideChildrenName(children) {
      children.forEach(item => {
        item.isFold = this.isFold;
        if (item.$children) {
          this.hideChildrenName(item.$children)
        }
      })
    },
    itemClickHandler(index) {
      this.$emit('itemClickHandler', index)
    },
    findCurrChild(isNew = false) {
      //capture 先处理父元素绑定的事件, 然后一路定位到最小的node , 依次触发
      // console.dir(this)
      // 进行一次值匹配
      this.$children.forEach(childrens => {
        this.currChild(childrens, this.defaultActive, isNew)
      })
    },
    // 这种遍历只支持了两级, 应该给item组件一个标识, 就可以遍历所有的
    currChild(childrens, path, isNew) {

      let currGroup = false //childrens是否是当前组
      childrens.$children.forEach(item => {
        // item==menuItem  childrens = menu.vue
        if (item.index == path || item.index == this.$route.query.index) {
          // if (new RegExp(item.index).test(path)) {
          item.isCurr = true
          currGroup = true
          // item.activeTextColor = this.activeTextColor // 颜色赋值给每一个小的

        } else {
          item.isCurr = false
        }
      })
      if (!currGroup) {
        childrens.isOpen = false
      } else {
        if (isNew) {
          // 只有重新创建menu实例, 才需要自动打开这种操作
          childrens.isOpen = true // 父打开, 子变色
        }
      }
    },
    normalizeOther(index) { // 其他颜色正常化
      this.$children.forEach(c => {
        c.$children.forEach(item => {
          if (item.index != index) {
            item.isCurr = false
          }
        })
      })
    },
    findEachItem() {

    },
    closeOtherGroup(txt) {
      this.$children.forEach(childrens => {
        if (childrens.txt != txt) {
          childrens.isOpen = false
        }
        // this.currChild(childrens, this.defaultActive, isNew)
      })
    },
    scrollHander(e) {
      if (!this.isFold) {
        let node = e.target
        // console.dir(node) // 里面的值没有变化, 似乎打印有延迟
        this.scrollTop = node.scrollTop
        // log(this.scrollTop)
      }
    },
  },

}
</script>
<template>
  <div class="wrap"
    :style="{ top: topPx }"
    :class="isFold ?'open':'close' ">
    <div class="main"
      @scroll="scrollHander"
      :style="styleObj">
      <div class="topbar"
        :class="isFold ? '': 'fold' "
        @click="fold">
        <span :class="topBarClass"></span>
      </div>
      <div color="red">
        <slot>

        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// @import '../../assets/font.styl'
.wrap
  position fixed
  top 0
  bottom 0
  left 0
  width 200px
  overflow-x hidden
  z-index 20
  &.close
    width 50px
.main
  position absolute
  top 0
  bottom 0
  left 0
  width 220px
  background #333744
  color #fff
  cursor pointer
  user-select none
  overflow-y scroll
  overflow-x hidden
  .topbar
    // position fixed
    // top 0px
    // width 200px
    height 30px
    text-align center
    background #4a5064
    line-height 30px
    font-size 12px
    &.fold
      width 50px
</style>
