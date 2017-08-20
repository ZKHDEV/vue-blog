<template>
    <div :class="className" :style="style">
        <slot></slot>
    </div>
</template>
<script>
export default {
    componentName: 'VCol',
    props: {
        span: Number,
        offset: Number,
        pull: Number,
        push: Number,
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object]
    },
    computed: {
        gutter() {
            let parent = this.$parent;
            while (parent && parent.$options.componentName !== 'VRow') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        },
        className() {
            let classList = [];

            ['span', 'offset', 'pull', 'push'].forEach(prop => {
                if (this[prop]) {
                    classList.push(
                        prop !== 'span'
                            ? `col-${prop}-${this[prop]}`
                            : `col-${this[prop]}`
                    );
                }
            });

            ['xs', 'sm', 'md', 'lg'].forEach(size => {
                if (typeof this[size] === 'number') {
                    classList.push(`col-${size}-${this[size]}`);
                } else if (typeof this[size] === 'object') {
                    let props = this[size];
                    Object.keys(props).forEach(prop => {
                        classList.push(
                            prop !== 'span'
                                ? `col-${size}-${prop}-${props[prop]}`
                                : `col-${size}-${props[prop]}`
                        );
                    });
                }
            });

            return classList;
        },
        style() {
            let style = {};

            style.paddingLeft = `${this.gutter / 2}px`;
            style.paddingRight = style.paddingLeft;

            return style;
        }
    }
}
</script>
<style lang="scss" scoped>
.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.col-13,
.col-14,
.col-15,
.col-16,
.col-17,
.col-18,
.col-19,
.col-20,
.col-21,
.col-22,
.col-23,
.col-24,
.col-xs-1,
.col-xs-2,
.col-xs-3,
.col-xs-4,
.col-xs-5,
.col-xs-6,
.col-xs-7,
.col-xs-8,
.col-xs-9,
.col-xs-10,
.col-xs-11,
.col-xs-12,
.col-xs-13,
.col-xs-14,
.col-xs-15,
.col-xs-16,
.col-xs-17,
.col-xs-18,
.col-xs-19,
.col-xs-20,
.col-xs-21,
.col-xs-22,
.col-xs-23,
.col-xs-24,
.col-sm-1,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-13,
.col-sm-14,
.col-sm-15,
.col-sm-16,
.col-sm-17,
.col-sm-18,
.col-sm-19,
.col-sm-20,
.col-sm-21,
.col-sm-22,
.col-sm-23,
.col-sm-24,
.col-md-1,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-13,
.col-md-14,
.col-md-15,
.col-md-16,
.col-md-17,
.col-md-18,
.col-md-19,
.col-md-20,
.col-md-21,
.col-md-22,
.col-md-23,
.col-md-24,
.col-lg-1,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-13,
.col-lg-14,
.col-lg-15,
.col-lg-16,
.col-lg-17,
.col-lg-18,
.col-lg-19,
.col-lg-20,
.col-lg-21,
.col-lg-22,
.col-lg-23,
.col-lg-24 {
    float: left;
    box-sizing: border-box;
}

@for $i from 0 through 24 {
    .col-#{$i} {
        width: 1 / 24 * $i * 100%;
    }
    .col-offset-#{$i} {
        margin-left: 1 / 24 * $i * 100%;
    }
    .col-pull-#{$i} {
        position: relative;
        right: 1 / 24 * $i * 100%;
    }
    .col-push-#{$i} {
        position: relative;
        left: 1 / 24 * $i * 100%;
    }
}

@media (max-width: 768px) {
    @for $i from 0 to 24 {
        .col-xs-#{$i} {
            width: 1 / 24 * $i * 100%;
        }
        .col-xs-offset-#{$i} {
            margin-left: 1 / 24 * $i * 100%;
        }
        .col-xs-pull-#{$i} {
            position: relative;
            right: 1 / 24 * $i * 100%;
        }
        .col-xs-push-#{$i} {
            position: relative;
            left: 1 / 24 * $i * 100%;
        }
    }
}

@media (min-width: 768px) {
    @for $i from 0 to 24 {
        .col-sm-#{$i} {
            width: 1 / 24 * $i * 100%;
        }
        .col-sm-offset-#{$i} {
            margin-left: 1 / 24 * $i * 100%;
        }
        .col-sm-pull-#{$i} {
            position: relative;
            right: 1 / 24 * $i * 100%;
        }
        .col-sm-push-#{$i} {
            position: relative;
            left: 1 / 24 * $i * 100%;
        }
    }
}

@media (min-width: 992px) {
    @for $i from 0 to 24 {
        .col-md-#{$i} {
            width: 1 / 24 * $i * 100%;
        }
        .col-md-offset-#{$i} {
            margin-left: 1 / 24 * $i * 100%;
        }
        .col-md-pull-#{$i} {
            position: relative;
            right: 1 / 24 * $i * 100%;
        }
        .col-md-push-#{$i} {
            position: relative;
            left: 1 / 24 * $i * 100%;
        }
    }
}

@media (min-width: 1200px) {
    @for $i from 0 to 24 {
        .col-lg-#{$i} {
            width: 1 / 24 * $i * 100%;
        }
        .col-lg-offset-#{$i} {
            margin-left: 1 / 24 * $i * 100%;
        }
        .col-lg-pull-#{$i} {
            position: relative;
            right: 1 / 24 * $i * 100%;
        }
        .col-lg-push-#{$i} {
            position: relative;
            left: 1 / 24 * $i * 100%;
        }
    }
}
</style>
