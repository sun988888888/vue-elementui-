<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu
        router
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#283443"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 遍历路由 -->
        <template v-for="item in menus">
          <!-- 一级菜单不遍历就是layout -->
          <!-- 遍历layout里面的 -->
          <template v-for="(item2, index2) in item.children">
            <!-- 如果有子菜单选择有下拉框的 -->
            <el-submenu
              :index="item2.path + ''"
              :key="index2"
              v-if="
                !item2.hidden && item2.children && item2.children.length > 0
              "
            >
              <template slot="title">
                <i :class="item2.iconClass"></i>
                <span>{{ item2.name }}</span>
              </template>
              <el-menu-item-group
                v-for="(child, index) in item2.children"
                :key="index"
              >
                <el-menu-item :index="child.path">
                  <i :class="child.iconClass"></i>
                  {{ child.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item2.path + ''" :key="index2" v-else-if="!item2.hidden">
              <i :class="item2.iconClass"></i>
              {{ item2.name }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "OperaMenu",

  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.menus = [...this.$router.options.routes];
  },
  mounted() {},
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      // if set path, the sidebar will highlight the path you set
      return path;
    },
  },
};
</script>

<style lang="scss">
.menu {
  background: red;
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
      .fa {
        margin-right: 15px;
      }
    }
     .el-menu-item {
      /*.el-menu-item的最小宽度会影响二级菜单打开的时候会突出  */
      min-width: 0;
    }
    .el-menu-item-group__title{
      display: none;
    }
  }
}
</style>