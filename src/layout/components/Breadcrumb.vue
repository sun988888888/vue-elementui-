<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        
        <template
        v-for="(item, index) in $route.matched"
        >
          <el-breadcrumb-item :key="index" v-if="index!=0">{{ item.name }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "OperaBreadcrumb",

  data() {
    return {};
  },
  created() {
    /* 获取到达当前页面的路由元数据 */
    console.log(this.$route.matched);
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>