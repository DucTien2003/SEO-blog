import showdown from 'showdown';

export const handleMarkdown = async (markdown: any) => {
  const text = await markdown?.text();

  const converter = new showdown.Converter({ metadata: true });
  const html = converter.makeHtml(text);
  const metadata = converter.getMetadata();

  return { html, metadata };
};

export const convertTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};
