<template>
  <div class="table-container" v-title="'文章'">
    <v-card>
      <div class="table-search">
        <el-form ref="searchForm" :inline="true" :model="search">
          <el-form-item label="标题" prop="title">
            <el-input v-model="search.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="cateId">
            <el-select v-model="search.cateId" placeholder="请选择分类">
              <el-option v-for="item in cateSet" :key="item.val" :label="item.txt" :value="item.val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-input v-model="search.tags" placeholder="标签"></el-input>
          </el-form-item>
          <el-form-item label="置顶" prop="top">
            <el-select v-model="search.top" placeholder="是否置顶">
              <el-option v-for="item in [{txt:'',val:null},{txt:'是',val:1},{txt:'否',val:0}]" :key="item.val" :label="item.txt" :value="item.val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="daterange">
            <el-date-picker v-model="daterange" type="daterange" placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </v-card>
    <v-card class="table-card">
      <el-table ref="dataTable" :data="datas" border stripe v-loading="loading" @sort-change="sortChange" @selection-change="handleSelectionChange" :default-sort="{prop: 'date',order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="150" sortable="custom">
        </el-table-column>
        <el-table-column prop="categories" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="120">
        </el-table-column>
        <el-table-column prop="commentNum" label="评论" width="90" sortable="custom">
        </el-table-column>
        <el-table-column prop="likeNum" label="赞" width="80" sortable="custom">
        </el-table-column>
        <el-table-column prop="readNum" label="点击" width="90" sortable="custom">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="85">
          <template scope="scope">
            {{scope.row.state === 1 ? '发布' : '草稿'}}
          </template>
        </el-table-column>
        <el-table-column prop="top" label="置顶" width="85">
          <template scope="scope">
            <el-switch v-model="scope.row.top" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="日期" show-overflow-tooltip sortable="custom">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleView(scope.row.id)" type="primary" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" type="success" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row.id)" type="danger" size="small">回收</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-bottom">
        <div class="table-btn-group">
          <el-button type="danger" :disabled="disDelete" @click="handleDeleteSelection">移至回收站</el-button>
          <el-button type="text" :disabled="disDelete" @click="handleReverseSelection">反选</el-button>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="0" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="pageSizes">
        </el-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import {toDateString} from '../../../static/js/utils.js'
export default {
  data() {
    return {
      search: {
        title: '',
        cateId: '',
        tags: '',
        top: null,
        start: '',
        end: '',
        pageNum: 1,
        pageSize: 15,
        asc: true,
        orderCol: 'startTime'
      },
      daterange: null,
      cateSet: [''],
      total: 0,
      pageSizes: [15, 20, 50, 100],
      datas: null,
      multipleSelection: [],
      disDelete: true,
      loading: false
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
    // 复选框选中改变
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
      let ids = [];
      for (let item of this.multipleSelection) {
        ids.push(item.id);
      }

      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/post/delete_batch',ids).then((response) => {
          if(response.data.code === 0){
            this.$message.success('文章已移动到回收站');
            this.flushData();
          }
        });
      })
    },
    // 查看处理
    handleView(index, row) {
      //TODO:跳转到文章页面
    },
    // 修改处理
    handleEdit(index, row) {
      this.$router.push({ name: 'admin-post-edit', params: { postId: row.id } });
    },
    // 删除处理
    handleDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`/post/delete/${id}`).then((response) => {
          if(response.data.code === 0){
            this.$message.success('文章已移动到回收站');
            this.flushData();
          }
        });
      })
    },
    // 页码改变处理
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.flushData();
    },
    // 页面显示记录数改变处理
    handleSizeChange(val) {
      this.search.pageNum = 1;
      this.search.pageSize = val;
      this.flushData();
    },
    // 搜索
    handleSearch() {
      this.search.pageNum = 1;
      this.search.asc = true;
      this.search.orderCol = 'startTime';

      // 格式化时间段
      if(this.daterange){
        this.search.start = toDateString(this.daterange[0]);
        this.search.end = toDateString(this.daterange[1]);
      }

      this.flushData();
    },
    // 重置搜索
    resetSearch() {
      this.$refs.searchForm.resetFields();
    },
    // 排序规则改变处理
    sortChange({ prop, order }) {
      this.search.pageNum = 1;
      this.search.asc = order === 'descending' ? false : true;
      this.search.orderCol = prop ? prop : 'startTime';
      this.flushData();
    },
    // 刷新数据
    flushData() {
      this.loading = true;
      this.$http.post('/post/search', this.search).then((response) => {
        if(response.data.code === 0){
          const page = response.data.data;
          this.total = page.total;
          this.datas = page.data;
        }
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.datas = null;
      })
    },
    // 初始化分类列表
    initCateList() {
      this.$http.get('/cate/get_select').then((response) => {
        for(let cate of response.data.data){
          this.cateSet.push(cate);
        }
      });
    }
  },
  mounted() {
    this.initCateList();
    this.flushData();
  },

  components: {
    'v-card': resolve => require(['../components/Card.vue'], resolve)
  }
}
</script>

<style lang="scss" scoped>
.table-search {
  padding: 10px 22px;
  .el-form-item{
    margin: 0 20px 10px 0;
  }
}

.table-btn-group {
  float: left;
}

.table-card {
  padding: 0;
}

.table-bottom {
  border: 0;
  padding: 10px;
  text-align: right;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
