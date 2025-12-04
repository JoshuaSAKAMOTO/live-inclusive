import { Performer } from "@/types";

export const performers: Performer[] = [
  {
    id: "performer-1",
    name: "サンプル アーティスト",
    nameKana: "さんぷる あーてぃすと",
    role: "ボーカル",
    profile:
      "サンプルのプロフィールテキストです。実際の出演者情報に置き換えてください。",
    thumbnail: "/images/performers/sample-thumb.jpg",
    photo: "/images/performers/sample.jpg",
    sns: [
      { type: "instagram", url: "https://instagram.com/" },
      { type: "twitter", url: "https://twitter.com/" },
    ],
  },
  // 実際の出演者データをここに追加
];
