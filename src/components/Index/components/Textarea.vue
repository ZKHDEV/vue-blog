<template>
  <textarea class="v-textarea" :placeholder="placeholder"></textarea>
</template>
<script>
export default {
  props: {
      placeholder: String
  }
}
</script>
<style lang="scss" scoped>
@import '../../../static/scss/variables.scss';
.v-textarea{
    box-sizing: border-box;
    padding: 12px 15px;
    display: inline-block;
    width: 100%;
    height: 80px;
    box-shadow: $theme-box-shadow inset;
    outline-style: none;
    background-color: #F0EFEE;
    border: none;
    border-radius: 6px;
    vertical-align: top;
    color: #000000;
    font-size: 13px;
    resize: none;
}
</style>
