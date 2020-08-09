<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <!-- eslint-disable -->
        <li :class="{'current': item.current}" @click="toggleMenu(item)" v-for="item in menuTab" :key="item.index">{{ item.txt }}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="form-item">
          <label >邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="form-item" v-if="this.model === 'register'" >
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><el-input v-model="ruleForm.code"></el-input></el-col>
            <el-col :span="9"><el-button type="success" class="block" @click="getSms()" :disabled="codeBtnStatus.status">{{codeBtnStatus.text}}</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="loginBtnStatus">{{this.model === 'login' ? "登录" : "注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { getSMS,register,login } from "@/api/login.js";
import { stripscript, validateEmail, validatePwd, validateVCode } from "@/utils/validation.js";

export default {
  name: "Index",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(validateEmail(value)) {
        callback(new Error('用户名格式有误'));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (validatePwd(value)) {
        callback(new Error('密码格式有误'));
      } else {
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value != this.ruleForm.password) {
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (!value) {
        return callback(new Error('验证码不能为空'));
      } else if (validateVCode(value)) {
        callback(new Error('验证码格式有误'));
      } else {
        callback();
      }
    };
    //***************************************************************** DATA *****************************************************************
    return {
      menuTab: [
        {'txt': "登录", 'current': true, 'type': "login"},
        {'txt': "注册", 'current': false, 'type': "register"}
      ],
      model: "login",
      codeBtnStatus: {
        status: false,
        text: "获取验证码"
      },
      loginBtnStatus: true,
      timer: null,
      ruleForm: {
        username: '1295749337@qq.com',
        password: 'Abc123456',
        passwords: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  //***************************************************************** METHODS  *****************************************************************
  methods: {
    /**
     * 切换登录、注册菜单
     */
    toggleMenu(data) {
      this.$refs["ruleForm"].resetFields();
      this.menuTab.forEach(item => {
        item.current = false;
      })
      this.model = data.type;
      data.current = true;
      this.claerTimer();
    },
    /**
     * 验证码计时器
     */
    countDown(times) {
      this.timer = setInterval(() => {
        times --;
        if (times === 0) {
          this.claerTimer();
          return;
        }
        this.codeBtnStatus.text = `倒计时${times}s`;
      }, 1000)
    },
    /**
     * 清除计时器
     */
    clearTimer() {
      clearInterval(this.timer);
      this.codeBtnStatus.status = false;
      this.codeBtnStatus.text = "发送验证码";
    },
    /**
     * 接收验证码
     */
    getSms() {
      if (this.ruleForm.username != "") {
        this.codeBtnStatus.status = true;
        this.codeBtnStatus.text = "发送中";
      }
      let data = {
        username: this.ruleForm.username,
        module: this.model
      };
      getSMS(data).then(res => {
        this.loginBtnStatus = false;
        this.countDown(60);
      }).catch();
    }
    ,
    /**
     * 提交表单
     */
    submitForm(formName) {
      if (this.ruleForm.username === "") {
        this.$message.error("用户名不能为空！");
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: this.ruleForm.username,
            password: sha1(this.ruleForm.password),
            code: this.ruleForm.code     
          };
          this.model === "login" ? this.login(data) : this.register(data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 登录
     */
    login(data) {
      this.$store.dispatch("login/login", data).then(res => {
        this.$message.success("Subited !");
        this.clearTimer();
        this.$router.push({
          path: "/console/index"
        });
      }).catch(err => {
        console.log(`Login error: ${err}`);
      });;  
    },
    /**
     * 注册
     */
    register(data) {
      register(data).then(res => {
        this.$message.success("Submited !");
        this.claerTimer();
        this.toggleMenu(this.menuTab[0]);
      }).catch();
    }
  }
};
</script>

<style lang="scss" scoped>
/* eslint-disable */
#login {
  height: 100vh;
  background-color: #344a5f; 
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .form-item {
    margin-bottom: 13px
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
