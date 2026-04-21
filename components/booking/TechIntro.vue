<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();
</script>

<template>
  <div class="pb-8">
    <!-- ── Section heading ── -->
    <div class="mb-5">
      <div class="text-[12px] tracking-[2px] text-teal font-medium mb-2">
        CORE TECHNOLOGY
      </div>
      <h2 class="text-[22px] font-medium text-txt-1 leading-[1.55]">
        為什麼 Picosure Pro<br />
        採用 755nm 波長技術？
      </h2>
    </div>

    <!-- ── Card 1: 755nm ── -->
    <div class="bg-bg-card border border-border rounded-2xl p-5 mb-4">
      <!-- Compare bar -->
      <div class="flex gap-2 mb-4">
        <div
          class="flex-1 bg-teal-faint border-[1.5px] border-teal-line rounded-lg p-3 text-center"
        >
          <img src="@/assets/imgs/755nm.png" alt="755nm" class="w-full aspect-square mx-auto mb-2 object-cover rounded-lg" />
          <div class="text-[12px] font-medium text-teal-dk mb-1">755nm</div>
          <div class="font-en text-[20px] text-teal-dk font-medium leading-none">50×</div>
          <div class="text-[12px] text-txt-2 mt-1.5 leading-[1.4]">
            對黑色素專一<br />血管迴避性高
          </div>
        </div>
        <div
          class="flex-1 bg-black/[0.02] border-[1.5px] border-black/[0.06] rounded-lg p-3 text-center"
        >
          <img src="@/assets/imgs/general.png" alt="1064nm" class="w-full aspect-square mx-auto mb-2 object-cover rounded-lg" />
          <div class="text-[12px] font-medium text-txt-3 mb-1">1064nm</div>
          <div class="font-en text-[18px] text-txt-3 font-medium leading-none pt-0.5">
            一般
          </div>
          <div class="text-[12px] text-txt-3 mt-1.5 leading-[1.4]">
            穿透較深<br />不同技術特性
          </div>
        </div>
      </div>

      <h3 class="text-[18px] font-medium text-txt-1 mb-2.5 leading-[1.5]">
        755nm 波長 · 對黑色素的專一性
      </h3>
      <p class="text-[15px] text-txt-2 leading-[1.85] font-light">
        755nm 對黑色素的吸收率較含氧血紅素高<span class="text-teal-dk font-medium">*</span>，有助於減少能量被血管吸收的情形。臨床觀察顯示，術後多數人僅有輕微泛紅反應。實際恢復狀況因個人體質與能量設定而異。
      </p>
      <p class="text-[11px] text-txt-3 mt-2 leading-[1.5]">
        *數據參考自原廠技術文獻
      </p>
    </div>

    <!-- ── Card 2: LIOB ── -->
    <div class="bg-bg-card border border-border rounded-2xl p-5 mb-4">
      <!-- Before/After comparison -->
      <div class="flex gap-6 mb-4 justify-center">
        <div class="text-center">
          <img src="@/assets/imgs/before.png" alt="傳統奈秒雷射術後" class="w-32 h-32 rounded-lg mb-2 object-cover" />
          <div class="text-[12px] text-txt-2">傳統奈秒雷射術後</div>
        </div>
        <div class="text-center">
          <img src="@/assets/imgs/after.png" alt="755皮秒雷射術後" class="w-32 h-32 rounded-lg mb-2 object-cover" />
          <div class="text-[12px] text-txt-2">755皮秒雷射術後</div>
        </div>
      </div>

      <h3 class="text-[18px] font-medium text-txt-1 mb-2.5 leading-[1.5]">
        蜂巢透鏡 × LIOB 效應
      </h3>
      <p class="text-[15px] text-txt-2 leading-[1.85] font-light">
        蜂巢透鏡能將能量聚焦<span class="text-teal-dk font-medium">*</span>，觸發 LIOB（雷射誘導光學擊穿）效應——在表皮下產生微小空泡與壓力波，有助於促進真皮層纖維母細胞合成膠原蛋白與彈力蛋白。
      </p>
      <p class="text-[15px] text-txt-2 leading-[1.85] font-light mt-3">
        此技術採用物理壓力波機制，有助於減少對表皮的熱傷害。實際效果因個人膚況而異。
      </p>
      <p class="text-[11px] text-txt-3 mt-2 leading-[1.5]">
        *能量聚焦特性參考自原廠技術文獻
      </p>
    </div>

    <!-- ── Card 3: 療程機制 ── -->
    <div class="bg-bg-card border border-border rounded-2xl p-5 mb-5">
      <h3 class="text-[18px] font-medium text-txt-1 mb-4 leading-[1.5]">
        療程作用機制說明
      </h3>

      <div class="relative pl-7">
        <div
          class="absolute left-2 top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-teal via-teal-lt to-transparent"
        />

        <div class="relative mb-5">
          <div
            class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white ring-2 ring-teal-line"
          />
          <h4 class="text-[16px] font-medium text-txt-1 mb-1.5">① 結構重建</h4>
          <p class="text-[14.5px] text-txt-2 leading-[1.8] font-light">
            療程後有助於促進第一型膠原蛋白與彈性纖維新生。實際效果因個人體質而異。
          </p>
        </div>

        <div class="relative mb-5">
          <div
            class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white ring-2 ring-teal-line"
          />
          <h4 class="text-[16px] font-medium text-txt-1 mb-1.5">② 屏障維護</h4>
          <p class="text-[14.5px] text-txt-2 leading-[1.8] font-light">
            採用物理壓力波機制，有助於減少對角質層的熱傷害。適當的療程規劃有助於維護肌膚屏障環境。
          </p>
        </div>

        <div class="relative">
          <div
            class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white ring-2 ring-teal-line"
          />
          <h4 class="text-[16px] font-medium text-txt-1 mb-1.5">③ 色素代謝</h4>
          <p class="text-[14.5px] text-txt-2 leading-[1.8] font-light">
            有助於改善真皮層環境，輔助色素代謝。實際效果需由醫師評估個人膚況後說明。
          </p>
        </div>
      </div>
    </div>

    <!-- ── Medical Disclaimer ── -->
    <div class="mb-7 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p class="text-[13px] text-txt-3 leading-[1.7]">
        <strong class="text-txt-2">醫療資訊聲明：</strong>本頁面資訊僅供衛教參考，不代表療效保證。任何療程均有風險，可能產生副作用（如：紅腫、結痂、色素沉著等）。Picosure Pro 皮秒雷射之適應症、禁忌症、副作用及處置優缺點，請務必於諮詢時由專業醫師當面說明。療程效果因個人體質與膚況而異。
      </p>
    </div>

    <!-- ── Nav footer ── -->
    <div class="flex items-center justify-between mb-4">
      <button
        class="text-[15px] text-txt-3 hover:text-teal transition-colors"
        @click="store.goToStep(0)"
      >
        ← 回上一步
      </button>
      <span class="text-[12px] text-txt-3">2 / 4</span>
    </div>
    <button class="btn-main !mb-0" @click="store.goToStep(2)">
      選擇你最在意的膚況 →
    </button>
  </div>
</template>
