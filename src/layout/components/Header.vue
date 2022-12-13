<template>
  <div class="header">
    <el-header>
      <div class="title">十七点五</div>
      <div>{{name}}</div>
    </el-header>
  </div>
</template>

<script>
import {getToken} from '@/utils/setToken.js'
export default {
  name: 'OperaHeader',

  data() {
    return {
      name:''
    };
  },
  created() {
    this.name=getToken('username')
  },
  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    .el-header{
      background: #283443;
      color: #fff;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      .title{
        width: 200px;
        font-size: 24px;
      }
    }
  }
</style>