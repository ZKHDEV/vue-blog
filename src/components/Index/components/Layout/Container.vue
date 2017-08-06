<template>
    <div class="v-container" :style="style">
        <slot></slot>
    </div>
</template>
<script>
export default {
    componentName: 'VContainer',
    props: {
        gutter: {
            type: Number,
            default: 20
        }
    }, 
    computed: {
        style() {
            var ret = {};

            if (this.gutter) {
                ret.paddingLeft = `${this.gutter / 2}px`;
                ret.paddingRight = ret.paddingLeft;
            }

            return ret;
        }
    },
}
</script>
<style lang="scss" scoped>
.v-container {
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
}

.container:before,
.container:after {
    display: table;
    content: " ";
}

.container:after,
.container-fluid:after {
    clear: both;
}

@media (min-width: 768px) {
    .v-container {
        width: 780px;
    }
}

@media (min-width: 992px) {
    .v-container {
        width: 1000px;
    }
}

@media (min-width: 1200px) {
    .v-container {
        width: 1200px;
    }
}
</style>
