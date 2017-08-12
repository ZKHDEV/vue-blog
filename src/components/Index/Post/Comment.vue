<template>
    <v-theme-card :paddingVer="50" :paddingHor="50">
        <div class="comment-field">
            <div class="comment-field-avatar">
                <img src=""></img>
            </div>
            <div class="comment-field-form">
                <v-textarea placeholder="写下你的评论..."></v-textarea>
                <v-button class="comment-form-btn" color="four" :height="40" :width="80" :fontSize="16">发送</v-button>
                <v-button class="comment-form-btn" type="link" color="gray" :height="40" :width="80" :fontSize="16">取消</v-button>
            </div>
        </div>
        <template v-for="item in 3">
            <div class="comment-item">
                <div class="comment-note">
                    <img src=""></img>
                    <div class="comment-info">
                        <p class="comment-info-one">
                            <span class="comment-author">我的昵称</span>
                        </p>
                        <p class="comment-info-two">
                            <span class="comment-time">1小时前</span>
                        </p>
                    </div>
                </div>
                <div class="comment-content">
                    测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                </div>
                <div class="comment-feedback">
                    <v-button type="linkSwitch" color="two" :fontSize="13" :on="isLike" :width="40" :height="20" @click="handleLike">
                        <i class="fa fa-thumbs-o-up"></i> 赞</v-button>
                    <v-button type="link" color="gray" :fontSize="13" :width="50" :height="20">
                        <i class="fa fa-comment-o"></i> 评论</v-button>
                    <v-button class="feedback-btn" type="link" color="gray" :fontSize="13" :width="30" :height="20">举报</v-button>
                </div>
                <div class="comment-reply">
                    <template v-for="item in 3">
                        <div class="comment-reply-item">
                            <div class="reply-people">
                                <v-button type="link" color="four" :fontSize="14">@我的昵称</v-button>：
                                <v-button type="link" color="four" :fontSize="14">@对方昵称</v-button>
                            </div>
                            测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                            <div class="reply-feedback">
                                <span class="reply-time">1小时前</span>
                                <v-button type="link" color="gray" :fontSize="13" :width="50" :height="20">
                                    <i class="fa fa-comment-o"></i> 回复</v-button>
                                <v-button class="feedback-btn" type="link" color="gray" :fontSize="13" :width="30" :height="20">举报</v-button>
                            </div>
                        </div>
                    </template>
                    <div class="reply-more">
                        <span class="reply-more-info">还有4条评论，</span>
                        <v-button type="link" color="four" :fontSize="13">展开查看</v-button>
                    </div>
                    <div class="reply-form">
                        <v-textarea placeholder="写下你的评论..."></v-textarea>
                        <v-button class="reply-form-btn" color="four" :height="40" :width="80" :fontSize="16">发送</v-button>
                        <v-button class="reply-form-btn" type="link" color="gray" :height="40" :width="80" :fontSize="16">取消</v-button>
                    </div>
                </div>
            </div>
        </template>
    </v-theme-card>
</template>
<script>
export default {
    data() {
        return {
            isLike: false
        }
    },
    methods: {
        handleLike() {
            this.isLike = !this.isLike;
        }
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
    &::before,
    &::after {
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
    &::before,
    &::after {
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
    &::before,
    &::after {
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
