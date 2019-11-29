<script>
import {getValis} from '@/util/math'

export default {
  name:'valiform',
  data() {
    return {
      inputs:[],
      results: [],
      regs : {
        MailCode: /^\d{4}$/,
        UserName: /^[\w|\d]{4,16}$/,
        Password: /^[\w!@#$%^&*.]{6,16}$/,
        Mobile: /^1[3|4|5|7|8]\d{9}$/,
        Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      }
    };
  },
  methods:{
    valiAll(){
      var vnodes = this.$slots.default ;
      var valiNodes = getValis(vnodes);
      // log(valiNodes)
      return  this.$vali(valiNodes)
    }
  }
};
</script>

<template lang="pug">
.li
  slot

</template>

<style lang="stylus">
</style>


