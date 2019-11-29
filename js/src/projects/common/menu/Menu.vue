<script>
export default {
  inject: ['rootMenu'],
  props: {
    txt: {
      type: String,
    },
    index: String,
  },
  created() {
    this.isFold = this.rootMenu.isFold
  },
  mounted() {
    setTimeout(() => {
      // 在渲染后加上动画, 不然每次初始化时, icon都会转圈
      this.$refs.icon2.style.transition = 'transform 0.3s ease-in-out'
    }, 0)
  },
  data() {
    return {
      isOpen: false,
      isFold: true,
      currTip: false,
    }
  },
  methods: {
    open() {
      if (this.index) {
        this.$router.push({ path: this.index })
      }
      this.isOpen = !this.isOpen
      if (this.rootMenu.keepOneOpen) {
        this.rootMenu.closeOtherGroup(this.txt)
      }
    },
  },
  computed: {
    setOnlyMenu() {
        return this.$refs.subs && this.$refs.subs.children.length === 1
    },
  },
}
</script>
<template>
  <div class="menu-main">
    <div
      class="title-item"
      @mouseleave="currTip = false"
      @mouseenter="currTip = true"
      @click="open"
    >
      <div
        class="rightTip"
        :style="{marginTop: `${-rootMenu.scrollTop}px`}"
        v-show="!rootMenu.isFold && currTip"
      >
        <div>
          <span class="tiptxt">{{txt}}</span>
        </div>
      </div>
      <div class="submenu__title" :class="{isOpen : isOpen}">
        <span
          class="icon2"
          ref="icon2"
          :class="{isOpen:isOpen, [rootMenu.arrowClass]:true, onlyOne:$refs.subs&&$refs.subs.children.length===1  }"
        ></span>
        <span class="name" :class=" rootMenu.isFold ? '':'hide'">{{txt}}</span>
      </div>
    </div>
    <div class="subs" ref="subs" :class="isOpen ? 'open' : 'close'">
      <slot></slot>
    </div>
  </div>
</template>


<style lang="stylus" >
.hide
  display none
.rightTip
  position fixed
  background #222
  z-index 10
  left 60px
  box-sizing border-box
  color #fff
  padding 0 10px
  font-size 13px
  border-radius 5px
  .tiptxt
    &::before
      content ' '
      position absolute
      left -18px
      top 10px
      width 20px
      height 20px
      border 10px solid transparent
      border-right 8px solid #222
      box-sizing border-box
.menu-main
  width 100%
  font-size 16px
  background #42485b
  line-height 40px
  cursor pointer
  .title-item
    .submenu__title.isOpen
      background #373e54
    &:hover
      background rgb(0, 193, 222)
  .icon2
    font-size 12px
    margin 0 15px 0 15px
    // transition transform 0.3s ease-in-out
    &.isOpen
      transform rotate(90deg)
      &.onlyOne
        visibility hidden
  .subs
    width 220px
    transition all 0.5s ease-in-out
  .close
    display none
    // height 0px
  .open
    display block
    // height 150px
</style>
