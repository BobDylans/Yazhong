# Yazhong 优化计划

> **目的**:这份文档是给**两个并行 agent**执行用的完整工作清单。当前 `master` 分支的 Yazhong 站(Next.js 16 静态导出,汽车配件营销站)功能完整、typecheck 通过,但有三类可优化点:i18n bug、数据管道隐患、视觉短板。文档分三部分,前两部分(修复 + 清理)由 **Agent A** 执行,第三部分(视觉美化)由 **Agent B** 并行执行,互不冲突。
>
> **执行前必读**:
> - 当前分支 `master`,所有改动直接在工作区
> - 不做新设计,不改变现有视觉调性(除明确指出的主题矛盾)
> - 每完成一块跑 `npm run typecheck && npm run lint` 验证

---

## 并行分工说明

| Agent | 负责范围 | 涉及文件 | 互斥点 |
|-------|---------|---------|--------|
| **A — 修复与清理** | Part 1(i18n)+ Part 2(数据管道)+ Part 3(冗余清理) | `scripts/*`、`src/types/*`、`src/i18n/*`、`src/app/layout.tsx`、`src/app/page.tsx` 等页面的**文案迁移**、`package.json`、删除 Docker/死代码文件 | **不碰** `src/components/*.tsx` 的视觉结构、`src/app/globals.css` 的色彩 token、`src/app/page.tsx` 的板块顺序 |
| **B — 视觉美化** | Part 4(视觉短板) | `src/components/*.tsx` 的视觉结构、`src/app/globals.css`、`src/app/page.tsx` 板块节奏 | **不碰** `scripts/*`、`src/types/*`、`src/i18n/*` 字典 key、`package.json` |

**冲突协调**:
- 两个 agent 都可能改 `src/app/page.tsx` —— A 只改文案(`t()` 调用),B 只改板块顺序/间距。两人在各自分支/worktree 上做,合并时文案迁移和板块调整不冲突(不同行)。
- B 若要新增 i18n key(如新组件的文案),在**自己分支**上往 `en.ts`/`ar.ts` 末尾追加 key,A 不动末尾。合并时取并集。
- 建议两人各自在独立 worktree 分支工作(`git worktree add`),最后由 orchestrator 合并。

---

## Part 1 — i18n 修复 + 页面文案迁移(Agent A)

### 1.1 修 i18n 字典 bug

**`src/i18n/en.ts`** — 补缺失的 `insightsDesc` key。
- 现状:`src/components/SectionHeadings.tsx:44` 调用 `t("insightsDesc")`,但 `en.ts` 没有这个 key → 英文环境下首页博客区会显示原始字符串 `"insightsDesc"`
- `ar.ts:221` 有阿语值
- 补英文:`insightsDesc: "Tips, guides, and inspiration from our team of automotive experts."`

**`src/i18n/ar.ts`** — 补 3 个孤儿 key 的阿语翻译(目前只在 en.ts 有):
- `allProducts`(en: "View All Products")
- `chatOnWA`(en: "Chat on WhatsApp")
- `readMoreReviews`(en: "Read More Reviews")

### 1.2 页面文案迁移到 `t()`

把以下**页面级 UI 文案**从硬编码迁进 `t()`,en.ts/ar.ts 同步补 key:

| 文件:行 | 硬编码文案 | 用 key |
|--------|-----------|-------|
| `src/app/page.tsx:69` | `"View All Products"` | `t("allProducts")`(已有) |
| `src/app/page.tsx:114` | `"Read More Reviews"` | `t("readMoreReviews")`(已有) |
| `src/app/page.tsx:137` | `"Read All Articles"` | 新增 `allArticles` |
| `src/app/blog/page.tsx:88` | `"Chat on WhatsApp"` | `t("chatOnWA")`(已有) |
| `src/app/blog/[slug]/page.tsx:110,115,162,170` | `"All Articles"`/`"Share"`/`"Ask on WhatsApp"`/`"Related Articles"` | `blogAll`/`blogShare`/`blogAskWA`/`blogRelated`(确认存在) |
| `src/app/products/page.tsx:71,73-76,121,141,157` | `"Our Products"`/描述/`"N products"`/`"No products..."`/`"Loading..."` | 新增 `productsTitle`/`productsDesc`/`productCount`/`noProducts`/`loading` |
| `src/components/BlogCard.tsx:59` | `"Read More"` | `blogReadMore`(已有) |
| `src/components/BrandMarquee.tsx:36` | `"Brands"` | 新增 `brandsLabel` |

**明确不做**:`ProductDetails.tsx`(70+ 条产品规格)和 `ProductConfigurator.tsx`(颜色/材质名称)的大数组迁移 —— 是产品数据不是 UI 文案,工作量大且不在本次范围。

### 1.3 删 Tajawal 重复加载

**`src/app/layout.tsx:121`** — 删除 `<link href="https://fonts.googleapis.com/css2?family=Tajawal...">`。`next/font/google` 已自托管 Tajawal(L14-19),这个 `<link>` 是重复请求,浪费 30-50KB 还可能 FOUT。

---

## Part 2 — 数据管道修复(Agent A)

### 2.1 修静默失败(最严重)

**`scripts/fetch-products.mjs:69-71`** 和 **`scripts/fetch-blog.mjs`**(同样模式):
- 现状:`.catch(() => process.exit(0))` → build 永远成功,API 挂了用旧数据发布无人察觉
- 改成:若 `src/data/generated/products-data.ts` **不存在**(首次 build / 新克隆)→ `exit(1)` 让 build 失败(没旧数据不能用空数据);若已存在旧数据 → `exit(0)` 但打**醒目警告**(`⚠️  USING STALE DATA — API failed, serving last successful fetch. Re-run when API recovers.`)

### 2.2 统一环境变量

- `scripts/fetch-*.mjs:12` 用 `ADMIN_API_URL`(build 时,非 public)
- `src/lib/images.ts:10` 用 `NEXT_PUBLIC_ADMIN_URL`(运行时客户端,必须 `NEXT_PUBLIC_` 前缀)
- 这两个**职责不同不能简单合并**,但要在新建的 **`.env.local.example`** 里都文档化,说明各用途

### 2.3 修 prebuild 双跑

**`package.json:32`** — `"build": "npm run prebuild && next build"` 里的 `npm run prebuild &&` 多余(npm 生命周期钩子自动跑 `prebuild`)。改 `"build": "next build"`。每次 build 少拉一次 API。

### 2.4 合并 BlogPost 类型

- `src/types/carfurnisher.ts:32-38` 的 `BlogPost`(旧形状,无 `slug`/`content`/`author`)
- `src/types/index.ts:1-11` 的 `BlogPost`(新形状,`fetch-blog.mjs` 生成的 `blog-data.ts` 用这个)
- 删 `carfurnisher.ts` 里的 `BlogPost`,grep 确认无 `from "@/types/carfurnisher"` 引用 `BlogPost`

### 2.5 修 download-assets.mjs 的 require('fs')

**`scripts/download-assets.mjs:86`** — `require('fs').existsSync(dest)` 在 ESM 抛 `ReferenceError`。把 `existsSync` 加到顶部 `import { writeFileSync, mkdirSync, createWriteStream } from 'fs'`,改 `existsSync(dest)`。

### 2.6 创建 .env.local.example

项目根新建,文档化所有环境变量:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ADMIN_URL=https://admin.rimhappywoods.top
ADMIN_API_URL=https://admin.rimhappywoods.top
```

---

## Part 3 — 冗余清理(Agent A)

### 3.1 删不兼容的 Docker 配置

- **`Dockerfile`** + **`Dockerfile.dev`** + **`docker-compose.yml`**:用 `node server.js`(standalone),跟 `next.config.ts` 的 `output: "export"`(静态)不兼容,模板遗留。删。
- **`.dockerignore`** 删掉(无 Dockerfile 了不需要)

### 3.2 删动画死代码

**`src/lib/animations.tsx`** — `AnimatedSection`、`StaggerWrapper`、`SmoothScrollProvider` 及 variants(`fadeUp`/`fadeIn`/`scaleIn`/`slideLeft`/`slideRight`/`goldGlow`/`staggerContainer`/`staggerItem`)未被任何组件导入(只有 `ProductCard.tsx` 直接 import framer-motion 自己用)。先 `grep -r 'AnimatedSection\|StaggerWrapper\|SmoothScrollProvider' src/` 确认无引用,再删这些导出。
- ⚠️ **Agent B 可能要复用 `animations.tsx` 的 variants 做新动效** —— 协调:若 B 要用,A 保留 variants 只删未用的组件导出;若 B 不用,整文件删。

### 3.3 删 fonts.ts 死代码

**`src/i18n/fonts.ts`** — `ARABIC_FONT_FAMILY`/`ARABIC_FONT_URL` 无人引用(layout.tsx 用 `next/font/google`)。整个文件删。

### 3.4 从 git 移除 products.json

**`src/data/generated/products.json`** — 在 `.gitignore` 但仍被 git 追踪(添加早于规则)。且 `src/data/products.ts` 只消费 `products-data.ts` 不消费 JSON。`git rm --cached src/data/generated/products.json`(保留本地)。`categories.json` 同理检查。

---

## Part 4 — 视觉美化(Agent B)

> 这部分由并行 agent 执行。**不碰 i18n 字典、不碰 scripts、不碰 types**。聚焦视觉结构、板块节奏、组件精致度。

### 现有视觉短板(已核实)

#### 🔴 Critical — 主题定位与实现矛盾

**`src/app/globals.css:60-82`** — `:root` 定义的是**浅色主题**(`--background: #f8f7f4`、`--card: #ffffff`),全站没有 `.dark` 类。但项目自称"黑金 dark-luxury"(见 `DESIGN.md`、`CLAUDE.md`)。金色 `#c99a4a` 在浅底上表现力打折。
- **决策点**:要么真做暗黑(改 `:root` 为黑底),要么承认是浅色 luxury(更新 DESIGN.md 措辞)。
- **建议**:保持当前浅色实现(改动最小),但把 DESIGN.md 里"Dark Luxury / pure black canvas"的描述改成"Warm Luxury / cream canvas with gold accent",消除文档与实现的脱节。若用户想要真暗黑,单独开一个任务。

#### 🟡 High — 板块节奏均质化

**`src/app/page.tsx`** — 所有 section 都是 `py-16 md:py-20` 或 `py-24 md:py-32`,匀速滚动缺戏剧性。板块顺序:Hero → TrustBadges → HowItWorks → IconFeatures → Featured → Reviews → CustomerGallery → BrandMarquee → Insights。
- **改法**:在 Hero 后做紧凑区(TrustBadges + HowItWorks 紧贴),Featured 前加大留白制造"转折感",像杂志的章节分隔。

#### 🟡 High — 标题模式模板化

每个 section 都是 `eyebrow + h2 + 副标题` 三件套(HowItWorks L99-105、CustomerGallery L164-170、ReviewsSection L15-22、BrandMarquee L35-40、InsightsSection L38-46、FeaturedSection L22-29)。BrandMarquee 性质不同却用同样套路。
- **改法**:BrandMarquee 去掉 eyebrow/h2,直接展示;部分 section 用大数字或引言替代三件套。

#### 🟡 High — 加载态/空态简陋

**`src/app/products/page.tsx:155-158`** — 加载态是 `<p>Loading products...</p>` 一行字。L140-143 空态是 `<p>No products found...</p>` 死胡同。
- **改法**:加载态用骨架屏(金色脉冲点 / 卡片占位);空态加"回到全品类"CTA + 联系客服按钮。

#### 🟡 High — ProductCard 产品图白底割裂

**`src/components/ProductCard.tsx:58-66`** — 产品图大概率自带白底,在卡片里形成突兀白方块(浅色主题下也割裂,暗黑更严重)。且无价格信息。
- **改法**:图片容器加渐变压暗层或 `mix-blend-mode: multiply`;价格区加 `"From $XX"` 或 `"Enquire"` 占位。

#### 🟡 Medium — Reveal 动画过于统一

全站 `Reveal direction="up"`(`page.tsx:83`、`CustomerGallery:162,179`、`HowItWorks:23,97,116`、`ReviewsSection:13`),只有 `CustomerGallery:217` 用了 `direction="right"`。入场全是"从下淡入",视觉疲劳。
- **改法**:在 `Reveal` 加 `cascade` 模式(按网格 row/col 计算延迟),或不同 section 用不同 direction(如 BrandMarquee 用 `left`/`right` 横向)。

#### 🟡 Medium — 缺视觉锚点

全站没有大数字统计区、没有 before/after 对比、没有 pull-quote。汽车配件站尤其需要这些。
- **改法**:Hero 下方或 Featured 前插 stats 条("15,000+ 安装车辆"/"50+ 国家"/"10 年经验"),数字滚动计数。

#### 🟢 Low — CTA 无反馈、平板断点拥挤

- CTA 按钮(`HeroBanner:66-78`、`page.tsx:64-76`)只有 `active:scale-[0.97]`,无 loading/success 态
- VehicleSearch 在 640-768px 三个 select + 按钮挤一行

### 可借鉴的组件/模式(精选 4 个,匹配 warm-luxury 调性)

#### 1. 数字滚动计数器(CountUp Stats)
- **效果**:进视口时数字从 0 滚到目标值,金色文字
- **位置**:Hero 下方 stats 条
- **实现**:`useInView` + `requestAnimationFrame` 缓动,或 `framer-motion` 的 `useSpring`。数字 `text-4xl text-gold`,下方小字说明

#### 2. Before/After 对比滑块
- **效果**:拖动对比"安装前/后",直观展示产品价值
- **位置**:首页 CustomerGallery 附近
- **实现**:两张图叠放,`clip-path` 或 `overflow:hidden + width` 控制可见区,金色圆形手柄,`onPointerMove` 拖动(注意触摸事件)

#### 3. 磁吸悬浮卡片(Magnetic Hover)
- **效果**:鼠标在卡片上移动时卡片 3D tilt,实物感
- **位置**:`ProductCard.tsx`、`BlogCard.tsx`
- **实现**:`onMouseMove` 算相对位置,`transform: perspective(800px) rotateX() rotateY()`,`transition: transform 0.1s`。金色边框倾斜时产生光泽

#### 4. 渐进式内容揭示(Staggered Cascade)
- **效果**:网格内元素按列依次出现,非同时 fade-up
- **位置**:替换全站统一 `Reveal direction="up"`
- **实现**:`Reveal` 加 `cascade` 模式,算子元素 row/col,延迟 = `row*80 + col*50 ms`;或 framer-motion `staggerChildren`

### 字体一致性修正

**`src/app/globals.css:103`** — h1-h6 硬编码 `font-family: "Poppins"`,但 L10 `--font-sans` 已含 Poppins。L103 应改成 `@apply font-sans` 或删除(让 `--font-heading` 生效)。DESIGN.md 说用 Barlow 但实际全用 Poppins —— 文档与实现不符,**B 决定**:要么真换 Barlow(改 `layout.tsx` 字体导入),要么改 DESIGN.md 措辞。

---

## 验证(Agent 各自跑)

1. **typecheck + lint**: `npm run typecheck && npm run lint` — errors 应为 0
2. **build**: `npm run build` — 注意当前 master 的 build 会因 Google Fonts fetch 失败而报错(网络问题,非本次引入)。若复现,设 `NEXT_PUBLIC_SITE_URL` 重试,或确认 `out/` 产物生成
3. **i18n**(A): 切英文看首页博客区是否正常(不再显示 `insightsDesc`);切阿语确认新 key 都有翻译;脚本对比 en/ar key 数应相等
4. **数据管道**(A): 故意设错 `ADMIN_API_URL` 跑 `npm run prebuild` → 应见醒目警告而非静默退出
5. **死代码**(A): 删 `animations.tsx` 死代码后 `grep -r 'AnimatedSection\|StaggerWrapper\|SmoothScrollProvider' src/` 应无结果
6. **Docker 删除**(A): `npm run build` 仍成功(本就不用 Docker)
7. **视觉**(B): 改完后跑 build,本地 `npm run dev` 看首页板块节奏、加载态、ProductCard hover;移动端断点看 VehicleSearch

---

## 完成后

两个 agent 各自在分支上完成后,由 orchestrator:
1. 合并两分支(文案迁移 vs 板块调整不同行,应无冲突)
2. 跑 `npm run check`(lint + typecheck + build)
3. 部署到 Cloudflare:`npx wrangler pages deploy out --project-name luxus-car-mats --commit-dirty=true --branch main`
4. 在 https://luxus-car-mats.pages.dev 验证
