<template>
  <div>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input
          v-model="formInline.orderName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="serachData(1)"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="orderDetail(1)"
          >创建项目</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="serachData">刷新</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="uploadTabe"
          >导出</el-button
        >
      </el-form-item> -->
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      id="tableList"
      v-loading="isLoading"
    >
      <el-table-column prop="id" align="center" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="title" align="center" label="项目名称" width="180">
      </el-table-column>
      <el-table-column prop="user_num" align="center" label="达人">
      </el-table-column>
      <el-table-column prop="link_num" align="center" label="链接">
      </el-table-column>
      <el-table-column prop="included_num" align="center" label="收录图">
      </el-table-column>
      <el-table-column prop="eyes_num" align="center" label="小眼睛图">
      </el-table-column>
      <el-table-column prop="interactive_num" align="center" label="互动图">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="orderDetail(2, scope.row.id)"
            >编辑</el-button
          >
          <el-button type="primary" size="mini" @click="goExpertDeatil(scope.row.id)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="serachData"
    />
    <add-project
      :visiable.sync="dialogVisiable"
      :type.sync="orderType"
      :orderId.sync="orderId"
    />
  </div>
</template>

<script>
//import { uploadTaber } from "@/utils/util";
import AddProject from "./addProject.vue";
import { getProjectList } from "@/api";
import Pagination from "@/components/pagination";
export default {
  name: "ProjectOneIndex",
  components: { AddProject, Pagination },
  data() {
    return {
      isLoading: false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 0, //总条数
      orderId: 1,
      dialogVisiable: false, //弹窗
      orderType: 1,
      formInline: {
        orderName: "",
      },
      tableData: [],
    };
  },
  watch: {
    dialogVisiable: {
      handler: function (newval) {
        if(newval==false){
          this.serachData();
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.serachData();
  },

  methods: {
    /* uploadTabe() {
      uploadTaber(document.querySelector("#tableList"), "测试.xlsx");
    }, */
    serachData(type) {
      this.isLoading = true;
      /* 如果type为1 为搜索查询 */
      if (type == 1) {
        this.currentPage = 1;
      }
      getProjectList({
        keyword: this.formInline.orderName,
        pageSize: this.pageSize,
        page: this.currentPage,
      }).then((res) => {
        if (res.code == 200) {
          let { data, current_page, total } = res.data;
          this.isLoading = false;
          this.currentPage = current_page;
          this.total = total;
          this.tableData = data;
        }else{
          this.isLoading = false;
          console.error(res.msg);
        }
      }).catch(()=>{
        this.isLoading = false;
      });
    },
    /* 打开弹窗 */
    orderDetail(type, id) {
      this.orderId = id;
      this.orderType = type;
      this.dialogVisiable = true;
    },
    /* 跳转详情页 */
    goExpertDeatil(id) {
      this.$router.push({
        path: "/layout/expertDetail",
        query: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>