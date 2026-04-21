<script setup lang="ts">
import { useBookingStore, CONCERN_OPTIONS } from "~/stores/booking";

const store = useBookingStore();
const openFaq = ref<number | null>(null);

function toggleFaq(idx: number) {
  openFaq.value = openFaq.value === idx ? null : idx;
}

const FAQS = [
  {
    q: "Picosure Pro 跟一般皮秒差在哪？",
    a: "Picosure Pro 皮秒雷射搭載 755nm 波長搭配升級版蜂巢透鏡，相較常見的 1064nm 皮秒，對黑色素選擇性更高、術後恢復更快。蜂巢透鏡還能觸發 LIOB 效應，在不產生傷口的情況下促進真皮層膠原蛋白新生，達到「養膚」效果。",
  },
  {
    q: "術後需要請假休息嗎？",
    a: "755nm 波長對血管迴避性高，術後多數人僅有輕微泛紅，通常隔天就能正常上班、化妝。不像傳統雷射可能出現明顯瘀青或結痂。",
  },
  {
    q: "皮秒雷射打多了會讓皮膚變薄嗎？",
    a: "Picosure Pro 以物理壓力波取代熱效應，不破壞角質層與基底膜。臨床觀察顯示，定期保養的案例皮膚屏障反而更穩固。這和傳統熱效應雷射的作用機制有本質上的不同。",
  },
  {
    q: "第一次體驗需要多少預算？",
    a: "每個人的膚況不同，適合的能量與治療範圍也不一樣。建議先預約免費的專業諮詢，由醫師評估後提供個人化的方案與費用說明，不用擔心到院後被強迫消費。",
  },
  {
    q: "肝斑可以打 Picosure Pro 嗎？",
    a: "肝斑是常見但複雜的色素問題。755nm 波長因為對血管的高迴避性，能大幅降低因發炎引發的反黑風險，是目前處理肝斑時較為友善的雷射選擇之一。具體方案需由醫師根據個人膚況進行評估。",
  },
];
</script>

<template>
  <div class="pb-8">
    <!-- ── Concern heading ── -->
    <div class="mb-3">
      <div class="text-[12px] tracking-[2px] text-teal font-medium mb-2">
        YOUR CONCERN
      </div>
      <h2 class="text-[22px] font-medium text-txt-1 leading-[1.55]">
        你最想改善的是什麼？
      </h2>
    </div>

    <p class="text-[15px] text-txt-2 leading-[1.7] font-light mb-5">
      選擇你在意的膚況，我們會針對你的需求提供更精準的諮詢方向（可複選）
    </p>

    <!-- Concern grid 2x3 -->
    <div class="grid grid-cols-2 gap-2.5 mb-9">
      <button
        v-for="opt in CONCERN_OPTIONS"
        :key="opt.id"
        type="button"
        class="flex flex-col items-center justify-center gap-1.5 py-4 px-3 border-[1.5px] rounded-xl text-center transition-all duration-200 active:scale-[0.97]"
        :class="store.isConcernSelected(opt.id)
          ? 'border-teal bg-teal-faint text-teal-dk font-medium'
          : 'border-border bg-white text-txt-2 font-light hover:border-teal-line'"
        @click="store.toggleConcern(opt.id)"
      >
        <span class="text-[26px] leading-none">{{ opt.icon }}</span>
        <span class="text-[15px] leading-tight mt-1">{{ opt.label }}</span>
      </button>
    </div>

    <!-- ── FAQ heading ── -->
    <div class="mb-3">
      <div class="text-[12px] tracking-[2px] text-teal font-medium mb-2">FAQ</div>
      <h2 class="text-[22px] font-medium text-txt-1 leading-[1.55]">
        多數人也想知道的事
      </h2>
    </div>

    <!-- FAQ list -->
    <div class="mb-8">
      <div
        v-for="(faq, idx) in FAQS"
        :key="idx"
        class="border-b border-border py-4 last:border-b-0"
      >
        <button
          type="button"
          class="flex items-start gap-2.5 w-full text-left"
          @click="toggleFaq(idx)"
        >
          <div
            class="shrink-0 w-6 h-6 rounded-md bg-teal-faint flex items-center justify-center text-[15px] font-medium text-teal"
          >
            {{ openFaq === idx ? '−' : 'Q' }}
          </div>
          <div
            class="text-[15.5px] font-medium text-txt-1 leading-[1.55] flex-1 pt-0.5"
          >
            {{ faq.q }}
          </div>
        </button>
        <div
          class="overflow-hidden transition-[max-height] duration-300 pl-[34px]"
          :class="openFaq === idx ? 'max-h-[400px]' : 'max-h-0'"
        >
          <p class="text-[15px] text-txt-2 leading-[1.85] font-light pt-3">
            {{ faq.a }}
          </p>
        </div>
      </div>
    </div>

    <!-- ── Nav footer ── -->
    <div class="flex items-center justify-between mb-4">
      <button
        class="text-[15px] text-txt-3 hover:text-teal transition-colors"
        @click="store.goToStep(1)"
      >
        ← 回上一步
      </button>
      <span class="text-[12px] text-txt-3">3 / 4</span>
    </div>
    <button
      class="btn-main !mb-0"
      :disabled="!store.canProceedFromConcern"
      @click="store.goToStep(3)"
    >
      預約免費諮詢 →
    </button>
    <p class="note mt-3">
      {{
        store.canProceedFromConcern
          ? '可複選，醫師會在諮詢時依你勾選的項目為你評估。'
          : '請至少勾選一項膚況，我們才能為你提供精準的諮詢方向。'
      }}
    </p>
  </div>
</template>
