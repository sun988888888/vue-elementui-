import $store from '@/store'
window.addEventListener("beforeunload", () => {
  let arr = [];
  /* 处理tabs数据 */
  if ($store.state.tagsView.visitedViews.length > 0) {
    $store.state.tagsView.visitedViews.forEach((item) => {
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
    sessionStorage.setItem("stateTabs", JSON.stringify(arr));
  }
  /* sessionStorage.setItem("storeState", JSON.stringify($store.state)) */
});
/* 单独处理tabs*/
if (JSON.parse(sessionStorage.getItem("stateTabs")) && JSON.parse(sessionStorage.getItem("stateTabs")).length > 1) {
  JSON.parse(sessionStorage.getItem("stateTabs")).forEach((item) => {
    $store.dispatch("tagsView/addView", item);
  });
}
/* 整体缓存vuex的所有state */
console.log('sessionStorage.getItem("storeState"): ', sessionStorage.getItem("storeState"));
if (sessionStorage.getItem("storeState")) {
  $store.replaceState(Object.assign({}, $store.state, JSON.parse(sessionStorage.getItem("storeState"))))
}
/* sessionStorage.removeItem("stateTabs") */