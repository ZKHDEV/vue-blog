<template>
    <v-card class="v-assist-card">
        <ul class="accordion">
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(0)">
                    <b>最新文章</b>
                    <span class="acc-label">{{postList.length}}</span>
                </a>
                <ul class="acc-content submenu">
                    <li v-for="item in postList" :key="item.val">
                        <router-link :to="{ name: 'post', params: { postId: item.val } }">{{item.txt}}</router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(1)">
                    <b>分类</b>
                    <span class="acc-label">{{cateList.length}}</span>
                </a>
                <ul class="acc-content submenu">
                    <li v-for="item in cateList" :key="item.val">
                        <router-link :to="{ name: 'cate', params: { cateId: item.val } }">{{item.txt}}</router-link>
                    </li>
                </ul>
            </li>
            <!-- <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(2)">
                    <b>日期</b>
                    <span class="acc-label">{{dateList.length}}</span>
                </a>
                <ul class="acc-content submenu">
                    <li v-for="item in dateList" :key="item.val">
                        <a :href="item.url">{{item.title}}</a>
                    </li>
                </ul>
            </li> -->
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(3)">
                    <b>分享</b>
                </a>
                <div class="acc-content share-content">
                    <div class="share-info">扫码分享</div>
                    <img class="share-code" src=""></img>
                </div>
            </li>
        </ul>
    </v-card>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            phone: '',
            showIndex: 0,
            postList: [],
            cateList: [],
            dateList: [
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' }
            ]
        }
    },
    methods: {
        showMenu(index) {
            if (index !== this.showIndex) {
                this.showIndex = index;
                const accs = $('.acc-content');
                accs.slideUp(300);
                setTimeout(() => {
                    accs.eq(index).slideDown(300);
                }, 300);
            }
        },
        //初始化
        init(){
            this.initPhone();
            this.initNewPostList();
            this.initCateList();
        },
        //初始化手机号
        initPhone(){
            this.phone = this.$route.params.phone;
        },
        //初始化最新文章列表
        initNewPostList(){
            this.$http.get(`/post/get_new_kv_list_by_phone/${this.phone}`).then((response) => {
                if(response.data.code === 0){
                    this.postList = response.data.data;
                }
            });
        },
        //初始化分类列表
        initCateList(){
            this.$http.get(`/cate/get_kv_list_by_phone/${this.phone}`).then((response) => {
                if(response.data.code === 0){
                    this.cateList = response.data.data;
                }
            });
        }
    },
    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve),
    },
    mounted() {
        this.init();
    }
}
</script>
<style lang="scss" scoped>
@import '../../../static/scss/variables.scss';
.v-assist-card {
    background-color: #FFFFFF;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.accordion>li {
    overflow: hidden;

    .acc-btn {
        display: block;
        padding: 15px 30px;
        height: 20px;
        line-height: 20px;
        background-color: #E87261;
        text-decoration: none;
        font-size: 16px;
        color: #FFFFFF;
    }

    .acc-label {
        display: inline-block;
        float: right;
        height: 20px;
        padding: 0 10px;
        border-radius: 10px;
        background-color: #F2F2F2;
        font-size: 12px;
        font-weight: 400;
        color: #000000;
    }

    .acc-content {
        display: none;
    }

    &:first-child {
        .acc-content {
            display: block;
        }
    }

    .submenu {
        padding: 20px 0;
        a {
            display: block;
            height: 20px;
            line-height: 20px;
            padding: 8px 24px;
            border-left: 6px solid transparent;
            font-size: 16px;
            color: #000000;
            text-decoration: none;
            &:hover {
                border-color: #E87261;
            }
        }
    }
}

@mixin acc-color($color) {
    .acc-btn {
        background-color: $color;
    }
    .submenu {
        a:hover {
            border-color: $color;
        }
    }
}

.accordion>li:nth-child(1) {
    @include acc-color($theme-color-two);
}

.accordion>li:nth-child(2) {
    @include acc-color($theme-color-one);
}

.accordion>li:nth-child(3) {
    @include acc-color($theme-color-four);
}

.accordion>li:nth-child(4) {
    @include acc-color($theme-color-three);
}

.share-content {
    padding: 30px 50px;
}

.share-info {
    float: left;
    margin-top: 20px;
    width: 57px;
    height: 72px;
    font-size: 28px;
    font-weight: 600;
    color: #E87261;
}

.share-code {
    float: right;
    width: 120px;
    height: 120px;
}

.share-content:after {
    display: block;
    content: '';
    clear: both;
}
</style>
