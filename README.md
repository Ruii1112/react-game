# 白の部屋からの脱出

React + TypeScript + Viteで構築された、脱出ゲーム風のパズルゲームです。シンプルで洗練されたデザインと直感的な操作性を重視したWebアプリケーションです。

## 技術スタック

- **React 19** - 最新のUIフレームワーク
- **TypeScript** - 型安全な開発
- **Vite** - 高速なビルドツール
- **Tailwind CSS v3.4** - ユーティリティファーストのCSSフレームワーク
- **shadcn/ui** - モダンなUIコンポーネントライブラリ（Radix UI基盤）
- **Lucide React** - アイコンセット
- **React Context + useReducer** - 状態管理

## ゲーム概要

白い部屋に閉じ込められたあなたは、5つの扉に隠されたパズルを解いて脱出を目指します。

### 主な特徴

- 🚪 5つの扉（パズル）を順番に解いて脱出
- 🔐 各扉にはパスワードが必要
- 🎯 正解すると次の扉が自動的に開く
- ✅ 解答済みの扉に戻ると正解が表示され、入力欄が非活性になる
- 💾 進捗と解答状態はローカルストレージに自動保存
- 🔄 右下の「最初から」ボタンでリセット可能
- ⚡ 正解後1.5秒で自動的に次の扉へ移動
- 🎨 シンプルで洗練されたデザイン

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
│   │   │   ├── AnswerSection.tsx    # パスワード入力
│   │   │   ├── PuzzleGame.tsx       # メインゲーム
│   │   │   ├── PuzzleView.tsx       # 扉（パズル）表示
│   │   │   ├── ResetButton.tsx      # リセットボタン
│   │   │   ├── UnlockMessage.tsx    # 脱出成功メッセージ
│   │   │   └── index.ts
│   │   ├── ui/            # shadcn/ui コンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   └── index.ts
│   ├── contexts/          # React Context
│   │   └── PuzzleContext.tsx
│   ├── lib/               # ユーティリティライブラリ
│   │   └── utils.ts
│   ├── types/             # TypeScript型定義
│   │   └── puzzle.ts
│   ├── utils/             # ユーティリティ関数
│   │   ├── constants.ts   # パズルデータ
│   │   └── storage.ts     # ローカルストレージ操作
│   ├── index.css          # グローバルスタイル
│   ├── main.tsx
│   └── App.tsx
├── components.json        # shadcn/ui設定
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

# コード品質チェック
npm run lint
```

## パズル画像の準備

パズル画像は `public/images/puzzles/` ディレクトリに配置してください。
- ファイル名: `puzzle1.jpeg`, `puzzle2.PNG`, `puzzle3.PNG`, `puzzle4.PNG`, `puzzle5.jpeg`
- 推奨サイズ: 幅800px以下、高さ600px以下
- 対応形式: JPG, PNG, JPEG

## パスワード設定の変更

`src/utils/constants.ts` でパスワードを変更できます：

```typescript
{
  id: 1,
  imagePath: '/images/puzzles/puzzle1.jpeg',
  answer: '3232',         // この扉のパスワード
  nextPassword: '3232',   // 次の扉を開けるパスワード
  unlocked: true,         // 最初から開いているか
  unlockPassword: undefined // この扉を開けるのに必要なパスワード
}
```

## 現在のパスワード設定

- 扉1: **3232** → 扉2を開ける
- 扉2: **3125** → 扉3を開ける（扉1のクリアで解放）
- 扉3: **2331** → 扉4を開ける（扉2のクリアで解放）
- 扉4: **322** → 扉5を開ける（扉3のクリアで解放）
- 扉5: **4222** → 脱出成功（扉4のクリアで解放）

## アーキテクチャの特徴

- **型安全**: TypeScriptによる完全な型定義
- **コンポーネント設計**: 責務を分離した再利用可能なコンポーネント
- **状態管理**: React ContextとuseReducerによる予測可能な状態管理（解放状態と解答済み状態を分離管理）
- **UIライブラリ**: shadcn/ui + Tailwind CSSによるシンプルで統一されたデザイン
- **レスポンシブ**: モバイルファーストのレスポンシブデザイン
- **パフォーマンス**: Viteによる高速なHMRと最適化されたビルド
- **ユーザビリティ**: 直感的なUI/UXと自動進行システム、解答済み扉の視覚的フィードバック

## 主要技術的決定事項

### Tailwind CSS v3.4選択の理由
- v4ではなくv3.4を採用（安定性とcomponents.jsonとの互換性のため）
- PostCSS設定の最適化

### shadcn/ui統合
- Radix UIをベースとした高品質なプリミティブコンポーネント
- アクセシビリティを重視した設計
- カスタマイズ可能なバリアントシステム

### 状態管理パターン
- useReducerによる集中化された状態管理
- TypeScriptでの厳密なアクション型定義
- ローカルストレージとの同期機能

## ライセンス

MIT