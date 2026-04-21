<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";
import bgImage from "~/assets/imgs/Frame 8.png";
import logoImage from "~/public/clinic-logo.png";

const store = useBookingStore();
</script>

<template>
  <div class="fixed inset-0 z-[200] overflow-y-auto bg-white">
    <!-- ── 頂部 Hero 視覺 ── -->
    <div class="relative w-full aspect-[4/3] overflow-hidden">
      <img
        :src="bgImage"
        alt="Picosure Pro 皮秒雷射"
        class="w-full h-full object-cover"
      />

      <!-- 漸層遮罩，讓底部白字浮現 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/55" />

      <!-- Hero 文字疊加 -->
      <div class="absolute inset-0 flex flex-col items-center justify-end pb-14 px-7 text-center">
        <div
          class="inline-block text-[12px] tracking-[3px] text-white/90 border border-white/30 rounded-full px-3.5 py-1 mb-4"
        >
          PICOSURE PRO · 755nm
        </div>
        <h1 class="font-en italic text-[32px] text-white font-light tracking-wide leading-tight mb-1">
          Picosure Pro
        </h1>
        <h2 class="text-[20px] text-white font-light tracking-[6px] mb-2">
          皮 秒 雷 射
        </h2>
        <p class="text-[12px] text-white/70 tracking-[2px]">
          755nm · 蜂巢透鏡 · LIOB 光震波技術
        </p>
      </div>

      <!-- 底部圓弧遮罩 -->
      <div class="absolute -bottom-1 left-0 right-0 h-10 bg-white rounded-t-[28px]" />
    </div>

    <!-- ── Hero Body ── -->
    <div class="relative bg-white px-7 -mt-1 pb-32 max-w-[480px] mx-auto">
      <!-- Logo -->
      <img :src="logoImage" alt="Logo" class="w-24 object-contain mb-5 mx-auto" />

      <!-- 主標題 -->
      <h1 class="font-serif text-[24px] font-normal text-txt-1 leading-[1.55] mb-4 text-center">
        想要的不只是<span class="text-teal-dk font-medium border-b-2 border-teal-line">除斑</span>，<br />
        更追求<span class="text-teal-dk font-medium border-b-2 border-teal-line">肌膚的細緻光澤</span>
      </h1>

      <!-- 描述 -->
      <p class="text-[16px] text-txt-2 leading-[2] font-light mb-7 text-center">
        Picosure Pro 以 755nm 精準波長與蜂巢透鏡，<br />
        有助於從真皮層促進膠原蛋白新生，<br />
        輔助提升整體膚質表現。
      </p>

      <!-- 3 個 stat 數據卡 -->
      <div class="grid grid-cols-3 gap-2.5 mb-8">
        <div class="bg-bg-card border border-border rounded-xl py-4 px-2 text-center">
          <div class="font-en text-[32px] text-teal-dk font-bold leading-none mb-2">
            755<span class="text-[16px] align-bottom">nm</span>
          </div>
          <div class="text-[13px] text-txt-2 leading-[1.5] font-light">
            精準波長<br />黑色素專一
          </div>
        </div>
        <div class="bg-bg-card border border-border rounded-xl py-4 px-2 text-center">
          <div class="font-en text-[32px] text-teal-dk font-bold leading-none mb-2">20×</div>
          <div class="text-[13px] text-txt-2 leading-[1.5] font-light">
            蜂巢透鏡<br />能量聚焦倍率
          </div>
        </div>
        <div class="bg-bg-card border border-border rounded-xl py-4 px-2 text-center">
          <div class="font-en text-[32px] text-teal-dk font-bold leading-none mb-2">
            LIOB</div>
          <div class="text-[13px] text-txt-2 leading-[1.5] font-light">
            光震波效應<br />深度修復技術
          </div>
        </div>
      </div>

      <!-- CTA -->
      <button class="btn-main mb-6" @click="store.goToStep(1)">
        了解 PicoSure Pro 核心科技 →
      </button>

      <!-- Medical Disclaimer -->
      <div class="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <p class="text-[12px] text-txt-3 leading-[1.7]">
          <strong class="text-txt-2">醫療資訊聲明：</strong>本頁面資訊僅供衛教參考，不代表療效保證。任何療程均有風險，可能產生副作用。Picosure Pro 皮秒雷射之適應症、禁忌症、副作用及處置優缺點，請務必於諮詢時由專業醫師當面說明。療程效果因個人體質與膚況而異。
        </p>
      </div>
    </div>
  </div>
</template>
