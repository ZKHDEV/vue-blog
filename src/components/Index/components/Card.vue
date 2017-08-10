<template>
    <div :class="['v-card',type]" :style="style">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default'
        },
        paddingVer: {
            type: Number,
            default: 0
        },
        paddingHor: {
            type: Number,
            default: 0
        },
        backgroundColor: String
    },
    computed: {
        style() {
            let ret = {};

            ret.paddingLeft = ret.paddingRight = `${this.paddingHor}px`;
            ret.paddingTop = ret.paddingBottom = `${this.paddingVer}px`;
            
            if(this.backgroundColor){
                ret.backgroundColor = this.backgroundColor;
            }

            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../static/scss/variables.scss';
.v-card {
    border-radius: 6px;
    overflow: hidden;
}

.default{
    box-shadow: $theme-box-shadow;
    background-color: #FFFFFF;
}

.inverse{
    box-shadow: $theme-box-shadow inset;
    background-color: $theme-background-color;
}
</style>
