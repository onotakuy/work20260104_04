# マドゥロ大統領拘束に対する各国の反応マップ

2026年1月3日の米軍によるベネズエラへの攻撃とニコラス・マドゥロ大統領拘束に対する主要国の反応を世界地図上に視覚化した静的なWebページです。

## 機能

- 世界地図上に各国の反応を色分けして表示
- 各国の反応を4つのカテゴリに分類：
  - 🔴 強く非難（反対）
  - 🟡 懸念表明・中立的立場
  - 🟢 支持・肯定的反応
  - ⚪ 公式反応なし
- 地図上のマーカーをクリックすると詳細情報を表示
- 各国の反応詳細をカード形式で一覧表示
- レスポンシブデザイン対応

## GitHub Pagesへのデプロイ手順

### 方法1: GitHubリポジトリ経由（推奨）

1. **GitHubにリポジトリを作成**
   - GitHubで新しいリポジトリを作成します
   - リポジトリ名は任意（例: `maduro-reactions-map`）

2. **ファイルをアップロード**
   - このディレクトリ内のすべてのファイルをGitHubリポジトリにアップロードします：
     - `index.html`
     - `styles.css`
     - `script.js`
     - `data.js`
     - `README.md`

3. **GitHub Pagesを有効化**
   - リポジトリの「Settings」タブを開く
   - 左側のメニューから「Pages」を選択
   - 「Source」セクションで「Deploy from a branch」を選択
   - 「Branch」で「main」（または「master」）を選択し、「/ (root)」を選択
   - 「Save」をクリック

4. **デプロイ完了**
   - 数分後、`https://[ユーザー名].github.io/[リポジトリ名]/` でアクセス可能になります

### 方法2: GitHub CLIを使用

```bash
# リポジトリを初期化
git init
git add .
git commit -m "Initial commit: Add Maduro reactions map"

# GitHubにリポジトリを作成（GitHub CLIが必要）
gh repo create maduro-reactions-map --public --source=. --remote=origin --push

# GitHub Pagesを有効化
gh api repos/[ユーザー名]/maduro-reactions-map/pages \
  --method POST \
  -f source='{"branch":"main","path":"/"}'
```

### 方法3: 手動でGitコマンドを使用

```bash
# リポジトリを初期化
git init
git add .
git commit -m "Initial commit: Add Maduro reactions map"

# GitHubにリモートリポジトリを追加（事前にGitHubでリポジトリを作成）
git remote add origin https://github.com/[ユーザー名]/[リポジトリ名].git
git branch -M main
git push -u origin main
```

その後、GitHubのWebインターフェースからSettings > Pagesで有効化してください。

## ファイル構成

```
.
├── index.html          # メインのHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # 地図とインタラクションのJavaScript
├── data.js             # 各国の反応データ
└── README.md           # このファイル
```

## 使用技術

- **Leaflet.js**: インタラクティブな地図表示
- **OpenStreetMap**: 地図タイルデータ
- **Vanilla JavaScript**: インタラクション実装
- **CSS3**: モダンなスタイリング

## ブラウザ対応

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## ライセンス

このプロジェクトは教育・情報提供目的で作成されています。
