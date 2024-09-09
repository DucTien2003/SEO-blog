<script lang="ts" setup>
import { ref, computed } from 'vue';

const { data } = await useAsyncData('home', () =>
  queryContent('/blogs').sort({ _id: -1 }).find()
);

const elementPerPage = ref(4);
const pageNumber = ref(1);

const formattedData = computed(() => {
  return (
    data.value?.map((articles) => {
      return {
        path: articles._path,
        title: articles.title || 'no-title available',
        description: articles.description || 'no-description available',
        image: articles.image || '/not-found.jpg',
        alt: articles.alt || 'no alter data available',
        ogImage: articles.ogImage || '/not-found.jpg',
        date: articles.date || 'not-date-available',
        tags: articles.tags || [],
        published: articles.published || false,
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

function onPreviousPageClick() {
  if (pageNumber.value > 1) pageNumber.value -= 1;
}

const totalPage = computed(() => {
  const ttlContent = formattedData.value.length || 0;
  const totalPage = Math.ceil(ttlContent / elementPerPage.value);
  return totalPage;
});

function onNextPageClick() {
  if (pageNumber.value < totalPage.value) pageNumber.value += 1;
}

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
  <main class="container max-w-5xl mx-auto text-zinc-600">
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
          :published="post.published"
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
