<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = defineProps({
  createdBy: String,
  createdAt: String,
  title: String,
  description: String,
  fileUrl: String,
  path: String,
  id: String,
});

const route = useRoute();
const authStore = useAuthStore();

const deleteBlog = async () => {
  try {
    const response: any = await $fetch(
      `https://api-qa.kiotproxy.com/api/blogs/${props.id}/delete`,
      {
        method: 'POST',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${authStore.token}`,
        },
        params: {},
      }
    );
    if (response.code === 200 && response.success) {
      console.log('Deleted');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <article
    class="group border border-gray-800 m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-300"
  >
    <NuxtLink :to="path">
      <img
        class="h-48 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500"
        width="300"
        :src="fileUrl"
        :alt="title"
      />
      <div class="px-3 pb-4">
        <div class="text-zinc-300 pt-3 pb-2">
          <div class="flex items-center">
            {{ createdAt }}
          </div>
        </div>
        <h2
          class="text-xl font-semibold text-zinc-300 pb-1 group-hover:text-sky-400"
        >
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2 text-base">
          {{ description }}
        </p>
        <div class="flex group-hover:underline text-sky-400 items-center py-2">
          <p>Read More</p>
        </div>
      </div>
    </NuxtLink>

    <div class="flex justify-end mr-4 mb-4">
      <button
        class="border border-white p-2 rounded hover:text-red-600 hover:border-red-600"
        @click="deleteBlog"
      >
        Delete
      </button>

      <NuxtLink :to="`my-blog/create/${id}`">
        <button
          class="ml-3 border border-white p-2 rounded hover:text-yellow-600 hover:border-yellow-600"
        >
          Edit
        </button>
      </NuxtLink>
    </div>
  </article>
</template>
