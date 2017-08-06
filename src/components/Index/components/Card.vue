<template>
    <div class="v-card" :style="style">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        backgroundColor: {
            type: String,
            default: '#FFFFFF'
        },
        height: Number
    },
    computed: {
        style() {
            let ret = {};

            ['backgroundColor','height'].forEach(prop => {
                if (typeof this[prop] === 'number') {
                    ret[prop] = this[prop] + 'px';
                } else {
                    ret[prop] = this[prop];
                }
            });
            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
.v-card {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
}
</style>
