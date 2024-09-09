<script setup>
// import { siteMetaData } from './data';

// useHead({
//   htmlAttrs: {
//     lang: 'en',
//   },
//   meta: () => siteMetaData,
// });
</script>

<template>
  <div class="text-zinc-300 bg-slate-950">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style></style>
