<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();

const phoneError = computed(() => {
  const phone = store.customerPhone.trim();
  if (!phone) return '';
  if (!/^09\d{8}$/.test(phone)) {
    return '請輸入正確的手機號碼（09 開頭，共 10 碼）';
  }
  return '';
});
</script>

<template>
  <div>
    <button class="btn-back" @click="store.prevStep()">← 返回時間選擇</button>

    <div class="sec-label">填寫聯絡資料</div>

    <div class="mb-3.5">
      <label class="block text-[11px] tracking-[2px] text-txt-2 mb-[7px]">
        姓 名
      </label>
      <input
        v-model="store.customerName"
        type="text"
        placeholder="請輸入您的姓名"
        class="w-full border border-border rounded-[10px] py-2.5 px-3.5 text-sm bg-white text-txt-1 outline-none font-sans transition-colors placeholder:text-txt-3 focus:border-teal focus:shadow-[0_0_0_3px_rgba(115,198,203,0.10)]"
      />
    </div>

    <div class="mb-3.5">
      <label class="block text-[11px] tracking-[2px] text-txt-2 mb-[7px]">
        手 機 號 碼
      </label>
      <input
        v-model="store.customerPhone"
        type="tel"
        placeholder="請輸入手機號碼"
        maxlength="10"
        class="w-full border rounded-[10px] py-2.5 px-3.5 text-sm bg-white text-txt-1 outline-none font-sans transition-colors placeholder:text-txt-3 focus:shadow-[0_0_0_3px_rgba(115,198,203,0.10)]"
        :class="phoneError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-teal'"
      />
      <p v-if="phoneError" class="text-xs text-red-500 mt-1.5">{{ phoneError }}</p>
    </div>

    <div class="mb-3.5">
      <label class="block text-[11px] tracking-[2px] text-txt-2 mb-[7px]">
        備 註（選填）
      </label>
      <input
        v-model="store.note"
        type="text"
        placeholder="上次除毛時間，過敏史、特殊需求或其他說明…"
        class="w-full border border-border rounded-[10px] py-2.5 px-3.5 text-sm bg-white text-txt-1 outline-none font-sans transition-colors placeholder:text-txt-3 focus:border-teal focus:shadow-[0_0_0_3px_rgba(115,198,203,0.10)]"
      />
    </div>

    <button
      class="btn-main"
      :disabled="!store.canProceedToStep4"
      @click="store.nextStep()"
    >
      下一步 · 確認預約
    </button>
    <div class="note">送出後客服將於 30 分鐘內確認，並以 LINE 通知您</div>
  </div>
</template>
