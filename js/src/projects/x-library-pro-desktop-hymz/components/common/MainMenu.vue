<template lang="pug">
.main-menu(v-show="!isHide")
  .search.container.flex-bs
    a.logo(@click="$go('/home')")
      img(:src="setUrl")
    HomeSearchInput(type="inner")
  MainMenuBar
</template>
<script>
import HomeSearchInput from "../home/HomeSearchInput";
import MainMenuBar from "./MainMenuBar";
export default {
  components: { HomeSearchInput, MainMenuBar },
  data() {
    return {};
  },
  computed: {
    isHide() {
      const { hide_sidebar } = this.$route.meta;
      return hide_sidebar;
    },
    setUrl() {
      return staticUrl + "images/logo.png";
    }
  }
};
</script>
<style lang="stylus">
.main-menu {
  .logo {
    cursor: pointer;
  }

  .search {
    margin-top: 33px;
    margin-bottom: 35px;
  }
}
</style>
