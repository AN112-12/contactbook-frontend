<script>
import AppHeader from "@/components/AppHeader.vue";
import ChatBox from "@/components/chatbox.vue";
export default {
components: {
AppHeader,
ChatBox,
},
};
</script>

<template>
<div id="app">
<AppHeader />
<div class="container mt-3">
<router-view />
</div>
<ChatBox />
</div>
</template>

<style>
.page {
max-width: 400px;
margin: auto;
}
</style>