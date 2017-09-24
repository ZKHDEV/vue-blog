<template>
    <div class="login-container" v-title="'登录'">
        <v-theme-card class="login-card" :padding-hor="50" :padding-ver="38" :backPosX="-40">
            <div class="card-content">
                <img class="logo"></img>
                <v-card class="input-card" type="inverse" :padding-hor="20" :padding-ver="0">
                    <div class="input-item">
                        <div class="input-group phone-input">
                            <i class="fa fa-user"></i>
                            <input ref="phoneInput" name="phone" placeholder="手机号" autocomplete="off" v-model.trim="phone">
                        </div>
                    </div>
                    <div class="input-item">
                        <div class="input-group code-input">
                            <i class="fa fa-lock"></i>
                            <input ref="codeInput" name="code" placeholder="收到的验证码" autocomplete="off" v-model.trim="code">
                            <v-button class="code-btn" color="four" :height="26" :width="90" :fontSize="10" @click="sendCode">发送验证码</v-button>
                        </div>
                    </div>
                </v-card>
                <p class="login-info" v-show="loginInfo">
                    <i class="fa fa-warning"></i>{{loginInfo}}</p>
                <v-button class="login-btn" color="two" :height="48" :width="300" :fontSize="18" @click="submitLogin">{{loginBtnText}}</v-button>
            </div>
        </v-theme-card>
    </div>
</template>

<script>
import types from '../../store/mutation-types'
export default {
    data() {
        return {
            loginBtnText: '登录',    //登录按钮文本
            logining: false,    //是否正在处理登录请求
            phone: '',    //手机号
            code: '',    //验证码
            loginInfo: ''    //登录验证信息
        }
    },
    methods: {
        submitLogin() {
            if (!this.logining) {
                if (this.phone.length === 0) {
                    this.$refs.phoneInput.focus();
                    this.loginInfo = '请输入手机号';
                } else if (!(/^1[3|4|5|8]\d{9}$/.test(this.phone))) {
                    this.$refs.phoneInput.select();
                    this.loginInfo = '手机号格式错误';
                } else if (this.code.length === 0) {
                    this.$refs.codeInput.focus();
                    this.loginInfo = '请输入验证码';
                } else {
                    this.loginInfo = '';
                    this.loginBtnText = '登录中...';
                    this.logining = true;
                    //发送登录请求
                    this.$http.post('/login', { phone: this.phone, code: this.code }).then((response) => {
                        if (response.data.code === 0) {
                            //保存登录状态
                            this.$store.commit(types.LOGIN, response.data.data);
                            //跳转到登录前页面或主页
                            const redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({
                                path: redirect
                            })
                            return;
                        } else {
                            this.loginBtnText = '登录';
                            this.logining = false;
                            this.loginInfo = response.data.msg;
                        }
                    }).catch((err) => {
                        this.loginBtnText = '登录';
                        this.logining = false;
                        this.loginInfo = '网络异常，请刷新后重试';
                    });
                }
            }
        },
        sendCode() {
            //TODO:发送手机验证码并开始倒计时
            this.$http.get(`/send_code/${this.phone}`);
        }
    },
    components: {
        'v-theme-card': resolve => require(['./components/ThemeCard.vue'], resolve),
        'v-card': resolve => require(['./components/Card.vue'], resolve),
        'v-button': resolve => require(['./components/Button.vue'], resolve),
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/scss/variables.scss';
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $theme-background-color;
}

.login-card {
    position: relative;
    margin: 50vh auto 0;
    transform: translateY(-50%);
    width: 400px;
    text-align: center;
}

.logo {
    width: 200px;
    height: 80px;
}

.input-card {
    margin-top: 50px;
}

.input-item {
    height: 50px;
    padding: 0 10px;
    color: #999999;

    &:first-child {
        height: 49px;
        border-bottom: 1px solid #CCCCCC;
    }
}

.input-group {
    position: relative;
    top: 15px;
    color: #999999;
    i {
        position: relative;
        top: 2px;
        height: 18px;
        font-size: 20px;
    }
    input {
        height: 18px;
        margin: 1px 0 1px 10px;
        border: none;
        outline: none;
        font-size: 14px;
        background-color: transparent;
    }
    &.phone-input {
        input {
            width: 202px;
        }
    }
    &.code-input {
        top: 12px;
        left: -5px;
        input {
            width: 102px;
        }
    }
}

.code-btn {
    float: right;
}

.login-btn {
    margin-top: 40px;
}

.login-info {
    background-color: #F99945;
    margin: 20px auto 0;
    width: 200px;
    padding: 5px;
    color: #FFFFFF;
    border-radius: 3px;
    font-size: 12px;
    i {
        margin-right: 6px;
    }
}

@media (max-width:420px) {
    .login-container {
        background: #FFFFFF url('../../assets/' + $theme-lace-image-name);
    }
    .login-card {
        width: 100%;
        padding: 0!important;
        box-shadow: none;
        background: none;
    }
    .card-content {
        margin-left: -40px;
        margin-right: -40px;
    }
}
</style>