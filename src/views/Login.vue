<template>
  <div class="login-container">
    <div id="login-card">
      <!--扫码登录区域-->
      <div class="left-area">
        <div class="left-title">扫码登录</div>
        <div class="qrcode-img">
          <img src="../assets/images/qc.png" alt="" sizes="" srcset="">
        </div>
      </div>
      <!--输入登录区域-->
      <div class="right-area">
        <div class="right-title">Login</div>
        <div class="login-form">
          <!--登录模式-->
          <div class="login-form_switch">
            <span class="login-form_model"
                  :class="{ 'active': data.loginType === 'username' }"
                  @click="switchLoginType('username')">用户名登录</span>
            <span class="login-form_model"
                  :class="{ 'active': data.loginType === 'phone' }"
                  @click="switchLoginType('phone')">短信登录</span>
            <!-- 动态下划线指示器 -->
            <div class="indicator" :class="data.loginType"></div>
          </div>
          <!--用户名登录的表单-->
          <el-form ref="userLoginFormRef" v-if="data.loginType === 'username'" :model="data.user" :rules="data.userRules" >
            <el-form-item prop="username">
              <el-input prefix-icon="User" v-model="data.user.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" :prefix-icon="Lock" v-model="data.user.password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item >
              <el-input class="content-code" :prefix-icon="Promotion" placeholder="请输入验证码" >
                <template #suffix>
                  <captcha-code class="captcha-code-main" @click="onCaptchaChange"/>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doLogin">登录</el-button>
            </el-form-item>
          </el-form>
          <!--手机号登录的表单-->
          <el-form ref="phoneLoginFormRef" v-if="data.loginType === 'phone'" :model="data.user" :rules="data.phoneRules" >
            <el-form-item prop="phone">
              <el-input prefix-icon="Phone" v-model="data.user.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item prop="smsCode" >
              <el-input class="content-code" :prefix-icon="Message" v-model="data.user.smsCode" placeholder="请输入验证码" >
                <!-- #suffix后缀插槽 -->
                <template #suffix>
                  <el-button
                      link
                      type="primary"
                      :disabled="data.countdown > 0"
                      @click="getSMS"
                      class="captcha-btn">
                    {{ data.countdown > 0 ? `${data.countdown}s后重新获取` : '获取验证码' }}
                  </el-button>
                </template>
              </el-input>
              <span class="content-code_img"></span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="data.loading" @click="doLogin" >登录</el-button>
            </el-form-item>
          </el-form>
          <div class="tip-msg">* 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 引入图标
import {Lock,Promotion,Message } from '@element-plus/icons-vue'
import { ref } from 'vue'
import CaptchaCode from 'vue-captcha-code' // 模拟图形验证码，实际后端获取
import { ElMessage } from 'element-plus'
import router, {addDynamicFLatRoutes} from "@/router/index.js";
import { useAppStore } from '@/stores/app'
import api from '@/api/system/userApi.js'; // 导入 API 方法



const appStore = useAppStore()
// 统一数据管理
// 常用ref > reactive
// ref 在模版中不需要.value Vue会自动解包 ，在js中需要
const data = ref({
  loginType: 'username', // 默认选择用户名登录模式
  countdown: 0, // 获取手机短信验证码的默认值
  loading: false, // 登录状态
  user:{
    username: 'admin',
    password: '123456',
    phone: '',
    smsCode: ''
  },
  userRules : {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  },
  phoneRules: {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
    ],
    smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }
})


// DOM管理
// js部分 ref访问要带上.value
const userLoginFormRef = ref()
const phoneLoginFormRef = ref()


// 使用方法处理点击事件
const switchLoginType = (type) => {
  data.value.loginType = type
  // 可以在这里添加其他逻辑
  // todo 切换逻辑
}

// 图形验证码
const onCaptchaChange = (code) => {
  console.log('验证码变化:', code)
}

/**
 * 手机短信验证码
 */
const getSMS = () => {
  // 发送获取验证码请求
  console.log('获取验证码')

  // 开始倒计时
  data.value.countdown = 60
  const timer = setInterval(() => {
    data.countdown --
    if (data.countdown <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}




//
const doLogin = async () =>{
  try {
    // 验证表单 & 验证码
    await userLoginFormRef.value.validate()

    // 执行登录Api请求，获取token存放，跳转/home
    // 从定义的data中拿数据，而不是表单引用
    const loginRes = await api.login(data.value.user) // api/userData.ts
    // 存token
    // localStorage.setItem("token",response.data.token)
    appStore.setToken(loginRes.data.token);
    // console.log(appStore.token)
    // appStore.setToken(response.data.token)
    const userRes = await api.getUserInfo()
    console.log(userRes.data.username + " 已登录...")
    // 导航守卫
    data.loading = true
    appStore.setUserInfo(userRes.data)
    // 通过app.ts persist 放入localStorage
    // 添加平铺动态路由
    addDynamicFLatRoutes(userRes.data.menu)

    ElMessage.success('登录成功')
    // 跳转首页
    router.push("/home")

  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message || '登录失败')
    }
  } finally {
    data.loading = false
  }
}



</script>
<style lang="less" scoped>

.login-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 全屏高度 */
  width: 100vw;            /* 全屏宽度 */
  background-color: #2D3A4B;
}

#login-card {
  display: flex;
  width: 950px;
  height: 550px;
  .left-area, .right-area {
    flex: 1; /* 左右各占一半 */
  }

}

.left-area {
  background-color: #FFFFFF;
  .qrcode-img {
    // 左右居中
    margin: 10px auto 10px;
    width: 300px;
    height: 300px;

    img {
      padding: 10px; /* 图片内容与边框的距离 */
      border: 1px solid #d1d1d1; /* 浅灰色边框 */
      border-radius: 10px; /* 可选：添加圆角 */
      width: 100%;      // 使用百分比，更灵活
      height: 100%;
    }


  }
}


// 共享样式，注意逗号
.left-title, .right-title{
  height: 130px;
  line-height: 130px;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
}

.right-title {
  color: dodgerblue;
}


.right-area {
  border-left: 1px solid #d1d1d1;
  background-color: #fff;

  /*登录表单*/
  .login-form {
    padding: 0 50px 50px;

    .login-form_switch {
      position: relative;  // 关键：为下划线指示器定位提供参照
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #e4e7ed;

      .login-form_model {
        display: inline-block;
        text-align: center;
        width: 80px;
        margin: 0 5px;
        //padding-right: 10px;
        cursor: pointer;
        color: gray;

      }
      // 当前被激活的模式
      .login-form_model.active {
        color: black;
      }

      /* 动态下划线指示器 */
      .indicator {
        position: absolute;
        width: 90px;
        height: 2px;
        background: dodgerblue;
        bottom: 0;
        transition: all 0.3s ease;
      }
      .indicator.username {
        left: 0;
      }
      .indicator.phone {
        left: 90px;
      }

    }

    .el-form {
      max-width: 600px;
      margin-top: 30px;

      // 图形二维码
      .captcha-code-main {
        width:80px;
        height:28px;
        margin-right: -5px;
        cursor:pointer;
      }
    }

    /*输入框*/
    .el-input {
      width: 100%;
      height: 40px;
    }

    /*登录按钮*/
    .el-button {
      width: 100%;
      height: 40px;
      border-radius: 20px;
      margin: 20px 0;
    }

    /*提示*/
    .tip-msg {
      margin-top: 30px;
      color: #a8abb2; // 字体颜色
      font-size: 12px;
    }

    /*获取验证码的样式*/
    .captcha-btn {
      padding: 0 8px;
      height: 24px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
}


</style>
