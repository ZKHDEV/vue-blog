<template>
    <div class="newpost-container" v-title="'写文章'">
        <el-row :gutter="10">
            <el-col :span="18">
                <!--标题模块开始-->
                <v-card class="padding-card">
                    <el-input v-model="post.title" placeholder="在此输入标题"></el-input>
                </v-card>
                <!--标题模块结束-->
                <!--正文模块开始-->
                <v-card class="padding-card">
                    <markdown-editor preview-class="markdown-body" v-model="post.content" ref="markdownEditor" :highlight="true"></markdown-editor>
                </v-card>
                <!--正文模块结束-->
                <!--摘要模块开始-->
                <v-card class="option-card">
                    <div class="card-header">
                        <p class="card-title">
                            <b>摘要</b>
                        </p>
                    </div>
                    <div class="card-content">
                        <el-input type="textarea" autosize placeholder="在此输入摘要" v-model="post.summary" :maxlength="200">
                        </el-input>
                    </div>
                </v-card>
                <!--摘要模块结束-->
            </el-col>
            <el-col :span="6">
                <!--发布模块开始-->
                <v-card class="option-card">
                    <div class="card-header">
                        <p class="card-title">
                            <b>发布</b>
                            <el-button type="success" size="small" @click="savePost">保存草稿</el-button>
                            <!-- <el-button size="small">预览</el-button> -->
                        </p>
                    </div>
                    <div class="card-content">
                        <div>
                            <i class="fa fa-flag"></i>类型：
                                <el-radio-group v-model="post.type">
                                    <el-radio :label="0">原创</el-radio>
                                    <el-radio :label="1">转载</el-radio>
                                </el-radio-group>
                        </div>
                        <div>
                            <i class="fa fa-chevron-circle-up"></i>置顶：
                                <el-switch v-model="post.top" :on-value="true" :off-value="false" on-text="是" off-text="否"></el-switch>
                        </div>
                        <div>
                            <i class="fa fa-eye"></i>状态：{{post.state === 0 ? '草稿' : '已发布'}}
                        </div>
                        <div v-show="post.verDate">
                            <i class="fa fa-calendar"></i>保存时间：{{post.verDate}}
                        </div>
                    </div>
                    <div class="card-operation">
                        <el-button type="danger" size="small" :disabled="post.id == null || post.state === 0" @click="unPublishPost">取消发布</el-button>                        
                        <el-button type="primary" size="small" :disabled="post.id == null" @click="publishPost">发布最新版本</el-button>
                    </div>
                </v-card>
                <!--发布模块结束-->
                <!--分类模块开始-->
                <v-card class="option-card">
                    <div class="card-header">
                        <p class="card-title">
                            <b>分类</b>
                        </p>
                    </div>
                    <div class="card-content">
                        <div class="cate-list">
                            <el-checkbox-group v-model="post.cateIds">
                                <el-checkbox v-for="cate in cateList" :label="cate.val" :key="cate.val">{{cate.txt}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-button type="text" class="add-cate-btn" @click="showCateInput">
                            <i class="fa fa-plus"></i>新建分类</el-button>
                        <div class="cate-form" v-show="showAddCate">
                            <el-input ref="saveCateInput" v-model="newCate" placeholder="新分类名"></el-input>
                            <el-button @click="handleCateSave">添加新分类</el-button>
                        </div>
                    </div>
                </v-card>
                <!--分类模块结束-->
                <!--标签模块开始-->
                <v-card class="option-card">
                    <div class="card-header">
                        <p class="card-title">
                            <b>标签</b>
                        </p>
                    </div>
                    <div class="card-content">
                        <el-tag :key="tag" v-for="tag in post.tagList" :closable="true" :close-transition="false" @close="handleTagDel(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="showAddTag" v-model="newTag" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button class="button-new-tag" v-else size="small" @click="showTagInput">+ 添加</el-button>
                    </div>
                </v-card>
                <!--标签模块结束-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { markdownEditor } from 'vue-simplemde';
export default {
    data() {
        return {
            post: {    //文章实体
                id: null,
                title: '',
                content: '',
                cover: '',
                summary: '',
                tagList: [],
                type: 0,
                state: 0,
                top: false,
                cateIds: [],
                verDate: '',
            },
            cateList: [],
            showAddCate: false,    //显示新建分类表单
            showAddTag: false,    //显示新建标签表单
            newCate: '',    //新建分类名称
            newTag: '',    //新建标签名
        }
    },
    methods: {
        //分类模块业务逻辑
        showCateInput() {
            this.showAddCate = true;
            this.$nextTick(() => {
                this.$refs.saveCateInput.$el.children[0].focus();
            });
        },
        handleCateSave() {
            this.$http.post('/cate/save', {id:null, label:this.newCate}).then((response) => {
                if(response.data.code === 0){
                    this.cateList.push(response.data.data);
                    this.newCate = '';
                    this.showAddCate = false;
                } else {
                    this.$message.error(response.data.msg);
                    this.$refs.saveCateInput.$el.children[0].select();
                }
            });
        },
        //标签模块业务逻辑
        handleTagDel(tag) {
            this.post.tagList.splice(this.post.tagList.indexOf(tag), 1);
        },
        showTagInput() {
            this.showAddTag = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            for(let tag in this.post.tagList){
                if(tag === this.newTag){
                    this.$message.error("标签已存在");
                    return;
                }
            }

            this.post.tagList.push(this.newTag);
            this.showAddTag = false;
            this.newTag = '';
        },
        //保存文章
        savePost() {
            this.post.state = 0;
            this.$http.post('/admin_post/save', this.post).then((response) => {
                if(response.data.code === 0){
                    const resPost = response.data.data;
                    this.post.id = resPost.id;
                    this.post.verDate = resPost.verDate;
                    this.$message.success('保存成功');
                } else {
                    this.$message.error(response.data.msg);
                }
            });
        },
        //发布文章
        publishPost() {
            this.$http.post(`/admin_post/publish`,{id:this.post.id,top:this.post.top}).then((response) => {
                if(response.data.code === 0){
                    this.post.state = 1;
                    this.$message.success('发布成功');
                }
            });
        },
        //取消发布文章
        unPublishPost() {
            this.$http.get(`/admin_post/unpublish/${this.post.id}`).then((response) => {
                if(response.data.code === 0){
                    this.post.state = 0;
                    this.$message.success('取消发布成功');
                }
            });
        },
        //初始化分类列表
        initCateList() {
            this.$http.get('/cate/get_all_kv_list').then((response) => {
                if(response.data.code === 0){
                    this.cateList = response.data.data;
                }
            });
        },
        //初始化文章对象
        initPost(id){
            if(id){
                this.$http.get(`/admin_post/get_post/${id}`).then((response) => {
                    if(response.data.code === 0){
                        const resPost = response.data.data;
                        this.post = {
                            id: resPost.id,
                            title: resPost.title,
                            content: resPost.content,
                            cover: resPost.cover,
                            summary: resPost.summary,
                            tagList: resPost.tagList,
                            type: resPost.type,
                            state: 0,
                            top: false,
                            cateIds: resPost.cateIds,
                            verDate: resPost.verDate
                        };
                        this.initPublish(resPost.id);
                        return;
                    }
                });
            }
            
            this.post = {
                id: null,
                title: '',
                content: '',
                wordNum: 0,
                cover: '',
                summary: '',
                tagList: [],
                type: 0,
                state: 0,
                top: false,
                cateIds: [],
                verDate: ''
            }
        },
        //初始化文章发布状态
        initPublish(id){
            this.$http.get(`/admin_post/get_publish_post/${id}`).then((response) => {
                if(response.data.code === 0){
                    this.post.state = 1;
                    this.post.top = response.data.data.top;
                }
            });
        }
    },
    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve),
        markdownEditor
    },
    watch: {
        //解决从“编辑”跳转到“写文章”时组件被重用问题
        '$route' (to, from) {
            this.initPost();
        }
    },
    mounted() {
        this.initCateList();
        this.initPost(this.$route.params.postId);
        this.$nextTick(()=>{
            // document.querySelector('.editor-toolbar').style.zIndex = 1001;
            // document.querySelector('.CodeMirror.cm-s-paper.CodeMirror-wrap').style.zIndex = 1001;
        });
    }
}
</script>

<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
.option-card {
    padding: 0;
    font-size: 14px;
    .card-content{
        div{
            margin-bottom: 6px;
        }
    }
}

.card-header {
    padding: 8px;
    border-bottom: 1px solid #EDEDED;
    .el-button {
        position: relative;
        top: -4px;
        float: right;
        margin-left: 10px;
    }
}

.card-title {
    margin: 0;
}

.card-content {
    padding: 16px;
    i {
        margin-right: 12px;
    }
}

.card-operation {
    padding: 8px;
    text-align: right;
    border-top: 1px solid #EDEDED;
    background-color: #F5F5F5;
}

.cate-list {
    height: 200px;
    border: 1px solid #EDEDED;
    padding: 12px;
    overflow: auto;
    .el-checkbox {
        display: block;
        margin: 3px 0;
    }
}

.add-cate-btn {
    i {
        margin-right: 4px;
    }
}

.cate-form {
    .el-input {
        margin-bottom: 10px;
    }
}

.input-new-tag {
    width: 54px;
}

.button-new-tag {
    line-height: 8px;
    height: 24px;
}

.el-tag {
    margin: 0 6px 6px 0;
}

.padding-card {
    padding: 10px;
}
</style>