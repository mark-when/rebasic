<script setup lang="ts">
import type { MarkdownBlock, Block } from "@markwhen/parser/lib/Types";

const props = defineProps<{ avatarUrl: boolean; sup: MarkdownBlock }>();
</script>

<template>
  <div
    class="flex flex-row items-center mx-4 @6xl:w-[36rem] @6xl:ml-[28rem] @7xl:ml-[34rem] pl-1 ml-20"
    :class="{
      '@6xl:ml-[20rem]  @7xl:ml-[30rem]': !avatarUrl,
    }"
  >
    <li v-html="(sup as Block).raw"></li>
  </div>
</template>
