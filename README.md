# 謎解きゲーム

React + TypeScript + Viteで構築された、順次解放される謎解きゲームです。美しいUIデザインと直感的なユーザー体験を重視したモダンなWebアプリケーションです。

## 技術スタック

- **React 19** - 最新のUIフレームワーク
- **TypeScript** - 型安全な開発
- **Vite** - 高速なビルドツール
- **Tailwind CSS v3.4** - ユーティリティファーストのCSSフレームワーク
- **shadcn/ui** - モダンなUIコンポーネントライブラリ（Radix UI基盤）
- **Lucide React** - 美しいアイコンセット
- **React Context + useReducer** - 状態管理

## 機能

- 🖼️ 問題は画像で表示
- 🔐 正解すると自動的に次の問題が解放される
- 🎯 タブUIで解放された問題を自由に閲覧可能
- 💾 ローカルストレージで進捗を自動保存
- 📊 リアルタイム進捗表示
- 🔄 リセット機能で進捗をクリア可能
- ⚡ 自動遷移機能（正解後1.5秒で自動的に次の問題へ）
- 🎨 グラデーション背景とアニメーション効果

## プロジェクト構造

```
riddle-game/
├── public/
│   └── images/
│       └── puzzles/        # パズル画像を配置するディレクトリ
│           ├── puzzle1.jpeg
│           ├── puzzle2.PNG
│           ├── puzzle3.PNG
│           ├── puzzle4.PNG
│           └── puzzle5.jpeg
├── src/
│   ├── components/         # UIコンポーネント
│   │   ├── game/          # ゲーム関連コンポーネント
│   │   │   ├── AnswerSection.tsx
│   │   │   ├── GameProgress.tsx
│   │   │   ├── PuzzleGame.tsx
│   │   │   ├── PuzzleView.tsx
│   │   │   ├── ResetButton.tsx
│   │   │   ├── UnlockMessage.tsx
│   │   │   └── index.ts
│   │   ├── ui/            # shadcn/ui コンポーネント
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── contexts/          # React Context
│   │   └── PuzzleContext.tsx
│   ├── lib/               # ユーティリティライブラリ
│   │   └── utils.ts       # cn() ユーティリティ関数
│   ├── types/             # TypeScript型定義
│   │   └── puzzle.ts
│   ├── utils/             # ユーティリティ関数
│   │   ├── constants.ts   # パズルデータとアプリ定数
│   │   └── storage.ts     # ローカルストレージ操作
│   ├── index.css          # グローバルスタイル
│   ├── main.tsx
│   └── App.tsx           # メインアプリケーション
├── components.json        # shadcn/ui設定ファイル
├── tailwind.config.js     # Tailwind CSS設定
├── postcss.config.js      # PostCSS設定
└── tsconfig.json         # TypeScript設定
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## パズル画像の準備

パズル画像は `public/images/puzzles/` ディレクトリに配置してください。
- ファイル名: `puzzle1.jpeg`, `puzzle2.PNG`, `puzzle3.PNG`, `puzzle4.PNG`, `puzzle5.jpeg`
- 推奨サイズ: 幅800px以下、高さ600px以下
- 対応形式: JPG, PNG, JPEG

## パズルの設定変更

`src/utils/constants.ts` でパズルの答えを変更できます：

```typescript
{
  id: 1,
  imagePath: '/images/puzzles/puzzle1.jpeg',
  answer: '3232',         // 正解の数字
  nextPassword: '3232',   // 次の問題のパスワード
  unlocked: true,         // 最初から解放されているか
  unlockPassword: undefined // この問題を解放するのに必要なパスワード
}
```

## 現在のパズル設定

現在設定されている答え：
- パズル1: **3232** → 次のパスワード: 3232
- パズル2: **3125** → 次のパスワード: 3125（パズル1のクリアで解放）
- パズル3: **2331** → 次のパスワード: 2331（パズル2のクリアで解放）
- パズル4: **322** → 次のパスワード: 322（パズル3のクリアで解放）
- パズル5: **4222** → 最終問題（パズル4のクリアで解放）

## アーキテクチャの特徴

- **型安全**: TypeScriptによる完全な型定義
- **コンポーネント設計**: 責務を分離した再利用可能なコンポーネント
- **状態管理**: React ContextとuseReducerによる予測可能な状態管理
- **UIライブラリ**: shadcn/ui + Tailwind CSSによるモダンで統一されたデザイン
- **アニメーション**: 滑らかなトランジションとカスタムアニメーション
- **レスポンシブ**: モバイルファーストのレスポンシブデザイン
- **パフォーマンス**: Viteによる高速なHMRと最適化されたビルド
- **ユーザビリティ**: 直感的なUI/UXと自動進行システム

## 主要技術的決定事項

### Tailwind CSS v3.4選択の理由
- v4ではなくv3.4を採用（安定性とcomponents.jsonとの互換性のため）
- PostCSS設定の最適化
- カスタムアニメーションクラスをTailwind layersで定義

### shadcn/ui統合
- Radix UIをベースとした高品質なプリミティブコンポーネント
- アクセシビリティを重視した設計
- カスタマイズ可能なバリアントシステム

### 状態管理パターン
- useReducerによる集中化された状態管理
- TypeScriptでの厳密なアクション型定義
- ローカルストレージとの同期機能