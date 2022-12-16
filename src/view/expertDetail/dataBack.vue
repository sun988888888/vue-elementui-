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
          <el-form-item label="任务类型" prop="task_type">
            <el-select
              v-model="dataForm.task_type"
              placeholder="请选择活动区域"
              @change="selectOpts"
            >
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.v"
                :value="item.k"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择达人" prop="ids">
            <div
              style="max-height: 300px; overflow: auto"
              v-if="expertList && expertList.length > 0"
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
import { addRecycleOrder, selectOrderUser } from "@/api";
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
    p_id: {
      type: [Number, String],
      default: 1,
    },
    selectList: {
      type: Array,
      default: () => [],
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
      expertList: [], //可选达人列表
      title: "创建数据回收任务",
      dataForm: {
        ids: [],
        title: "",
        task_type: "",
        desc: "",
        is_link: 1,
        link_date: "",
        is_included: 1,
        included_date: "",
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
        ? (this.title = "创建数据回收任务")
        : (this.title = "编辑数据回收任务");
      newVal == 2 && this.getData(); //newVal==2存在的话执行drawChar函数
    },
    dialogVisible: {
      handler: function () {},
      immediate: true,
    },
  },
  mounted() {
    console.log(1111);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    verifyData() {
      let {
        title,
        task_type,
        ids,
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
      } = this.dataForm;
      let str = "";
      if (title == "") {
        str = "请填写任务标题";
      } else if (task_type == "") {
        str = "请选择任务类型";
      } else if (task_type != "" && ids.length==0) {
        str = "请选择达人";
      } else if (is_link == 1 && link_date == "") {
        console.log('ids: ', ids);
        str = "请选择发布链接时间";
      } else if (is_included == 1 && included_date == "") {
        str = "请选择收录图回收时间";
      } else if (is_eyes == 1 && eyes_date == "") {
        str = "请选择小眼睛图回收时间";
      } else if (is_interactive == 1 && interactive_date == "") {
        str = "请选择互动图回收时间";
      } else if (is_recovery == 1 && recovery_day == "") {
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
    /* 提交数据 */
    subData() {
      if (!this.verifyData()) return;
      console.log(this.p_id);
      let obj = { ...this.dataForm };
      obj.link_date = this.dataForm.link_date[0];
      obj.link_date_e = this.dataForm.link_date[1];
      obj.included_date = this.dataForm.included_date[0];
      obj.included_date_e = this.dataForm.included_date[1];
      obj.eyes_date = this.dataForm.eyes_date[0];
      obj.eyes_date_e = this.dataForm.eyes_date[1];
      obj.interactive_date = this.dataForm.interactive_date[0];
      obj.interactive_date_e = this.dataForm.interactive_date[1];
      obj.p_id = this.p_id;
      console.log(obj);
      addRecycleOrder(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("提交成功");
          this.handleClose();
        } else {
          this.$$message.error(res.msg);
        }
      });
    },
    /* 下拉框 */
    selectOpts() {
      selectOrderUser({
        task_type: this.$route.query.id,
        p_id: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.expertList = res.data.list;
        }
      });
    },
    /* 编辑获取数据 */
    getData() {
      console.log(this.orderType);
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