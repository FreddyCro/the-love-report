# LSectionA 重構計劃

## 目標
將 LSectionA 的 frame 管理邏輯重構為更簡潔、可維護的結構，並實現順序激活與動畫等待機制。

## 當前問題
1. 變數過多且分散（6個 ref、6個 enterFlag、2個陣列）
2. 缺乏順序控制，多個 frame 可能同時激活
3. 無法等待前一個 frame 的動畫完成
4. 動畫時長無法靈活配置

## 新架構設計

### 資料結構整合

```typescript
// 整合所有 frame 資料到單一結構
const frames = ref([
  {
    id: 1,
    ref: null as HTMLElement | null,
    isEnter: false,
    isAnimationComplete: false,
    animationDuration: 2500, // frame 1 動畫時長 (ms)
  },
  {
    id: 2,
    ref: null as HTMLElement | null,
    isEnter: false,
    isAnimationComplete: false,
    animationDuration: 1500,
  },
  {
    id: 3,
    ref: null as HTMLElement | null,
    isEnter: false,
    isAnimationComplete: false,
    animationDuration: 1500,
  },
  {
    id: 4,
    ref: null as HTMLElement | null,
    isEnter: false,
    isAnimationComplete: false,
    animationDuration: 2500,
  },
  {
    id: 5,
    ref: null as HTMLElement | null,
    isEnter: false,
    isAnimationComplete: false,
    animationDuration: 2000,
  },
  {
    id: 6,
    ref: null as HTMLElement | null,
    isEnter: false,
    isAnimationComplete: false,
    animationDuration: 1500,
  },
]);
```

### 類型定義

```typescript
type FrameData = {
  id: number;
  ref: HTMLElement | null;
  isEnter: boolean;
  isAnimationComplete: boolean;
  animationDuration: number; // 動畫完成時間 (毫秒)
};
```

## 核心邏輯規則

### 1. 順序激活規則
- **Frame 1**: 特殊處理，任何 ENTER 就激活，任何 LEAVE 就關閉
- **Frame 2-6**: 必須符合以下所有條件才能激活：
  - 當前 frame 觸發 `ENTER_DOWN`
  - **且** 前一個 frame 已經 `isEnter = true`
  - **且** 前一個 frame 的 `isAnimationComplete = true`
  - **或** 前一個 frame 已經 `isEnter = false` (已 leave，直接激活)

### 2. 動畫完成追蹤
- 當 frame 從 `isEnter: false → true` 時：
  - 重置 `isAnimationComplete = false`
  - 啟動計時器：`setTimeout(() => isAnimationComplete = true, animationDuration)`
- 當 frame 從 `isEnter: true → false` 時：
  - 重置 `isAnimationComplete = false`

### 3. 等待機制（使用 watchEffect）
當 frame 觸發 `ENTER_DOWN` 但前一個 frame 動畫未完成時：
```typescript
const stopWatch = watchEffect(() => {
  const prevFrame = frames.value[frameIndex - 1];
  
  // 條件 1: 前一個已經 leave，直接激活
  if (!prevFrame.isEnter) {
    frames.value[frameIndex].isEnter = true;
    stopWatch(); // 自動停止
    return;
  }
  
  // 條件 2: 前一個動畫完成，激活
  if (prevFrame.isEnter && prevFrame.isAnimationComplete) {
    frames.value[frameIndex].isEnter = true;
    stopWatch(); // 自動停止
  }
});
```

### 4. IntersectionObserver 配置
```typescript
{
  threshold: 0.5, // 50% 可見時觸發
  root: null,
  rootMargin: '-20% 0px -20% 0px', // 縮小觀察區域，更集中觸發
}
```

## Handler 邏輯流程圖

### Frame 1 Handler (Strict Mode)
```
ENTER (任何方向) → isEnter = true
LEAVE (任何方向) → isEnter = false
```

### Frame 2-6 Handler
```
ENTER_DOWN
  ├─ 檢查前一個 frame
  │   ├─ 前一個 isEnter = false → 立即激活
  │   ├─ 前一個 isEnter = true 且 isAnimationComplete = true → 立即激活
  │   └─ 前一個 isEnter = true 且 isAnimationComplete = false → 啟動 watchEffect 等待
  │
LEAVE_UP
  └─ isEnter = false
```

## Template 簡化

### 原本
```vue
<div ref="frame1" class="sec-a-part">
  <LSectionAFrame1 :active="isFrame1Enter" />
</div>
```

### 重構後
```vue
<div
  v-for="frame in frames"
  :key="frame.id"
  :ref="el => frame.ref = el as HTMLElement"
  class="sec-a-part"
  :class="{ active: frame.isEnter }"
>
  <component
    :is="getFrameComponent(frame.id)"
    :active="frame.isEnter"
  />
</div>
```

## 重構步驟

1. **定義新資料結構**
   - 創建 `frames` ref 陣列
   - 定義 `FrameData` 類型

2. **重構 handler 邏輯**
   - 更新 `createStrictHandler` 使用新資料結構
   - 更新 `createHandler` 加入順序檢查和等待邏輯
   - 使用 `watchEffect` 替代 `watch` 實現自動清理

3. **加入動畫追蹤機制**
   - 監聽 `frame.isEnter` 變化
   - 管理 `setTimeout` 和 `isAnimationComplete` 狀態

4. **簡化 template**
   - 使用 `v-for` 渲染 frames
   - 動態組件映射

5. **移除舊程式碼**
   - 刪除所有獨立的 ref 和 flag
   - 刪除 `frameRefs` 和 `enterFlags` 陣列

## 優點

1. **可維護性**: 所有 frame 資料集中管理
2. **可擴展性**: 新增 frame 只需在陣列加一筆資料
3. **類型安全**: 統一的 `FrameData` 類型
4. **靈活配置**: 每個 frame 可獨立設定動畫時長
5. **自動清理**: `watchEffect` 條件滿足時自動停止
6. **順序保證**: 強制依序激活，避免跳躍

## 注意事項

1. **動畫時長設定**: 需根據實際 CSS/JS 動畫調整 `animationDuration`
2. **快速滾動**: 多個 watchEffect 可能同時運行，但會自動清理
3. **向上滾動**: `LEAVE_UP` 邏輯維持不變，關閉當前 frame
4. **Frame 1 特殊性**: 保持嚴格模式，確保首屏體驗

## 測試場景

- [ ] 正常向下滾動，frames 依序激活
- [ ] 快速滾動跳過多個 frames
- [ ] 向上滾動，frames 依序關閉
- [ ] 在動畫完成前快速滾動到下一個 frame
- [ ] 調整 `animationDuration` 參數驗證等待機制
- [ ] 移除 `min-height: 100vh` 限制後的行為
