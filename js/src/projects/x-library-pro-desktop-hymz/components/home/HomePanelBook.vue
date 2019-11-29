<template lang="pug">
section.panel-book.container
  HomePanel(v-bind="$props")
    .panel-book-body
      .panel-bg-pos
        .panel-book-bg
      .panel-book-wrapper
        .panel-book-list.clearfix.flex
          HomePanelBookItem(
            v-for="item,index in list"
            :item="item"
            :key="`${item.id}_${index}`"
          )
</template>
<script>
import { mapState } from 'vuex'
import HomePanel from './HomePanel'
import HomePanelBookItem from './HomePanelBookItem'
export default {
  components: { HomePanel, HomePanelBookItem },
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
    ...mapState('home', {
      list: state => state.home_hot_read_list,
    }),
  },
  data() {
    return {}
  },
}
</script>
<style lang="stylus">
@media screen and (max-width: 1400px)
  .panel-book
    &-body
      padding 15px 22px 10px
      height 200px
    .panel-bg-pos
      padding 0 22px 30px
      bottom 26px
@media screen and (min-width: 1401px)
  .panel-book
    &-body
      padding 30px 22px
      height 249px
    .panel-bg-pos
      padding 30px 22px
      bottom 52px

.panel-book
  position relative
  &-wrapper
    position relative
  .panel-bg-pos
    position absolute
    left 0
    width 100%
    box-sizing border-box
    z-index 9
  &-bg
    width 100%
    height 47px
    background url('./bg.png') no-repeat center
  &-list
    position absolute
    width 100%
    z-index 10
    > div
      flex 1
</style>
