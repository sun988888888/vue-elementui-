<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      min-width="550px"
      :before-close="handleClose"
    >
      <div>
        <el-form
          ref="ruleForm"
          :model="dataForm"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="选择达人" prop="ids" v-if="orderType == 1">
            <div
              style="max-height: 300px; overflow: auto"
              v-if="dialogVisible && expertList && expertList.length > 0"
            >
              <el-checkbox-group v-model="dataForm.ids">
                <el-checkbox
                  v-for="item in expertList"
                  :label="item.id"
                  :key="item.id"
                  >{{ item.nickname }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
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
                align="center"
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
                align="center"
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
                align="center"
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
                align="center"
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
import {
  orderUserInfo,
  editUserOrder,
  addOrderUser,
  selectOrderUser,
  backOrderInfo,
} from "@/api/api";
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
    editId: {
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
      expertList: [],
      title: "添加达人",
      "dataForm": {
        "ids": [],
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
          } else {
            this.selectOpts();
            this.addExpert();
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {},

  methods: {
    selectOpts() {
      selectOrderUser({
        task_type: this.$route.query.typeId,
        p_id: this.$route.query.p_id,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.expertList = [...res.data.list];
        }
      });
    },
    getData() {
      console.log(1111);
    },
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
      if (this.orderType != 2 && obj.ids.length == 0) {
        this.$message.error("请选择达人");
        return
      }
      console.log(111);
      if (!this.verifyData(obj)) return;
      console.log(222);
      /* 编辑用户详情 */
      if (this.orderType == 2) {
        obj.id = this.editId;
        delete obj.ids;
        editUserOrder(obj).then((res) => {
          if (res.code == 200) {
            this.$message.success("提交成功");
            this.handleClose();
          } else {
            this.$$message.error(res.msg);
          }
        });
      } else {
        obj.task_id = this.$route.query.id;
        addOrderUser(obj).then((res) => {
          if (res.code == 200) {
            this.$message.success("提交成功");
            this.handleClose();
          } else {
            this.$$message.error(res.msg);
          }
        });
      }
    },
    verifyData(obj) {
      let {
        is_link,
        link_date,
        is_included,
        included_date,
        is_eyes,
        eyes_date,
        is_interactive,
        interactive_date,
        is_recovery,
        recovery_day,
      } = obj;
      let str = "";
      if (is_link == 1 && link_date == null) {
        str = "请选择发布链接时间";
      } else if (is_included == 1 && included_date == null) {
        str = "请选择收录图回收时间";
      } else if (is_eyes == 1 && eyes_date == "") {
        str = "请选择小眼睛图回收时间";
      } else if (is_interactive == 1 && interactive_date == null) {
        str = "请选择互动图回收时间";
      } else if (
        is_recovery == 1 &&
        (recovery_day == "" || recovery_day == "0")
      ) {
        str = "请选择数据回收时间";
      } else {
        str = "";
      }

      if (str != "") {
        this.$message.error(str);
        return false;
      } else {
        return true;
      }
    },
    getOrderUserInfo() {
      let obj = {
        id: this.editId,
      };
      orderUserInfo(obj).then((res) => {
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
    addExpert() {
      let obj = {
        id: this.$route.query.id,
      };
      backOrderInfo(obj).then((res) => {
        if (res.code == 200) {
          this.dataForm = Object.assign({}, this.dataForm, res.data);
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
          console.log(this.dataForm);
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.dataForm.included_date = [];
      this.dataForm.link_date = [];
      this.dataForm.eyes_date = [];
      this.dataForm.interactive_date = [];
      this.dataForm.recovery_day = "";
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