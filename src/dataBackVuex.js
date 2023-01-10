import $store from '@/store'
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("storeState", JSON.stringify($store.state))
});
/* 整体缓存vuex的所有state */
if (sessionStorage.getItem("storeState")) {
  $store.replaceState(Object.assign({}, $store.state, JSON.parse(sessionStorage.getItem("storeState"))))
  sessionStorage.removeItem("storeState")
}
/* sessionStorage.removeItem("stateTabs") */