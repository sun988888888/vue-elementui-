<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" min-width="550px">
      <div>
        <el-form label-width="130px" :model="formLabelAlign">
          <el-form-item label="项目名称" v-if="orderType == 1">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="导入合作达人名单">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/admin/api/project@create"
              :auto-upload="false"
              :file-list="fileList"
              :name="filename"
              :data="projectData"
              :headers="headerObj"
              :on-success="addSuc"
              :on-error="failUpload"
              :before-upload="beforeUpload"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px"
                size="small"
                type="success"
                @click="downloadTemplate"
                >下载导入模板</el-button
              >
              <!-- <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div> -->
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStorage } from "@/utils/setStorage";
//import { editProject } from "@/api/api";
export default {
  name: "ProjectOneAddproject",
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    orderId: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visiable;
      },
      set(val) {
        this.$emit("update:visiable", val);
      },
    },
    orderType: {
      get() {
        return this.type;
      },
      set(val) {
        this.$emit("update:type", val);
      },
    },
  },
  data() {
    return {
      projectAction: "/admin/api/project@create",
      projectData: {},
      filename: "filename",
      headerObj: {
        token: getStorage("token"),
      },
      istoken: "",
      title: "创建项目",
      formLabelAlign: {
        name: "",
      },
      fileList: [],
    };
  },
  watch: {
    orderType: {
      handler: function (newVal) {
        if (newVal == 1) {
          this.projectAction = "/admin/api/project@create";
        } else if (newVal == 2) {
          this.projectAction = "/admin/api/project@append";
        }
        this.orderType == 1
          ? (this.title = "创建项目")
          : (this.title = "编辑项目");
        //newVal == 2 && editProject({ id: this.orderId }); //newVal==2存在的话执行drawChar函数
      },
      immediate: true,
    },
    dialogVisible:{
      handler:function (newVal) {
        if(newVal==false){
          this.closeDialog()
        }
      },
      immediate: true,
    }
  },
  methods: {
    failUpload() {
      this.$message.error("上传失败");
    },
    addSuc() {
      this.$message.success("上传成功");
      this.closeDialog();
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.formLabelAlign.name = "";
      this.fileList = [];
      this.$emit("update:visiable", false);
    },
    beforeUpload() {
      if (this.orderType == 1) {
          this.projectData.api = "project@create",
          this.projectData.title = this.formLabelAlign.name,
          this.projectData.data = JSON.stringify({ title: this.formLabelAlign.name })
      } else if (this.orderType == 2) {
          this.projectData.api = "project@append",
          this.projectData.data = JSON.stringify({ p_id: this.orderId })
      }
    },
    /* 提交数据 */
    submitData() {
      console.log(this.fileList);
      if ((this.formLabelAlign.name == "" || this.fileList == []) && this.orderType==1) {
        this.$message.warning("请填写完整");
        return;
      }else if(this.$refs.upload.uploadFiles.length==0){
        this.$message.warning("请上传表格");
        return;
      }
      this.$refs.upload.submit();
    },
    /* 下载文档 */
    downloadTemplate() {
      let a = document.createElement("a");
      a.href = `/名片列表.xlsx`;
      a.download = "导入模板.xlsx";
      a.click();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>