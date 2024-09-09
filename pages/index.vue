<script lang="ts" setup>
useSeoMeta({
  title: "Tien's Blog",
  ogTitle: "Tien's Blog",
  description:
    'Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.',
  ogDescription:
    'Dive into web development with me and learn Js, Ts, Vue, Nuxt, Docker, k8s',
  ogImage: '/blog.webp',
  keywords: 'blog, posts, archive, writing, published',
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <MainRecent />
    <MainTrending />
  </main>
</template>
