<template>
  <div>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="达人名称">
        <el-input
          v-model="formInline.projectName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData(1)"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="addOrder(1)"
          >添加达人</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-share" @click="shareMini"
          >创建分享</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-download" @click="uploadExcel"
          >导出</el-button
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
      id="multipleTable"
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
      <el-table-column
        prop="nickname"
        align="center"
        label="达人昵称"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="发布链接">
        <template slot-scope="scope">
          <a :href="scope.row.link">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收录图">
        <template slot-scope="scope">
          <el-image
            :src="static_path + scope.row.included_img"
            :preview-src-list="[static_path + scope.row.included_img]"
            v-if="scope.row.included_img"
          ></el-image>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="小眼睛图">
        <template slot-scope="scope">
          <el-image
            :src="static_path + scope.row.eyes_img"
            :preview-src-list="[static_path + scope.row.eyes_img]"
            v-if="scope.row.eyes_img"
          >
          </el-image>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="eyes_num" align="center" label="小眼睛数">
      </el-table-column>
      <el-table-column align="center" label="互动图">
        <template slot-scope="scope">
          <el-image
            :src="static_path + scope.row.interactive_img"
            :preview-src-list="[static_path + scope.row.interactive_img]"
            v-if="scope.row.interactive_img"
          >
          </el-image>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="liked_count" align="center" label="点赞数">
      </el-table-column>
      <el-table-column prop="collected_count" align="center" label="收藏数">
      </el-table-column>
      <el-table-column prop="comments_count" align="center" label="评论数">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="50px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="addOrder(2, scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="getData"
    />
    <add-expert
      :visiable.sync="dialogVisiable"
      :type.sync="orderType"
      :editId.sync="editId"
    />
  </div>
</template>

<script>
import Pagination from "@/components/pagination";
import { orderUserList, orderShare } from "@/api/api";
import AddExpert from "./addExpert.vue";
import { filesToRar, uploadElExcel } from "@/utils/util";
/* import table2excel from 'js-table2excel' */
/* import JSZip from 'jszip'
import FileSaver from "file-saver" */
export default {
  name: "ProjectOneIndex",
  components: {
    AddExpert,
    Pagination,
  },
  data() {
    return {
      editId: 1, //列表编辑ID
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
      static_path: "", //基础路径
    };
  },
  watch: {
    dialogVisiable: {
      handler: function (newval) {
        if (newval == false) {
          this.getData();
        }
      },
    },
  },
  mounted() {
    this.getData();
  },

  methods: {
    /* 复制分享 */
    shareMini() {
      orderShare().then((res) => {
        console.log(res);
        if (res.code == 200) {
          /*           let content = "";
          content = `【十七点五】
粉丝要求：${"不限"}
内容类型：${"test"}
商品品牌：${"test"}
招募人数：${"test"}
小程序链接：${res.data.link}\n
莓果通告，给达人的晋级宝箱，给品牌的爆款指南，走红“莓”门槛！
        `; */
          this.$copyText(res.data.link)
            .then(() => {
              this.$message.success("已复制");
            })
            .catch(() => {
              this.$message.error("复制失败");
            });
        }
      });
    },
    uploadExcel() {
      let newArr = [];
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请勾选要导出的列表");
        return;
      }
      let excelData = this.multipleSelection.map(item=>{
        let obj={...item}
        if (item.included_img) {
          newArr.push({
            fileUrl: this.static_path + item.included_img,
            renameFileName:
              this.$route.query.orderName + "-" + item.nickname + "-收录图.png",
          });
          obj.included_img=this.static_path+item.included_img
        }
        if (item.eyes_img) {
          newArr.push({
            fileUrl: this.static_path + item.eyes_img,
            renameFileName:
              this.$route.query.orderName +
              "-" +
              item.nickname +
              "-小眼睛图.png",
          });
          obj.eyes_img=this.static_path+item.eyes_img
        }
        if (item.interactive_img) {
          newArr.push({
            fileUrl: this.static_path + item.interactive_img,
            renameFileName:
            this.$route.query.orderName + "-" + item.nickname + "-互动图.png",
          });
          obj.interactive_img=this.static_path+item.interactive_img
        }
        return obj
      })
      let commons = [
        {
          title: "ID", //表格名称
          key: "id", //对应的key
          type: "text", //类型
        },
        {
          title: "达人昵称",
          key: "nickname",
          type: "text",
        },
        {
          title: "发布链接",
          key: "link",
          type: "text",
        },
        {
          title: "收录图",
          key: "included_img",
          type: "image",
          width: 200,
          height: 200,
        },
        {
          title: "小眼睛图",
          key: "eyes_img",
          type: "image",
          width: 200,
          height: 200,
        },
        {
          title: "小眼睛数",
          key: "eyes_num",
          type: "text",
        },
        {
          title: "互动图",
          key: "interactive_img",
          type: "image",
          width: 200,
          height: 200,
        },
        {
          title: "点赞数",
          key: "liked_count",
          type: "text",
        },
        {
          title: "收藏数",
          key: "collected_count",
          type: "text",
        },
        {
          title: "评论数",
          key: "comments_count",
          type: "text",
        },
      ];
      /* 导出表格的时候对npm包做了修改进行实现兼容  部分commons是img类型但是是text空的情况 */
      uploadElExcel(commons, excelData);
      if (newArr.length > 0) {
        filesToRar(newArr, "图片打包", this);
      }
    },

    getData(type) {
      this.isLoading = true;
      let obj = {
        task_id: this.$route.query.id,
        pageSize: this.pageSize,
        page: this.currentPage,
      };
      if (type == 1) {
        obj.keyword = this.formInline.projectName;
      }
      orderUserList(obj)
        .then((res) => {
          if (res.code == 200) {
            let { data, current_page, total, static_path } = res.data;
            this.isLoading = false;
            this.currentPage = current_page;
            this.total = total;
            this.static_path = static_path;
            console.log(this.static_path);
            /* data = [
              {
                id: 5,
                nickname: "5936122286",
                user_link: "微博",
                phone: "18736110883",
                included_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                eyes_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                eyes_num: 0,
                interactive_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                link: null,
                liked_count: 0,
                collected_count: 0,
                comments_count: 0,
              },
              {
                id: 5,
                nickname: "593612228",
                user_link: "微博",
                phone: "18736110883",
                included_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                eyes_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                eyes_num: 0,
                interactive_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                link: null,
                liked_count: 0,
                collected_count: 0,
                comments_count: 0,
              },
              {
                id: 5,
                nickname: "59361222",
                user_link: "微博",
                phone: "18736110883",
                included_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                eyes_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                eyes_num: 0,
                interactive_img:
                  "https://staticonline.superhub.com.cn/20221205/71c01428a296b91d99b10035e10c1d53.png",
                link: null,
                liked_count: 0,
                collected_count: 0,
                comments_count: 0,
              },
            ];  */
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
    addOrder(type, id) {
      this.editId = id;
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