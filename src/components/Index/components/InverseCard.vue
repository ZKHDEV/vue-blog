<template>
    <div class="v-inverse-card" :style="style">
        <slot></slot>
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
            default: '#F0EFEE'
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
.v-inverse-card {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3) inset;
}
</style>
