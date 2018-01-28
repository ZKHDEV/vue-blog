<template>
    <v-card>
        <div class="cate-back">
            <ul class="cate-list">
                <li v-for="item in cateList">
                    <router-link :class="['cate-item', {'active':item.val===curCate}]" :to="{ name: 'cate', params: { cateId: item.val } }">{{item.txt}}</router-link>
                </li>
            </ul>
        </div>
    </v-card>
</template>
<script>
export default {
    props: ['uid','cateId'],
    data() {
        return {
            cateList: []
        }
    },
    watch: {
      uid() {
          this.init();
      }
    },
    computed: {
        curCate() {
            return this.cateId;
        }
    },
    methods: {
        handleClick(key) {
            // 页面跳转
            this.currentItem = key;
        },
        init() {
            this.cateList.splice(0,this.cateList.length);
            this.initCate();
        },
        initCate() {
            this.$http.get(`/cate/get_kv_list_by_uid/${this.uid}`).then((response) => {
                if(response.data.code === 0){
                    this.cateList = [{val:null,txt:'全部'}];
                    this.cateList.push(...response.data.data);
                }
            });
        }
    },
    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve),
    },
    mounted() {
        this.init();
    }
}
</script>
<style lang="scss" scoped>
@import '../../../static/scss/variables.scss';
.cate-back {
    padding-left: 6px;
    background: #FFFFFF url('../../../assets/' + $theme-lace-image-name-v);
}

.cate-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cate-item {
    display: block;
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-decoration: none;
    color: #000000;
    &:link,
    &:visited {
        background-color: #FFFFFF;
    }
    &:hover,
    &:active {
        background-color: rgba(#FFFFFF, .8);
    }
    &.active{
        background-color: rgba(#FFFFFF, .8);
    }
}
</style>
