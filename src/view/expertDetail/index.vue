<template>
  <div>
    <!-- 查看当前项目中的达人信息{{$route.query.id}} -->
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="达人昵称">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="addOrder(1)"
          >创建任务</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="getData"
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
      <!-- <el-table-column
        type="selection"
        :selectable="selectEnable"
        disabled="true"
        width="55"
      >
      </el-table-column> -->
      <el-table-column label="ID" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        align="center"
        label="达人昵称"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="主页链接" show-overflow-tooltip>
        <template slot-scope="scope"
          ><a :href="scope.row.user_link">{{
            scope.row.user_link
          }}</a></template
        >
      </el-table-column>
      <el-table-column prop="phone" align="center" label="手机号">
      </el-table-column>
      <el-table-column align="center" label="发布链接" show-overflow-tooltip>
        <template slot-scope="scope"
          ><a :href="scope.row.link">{{ scope.row.link }}</a></template
        >
      </el-table-column>
      <el-table-column align="center" label="收录图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.included_img"
            :preview-src-list="[scope.row.included_img]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="小眼睛图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.eyes_img"
            :preview-src-list="[scope.row.eyes_img]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="eyes_num" align="center" label="小眼睛数">
      </el-table-column>
      <el-table-column prop="interactive_img" align="center" label="互动图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img3"
            :preview-src-list="[scope.row.img3]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="liked_count" align="center" label="点赞数">
      </el-table-column>
      <el-table-column prop="comments_count" align="center" label="评论数">
      </el-table-column>
      <el-table-column prop="collected_count" align="center" label="收藏数">
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <el-button type="primary" size="mini" @click="addOrder(2)"
          >编辑</el-button
        >
      </el-table-column> -->
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="getData"
    />
    <data-back :visiable.sync="dialogVisiable" :type.sync="orderType" :selectList.sync="selectList" :p_id.sync="$route.query.id"/>
  </div>
</template>

<script>
import Pagination from "@/components/pagination";
import DataBack from "./dataBack.vue";
import { getProjectDetail, selectTypes } from "@/api";
export default {
  name: "ProjectOneIndex",
  components: { DataBack, Pagination },
  data() {
    return {
      selectList:[],//下拉数据
      isLoading: false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 10, //总条数
      dialogVisiable: false, //弹窗
      orderType: 1,
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      /* 选中的数据 */
      multipleSelection: [],
    };
  },
  watch: {
    dialogVisiable: {
      handler: function (newval) {
        if(newval==false){
          this.getData();
        }
      },
    },
  },
  mounted() {
    this.getData();
    this.getselectTypes()
  },

  methods: {
    getData(type) {
      this.isLoading = true;
      let obj={
        p_id: this.$route.query.id,
        pageSize: this.pageSize,
        page: this.currentPage,
      }
      if(type==1){
        obj.keyword=this.formInline.user
      }
      getProjectDetail(obj)
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
    getselectTypes() {
      selectTypes( {
          map_keys: ["task_type"],
          is_all: 0,
        }).then((res) => {
          if(res.code==200){
            this.selectList=res.data.list.task_type
          }
        console.log(res);
      });
    },
    /* 设置禁用选项 */
    selectEnable(row) {
      if (row.id == 1) {
        return false;
      }
      return true;
    },
    addOrder(type) {
      this.orderType = type;
      this.dialogVisiable = true;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>