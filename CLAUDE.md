# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

「白の部屋からの脱出」- React 19 + TypeScript + Viteで構築された脱出ゲーム風パズルアプリケーション。

### 主要機能
- 画像ベースのパズルゲーム（5つの扉）
- 順次解放システム：正解すると次の扉が自動的に開く
- タブUI：解放された扉は自由に移動可能
- 解答済み扉の表示：既に解いた扉に戻ると、正解が表示され入力欄が非活性になる
- 自動遷移：正解後1.5秒で自動的に次の扉に移動
- 進捗管理：ローカルストレージで進捗と解答状態を自動保存
- リセット機能：右下の「最初から」ボタンで進捗をクリア
- シンプルなデザイン：白背景、最小限の装飾

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
- カスタムアニメーションは `index.css` の `@layer utilities` で定義（現在は最小限に抑制）

### shadcn/ui統合
- Radix UIベースの高品質コンポーネント
- `components/ui/` にコンポーネントを配置
- `components.json` で設定管理

## 現在のデザイン方針

### シンプルで洗練されたUI
- **背景色**: 白（#ffffff）
- **進捗バー**: 削除済み
- **アニメーション**: 最小限に抑制
- **装飾的要素**: 削減（アイコンなど最小限）
- **フォーカス**: ユーザビリティと機能性

## アーキテクチャ

### 状態管理
- **React Context API + useReducer**を使用してグローバル状態管理を実現
- `contexts/PuzzleContext.tsx`がアプリケーション全体の状態を管理
- ローカルストレージで進捗と解答済み状態を自動保存/復元（`utils/storage.ts`）
- `unlockedPuzzles`: 解放された扉の管理
- `solvedPuzzles`: 解答済み扉の管理（正解表示と入力欄の非活性化に使用）
- 型安全なアクションベースの状態更新

### コンポーネント構造
```
src/components/
├── game/                    # ゲームロジック関連
│   ├── PuzzleGame.tsx      # メインゲームコンポーネント
│   ├── PuzzleView.tsx      # タブUIと扉（パズル）画像表示
│   ├── AnswerSection.tsx   # パスワード入力とフィードバック
│   ├── UnlockMessage.tsx   # 脱出成功時のメッセージ
│   ├── ResetButton.tsx     # リセットボタン
│   └── index.ts           # エクスポート管理
└── ui/                     # shadcn/ui コンポーネント
    ├── button.tsx         # ボタンコンポーネント
    ├── card.tsx           # カードコンポーネント
    ├── input.tsx          # 入力コンポーネント
    ├── tabs.tsx           # タブコンポーネント
    └── ...               # その他UIコンポーネント
```

### 脱出ゲーム風の文言

#### UI文言
- タイトル: 「白の部屋からの脱出」
- タブ: 「扉 1」「扉 2」など
- 入力欄: 「パスワード入力」
- ボタン: 「確認」「解除成功」
- リセット: 「最初から」

#### フィードバックメッセージ
- 正解時: 「正解！扉が開きました」
- 不正解時: 「違うようです...」
- ロック中: 「この扉は閉ざされています」「前の扉を開けてから挑戦してください」
- 脱出成功: 「脱出成功！」「白の部屋から無事に脱出できました」

### データフローとロジック
1. **パズルデータ**: `utils/constants.ts` の `PUZZLES_DATA` で定義
2. **状態管理**: `PuzzleContext` が状態を一元管理
3. **アクション**: TypeScriptで型定義されたアクションで状態を更新
4. **コンポーネント間通信**: `usePuzzle` フックで状態にアクセス
5. **自動遷移**: 正解後1.5秒で `CONTINUE_TO_NEXT` アクションを自動実行
6. **扉の解放**: 前の扉の正解で次の扉が開く仕組み

### パズル設定の変更方法
`src/utils/constants.ts` の `PUZZLES_DATA` を編集：
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

### 現在のパスワード
- 扉1: 3232
- 扉2: 3125 
- 扉3: 2331
- 扉4: 322
- 扉5: 4222

### スタイリングシステム
- **Tailwind CSS v3.4**: ユーティリティファーストのCSS
- **shadcn/ui**: Radix UIベースの高品質コンポーネント
- **Lucide React**: アイコンライブラリ（最小限の使用）
- **シンプルなデザイン**: 白背景、最小限の装飾、フラットなUI

### 型定義システム
- `types/puzzle.ts`: パズル関連の完全な型定義
- `PuzzleState`: アプリケーション状態の型（`unlockedPuzzles`と`solvedPuzzles`を含む）
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
- `.gitignore` - 環境変数やキャッシュファイルを適切に除外

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

## 最近の主な変更

1. **タイトル変更**: 「謎解きゲーム」→「白の部屋からの脱出」
2. **UIのシンプル化**:
   - 進捗バーを削除
   - アニメーション効果を削減
   - 背景を白に変更
   - 装飾的要素を最小化
3. **文言の脱出ゲーム風への変更**:
   - パズル → 扉
   - 答え → パスワード
   - 正解メッセージなどを脱出ゲーム風に
4. **回答欄のサイズ縮小**: より控えめなデザインに
5. **解答済み扉の機能追加**:
   - 既に解いた扉に戻ると、回答欄に正解が自動表示される
   - 解答済みの扉では入力欄が非活性になる
   - `solvedPuzzles`状態を追加して解答履歴を管理