<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";
import bgImage from "~/assets/imgs/Frame 8.png";

const store = useBookingStore();
</script>

<template>
  <div class="fixed inset-0 z-[200] overflow-y-auto bg-white">
    <!-- 頂部圖片區 -->
    <div class="relative w-full aspect-[4/3] overflow-hidden">
      <img
        :src="bgImage"
        alt="Alexandrite Pro-U"
        class="w-full h-full object-cover"
      />
      <!-- 底部圓弧遮罩 -->
      <div class="absolute -bottom-1 left-0 right-0 h-10 bg-white rounded-t-[28px]" />
    </div>

    <!-- 內容區 -->
    <div class="relative bg-white px-7 -mt-1 pb-32">
      <!-- Logo -->
      <img src="/clinic-logo.png" alt="Logo" class="w-28 object-contain mb-5" />

      <!-- 主標題 -->
      <h1 class="font-serif text-[26px] font-light text-txt-1 leading-[1.45] mb-6">
        亞歷山大<br />除毛雷射
      </h1>

      <!-- 副標 -->
      <p class="text-[12px] tracking-[4px] text-teal font-normal mb-5 uppercase">
        Alexandrite Pro-U · 755nm
      </p>

      <!-- 介紹文字 -->
      <p class="text-[15px] text-txt-1/70 leading-[2] font-light mb-8">
        利用 <span class="text-teal-dk font-normal">755nm</span>
        波長的紫翠玉雷射光，精準作用於毛囊黑色素，在千分之一秒內破壞毛囊再生結構，達到長效減少毛髮的效果。
      </p>

      <!-- 分隔線 -->
      <div class="w-8 h-px bg-teal-line mb-7" />

      <!-- 獨特優勢 -->
      <div class="sec-label">PRO-U 獨特優勢</div>

      <div class="space-y-5 mb-8">
        <div class="flex gap-4 items-start">
          <div class="w-9 h-9 rounded-full bg-teal-faint border border-teal-line flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-teal text-[14px]">✦</span>
          </div>
          <div>
            <p class="text-[14px] font-medium text-txt-1 mb-1">755nm 黃金波長</p>
            <p class="text-[14px] text-txt-3 leading-[1.8] font-light">
              對黑色素吸收效率最佳，適合亞洲人膚質，以較低能量即可達到理想效果
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="w-9 h-9 rounded-full bg-teal-faint border border-teal-line flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-teal text-[14px]">❄</span>
          </div>
          <div>
            <p class="text-[14px] font-medium text-txt-1 mb-1">DCD 冷凝專利技術</p>
            <p class="text-[14px] text-txt-3 leading-[1.8] font-light">
              雷射前噴灑 -20°C 冷凝劑保護皮膚，大幅降低不適感與熱傷害風險
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="w-9 h-9 rounded-full bg-teal-faint border border-teal-line flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-teal text-[14px]">◎</span>
          </div>
          <div>
            <p class="text-[14px] font-medium text-txt-1 mb-1">智能能量調控</p>
            <p class="text-[14px] text-txt-3 leading-[1.8] font-light">
              由專業醫師依個人膚色、毛髮粗細即時調整能量參數，確保安全與效果
            </p>
          </div>
        </div>
      </div>

      <!-- 療程效果 -->
      <div class="sec-label">療程效果</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8">
        <div
          v-for="item in [
            '長效減少毛髮再生',
            '改善膚色暗沉',
            '減少毛囊炎問題',
            '肌膚更光滑細緻',
          ]"
          :key="item"
          class="flex items-start gap-2"
        >
          <span class="text-teal text-[8px] mt-[5px] flex-shrink-0">●</span>
          <span class="text-[14px] text-txt-1 font-light leading-[1.7]">{{ item }}</span>
        </div>
      </div>

      <!-- 體感與恢復 -->
      <div class="sec-label">體感與恢復</div>
      <div class="space-y-2.5">
        <div v-for="tip in [
          '體感如橡皮筋輕彈，怕痛可事先敷麻藥',
          '不影響日常上班，當天避免泡湯與激烈運動',
          '建議 6-8 次完整療程，間隔約 4-8 週',
        ]" :key="tip" class="flex items-start gap-2.5">
          <span class="text-[11px] text-teal-dk mt-[1px]">▸</span>
          <p class="text-[14px] text-txt-1 font-light leading-[1.8]">{{ tip }}</p>
        </div>
      </div>
    </div>

    <!-- 底部 CTA -->
    <div class="fixed bottom-0 left-0 right-0 z-[210] bg-white border-t border-border px-5 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div class="max-w-[480px] mx-auto">
        <button class="btn-main" @click="store.nextStep()">
          立即預約 →
        </button>
        <p class="note">除毛專案 · 腋下除毛 NT$399 起</p>
      </div>
    </div>
  </div>
</template>
