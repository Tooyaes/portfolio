/**
 * Neovim Portfolio Interactive Logic
 */

// ファイル定義
const FILES = {
  "about.md": {
    name: "about.md",
    icon: "fab fa-markdown text-blue-400",
    lang: "markdown",
    type: "Markdown",
    title: "About Me"
  },
  "skills.ts": {
    name: "skills.ts",
    icon: "devicon-typescript-plain text-blue-400",
    lang: "typescript",
    type: "TypeScript",
    title: "Skills & Technologies"
  },
  "projects.json": {
    name: "projects.json",
    icon: "fas fa-code text-yellow-400",
    lang: "json",
    type: "JSON",
    title: "Featured Projects"
  },
  "career.yml": {
    name: "career.yml",
    icon: "fas fa-file-invoice text-red-400",
    lang: "yaml",
    type: "YAML",
    title: "Work Experience & Education"
  },
  "contact.sh": {
    name: "contact.sh",
    icon: "fas fa-terminal text-green-400",
    lang: "bash",
    type: "Shell Script",
    title: "Contact & Inquiries"
  }
};

let currentFile = "about.md";
let viewMode = "rendered"; // "rendered" or "raw"
let currentTheme = "tokyo-night";

// DOM要素参照
const treeContainer = document.getElementById("file-tree");
const tabContainer = document.getElementById("tab-bar");
const editorContent = document.getElementById("editor-content");
const lineNumbers = document.getElementById("line-numbers");
const statusMode = document.getElementById("status-mode");
const statusFile = document.getElementById("status-file");
const statusFileType = document.getElementById("status-filetype");
const statusPos = document.getElementById("status-pos");
const cmdInput = document.getElementById("cmd-input");
const cmdOutput = document.getElementById("cmd-output");
const sidebar = document.getElementById("sidebar");

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  renderTree();
  renderTabs();
  openFile("about.md");
  setupEventListeners();
  setupCommandSystem();
});

// ファイルツリーの描画
function renderTree() {
  treeContainer.innerHTML = "";
  Object.keys(FILES).forEach((fileKey) => {
    const file = FILES[fileKey];
    const item = document.createElement("div");
    item.className = `tree-item px-3 py-1.5 cursor-pointer text-sm flex items-center gap-2 rounded select-none ${
      currentFile === fileKey ? "active" : ""
    }`;
    item.innerHTML = `
      <i class="${file.icon} text-base w-4 text-center"></i>
      <span class="truncate">${file.name}</span>
    `;
    item.addEventListener("click", () => openFile(fileKey));
    treeContainer.appendChild(item);
  });
}

// バッファタブバーの描画
function renderTabs() {
  tabContainer.innerHTML = "";
  Object.keys(FILES).forEach((fileKey, index) => {
    const file = FILES[fileKey];
    const tab = document.createElement("div");
    tab.className = `nvim-tab px-3 py-1.5 cursor-pointer text-xs flex items-center gap-2 border-r border-[var(--border-color)] select-none ${
      currentFile === fileKey ? "active" : "text-gray-400"
    }`;
    tab.innerHTML = `
      <span class="text-[var(--text-muted)] text-[10px]">${index + 1}:</span>
      <i class="${file.icon} text-xs"></i>
      <span>${file.name}</span>
      <span class="hover:text-red-400 ml-1 text-gray-500 text-[10px]">&times;</span>
    `;
    tab.addEventListener("click", () => openFile(fileKey));
    tabContainer.appendChild(tab);
  });
}

// ファイルを開く
function openFile(fileKey) {
  if (!FILES[fileKey]) return;
  currentFile = fileKey;
  const file = FILES[fileKey];

  // ステータスライン更新
  statusFile.textContent = file.name;
  statusFileType.textContent = file.type;

  // ツリーとタブのアクティブ状態更新
  renderTree();
  renderTabs();

  // コンテンツ描画
  renderFileContent(fileKey);
}

// コンテンツの描画振り分け
function renderFileContent(fileKey) {
  if (viewMode === "raw") {
    renderRawCode(fileKey);
  } else {
    renderRenderedUI(fileKey);
  }
}

// Raw Code（シンタックスハイライト付きソースコード）の生成・表示
function renderRawCode(fileKey) {
  let rawText = "";
  const lang = FILES[fileKey].lang;

  switch (fileKey) {
    case "about.md":
      rawText = `# ${PORTFOLIO_DATA.profile.displayName} (@${PORTFOLIO_DATA.profile.username})\n\n` +
        `> ${PORTFOLIO_DATA.profile.role}\n` +
        `> 📍 ${PORTFOLIO_DATA.profile.location}\n\n` +
        `## 🧑‍💻 Overview\n` +
        PORTFOLIO_DATA.profile.bio.join("\n") + "\n\n" +
        `## 🌐 Connect\n` +
        PORTFOLIO_DATA.profile.socials.map(s => `- [${s.name}](${s.url}) : ${s.handle}`).join("\n");
      break;

    case "skills.ts":
      rawText = `export interface SkillSet {\n` +
        `  languages: Skill[];\n` +
        `  frameworks: Skill[];\n` +
        `  devops: Skill[];\n` +
        `}\n\n` +
        `export const skills = ${JSON.stringify(PORTFOLIO_DATA.skills, null, 2)} as const;`;
      break;

    case "projects.json":
      rawText = JSON.stringify(PORTFOLIO_DATA.projects, null, 2);
      break;

    case "career.yml":
      rawText = `# Timeline & Work History\n` +
        `career_history:\n` +
        PORTFOLIO_DATA.career.map(c => 
          `  - period: "${c.period}"\n` +
          `    role: "${c.role}"\n` +
          `    organization: "${c.company}"\n` +
          `    summary: "${c.description}"\n` +
          `    key_achievements:\n` +
          c.highlights.map(h => `      - "${h}"`).join("\n")
        ).join("\n");
      break;

    case "contact.sh":
      rawText = `#!/usr/bin/env bash\n\n` +
        `# Contact ${PORTFOLIO_DATA.profile.displayName}\n` +
        `EMAIL="${PORTFOLIO_DATA.contact.email}"\n` +
        `PGP_FINGERPRINT="${PORTFOLIO_DATA.contact.pgpKeyId}"\n` +
        `STATUS="${PORTFOLIO_DATA.contact.availability}"\n\n` +
        `echo "Sending ping to \${EMAIL}..."\n` +
        `curl -X POST "https://api.portfolio.example/contact" \\\n` +
        `  -d "from=\${USER}" \\\n` +
        `  -d "msg=Hello, let's build something great together!"\n`;
      break;
  }

  // 行番号生成
  const lines = rawText.split("\n");
  lineNumbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join("");

  // PrismJSハイライト
  const highlighted = Prism.highlight(rawText, Prism.languages[lang] || Prism.languages.markup, lang);
  editorContent.innerHTML = `<pre class="font-mono text-sm leading-relaxed whitespace-pre-wrap"><code>${highlighted}</code></pre>`;
}

// Rendered UI（リッチなビジュアルモード）の描画
function renderRenderedUI(fileKey) {
  let contentHtml = "";

  switch (fileKey) {
    case "about.md":
      contentHtml = `
        <div class="space-y-6 max-w-4xl pb-12">
          <!-- Profile Banner -->
          <div class="p-6 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col md:flex-row items-center gap-6">
            <div class="relative">
              <img src="${PORTFOLIO_DATA.profile.avatarUrl}" alt="Avatar" class="w-24 h-24 object-cover rounded-full border-2 border-[var(--accent-blue)] bg-[var(--bg-secondary)] shadow-lg" />
              <span class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-[var(--bg-surface)] rounded-full" title="Online / Open to work"></span>
            </div>
            <div class="flex-1 text-center md:text-left space-y-2">
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 class="text-2xl font-bold text-white tracking-wide">${PORTFOLIO_DATA.profile.displayName}</h1>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/40 text-[var(--accent-cyan)] border border-blue-700/50">@${PORTFOLIO_DATA.profile.username}</span>
              </div>
              <p class="text-[var(--accent-blue)] font-medium text-sm">${PORTFOLIO_DATA.profile.role}</p>
              <p class="text-xs text-[var(--text-muted)] flex items-center justify-center md:justify-start gap-1">
                <i class="fas fa-map-marker-alt text-red-400"></i> ${PORTFOLIO_DATA.profile.location}
              </p>
            </div>
          </div>

          <!-- Status / Intro -->
          <div class="p-4 rounded-md bg-[var(--bg-highlight)]/50 border-l-4 border-[var(--accent-yellow)] text-sm text-[var(--text-primary)]">
            ${PORTFOLIO_DATA.profile.statusMessage}
          </div>

          <!-- Bio Section -->
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[var(--accent-cyan)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
              <i class="fas fa-terminal"></i> About Me
            </h2>
            <div class="space-y-2 text-sm text-[var(--text-primary)] leading-relaxed bg-[var(--bg-surface)]/40 p-4 rounded-lg border border-[var(--border-color)]">
              ${PORTFOLIO_DATA.profile.bio.map(b => `<p class="flex items-start gap-2"><span class="text-[var(--accent-green)]">❯</span> ${b}</p>`).join("")}
            </div>
          </div>

          <!-- Social Links -->
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[var(--accent-cyan)] flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
              <i class="fas fa-share-alt"></i> Connect & Socials
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${PORTFOLIO_DATA.profile.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-blue)] hover:bg-[var(--bg-highlight)] transition-all group">
                  <div class="flex items-center gap-3">
                    <i class="${s.icon} text-lg text-[var(--accent-cyan)] group-hover:scale-110 transition-transform"></i>
                    <div>
                      <p class="text-sm font-semibold text-white">${s.name}</p>
                      <p class="text-xs text-[var(--text-muted)]">${s.handle}</p>
                    </div>
                  </div>
                  <i class="fas fa-arrow-up-right-from-square text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-blue)]"></i>
                </a>
              `).join("")}
            </div>
          </div>
        </div>
      `;
      break;

    case "skills.ts":
      contentHtml = `
        <div class="space-y-6 max-w-4xl pb-12">
          <div class="flex justify-between items-center border-b border-[var(--border-color)] pb-2">
            <h2 class="text-lg font-bold text-[var(--accent-cyan)] flex items-center gap-2">
              <i class="fas fa-layer-group"></i> Skills & Proficiency
            </h2>
            <span class="text-xs text-[var(--text-muted)] font-mono">type: readonly SkillSet</span>
          </div>

          <!-- Languages -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-[var(--accent-blue)] uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-code"></i> Programming Languages
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${PORTFOLIO_DATA.skills.languages.map(item => `
                <div class="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="font-semibold text-sm text-white">${item.name}</span>
                    <span class="text-xs text-[var(--accent-cyan)] font-mono">${item.level} (${item.years})</span>
                  </div>
                  <div class="w-full bg-[var(--bg-secondary)] rounded-full h-1.5 overflow-hidden">
                    <div class="bg-[var(--accent-blue)] h-full rounded-full transition-all duration-500" style="width: ${item.exp}%"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Frameworks & Libraries -->
          <div class="space-y-3 pt-3">
            <h3 class="text-sm font-bold text-[var(--accent-magenta)] uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-cubes"></i> Frameworks & Libraries
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${PORTFOLIO_DATA.skills.frameworks.map(item => `
                <div class="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="font-semibold text-sm text-white">${item.name}</span>
                    <span class="text-xs text-[var(--accent-magenta)] font-mono">${item.level}</span>
                  </div>
                  <div class="w-full bg-[var(--bg-secondary)] rounded-full h-1.5 overflow-hidden">
                    <div class="bg-[var(--accent-magenta)] h-full rounded-full transition-all duration-500" style="width: ${item.exp}%"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- DevOps & Tools -->
          <div class="space-y-3 pt-3">
            <h3 class="text-sm font-bold text-[var(--accent-green)] uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-server"></i> Cloud, DevOps & Tools
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              ${PORTFOLIO_DATA.skills.devops_and_tools.map(item => `
                <div class="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded text-xs flex flex-col justify-between">
                  <span class="font-medium text-white mb-1">${item.name}</span>
                  <span class="text-[10px] text-[var(--text-muted)] font-mono">${item.level}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;
      break;

    case "projects.json":
      contentHtml = `
        <div class="space-y-6 max-w-4xl pb-12">
          <div class="flex justify-between items-center border-b border-[var(--border-color)] pb-2">
            <h2 class="text-lg font-bold text-[var(--accent-cyan)] flex items-center gap-2">
              <i class="fas fa-folder-open"></i> Projects & Products
            </h2>
            <span class="text-xs text-[var(--text-muted)] font-mono">${PORTFOLIO_DATA.projects.length} repositories</span>
          </div>

          <div class="grid grid-cols-1 gap-4">
            ${PORTFOLIO_DATA.projects.map(p => `
              <div class="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-blue)] transition-all space-y-3">
                <div class="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h3 class="text-base font-bold text-white flex items-center gap-2">
                      <i class="fas fa-box text-[var(--accent-orange)]"></i>
                      ${p.title}
                    </h3>
                    <p class="text-xs text-[var(--accent-blue)] font-mono mt-0.5">${p.category}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    ${p.stars ? `
                      <span class="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-yellow-400 font-mono flex items-center gap-1">
                        <i class="fas fa-star text-[10px]"></i> ${p.stars}
                      </span>
                    ` : ""}
                    ${p.links.github ? `
                      <a href="${p.links.github}" target="_blank" class="text-xs px-2.5 py-1 rounded bg-[var(--bg-highlight)] hover:bg-[var(--border-color)] text-white flex items-center gap-1">
                        <i class="fab fa-github"></i> Code
                      </a>
                    ` : ""}
                    ${p.links.demo ? `
                      <a href="${p.links.demo}" target="_blank" class="text-xs px-2.5 py-1 rounded bg-[var(--accent-blue)] hover:bg-blue-600 text-white flex items-center gap-1 font-semibold">
                        <i class="fas fa-external-link-alt text-[10px]"></i> Demo
                      </a>
                    ` : ""}
                  </div>
                </div>

                <p class="text-sm text-[var(--text-primary)] leading-relaxed">${p.summary}</p>

                <!-- Features -->
                <div class="space-y-1 text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] p-3 rounded border border-[var(--border-color)]/60">
                  <p class="text-[var(--accent-cyan)] font-mono font-semibold mb-1">Key Features:</p>
                  ${p.features.map(f => `<div class="flex items-center gap-2"><span class="text-[var(--accent-green)]">•</span> ${f}</div>`).join("")}
                </div>

                <!-- Tech Stack Badges -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  ${p.techStack.map(t => `
                    <span class="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-highlight)] text-[var(--accent-cyan)] font-mono border border-[var(--border-color)]">
                      ${t}
                    </span>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
      break;

    case "career.yml":
      contentHtml = `
        <div class="space-y-6 max-w-4xl pb-12">
          <div class="border-b border-[var(--border-color)] pb-2">
            <h2 class="text-lg font-bold text-[var(--accent-cyan)] flex items-center gap-2">
              <i class="fas fa-history"></i> Career & History
            </h2>
          </div>

          <div class="relative border-l-2 border-[var(--border-color)] ml-3 pl-6 space-y-8">
            ${PORTFOLIO_DATA.career.map(c => `
              <div class="relative group">
                <!-- Dot on the line -->
                <div class="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--accent-blue)] group-hover:scale-125 group-hover:bg-[var(--accent-blue)] transition-all"></div>
                
                <div class="bg-[var(--bg-surface)] p-4 rounded-lg border border-[var(--border-color)] space-y-2">
                  <div class="flex flex-wrap justify-between items-center gap-1">
                    <span class="text-xs font-mono text-[var(--accent-orange)] px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">${c.period}</span>
                    <span class="text-xs text-[var(--text-muted)] font-mono">${c.company}</span>
                  </div>
                  <h3 class="text-base font-bold text-white">${c.role}</h3>
                  <p class="text-sm text-[var(--text-primary)] leading-relaxed">${c.description}</p>
                  ${c.highlights && c.highlights.length > 0 ? `
                    <ul class="text-xs text-[var(--text-muted)] space-y-1 pt-1 border-t border-[var(--border-color)]/50 mt-2">
                      ${c.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-[var(--accent-cyan)]">✔</span> ${h}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
      break;

    case "contact.sh":
      contentHtml = `
        <div class="space-y-6 max-w-3xl pb-12">
          <div class="border-b border-[var(--border-color)] pb-2">
            <h2 class="text-lg font-bold text-[var(--accent-cyan)] flex items-center gap-2">
              <i class="fas fa-paper-plane"></i> Contact & Get in Touch
            </h2>
          </div>

          <div class="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg space-y-4">
            <div class="space-y-2">
              <p class="text-sm text-[var(--text-primary)] leading-relaxed">
                ${PORTFOLIO_DATA.contact.preferredContact}
              </p>
              <div class="p-3 bg-[var(--bg-secondary)] rounded border border-[var(--border-color)] text-xs font-mono space-y-1">
                <div><span class="text-[var(--text-muted)]">STATUS: </span><span class="text-[var(--accent-green)]">${PORTFOLIO_DATA.contact.availability}</span></div>
                <div><span class="text-[var(--text-muted)]">PGP KEY: </span><span class="text-[var(--accent-cyan)]">${PORTFOLIO_DATA.contact.pgpKeyId}</span></div>
              </div>
            </div>

            <!-- Mailto trigger -->
            <div class="pt-2">
              <a href="mailto:${PORTFOLIO_DATA.contact.email}" 
                 class="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-blue)] hover:bg-blue-600 text-white text-sm font-semibold rounded shadow transition-all">
                <i class="fas fa-envelope"></i> Send Email (${PORTFOLIO_DATA.contact.email})
              </a>
            </div>
          </div>

          <!-- Interactive CLI Terminal Simulator for Contact -->
          <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden">
            <div class="bg-[var(--bg-surface)] px-4 py-2 border-b border-[var(--border-color)] text-xs font-mono flex items-center justify-between text-[var(--text-muted)]">
              <span>bash - contact.sh</span>
              <span>interactive</span>
            </div>
            <div class="p-4 font-mono text-xs space-y-2">
              <div class="text-[var(--text-muted)]"># Quick Contact Terminal Simulation</div>
              <div class="text-[var(--text-primary)]">
                <span class="text-[var(--accent-green)]">guest@portfolio</span>:<span class="text-[var(--accent-blue)]">~</span>$ curl -X POST https://api.portfolio.example/ping
              </div>
              <div class="text-[var(--accent-cyan)] pl-2">
                HTTP/2 200 OK<br>
                {"status": "available", "recipient": "${PORTFOLIO_DATA.profile.displayName}", "reply_time": "&lt; 24h"}
              </div>
            </div>
          </div>
        </div>
      `;
      break;
  }

  // 行番号を簡易クリアまたは行数分表示
  lineNumbers.innerHTML = Array.from({ length: 25 }, (_, i) => `<div>${i + 1}</div>`).join("");
  editorContent.innerHTML = contentHtml;
}

// イベントリスナー設定
function setupEventListeners() {
  // モード切り替え (Rendered / Raw Code)
  const toggleBtn = document.getElementById("toggle-view-mode");
  toggleBtn.addEventListener("click", () => {
    viewMode = viewMode === "rendered" ? "raw" : "rendered";
    toggleBtn.textContent = viewMode === "rendered" ? "[Preview]" : "[Raw Code]";
    renderFileContent(currentFile);
  });

  // テーマ切り替え
  const themeSelect = document.getElementById("theme-select");
  themeSelect.addEventListener("change", (e) => {
    setTheme(e.target.value);
  });

  // サイドバー折りたたみ (モバイル対応)
  const toggleSidebarBtn = document.getElementById("toggle-sidebar");
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }

  // Vimライクキーボードショートカット (ブラウザキー衝突に配慮)
  window.addEventListener("keydown", (e) => {
    // 入力欄にフォーカスがあるときは無視
    if (document.activeElement === cmdInput) {
      if (e.key === "Escape") {
        cmdInput.blur();
        cmdInput.value = "";
        statusMode.textContent = "NORMAL";
        statusMode.style.backgroundColor = "var(--lualine-mode-bg)";
        statusMode.style.color = "var(--lualine-mode-fg)";
      }
      return;
    }

    // ':' を押すとコマンドラインへフォーカス
    if (e.key === ":") {
      e.preventDefault();
      cmdInput.focus();
      cmdInput.value = "";
      statusMode.textContent = "COMMAND";
      statusMode.style.backgroundColor = "var(--accent-yellow)";
      statusMode.style.color = "#15161e";
    }

    // 数字キー 1-5 でバッファ切り替え
    const fileKeys = Object.keys(FILES);
    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 1 && num <= fileKeys.length) {
      openFile(fileKeys[num - 1]);
    }

    // 'm' でプレビュー/コードトグル
    if (e.key.toLowerCase() === "m") {
      toggleBtn.click();
    }
  });
}

// テーマ変更関数
function setTheme(themeName) {
  currentTheme = themeName;
  document.documentElement.setAttribute("data-theme", themeName);
  showNotification(`Theme set to '${themeName}'`);
}

// Neovim コマンドライン機能
function setupCommandSystem() {
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const raw = cmdInput.value.trim();
      executeCommand(raw);
      cmdInput.value = "";
      cmdInput.blur();
      statusMode.textContent = "NORMAL";
      statusMode.style.backgroundColor = "var(--lualine-mode-bg)";
      statusMode.style.color = "var(--lualine-mode-fg)";
    }
  });
}

// コマンド実行エンジン
function executeCommand(cmdStr) {
  if (!cmdStr) return;
  const parts = cmdStr.split(" ");
  const cmd = parts[0].toLowerCase();
  const arg = parts[1] ? parts[1].toLowerCase() : "";

  switch (cmd) {
    case "h":
    case "help":
      showHelpModal();
      break;

    case "w":
    case "write":
      showNotification("[OK] Portfolio written to memory successfully.");
      break;

    case "q":
    case "quit":
      showNotification("E37: No write since last change! (It's a web portfolio, can't quit 😉)");
      break;

    case "qa":
    case "q!":
      showNotification("Bye! ...just kidding, reload the page to exit.");
      break;

    case "theme":
      if (["tokyo-night", "catppuccin", "gruvbox"].includes(arg)) {
        document.getElementById("theme-select").value = arg;
        setTheme(arg);
      } else {
        showNotification("Available themes: tokyo-night, catppuccin, gruvbox");
      }
      break;

    case "e":
    case "open":
      if (FILES[arg]) {
        openFile(arg);
      } else {
        const found = Object.keys(FILES).find(k => k.startsWith(arg));
        if (found) {
          openFile(found);
        } else {
          showNotification(`E464: File '${arg}' not found.`);
        }
      }
      break;

    case "about":
      openFile("about.md");
      break;
    case "skills":
      openFile("skills.ts");
      break;
    case "projects":
      openFile("projects.json");
      break;
    case "career":
      openFile("career.yml");
      break;
    case "contact":
      openFile("contact.sh");
      break;

    default:
      showNotification(`E492: Not an editor command: ${cmd}`);
      break;
  }
}

// 通知ポップアップ
function showNotification(msg) {
  cmdOutput.textContent = msg;
  cmdOutput.classList.remove("hidden");
  setTimeout(() => {
    cmdOutput.classList.add("hidden");
  }, 4000);
}

// ヘルプモーダル表示
function showHelpModal() {
  const modal = document.getElementById("help-modal");
  modal.classList.remove("hidden");
}

function closeHelpModal() {
  const modal = document.getElementById("help-modal");
  modal.classList.add("hidden");
}
