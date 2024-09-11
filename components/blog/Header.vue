<script setup lang="ts">
const props = defineProps({
  title: String,
  image: String,
  alt: String,
  description: String,
  date: String,
  tags: Array,
});
</script>

<template>
  <header>
    <h1 class="text-xl text-zinc-300 m-7 font-bold text-center">
      {{ title || '' }}
    </h1>
    <div class="flex items-center justify-center font-semibold mb-5">
      <p>{{ date || '' }}</p>
    </div>
    <NuxtImg
      :src="image || ''"
      :alt="alt || ''"
      width="600"
      class="m-auto rounded-2xl shadow-lg h-32 w-4/6 content-center object-cover"
    />
    <p
      class="text-xs sm:text-sm my-3 max-w-xl mx-auto text-center text-zinc-400"
    >
      {{ description }}
    </p>
    <div class="flex w-full justify-center text-xs md:text-base my-8">
      <div
        class="md:flex text-zinc-300 content-center gap-8 text-xs sm:text-sm"
      >
        <div class="flex items-center gap-2 flex-wrap my-5">
          <template v-for="tag in tags" :key="tag">
            <span class="bg-slate-900 rounded-md px-2 py-1 font-semibold">{{
              tag
            }}</span>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
