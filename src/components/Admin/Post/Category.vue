<template>
    <div class="table-container" v-title="'分类目录'">
        <v-card>
            <div class="table-operation">
                <div class="table-btn-group">
                    <el-button type="primary" @click="handleAdd">添加</el-button>
                </div>
                <el-form :inline="true" :model="search">
                    <el-form-item label="名称">
                        <el-input v-model="search.label" placeholder="名称"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </v-card>
        <v-card class="table-card">
            <el-table ref="dataTable" :data="datas" border stripe v-loading="loading">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="label" label="名称" width="150">
                </el-table-column>
                <el-table-column prop="total" label="总数" width="120">
                </el-table-column>
                <el-table-column prop="createDate" label="创建日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleView(scope.$index, scope.row.id)" type="primary" size="small">查看</el-button>
                        <el-button @click="handleEdit(scope.$index, scope.row.id)" type="success" size="small">编辑</el-button>
                        <el-button @click="handleDelete(scope.$index, scope.row.id)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </v-card>
        <!--添加/修改模块开始-->
        <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
            <el-input ref="cateInput" v-model="saveCate.label" placeholder="请输入分类名称"></el-input>
            <div slot="footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" :disabled="saveCate.label == ''" @click="submitForm" :loading="dialog.isSubmitting">保存</el-button>
            </div>
        </el-dialog>
        <!--添加/修改模块结束-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: {
                label: ''
            },
            filter: null,
            datas: [],
            loading: false,
            dialog: {
                visible: false,
                title: '',
                isSubmitting: false
            },
            saveCate: {
                id: null,
                label: ''
            }
        }
    },

    methods: {
        // 查看处理
        handleView(index, id) {
            this.$router.push({ name: 'admin-post', query: {cateId: id} });
        },
        // 添加处理
        handleAdd() {
            this.saveCate = {
                id: null,
                label: ''
            }
            this.dialog = {
                visible: true,
                title: '添加分类',
                isSubmitting: false
            }
        },
        // 修改处理
        handleEdit(index, id) {
            this.$http.get(`/cate/get_cate/${id}`).then((response) => {
                if(response.data.code === 0){
                    const editCate = response.data.data;
                    this.saveCate = {
                        id: editCate.id,
                        label: editCate.label
                    }
                    this.dialog = {
                        visible: true,
                        title: '修改分类',
                        isSubmitting: false
                    }
                }
            });
        },
        // 删除处理
        handleDelete(index, id) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(`/cate/delete/${id}`).then((response) => {
                    if(response.data.code === 0){
                        this.$message.success('删除成功');
                        this.flushData();
                    }
                });
            }).catch((err) => {
                
            });
        },
        // 提交表单
        submitForm() {
            this.dialog.isSubmitting = true;
            this.$http.post('/cate/save', this.saveCate).then((response) => {
                this.dialog.isSubmitting = false;
                if(response.data.code === 0){
                    this.dialog.visible = false;
                    this.$message.success('操作成功');
                    this.flushData();
                } else {
                    this.$message.error(response.data.msg);
                    this.$refs.cateInput.$el.children[0].select();
                }
            });
        },
        handleSearch() {
            this.flushData();
        },
        // 刷新数据
        flushData() {
            this.loading = true;
            this.$http.post('/cate/search', { label: this.search.label }).then((response) => {
            if(response.data.code === 0){
                this.datas = response.data.data;
            }
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
                this.datas = [];
            });
        }
    },

    created() {
        this.flushData();
    },

    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve)
    }
}
</script>

<style lang="scss" scoped>
.table-operation {
    padding: 10px 22px;
}

.table-btn-group {
    float: right;
}

.table-card {
    padding: 0;
}

.table-pagination {
    border: 0;
    padding: 10px;
    text-align: right;
}

.el-form-item {
    margin-bottom: 0;
}
</style>
