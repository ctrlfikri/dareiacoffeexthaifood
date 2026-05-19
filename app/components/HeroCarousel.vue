<template>
  <div class="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-none">

    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-out h-full"
      :style="`transform: translateX(-${active * 100}%)`"
    >
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="min-w-full h-full relative"
      >
        <img
          :src="slide.image"
          class="absolute w-full h-full object-fit bg-black/20"
          loading="lazy"
        />

        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Text -->
        <div class="absolute bottom-10 left-6 md:left-16 text-left max-w-xl">
          <p class="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            {{ slide.tag }}
          </p>
          <h2 class="text-2xl md:text-5xl font-display text-cream leading-tight">
            {{ slide.title }}
          </h2>
          <p class="text-cream/70 mt-2 text-sm md:text-base">
            {{ slide.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-4 right-4 flex gap-2">
      <button
        v-for="(s, i) in slides"
        :key="i"
        @click="active = i"
        class="w-2.5 h-2.5 rounded-full transition-all"
        :class="active === i ? 'bg-gold' : 'bg-white/30'"
      />
    </div>

    <!-- Auto slide -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true }
})

const active = ref(0)

let interval

onMounted(() => {
  interval = setInterval(() => {
    active.value = (active.value + 1) % props.slides.length
  }, 5000)
})

onUnmounted(() => clearInterval(interval))
</script>