<template>
    <div class="header-container">
        <v-col :xs="2" :sm="2" :md="2" class="header-logo">
            <img class="logo hidden-xs" src=""></img>
             <img class="mini-logo visible-xs-inline-block" src=""></img> 
        </v-col>
        <v-col :xs="10" :sm="8" :md="8" class="header-nav">
            <ul>
                <li class="active">
                    <a href="#">
                        <span class="hidden-xs">主页</span>
                        <i class="fa fa-home visible-xs-inline-block"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="hidden-xs">分类</span>
                        <i class="fa fa-bookmark-o visible-xs-inline-block"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="hidden-xs">相册</span>
                        <i class="fa fa-camera-retro visible-xs-inline-block"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="hidden-xs">关于</span>
                        <i class="fa fa-id-card-o visible-xs-inline-block"></i>
                    </a>
                </li>
                <li class="visible-xs">
                    <a href="#">
                        <i class="fa fa-sign-in"></i>
                    </a>
                </li>
            </ul>
        </v-col>
        <v-col :sm="2" :md="2" class="hidden-xs header-account">
            <v-button v-if="!isLogin" class="account-btn" @click="handleLogin" color="two" :height="40" :width="100" :fontSize="13">登录/注册</v-button>
            <a class="setting-btn" v-if="isLogin" href="javascript:void(0)" @mouseover="showSetMenu=true" @mouseout="showSetMenu=false">
                <img src=""></img>
                <div class="setting-menu" v-show="showSetMenu">
                    <ul>
                        <li>
                            <a href="javascript:void(0)"><i class="fa fa-user"></i>设置</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="fa fa-user"></i>设置</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="fa fa-user"></i>设置</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="fa fa-user"></i>设置</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="fa fa-user"></i>设置</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="fa fa-user"></i>设置</a>
                        </li>
                    </ul>
                </div>
            </a>
        </v-col>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isLogin: false,
            showSetMenu: false
        }
    },
    methods: {
        handleLogin() {
            this.$router.push({name:'login'});
        }
    },
    components: {
        'v-button': resolve => require(['./components/Button.vue'], resolve),
        'v-col': resolve => require(['./components/Layout/Col.vue'], resolve),
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/scss/variables.scss';
.header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: 55px;
    padding-top: 5px;
    background: #FFFFFF url('../../assets/' + $theme-lace-image-name);
    background-repeat: repeat-x;
    background-position-y: -10px;
    box-shadow: 0 0 10px 0 rgba(#000000, 0.3);
}

.header-logo {
    height: 55px;
    line-height: 55px;
    text-align: center;
}

.header-logo {
    img.logo {
        width: 100px;
        height: 40px;
        margin-top: 8px;
    }
    img.mini-logo {
        width: 40px;
        height: 40px;
        margin-top: 8px;
    }
}

.header-nav {
    background-color: #FFFFFF;
    height: 55px;
    overflow: hidden;
    i {
        font-size: 18px;
    }
}

.header-account {
    height: 55px;
    text-align: center;
}

.account-btn {
    margin: 8px auto 0;
}

.setting-btn {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 55px;
    text-decoration: none;
    text-align: center;
    color: #000000;
    &:link,
    &:visited {
        background-color: #FFFFFF;
    }
    &:hover,
    &:active {
        background-color: #E4E4E4;
    }
    img {
        width: 40px;
        height: 40px;
        margin-top: 8px;
        display: inline-block;
        border-radius: 20px;
    }
}

.setting-menu {
    position: absolute;
    width: 150px;
    top: 55px;
    right: 0;
    padding: 5px 0;
    background-color: #FFFFFF;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        a {
            display: block;
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            text-decoration: none;
            text-align: left;
            color: #000000;
            font-size: 14px;
            &:link,
            &:visited {
                background-color: #FFFFFF;
            }
            &:hover,
            &:active {
                background-color: #E4E4E4;
            }
            i{
                position: relative;
                top: 2px;
                margin-right: 15px;
                font-size: 20px;
                color: #E87261;
            }
        }
    }
}

.header-nav ul {
    list-style: none;
    padding: 0;
    margin: 0 0 0 10px;
    li {
        float: left;
        margin-right: 10px;
        a {
            display: block;
            width: 80px;
            height: 55px;
            line-height: 55px;
            font-size: 16px;
            color: #000000;
            text-decoration: none;
            text-align: center;
            &:link,
            &:visited {
                background-color: #FFFFFF;
            }
            &:hover,
            &:active {
                background-color: #E4E4E4;
            }
        }
        &.active a {
            color: $theme-color-two;
            &:link,
            &:visited,
            &:hover,
            &:active {
                background-color: #FFFFFF;
            }
        }
    }
}

@media (max-width: 768px) {
    .header-nav {
        ul {
            margin: 0;
            li {
                margin-right: 0;
                a {
                    width: 50px;
                }
            }
        }
    }
}
</style>