<template>
    <button :class="['v-button',type,color,disabled?'disabled':'',on?'on':'']" :style="style" type="button" @click="handleClick">
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
        on: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'one'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        height: Number,
        width: Number,
        paddingHor: Number,
        paddingVer: Number,
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

            ret.fontSize = `${this.fontSize}px`;

            if(this.paddingHor) {
                ret.paddingLeft = ret.paddingRight = `${this.paddingHor}px`;
            }

            if(this.paddingVer) {
                ret.paddingTop = ret.paddingBottom = `${this.paddingVer}px`;
            }

            if(this.width) {
                ret.width = `${this.width}px`;
            }

            if(this.height) {
                ret.lineHeight = ret.height = `${this.height}px`;
            }

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
    // 禁用
    &.disabled {
        cursor: default;
        opacity: .5;
    }
    // 默认（实体）
    &.default {
        color: #FFFFFF;
        border: none;
        box-shadow: $theme-box-shadow;
    }
    // 文字链接
    &.link {
        background-color: transparent;
        border: none;
    }
    // 空心按钮
    &.inverse {
        border: solid 1px #FFFFFF;
        background-color: transparent;
        &.disabled,
        &:hover,
        &:active {
            color: #FFFFFF;
        }
    }
    // 空心按钮开关（需配合“on”使用）
    &.switch {
        border-style: solid;
        border-width: 1px;
        background-color: transparent;
    }
    // 文字链接开关（需配合“on”使用）
    &.linkSwitch {
        background-color: transparent;
        border: none;
    }
}

@mixin theme-btn($theme-color) {
    &.default {
        background-color: $theme-color;
        &.disabled,
        &:hover,
        &:active {
            background-color: darken($theme-color, 10%);
        }
    }
    &.link {
        color: $theme-color;
        &.disabled,
        &:hover,
        &:active {
            color: darken($theme-color, 10%);
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
    &.switch {
        border-color: $theme-color;
        color: $theme-color;
        &.disabled,
        &:hover,
        &:active {
            background-color: lighten($theme-color, 30%);
        }
        &.on {
            background-color: $theme-color;
            color: #FFFFFF;
            &.disabled,
            &:hover,
            &:active {
                background-color: $theme-color;
            }
        }
    }
    &.linkSwitch {
        color: $gray;
        &.disabled,
        &:hover,
        &:active {
            color: darken($gray, 10%);
        }
        &.on {
            color: $theme-color;
            &.disabled,
            &:hover,
            &:active {
                color: $theme-color;
            }
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

.gray {
    @include theme-btn($gray);
}
</style>
