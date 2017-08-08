<template>
    <div class="v-theme-card">
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
        }
    },
    computed: {
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
.v-theme-card {
    padding: 12px 0;
    border-radius: 6px;
    overflow: hidden;
    background: #FFFFFF url(../../../assets/ColorLine.jpg);
    // background-position-x: -40px;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
}
</style>
