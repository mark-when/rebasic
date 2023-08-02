<script setup lang="ts">
import { addHttpIfNeeded } from "@/utilities/html";
import { computed } from "vue";
import { LINK_REGEX } from "@/utilities/html";

const props = defineProps<{ url?: string; text: string; bold: boolean }>();

const segments = computed(() => {
  let s: {
    url?: string;
    text: string;
    fromUser: boolean;
  }[] = [];
  const matches = props.text.matchAll(LINK_REGEX);
  let lastSubstringIndex = 0;
  for (const m of matches) {
    // Push the last group of 'normal'/non-linked text
    s.push({
      text: props.text.substring(lastSubstringIndex, m.index),
      url: props.url && addHttpIfNeeded(props.url),
      fromUser: false,
    });

    s.push({
      text: m[1],
      url: m[2] && addHttpIfNeeded(m[2]),
      fromUser: true,
    });

    lastSubstringIndex = m.index! + m[0].length;
  }
  s.push({
    text: props.text.substring(lastSubstringIndex),
    url: props.url && addHttpIfNeeded(props.url),
    fromUser: false,
  });
  return s;
});
</script>

<template>
  <p
    class="mx-4 @6xl:w-[36rem] @6xl:ml-[28rem] @7xl:ml-[34rem] pl-1 ml-20"
    :class="{
      'font-bold mt-4': bold,
    }"
  >
    <template v-for="s in segments">
      <a
        v-if="s.url"
        :href="s.url"
        :class="{
          underline: s.fromUser,
        }"
        >{{ s.text }}</a
      ><span v-else>{{ s.text }}</span></template
    >
  </p>
</template>

<style scoped></style>
