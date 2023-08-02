<script setup lang="ts">
import { toInnerHtml } from "@/utilities/html";
const props = defineProps<{ header: any; path: string }>();
</script>

<template>
  <div
    class="sidebar px-4 @6xl:absolute @6xl:w-80 @6xl:ml-16 @6xl:pt-2 pt-6 pb-4 bg-white rounded @6xl:h-full"
  >
    <div class="sticky top-8 flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="flex">
          <a href="/" class="pb-2">
            <svg
              width="101.045"
              height="43.526"
              viewBox="0 0 101.045 43.526"
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
            >
              <g
                id="svgGroup"
                stroke-linecap="round"
                fill-rule="nonzero"
                font-size="9pt"
                fill="#3730a3"
              >
                <path
                  d="M 33.573 2.512 L 35.34 15.532 L 27.621 16.462 L 26.04 9.301 A 12.028 12.028 0 0 0 24.932 8.81 Q 24.389 8.604 23.904 8.495 A 4.678 4.678 0 0 0 22.879 8.371 Q 20.274 8.371 18.368 10.51 Q 16.679 12.404 16.486 15.612 A 14.152 14.152 0 0 0 16.461 16.462 L 16.461 34.969 L 24.738 34.969 L 24.738 42.595 L 0.279 42.595 L 0.279 34.969 L 6.51 34.969 L 6.51 8.557 L 0 8.557 L 0 0.838 L 15.717 0.838 L 15.717 8.65 A 14.849 14.849 0 0 1 18.15 3.95 A 14.003 14.003 0 0 1 19.297 2.651 A 8.293 8.293 0 0 1 24.142 0.297 A 11.554 11.554 0 0 1 25.761 0.187 Q 29.946 0.187 33.573 2.512 Z"
                  id="0"
                ></path>
                <path
                  d="M 71.61 28.273 L 79.887 29.854 A 13.479 13.479 0 0 1 76.404 37.576 A 18.65 18.65 0 0 1 74.493 39.433 A 16.269 16.269 0 0 1 68.331 42.626 Q 65.954 43.3 63.128 43.469 A 32.478 32.478 0 0 1 61.194 43.525 A 25.411 25.411 0 0 1 54.205 42.608 A 19.678 19.678 0 0 1 46.221 38.177 A 17.066 17.066 0 0 1 41.338 30.073 Q 40.545 27.305 40.396 23.979 A 35.031 35.031 0 0 1 40.362 22.414 A 28.321 28.321 0 0 1 41.349 14.766 A 22.23 22.23 0 0 1 45.709 6.418 A 17.463 17.463 0 0 1 57.19 0.227 A 25.371 25.371 0 0 1 60.636 0.001 A 23.418 23.418 0 0 1 66.505 0.697 A 16.583 16.583 0 0 1 74.353 5.162 A 17.825 17.825 0 0 1 79.435 16.532 A 23.647 23.647 0 0 1 79.515 18.229 Q 79.515 20.833 78.957 23.809 L 50.778 23.809 Q 51.518 34.171 59.677 35.37 A 15.562 15.562 0 0 0 61.938 35.527 A 15.83 15.83 0 0 0 64.425 35.345 Q 65.709 35.141 66.719 34.705 A 6.077 6.077 0 0 0 68.867 33.202 Q 70.959 30.877 71.61 28.273 Z M 50.871 17.671 L 69.285 17.671 Q 69.637 14.15 67.781 11.004 A 12.998 12.998 0 0 0 67.564 10.649 A 6.785 6.785 0 0 0 63.251 7.647 Q 62.045 7.353 60.589 7.348 A 14.682 14.682 0 0 0 60.543 7.348 A 10.65 10.65 0 0 0 57.756 7.692 A 7.388 7.388 0 0 0 53.754 10.324 A 13.62 13.62 0 0 0 51.41 15.014 A 17.849 17.849 0 0 0 50.871 17.671 Z"
                  id="1"
                ></path>
                <circle cx="93" cy="7" r="7" fill="#a9a9a9"></circle>
                <circle cx="93" cy="36" r="7"></circle>
              </g></svg
          ></a>
        </div>
        <div
          class="author flex flex-row items-center gap-2 pt-0"
          v-if="header?.re?.author || header?.author"
        >
          <a
            v-if="header?.re?.author?.avatar || header?.author?.avatar"
            :href="path"
          >
            <img
              :src="header.re?.author?.avatar || header.author?.avatar"
              class="rounded-full w-12 bg-slate-100/50"
            />
          </a>
          <div class="flex flex-col">
            <a class="font-bold" :href="path">
              {{ header?.re?.author?.name || header?.author?.name }}
            </a>
            <a class="" :href="path">{{ path.replace(/^\//, "@") }}</a>
          </div>
        </div>
        <a class="text-lg font-bold" :href="path">
          {{ header?.re?.title || header?.title }}
        </a>
        <div
          class="font-medium whitespace-pre"
          v-html="
            toInnerHtml(header?.re?.description || header?.description || '')
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
