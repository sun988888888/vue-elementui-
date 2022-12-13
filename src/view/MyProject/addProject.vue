<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form label-width="130px" :model="formLabelAlign">
          <el-form-item label="项目名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="导入合作达人名单">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://testwww.superhub.com.cn/testOperateApi/api/file@upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :data="{ api: 'file@upload' }"
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
      title: "创建项目",
      formLabelAlign: {
        name: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  watch: {
    orderType: function (newVal) {
      this.orderType==1?this.title='创建项目':this.title='编辑项目'
      newVal==2 && this.getData(); //newVal==2存在的话执行drawChar函数
    },
  },
  methods: {
    /* 编辑获取数据 */
    getData(){
      console.log(this.orderType);
    },
    /* 提交数据 */
    submitData() {
      let res = [];
      console.log(this.$refs.upload);
      this.$refs.upload.uploadFiles.forEach((item) => {
        if (item.response && item.response.code === 200) {
          res.push(item.response.data.img);
        }
      });
      console.log(res, 1111);
      return res;
    },
    /* 下载文档 */
    downloadTemplate() {
      let a = document.createElement("a");
      a.href = `/名片列表.xlsx`;
      a.download = "导入模板.xlsx";
      a.click();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>