<template>
    <button :class="['v-button',type,disabled?'disabled':'']" :style="style" type="button" @click="handleClick">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'one'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 40
        },
        width: {
            type: Number,
            default: 80
        },
        fontSize: {
            type: Number,
            default: 13
        }
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    },
    computed: {
        style() {
            let ret = {};

            ['width','height','fontSize'].forEach(prop => {
                if(typeof this[prop] === 'number'){
                    ret[prop] = `${this[prop]}px`;
                } else {
                    ret[prop] = this[prop];
                }
            });

            ret.lineHeight = ret.height;

            return ret;
        }
    }
}
</script>
<style lang="scss" scoped>
.v-button {
    padding: 0;
    border: none;
    border-radius: 3px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
    outline: none;
    cursor: pointer;
}

.one{
    background-color: #F99945;
    &.disabled,
    &:hover,
    &:active {
        background-color: #E58B40;
    }
}

.two{
    background-color: #E87261;
    &.disabled,
    &:hover,
    &:active {
        background-color: #D3675A;
    }
}

.three{
    background-color: #768F93;
    &.disabled,
    &:hover,
    &:active {
        background-color: #627676;
    }
}

.four{
    background-color: #47B5CF;
    &.disabled,
    &:hover,
    &:active {
        background-color: #39A2BC;
    }
}
</style>
