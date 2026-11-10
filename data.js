/**
 * ポートフォリオのモックデータ
 * 後からこのファイルの内容をご自身の情報に書き換えるだけで、サイト全体に反映されます。
 */
const PORTFOLIO_DATA = {
  profile: {
    username: "touya",
    displayName: "Touya Takahashi",
    role: "Full-Stack Developer / Systems Architect",
    location: "Tokyo, Japan",
    bio: [
      "Webアプリケーションの設計・開発からクラウドインフラの構築まで幅広く手がけるエンジニア。",
      "パフォーマンスチューニングとCLI / ターミナルツールが好物です。",
      "NeovimとRust / TypeScriptをこよなく愛しています。"
    ],
    avatarUrl: "images/name-r-jelly.png",
    statusMessage: "💡 常に新しい技術と効率的な開発環境を探求中",
    socials: [
      { name: "GitHub", url: "https://github.com/Tooyaes", icon: "fab fa-github", handle: "@Tooyaes" },
      { name: "X (Twitter)", url: "https://x.com/example", icon: "fab fa-x-twitter", handle: "@touya_dev" },
      { name: "Zenn", url: "https://zenn.dev", icon: "fas fa-book-open", handle: "touya" },
      { name: "Qiita", url: "https://qiita.com", icon: "fas fa-feather-alt", handle: "touya" }
    ]
  },

  skills: {
    languages: [
      { name: "TypeScript", level: "Advanced", years: "4 yrs", exp: 90, tag: "Primary" },
      { name: "JavaScript", level: "Expert", years: "5 yrs", exp: 95, tag: "Primary" },
      { name: "Go", level: "Intermediate", years: "2 yrs", exp: 75, tag: "Backend" },
      { name: "Python", level: "Intermediate", years: "3 yrs", exp: 80, tag: "Tooling/Data" },
      { name: "Rust", level: "Learning", years: "1 yr", exp: 60, tag: "Interest" },
      { name: "HTML5/CSS3", level: "Expert", years: "5 yrs", exp: 95, tag: "Frontend" }
    ],
    frameworks: [
      { name: "Next.js / React", level: "Advanced", years: "4 yrs", exp: 90 },
      { name: "Vue.js / Nuxt", level: "Intermediate", years: "2 yrs", exp: 75 },
      { name: "Node.js (NestJS / Express)", level: "Advanced", years: "4 yrs", exp: 85 },
      { name: "Tailwind CSS", level: "Expert", years: "3 yrs", exp: 95 },
      { name: "Gin / Echo (Go)", level: "Intermediate", years: "2 yrs", exp: 70 }
    ],
    devops_and_tools: [
      { name: "Docker / Compose", level: "Advanced", years: "3 yrs" },
      { name: "AWS (S3, CloudFront, Lambda, ECS)", level: "Intermediate", years: "2 yrs" },
      { name: "Cloudflare (Workers, Pages)", level: "Advanced", years: "2 yrs" },
      { name: "Git / GitHub Actions (CI/CD)", level: "Advanced", years: "4 yrs" },
      { name: "Neovim (Lua config)", level: "Hobbyist & Daily Driver", years: "3 yrs" },
      { name: "Linux / Shell Scripting", level: "Advanced", years: "4 yrs" }
    ]
  },

  projects: [
    {
      id: "term-flow",
      title: "TermFlow CLI",
      category: "CLI Tool / Go",
      summary: "ターミナル上でタスクとGitワークフローを一括管理するインタラクティブTUIツール。",
      stars: 124,
      techStack: ["Go", "Bubbletea", "Git API", "SQLite"],
      features: [
        "Vim風キーバインドによる軽快なタスク操作",
        "PR作成とブランチ切り替えのワンクリック自動化",
        "オフラインファースト設計"
      ],
      links: {
        github: "https://github.com/example/term-flow",
        demo: "https://termflow-demo.example.com"
      }
    },
    {
      id: "code-canvas",
      title: "CodeCanvas",
      category: "Web Application / OSS",
      summary: "リアルタイムでコード断片とアーキテクチャ図を同時にプレビュー・共有できるオンラインエディタ。",
      stars: 382,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Monaco Editor", "WebAssembly"],
      features: [
        "ブラウザ完結の高速WASMコード実行エンジン",
        "Mermaid.jsを用いたリアルタイムダイアグラム生成",
        "URLパラメータへのセッション状態エンコード"
      ],
      links: {
        github: "https://github.com/example/code-canvas",
        demo: "https://codecanvas.example.com"
      }
    },
    {
      id: "fast-cdn-deployer",
      title: "FastCDN Deployer",
      category: "DevOps / Node.js",
      summary: "静的アセットをCloudflare / S3へ即座に並列アップロード＆差分キャッシュクリアするGitHub Action。",
      stars: 89,
      techStack: ["TypeScript", "Node.js", "AWS SDK", "Cloudflare API"],
      features: [
        "コンテンツハッシュ比較による差分のみのミリ秒単位アップロード",
        "自動Brotli/Gzip事前圧縮",
        "詳細なデプロイサマリーレポート生成"
      ],
      links: {
        github: "https://github.com/example/fast-cdn-deployer"
      }
    }
  ],

  career: [
    {
      period: "2023.04 - Present",
      role: "フルスタックエンジニア",
      company: "Tech Innovators Inc. (仮)",
      description: "SaaSプロダクトのフロントエンド刷新およびマイクロサービスのAPI設計・Go言語でのリプレイスをリード。",
      highlights: [
        "Next.js App Routerへの移行によるページ表示速度40%改善",
        "GitHub ActionsのCIパイプライン最適化でビルド時間を半減"
      ]
    },
    {
      period: "2021.04 - 2023.03",
      role: "Webアプリケーション開発者",
      company: "Digital Solutions Ltd. (仮)",
      description: "クライアントワークにおけるWebシステム開発、React / TypeScript / Node.jsを用いた新規開発に従事。",
      highlights: [
        "社内向け共通コンポーネントライブラリの設計・構築",
        "新卒・若手メンバー向けコードレビュー・メンター担当"
      ]
    },
    {
      period: "2017.04 - 2021.03",
      role: "情報科学科 学士",
      company: "National University (仮)",
      description: "アルゴリズム、分散システム、ネットワーク基礎の学習と研究。",
      highlights: ["卒業研究: ピアツーピア分散ネットワークにおけるレイテンシ最適化"]
    }
  ],

  contact: {
    email: "contact@example.com",
    pgpKeyId: "4A9F 8B21 C3E4 D5F6",
    availability: "フリーランス案件・技術相談など随時受付中",
    preferredContact: "メール または X (Twitter) のDMへお気軽にどうぞ"
  }
};
