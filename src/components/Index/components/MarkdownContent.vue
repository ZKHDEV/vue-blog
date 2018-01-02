<template>
  <article class="markdown-body" v-html="mdContent"></article>
</template>

<script>
import SimpleMDE from "simplemde";
export default {
  props: ["content"],
  data() {
    return {
      simpleMde: new SimpleMDE({ element: null })
    };
  },
  computed: {
    mdContent() {
      return this.simpleMde.markdown(this.content);
    }
  }
};
</script>

<style lang="scss">
@import "~github-markdown-css";
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
