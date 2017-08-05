<template>
    <div class="v-card"><slot></slot></div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.v-card {
    height: 100%;
    border-radius: 6px;
    background-color: #FFFFFF;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
}
</style>
