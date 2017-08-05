<template>
    <div class="table-container" v-title="'分类目录'">
        <v-card>
            <div class="table-operation">
                <div class="table-btn-group">
                    <el-button type="primary" @click="handleAdd">添加</el-button>
                    <el-button type="danger" :disabled="disDelete" @click="handleDeleteSelection">批量删除</el-button>
                    <el-button type="text" :disabled="disDelete" @click="handleReverseSelection">反选</el-button>
                </div>
                <el-form :inline="true" :model="search">
                    <el-form-item label="名称">
                        <el-input v-model="search.address" placeholder="名称"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </v-card>
        <v-card class="table-card">
            <el-table ref="dataTable" :data="datas" border stripe v-loading="loading" @sort-change="sortChange" @selection-change="handleSelectionChange" :default-sort="{prop: 'date',order: 'descending'}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="150" sortable="custom">
                </el-table-column>
                <el-table-column prop="total" label="总数" width="120" sortable="custom">
                </el-table-column>
                <el-table-column prop="date" label="创建日期" show-overflow-tooltip sortable="custom">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleView(scope.$index, scope.row)" type="primary" size="small">查看</el-button>
                        <el-button @click="handleEdit(scope.$index, scope.row)" type="success" size="small">编辑</el-button>
                        <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </v-card>
        <!--添加/修改模块开始-->
        <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
            <el-input v-model="dialog.cateName" placeholder="请输入分类名称"></el-input>
            <div slot="footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" :disabled="dialog.cateName == ''" @click="submitForm(dialog.targetUrl)" :loading="dialog.isSubmitting">保存</el-button>
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
                name: ''
            },
            filter: null,
            datas: [{ name: '分类1', total: 10, date: '2017-06-25 00:00:00' },
            { name: '分类2', total: 16, date: '2017-06-25 00:00:00' },
            { name: '分类3', total: 20, date: '2017-06-25 00:00:00' }],
            order: {
                prop: 'date',
                order: 'descending'
            },
            multipleSelection: [],
            disDelete: true,
            loading: false,
            dialog: {
                visible: false,
                title: '',
                cateName: '',
                isSubmitting: false,
                targetUrl: ''
            }
        }
    },

    methods: {
        // 提示信息
        showNotify(msg) {
            this.$notify({
                title: '提示',
                message: msg,
                duration: 6000
            });
        },
        handleSelectionChange(val) {
            this.disDelete = val.length == 0;
            this.multipleSelection = val;
        },
        // 反选
        handleReverseSelection() {
            this.datas.forEach(row => this.$refs.dataTable.toggleRowSelection(row));
        },
        // 批量删除
        handleDeleteSelection() {
            for (let item in this.multipleSelection) {
                //TODO: 服务端删除各项内容
            }
        },
        // 查看处理
        handleView(index, row) {
            //TODO:跳转到分类页面
        },
        // 添加处理
        handleAdd() {
            this.dialog = {
                visible: true,
                title: '添加分类',
                cateName: '',
                isSubmitting: false,
                targetUrl: '/addCate'
            }
        },
        // 修改处理
        handleEdit(index, row) {
            this.dialog = {
                visible: true,
                title: '修改分类',
                cateName: row.name,
                isSubmitting: false,
                targetUrl: '/editCate'
            }
        },
        // 删除处理
        handleDelete(index, row) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success('删除成功');
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        // 提交表单
        submitForm(url) {

        },
        handleSearch() {
            this.order = {
                prop: 'date',
                order: 'descending'
            }
            if (!(this.search.title || this.search.daterange)) {
                this.filter = null;
            } else {
                this.filter = {
                    title: this.search.title,
                    start: this.search.daterange ? toDateString(this.search.daterange[0]) : '',
                    end: this.search.daterange ? toDateString(this.search.daterange[1]) : ''
                }
            }
            this.getData();
        },
        sortChange({ prop, order }) {
            this.order = {
                prop: prop,
                order: order
            }
            this.getData();
        },
        getData() {
            const condition = {
                order: this.order,
                filter: this.filter
            }
            // this.loading = true;
            // this.$http.get('/api/user', condition).then((response) => {
            //   this.datas = response.data.datas;
            // });
            // 测试
            // this.$http.get('/api/user').then((response) => {
            //   setTimeout(() => {
            //     this.loading = false;
            //     //测试
            //     this.datas = response.data.datas;
            //     // if (response.data.success) {
            //     //   this.datas = response.data.datas;
            //     // }
            //   }, 1000);
            // }).catch((err) => {
            //   this.loading = false;
            //   this.datas = [];
            // });
        }
    },

    created() {
        // this.$http.get('/api/user').then((response) => {
        //   this.datas = response.data.datas;
        // });
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
