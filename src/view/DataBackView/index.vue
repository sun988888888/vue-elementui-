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
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="addOrder(1)"
          >创建任务</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-share">创建分享</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
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
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="ID" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.ID }}</template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="项目名称" width="120">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="任务名称">
      </el-table-column>
      <el-table-column prop="linkNum" align="center" label="达人数">
      </el-table-column>
      <el-table-column prop="linkNum" align="center" label="发布链接">
      </el-table-column>
      <el-table-column prop="linkNum" align="center" label="收录图">
      </el-table-column>
      <el-table-column prop="linkNum" align="center" label="小眼睛图">
      </el-table-column>
      <el-table-column prop="linkNum" align="center" label="互动图">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="primary" size="mini" @click="addOrder(2)">编辑</el-button>
        <el-button type="primary" size="mini" @click="goDataBackDeatil"
          >查看</el-button
        >
      </el-table-column>
    </el-table>
    <set-order :visiable.sync="dialogVisiable" :type.sync="orderType"/>
  </div>
</template>

<script>
import SetOrder from "./setOrder.vue";
export default {
  name: "ProjectOneIndex",
  components: {
    SetOrder,
  },
  data() {
    return {
      dialogVisiable: false, //弹窗
      orderType: 1,
      formInline: {
        projectName: "",
        orderName: "",
      },
      tableData: [
        {
          ID: "1",
          name: "XXXXXXXXX",
          link: "55",
          phone: "18736110883",
          linkNum: "55",
          img1: "https://staticonline.superhub.com.cn/20221206/2999760c02c86548c5e8a8c8d425ccd3.jpg",
          img2: "https://staticonline.superhub.com.cn/20221121/925006c486f423452d067915035937ad.jpg",
          img2NUm: "55",
          img3: "https://staticonline.superhub.com.cn/20221121/925006c486f423452d067915035937ad.jpg",
          num1: 55,
          num2: 55,
          num3: 55,
        },
      ],
      /* 选中的数据 */
      multipleSelection: [],
    };
  },

  mounted() {},

  methods: {
    addOrder(type) {
      this.orderType = type;
      this.dialogVisiable = true;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    goDataBackDeatil() {
      this.$router.push({
        path: "/layout/DataBackDetail",
        query: { id: "123456" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>