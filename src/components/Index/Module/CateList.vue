<template>
    <v-card>
        <div class="cate-back">
            <ul class="cate-list">
                <template v-for="(cate,key) in cateList">
                <li>
                    <a :class="['cate-item',currentItem === key ? 'active' : '']" href="javascript:void(0);" @click="handleClick(key)">{{cate}}</a>
                </li>
                </template>
            </ul>
        </div>
    </v-card>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            cateList: ['全部','HTML','CSS','JS','JAVA','PHP'],
            currentItem: 0
        }
    },
    methods: {
        handleClick(key) {
            // 页面跳转
            this.currentItem = key;
        }
    },
    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve),
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
