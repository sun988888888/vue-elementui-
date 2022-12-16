<template>
  <div class="footer">
    <el-card align="center"
      >{{ name }}，欢迎来到十七点五</el-card
    >
  </div>
</template>

<script>
import { getStorage } from "@/utils/setStorage";
export default {
  name: "OperaFooter",

  data() {
    return {
      name:''
    };
  },

  mounted() {
    this.name = getStorage("username");
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
}
</style>