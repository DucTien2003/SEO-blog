<script lang="ts" setup>
const urls = [
  'https://cdn-qa.kiotproxy.com/files/blogs/mutable-imports.md',
  'https://cdn-qa.kiotproxy.com/files/blogs/tidy-serverside-props.md',
  'https://cdn-qa.kiotproxy.com/files/blogs/binary-search-in-javascript.md',
  'https://cdn-qa.kiotproxy.com/files/blogs/using-async-await-the-right-way.md',
];

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
  return (
    metadatas.value?.map((articles: any) => {
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
</script>

<template>
  <div class="pb-10 px-4">
    <div class="pt-5 pb-3">
      <h2 class="text-4xl font-semibold text-zinc-300">Recent Post</h2>
    </div>

    <div class="grid grid-cols-3">
      <template v-for="post in formattedData" :key="post.title">
        <BlogCard
          :path="post.path ?? ''"
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
  </div>
</template>
