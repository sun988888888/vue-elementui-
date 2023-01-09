<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" > </el-table-column>
      <el-table-column prop="add_date" label="日期" > </el-table-column>
      <el-table-column prop="d_times" label="导出次数" > </el-table-column>
      <el-table-column prop="s_times" label="搜索次数"> </el-table-column>
    </el-table>
     <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="getData"
    />
  </div>
</template>

<script>
import { dataPointList } from "@/api/dataPoint";
import Pagination from "@/components/pagination";
export default {
  name: "ProjectOneIndex",
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 10, //总条数
      tableData: [],
    };
  },

  mounted() {
    console.log(this.$store.state);
    console.log(this.$store.state);
    this.getData();
  },

  methods: {
    getData() {
      dataPointList([])
        .then((res) => {
          if (res.code == 200) {
            let { data, current_page, total } = res.data;
            this.isLoading = false;
            this.currentPage = current_page;
            this.total = total;

            this.tableData = data;
          } else {
            this.isLoading = false;
            console.error(res.msg);
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>