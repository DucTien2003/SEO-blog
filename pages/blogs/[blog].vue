<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();
const nameBlog = route.params.blog;

const urls = [`https://cdn-qa.kiotproxy.com/files/blogs/${nameBlog}.md`];

const metadatas = ref<any>([]);
const contentHtml = ref<string[]>([]);

onMounted(async () => {
  const promises = urls.map((url) => $fetch(url));
  const responses = await Promise.all(promises);

  responses.map(async (response: any) => {
    const { html, metadata } = await handleMarkdown(response);
    contentHtml.value.push(html);
    metadatas.value.push(metadata);
  });
});

const formattedData = computed(() => {
  return metadatas.value?.map((articles: any) => {
    return {
      path: '/blogs/' + articles?.slug,
      title: articles?.title || 'no-title available',
      description: articles?.description || 'no-description available',
      image: articles?.image || '/blog.webp',
      alt: articles?.slug || 'no alter formattedData available',
      ogImage: articles?.ogImage || '/blog.webp',
      date: articles?.pubDatetime || 'not-date-available',
      tags: articles?.tags || [],
      published: true,
    };
  });
});

useSeoMeta({
  title: computed(() => formattedData.value.title),
  ogTitle: computed(() => formattedData.value.title),
  description: computed(() => formattedData.value.description),
  ogDescription: computed(() => formattedData.value.description),
  ogImage: '/blog.webp',
  keywords: 'blog, posts, archive, writing, published',
});
</script>

<template>
  <div
    class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12 pb-10"
  >
    <div class="col-span-12 lg:col-span-9" v-if="formattedData.length > 0">
      <BlogHeader
        :title="formattedData[0].title"
        :image="formattedData[0].image"
        :alt="formattedData[0].alt"
        :date="formattedData[0].date"
        :description="formattedData[0].description"
        :tags="formattedData[0].tags"
      />
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
        <div
          v-for="(content, index) in contentHtml"
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
