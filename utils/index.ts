import showdown from 'showdown';

export const handleMarkdown = async (markdown: any) => {
  const text = await markdown?.text();

  const converter = new showdown.Converter({ metadata: true });
  const html = converter.makeHtml(text);
  const metadata = converter.getMetadata();

  return { html, metadata };
};
