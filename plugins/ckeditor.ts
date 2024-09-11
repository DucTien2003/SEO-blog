import { defineNuxtPlugin } from '#app';
import * as CKEditor from '@ckeditor/ckeditor5-vue';
import type { Plugin } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CKEditor as unknown as Plugin);
});
