<template>
    <button :class="['v-button',type,color,disabled?'disabled':'']" :style="style" type="button" @click="handleClick">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default'
        },
        color: {
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
            if (!this.disabled) {
                this.$emit('click');
            }
        }
    },
    computed: {
        style() {
            let ret = {};

            ['width', 'height', 'fontSize'].forEach(prop => {
                if (typeof this[prop] === 'number') {
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
@import '../../../static/scss/variables.scss';
.v-button {
    padding: 0;
    border-radius: 3px;
    text-align: center;
    outline: none;
    cursor: pointer;
    &.disabled {
        cursor: default;
        opacity: .5;
    }

    &.default {
        color: #FFFFFF;
        border: none;
        box-shadow: $theme-box-shadow;
    }

    &.inverse {
        border: solid 1px #FFFFFF;
        background-color: transparent;
        &.disabled,
        &:hover,
        &:active {
            color: #FFFFFF;
        }
    }
}

@mixin theme-btn($theme-color){
    &.default {
        background-color: $theme-color;
        &.disabled,
        &:hover,
        &:active {
            background-color: darken($theme-color,10%);
        }
    }
    &.inverse {
        border-color: $theme-color;
        color: $theme-color;
        &.disabled,
        &:hover,
        &:active {
            background-color: $theme-color;
        }
    }
}

.one {
    @include theme-btn($theme-color-one);
}

.two {
    @include theme-btn($theme-color-two);
}

.three {
    @include theme-btn($theme-color-three);
}

.four {
    @include theme-btn($theme-color-four);
}
</style>
