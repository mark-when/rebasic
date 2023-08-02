<script setup lang="ts">
import type { Node } from "@markwhen/parser/lib/Node";
import type { Event } from "@markwhen/parser/lib/Types";
import { DateTime } from "luxon";
import { computed } from "vue";
import { useEventRefs } from "@/utilities/useEventRefs";
import type { AuthorInfo } from "./AuthorInfo";
import BottomSpacer from "./BottomSpacer.vue";
import CheckboxBlock from "./CheckboxBlock.vue";
import ImagesBlock from "./ImagesBlock.vue";
import ListItemBlock from "./ListItemBlock.vue";
import Linkified from "./Linkified.vue";
import { COMPLETION_REGEX } from "@markwhen/parser/lib/regex";

const props = defineProps<{
  node: Node<Event>;
  url?: string;
  authorInfo: AuthorInfo;
  supplementalLimit?: number;
}>();

const { eventRange } = useEventRefs(computed(() => props.node.value));

const titleText = computed(() =>
  props.node.value.eventDescription.eventDescription.replace(
    COMPLETION_REGEX,
    (a, b) => a.substring(b.length)
  )
);

const ago = computed(() => {
  const dtIso = eventRange.value?.fromDateTimeIso!;
  const now = DateTime.now();
  const dt = DateTime.fromISO(dtIso);
  const duration = +now < +dt ? dt.diff(now) : now.diff(dt);
  const years = duration.as("years");
  if (years > 1) {
    return `${Math.floor(years)}y`;
  }
  const days = duration.as("days");
  if (days > 1) {
    return Math.floor(days) + "d";
  }
  const hours = duration.as("hours");
  if (hours > 1) {
    return Math.floor(hours) + "h";
  }
  const minutes = duration.as("minutes");
  if (minutes > 1) {
    return Math.floor(minutes) + "m";
  }
  const seconds = duration.as("seconds");
  if (seconds > 10) {
    return Math.floor(seconds) + "s";
  }
  return "now";
});

const mappedSupplemental = computed(() => {
  const mapped = [];
  const sup = props.node.value.eventDescription.supplemental;
  for (let i = 0; i < sup.length; i++) {
    const s = sup[i];
    if (s.type === "text") {
      let isHeader = false;
      // @ts-ignore
      const text = (s.raw as string).replace(/^\w*#+/, () => {
        isHeader = true;
        return "";
      });
      mapped.push({
        bold: isHeader,
        text,
        type: "text",
      });
    } else if (s.type === "image") {
      const images = [sup[i]];
      let next = i + 1;
      while (next < sup.length && sup[next].type === "image") {
        images.push(sup[next]);
        next++;
      }
      i = next - 1;
      mapped.push(images);
    } else {
      mapped.push(s);
    }
  }
  return mapped;
});

const cappedMappedSupplemental = computed(() =>
  props.supplementalLimit
    ? mappedSupplemental.value.slice(0, props.supplementalLimit)
    : mappedSupplemental.value
);

const hasMore = computed(
  () => mappedSupplemental.value.length > cappedMappedSupplemental.value.length
);

const avatarUrl = computed(() => props.authorInfo.avatarUrl);
</script>

<template>
  <div class="flex flex-col gap-[2px] mt-2">
    <div
      class="@6xl:ml-[24rem] @7xl:ml-[30rem] @6xl:w-[40rem] flex flex-row mx-4"
    >
      <div class="relative">
        <a
          class="h-12 w-12 rounded-full bg-slate-100/50 m-1 absolute left-1"
          :href="`/${authorInfo.username}`"
        >
          <img
            :src="avatarUrl"
            :alt="authorInfo.username"
            v-if="avatarUrl"
            class="w-full h-full rounded-full"
          />
        </a>
      </div>
      <div class="ml-16 pl-1 flex flex-row gap-2">
        <a class="font-bold" :href="`/${authorInfo.username}`">{{
          authorInfo.name
        }}</a>
        <a
          :href="`/${authorInfo.username}`"
          class="text-gray-500 dark:text-gray-400"
          >@{{ props.authorInfo.username }}</a
        >
      </div>
      <a
        :href="url"
        class="font-medium text-gray-500 dark:text-gray-400 text-sm p-[2px] hover:underline flex-grow flex justify-end"
      >
        {{ ago }}
      </a>
    </div>
    <Linkified
      class="font-medium leading-[1.65rem]"
      :url="url"
      :bold="false"
      :text="titleText"
    ></Linkified>
    <!-- <a
      class="flex flex-row gap-2 mx-4 @6xl:w-[36rem] @6xl:ml-[28rem] @7xl:ml-[34rem] items-baseline pl-1 ml-20 font-medium"
      :href="url"
    >
      <h1 v-html="titleHtml"></h1>
    </a> -->
    <div class="flex flex-col gap-4 leading-[1.65rem]">
      <template v-for="(sup, index) in cappedMappedSupplemental">
        <ImagesBlock
          :sup="sup"
          v-if="Array.isArray(sup)"
          :linked="url"
        ></ImagesBlock>
        <Linkified
          v-else-if="sup.type === 'text'"
          :text="sup.text"
          :bold="sup.bold"
          :url="url"
        ></Linkified>
        <CheckboxBlock
          v-else-if="sup.type === 'checkbox'"
          :avatar-url="!!avatarUrl"
          :sup="sup"
          :index="index"
        ></CheckboxBlock>
        <ListItemBlock
          :sup="sup"
          :avatar-url="!!avatarUrl"
          v-else-if="sup.type === 'listItem'"
        ></ListItemBlock>
      </template>
      <a
        v-if="hasMore"
        :href="url"
        class="mx-4 @6xl:w-[36rem] @6xl:ml-[28rem] @7xl:ml-[34rem] pl-1 ml-20"
        >...</a
      >
    </div>
    <div
      :class="{
        'pb-8': !!supplementalLimit,
        'pb-32': !supplementalLimit,
      }"
      class="mx-4 @6xl:ml-96 @6xl:w-[40rem] @7xl:ml-[30rem] border-b border-indigo-500/10"
    ></div>
  </div>
</template>

<style scoped>
img {
  width: auto;
  max-height: 20rem;
  min-height: 2rem;
}
</style>
