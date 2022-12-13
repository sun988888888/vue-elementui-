<template>
  <div>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input v-model="formInline.orderName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="orderDetail(1)">创建项目</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="ID" align="center" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" align="center" label="项目名称" width="180">
      </el-table-column>
      <el-table-column prop="expert" align="center" label="达人">
      </el-table-column>
      <el-table-column prop="link" align="center" label="链接">
      </el-table-column>
      <el-table-column prop="img1" align="center" label="收录图">
      </el-table-column>
      <el-table-column prop="img2" align="center" label="小眼睛图">
      </el-table-column>
      <el-table-column prop="img3" align="center" label="互动图">
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <el-button type="primary" size="mini" @click="orderDetail(2)">编辑</el-button>
        <el-button type="primary" size="mini" @click="goExpertDeatil">查看</el-button>
      </el-table-column>
    </el-table>
    <add-project :visiable.sync="dialogVisiable" :type.sync="orderType" />
  </div>
</template>

<script>
import AddProject from './addProject.vue'
export default {
  name: "ProjectOneIndex",
  components:{AddProject},
  data() {
    return {
      dialogVisiable:false,//弹窗
      orderType:1,
      formInline: {
        orderName: "",
      },
      tableData: [
        {
          ID: "1",
          name: "XXXXXXXXX",
          expert: "55",
          link: "55",
          img1: "55",
          img2: "55",
          img3: "55",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    /* 打开弹窗 */
    orderDetail(type){
      this.orderType=type
      this.dialogVisiable=true
    },
    /* 跳转详情页 */
    goExpertDeatil(){
      this.$router.push({path:'/layout/expertDetail',query: {id:'123456'}})
    }
  },
};
</script>

<style lang="scss" scoped>
</style>