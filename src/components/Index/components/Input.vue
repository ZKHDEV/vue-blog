<template>
    <input :type="type" class="v-input" :style="style" :placeholder="placeholder"/>
</template>
<script>
export default {
    props: {
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        height: {
            type: Number,
            default: 40
        }
    },
    computed: {
        style() {
            let ret = {};

            ret.height = `${this.height}px`;

            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~scss_vars';
.v-input {
    box-sizing: border-box;
    margin: 5px 0;
    padding: 12px 15px;
    display: inline-block;
    width: 100%;
    box-shadow: $theme-box-shadow inset;
    outline-style: none;
    background-color: #F0EFEE;
    border: none;
    border-radius: 6px;
    vertical-align: top;
    color: #000000;
    font-size: 14px;
}
</style>
