<template>
    <div class="login-container" v-title="'登录'">
        <div class="login-card">
            <div class="card-content">
                <img class="logo"></img>
                <div class="input-container">
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
                            <a class="account-btn code-btn" href="javascript:void(0)" @click="sendCode">发送验证码</a>
                        </div>
                    </div>
                </div>
                <p class="login-info" v-show="loginInfo">
                    <i class="fa fa-warning"></i>{{loginInfo}}</p>
                <a class="account-btn login-btn" :class="{'disabled':logining}" href="javascript:void(0)" @click="submitLogin">{{loginBtnText}}</a>
            </div>
        </div>
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
                    this.$http.post('/account/login', { phone: this.phone, code: this.code }).then((response) => {
                        if (response.data.code === 200) {
                            //保存登录状态
                            this.$store.commit(types.LOGIN, response.data.token);
                            //跳转到登录前页面或主页
                            const redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({
                                path: redirect
                            })
                            return;
                        } else {
                            this.loginBtnText = '登录';
                            this.logining = false;
                            this.loginInfo = response.data.info;
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
            //TODO:发送手机验证码
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F0EFEE;
}

.login-card {
    position: relative;
    margin: 50vh auto 0;
    transform: translateY(-50%);
    padding: 12px 0;
    width: 400px;
    border-radius: 6px;
    background: #FFFFFF url(../../assets/ColorLine.jpg);
    background-position-x: -40px;
    box-shadow: 0 0 10px 0 rgba(#000000, 0.3);
    text-align: center;
}

.card-content {
    padding: 38px 50px;
    width: 300px;
    background-color: #FFFFFF;
}

.logo {
    width: 200px;
    height: 80px;
}

.input-container {
    margin-top: 50px;
    padding: 0 20px;
    position: relative;
    background-color: #F0EFEE;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3) inset;
    width: 260px;
    height: 100px;
    border-radius: 6px;
    text-align: left;
    hr {
        margin: 0;
        height: 1px;
        border: none;
        border-top: 1px solid #CCCCCC;
    }
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
        input {
            width: 102px;
        }
    }
}

.account-btn {
    display: block;
    border-radius: 3px;
    color: #FFFFFF;
    text-decoration: none;
    text-align: center;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
}

.code-btn {
    float: right;
    padding: 5px 15px;
    font-size: 10px;
    &:link,
    &:visited {
        background-color: #47B5CF;
    }
    &:hover,
    &:active {
        background-color: #39A2BC;
    }
    &.disabled {
        background-color: #39A2BC;
    }
}

.login-btn {
    width: 300px;
    padding: 12px 0;
    margin-top: 40px;
    font-size: 18px;
    &:link,
    &:visited {
        background-color: #E87261;
    }
    &:hover,
    &:active {
        background-color: #D3675A;
    }
    &.disabled {
        background-color: #D3675A;
    }
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
        background: #FFFFFF url(../../assets/ColorLine.jpg);
    }
    .login-card {
        width: 100%;
        box-shadow: none;
        background: none;
    }
    .card-content {
        padding: 38px 0;
        width: 100%;
        background-color: #FFFFFF;
    }
    .input-container,
    .login-btn {
        margin-left: auto;
        margin-right: auto;
    }
}
</style>