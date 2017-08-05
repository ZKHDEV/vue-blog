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
                    <markdown-editor v-model="post.content" ref="markdownEditor"></markdown-editor>
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
                            <el-button type="success" size="small">保存草稿</el-button>
                            <el-button size="small">预览</el-button>
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
                                <el-switch v-model="post.top" :on-value="1" :off-value="0" on-text="是" off-text="否"></el-switch>
                        </div>
                        <div>
                            <i class="fa fa-eye"></i>状态：{{post.type === 0 ? '草稿' : '已发布'}}
                        </div>
                        <div v-if="post.mtime">
                            <i class="fa fa-calendar"></i>保存时间：{{post.mtime}}
                        </div>
                    </div>
                    <div class="card-operation">
                        <el-button type="primary" size="small">发 布</el-button>
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
                            <el-checkbox-group v-model="post.categories">
                                <el-checkbox v-for="cate in cateList" :label="cate.id">{{cate.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-button type="text" class="add-cate-btn" @click="showCateInput">
                            <i class="fa fa-plus"></i>新建分类</el-button>
                        <div class="cate-form" v-show="showAddCate">
                            <el-input ref="saveCateInput" v-model="newCate" placeholder="新分类名"></el-input>
                            <el-button>添加新分类</el-button>
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
                        <el-tag :key="tag" v-for="tag in post.tags" :closable="true" :close-transition="false" @close="handleTagDel(tag)">
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
import { markdownEditor } from 'vue-simplemde'
export default {
    data() {
        return {
            post: {    //新文章实体
                title: '',
                content: '',
                summary: '',
                type: 0,
                public: 0,
                categories: [],
                tags: ['标签tag1'],
                mtime: '2017-06-29',
                top: 0
            },
            showAddCate: false,    //显示新建分类表单
            showAddTag: false,    //显示新建标签表单
            cateList: [{ id: 1, name: '分类1' }, { id: 2, name: '分类2' }, { id: 3, name: '分类3' }],    //分类列表
            newCate: '',    //新建分类名称
            newTag: '',    //新建标签名
        }
    },
    methods: {
        //分类模块业务逻辑
        showCateInput() {
            this.showAddCate = true;
            this.$nextTick(() => {
                this.$ref.saveCateInput.focus();
            });
        },
        //标签模块业务逻辑
        handleTagDel(tag) {
            this.post.tags.splice(this.post.tags.indexOf(tag), 1);
        },
        showTagInput() {
            this.showAddTag = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.newTag;
            if (inputValue) {
                this.post.tags.push(inputValue);
            }
            this.showAddTag = false;
            this.newTag = '';
        }
    },
    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve),
        markdownEditor
    },
    mounted() {
        this.$nextTick(()=>{
            document.querySelector('.editor-toolbar').style.zIndex = 1001;
            document.querySelector('.CodeMirror.cm-s-paper.CodeMirror-wrap').style.zIndex = 1001;
        });
    }
}
</script>

<style lang="scss" scoped>
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