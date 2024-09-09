<script setup lang="ts">
import type { BlogPost } from '~/types/blog';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const { path } = useRoute();

const { data: articles } = await useAsyncData(`blog-post-${path}`, () =>
  queryContent(path).findOne()
);

const data = computed<BlogPost>(() => {
  return {
    title: articles.value?.title || 'no-title available',
    description: articles.value?.description || 'no-description available',
    image: articles.value?.image || '/not-found.jpg',
    alt: articles.value?.alt || 'no alter data available',
    ogImage: articles.value?.ogImage || '/not-found.jpg',
    date: articles.value?.date || 'not-date-available',
    tags: articles.value?.tags || [],
    published: articles.value?.published || false,
  };
});

useSeoMeta({
  title: data.value.title || '',
  ogTitle: data.value.title || '',
  description: data.value.description,
  ogDescription: data.value.description || '',
  ogImage: data.value.ogImage,
  keywords: 'blog, posts, archive, writing, published',
});
</script>

<template>
  <div
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
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
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
