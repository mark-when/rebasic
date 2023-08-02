<script setup lang="ts">
import NodeVue from "./Node.vue";
import { Node } from "@markwhen/parser/lib/Node";
import { Event, Path } from "@markwhen/parser/lib/Types";
import type { AuthorInfo } from "./AuthorInfo";
import AuthorSidebar from "./AuthorSidebar.vue";

interface UserPageProps {
  path: string;
  pageTitle: string;
  pageDescription: string;
  header: any;
  entries: {
    path: Path;
    node: Node<Event>;
    url: string;
  }[];
  authorInfo: AuthorInfo;
  supplementalLimit?: number;
  linkBody: boolean;
}

const props = defineProps<UserPageProps>();
</script>

<template>
  <div class="@container">
    <div class="dark:text-slate-200 mx-auto @6xl:relative">
      <AuthorSidebar :path="path" :header="header" />
      <div class="main overflow-scroll mt-5">
        <NodeVue
          v-for="{ node, url } in entries"
          :node="node"
          :url="entries.length > 1 ? `${path}/${url}` : undefined"
          :authorInfo="authorInfo"
          :supplementalLimit="supplementalLimit"
        ></NodeVue>
      </div>
    </div>
  </div>
</template>

<style></style>
