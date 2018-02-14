<template>
    <v-theme-card :paddingVer="20" :paddingHor="50">
        <h2>给我留言</h2>
        <v-split></v-split>
        <v-input placeholder="主题"></v-input>
        <v-textarea placeholder="写下你的留言..."></v-textarea>
        <div class="btn-group">
            <v-button class="send-btn" color="four" :height="40" :width="80" :fontSize="18" :top="5" @click="handleSubmit">提 交</v-button>
        </div>
    </v-theme-card>
</template>

<script>
export default {
    methods: {
        handleSubmit() {
            
        }
    },
    components: {
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
        'v-split': resolve => require(['../components/Split.vue'], resolve),
        'v-input': resolve => require(['../components/Input.vue'], resolve),
        'v-textarea': resolve => require(['../components/Textarea.vue'], resolve),
        'v-button': resolve => require(['../components/Button.vue'], resolve),
    }
}
</script>

<style lang="scss" scoped>
.btn-group{
    text-align: right;
}
</style>

