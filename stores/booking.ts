import { defineStore } from 'pinia'

export interface ConcernOption {
  id: string
  label: string
  icon: string
}

export const CONCERN_OPTIONS: ConcernOption[] = [
  { id: 'spot', label: '斑點 / 色素沉澱', icon: '🔵' },
  { id: 'dull', label: '膚色不均 / 暗沉', icon: '🟤' },
  { id: 'pore', label: '毛孔粗大', icon: '⭕' },
  { id: 'fine-line', label: '細紋 / 膚質鬆弛', icon: '📐' },
  { id: 'acne-scar', label: '痘疤 / 凹洞', icon: '💫' },
  { id: 'maintenance', label: '整體養膚 / 預防老化', icon: '🌿' },
]

/**
 * Step 路徑
 *  0: Intro Hero        (全屏 marketing)
 *  1: TechIntro         (前置漏斗 1/3 - 了解療程)
 *  2: ConcernPicker     (前置漏斗 2/3 - 選擇關注 + FAQ)
 *  3: CalendarPicker    (預約 1/3 - 時間)
 *  4: ContactForm       (預約 2/3 - 資料)
 *  5: ConfirmCard       (預約 3/3 - 確認)
 *  6: Success           (完成)
 */
const MAX_STEP = 6

export interface BookingState {
  currentStep: number
  selectedConcerns: string[]
  selectedLocation: string
  selectedDate: string
  selectedTime: string
  selectedDoctor: string
  customerName: string
  customerPhone: string
  note: string
}

export const useBookingStore = defineStore('booking', {
  state: (): BookingState => ({
    currentStep: 0,
    selectedConcerns: [],
    selectedLocation: '',
    selectedDate: '',
    selectedTime: '',
    selectedDoctor: '',
    customerName: '',
    customerPhone: '',
    note: '',
  }),

  getters: {
    selectedConcernCount: (state): number => state.selectedConcerns.length,

    selectedConcernLabels(): string[] {
      return this.selectedConcerns
        .map((id: string) => CONCERN_OPTIONS.find((c) => c.id === id)?.label)
        .filter(Boolean) as string[]
    },

    isConcernSelected: (state) => (id: string): boolean =>
      state.selectedConcerns.includes(id),

    canProceedFromCalendar: (state) =>
      state.selectedLocation !== '' &&
      state.selectedDate !== '' &&
      state.selectedTime !== '',

    canProceedFromContact: (state) =>
      state.customerName.trim() !== '' &&
      /^09\d{8}$/.test(state.customerPhone.trim()),

    scheduledAt: (state) => {
      if (!state.selectedDate || !state.selectedTime) return ''
      return `${state.selectedDate}T${state.selectedTime}:00+08:00`
    },
  },

  actions: {
    toggleConcern(id: string) {
      const idx = this.selectedConcerns.indexOf(id)
      if (idx >= 0) {
        this.selectedConcerns.splice(idx, 1)
      } else {
        this.selectedConcerns.push(id)
      }
    },

    nextStep() {
      if (this.currentStep < MAX_STEP) this.currentStep++
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--
    },
    goToStep(step: number) {
      if (step >= 0 && step <= MAX_STEP) this.currentStep = step
    },
    reset() {
      this.$reset()
    },
  },
})
