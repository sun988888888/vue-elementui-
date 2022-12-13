<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          ref="ruleForm"
          :model="dataForm"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="任务标题" prop="orderTitle">
            <el-input v-model="dataForm.orderTitle"></el-input>
          </el-form-item>
          <el-form-item label="选择达人" prop="checkExpert">
            <el-select v-model="dataForm.checkExpert" placeholder="请选择达人">
              <el-option label="达人1" value="shanghai"></el-option>
              <el-option label="达人2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述" prop="describe">
            <el-input v-model="dataForm.describe"></el-input>
          </el-form-item>
          <el-form-item label="发布链接" prop="isLink">
            <el-col>
              <el-radio-group v-model="dataForm.isLink" size="medium">
                <el-radio :label="0">开启回收</el-radio>
                <el-radio :label="1">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.linkDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="收录图" prop="isInclude">
            <el-col>
              <el-radio-group v-model="dataForm.isInclude" size="medium">
                <el-radio :label="0">开启回收</el-radio>
                <el-radio :label="1">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.includeDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="小眼睛图" prop="isEye">
            <el-col>
              <el-radio-group v-model="dataForm.isEye" size="medium">
                <el-radio :label="0">开启回收</el-radio>
                <el-radio :label="1">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.eyeDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="互动图" prop="isInteract">
            <el-col>
              <el-radio-group v-model="dataForm.isInteract" size="medium">
                <el-radio :label="0">开启回收</el-radio>
                <el-radio :label="1">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.interactDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="数据回收">
            <el-col>
              <el-radio-group v-model="dataForm.isDataBack" size="medium">
                <el-radio :label="0">开启回收</el-radio>
                <el-radio :label="1">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <el-col>
                <span>回收时间范围：</span>
                <el-date-picker
                  v-model="dataForm.dataTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  size="mini"
                >
                </el-date-picker>
              </el-col>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ProjectOneDataback",
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
      title: "添加达人",
      dataForm: {
        orderTitle: "",
        checkExpert: "",
        describe: "",
        isLink: 0,
        linkDate: "",
        isInclude: 0,
        includeDate: ["2022-12-13", "2022-12-16"],
        isEye: 0,
        eyeDate: "",
        isInteract: 0,
        interactDate: "",
        isDataBack: 0,
        dataTime: "",
      },
    };
  },
  watch: {
    orderType: function (newVal) {
      this.orderType == 1
        ? (this.title = "添加达人")
        : (this.title = "修改达人任务");
      newVal == 2 && this.getData(); //newVal==2存在的话执行drawChar函数
    },
  },
  mounted() {},

  methods: {
    getData() {
      console.log('获取数据');
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.$emit("update:visiable", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>