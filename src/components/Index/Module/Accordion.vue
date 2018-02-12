<template>
    <v-card class="v-accordion-card">
        <ul :class="{'active':isActive}" @mouseover="stopAnimate" @mouseout="startAnimate">
            <li :key="index" v-for="(item,index) in posts" :class="{'active':now===index}" @mouseover="now = index" :style="style">
                <img :src="item.img" @click="handleClick"/>
            </li>
        </ul>
    </v-card>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            isActive: true,    //是否激活动画
            now: 0,    //当前索引值
            interval: null,    //时间间隔器
            posts: [
                { link: 'javascript:void(0)', img: require('assets/images/temp.png') },
                { link: 'javascript:void(0)', img: require('assets/images/temp.png') },
                { link: 'javascript:void(0)', img: require('assets/images/temp.png') },
                { link: 'javascript:void(0)', img: require('assets/images/temp.png') },
                { link: 'javascript:void(0)', img: require('assets/images/temp.png') }
            ]
        }
    },
    methods: {
        //暂停动画
        stopAnimate() {
            this.isActive = false;
            clearInterval(this.interval);
            this.interval = null;
        },
        //激活动画
        startAnimate() {
            this.isActive = true;
            this.play();
        },
        //播放动画
        play() {
            this.interval = setInterval(() => {
                this.now = (this.now + 1) >= this.posts.length ? 0 : this.now + 1;
            }, 3000);
        },
        handleClick() {
            // 页面跳转
        }
    },
    computed: {
        style() {
            let ret = {};
            ret.height = `${this.height}px`;

            return ret;
        }
    },
    components: {
        'v-card': resolve => require(['../components/Card.vue'], resolve),
    },
    mounted() {
        //页面加载时开始播放动画
        this.play();
    },
    beforeDestroy() {
        //释放时间间隔器
        this.interval && clearInterval(this.interval);
    }
}
</script>
<style lang="scss" scoped>
.v-accordion-card {
    overflow: hidden;
    ul {
        position: relative;
        margin: 0;
        padding: 0;
        list-style: none;
        &:hover {
            li {
                width: 10%;
            }
        }
        li {
            width: 20%;
            float: left;
            box-shadow: 0 0 20px 2px rgba(#000000, 0.3);
            transition: all 0.5s;
            &:hover {
                width: 60%;
            }
        }
        &.active {
            li {
                width: 10%;
                &.active {
                    width: 60%;
                }
            }
        }
    }
}

img {
    cursor: pointer;
    height: 100%;
}
</style>