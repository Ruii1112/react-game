# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

React 19 + TypeScript + Viteで構築された謎解きゲームアプリケーション。

### 主要機能
- 画像ベースのパズルゲーム（5つのパズル）
- 順次解放システム：正解すると次の問題が自動的に解放される
- タブUI：解放された問題は自由に閲覧可能
- 自動遷移：正解後1.5秒で自動的に次の問題に移動
- 進捗管理：ローカルストレージで進捗を自動保存
- リセット機能：右下のリセットボタンで進捗をクリア可能
- 美しいUI：グラデーション背景、アニメーション効果

## 開発コマンド

```bash
# 開発サーバー起動（http://localhost:5173）
npm run dev

# TypeScriptチェックとビルド
npm run build

# ESLintによるコード品質チェック
npm run lint

# ビルド後のプレビュー
npm run preview
```

## 重要な技術的注意点

### Tailwind CSS v3.4
- **v4ではなくv3.4を使用** - 安定性とcomponents.jsonとの互換性のため
- PostCSS設定は `postcss.config.js` で管理
- カスタムアニメーションは `index.css` の `@layer utilities` で定義

### shadcn/ui統合
- Radix UIベースの高品質コンポーネント
- `components/ui/` にコンポーネントを配置
- `components.json` で設定管理

## アーキテクチャ

### 状態管理
- **React Context API + useReducer**を使用してグローバル状態管理を実現
- `contexts/PuzzleContext.tsx`がアプリケーション全体のパズル状態を管理
- ローカルストレージで進捗を自動保存/復元（`utils/storage.ts`）
- 型安全なアクションベースの状態更新

### コンポーネント構造
```
src/components/
├── game/                    # ゲームロジック関連
│   ├── PuzzleGame.tsx      # メインゲームコンポーネント
│   ├── PuzzleView.tsx      # タブUIとパズル画像表示
│   ├── AnswerSection.tsx   # 回答入力とフィードバック
│   ├── GameProgress.tsx    # 進捗表示
│   ├── UnlockMessage.tsx   # 最終クリア時のメッセージ
│   ├── ResetButton.tsx     # リセットボタン
│   └── index.ts           # エクスポート管理
└── ui/                     # shadcn/ui コンポーネント
    ├── button.tsx         # ボタンコンポーネント
    ├── card.tsx           # カードコンポーネント
    ├── input.tsx          # 入力コンポーネント
    ├── tabs.tsx           # タブコンポーネント
    └── ...               # その他UIコンポーネント
```

### データフローとロジック
1. **パズルデータ**: `utils/constants.ts` の `PUZZLES_DATA` で定義
2. **状態管理**: `PuzzleContext` が状態を一元管理
3. **アクション**: TypeScriptで型定義されたアクションで状態を更新
4. **コンポーネント間通信**: `usePuzzle` フックで状態にアクセス
5. **自動遷移**: 正解後1.5秒で `CONTINUE_TO_NEXT` アクションを自動実行
6. **パズル解放**: 前の問題の正解で次の問題が解放される仕組み

### パズル設定の変更方法
`src/utils/constants.ts` の `PUZZLES_DATA` を編集：
```typescript
{
  id: 1,
  imagePath: '/images/puzzles/puzzle1.jpeg',
  answer: '3232',         // 正解の数字
  nextPassword: '3232',   // 次の問題を解放するパスワード
  unlocked: true,         // 最初から解放されているか
  unlockPassword: undefined // この問題の解放に必要なパスワード
}
```

### 現在のパズル答え
- パズル1: 3232
- パズル2: 3125 
- パズル3: 2331
- パズル4: 322
- パズル5: 4222

### スタイリングシステム
- **Tailwind CSS v3.4**: ユーティリティファーストのCSS
- **shadcn/ui**: Radix UIベースの高品質コンポーネント
- **Lucide React**: アイコンライブラリ
- **カスタムアニメーション**: `index.css` で定義されたアニメーションクラス

### 型定義システム
- `types/puzzle.ts`: パズル関連の完全な型定義
- `PuzzleState`: アプリケーション状態の型
- `PuzzleAction`: 状態更新アクションの型
- 完全な型安全性を保証するTypeScript設定

## 重要なファイル

### 核となるファイル
- `src/contexts/PuzzleContext.tsx` - 状態管理の中核
- `src/utils/constants.ts` - パズルデータの定義
- `src/components/game/PuzzleGame.tsx` - ゲームのメインUI
- `src/utils/storage.ts` - ローカルストレージ操作

### 設定ファイル
- `components.json` - shadcn/ui設定
- `tailwind.config.js` - Tailwind CSS設定
- `postcss.config.js` - PostCSS設定

## トラブルシューティング

### よくある問題と解決方法

1. **Tailwind CSSが効かない場合**
   - `postcss.config.js` の設定を確認
   - v3.4を使用しているか確認（v4は未対応）

2. **パズル画像が表示されない場合**
   - `public/images/puzzles/` に画像が配置されているか確認
   - ファイル名が `constants.ts` の設定と一致しているか確認

3. **進捗がリセットされない場合**
   - ブラウザの開発者ツールでローカルストレージを確認
   - `localStorage.clear()` で手動クリア

4. **型エラーが発生する場合**
   - `types/puzzle.ts` の型定義を確認
   - TypeScriptバージョンとの互換性を確認