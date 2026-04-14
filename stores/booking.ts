import { defineStore } from 'pinia'

export interface AreaItem {
  id: string
  name: string
  price: number
  featured: boolean
}

export const AREA_CATALOG: AreaItem[] = [
  { id: 'face', name: '全臉除毛', price: 899, featured: true },
  { id: 'armpit', name: '腋下除毛', price: 399, featured: true },
  { id: 'vio-f', name: '私密處 VIO（女）', price: 999, featured: true },
  { id: 'lower-leg', name: '小腿除毛', price: 899, featured: true },
  { id: 'beard', name: '鬍子除毛', price: 1399, featured: false },
  { id: 'vio-m', name: '私密處 VIO（男）', price: 1299, featured: false },
  { id: 'upper-arm', name: '上手臂除毛', price: 1999, featured: false },
  { id: 'lower-arm', name: '下手臂除毛', price: 1999, featured: false },
  { id: 'upper-leg', name: '大腿除毛', price: 2999, featured: false },
  { id: 'upper-back', name: '上背除毛', price: 2699, featured: false },
  { id: 'lower-back', name: '下背除毛', price: 2699, featured: false },
  { id: 'knee', name: '膝蓋除毛', price: 500, featured: false },
]

const MAX_SELECTIONS = 6

export interface BookingState {
  currentStep: number
  selectedItems: string[]
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
    selectedItems: [],
    selectedLocation: '',
    selectedDate: '',
    selectedTime: '',
    selectedDoctor: '',
    customerName: '',
    customerPhone: '',
    note: '',
  }),

  getters: {
    selectedCount: (state): number => state.selectedItems.length,

    selectedAreas(): AreaItem[] {
      return this.selectedItems
        .map((id: string) => AREA_CATALOG.find((a) => a.id === id))
        .filter(Boolean) as AreaItem[]
    },

    isSelected: (state) => (id: string): boolean =>
      state.selectedItems.includes(id),

    canProceedToStep2(): boolean {
      return this.selectedCount >= 1
    },

    canProceedToStep3: (state) =>
      state.selectedLocation !== '' &&
      state.selectedDate !== '' &&
      state.selectedTime !== '',

    canProceedToStep4: (state) =>
      state.customerName.trim() !== '' &&
      /^09\d{8}$/.test(state.customerPhone.trim()),

    scheduledAt: (state) => {
      if (!state.selectedDate || !state.selectedTime) return ''
      return `${state.selectedDate}T${state.selectedTime}:00+08:00`
    },
  },

  actions: {
    toggleItem(id: string) {
      const idx = this.selectedItems.indexOf(id)
      if (idx >= 0) {
        this.selectedItems.splice(idx, 1)
      } else if (this.selectedItems.length < MAX_SELECTIONS) {
        this.selectedItems.push(id)
      }
    },

    nextStep() {
      if (this.currentStep < 5) this.currentStep++
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--
    },
    goToStep(step: number) {
      if (step >= 0 && step <= 5) this.currentStep = step
    },
    reset() {
      this.$reset()
    },
  },
})
