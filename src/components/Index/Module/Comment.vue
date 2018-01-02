<template>
    <v-theme-card :paddingVer="50" :paddingHor="50">
        <div class="comment-field">
            <div class="comment-field-avatar">
                <img :src="defAvatar"></img>
            </div>
            <div class="comment-field-form">
                <v-textarea placeholder="写下你的评论..." v-model="newComment.content"></v-textarea>
                <v-button class="comment-form-btn" color="four" :height="40" :width="80" :fontSize="16" @click="submitComment(newComment)">发送</v-button>
                <v-button class="comment-form-btn" type="link" color="gray" :height="40" :width="80" :fontSize="16" @click="newComment.content=''">取消</v-button>
            </div>
        </div>
        <template v-for="par in comments">
            <div class="comment-item">
                <div class="comment-note">
                    <img :src="par.srcUser.avatar || defAvatar"></img>
                    <div class="comment-info">
                        <p class="comment-info-one">
                            <span class="comment-author">{{par.srcUser.nickName}}</span>
                        </p>
                        <p class="comment-info-two">
                            <span class="comment-time">{{par.verDate}}</span>
                        </p>
                    </div>
                </div>
                <div class="comment-content">{{par.content}}</div>
                <div class="comment-feedback">
                    <!-- <v-button type="linkSwitch" color="two" :fontSize="13" :on="isLike" :width="40" :height="20" @click="handleLike">
                        <i class="fa fa-thumbs-o-up"></i> 赞</v-button> -->
                    <v-button type="link" color="gray" :fontSize="13" :width="50" :height="20" @click="showReplyForm(par.id,par.srcUser)">
                        <i class="fa fa-comment-o"></i> 回复</v-button>
                    <v-button class="feedback-btn" type="link" color="gray" :fontSize="13" :width="30" :height="20">举报</v-button>
                </div>
                <div class="comment-reply" v-show="par.chiCommentList || newReply.parCommentId==par.id">
                    <template v-for="chi in par.chiCommentList">
                        <div class="comment-reply-item">
                            <div class="reply-people">
                                <v-button type="link" color="four" :fontSize="14" @click="showReplyForm(par.id,chi.srcUser)">@{{chi.srcUser.nickName}}</v-button> ：
                                <v-button type="link" color="four" :fontSize="14" @click="showReplyForm(par.id,chi.tarUser)">@{{chi.tarUser.nickName}}</v-button>
                            </div>
                            {{chi.content}}
                            <div class="reply-feedback">
                                <span class="reply-time">{{chi.verDate}}</span>
                                <v-button type="link" color="gray" :fontSize="13" :width="50" :height="20" @click="showReplyForm(par.id,chi.srcUser)">
                                    <i class="fa fa-comment-o"></i> 回复</v-button>
                                <v-button class="feedback-btn" type="link" color="gray" :fontSize="13" :width="30" :height="20">举报</v-button>
                            </div>
                        </div>
                    </template>
                    <!-- <div class="reply-more">
                        <span class="reply-more-info">还有4条评论，</span>
                        <v-button type="link" color="four" :fontSize="13">展开查看</v-button>
                    </div> -->
                    <div class="reply-form" v-show="newReply.parCommentId==par.id">
                        <v-textarea :placeholder="replyUserName" v-model="newReply.content"></v-textarea>
                        <v-button class="reply-form-btn" color="four" :height="40" :width="80" :fontSize="16" @click="submitComment(newReply)">发送</v-button>
                        <v-button class="reply-form-btn" type="link" color="gray" :height="40" :width="80" :fontSize="16" @click="newReply.parCommentId=null">取消</v-button>
                    </div>
                </div>
            </div>
        </template>
    </v-theme-card>
</template>
<script>
export default {
    props: ['postId'],
    data() {
        return {
            isLike: false,
            comments: [],
            newComment: {
                content: null,
                tarUserId: null,
                postId: null
            },
            newReply:{
                content: null,
                tarUserId: null,
                postId: null,
                parCommentId: null
            },
            replyUserName: null,
            defAvatar: require('../../../assets/avatar.png')
        }
    },
    watch: {
        postId(){
            this.flushComment();
        }
    },
    methods: {
        handleLike() {
            this.isLike = !this.isLike;
        },
        submitComment(comm) {
            this.$http.post('/comment/save', comm).then((response) => {
                if(response.data.code === 0){
                    const responseComm = response.data.data;
                    if(responseComm.parComment){
                        for(let par in this.comments){
                            if(this.comments[par].id === responseComm.parComment.id){
                                this.comments[par].chiCommentList || (this.comments[par].chiCommentList = []);
                                this.comments[par].chiCommentList.push(responseComm);
                                return;
                            }
                        }
                    } else {
                        this.comments || (this.comments = []);
                        this.comments.push(response.data.data);
                    }
                }
            });
        },
        showReplyForm(commId,tarUser){
            this.replyCommId = commId;
            this.newReply = {
                content: null,
                tarUserId: tarUser.id,
                postId: this.postId,
                parCommentId: commId
            }
            this.replyUserName = `回复 ${tarUser.nickName} ：`;
        },
        flushComment() {
            this.$http.get(`/comment/get_all/${this.postId}`).then((response) => {
                if(response.data.code === 0){
                    this.comments = response.data.data;
                }
            });
            this.$http.get(`/post/get_uid_by_postid/${this.postId}`).then((response) => {
                if(response.data.code === 0){
                    this.newComment = {
                        content: "",
                        tarUserId: response.data.data,
                        postId: this.postId
                    }
                }
            });
        }
    },
    mounted(){
        this.flushComment();
    },
    components: {
        'v-button': resolve => require(['../components/Button.vue'], resolve),
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
        'v-split': resolve => require(['../components/Split.vue'], resolve),
        'v-textarea': resolve => require(['../components/Textarea.vue'], resolve),
    }
}
</script>
<style lang="scss" scoped>
@import '../../../static/scss/variables.scss';
.comment-field {
    &:before,
    &:after {
        display: table;
        content: '';
        clear: both;
    }
}

.comment-field-avatar {
    float: left;
    width: 10%;
    img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
    }
}

.comment-field-form {
    float: left;
    left: 0;
    right: 0;
    width: 90%;
    .comment-form-btn {
        float: right;
        margin: 10px 0 0 10px;
    }
}

.comment-item {
    padding: 10px 0;
    margin: 10px 0;
    border-top: 1px solid #CCCCCC;
}

.comment-note {
    img {
        float: left;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
    }
    &:before,
    &:after {
        display: table;
        content: '';
        clear: both;
    }
}

.comment-info {
    float: left;
    height: 40px;
    margin-left: 16px;
    >p {
        height: 20px;
        margin: 0;
    }
}

.comment-info-one {
    box-sizing: border-box;
    font-size: 14px;
    color: #000000;
}

.comment-info-two {
    box-sizing: border-box;
    padding-top: 2px;
    font-size: 12px;
    color: #999999;
}

.comment-content {
    margin-top: 20px;
    line-height: 1.5;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 14px;
    color: #000000;
}

.comment-feedback {
    margin-top: 6px;
    .feedback-btn {
        float: right;
    }
}

.comment-reply {
    margin-top: 10px;
    padding: 10px 0 20px;
    padding-left: 20px;
    border-left: 3px solid #CCCCCC;
}

.comment-reply-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #CCCCCC;
    line-height: 1.5;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 14px;
    color: #000000;
}

.reply-people {
    float: left;
    margin-right: 10px;
}

.reply-feedback {
    @extend .comment-feedback;
}

.reply-time {
    line-height: 20px;
    font-size: 13px;
    color: $gray;
}

.reply-more-info {
    @extend .reply-time;
}

.reply-form {
    margin-top: 20px;
    &:before,
    &:after {
        display: table;
        content: '';
        clear: both;
    }
    .reply-form-btn {
        float: right;
        margin: 10px 0 0 10px;
    }
}
</style>
