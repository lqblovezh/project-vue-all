<template lang="pug">
section.panel-subject.container
  HomePanel(v-bind="$props")
    .panel-subject-body
      .swiper-container
        .swiper-wrapper
          .swiper-slide(v-for="item in list" :key="item.id")
            router-link(:to="{name: 'subject_detail', params: { sid: item.id }}" target="_blank")
              HomePanelSubjectItem(:item="item")
        //- .swiper-button-prev
        //- .swiper-button-next
</template>
<script>
import { mapState } from 'vuex'
import HomePanel from './HomePanel'
import HomePanelSubjectItem from './HomePanelSubjectItem'
import Swiper from 'swiper'
export default {
  components: { HomePanel, HomePanelSubjectItem },
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
      list: state => state.recommend_home_subject,
    }),
  },
  mounted() {
    setTimeout(() => {
      let swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
      })
    }, 100)
  },
}
</script>
<style lang="stylus">
.panel-subject
  &-body
    .swiper-container
      padding 30px 50px
      .swiper-button-prev
        left 25px
        width 40px
        height 46px
        background-image url('../../static/images/home-left.png')
        background-size contain
      .swiper-button-next
        right 25px
        width 40px
        height 46px
        background-image url('../../static/images/home-right.png')
        background-size contain
</style>
