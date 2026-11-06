# Neovim CLI 風 ポートフォリオサイト

Neovim / ターミナルツールをモチーフにした、ビルド不要（CDN完結型）のデベロッパー向けポートフォリオです。

## 特徴

- **CDN完結 (ビルド不要)**
  - Tailwind CSS, FontAwesome, Devicon, PrismJS をすべてCDN経由で読み込んでいるため、Node.js や npm のインストール・ビルド作業は一切不要です。
  - HTMLファイルを開くだけでローカルでも即座に動作します。
- **Neovim TUI 風のUI & ギミック**
  - **バッファタブ & Neo-Tree風サイドバー**: ファイル切り替え（`about.md`, `skills.ts`, `projects.json`, `career.yml`, `contact.sh`）
  - **Lualine風ステータスバー**: モード表示、ブランチ名、エンコーディング、行番号
  - **インタラクティブなコマンドライン**: `:` でコマンドモードに入り、`:about`, `:skills`, `:theme catppuccin`, `:w`, `:q` などのコマンドが実行可能
  - **ショートカットキー**: `1`〜`5` でファイル切り替え、`m` でUI表示とソースコード表示の切り替え
  - **テーマ切り替え**: Tokyo Night, Catppuccin, Gruvbox に対応
- **後からのデータ編集が簡単**
  - `data.js` を編集するだけで、名前・自己紹介・スキル・プロジェクト・経歴・連絡先がすべて更新されます。

---

## データのカスタマイズ方法

自己紹介や実績のデータはすべて **`data.js`** にまとまっています。
このファイル内の各プロパティをご自身の情報に書き換えてください。

- `profile`: 名前、ユーザー名、肩書、自己紹介文、SNSリンク
- `skills`: 言語、フレームワーク、DevOps/ツールの習熟度
- `projects`: 制作実績のタイトル、概要、技術スタック、GitHub/Demoリンク
- `career`: 経歴・学歴・主な実績
- `contact`: メールアドレス、連絡先情報

---

## GitHub Pages での公開手順

このポートフォリオはそのまま GitHub に push するだけで、GitHub Pages を通じて世界中に無料公開できます。

### 1. Git リポジトリの初期化とコミット

```bash
git init
git add .
git commit -m "Initial commit: Neovim CLI Portfolio"
```

### 2. GitHub リポジトリを作成して Push

GitHub 上で新規リポジトリ（例: `portfolio` または `<username>.github.io`）を作成し、以下を実行します：

```bash
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### 3. GitHub Pages の有効化

1. GitHub のリポジトリページを開きます。
2. 上部メニューの **[Settings]** をクリック。
3. 左サイドバーの **[Pages]** をクリック。
4. **Build and deployment** の **Source** で **「Deploy from a branch」** を選択。
5. **Branch** で `main` ブランチ、フォルダを `/ (root)` に設定して **[Save]** をクリック。
6. 数十秒〜数分で `https://<あなたのユーザー名>.github.io/<リポジトリ名>/` に公開されます！
