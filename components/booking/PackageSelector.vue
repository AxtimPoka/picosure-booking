<script setup lang="ts">
import { ref } from 'vue';
import { useBookingStore, AREA_CATALOG } from "~/stores/booking";

const store = useBookingStore();

const featuredItems = AREA_CATALOG.filter((a) => a.featured);
const otherItems = AREA_CATALOG.filter((a) => !a.featured);

// VIO 男性項目提示彈窗
const showVioMaleNotice = ref(false);

function handleItemClick(areaId: string) {
  // 如果點擊的是「私密處 VIO（男）」且尚未選中
  if (areaId === 'vio-m' && !store.isSelected(areaId)) {
    showVioMaleNotice.value = true;
  } else {
    store.toggleItem(areaId);
  }
}

function confirmVioMale() {
  store.toggleItem('vio-m');
  showVioMaleNotice.value = false;
}

function closeVioMaleNotice() {
  showVioMaleNotice.value = false;
}
</script>

<template>
  <div class="pb-28">
    <!-- Featured -->
    <div class="sec-label">本月主打</div>
    <div class="grid grid-cols-2 gap-2.5 mb-7">
      <div
        v-for="area in featuredItems"
        :key="area.id"
        class="relative border rounded-xl p-4 bg-white transition-all duration-200 cursor-pointer"
        :class="[
          store.isSelected(area.id)
            ? 'border-teal shadow-[0_2px_16px_rgba(115,198,203,0.15)]'
            : 'border-border hover:border-teal-line',
          !store.isSelected(area.id) && store.selectedCount >= 6
            ? 'opacity-40 cursor-not-allowed'
            : '',
        ]"
        @click="handleItemClick(area.id)"
      >
        <!-- Top accent bar when selected -->
        <div
          v-if="store.isSelected(area.id)"
          class="absolute top-0 left-0 right-0 h-[3px] bg-teal rounded-t-xl"
        />

        <!-- Check icon -->
        <div
          v-if="store.isSelected(area.id)"
          class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-teal flex items-center justify-center"
        >
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <p class="text-[15px] font-medium text-txt-1 mb-1">{{ area.name }}</p>
        <p class="text-lg font-light text-teal-dk">
          NT$ {{ area.price.toLocaleString() }}
          <small class="text-[12px] font-normal text-txt-3">/ 堂</small>
        </p>
      </div>
    </div>

    <!-- Other Areas -->
    <div class="sec-label">其他部位</div>
    <div class="space-y-2 mb-7">
      <div
        v-for="area in otherItems"
        :key="area.id"
        class="flex items-center justify-between border rounded-xl px-4 py-3 bg-white transition-all duration-200 cursor-pointer"
        :class="[
          store.isSelected(area.id)
            ? 'border-teal'
            : 'border-border hover:border-teal-line',
          !store.isSelected(area.id) && store.selectedCount >= 6
            ? 'opacity-40 cursor-not-allowed'
            : '',
        ]"
        @click="handleItemClick(area.id)"
      >
        <div>
          <p class="text-[15px] font-medium text-txt-1">{{ area.name }}</p>
          <p class="text-sm font-light text-teal-dk">
            NT$ {{ area.price.toLocaleString() }}
            <small class="text-[12px] text-txt-3">/ 堂</small>
          </p>
        </div>

        <!-- Check icon -->
        <div
          v-if="store.isSelected(area.id)"
          class="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0"
        >
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div
          v-else
          class="w-6 h-6 rounded-full border border-border flex-shrink-0"
        />
      </div>
    </div>

    <!-- Sticky Bottom -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-5 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] z-50"
    >
      <div class="max-w-[480px] mx-auto">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs text-txt-2">
            已選
            <span class="font-medium text-teal-dk">{{ store.selectedCount }}</span>
            項 / 上限 6 項
          </span>
        </div>
        <button
          class="btn-main !mb-0"
          :disabled="!store.canProceedToStep2"
          @click="store.nextStep()"
        >
          下一步 · 選擇時間
        </button>
      </div>
    </div>

    <!-- VIO 男性項目提示彈窗 -->
    <div
      v-if="showVioMaleNotice"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-5"
      @click.self="closeVioMaleNotice"
    >
      <div class="bg-white rounded-2xl p-6 max-w-[340px] w-full shadow-xl">
        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-teal-bg mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-teal">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <p class="text-[15px] text-txt-1 text-center leading-relaxed mb-6">
          親愛的客戶，請留意此項目僅能預約男性醫師時間，謝謝您！
        </p>

        <button
          class="btn-main !mb-0"
          @click="confirmVioMale"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>
