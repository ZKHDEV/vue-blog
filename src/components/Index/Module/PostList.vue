<template>
    <v-theme-card class="v-post-card" :paddingVer="20" :paddingHor="20">
        <template v-for="post in postList">
            <div class="post-item" :key="post.id">
                <img class="post-img" :src="post.cover"></img>
                <div class="post-note">
                    <img :src="user.avatar" @click="handleAuthor"></img>
                    <span class="post-note-name">{{user.nickName ? user.nickName : user.phone}}</span>
                    <span class="post-note-time">{{post.dateTime}}</span>
                </div>
                <router-link class="post-link" :to="{ name: 'post', params: { postId: post.id } }">
                    <h1 class="post-title">{{post.title}}</h1>
                </router-link>
                <div class="post-summary">{{post.summary}}...</div>
                <div class="post-info">
                    <i class="fa fa-eye"></i>{{post.readNum}}
                    <i class="fa fa-comment"></i>{{post.commentNum}}
                    <i class="fa fa-heart"></i>{{post.likeNum}}
                </div>
            </div>
        </template>
        <v-button class="post-load" v-show="postList.length !== total" color="two" :height="40" :width="100" :fontSize="13" @click="loadMore">加载更多</v-button>
    </v-theme-card>
</template>
<script>
export default {
    data() {
        return {
            user: null,
            postList: [],
            currentPage: 0,
            total: 0
        }
    },
    methods: {
        handleAuthor() {

        },
        showPost(id){
            this.$router.push({ name: 'post', params: { postId: id } });
        },
        //初始化文章卡片
        initCard() {
            const phone = this.$route.params.phone;
            this.$http.get(`/get_user/${phone}`).then((response) => {
                if(response.data.code === 0){
                    this.user = response.data.data;
                    this.loadMore();
                } else {
                    //TODO:若用户不存在跳转到错误页面
                }
            });
        },
        loadMore() {
            this.currentPage++;
            this.$http.post('/post/get_page',{phone:this.user.phone,pageNum:this.currentPage}).then((response) => {
                if(response.data.code === 0){
                    const page = response.data.data;
                    if(this.postList.length === 0){
                        this.postList = page.data;
                        this.total = page.total;
                    } else {
                        for(let post of page.data){
                            this.postList.push(post);
                        }
                    }
                }
            });
        }
    },
    components: {
        'v-button': resolve => require(['../components/Button.vue'], resolve),
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
    },
    mounted() {
        this.initCard();
    }
}
</script>
<style lang="scss" scoped>
.v-post-card {
    font-size: 14px;
    color: #000000;
}

.post-item {
    padding: 10px 0;
    border-bottom: 1px solid #CCCCCC;
}

.post-img {
    float: right;
    position: relative;
    top: 10px;
    margin: 0 0 10px 10px;
    height: 120px;
    width: 150px;
    border-radius: 3px;
    cursor: pointer;
}

.post-note {
    height: 30px;
    line-height: 30px;
    img {
        float: left;
        height: 30px;
        width: 30px;
        border-radius: 15px;
        cursor: pointer;
    }
    .post-note-name {
        float: left;
        margin-left: 10px;
    }
    .post-note-time {
        float: left;
        margin-left: 10px;
        color: #999999;
    }
}

.post-link{
    color: #000000;
    &:link,
    &:visited{
        text-decoration: none;
    }
    &:hover,
    &:active {
        text-decoration: underline;
    }
}

.post-title {
    margin: 10px 0;
    font-size: 20px;
}

.post-summary {
    font-size: 14px;
}

.post-info {
    margin-top: 15px;
    color: #999999;
    i {
        margin-left: 8px;
        margin-right: 3px;
        &:first-child {
            margin-left: 0;
        }
    }
}

.post-load {
    display: block;
    margin: 10px auto 0;
}
</style>
