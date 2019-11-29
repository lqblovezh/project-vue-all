<template lang="pug">
aside.c-bg-f.subject-aside
  h4.tc
    .icon-other-subject
    | 其他专题
  .aside-body
    SubjectDetailAsideItem(
      v-for="i in subjectList"
      :item="i"
      :key="i.id"
    )
</template>
<script>
import { mapGetters } from 'vuex'
import SubjectDetailAsideItem from './SubjectDetailAsideItem'
export default {
  components: { SubjectDetailAsideItem },
  computed: {
    ...mapGetters('subject', ['subjectList'])
  }
}
</script>
<style lang="stylus">
.subject-aside
  margin-left 30px
  width 260px
  border 1px solid #dbceb0
  .aside-body
    padding 20px 20px 0
</style>