<template>
    <div class="assist-card">
        <ul class="accordion">
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(0)">
                    <b>最新文章</b>
                    <span class="acc-label">{{postList.length}}</span>
                </a>
                <ul class="acc-content submenu">
                    <li v-for="item in postList">
                        <a :href="item.url">{{item.title}}</a>
                    </li>
                </ul>
            </li>
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(1)">
                    <b>分类</b>
                    <span class="acc-label">{{cateList.length}}</span>
                </a>
                <ul class="acc-content submenu">
                    <li v-for="item in cateList">
                        <a :href="item.url">{{item.title}}</a>
                    </li>
                </ul>
            </li>
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(2)">
                    <b>日期</b>
                    <span class="acc-label">{{dateList.length}}</span>
                </a>
                <ul class="acc-content submenu">
                    <li v-for="item in dateList">
                        <a :href="item.url">{{item.title}}</a>
                    </li>
                </ul>
            </li>
            <li>
                <a class="acc-btn" href="javascript:void(0)" @click="showMenu(3)">
                    <b>分享</b>
                </a>
                <div class="acc-content share-content">
                    <div class="share-info">扫码分享</div>
                    <img class="share-code" src=""></img>
                </div>
                </transition>
            </li>
        </ul>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            showIndex: 0,
            postList: [
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' }
            ],
            cateList: [
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' }
            ],
            dateList: [
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' },
                { title: '链接', url: 'https://www.baidu.com' }
            ]
        }
    },
    methods: {
        showMenu(index) {
            if (index !== this.showIndex) {
                this.showIndex = index;
                const accs = $('.acc-content');
                accs.slideUp(300);
                setTimeout(() => {
                    accs.eq(index).slideDown(300);
                }, 300);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.assist-card {
    background-color: #F2F2F2;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.accordion>li {
    overflow: hidden;

    .acc-btn {
        display: block;
        padding: 15px 30px;
        height: 20px;
        line-height: 20px;
        background-color: #E87261;
        text-decoration: none;
        font-size: 16px;
        color: #FFFFFF;
    }

    .acc-label {
        display: inline-block;
        float: right;
        height: 20px;
        padding: 0 10px;
        border-radius: 10px;
        background-color: #F2F2F2;
        font-size: 12px;
        font-weight: 400;
        color: #000000;
    }

    .acc-content {
        display: none;
    }

    &:first-child {
        .acc-content {
            display: block;
        }
    }

    .submenu {
        padding: 20px 0;
        a {
            display: block;
            height: 20px;
            line-height: 20px;
            padding: 8px 24px;
            border-left: 6px solid transparent;
            font-size: 16px;
            color: #000000;
            text-decoration: none;
            &:hover {
                border-color: #E87261;
            }
        }
    }
}

@mixin acc-color($color:#E87261) {
    .acc-btn {
        background-color: $color;
    }
    .submenu {
        a:hover {
            border-color: $color;
        }
    }
}

.accordion>li:nth-child(2) {
    @include acc-color(#F99945);
}

.accordion>li:nth-child(3) {
    @include acc-color(#47B5CF);
}

.accordion>li:nth-child(4) {
    @include acc-color(#768F93);
}

.share-content {
    padding: 30px 50px;
}

.share-info {
    float: left;
    margin-top: 20px;
    width: 57px;
    height: 72px;
    font-size: 28px;
    font-weight: 600;
    color: #E87261;
}

.share-code {
    float: right;
    width: 120px;
    height: 120px;
}

.share-content::after {
    display: block;
    content: '';
    clear: both;
}
</style>
