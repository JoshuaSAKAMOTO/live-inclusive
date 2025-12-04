# 逗子ライブインクルーシブ 技術設計書

## 1. アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Next.js App                          │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │ │
│  │  │  Pages   │ │Components│ │   Lib    │ │   Types   │  │ │
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
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        microCMS                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐   │
│  │Performers│ │  Events  │ │   News   │ │    Archive    │   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
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
│   │   ├── about/
│   │   │   └── page.tsx        # About
│   │   └── contact/
│   │       └── page.tsx        # お問い合わせ
│   │
│   ├── components/
│   │   ├── ui/                 # 基本UIコンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/             # レイアウトコンポーネント
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── mobile-menu.tsx
│   │   ├── sections/           # ページセクション
│   │   │   ├── hero.tsx
│   │   │   ├── event-info.tsx
│   │   │   ├── performer-card.tsx
│   │   │   └── ...
│   │   └── common/             # 共通コンポーネント
│   │       ├── seo.tsx
│   │       ├── social-links.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── microcms/           # microCMS関連
│   │   │   ├── client.ts       # APIクライアント
│   │   │   └── queries.ts      # クエリ関数
│   │   ├── utils.ts            # ユーティリティ
│   │   └── constants.ts        # 定数
│   │
│   ├── types/
│   │   ├── performer.ts        # 出演者型定義
│   │   ├── event.ts            # イベント型定義
│   │   └── ...
│   │
│   └── styles/
│       └── globals.css         # グローバルスタイル
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── docs/                       # ドキュメント
│   ├── requirements.md
│   └── technical-design.md
│
├── .env.local                  # 環境変数（ローカル）
├── .env.example                # 環境変数サンプル
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
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

## 5. microCMSスキーマ設計

> **注意**: microCMSは「お知らせ（news）」のみで使用。
> 出演者・イベント情報などはコード内で管理（`src/data/`）。

### 5.1 news（お知らせ）- microCMS管理

| フィールド | 型 | 説明 |
|------------|-----|------|
| title | テキスト | タイトル |
| content | リッチエディタ | 本文 |
| category | セレクト | カテゴリ |
| publishedAt | 日時 | 公開日 |

### 5.2 コード管理データ（`src/data/`）

出演者・イベント情報・サイト設定はTypeScriptファイルで管理:
- `performers.ts` - 出演者情報
- `event.ts` - イベント情報
- `site.ts` - サイト設定

## 6. API設計

### 6.1 microCMS クライアント

```typescript
// lib/microcms/client.ts
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
```

### 6.2 データ取得関数

```typescript
// lib/microcms/queries.ts

// 出演者一覧取得
export async function getPerformers() {
  return await client.getList<Performer>({
    endpoint: 'performers',
    queries: { orders: 'order' },
  });
}

// 出演者詳細取得
export async function getPerformer(id: string) {
  return await client.get<Performer>({
    endpoint: 'performers',
    contentId: id,
  });
}

// イベント情報取得
export async function getEvent() {
  return await client.getObject<Event>({
    endpoint: 'event',
  });
}
```

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
# .env.local
MICROCMS_SERVICE_DOMAIN=xxxxx
MICROCMS_API_KEY=xxxxx

# フォーム送信用（任意）
RESEND_API_KEY=xxxxx
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
| MICROCMS_SERVICE_DOMAIN | Production/Preview | microCMSドメイン |
| MICROCMS_API_KEY | Production/Preview | microCMS APIキー |

### 12.3 Webhook設定

microCMSのコンテンツ更新時にVercelで再ビルドをトリガー

---

## 改訂履歴

| 日付 | バージョン | 変更内容 |
|------|------------|----------|
| 2024-12-04 | 1.0 | 初版作成 |
