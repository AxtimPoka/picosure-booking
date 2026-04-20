<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const store = useBookingStore();
</script>

<template>
  <div class="pb-8">
    <!-- ── Section heading ── -->
    <div class="mb-5">
      <div class="text-[12px] tracking-[2px] text-teal font-medium mb-2">
        CORE TECHNOLOGY
      </div>
      <h2 class="text-[22px] font-medium text-txt-1 leading-[1.55]">
        為什麼 Picosure Pro 鉑金蜂巢皮秒<br />
        和其他皮秒不一樣？
      </h2>
    </div>

    <!-- ── Card 1: 755nm ── -->
    <div class="bg-bg-card border border-border rounded-2xl p-5 mb-4">
      <!-- Compare bar -->
      <div class="flex gap-2 mb-4">
        <div
          class="flex-1 bg-teal-faint border-[1.5px] border-teal-line rounded-lg p-3 text-center"
        >
          <img src="@/assets/imgs/755nm.png" alt="755nm" class="w-full aspect-square mx-auto mb-2 object-cover rounded-lg" />
          <div class="text-[12px] font-medium text-teal-dk mb-1">755nm</div>
          <div class="font-en text-[20px] text-teal-dk font-medium leading-none">50×</div>
          <div class="text-[12px] text-txt-2 mt-1.5 leading-[1.4]">
            對黑色素專一<br />血管迴避性高
          </div>
        </div>
        <div
          class="flex-1 bg-black/[0.02] border-[1.5px] border-black/[0.06] rounded-lg p-3 text-center"
        >
          <img src="@/assets/imgs/general.png" alt="1064nm" class="w-full aspect-square mx-auto mb-2 object-cover rounded-lg" />
          <div class="text-[12px] font-medium text-txt-3 mb-1">1064nm</div>
          <div class="font-en text-[18px] text-txt-3 font-medium leading-none pt-0.5">
            一般
          </div>
          <div class="text-[12px] text-txt-3 mt-1.5 leading-[1.4]">
            穿透深但易傷及<br />微血管組織
          </div>
        </div>
      </div>

      <h3 class="text-[18px] font-medium text-txt-1 mb-2.5 leading-[1.5]">
        755nm 波長 · 黑色素的精準獵手
      </h3>
      <p class="text-[15px] text-txt-2 leading-[1.85] font-light">
        755nm 對黑色素的吸收率是含氧血紅素的
        <span class="text-teal-dk font-medium">50 倍</span>，能量幾乎不被血管誤吸收。相較 1064nm 常見的術後出血點與瘀青，755nm 術後僅有輕微泛紅，多數人隔天即可正常上班。
      </p>
    </div>

    <!-- ── Card 2: LIOB ── -->
    <div class="bg-bg-card border border-border rounded-2xl p-5 mb-4">
      <!-- Before/After comparison -->
      <div class="flex gap-6 mb-4 justify-center">
        <div class="text-center">
          <img src="@/assets/imgs/before.png" alt="傳統奈秒雷射術後" class="w-32 h-32 rounded-lg mb-2 object-cover" />
          <div class="text-[12px] text-txt-2">傳統奈秒雷射術後</div>
        </div>
        <div class="text-center">
          <img src="@/assets/imgs/after.png" alt="755皮秒雷射術後" class="w-32 h-32 rounded-lg mb-2 object-cover" />
          <div class="text-[12px] text-txt-2">755皮秒雷射術後</div>
        </div>
      </div>

      <h3 class="text-[18px] font-medium text-txt-1 mb-2.5 leading-[1.5]">
        蜂巢透鏡 × LIOB 效應
      </h3>
      <p class="text-[15px] text-txt-2 leading-[1.85] font-light">
        蜂巢透鏡將
        <span class="text-teal-dk font-medium">70% 能量聚焦在不到 10% 的治療面積</span>，觸發 LIOB（雷射誘導光學擊穿）效應——在表皮下產生微小空泡與壓力波，喚醒真皮層纖維母細胞自主合成膠原蛋白與彈力蛋白。
      </p>
      <p class="text-[15px] text-txt-2 leading-[1.85] font-light mt-3">
        全程<span class="text-teal-dk font-medium">無開放性傷口</span>，表皮完整性不受破壞——「表面看不出來，深層正在重建」。
      </p>
    </div>

    <!-- ── Card 3: 養膚三部曲 ── -->
    <div class="bg-bg-card border border-border rounded-2xl p-5 mb-5">
      <h3 class="text-[18px] font-medium text-txt-1 mb-4 leading-[1.5]">
        養膚三部曲 · 越打越健康
      </h3>

      <div class="relative pl-7">
        <div
          class="absolute left-2 top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-teal via-teal-lt to-transparent"
        />

        <div class="relative mb-5">
          <div
            class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white ring-2 ring-teal-line"
          />
          <h4 class="text-[16px] font-medium text-txt-1 mb-1.5">① 結構重建</h4>
          <p class="text-[14.5px] text-txt-2 leading-[1.8] font-light">
            治療後第一型膠原蛋白與彈性纖維同步新生，真皮層厚度增加，肌膚地基更穩固。
          </p>
        </div>

        <div class="relative mb-5">
          <div
            class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white ring-2 ring-teal-line"
          />
          <h4 class="text-[16px] font-medium text-txt-1 mb-1.5">② 屏障強化</h4>
          <p class="text-[14.5px] text-txt-2 leading-[1.8] font-light">
            以物理壓力波取代熱效應，不破壞角質層與基底膜，定期保養後皮膚屏障反而越來越穩固。
          </p>
        </div>

        <div class="relative">
          <div
            class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white ring-2 ring-teal-line"
          />
          <h4 class="text-[16px] font-medium text-txt-1 mb-1.5">③ 色素環境優化</h4>
          <p class="text-[14.5px] text-txt-2 leading-[1.8] font-light">
            改善真皮層微環境，讓皮膚結構更完整，黑色素不易沉積，從源頭降低色素復發機率。
          </p>
        </div>
      </div>
    </div>

    <!-- ── Quote box ── -->
    <div
      class="border-l-[3px] border-teal-line bg-teal-faint/40 pl-5 py-4 pr-4 rounded-r-lg mb-7"
    >
      <p class="text-[15.5px] text-txt-2 italic leading-[1.85] font-light">
        「定期施打後，即使中間暫停一段時間，膚質仍持續在進步——細胞的修復機制一旦被喚醒，會持續自我運作。」
      </p>
      <div class="text-[12px] text-txt-3 mt-2 not-italic">— 臨床觀察回饋</div>
    </div>

    <!-- ── Nav footer ── -->
    <div class="flex items-center justify-between mb-4">
      <button
        class="text-[15px] text-txt-3 hover:text-teal transition-colors"
        @click="store.goToStep(0)"
      >
        ← 回上一步
      </button>
      <span class="text-[12px] text-txt-3">2 / 4</span>
    </div>
    <button class="btn-main !mb-0" @click="store.goToStep(2)">
      選擇你最在意的膚況 →
    </button>
  </div>
</template>
