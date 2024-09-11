<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
const idBlog = route.params.blog;
const blog = ref<any>({});
const metadataMarkdown = ref<any>();
const contentMarkdown = ref<string>();

onMounted(async () => {
  try {
    const response: any = await $fetch(
      `https://api-qa.kiotproxy.com/api/blogs/${idBlog}`,
      {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${authStore.token}`,
        },
        params: {},
      }
    );
    if (response.code === 200 && response.success) {
      blog.value = response.data;

      const markdownResponse = await $fetch(blog.value.contentFileUrl);
      const { html, metadata } = await handleMarkdown(markdownResponse);

      contentMarkdown.value = html;
      metadataMarkdown.value = metadata;
    }
  } catch (error) {
    console.error(error);
  }
});

useSeoMeta({
  title: blog.value.title,
  ogTitle: blog.value.title,
  description: blog.value.description,
  ogDescription: blog.value.description,
  ogImage: '/blog.webp',
  keywords: 'blog, posts, archive, writing, published',
});
</script>

<template>
  <div
    class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12 pb-10"
  >
    <div class="col-span-12 lg:col-span-9" v-if="blog.id">
      <BlogHeader
        :title="blog.title"
        :image="blog.fileUrl"
        :alt="blog.title"
        :date="convertTimestamp(blog.createdAt)"
        :description="blog.description"
        :tags="blog.tags"
      />
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
        <div v-html="contentMarkdown"></div>
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
