<template>
  <div class="studentList">
    <!-- 前端分页  slice截取 -->
    <!-- <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      style="width: 100%"
    > -->
    <el-table
      :data="compData"
      stripe
      style="width: 100%"
    > 
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 封装的底部分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { studentList } from "@/api/api.js";
import Pagination from '@/components/pagination'
export default {
  components:{
    Pagination
  },
  data() {
    return {
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 0, //总条数
      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  computed: {
    /* 前端进行分页 */
    compData(){
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  methods: {
    getList(){
      console.log(111);
    },
    getData() {
      studentList().then((res) => {
        if (res.status == 200) {
          this.total = res.total;
          this.tableData = res.data;
          this.tableData.forEach((item) => {
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state == 1
              ? (item.state_text = "已入学")
              : item.state == 2
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss">
.studentList {
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>