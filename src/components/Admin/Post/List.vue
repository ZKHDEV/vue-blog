<template>
  <div class="table-container" v-title="'文章'">
    <div class="card">
      <div class="table-operation">
        <div class="table-btn-group">         
          <el-button type="danger" :disabled="disDelete" @click="handleDeleteSelection">移至回收站</el-button>
          <el-button type="text" :disabled="disDelete" @click="handleReverseSelection">反选</el-button>
        </div>
        <el-form :inline="true" :model="search">
          <el-form-item label="标题">
            <el-input v-model="search.address" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="search.daterange" type="daterange" placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card table-card">
      <el-table ref="dataTable" :data="datas" border stripe v-loading="loading" @sort-change="sortChange" @selection-change="handleSelectionChange" :default-sort="{prop: 'date',order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="150" sortable="custom">
        </el-table-column>
        <el-table-column prop="group" label="分类" width="120" sortable="custom">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="120" sortable="custom">
        </el-table-column>
        <el-table-column prop="comment" label="评论" width="90" sortable="custom">
        </el-table-column>
        <el-table-column prop="like" label="赞" width="90" sortable="custom">
        </el-table-column>
        <el-table-column prop="click" label="点击" width="90" sortable="custom">
        </el-table-column>
        <el-table-column prop="date" label="日期" show-overflow-tooltip sortable="custom">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleEdit(scope.$index, scope.row)" type="success" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">回收</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        daterange: null,
        title: ''
      },
      filter: null,
      datas: [{id:1,title:'TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle',group:'Group',tag:'Tag',comment:'Comment',like:'Like',click:'Click',date:'Date'},
      {id:2,title:'Title',group:'Group',tag:'Tag',comment:'Comment',like:'Like',click:'Click',date:'Date'},
      {id:3,title:'Title',group:'Group',tag:'Tag',comment:'Comment',like:'Like',click:'Click',date:'Date'}],
      order: {
        prop: 'date',
        order: 'descending'
      },
      multipleSelection: [],
      currentPage: 1,
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
    // 修改处理
    handleEdit(index, row) {
      this.$router.push({name:'post-edit',params:{postId:row.id}});
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
    handleCurrentChange() {
      this.getData();
    },
    handleSearch() {
      this.currentPage = 1;
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
      this.currentPage = 1;
      this.getData();
    },
    getData() {
      const condition = {
        page: this.currentPage,
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
  }
}
</script>

<style lang="scss" scoped>
.table-operation {
  padding: 0 12px;
}

.table-btn-group {
  float: right;
}

.table-card{
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
