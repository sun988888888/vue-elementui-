<template>
 <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="phone">
        <span class="svg-container">
          <i class="fa fa-user-circle-o" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.phone"
          placeholder="Phone"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="fa fa-user-circle-o" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
          />
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin('loginForm')">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { setStorage } from "@/utils/setStorage.js";
import { login } from "@/api.js";
export default {
  name: "OperaLogin",
  data() {
    const validateUsername = (rule, value, callback) => {
      let reg=/^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入大于6位数的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '18736110883',
        password: '123456'
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },

  mounted() {},

  methods: {
    handleLogin(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
         /* 存储token */
         /* this.$store.dispatch('user/resetToken','11111') */
          login(this.loginForm).then((res) => {
            let { code,data:{token,nickname} } = res;
            if (code == 200) {
              setStorage("token",token);
              setStorage("username",nickname);
              this.$message({ message: res.msg, type: "success" });
              this.$router.replace("/layout");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error(valid);
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  height: 100vh;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
