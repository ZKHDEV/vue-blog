<template>
  <a class="v-button" href="javascript:void(0)" @click="handleClick"><slot></slot></a>
</template>
<script>
export default {
  methods:{
      handleClick() {
          this.$emit('click')
      }
  }
}
</script>
<style lang="scss" scoped>
.v-button {
    display: block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    color: #FFFFFF;
    font-size: 13px;
    text-align: center;
    text-decoration: none;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
    &:link,
    &:visited {
        background-color: #E87261;
    }
    &:hover,
    &:active {
        background-color: #D3675A;
    }
}
</style>
