<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    //在页面刷新时将vuex里的state信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      console.log("页面将要刷新了");
      let str = JSON.stringify(this.$store.state.tagsView.cachedViews);
      if (this.$store.state.tagsView.cachedViews.length > 0) {
        sessionStorage.setItem("state", str);
      }
      
    });
    if (JSON.parse(sessionStorage.getItem("state")).length>1) {
      this.getDataTags(this.$router.options.routes);
    }
  },
  mounted() {
    console.log(JSON.parse(sessionStorage.getItem("state")));
    
  },
  watch: {
    $route() {
      sessionStorage.setItem("routerNow", this.$route.path);
    },
  },
  methods: {
    getDataTags(arr) {
      arr.forEach((item) => {
        if (JSON.parse(sessionStorage.getItem("state")).includes(item.name)) {
          console.log(item.name);
          this.$store.dispatch("tagsView/addView", item);
        }
        if (item.children && item.children.length > 0) {
          this.getDataTags(item.children);
        }
      });
    }
  },
};
</script>

<style lang="scss">
@import url("./assets/css/reset.css");
</style>
