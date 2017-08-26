<template>
    <div class="v-row" :style="style">
        <slot></slot>
    </div>
</template>
<script>
export default {
    componentName: 'VRow',
    props: {
        top: {
            type: Number,
            default: 0
        },
        bottom: {
            type: Number,
            default: 0
        }
    },
    computed: {
        gutter() {
            let parent = this.$parent;
            while (parent && parent.$options.componentName !== 'VContainer') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        },
        style() {
            let ret = {};

            if (this.gutter) {
                ret.marginLeft = `-${this.gutter / 2}px`;
                ret.marginRight = ret.marginLeft;
            }

            ret.marginTop = `${this.top}px`;
            ret.marginBottom = `${this.bottom}px`;

            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
.v-row {
    position: relative;
    box-sizing: border-box;
}
.v-row:before,
.v-row:after {
    display: table;
    content: " ";
    clear: both;
}
</style>
