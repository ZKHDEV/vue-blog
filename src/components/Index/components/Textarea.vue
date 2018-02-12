<template>
  <textarea class="v-textarea" :style="style" :placeholder="placeholder" :value="value" @input="updateValue($event.target.value)"></textarea>
</template>
<script>
export default {
  props: {
      placeholder: String,
      height: {
        type: Number,
        default: 100
      },
      value: String
  },
  computed: {
        style() {
            let ret = {};

            ret.height = `${this.height}px`;

            return ret;
        }
    },
    methods:{
        updateValue(value){
            this.$emit('input', value);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~scss_vars';
.v-textarea{
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
    resize: none;
}
</style>
