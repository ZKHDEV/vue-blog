<template>
    <div class="header-container">
        <div class="header-logo">
            <img class="logo" src=""></img>
            <img class="mini-logo" src=""></img>
        </div>
        <div class="header-nav">
            <ul>
                <li class="active">
                    <a href="#">
                        <span>主页</span>
                        <i class="fa fa-home"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>分类</span>
                        <i class="fa fa-bookmark-o"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>相册</span>
                        <i class="fa fa-camera-retro"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>关于</span>
                        <i class="fa fa-id-card-o"></i>
                    </a>
                </li>
                <li class="account-item">
                    <a href="#">
                        <i class="fa fa-sign-in"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="header-account">
            <router-link :to="{name:'login'}" class="default-btn account-btn">登录/注册</router-link>
        </div>
    </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.header-container {
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 55px;
    padding-top: 5px;
    background: #FFFFFF url(../../assets/ColorLine.jpg);
    background-repeat: repeat-x;
    background-position-y: -10px;
    box-shadow: 0 0 10px 0 rgba(#000000, 0.3);
}

.header-logo {
    float: left;
    width: 15%;
    height: 55px;
    text-align: center;
}

.header-logo {
    img.logo {
        width: 100px;
        height: 40px;
        margin-top: 8px;
    }
    img.mini-logo {
        display: none;
        width: 40px;
        height: 40px;
        margin-top: 8px;
    }
}

.header-nav {
    float: left;
    background-color: #FFFFFF;
    height: 55px;
    width: 70%;
    margin: 0 auto;
    overflow: hidden;
    i {
        display: none;
        font-size: 18px;
    }
}

.header-account {
    float: right;
    height: 55px;
    width: 15%;
    text-align: center;
}

.account-btn {
    margin-top: 8px;
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
            color: #E87261;
            &:link,
            &:visited,
            &:hover,
            &:active {
                background-color: #FFFFFF;
            }
        }
    }
    .account-item {
        display: none;
    }
}

@media (max-width: 900px) {
    .header-logo {
        width: 20%;
    }
    .header-account {
        width: 20%;
    }
    .header-nav {
        width: 60%;
        ul {
            margin: 0 0 0 5px;
            li {
                margin-right: 5px;
                a {
                    width: 50px;
                    i {
                        display: inline;
                    }
                    span {
                        display: none;
                    }
                }
            }
        }
    }
}

@media (max-width: 600px) {
    .header-logo {
        width: 25%;
    }
    .header-account {
        width: 25%;
    }
    .header-nav {
        width: 50%;
    }
}

@media (max-width: 480px) {
    .header-logo {
        width: 20%;
        img.logo {
            display: none;
        }
        img.mini-logo {
            display: inline-block;
        }
    }
    .header-account {
        display: none;
    }
    .header-nav {
        width: 80%;
        ul {
            margin: 0;
            li {
                margin-right: 0;
            }
            .account-item {
                display: inline;
            }
        }
    }
}
</style>