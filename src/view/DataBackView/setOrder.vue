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
          <el-form-item label="任务标题" prop="title">
            <el-input v-model="dataForm.title"></el-input>
          </el-form-item>
          <el-form-item label="任务描述" prop="desc">
            <el-input v-model="dataForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="发布链接" prop="is_link">
            <el-col>
              <el-radio-group v-model="dataForm.is_link" size="medium">
                <el-radio :label="1">开启回收</el-radio>
                <el-radio :label="0">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.link_date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="收录图" prop="is_included">
            <el-col>
              <el-radio-group v-model="dataForm.is_included" size="medium">
                <el-radio :label="1">开启回收</el-radio>
                <el-radio :label="0">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.included_date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="小眼睛图" prop="is_eyes">
            <el-col>
              <el-radio-group v-model="dataForm.is_eyes" size="medium">
                <el-radio :label="1">开启回收</el-radio>
                <el-radio :label="0">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.eyes_date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="互动图" prop="is_interactive">
            <el-col>
              <el-radio-group v-model="dataForm.is_interactive" size="medium">
                <el-radio :label="1">开启回收</el-radio>
                <el-radio :label="0">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>回收时间范围：</span>
              <el-date-picker
                v-model="dataForm.interactive_date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="mini"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="数据回收" prop="is_recovery">
            <el-col>
              <el-radio-group v-model="dataForm.is_recovery" size="medium">
                <el-radio :label="1">开启回收</el-radio>
                <el-radio :label="0">不回收</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <span>开启回收时间：</span>
              <el-input
                v-model="dataForm.recovery_day"
                style="width: 100px"
              ></el-input>
              <span style="color: gray; margin-left: 10px"
                >提交发布链接后的第几天回收数据</span
              >
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editTask, backOrderInfo } from "@/api";
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
    editType: {
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
        ids: [],
        title: "",
        task_type: "",
        desc: "",
        is_link: 1,
        link_date: "",
        is_included: 1,
        included_date: ["2022-12-13 12:08:06", "2022-12-16"],
        is_eyes: 1,
        eyes_date: "",
        is_interactive: 1,
        interactive_date: "",
        is_recovery: 1,
        recovery_day: "",
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
    dialogVisible: {
      handler: function (newVal) {
        console.log("newVal: ", newVal);
        if (newVal == true) {
          if (this.orderType == 2) {
            console.log(11223);
            this.getOrderUserInfo();
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {},

  methods: {
    /* 提交数据 */
    subData() {
      let obj = { ...this.dataForm };
      obj.link_date = this.dataForm.link_date[0];
      obj.link_date_e = this.dataForm.link_date[1];
      obj.included_date = this.dataForm.included_date[0];
      obj.included_date_e = this.dataForm.included_date[1];
      obj.eyes_date = this.dataForm.eyes_date[0];
      obj.eyes_date_e = this.dataForm.eyes_date[1];
      obj.interactive_date = this.dataForm.interactive_date[0];
      obj.interactive_date_e = this.dataForm.interactive_date[1];
      obj.id = this.editType;
      editTask(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("提交成功");
          this.handleClose();
        } else {
          this.$$message.error(res.msg);
        }
      });
    },
    /* 获取详情 */
    getOrderUserInfo() {
      let obj = {
        id: this.editType,
      };
      backOrderInfo(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.dataForm = res.data;
          this.dataForm.included_date = [
            res.data.included_date,
            res.data.included_date,
          ];
          this.dataForm.link_date = [res.data.link_date, res.data.link_date_e];
          this.dataForm.eyes_date = [res.data.eyes_date, res.data.eyes_date_e];
          this.dataForm.interactive_date = [
            res.data.interactive_date,
            res.data.interactive_date_e,
          ];
          console.log(this.dataForm.included_date);
          console.log(this.dataForm);
        }
      });
    },
    getData() {
      console.log("获取数据");
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.dataForm.included_date = []
      this.dataForm.link_date = [];
      this.dataForm.eyes_date = [];
      this.dataForm.interactive_date = [];
      this.dataForm.recovery_day=''
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