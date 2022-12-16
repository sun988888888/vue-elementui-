<template>
  <div>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input
          v-model="formInline.projectName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input
          v-model="formInline.orderName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getDataList(1)"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-share">创建分享</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" icon="el-icon-download" @click="uploadLink"
          >导出</el-button
        >
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="getDataList"
          >刷新</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 达人信息数据 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="isLoading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="ID" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="项目名称" width="120">
      </el-table-column>
      <el-table-column prop="t_title" align="center" label="任务名称">
      </el-table-column>
      <el-table-column prop="user_num" align="center" label="达人数">
      </el-table-column>
      <el-table-column prop="link_num" align="center" label="发布链接">
      </el-table-column>
      <el-table-column prop="included_num" align="center" label="收录图">
      </el-table-column>
      <el-table-column prop="eyes_num" align="center" label="小眼睛图">
      </el-table-column>
      <el-table-column prop="interactive_num" align="center" label="互动图">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="addOrder(2,scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="goDataBackDeatil(scope.row.id,scope.row.task_type,scope.row.p_id)"
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
      @pagination="getDataList"
    />
    <set-order :visiable.sync="dialogVisiable" :type.sync="orderType" :editType.sync="editType" />
  </div>
</template>

<script>
import SetOrder from "./setOrder.vue";
import { orderList } from "@/api";
import Pagination from "@/components/pagination";
export default {
  name: "ProjectOneIndex",
  components: {
    SetOrder,
    Pagination,
  },
  data() {
    return {
      editType:1, //编辑任务
      dialogVisiable: false, //弹窗
      isLoading: false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 10, //总条数
      orderType: 1,
      formInline: {
        projectName: "",
        orderName: "",
      },
      tableData: [],
      /* 选中的数据 */
      multipleSelection: [],
    };
  },

  mounted() {
    this.getDataList();
  },

  methods: {
    /* 复制分享 */
    uploadLink() {
      this.$copyText("1111")
        .then(() => {
          this.$message.success("已复制");
        })
        .catch(() => {
          this.$message.error("复制失败");
        });
    },
    getDataList(type) {
      this.isLoading = true;
      let obj = {
        pageSize: this.pageSize,
        page: this.currentPage,
      };
      if (type == 1) {
        obj.keyword = this.formInline.projectName;
        obj.t_keyword = this.formInline.orderName;
      }
      orderList(obj)
        .then((res) => {
          if (res.code == 200) {
            let { data, current_page, total } = res.data;
            this.isLoading = false;
            this.currentPage = current_page;
            this.total = total;
            this.tableData = data;
            console.log(this.tableData);
          } else {
            this.isLoading = false;
            console.error(res.msg);
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addOrder(type,id) {
      this.editType=id
      this.orderType = type;
      this.dialogVisiable = true;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    goDataBackDeatil(id,typeId,p_id) {
      this.$router.push({
        path: "/layout/DataBackDetail",
        query: { id,typeId,p_id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>