<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-gold/20 bg-charcoal shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- IMAGE -->
    <div class="relative h-36 w-full overflow-hidden bg-charcoal">
      <img
        :src="imageSrc"
        :alt="item.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <!-- gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent"></div>

      <!-- badges -->
      <div class="absolute top-2 left-2 flex gap-2">
        <span
          v-if="item.popular"
          class="bg-gold text-charcoal text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
        >
          Popular
        </span>

        <span
          v-if="item.spicy"
          class="bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded-full"
        >
          🌶 Spicy
        </span>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-cream font-semibold text-sm leading-snug">
        {{ item.name }}
      </h3>

      <p class="text-cream/50 text-xs line-clamp-2">
        {{ item.desc }}
      </p>

      <!-- PRICE + BUTTON -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex flex-col">
          <span class="text-gold font-display text-lg">
            RM{{ item.price.toFixed(2) }}
          </span>

          <span
            v-if="item.altPrice"
            class="text-cream/40 text-[10px]"
          >
            / RM{{ item.altPrice.toFixed(2) }}
          </span>
        </div>

        <button
          @click="$emit('add', { id: item.id, name: item.name, price: item.price })"
          class="flex items-center gap-1 px-3 py-1.5 text-xs border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all duration-200 active:scale-95"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M12 5v14m7-7H5"/>
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

const imageSrc = computed(() => {
  // uses /public/menu/1.png, 2.png, etc.
  return `/menu/${props.item.image}.webp`
})
</script>