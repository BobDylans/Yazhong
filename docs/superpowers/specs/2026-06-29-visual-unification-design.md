# 视觉系统统一(浅色方向)— 设计文档

**日期:** 2026-06-29
**状态:** 已批准
**范围:** 高优先级美化问题 #1(浅暗分裂)、#2(gold 类失效)、#3(调色板碎片化)

## 背景

诊断发现三个相互关联的视觉一致性问题:

1. **浅暗分裂** — `ProductCard` 用暗色 `zinc-800/900` + 金色,但整站(Header/Hero/页面/`globals.css` token)是浅暖纸感。首页 Featured Products 区块出现「浅底嵌深卡」的割裂。
2. **gold 类失效** — `gold-border-glow`、`text-gold`、`via-gold/20`、`text-gold/60` 在全项目 CSS 中均无定义(`@theme inline` 无 `--color-gold`),卡片金色点缀完全没渲染。
3. **调色板碎片化** — 同一语义色存在多个 hex:蓝 3 种(`#45a0de`/`#3178c6`/`#2563eb`)、暗 4 种、灰 5 种、浅边框 4 种。`globals.css` 已定义 token,但组件硬编码 hex 未使用。

## 关键决策(已与用户确认)

- **方向:统一为浅色** — 把 ProductCard 改入浅色系统(改动最小,契合 90% 现有页面)。
- **品牌蓝:`#45a0de`** — 现存最常用(15 次)、与暖纸+金色冷静高级感最契合;其余两蓝全部替换。

## 设计

### 1. Token 层(`src/app/globals.css`)

| 改动 | 旧 | 新 |
|---|---|---|
| `--accent` / `--ring` | `#2563eb` | `#45a0de` |
| `--color-gold` 映射(新增) | 无 | `var(--accent-warm)` = `#c99a4a` |
| `.eyebrow` 背景 / `::selection` | 硬编码 `#2563eb` | `#45a0de` |
| `.bg-blue-gradient` | `#2563eb→#60a5fa` | `#45a0de→#7cbbea` |
| `.gold-border-glow`(新增工具类) | 未定义 | 金色 hover 发光描边 |

→ 同时解决 #2:`text-gold` / `via-gold/20` / `text-gold/60` / `gold-border-glow` 全部生效。

### 2. `ProductCard` 重写为浅色

- 外层:`bg-card`(白)· `rounded-2xl` · `shadow-ambient` → `group-hover` 升 `shadow-ambient-hover` · `border-border`
- 图片:`aspect-square` · `object-cover` · 保留 hover scale + lazy
- 徽章:红/蓝/绿/gold(蓝改 `#45a0de`)
- 分类标签:`text-gold/70`;标题 `text-foreground`;描述 `text-muted-foreground`;分隔线 `via-gold/20`
- 咨询按钮:**保留** WhatsApp 绿 `#25D366`(功能语义色,不并入品牌色)
- 动画:保留 framer-motion(`y:-4`、图片 scale、stagger 入场)

### 3. 全站 hex → token 迁移

| 现存 hex | → token |
|---|---|
| `#45a0de` `#3178c6` `#2563eb` | `--accent` |
| `#191d21` `#202626` `#1a1f24` `#1a1a1a` | `--foreground` |
| `#808080` `#8a8a8a` `#8c9196` `#9ca3af` `#6b7280` | `--muted-foreground` |
| `#efefef` `#f5f5f5` `#e5e2dd` `#e5e7eb` | `--border` / `--secondary` |

**保留的语义色(不迁移):** WhatsApp 绿 `#25D366`/`#22c35e`、徽章红 `#dc2626`、成功绿 `#16a34a`、金 `#c99a4a`(→`--gold`)、背景 `#f8f7f4`(→`--background`)。

**涉及文件:** Header、HeroBanner、products 页、ProductCard,及 BlogCard / Footer / IconFeatures / BrandMarquee / WhatsAppButton / contact / about / blog 各页。

## 范围边界(明确不做)

- #4 WhatsApp 占位号码(中优先级,下一轮)
- 低优先级:reduced-motion、筛选过渡、focus-visible、公告栏偏移
- 不引入新组件、不改页面结构、不改数据管线

## 验证

项目无测试框架(package.json 无 jest/vitest/playwright-test)。本次为纯样式重构,无行为变更,验证方式:

1. `npm run typecheck` + `npm run lint` + `npm run build` 必须全绿
2. `npm run dev` 肉眼核对卡片/首页/产品页(dev 用硬编码示例数据,视觉够用)
