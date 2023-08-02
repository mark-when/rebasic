<script setup lang="ts">
import type { MarkdownBlock } from "@markwhen/parser/lib/Types";
import { ref } from "vue";

const props = defineProps<{ sup: MarkdownBlock[]; linked?: string }>();

const larger = ref(false);
</script>

<template>
  <div
    class="overflow-scroll flex flex-row noScrollBar pr-4 @6xl:pr-48"
    :style="{
      height: larger ? `min(90vh, 45rem)` : `20rem`,
    }"
    v-if="Array.isArray(sup)"
  >
    <img
      v-for="(i, index2) in sup"
      @click="larger = !larger"
      :src="i.link"
      :alt="i.alt"
      loading="lazy"
      class="rounded-lg cursor-pointer z-10 object-contain object-scale-down"
      :class="{
        '@6xl:ml-[28.25rem] @7xl:ml-[34.25rem] ml-[5.25rem]': index2 === 0,
        'ml-4': index2 !== 0,
      }"
    />
  </div>
</template>

<style scoped></style>
