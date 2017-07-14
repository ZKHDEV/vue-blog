<template>
    <div class="footer-container">
        <div class="container">
            <span class="copyright-text">版权所有 &copy; 2017 Macro之家</span>
            <ul class="help-list">
                <li>
                    <a href="javascript:void(0)">关于我们</a>
                </li>
                <li>
                    <a href="javascript:void(0)">联系我们</a>
                </li>
                <li>
                    <a href="javascript:void(0)">加入我们</a>
                </li>
                <li>
                    <a href="javascript:void(0)">广告平台</a>
                </li>
                <li>
                    <a href="javascript:void(0)">帮助中心</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer-container {
    height: 60px;
    line-height: 60px;
    background: #FFFFFF url(../../assets/ColorLine.jpg);
    background-repeat: repeat-x;
    background-position-y: 55px;
}

.copyright-text {
    font-size: 14px;
    color: #666666;
}

.help-list {
    list-style: none;
    float: right;
    margin: 0;
    padding: 0;
    height: 60px;
    li {
        float: left;
        margin: 0 20px;
        a {
            font-size: 13px;
            &:link,
            &:visited,
            &:hover,
            &:active {
                color: #333333;
                text-decoration: none;
            }
        }
    }
}
</style>