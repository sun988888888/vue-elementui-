<template>
  <div class="header">
    <el-header>
      <div class="title">
        十七点五
      </div>
      <div v-popover:popover>{{ name }}</div>
    </el-header>
    <el-popover ref="popover" placement="bottom" trigger="click">
      <div @click="loginOut">Login Out</div>
    </el-popover>
  </div>
</template>

<script>
import { getStorage, removeStorage } from "@/utils/setStorage.js";
export default {
  name: "OperaHeader",

  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = getStorage("username");
  },
  mounted() {},

  methods: {
    loginOut() {
      this.$router.push("/");
      removeStorage("token");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  .el-header {
    background: #283443;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .title {
      display: flex;
      width: 200px;
      font-size: 18px;
      font-weight: bold;
      color: #b49ffe;
    }
  }
}
::v-deep .el-popover {
  min-width: none;
}
</style>