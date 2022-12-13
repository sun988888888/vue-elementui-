<template>
  <div class="home">
    <el-container>
      <!-- header头部 -->
      <Header />
      <el-container class="content">
        <!-- 侧边栏 -->
        <Menu />
        <el-container>
          <el-main>
            <!-- 面包屑 -->
            <bread/>
            <!-- 动态标签页 -->
            <tags-view/>
            <!-- 主页面 -->
            <div class="count">
                <app-main />
            </div>
          </el-main>
          <!-- footer -->
          <el-footer><Footer /></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import Bread from './components/Breadcrumb.vue'
import TagsView from './components/TagsView/index.vue'
import AppMain from './components/AppMain.vue'
export default {
  name: "HelloWorld",
  components: {
    Header,
    Footer,
    Menu,
    Bread,
    TagsView,
    AppMain
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .count{
      margin: 20px 0;
    }
  }
}
</style>
