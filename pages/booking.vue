<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();

// 預約三步驟（Step 3-5）
const BOOKING_STEPS = [
  { num: 3, label: "時間" },
  { num: 4, label: "資料" },
  { num: 5, label: "確認" },
];

// 前置漏斗 4 段標籤（Step 1-3）
const FUNNEL_LABELS = [
  { atStep: 0, label: "了解療程" },
  { atStep: 1, label: "了解療程" },
  { atStep: 2, label: "選擇關注" },
  { atStep: 3, label: "預約諮詢" },
];

const funnelProgress = computed(() => {
  if (store.currentStep === 1) return 33;
  if (store.currentStep === 2) return 66;
  return 100;
});

const showFrontFunnel = computed(
  () => store.currentStep === 1 || store.currentStep === 2,
);
const showBookingSteps = computed(
  () => store.currentStep >= 3 && store.currentStep <= 5,
);

watch(
  () => store.currentStep,
  () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
);
</script>

<template>
  <div class="min-h-screen bg-bg">
    <!-- Step 0: Intro 全屏 -->
    <BookingIntro v-if="store.currentStep === 0" />

    <!-- Step 1+: Top bar + 內容 -->
    <template v-else>
      <!-- ── Top Bar ── -->
      <div
        class="sticky top-0 z-[100] bg-white/92 backdrop-blur-md border-b border-border"
      >
        <!-- Brand + 立即預約 CTA -->
        <div
          class="px-5 py-3 flex items-center justify-between max-w-[480px] mx-auto"
        >
          <div class="text-[12px] tracking-[2px] text-teal-dk font-medium">
            PicoSure 皮秒 · 預約諮詢
          </div>
          <button
            v-if="store.currentStep < 3"
            class="bg-teal text-white text-[11px] font-medium tracking-wider rounded-full px-3.5 py-1.5 hover:bg-teal-dk transition-colors"
            @click="store.skipToBooking()"
          >
            立即預約 →
          </button>
        </div>

        <!-- 前置漏斗 progress bar -->
        <div
          v-if="showFrontFunnel"
          class="px-5 pb-2.5 max-w-[480px] mx-auto"
        >
          <div class="h-[3px] bg-teal-faint rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-teal to-teal-lt rounded-full transition-[width] duration-500 ease-out"
              :style="{ width: funnelProgress + '%' }"
            />
          </div>
          <div class="flex justify-between mt-1.5 text-[10px] text-txt-3">
            <span
              v-for="(item, idx) in FUNNEL_LABELS.slice(1)"
              :key="idx"
              :class="
                store.currentStep >= item.atStep
                  ? 'text-teal-dk font-medium'
                  : ''
              "
            >
              {{ item.label }}
            </span>
          </div>
        </div>

        <!-- 預約 3 步驟 indicator -->
        <div
          v-if="showBookingSteps"
          class="px-5 pt-1 pb-3 max-w-[480px] mx-auto"
        >
          <div class="flex items-center justify-center">
            <template v-for="(step, idx) in BOOKING_STEPS" :key="step.num">
              <div
                v-if="idx > 0"
                class="w-7 h-px mb-[15px] transition-colors"
                :class="
                  store.currentStep > step.num - 1
                    ? 'bg-teal-line'
                    : 'bg-border'
                "
              />
              <div class="flex flex-col items-center gap-[5px]">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-normal border transition-all duration-300"
                  :class="{
                    'bg-teal border-teal text-white':
                      store.currentStep === step.num,
                    'border-teal text-teal bg-teal-faint':
                      store.currentStep > step.num,
                    'border-txt-3 text-txt-3 bg-transparent':
                      store.currentStep < step.num,
                  }"
                >
                  {{ idx + 1 }}
                </div>
                <span
                  class="text-[12px] tracking-wide"
                  :class="{
                    'text-teal font-medium':
                      store.currentStep === step.num,
                    'text-teal-lt': store.currentStep > step.num,
                    'text-txt-3': store.currentStep < step.num,
                  }"
                >
                  {{ step.label }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- ── Main content ── -->
      <main class="max-w-[480px] mx-auto px-5 pt-7 pb-20">
        <BookingTechIntro v-if="store.currentStep === 1" />
        <BookingConcernPicker v-else-if="store.currentStep === 2" />
        <BookingCalendarPicker v-else-if="store.currentStep === 3" />
        <BookingContactForm v-else-if="store.currentStep === 4" />
        <BookingConfirmCard v-else-if="store.currentStep >= 5" />
      </main>
    </template>
  </div>
</template>
