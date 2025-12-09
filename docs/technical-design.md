# 逗子ライブインクルーシブ 技術設計書

## 1. アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Next.js App                          │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │ │
│  │  │  Pages   │ │Components│ │   Lib    │ │   Data    │  │ │
│  │  └────┬─────┘ └──────────┘ └────┬─────┘ └───────────┘  │ │
│  │       │                         │                       │ │
│  │       ▼                         ▼                       │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │              Server Components (RSC)              │  │ │
│  │  │         - Data Fetching at Build Time             │  │ │
│  │  │         - Static Site Generation (SSG)            │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         │                                      │
         ▼                                      ▼
┌─────────────────────┐              ┌─────────────────────────┐
│     MicroCMS        │              │  Cloudflare Workers     │
│  ┌───────────────┐  │              │  ┌───────────────────┐  │
│  │     News      │  │              │  │  Contact API      │  │
│  │ (お知らせ)    │  │              │  │  (Hono.js)        │  │
│  └───────────────┘  │              │  └─────────┬─────────┘  │
└─────────────────────┘              └────────────┼────────────┘
                                                  │
                                     ┌────────────┴────────────┐
                                     ▼                         ▼
                              ┌───────────┐            ┌───────────┐
                              │  Resend   │            │   LINE    │
                              │  (Email)  │            │   API     │
                              └───────────┘            └───────────┘
```

## 2. ディレクトリ構成

```
live-inclusive/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # トップページ
│   │   ├── performers/
│   │   │   ├── page.tsx        # 出演者一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx    # 出演者詳細
│   │   ├── tickets/
│   │   │   └── page.tsx        # チケット情報
│   │   ├── venue/
│   │   │   └── page.tsx        # 会場情報
│   │   ├── archive/
│   │   │   └── page.tsx        # 過去公演
│   │   ├── news/
│   │   │   ├── page.tsx        # ニュース一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx    # ニュース詳細
│   │   └── contact/
│   │       └── page.tsx        # お問い合わせ
│   │
│   ├── components/
│   │   ├── layout/             # レイアウトコンポーネント
│   │   │   ├── index.ts
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── social-links.tsx
│   │   ├── news-section.tsx    # トップページNEWSセクション
│   │   └── instagram-embed.tsx # Instagram埋め込み
│   │
│   ├── lib/
│   │   └── microcms.ts         # MicroCMS APIクライアント
│   │
│   └── data/                   # 静的データ
│       ├── site.ts             # サイト設定
│       ├── event.ts            # イベント情報
│       ├── performers.ts       # 出演者情報
│       └── archive.ts          # 過去公演
│
├── public/
│   └── images/                 # 画像ファイル
│
├── docs/                       # ドキュメント
│   ├── requirements.md
│   ├── technical-design.md
│   └── microcms-guide.md       # MicroCMS操作ガイド
│
├── .github/
│   └── pull_request_template.md
│
├── .env.local                  # 環境変数（ローカル）
├── .env.example                # 環境変数サンプル
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 3. データフロー

### 3.1 ビルド時データ取得（SSG）

```
[Build Time]
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Next.js    │────▶│  microCMS   │────▶│  静的HTML    │
│ generateSt- │     │   API       │     │  生成       │
│ aticParams  │     └─────────────┘     └─────────────┘
└─────────────┘
```

### 3.2 Revalidation（ISR）

```typescript
// 1時間ごとに再検証
export const revalidate = 3600;
```

## 4. コンポーネント設計

### 4.1 コンポーネント分類

| 分類 | 責務 | 例 |
|------|------|-----|
| UI | 見た目のみ、ロジックなし | Button, Card, Input |
| Layout | ページ構造 | Header, Footer, Navigation |
| Section | ページの各セクション | Hero, EventInfo, PerformerCard |
| Feature | 特定機能を持つ | ContactForm, Map |
| Page | ページ全体 | HomePage, PerformersPage |

### 4.2 主要コンポーネント

#### Header
```typescript
interface HeaderProps {
  transparent?: boolean;  // トップページ用透過ヘッダー
}
```

#### PerformerCard
```typescript
interface PerformerCardProps {
  performer: Performer;
  variant?: 'compact' | 'detailed';
}
```

#### EventInfoSection
```typescript
interface EventInfoSectionProps {
  event: Event;
  showTicketButton?: boolean;
}
```

## 5. MicroCMSスキーマ設計

> **注意**: MicroCMSは「お知らせ（news）」のみで使用。
> 出演者・イベント情報などはコード内で管理（`src/data/`）。

### 5.1 news（お知らせ）- MicroCMS管理

| フィールド | 型 | 説明 |
|------------|-----|------|
| title | テキスト | タイトル |
| date | 日付 | 公開日 |
| content | リッチエディタ | 本文 |
| category | 複数選択 | カテゴリ（お知らせ / メディア） |

### 5.2 コード管理データ（`src/data/`）

出演者・イベント情報・サイト設定はTypeScriptファイルで管理:
- `performers.ts` - 出演者情報
- `event.ts` - イベント情報
- `site.ts` - サイト設定
- `archive.ts` - 過去公演情報

## 6. API設計

### 6.1 MicroCMS クライアント

```typescript
// lib/microcms.ts
import { createClient } from "microcms-js-sdk";
import type { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

export type News = {
  title: string;
  date: string;
  content: string;
  category?: ("お知らせ" | "メディア")[];
} & MicroCMSListContent;

// ニュース一覧取得
export async function getNewsList(queries?: MicroCMSQueries) {
  return await client.getList<News>({
    endpoint: "news",
    queries: { orders: "-date", ...queries },
  });
}

// ニュース詳細取得
export async function getNewsDetail(contentId: string, queries?: MicroCMSQueries) {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
}
```

### 6.2 お問い合わせAPI（Cloudflare Workers）

```typescript
// 別リポジトリ: live-inclusive-api
// POST /api/contact

// リクエスト
{
  name: string;
  email: string;
  category: string;
  message: string;
}

// レスポンス
{
  success: boolean;
  message: string;
}
```

通知先:
- メール: Resend経由で管理者へ送信
- LINE: LINE Messaging API経由でグループに通知

## 7. スタイリング設計

### 7.1 Tailwind CSS 設定

```typescript
// tailwind.config.ts
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff44e3',  // アクセントカラー
          dark: '#cc36b5',
        },
        background: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};
```

### 7.2 デザイントークン

| トークン | 値 | 用途 |
|----------|-----|------|
| spacing-section | 80px / 120px | セクション間余白 |
| radius-sm | 4px | 小さいボタン等 |
| radius-md | 8px | カード等 |
| radius-lg | 16px | 大きいコンテナ |

## 8. アクセシビリティ実装

### 8.1 セマンティックHTML

```html
<header role="banner">
  <nav aria-label="メインナビゲーション">
    ...
  </nav>
</header>

<main id="main-content">
  <section aria-labelledby="performers-heading">
    <h2 id="performers-heading">出演者</h2>
    ...
  </section>
</main>

<footer role="contentinfo">
  ...
</footer>
```

### 8.2 キーボードナビゲーション

- すべてのインタラクティブ要素にフォーカス可能
- スキップリンクの実装
- モーダル/メニューのフォーカストラップ

### 8.3 ARIA実装

```tsx
// モバイルメニューの例
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label="メニューを開く"
>
  <MenuIcon />
</button>

<nav
  id="mobile-menu"
  aria-hidden={!isOpen}
>
  ...
</nav>
```

## 9. SEO実装

### 9.1 メタデータ

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: '逗子ライブインクルーシブ',
    template: '%s | 逗子ライブインクルーシブ',
  },
  description: '障がい者アーティストとトップアーティストが共演するインクルーシブなコンサート',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://zushiliveinclusive.com',
    siteName: '逗子ライブインクルーシブ',
  },
};
```

### 9.2 構造化データ

```typescript
// イベント用JSON-LD
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicEvent',
  name: '逗子ライブインクルーシブ 2026',
  startDate: '2026-03-22T15:00:00+09:00',
  location: {
    '@type': 'MusicVenue',
    name: '逗子文化プラザ なぎさホール',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '逗子市',
      addressRegion: '神奈川県',
      addressCountry: 'JP',
    },
  },
};
```

## 10. パフォーマンス最適化

### 10.1 画像最適化

```tsx
import Image from 'next/image';

<Image
  src={performer.photo.url}
  alt={performer.name}
  width={400}
  height={400}
  placeholder="blur"
  blurDataURL={performer.photo.blurDataURL}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

### 10.2 フォント最適化

```typescript
// app/layout.tsx
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});
```

### 10.3 バンドル最適化

- Dynamic imports for heavy components
- Tree shaking
- Code splitting by route

## 11. セキュリティ

### 11.1 環境変数

```env
# .env.local（フロントエンド）
MICROCMS_SERVICE_DOMAIN=xxxxx
MICROCMS_API_KEY=xxxxx
NEXT_PUBLIC_CONTACT_API_URL=https://api.zushiliveinclusive.com

# Cloudflare Workers（live-inclusive-api）
RESEND_API_KEY=xxxxx
LINE_CHANNEL_ACCESS_TOKEN=xxxxx
LINE_GROUP_ID=xxxxx
CONTACT_NOTIFICATION_EMAIL=xxxxx
```

### 11.2 CSP設定

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' https://images.microcms-assets.io; ...",
  },
];
```

## 12. デプロイメント

### 12.1 Vercel設定

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install"
}
```

### 12.2 環境変数（Vercel）

| 変数名 | 環境 | 説明 |
|--------|------|------|
| MICROCMS_SERVICE_DOMAIN | Production/Preview | MicroCMSドメイン |
| MICROCMS_API_KEY | Production/Preview | MicroCMS APIキー |
| NEXT_PUBLIC_CONTACT_API_URL | Production/Preview | お問い合わせAPI URL |

### 12.3 環境変数（Cloudflare Workers）

| 変数名 | 説明 |
|--------|------|
| RESEND_API_KEY | Resend APIキー |
| LINE_CHANNEL_ACCESS_TOKEN | LINE Messaging API トークン |
| LINE_GROUP_ID | LINE通知先グループID |
| CONTACT_NOTIFICATION_EMAIL | 通知先メールアドレス |

### 12.4 Webhook設定

MicroCMSのコンテンツ更新時にVercelで再ビルドをトリガー（任意）

---

## 改訂履歴

| 日付 | バージョン | 変更内容 |
|------|------------|----------|
| 2024-12-04 | 1.0 | 初版作成 |
| 2024-12-09 | 1.1 | 実装内容を反映（MicroCMS、Cloudflare Workers、お問い合わせAPI） |
