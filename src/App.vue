<script setup lang="ts">
import UserPage from "./User/UserPage.vue";
import { onMounted, ref } from "vue";

const props = ref({});

onMounted(async () => {
  const result = await fetch("https://app.markwhen.com/rob.json");
  const json = await result.json();
  props.value = {
    path: "/rob",
    pageTitle: "Mw",
    pageDescription: "hello",
    header: json.timelines[0].header,
    entries: [],
    authorInfo: {
      name: "Rob",
      avatarUrl: "",
      username: "rob",
    },
  };
});
</script>

<template>
  <UserPage v-bind="props"></UserPage>
</template>

<style scoped></style>
