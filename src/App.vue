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
      //let str = JSON.stringify(this.$store.state.tagsView.cachedViews);
      let arr = [];
      if (this.$store.state.tagsView.visitedViews.length > 0) {
        this.$store.state.tagsView.visitedViews.forEach((item) => {
          let obj = {
            fullPath: item.fullPath,
            name: item.name,
            path: item.path,
            title: item.title,
            params: item.params,
            query: item.query,
          };
          arr.push(obj);
        });
        sessionStorage.setItem("state", JSON.stringify(arr));
      }
    });
    if (JSON.parse(sessionStorage.getItem("state")).length > 1) {
      JSON.parse(sessionStorage.getItem("state")).forEach((item) => {
        this.$store.dispatch("tagsView/addView", item);
      });
    }
  },
  mounted() {
  },
  watch: {
    $route() {
      sessionStorage.setItem("routerNow", this.$route.path);
    },
  },
  methods: {
    /* getDataTags(arr) {
      arr.forEach((item) => {
        if (JSON.parse(sessionStorage.getItem("state")).includes(item.name)) {
          this.$store.dispatch("tagsView/addView", item);
        }
        if (item.children && item.children.length > 0) {
          this.getDataTags(item.children);
        }
      });
    }, */
  },
};
</script>

<style lang="scss">
@import url("./assets/css/reset.css");
</style>
