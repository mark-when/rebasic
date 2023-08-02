<script setup lang="ts">
import { Block, type MarkdownBlock } from "@markwhen/parser/lib/Types";
import { toInnerHtml } from "../utilities/html";

const props = defineProps<{ sup: MarkdownBlock; index: number; avatarUrl: boolean }>();
</script>

<template>
  <div
    class="flex flex-row items-center mx-4 @6xl:w-[36rem] @6xl:ml-[28rem] @7xl:ml-[34rem] pl-1 ml-20"
    :class="{
      '@6xl:ml-[20rem] @7xl:ml-[30rem]': !avatarUrl,
    }"
  >
    <input
      type="checkbox"
      :checked="(sup as Block).value"
      :id="`checkbox_${index}_${(sup as Block).raw}`"
      @click.prevent=""
    />
    <label
      v-html="toInnerHtml((sup as Block).raw)"
      class="ml-2 pointer-events-auto"
      :for="`checkbox_${index}_${(sup as Block).raw}`"
    ></label>
  </div>
</template>

<style scoped></style>
