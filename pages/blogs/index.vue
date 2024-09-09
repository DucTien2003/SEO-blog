<script lang="ts" setup>
import { ref, computed } from 'vue';

const urls = [
  'https://cdn-qa.kiotproxy.com/files/blogs/mutable-imports.md',
  'https://cdn-qa.kiotproxy.com/files/blogs/tidy-serverside-props.md',
  'https://cdn-qa.kiotproxy.com/files/blogs/binary-search-in-javascript.md',
  'https://cdn-qa.kiotproxy.com/files/blogs/using-async-await-the-right-way.md',
];

const { markdownContents, metadatas, errors, isLoading } =
  useFetchMarkdowns(urls);

const elementPerPage = ref(3);
const pageNumber = ref(1);

const formattedData = computed(() => {
  return (
    metadatas.value?.map((articles) => {
      return {
        path: '/blogs/' + articles.slug || 'no-path-available',
        title: articles.title || 'no-title available',
        description: articles.description || 'no-description available',
        image: articles.image || '/blog.webp',
        alt: articles.slug || 'no alter data available',
        ogImage: articles.ogImage || '/blog.webp',
        date: articles.pubDatetime || 'not-date-available',
        tags: articles.tags || [],
      };
    }) || []
  );
});

const paginatedData = computed(() => {
  return (
    formattedData.value.filter((data, idx) => {
      const startInd = (pageNumber.value - 1) * elementPerPage.value;
      const endInd = pageNumber.value * elementPerPage.value - 1;

      if (idx >= startInd && idx <= endInd) return true;
      else return false;
    }) || []
  );
});

const onPreviousPageClick = () => {
  if (pageNumber.value > 1) pageNumber.value -= 1;
};

const totalPage = computed(() => {
  const ttlContent = formattedData.value.length || 0;
  const totalPage = Math.ceil(ttlContent / elementPerPage.value);
  return totalPage;
});

const onNextPageClick = () => {
  if (pageNumber.value < totalPage.value) pageNumber.value += 1;
};

useSeoMeta({
  title: 'Archive',
  ogTitle: 'Archive',
  description:
    'Here you will find all the blog posts I have written & published on this site.',
  ogDescription:
    'Here you will find all the blog posts I have written & published on this site.',
  ogImage: '/blog.webp',
  keywords: 'blog, posts, archive, writing, published',
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>

  <main v-else class="container max-w-5xl mx-auto text-zinc-600">
    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in paginatedData" :key="post.title">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :image="post.image"
          :alt="post.alt"
          :og-image="post.ogImage"
          :tags="post.tags"
        />
      </template>
    </div>

    <div class="flex justify-center items-center space-x-6 pb-10">
      <button
        :disabled="pageNumber <= 1"
        @click="onPreviousPageClick"
        class="border border-zinc-200 w-10 h-10 rounded-md cursor-pointer"
      >
        <
      </button>
      <p>{{ pageNumber }} / {{ totalPage }}</p>
      <button
        :disabled="pageNumber >= totalPage"
        @click="onNextPageClick"
        class="border border-zinc-200 w-10 h-10 rounded-md cursor-pointer"
      >
        >
      </button>
    </div>
  </main>
</template>
