<script setup lang="ts"></script>

<template>
  <div class="py-5 border-b border-gray-800 font-semibold">
    <div
      class="flex px-6 container max-w-5xl justify-between mx-auto items-baseline"
    >
      <div class="font-bold flex text-2xl">
        <NuxtLink to="/">Tien's Blog</NuxtLink>
      </div>
      <ul class="flex items-center space-x-6 text-lg">
        <li class="hover:underline">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="hover:underline">
          <NuxtLink to="/blogs">Blogs</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>
