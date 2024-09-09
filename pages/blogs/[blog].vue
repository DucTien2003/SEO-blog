<script setup lang="ts">
import type { BlogPost } from '~/types/blog';
import { useRoute } from 'vue-router';
import { ref, computed, watchEffect } from 'vue';

const route = useRoute();
const nameBlog = route.params.blog;

const urls = [`https://cdn-qa.kiotproxy.com/files/blogs/${nameBlog}.md`];

const { markdownContents, metadatas, errors, isLoading } =
  useFetchMarkdowns(urls);

const data = ref<BlogPost>({
  path: '',
  title: 'no-title available',
  description: 'no-description available',
  image: '/blog.webp',
  alt: 'no alter data available',
  ogImage: '/blog.webp',
  date: 'not-date-available',
  tags: [],
  published: true,
});

watchEffect(() => {
  if (!isLoading.value && metadatas.value.length > 0) {
    data.value = {
      path: '/blogs/' + metadatas.value[0]?.slug,
      title: metadatas.value[0]?.title || 'no-title available',
      description:
        metadatas.value[0]?.description || 'no-description available',
      image: metadatas.value[0]?.image || '/blog.webp',
      alt: metadatas.value[0]?.slug || 'no alter data available',
      ogImage: metadatas.value[0]?.ogImage || '/blog.webp',
      date: metadatas.value[0]?.pubDatetime || 'not-date-available',
      tags: metadatas.value[0]?.tags || [],
      published: true,
    };
  }
});

useSeoMeta({
  title: computed(() => data.value.title),
  ogTitle: computed(() => data.value.title),
  description: computed(() => data.value.description),
  ogDescription: computed(() => data.value.description),
  ogImage: '/blog.webp',
  keywords: 'blog, posts, archive, writing, published',
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>

  <div
    v-else
    class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12 pb-10"
  >
    <div class="col-span-12 lg:col-span-9">
      <BlogHeader
        :title="data.title"
        :image="data.image"
        :alt="data.alt"
        :date="data.date"
        :description="data.description"
        :tags="data.tags"
      />
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
        <div
          v-for="(content, index) in markdownContents"
          :key="index"
          v-html="content"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.prose {
  a {
    text-decoration: underline;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
