import { ref } from 'vue';
import { marked } from 'marked';
import frontMatter from 'front-matter';

export function useFetchMarkdowns(urls: string[]) {
  const markdownContents = ref<string[]>([]);
  const metadatas = ref<Record<string, any>[]>([]);
  const errors = ref<string[]>([]);
  const isLoading = ref<boolean>(true);

  const fetchMarkdowns = async () => {
    try {
      const fetchPromises = urls.map(async (url) => {
        try {
          const { data, error: fetchError } = await useFetch<string>(url);
          if (fetchError.value) {
            throw new Error(fetchError.value.message);
          }

          const text = await (data.value as unknown as Response)?.text();

          const { attributes: metadata, body: content } = frontMatter(text);

          (metadata as Record<string, any>).pubDatetime = (
            (metadata as Record<string, any>).pubDatetime as any
          )
            .toISOString()
            .slice(0, 10);

          //   console.log(
          //     typeof (metadata as { pubDatetime: unknown }).pubDatetime
          //   );
          //   console.log(typeof (metadata as { title: unknown }).title);

          markdownContents.value.push(await marked.parse(content));
          metadatas.value.push(metadata as Record<string, any>);
        } catch (err) {
          errors.value.push(
            `Failed to fetch from ${url}: ${(err as Error).message}`
          );
          markdownContents.value.push('');
          metadatas.value.push({});
        }
      });

      await Promise.all(fetchPromises);
    } catch (err) {
      errors.value.push(`Error: ${(err as Error).message}`);
    } finally {
      isLoading.value = false;
    }
  };

  fetchMarkdowns();

  return {
    markdownContents,
    metadatas,
    errors,
    isLoading,
  };
}
