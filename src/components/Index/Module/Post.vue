<template>
    <v-theme-card :paddingVer="20" :paddingHor="50">
        <h1 class="post-title">{{post.title}}</h1>
        <div class="post-note">
            <router-link :to="{ name: 'index', params: { uid: post.user.id } }"><img :src="post.user.avatar ? require(`assets/images/${post.user.avatar}`) : defAvatar"/></router-link>
            <div class="post-info">
                <p class="post-info-one">
                    <span class="post-author">{{post.user.nickName || post.user.phone}}</span>
                </p>
                <p class="post-info-two">
                    <span class="post-time">{{post.createDate}}</span>
                    <span class="post-read">阅读 {{post.readNum}}</span>
                    <span class="post-comment">评论 {{post.commentNum}}</span>
                    <span class="post-like">喜欢 {{post.likeNum}}</span>
                </p>
            </div>
            <!-- <v-button class="edit-btn" type="inverse" color="one" :height="30" :width="90" :fontSize="14">编辑文章</v-button> -->
        </div>
        <v-markdown-content :content="post.content"></v-markdown-content>
        <v-split :spacing="40"></v-split>
        <v-button class="post-like-btn" type="switch" :on="post.like" color="two" :height="60" :width="130" :fontSize="18" @click="handleLike">
            <i :class="['fa', post.like ? 'fa-heart' : 'fa-heart-o']"></i> 喜欢 | {{post.likeNum}}</v-button>
    </v-theme-card>
</template>
<script>

export default {
    props: ['postId'],
    data() {
        return {
            post: {
                id: '',
                title: '',
                createDate: '',
                readNum: '',
                commentNum: '',
                likeNum: '',
                content: '',
                like: false,
                user: {
                    id: '',
                    avatar: '',
                    phone: '',
                    nickName: ''
                }
            },
            defAvatar: require('assets/images/avatar.png')
        }
    },
    watch: {
        postId(){
            this.init();
        }
    },
    methods: {
        handleLike() {
            this.$http.post('/post/like', {id:this.post.id,like:!this.post.like}).then((response) => {
                if(response.data.code === 0){
                    this.post.like = !this.post.like;
                    if(this.post.like) {
                        this.post.likeNum++;
                    } else {
                        this.post.likeNum--;
                    }
                }
            });
        },
        init(){
            this.post = {
                id: '',
                title: '',
                createDate: '',
                readNum: '',
                commentNum: '',
                likeNum: '',
                content: '',
                like: false,
                user: {
                    id: '',
                    avatar: '',
                    phone: '',
                    nickName: ''
                }
            };
            this.initPost();
        },
        initPost() {
            this.$http.get(`/post/get_post/${this.postId}`).then((response) => {
                if(response.data.code === 0){
                    this.post = response.data.data;
                }
            });
        }
    },
    components: {
        'v-button': resolve => require(['../components/Button.vue'], resolve),
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
        'v-split': resolve => require(['../components/Split.vue'], resolve),
        'v-markdown-content': resolve => require(['../components/MarkdownContent.vue'], resolve),
    },
    mounted() {
        this.init();
    }
}
</script>
<style lang="scss" scoped>
.post-title {
    font-size: 30px;
}

.post-note {
    img {
        float: left;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        cursor: pointer;
    }
    &:before,
    &:after {
        display: table;
        content: '';
        clear: both;
    }
    .edit-btn{
        margin: 10px 0;
        float: right;
    }
}

.post-info {
    float: left;
    height: 50px;
    margin-left: 16px;
    >p {
        height: 25px;
        margin: 0;
    }
}

.post-info-one {
    box-sizing: border-box;
    padding-top: 4px;
    font-size: 14px;
    color: #000000;
}

.post-info-two {
    box-sizing: border-box;
    padding-top: 6px;
    font-size: 12px;
    color: #999999;
    span {
        margin-right: 6px;
    }
}

.post-content {
    margin-top: 40px;
    line-height: 1.7;
    color: #000000;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.post-like-btn {
    display: block;
    margin: 0 auto 20px;
}
</style>
