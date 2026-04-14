<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();

const STEPS = [
  { num: 1, label: "方案" },
  { num: 2, label: "時間" },
  { num: 3, label: "資料" },
  { num: 4, label: "確認" },
];

watch(
  () => store.currentStep,
  () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
);
</script>

<template>
  <div class="min-h-screen bg-bg">
    <!-- Intro 全屏頁 (step 0) -->
    <BookingIntro v-if="store.currentStep === 0" />

    <!-- 正式預約流程 (step 1+) -->
    <template v-else>
      <!-- Hero -->
      <div class="bg-bg px-6 py-2 text-center border-b border-border">
        <div class="flex flex-col items-center justify-center gap-3">
          <img src="/clinic-logo.png" alt="Logo" class="w-40 object-contain" />
        </div>
      </div>

      <!-- Step Bar -->
      <div
        v-if="store.currentStep <= 4"
        class="sticky top-0 z-[100] bg-white border-b border-border px-6 pt-3.5 pb-3 shadow-[0_1px_8px_rgba(115,198,203,0.08)]"
      >
        <h1 class="text-md font-light text-txt-1 tracking-widest3 text-center pb-3">PicoSure 預約</h1>
        <div class="flex items-center justify-center">
          <template v-for="(step, idx) in STEPS" :key="step.num">
            <div
              v-if="idx > 0"
              class="w-7 h-px mb-[15px] transition-colors"
              :class="
                store.currentStep > step.num - 1 ? 'bg-teal-line' : 'bg-border'
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
                {{ step.num }}
              </div>
              <span
                class="text-[12px] tracking-wide"
                :class="{
                  'text-teal font-medium': store.currentStep === step.num,
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

      <!-- Main Content -->
      <main class="max-w-[480px] mx-auto px-5 pt-7 pb-20">
        <BookingPackageSelector v-if="store.currentStep === 1" />
        <BookingCalendarPicker v-else-if="store.currentStep === 2" />
        <BookingContactForm v-else-if="store.currentStep === 3" />
        <BookingConfirmCard v-else-if="store.currentStep >= 4" />
      </main>
    </template>
  </div>
</template>
