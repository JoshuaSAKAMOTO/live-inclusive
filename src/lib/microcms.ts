import { createClient } from "microcms-js-sdk";
import type { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";

// MicroCMS クライアント
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// ニュース記事の型定義
export type News = {
  title: string;
  date: string;
  content: string;
  category?: ("お知らせ" | "メディア")[];
} & MicroCMSListContent;

// ニュース一覧を取得
export async function getNewsList(queries?: MicroCMSQueries) {
  const data = await client.getList<News>({
    endpoint: "news",
    queries: {
      orders: "-date",
      ...queries,
    },
  });
  return data;
}

// ニュース詳細を取得
export async function getNewsDetail(
  contentId: string,
  queries?: MicroCMSQueries
) {
  const data = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
  return data;
}

// ニュース詳細を取得（draftKey対応）
export async function getNewsPreview(contentId: string, draftKey: string) {
  const data = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries: { draftKey },
  });
  return data;
}
