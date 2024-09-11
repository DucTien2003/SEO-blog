<script lang="ts" setup>
const authStore = useAuthStore();
const blogs = ref<any>([]);

onMounted(async () => {
  try {
    const response: any = await $fetch(
      'https://api-qa.kiotproxy.com/api/blogs',
      {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${authStore.token}`,
        },
        params: {
          keyword: '',
          pageIndex: 1,
          pageSize: 200,
        },
      }
    );
    if (response.code === 200 && response.success) {
      blogs.value = response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

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
    <NuxtLink to="/my-blog/create" class="flex justify-end font-medium">
      <button
        class="border text-gray-200 border-gray-200 p-2 rounded hover:border-gray-50 hover:text-gray-50 mt-3"
      >
        Create new blog
      </button>
    </NuxtLink>

    <div class="grid grid-cols-3">
      <div v-for="blog in blogs" :key="blog.id" class="pb-8">
        <myBlogCard
          :path="`/my-blog/${blog.id}`"
          :createdBy="blog.createdBy"
          :createdAt="convertTimestamp(blog.createdAt)"
          :title="blog.title"
          :description="blog.description"
          :fileUrl="blog.fileUrl"
          :id="blog.id"
        />
      </div>
    </div>
  </main>
</template>
