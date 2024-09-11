<script lang="ts" setup>
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

const router = useRouter();
const editor = ref<any>(null);
const editorData = ref('');
const editorConfig = ref({
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'insertImage',
    'undo',
    'redo',
  ],
  image: {
    toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
  },
  simpleUpload: {
    uploadUrl: 'https://api-endpoint.com/upload',

    headers: {
      Authorization: 'Bearer <token>',
    },
  },
});

const authStore = useAuthStore();

const title = ref('');
const description = ref('');

onMounted(async () => {
  const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic'))
    .default;
  editor.value = ClassicEditor;
});

const createBlog = async () => {
  try {
    const response: any = await $fetch(
      'https://api-qa.kiotproxy.com/api/blogs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({
          title: title.value,
          description: description.value,
          content: editorData.value,
          code: `post-${Date.now()}`,
          fileId: '998969b1-8ed8-440b-acf3-b688e67e5e98',
        }),
      }
    );
    if (response.code === 200 && response.success) {
      router.push('/my-blog');
    }
  } catch (error) {
    console.error(error);
  }
};

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
  <main class="container max-w-5xl mx-auto">
    <div class="flex justify-end">
      <button
        class="border text-gray-200 border-gray-200 p-2 rounded hover:border-gray-50 hover:text-gray-50 mt-3"
        @click="createBlog"
      >
        Create
      </button>
    </div>

    <div>
      <h2>Title</h2>
      <textarea
        name="title"
        id="title"
        class="w-full text-black p-2 rounded"
        rows="1"
        v-model="title"
      ></textarea>
    </div>

    <div class="mt-10">
      <h2>Description</h2>
      <textarea
        name="description"
        id="description"
        class="w-full text-black p-2 rounded"
        rows="3"
        v-model="description"
      ></textarea>
    </div>

    <div class="mt-10">
      <h2>Content</h2>
      <div class="text-black">
        <ckeditor
          v-if="editor"
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        />
      </div>
    </div>
  </main>
</template>
