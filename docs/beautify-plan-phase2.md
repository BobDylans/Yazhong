# Yazhong 网站美化计划(Phase 2)

> **背景**:Phase 1(i18n + 清理 + 基础视觉:StatsBand/Skeleton/ProductCard 融合)已完成。本计划是 Phase 2,聚焦**品牌调性、标志性视觉、排版层次、信任元素**的深度美化。
>
> **依据**:项目视觉审计(42 条发现)+ 2026 web 设计趋势检索(克制动效、单一 accent、editorial 排版、story-driven)。
>
> **原则**:不 redesign 重来,在现有暖白底体系内做有主张的提升。每个阶段独立可交付。

---

## Phase 2.1 — 品牌调性梳理(配色 + 字体)

**用 skill**: `design-taste-frontend` 或 `redesign-existing-projects`(审计 + 定向提升)

### A. 配色:收敛为单一金色 accent
**问题**:`globals.css:60-81` 暖白底 `#f8f7f4` + 冷蓝 `#45a0de` + 暖金 `#c99a4a` 三色,蓝金在色温上打架(2026 趋势:一个自信的 accent)。

**改法**:
- **金色 `#c99a4a` 升为唯一品牌 accent**(品牌名、CTA highlight、数字、divider)
- **蓝色 `#45a0de` 降级为功能色**(仅链接、表单 focus ring、info 图标)
- 文档化金色使用规则:核心用途(品牌名/产品名 highlight/量化数字)vs 辅助用途(装饰 divider/hover 边框)
- 涉及:`globals.css`(token 定义)、检查所有 `text-accent` / `bg-accent` 用法,该改 `text-gold` 的改

### B. 字体:引入 Display 字体
**问题**:`layout.tsx:7-12` 只有 Poppins(正文)+ Tajawal(阿语),`--font-heading` 直接映射 Poppins,标题正文同字体,层次平(2026 趋势:typography 要"breathes")。

**改法**:
- 引入 **Playfair Display** 或 **Cormorant Garamond**(serif display)用于 h1/h2 大标题(Hero、SectionHeadings、Featured/Insights 标题)
- Poppins 留作正文 + h3-h6(geometric sans 配 serif display 是经典 luxury 搭配)
- 删 Poppins weight 100(未用),加 800
- `globals.css:102-106` 定义 h1-h6 完整字号层级(h1:48px/h2:32px/h3:24px/h4:20px),组件用语义标签而非各自 Tailwind 类
- 涉及:`layout.tsx`(字体导入)、`globals.css`(`--font-heading` 改指向 display 字体 + h 层级)

### C. noise overlay 微调
- `globals.css:128-138` opacity `0.012` → `0.028`,让纸张质感可感知

---

## Phase 2.2 — Hero 标志性瞬间

**用 skill**: `frontend-design:frontend-design`(做有主张的 hero)

**问题**:`HeroBanner.tsx:40-115` 是"背景图 + 60% overlay + 居中文字 + WhatsApp CTA"通用模板,无 signature moment。VehicleSearch 浮在下方独立 `bg-secondary` 条,与 Hero 断裂。WhatsApp 绿按钮 + VehicleSearch 蓝按钮两个 CTA 色打架。

**改法**(选其一,推荐第一个):
- **方案 A(分栏)**:Hero 改左右两栏 —— 左栏文字 + CTA,右栏产品图(高质量座椅套实拍,带 scale reveal 动画)。VehicleSearch 嵌入 Hero 内(overlap 设计,搜索条上浮覆盖 Hero 底部边缘),不另起浅色条
- 方案 B:保留居中,但加一条独特曲线/斜切分隔,背景换高质量产品安装效果图(非 speedometer)

**统一 CTA 色**:Hero 内只一个 CTA 色(金色品牌色或 WhatsApp 绿,二选一,不混)

涉及:`HeroBanner.tsx`、`VehicleSearch.tsx`、可能新增 `public/images/hero-product.jpg`

---

## Phase 2.3 — 信任元素真实化

**用 skill**: `impeccable`(UX + 信任元素打磨)

### A. CustomerGallery(最严重)
**问题**:`CustomerGallery.tsx:30-58,182-197` 用 emoji 占位 `🛋️🪑🔷🚗` + "Install Photo" 文字冒充客户安装照,直接破坏信任。

**改法**:
- **若有真实安装照**:接入(从 R2 或 admin API)
- **若暂无**:用产品图 + 场景 mockup 替代(至少是真实产品照,不是 emoji),或暂时隐藏该 section 直到有内容
- 轮播加 5-6s 自动播放,hover 暂停

### B. ProductCard 价格
**问题**:`ProductCard.tsx` 无任何价格,`ProductCardData` 类型无 price 字段。电商站无价格 = 转化断裂。

**改法**:
- `types/index.ts` 的 `ProductCardData` 加 `priceFrom?: string` 字段
- `ProductCard.tsx` 底部 "View Details" 旁显示 "From $XX"(走询价模式也建价格锚点)
- `fetch-products.mjs` 映射时带价格(若 admin API 有)

### C. Footer 支付图标
**问题**:`Footer.tsx:128-132` 用纯色方块 + "Visa/MC/PP/AE" 文字模拟支付图标,像占位符。
**改法**:用真实 Visa/Mastercard/PayPal/AmEx 的 SVG logo

### D. HowItWorks 去模板化
**问题**:`HowItWorks.tsx:22-62` 是标准 SaaS 三步流程(渐变方块图标 + 编号 + 标题 + bullet)。移动端虚线连接消失。
**改法**:加实际产品/安装过程小图替代抽象图标;移动端用垂直虚线;修 `howTitle` 重复(eyebrow 和 h2 用同 key)

---

## Phase 2.4 — 排版与动效体系统一

**用 skill**: `web-design-guidelines`(无障碍/对比度审计)+ `minimalist-ui`(克制排版)

### A. 动效体系统一
**问题**:3 套动效(Reveal CSS / ProductCard framer-motion / StatsBand RAF),时间曲线不统一(`cubic-bezier(0.32,0.72,0,1)` vs `easeOutExpo`)。2026 趋势:克制动效,服务于引导。

**改法**:
- 定义全局动效 token(duration scale: fast 200ms / base 400ms / slow 700ms;统一缓动 `cubic-bezier(0.32,0.72,0,1)`)
- StatsBand count-up 缓动改近似 cubic-bezier,与全站一致
- Reveal blur 在 `prefers-reduced-motion` 下降级为纯 opacity(已在 StatsBand 做过,推广到 Reveal)
- ProductGrid 父级不再用 Reveal 包裹(避免 CSS transition 与 framer-motion stagger 冲突)

### B. 标题层次
- `globals.css` 定义 h1-h6 字号层级(Phase 2.1 B 已含)
- Hero h1 桌面 56-64px,关键单词可特殊处理(如 "Premium" 金色斜体)

### C. 404 页面
- 新建 `src/app/not-found.tsx`,品牌化 404(返回首页 + 品牌视觉)

### D. TrustBadges
- 加小图标(shield/truck/star)或与 IconFeatures 合并;考虑移到 Header 下方 announcement 位置,让 StatsBand 独立成 Hero 后第一个重击

---

## 执行建议

| 顺序 | 阶段 | 工作量 | 收益 |
|------|------|--------|------|
| 1 | Phase 2.1 配色+字体 | 中 | 高(立竿见影提质感) |
| 2 | Phase 2.3A CustomerGallery | 小-中 | 极高(信任) |
| 3 | Phase 2.3B ProductCard 价格 | 小 | 高(转化) |
| 4 | Phase 2.2 Hero | 中-大 | 高(首屏) |
| 5 | Phase 2.4 动效统一 | 中 | 中(体系化) |

**可并行**:Phase 2.1(配色/字体,改 globals.css/layout)与 Phase 2.3(组件级,改具体组件)文件不冲突,可两个 agent 并行。

---

## 验证

- `npm run typecheck && npm run lint`(errors 0)
- `npm run build`(exit 0)
- 本地 `npm run dev` 看各阶段效果:
  - 配色:全站蓝→金收敛后是否自洽
  - 字体:大标题 serif + 正文 sans 的层次
  - Hero:首屏分栏 + VehicleSearch 融合
  - CustomerGallery:无 emoji 占位
  - 动效:时间曲线统一感
- 部署:`npx wrangler pages deploy out --project-name luxus-car-mats --branch main`
