<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();

const LOCATIONS = ['台北院區', '台中院區', '高雄院區'];

function selectLocation(loc: string) {
  if (store.selectedLocation === loc) return;
  store.selectedLocation = loc;
  // 切換院區時重設日期和時段
  store.selectedDate = '';
  store.selectedTime = '';
  store.selectedDoctor = '';
  availableSlots.value = [];
}

const locationSelected = computed(() => store.selectedLocation !== '');

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
interface SlotInfo {
  time: string;
  doctors: string[];
}

const availableSlots = ref<SlotInfo[]>([]);
const loadingSlots = ref(false);

const MONTH_NAMES = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月",
];
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

const monthLabel = computed(
  () => `${currentYear.value} 年 ${MONTH_NAMES[currentMonth.value]}`,
);

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();

  const days: { day: number; disabled: boolean; dateStr: string; isToday: boolean }[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push({ day: 0, disabled: true, dateStr: "", isToday: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear.value, currentMonth.value, d);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isSunday = date.getDay() === 0;
    const isToday =
      d === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear();

    days.push({ day: d, disabled: isPast || isSunday, dateStr, isToday });
  }

  return days;
});

function prevMonth() {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value--; }
  else { currentMonth.value--; }
}

function nextMonth() {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++; }
  else { currentMonth.value++; }
}

// 過濾時段：移除已過時間與需提前一小時預約的時段
function filterTimeSlots(slots: SlotInfo[], selectedDate: string): SlotInfo[] {
  const now = new Date();
  const selectedDateObj = new Date(selectedDate);
  const isToday =
    selectedDateObj.getFullYear() === now.getFullYear() &&
    selectedDateObj.getMonth() === now.getMonth() &&
    selectedDateObj.getDate() === now.getDate();

  if (!isToday) {
    return slots;
  }

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const earliestHour = currentMinute > 0 ? currentHour + 2 : currentHour + 1;

  return slots.filter((slot) => {
    const [hour] = slot.time.split(":").map(Number);
    return hour >= earliestHour;
  });
}

async function selectDate(dateStr: string) {
  store.selectedDate = dateStr;
  store.selectedTime = "";
  store.selectedDoctor = "";
  loadingSlots.value = true;

  try {
    const data = await $fetch<{ slots: SlotInfo[] }>("/api/slots", {
      params: { date: dateStr, location: store.selectedLocation },
    });
    availableSlots.value = filterTimeSlots(data.slots, dateStr);
  } catch {
    availableSlots.value = [];
  } finally {
    loadingSlots.value = false;
  }
}

const showDoctorPicker = ref(false);
const pendingSlot = ref<SlotInfo | null>(null);

function selectTime(slot: SlotInfo) {
  if (slot.doctors.length === 1) {
    // 只有一位醫師，直接選擇
    store.selectedTime = slot.time;
    store.selectedDoctor = slot.doctors[0];
  } else {
    // 多位醫師，開啟選擇器
    pendingSlot.value = slot;
    showDoctorPicker.value = true;
  }
}

function confirmDoctor(doctor: string) {
  if (pendingSlot.value) {
    store.selectedTime = pendingSlot.value.time;
    store.selectedDoctor = doctor;
  }
  showDoctorPicker.value = false;
  pendingSlot.value = null;
}

function cancelDoctorPicker() {
  showDoctorPicker.value = false;
  pendingSlot.value = null;
}
</script>

<template>
  <div>
    <button class="btn-back" @click="store.prevStep()">← 返回方案選擇</button>

    <!-- Location Selector -->
    <div class="sec-label">選擇院區</div>
    <div class="grid grid-cols-3 gap-2 mb-6">
      <div
        v-for="loc in LOCATIONS"
        :key="loc"
        class="border rounded-[10px] py-2.5 px-1.5 text-center cursor-pointer transition-all duration-200"
        :class="
          store.selectedLocation === loc
            ? 'border-teal bg-teal-faint'
            : 'border-border bg-white hover:border-teal-line hover:bg-bg-card'
        "
        @click="selectLocation(loc)"
      >
        <p
          class="text-sm font-medium"
          :class="store.selectedLocation === loc ? 'text-teal-dk' : 'text-txt-1'"
        >
          {{ loc }}
        </p>
      </div>
    </div>

    <div
      :class="{ 'opacity-40 pointer-events-none select-none': !locationSelected }"
    >
    <div class="sec-label">選擇預約日期</div>
    <p v-if="!locationSelected" class="text-xs text-txt-3 -mt-3 mb-4">請先選擇院區</p>

    <!-- Calendar Header -->
    <div class="flex items-center justify-between mb-3">
      <button
        class="w-[30px] h-[30px] border border-border rounded-lg bg-white flex items-center justify-center text-txt-2 text-base cursor-pointer transition-all hover:border-teal hover:text-teal"
        @click="prevMonth"
      >
        ‹
      </button>
      <span class="text-sm font-medium text-txt-1">{{ monthLabel }}</span>
      <button
        class="w-[30px] h-[30px] border border-border rounded-lg bg-white flex items-center justify-center text-txt-2 text-base cursor-pointer transition-all hover:border-teal hover:text-teal"
        @click="nextMonth"
      >
        ›
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-[3px] mb-6">
      <!-- Weekday headers -->
      <div
        v-for="wd in WEEKDAYS"
        :key="wd"
        class="text-[12px] text-txt-3 text-center py-[5px]"
      >
        {{ wd }}
      </div>

      <!-- Day cells -->
      <div
        v-for="(cell, i) in calendarDays"
        :key="i"
        class="h-9 rounded-lg flex items-center justify-center text-xs relative transition-all duration-150"
        :class="[
          cell.day === 0
            ? 'cursor-default'
            : cell.disabled
              ? 'text-txt-3 cursor-default opacity-30'
              : store.selectedDate === cell.dateStr
                ? 'bg-teal !text-white font-medium cursor-pointer'
                : cell.isToday
                  ? 'font-medium text-teal cursor-pointer hover:bg-teal-faint'
                  : 'text-txt-1 cursor-pointer hover:bg-teal-faint',
        ]"
        @click="!cell.disabled && cell.day !== 0 && selectDate(cell.dateStr)"
      >
        {{ cell.day || "" }}
        <!-- availability dot -->
        <span
          v-if="!cell.disabled && cell.day !== 0"
          class="absolute bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
          :class="
            store.selectedDate === cell.dateStr
              ? 'bg-white/60'
              : 'bg-teal'
          "
        />
      </div>
    </div>

    <!-- Time Slots -->
    <div v-if="store.selectedDate">
      <div class="sec-label">選擇時段</div>

      <div v-if="loadingSlots" class="text-center text-txt-3 py-6 text-[15px]">
        查詢可用時段中...
      </div>
      <div
        v-else-if="availableSlots.length === 0"
        class="text-center text-txt-3 py-6 text-[15px]"
      >
        該日期暫無可預約時段
      </div>
      <div v-else class="grid grid-cols-3 gap-2 mb-7">
        <div
          v-for="slot in availableSlots"
          :key="slot.time"
          class="border rounded-[10px] py-2.5 px-1.5 text-center cursor-pointer transition-all duration-200"
          :class="
            store.selectedTime === slot.time
              ? 'border-teal bg-teal-faint'
              : 'border-border bg-white hover:border-teal-line hover:bg-bg-card'
          "
          @click="selectTime(slot)"
        >
          <p
            class="text-sm font-medium"
            :class="
              store.selectedTime === slot.time ? 'text-teal-dk' : 'text-txt-1'
            "
          >
            {{ slot.time }}
          </p>
          <p class="text-[12px] text-txt-3 mt-0.5">
            {{ slot.doctors.length === 1 ? slot.doctors[0] : `${slot.doctors.length} 位醫師` }}
          </p>
        </div>
      </div>
    </div>
    </div>

    <button
      class="btn-main"
      :disabled="!store.canProceedToStep3"
      @click="store.nextStep()"
    >
      下一步 · 填寫資料
    </button>

    <!-- 醫師選擇彈窗 -->
    <div
      v-if="showDoctorPicker"
      class="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center px-5"
      @click.self="cancelDoctorPicker"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 class="text-base font-medium text-txt-1 mb-1">選擇醫師</h3>
        <p class="text-xs text-txt-3 mb-5">{{ pendingSlot?.time }} 有多位醫師值班</p>

        <div class="space-y-2 mb-5">
          <button
            v-for="doctor in pendingSlot?.doctors"
            :key="doctor"
            class="w-full border border-border rounded-lg py-3 px-4 text-sm text-txt-1 hover:border-teal hover:bg-teal-faint transition-all"
            @click="confirmDoctor(doctor)"
          >
            {{ doctor }}
          </button>
        </div>

        <button
          class="w-full py-2.5 text-sm text-txt-3 hover:text-txt-1 transition-colors"
          @click="cancelDoctorPicker"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>
