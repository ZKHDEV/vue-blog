<template>
    <div class="v-theme-card" :style="themeStyle">
        <div :style="style">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        paddingVer: {
            type: Number,
            default: 50
        },
        paddingHor: {
            type: Number,
            default: 50
        },
        backgroundColor: {
            type: String,
            default: '#FFFFFF'
        },
        backPosX: {
            type: Number,
            default: 0
        }
    },
    computed: {
        themeStyle() {
            let ret = {};
            ret.backgroundPositionX = `${this.backPosX}px`;

            return ret;
        },
        style() {
            let ret = {};

            ret.paddingLeft = ret.paddingRight = `${this.paddingHor}px`;
            ret.paddingTop = ret.paddingBottom = `${this.paddingVer}px`;
            ret.backgroundColor = this.backgroundColor;

            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../static/scss/variables.scss';
.v-theme-card {
    padding: 12px 0;
    border-radius: 6px;
    overflow: hidden;
    background: #FFFFFF url('../../../assets/' + $theme-lace-image-name);
    box-shadow: $theme-box-shadow;
}
</style>
