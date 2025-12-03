# LSectionB 優化計劃

## 問題分析

### 1. 快速滾動時 Intro 無法及時 Pin 住
**原因：**
- GSAP ScrollTrigger 的 `scrub: 1` 造成 1 秒平滑延遲
- CSS `transition: all 1s` 與 GSAP 動畫衝突
- DOM 結構：intro 用 `position: relative`，cards 用 `position: absolute`，不同定位上下文造成 pinning 不同步

**已實施的解決方案：**
- ✅ 方案 B：降低 scrub 延遲（`scrub: 0.5`）
- ✅ 方案 C：限制 CSS transition 只針對顏色屬性
- ✅ 方案 1：加入 `refreshPriority: 0` 和 `fastScrollEnd: true`

### 2. Resize 觸發 Scroll to Top
**原因：**
- ScrollTrigger 自動監聽 resize 並執行 `refresh()`
- Pin 元素的高度重新計算時，因為 intro 和 cards 定位方式不同，導致 GSAP 調整 scroll 位置
- `intro-container` (relative) 佔文檔流，`cards-container` (absolute) 不佔文檔流

**已實施的解決方案：**
- ✅ 方案 1：優化 ScrollTrigger refresh 行為
- ✅ 方案 2：已加入註解（備選方案，禁用 resize auto-refresh）

---

## 方案 3：統一定位結構（推薦實施）

### 目標
統一 intro 和 cards 的定位方式，讓它們在同一定位上下文中，避免 resize 時高度計算不一致。

### 實施步驟

#### 1. 修改 CSS 定位結構

**現有結構：**
```scss
&__pin-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

&__intro-container {
  position: relative; // ← 佔文檔流
  width: 100%;
  min-height: 100vh;
}

&__cards-container {
  position: absolute; // ← 不佔文檔流
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

**建議修改為：**
```scss
&__pin-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

&__intro-container {
  position: absolute; // ← 改成 absolute
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; // ← 明確指定高度
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; // Below cards
}

&__cards-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; // ← 明確指定高度
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  z-index: 2; // Above intro
  pointer-events: none;

  .state-card {
    pointer-events: auto;
  }
}
```

#### 2. 確保 Pin Container 有正確的高度

因為兩個子容器都改成 absolute，需要確保 `pin-container` 本身有足夠的高度來支撐 ScrollTrigger 的計算：

```scss
&__pin-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  
  // 可選：明確設定高度，避免 collapse
  &::before {
    content: '';
    display: block;
    height: 100vh;
  }
}
```

或者直接在 JS 中處理（更乾淨）：
```javascript
// 在 handleAnimation 函數開始時
section.style.minHeight = '100vh';
```

### 預期效果

1. **統一定位上下文：**
   - Intro 和 cards 都是 absolute，在同一層級
   - Resize 時高度計算一致，不會觸發 scroll 調整

2. **即時 Pinning：**
   - 兩個容器高度和位置都明確
   - GSAP pin 時不需要重新計算文檔流
   - 快速滾動時反應更即時

3. **無副作用：**
   - 視覺效果不變（兩個容器都是 100vh，疊在一起）
   - Z-index 維持不變（intro 在下，cards 在上）
   - Pointer events 維持不變

### 實施優先級
**高優先級** - 建議在測試方案 1、2 效果後，若仍有 resize 問題，立即實施此方案。

### 測試檢查清單
- [ ] Intro 在進入 viewport 時立即 pin 住（快速滾動測試）
- [ ] 離開 viewport 時立即回到原位（快速滾動測試）
- [ ] Resize 視窗時不會 scroll to top
- [ ] Cards 動畫正常運作（stacking 效果）
- [ ] 所有裝置尺寸下視覺正確（mobile、tablet、desktop）
- [ ] Intersection observer 正常觸發 `isEntered` 狀態

---

## 總結

| 方案 | 狀態 | 效果 | 優先級 |
|------|------|------|--------|
| 方案 B | ✅ 已實施 | 降低 scrub 延遲，快速滾動反應更快 | 已完成 |
| 方案 C | ✅ 已實施 | 移除 CSS transition 干擾 | 已完成 |
| 方案 1 | ✅ 已實施 | 優化 ScrollTrigger refresh 行為 | 已完成 |
| 方案 2 | ✅ 已註解 | 禁用 resize auto-refresh（備用） | 備選 |
| **方案 3** | 📋 待實施 | **統一定位結構（最根本解決方案）** | **高** |

建議：先測試目前已實施的方案，若 resize 問題仍存在，立即實施方案 3。
