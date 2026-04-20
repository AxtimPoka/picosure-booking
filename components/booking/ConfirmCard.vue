<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();
const submitting = ref(false);
const submitted = ref(false);
const errorMsg = ref("");

const dateDisplay = computed(() => {
  if (!store.selectedDate) return "";
  const [y, m, d] = store.selectedDate.split("-");
  return `${y} 年 ${parseInt(m)} 月 ${parseInt(d)} 日`;
});

async function submitBooking() {
  submitting.value = true;
  errorMsg.value = "";

  try {
    await $fetch("/api/booking", {
      method: "POST",
      body: {
        concerns: store.selectedConcerns.map((id) => ({
          id,
          label:
            store.selectedConcernLabels[
              store.selectedConcerns.indexOf(id)
            ] || id,
        })),
        location: store.selectedLocation,
        scheduled_at: store.scheduledAt,
        customer_name: store.customerName,
        customer_phone: store.customerPhone,
        note: store.note,
        doctor: store.selectedDoctor,
      },
    });
    submitted.value = true;
    store.currentStep = 6;
  } catch (err: any) {
    errorMsg.value = err?.data?.message || "預約失敗，請稍後再試。";
  } finally {
    submitting.value = false;
  }
}

function startOver() {
  store.reset();
  submitted.value = false;
}
</script>

<template>
  <div>
    <!-- ── Step 5: Success ── -->
    <template v-if="submitted">
      <!-- Success header -->
      <div class="text-center pt-10 pb-6 px-4">
        <div
          class="w-[72px] h-[72px] rounded-full border-[1.5px] border-teal bg-teal-faint flex items-center justify-center mx-auto mb-6"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M6 14L11 19L22 9"
              stroke="#107a7f"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h2
          class="font-serif text-[24px] font-extralight text-txt-1 tracking-[5px] mb-2"
        >
          預 約 完 成
        </h2>
        <p class="font-en italic text-xs text-txt-3 tracking-[3px]">
          Booking Confirmed
        </p>
      </div>

      <!-- Summary card -->
      <div
        class="border border-border rounded-[14px] overflow-hidden mb-6 shadow-[0_2px_16px_rgba(115,198,203,0.08)]"
      >
        <div class="bg-teal-bg px-[18px] py-[15px] flex items-center gap-2.5">
          <div class="w-2 h-2 rounded-full bg-teal opacity-70" />
          <span class="text-[18px] font-medium text-teal-dk tracking-[3px]">
            預 約 摘 要
          </span>
        </div>

        <div class="bg-white px-[18px]">
          <!-- 關注膚況 -->
          <div
            v-if="store.selectedConcernCount > 0"
            class="py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] block mb-2">關注膚況</span>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="label in store.selectedConcernLabels"
                :key="label"
                class="inline-block bg-teal-faint text-teal-dk text-[14px] font-medium px-2.5 py-1 rounded-full"
              >
                {{ label }}
              </span>
            </div>
          </div>
          <div class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]">
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">院區</span>
            <span class="text-[18px] text-txt-1 text-right">{{ store.selectedLocation }}</span>
          </div>
          <div class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]">
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">日期</span>
            <span class="text-[18px] text-txt-1 text-right">{{ dateDisplay }}</span>
          </div>
          <div class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]">
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">時間</span>
            <span class="text-[18px] text-txt-1 text-right">{{ store.selectedTime }}</span>
          </div>
          <div v-if="store.selectedDoctor" class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]">
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">醫師</span>
            <span class="text-[18px] text-txt-1 text-right">{{ store.selectedDoctor }}</span>
          </div>
          <div class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]">
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">姓名</span>
            <span class="text-[18px] text-txt-1 text-right">{{ store.customerName }}</span>
          </div>
          <div class="flex justify-between items-start py-2.5">
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">手機</span>
            <span class="text-[18px] text-txt-1 text-right">{{ store.customerPhone }}</span>
          </div>
        </div>
      </div>

      <!-- 諮詢前準備 -->
      <div
        class="border border-border rounded-[14px] bg-gradient-to-b from-teal to-teal-dk overflow-hidden mb-6 shadow-[0_2px_16px_rgba(115,198,203,0.12)]"
      >
        <div class="text-center pt-8 pb-6 px-6">
          <h3 class="text-white text-[22px] font-light tracking-[8px] mb-1">
            諮詢當天｜你可以準備
          </h3>
        </div>

        <div class="bg-white px-6 pt-5 pb-7">
          <ul class="space-y-3 mb-6">
            <li
              v-for="tip in [
                '想改善的膚況照片（素顏、自然光下拍攝最佳）',
                '過去做過的雷射或療程紀錄',
                '目前使用的保養品清單',
                '你期待的膚況目標',
              ]"
              :key="tip"
              class="flex items-start gap-3"
            >
              <span
                class="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-faint flex items-center justify-center text-teal text-[14px] font-bold"
              >
                ✓
              </span>
              <p class="text-[16px] text-txt-2 leading-[1.7]">{{ tip }}</p>
            </li>
          </ul>

          <div class="bg-teal-faint border border-teal-line rounded-xl p-4">
            <div class="flex items-start gap-2 mb-3">
              <div
                class="flex items-center justify-center w-6 h-6 rounded-full bg-teal text-white text-[12px] shrink-0 mt-0.5"
              >
                ⓘ
              </div>
              <h4 class="text-[18px] font-medium text-txt-1">
                諮詢完全免費，請放心
              </h4>
            </div>
            <ul class="space-y-2 pl-8">
              <li
                v-for="tip in [
                  '醫師會根據你的膚況提供專業建議',
                  '不會有任何強迫消費或現場推銷',
                  '你可以帶著方案回家考慮再決定',
                ]"
                :key="tip"
                class="text-[14.5px] text-txt-2 leading-[1.7] relative pl-3"
              >
                <span class="absolute left-0 top-2 w-1 h-1 rounded-full bg-teal" />
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Notice -->
      <p class="text-[14px] text-txt-3 leading-[2.1] text-center mb-6">
        如需更改或取消，請提前 24 小時告知<br />
        客服時間：週一至週六 10:00 — 20:00
      </p>

      <!-- LINE CTA -->
      <div class="border border-border rounded-[14px] bg-white px-5 py-6 text-center mb-6">
        <p class="text-[18px] text-txt-2 mb-4">有任何問題嗎？聯繫我們</p>
        <a
          href="https://line.me/R/ti/p/@336rwmmq"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b04c] text-white text-[16px] font-medium rounded-full px-8 py-3 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          加入 LINE 官方帳號
        </a>
      </div>

      <!-- Start over -->
      <!-- <button
        class="block mx-auto text-[16px] text-txt-3 underline underline-offset-2 hover:text-teal-dk transition-colors"
        @click="startOver"
      >
        重新預約
      </button> -->
    </template>

    <!-- ── Step 4: Confirm ── -->
    <template v-else>
      <button class="btn-back" @click="store.prevStep()">← 返回填寫資料</button>

      <div class="sec-label">確認預約內容</div>

      <div
        class="border border-border rounded-[14px] overflow-hidden mb-6 shadow-[0_2px_16px_rgba(115,198,203,0.08)]"
      >
        <!-- Header -->
        <div class="bg-teal-bg px-[18px] py-[15px] flex items-center gap-2.5">
          <div class="w-2 h-2 rounded-full bg-teal opacity-70" />
          <span class="text-[18px] font-medium text-teal-dk tracking-[3px]">
            預 約 摘 要
          </span>
        </div>

        <!-- Body -->
        <div class="bg-white px-[18px]">
          <!-- 關注膚況 -->
          <div
            v-if="store.selectedConcernCount > 0"
            class="py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] block mb-2">關注膚況</span>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="label in store.selectedConcernLabels"
                :key="label"
                class="inline-block bg-teal-faint text-teal-dk text-[14px] font-medium px-2.5 py-1 rounded-full"
              >
                {{ label }}
              </span>
            </div>
          </div>

          <!-- Location -->
          <div
            class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">院區</span>
            <span class="text-[18px] text-txt-1 text-right">
              {{ store.selectedLocation }}
            </span>
          </div>

          <!-- Date -->
          <div
            class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">日期</span>
            <span class="text-[18px] text-txt-1 text-right">
              {{ dateDisplay }}
            </span>
          </div>

          <!-- Time -->
          <div
            class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">時間</span>
            <span class="text-[18px] text-txt-1 text-right">
              {{ store.selectedTime }}
            </span>
          </div>

          <!-- Doctor -->
          <div
            v-if="store.selectedDoctor"
            class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">醫師</span>
            <span class="text-[18px] text-txt-1 text-right">
              {{ store.selectedDoctor }}
            </span>
          </div>

          <!-- Name -->
          <div
            class="flex justify-between items-start py-2.5 border-b border-[rgba(115,198,203,0.10)]"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">姓名</span>
            <span class="text-[18px] text-txt-1 text-right">
              {{ store.customerName }}
            </span>
          </div>

          <!-- Phone -->
          <div
            class="flex justify-between items-start py-2.5"
          >
            <span class="text-[14px] text-txt-3 tracking-[2px] pt-0.5 shrink-0">手機</span>
            <span class="text-[18px] text-txt-1 text-right">
              {{ store.customerPhone }}
            </span>
          </div>
        </div>
      </div>

      <p v-if="errorMsg" class="text-red-500 text-xs text-center mb-4">
        {{ errorMsg }}
      </p>

      <button class="btn-main" :disabled="submitting" @click="submitBooking">
        {{ submitting ? "送出中..." : "確認送出預約" }}
      </button>
      <div class="note">
        點擊送出即表示同意璧時尚醫美預約條款與個資使用聲明
      </div>
    </template>
  </div>
</template>
