<template>
  <div class="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">

    <!-- Slides -->
    <div
      class="flex h-full transition-transform duration-700 ease-out"
      :style="`transform: translateX(-${active * 100}%)`"
    >

      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="min-w-full h-full relative overflow-hidden"
      >

        <!-- IMAGE (FIXED) -->
        <img
          :src="slide.image"
          class="inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/45"></div>

        <!-- TEXT -->
        <div class="absolute inset-x-0 bottom-0 p-6 md:p-16 m-8">
        <div class="max-w-xl">

            <p class="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            {{ slide.tag }}
            </p>

            <h2 class="text-2xl md:text-5xl font-display text-cream leading-tight break-words">
            {{ slide.title }}
            </h2>

            <p class="text-cream/70 mt-2 text-sm md:text-base">
            {{ slide.desc }}
            </p>

        </div>
        </div>

      </div>

    </div>

    <!-- DOTS -->
    <div class="absolute bottom-4 right-4 flex gap-2">
      <button
        v-for="(s, i) in slides"
        :key="i"
        @click="active = i"
        class="w-2.5 h-2.5 rounded-full transition-all"
        :class="active === i ? 'bg-gold' : 'bg-white/30'"
      />
    </div>

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