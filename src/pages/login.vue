<template>
    <div class="ms-login">
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <font color="red">用户名密码随便填</font>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loginFormRules: {
        userName: [
          { required: true, message: "请填写用户名" },
          { min: 2, message: "用户名不能少于2个字符" },
          { max: 5, message: "用户名最多5个字符" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        console.log("Validate :" + valid);
        if (valid) {
          sessionStorage.setItem("boc_userInfo", JSON.stringify({
            userName: this.loginForm.userName,
            loginTime:new Date()
          }));
          window.location.reload();
        }
      });
    }
  }
};
</script>

<style scoped>
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
</style>
