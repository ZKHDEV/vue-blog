<template>
    <div>
        <hr :style="style"/>
    </div>
</template>
<script>
export default {
    props: {
        spacing: {
            type: Number,
            default: 10
        }
    },
    computed: {
        style() {
            let ret = {};

            ret.marginTop = ret.marginBottom = `${this.spacing}px`;

            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
hr {
    height: 1px;
    border: none;
    border-top: 1px solid #CCCCCC;
}
</style>
