<template>
  <div class="menu-card flex flex-col">
    <!-- Top: emoji / icon area -->
    <div
      class="h-32 flex items-center justify-center text-5xl flex-shrink-0"
      :style="bgStyle"
    >
      {{ emoji }}
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-start gap-2 mb-1">
        <h3 class="font-sans font-semibold text-cream text-sm leading-snug flex-1">{{ item.name }}</h3>
        <div class="flex flex-col items-end gap-1 flex-shrink-0">
          <span v-if="item.popular" class="badge-popular">Popular</span>
          <span v-if="item.spicy" class="text-xs">🌶️</span>
        </div>
      </div>
      <p class="text-cream/40 font-sans text-xs leading-relaxed flex-1 mb-3">{{ item.desc }}</p>

      <div class="flex items-center justify-between mt-auto">
        <div>
          <span class="font-display text-gold text-lg">RM{{ item.price.toFixed(2) }}</span>
          <span v-if="item.altPrice" class="text-cream/30 text-xs ml-1">/ RM{{ item.altPrice.toFixed(2) }}</span>
        </div>
        <button
          class="flex items-center gap-1 text-xs border border-gold/40 text-gold px-3 py-1.5 hover:bg-gold hover:text-charcoal transition-all duration-200 active:scale-95"
          @click="$emit('add', { id: item.id, name: item.name, price: item.price })"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
})
defineEmits(['add'])

const categoryEmojis = {
  thai: ['🌶️', '🍚', '🍜', '🍲', '🐟', '🥬', '🍗'],
  western: ['🍗', '🍝', '🐟', '🥩'],
  drinks: ['☕', '🧋', '🍵', '🥤'],
  snacks: ['🍟', '🥚', '🍳'],
}

const emoji = computed(() => {
  const pool = categoryEmojis[props.item.category] || ['🍽️']
  return pool[props.item.id % pool.length]
})

const bgColors = {
  thai:    ['#3D0000', '#2D1505'],
  western: ['#1A2D00', '#2D1F0E'],
  drinks:  ['#1A1A3D', '#2D1F0E'],
  snacks:  ['#2D2000', '#1A1008'],
}

const bgStyle = computed(() => {
  const [from, to] = bgColors[props.item.category] || ['#2D1F0E', '#1A1008']
  return `background: linear-gradient(135deg, ${from}, ${to})`
})
</script>
