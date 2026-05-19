<template>
  <main class="pt-20 min-h-screen bg-charcoal">
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="ornamental-line text-xs mb-4 justify-center max-w-xs mx-auto">
        <span class="tracking-[0.4em] text-gold/50 text-xs">DAREIA KITCHEN</span>
      </div>
      <h1 class="section-title text-3xl sm:text-5xl mb-3">Our Menu</h1>
      <p class="text-cream/50 font-sans text-sm max-w-sm mx-auto">
        Authentic Thai · Western Comfort · Artisan Coffee
      </p>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- ── Sticky filter bar ────────────────────────── -->
      <div class="sticky top-16 z-30 bg-charcoal/95 backdrop-blur py-4 mb-8 -mx-4 px-4 border-b border-gold/20">
        <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat.key"
              :class="[
                'px-4 py-1.5 font-sans text-xs tracking-widest uppercase transition-all duration-200',
                activeCategory === cat.key
                  ? 'bg-gold text-charcoal font-semibold'
                  : 'border border-gold/30 text-gold/70 hover:border-gold hover:text-gold',
              ]"
              @click="activeCategory = cat.key"
            >
              {{ cat.icon }} {{ cat.label }}
            </button>
          </div>

          <!-- Search + Cart -->
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <input
              v-model="search"
              type="text"
              placeholder="Search dishes…"
              class="thai-input text-sm py-2 flex-1 sm:w-52"
            />
            <button
              class="relative btn-primary py-2 px-4 text-xs flex items-center gap-2 whitespace-nowrap"
              @click="openCart"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Cart
              <span v-if="itemCount > 0" class="bg-charcoal text-gold rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {{ itemCount }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Menu Grid ───────────────────────────────── -->
      <div v-if="filteredItems.length > 0">
        <!-- Section headings per category when "all" -->
        <template v-if="activeCategory === 'all' && !search">
          <div v-for="cat in categoriesWithItems" :key="cat.key" class="mb-14">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-2xl">{{ cat.icon }}</span>
              <h2 class="section-title text-xl sm:text-2xl">{{ cat.label }}</h2>
              <div class="flex-1 h-px bg-gold/20" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <MenuCard
                v-for="item in itemsByCategory(cat.key)"
                :key="item.id"
                :item="item"
                @add="addItem"
              />
            </div>
          </div>
        </template>

        <!-- Flat grid for filtered/searched view -->
        <template v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <MenuCard
              v-for="item in filteredItems"
              :key="item.id"
              :item="item"
              @add="addItem"
            />
          </div>
        </template>
      </div>

      <div v-else class="text-center py-20">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-cream/50 font-sans">No items found for "{{ search }}"</p>
        <button class="btn-outline mt-4 text-xs" @click="search = ''">Clear search</button>
      </div>

      <!-- ── Floating Cart CTA ──────────────────────── -->
      <Transition name="slide-up">
        <div
          v-if="itemCount > 0"
          class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
          <button
            class="flex items-center gap-4 bg-primary border border-gold/50 shadow-[0_8px_40px_rgba(0,0,0,0.6)] px-6 py-3 hover:bg-primary-light transition-colors"
            @click="openCart"
          >
            <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="font-sans font-semibold text-cream text-sm">
              {{ itemCount }} item{{ itemCount !== 1 ? 's' : '' }} &nbsp;·&nbsp;
              <span class="text-gold">RM{{ cartTotal.toFixed(2) }}</span>
            </span>
            <span class="font-sans text-xs text-gold uppercase tracking-widest">View Order →</span>
          </button>
        </div>
      </Transition>

      <!-- ── Set Lunch Note ────────────────────────── -->
      <div class="mt-16 bg-primary/30 border border-gold/30 p-6 text-center">
        <p class="text-gold font-display tracking-widest text-sm mb-1">🌶️ SET LUNCH PROMO</p>
        <p class="text-cream/70 font-sans text-sm">
          Mon–Sun &nbsp;|&nbsp; 12PM–3PM &nbsp;|&nbsp;
          Kombo A (Nasi+Drinks) RM12.90 · Kombo B (Chicken+Drinks) RM18.90 · Kombo C (Pasta+Drinks) RM19.90
        </p>
        <p class="text-cream/40 font-sans text-xs mt-2">Each combo comes with Syrup Lime Iced or Black Tea Lime Iced (choose one!)</p>
      </div>
    </div>
  </main>
</template>

<script setup>
const { addItem, itemCount, cartTotal, openCart } = useCart()

const search = ref('')
const activeCategory = ref('all')

const categories = [
  { key: 'all',     icon: '🍽️', label: 'All' },
  { key: 'thai',    icon: '🌶️', label: 'Thai Food' },
  { key: 'western', icon: '🍗', label: 'Western' },
  { key: 'drinks',  icon: '☕', label: 'Drinks' },
  { key: 'snacks',  icon: '🍟', label: 'Snacks' },
]

const menuItems = [
  // ── WESTERN FOOD ──────────────────────────────────────
{ id: 1, image: 1, category: 'western', name: 'Chicken Chop Mushroom Brown Sauce', desc: 'Tender chicken chop with creamy mushroom brown sauce, served with fries.', price: 17.90, spicy: false, popular: true },
{ id: 2, image: 2, category: 'western', name: 'Grilled Chicken with Fries', desc: 'Juicy grilled chicken with crispy golden fries.', price: 17.90, spicy: false, popular: false },
{ id: 3, image: 3, category: 'western', name: 'Fish & Chips', desc: 'Crispy battered fish fillet with thick-cut fries.', price: 18.90, spicy: false, popular: true },
{ id: 4, image: 4, category: 'western', name: 'Spaghetti Beef Bolognese (Meatball)', desc: 'Rich beef bolognese sauce with juicy meatballs.', price: 16.90, spicy: false, popular: false },
{ id: 5, image: 5, category: 'western', name: 'Spaghetti Carbonara (Chicken Slice)', desc: 'Creamy carbonara with chicken slices.', price: 16.90, spicy: false, popular: true },
{ id: 6, image: 6, category: 'western', name: 'Spaghetti Aglio Olio Spicy Prawn', desc: 'Garlic spaghetti with spicy prawns.', price: 17.90, spicy: true, popular: true },

  // ── THAI NASI / RICE ─────────────────────────────────
{ id: 10, image: 10, category: 'thai', name: 'Nasi Goreng Tom Yam', desc: 'Spicy sour Tom Yam fried rice.', price: 11.90, spicy: true, popular: true },
{ id: 11, image: 11, category: 'thai', name: 'Nasi Goreng Seafood Thai', desc: 'Thai seafood fried rice.', price: 12.90, spicy: true, popular: true },
{ id: 12, image: 12, category: 'thai', name: 'Nasi Goreng Ayam Pandan', desc: 'Fragrant pandan chicken fried rice.', price: 11.90, spicy: false, popular: false },
{ id: 13, image: 13, category: 'thai', name: 'Nasi Goreng Kampung Thai', desc: 'Village-style Thai fried rice.', price: 9.90, spicy: true, popular: true },
{ id: 14, image: 14, category: 'thai', name: 'Nasi Goreng Pattaya', desc: 'Egg-wrapped fried rice.', price: 9.90, spicy: false, popular: false },
{ id: 15, image: 15, category: 'thai', name: 'Daging Masak Merah', desc: 'Beef in spicy red Thai sauce.', price: 10.90, spicy: true, popular: false, altPrice: 11.90 },
{ id: 16, image: 16, category: 'thai', name: 'Ayam Pad Prik', desc: 'Thai chilli chicken stir fry.', price: 10.90, spicy: true, popular: true, altPrice: 11.90 },
{ id: 17, image: 17, category: 'thai', name: 'Ayam Kunyit', desc: 'Turmeric chicken, golden and aromatic.', price: 10.90, spicy: false, popular: false, altPrice: 11.90 },

  // ── THAI MEE / NOODLES ────────────────────────────────
{ id: 20, image: 20, category: 'thai', name: 'Mee/Bihun Ayam Goreng', desc: 'Stir-fried noodles with chicken.', price: 8.90, spicy: false, popular: false },
{ id: 21, image: 21, category: 'thai', name: 'Mee Seafood Goreng', desc: 'Seafood stir-fried noodles.', price: 10.90, spicy: false, popular: false },
{ id: 22, image: 22, category: 'thai', name: 'Mee Tom Yam Ayam', desc: 'Tom Yam noodle soup with chicken.', price: 9.90, spicy: true, popular: true },
{ id: 23, image: 23, category: 'thai', name: 'Mee Tom Yam Seafood', desc: 'Seafood Tom Yam noodles.', price: 11.90, spicy: true, popular: true },
{ id: 24, image: 24, category: 'thai', name: 'Rad Na', desc: 'Thai gravy noodles.', price: 9.90, spicy: false, popular: false },

  // ── TOM YUM / SOUP ────────────────────────────────────
{ id: 30, image: 30, category: 'thai', name: 'Tom Yam Clear Ayam/Beef', desc: 'Clear spicy sour soup.', price: 10.90, spicy: true, popular: false },
{ id: 31, image: 31, category: 'thai', name: 'Tom Yam Clear Seafood', desc: 'Seafood clear Tom Yam.', price: 13.90, spicy: true, popular: true },
{ id: 32, image: 32, category: 'thai', name: 'Tom Yam Creamy Ayam/Beef', desc: 'Creamy spicy coconut soup.', price: 11.90, spicy: true, popular: true },
{ id: 33, image: 33, category: 'thai', name: 'Tom Yam Creamy Seafood', desc: 'Rich seafood creamy Tom Yam.', price: 14.90, spicy: true, popular: true },
{ id: 34, image: 34, category: 'thai', name: 'Sup Sayur Thai', desc: 'Light vegetable soup.', price: 9.90, spicy: false, popular: false },
{ id: 35, image: 35, category: 'thai', name: 'Tom Kha Ayam/Daging', desc: 'Coconut galangal soup.', price: 10.90, spicy: false, popular: false },

  // ── AYAM & DAGING ────────────────────────────────────
{ id: 40, image: 40, category: 'thai', name: 'Ayam/Daging Halia', desc: 'Ginger stir fry.', price: 9.90, spicy: false, popular: false, altPrice: 10.90 },
{ id: 41, image: 41, category: 'thai', name: 'Ayam/Daging Masak Merah', desc: 'Spicy red Thai sauce.', price: 9.90, spicy: true, popular: false, altPrice: 10.90 },
{ id: 42, image: 42, category: 'thai', name: 'Ayam/Daging Pad Prik', desc: 'Chilli stir fry.', price: 9.90, spicy: true, popular: true, altPrice: 10.90 },
{ id: 43, image: 43, category: 'thai', name: 'Ayam/Daging Kunyit', desc: 'Turmeric chicken/beef.', price: 9.90, spicy: false, popular: false, altPrice: 10.90 },

  // ── SEAFOOD ──────────────────────────────────────────
{ id: 50, image: 50, category: 'thai', name: 'Ikan Goreng Bersambal', desc: 'Whole fried fish with sambal.', price: 37.90, spicy: true, popular: false },
{ id: 51, image: 51, category: 'thai', name: 'Siakap Stim Limau', desc: 'Steamed sea bass with lime.', price: 35.90, spicy: false, popular: true },
{ id: 52, image: 52, category: 'thai', name: 'Siakap 3 Rasa', desc: 'Sweet sour spicy fish.', price: 35.90, spicy: true, popular: true },
{ id: 53, image: 53, category: 'thai', name: 'Sotong Goreng Tepung', desc: 'Crispy squid rings.', price: 12.90, spicy: false, popular: false },
{ id: 54, image: 54, category: 'thai', name: 'Udang Buttermilk', desc: 'Creamy butter prawns.', price: 23.90, spicy: false, popular: true },

  // ── SAYUR ────────────────────────────────────────────
{ id: 60, image: 60, category: 'thai', name: 'Kangkung Belacan', desc: 'Water spinach stir fry.', price: 8.90, spicy: true, popular: false },
{ id: 61, image: 61, category: 'thai', name: 'Kailan Ikan Masin', desc: 'Kale with salted fish.', price: 8.90, spicy: false, popular: false },

  // ── ADD-ONS ──────────────────────────────────────────
{ id: 65, image: 65, category: 'snacks', name: 'Nasi Putih', desc: 'Steamed rice.', price: 2.00, spicy: false, popular: false },
{ id: 66, image: 66, category: 'snacks', name: 'Telur Mata', desc: 'Fried egg.', price: 2.00, spicy: false, popular: false },
{ id: 67, image: 67, category: 'snacks', name: 'Telur Dadar', desc: 'Omelette.', price: 2.00, spicy: false, popular: false },
{ id: 68, image: 68, category: 'snacks', name: 'Fries', desc: 'Crispy fries.', price: 9.90, spicy: false, popular: false },
{ id: 69, image: 69, category: 'snacks', name: 'Sausage', desc: 'Grilled sausage.', price: 9.90, spicy: false, popular: false },

  // ── DRINKS: COFFEE ────────────────────────────────────
{ id: 70, image: 70, category: 'drinks', name: 'Espresso', desc: 'Strong coffee shot.', price: 7.90, spicy: false, popular: false },
{ id: 71, image: 71, category: 'drinks', name: 'Americano', desc: 'Bold black coffee.', price: 8.90, spicy: false, popular: false, altPrice: 10.90 },
{ id: 72, image: 72, category: 'drinks', name: 'Latte', desc: 'Smooth milk coffee.', price: 10.90, spicy: false, popular: true, altPrice: 12.90 },
{ id: 73, image: 73, category: 'drinks', name: 'Cappuccino', desc: 'Foamy coffee.', price: 10.90, spicy: false, popular: false, altPrice: 12.90 },
{ id: 74, image: 74, category: 'drinks', name: 'Mocha', desc: 'Chocolate coffee.', price: 11.90, spicy: false, popular: false, altPrice: 13.90 },
{ id: 75, image: 75, category: 'drinks', name: 'Spanish Latte', desc: 'Sweet creamy latte.', price: 11.90, spicy: false, popular: true, altPrice: 13.90 },
{ id: 76, image: 76, category: 'drinks', name: 'Matcha', desc: 'Japanese green tea.', price: 12.90, spicy: false, popular: false, altPrice: 14.90 },
{ id: 77, image: 77, category: 'drinks', name: 'Chocolate', desc: 'Rich chocolate drink.', price: 11.90, spicy: false, popular: false, altPrice: 13.90 },


  // ── DRINKS: THAI ─────────────────────────────────────
{ id: 80, image: 80, category: 'drinks', name: 'Thai Green Milk Tea', desc: 'Authentic Thai tea.', price: 8.90, spicy: false, popular: true },
{ id: 81, image: 81, category: 'drinks', name: 'Thai Milk Tea', desc: 'Classic Thai milk tea.', price: 7.90, spicy: false, popular: true },

  // ── DRINKS: CLASSIC ──────────────────────────────────
  { id: 85, category: 'drinks', name: 'Sirap Pandan Rose (Iced)', desc: 'Sweet pandan rose syrup on ice.', price: 3.90, spicy: false, popular: false },
  { id: 86, category: 'drinks', name: 'Sirap Pandan Rose with Lime', desc: 'Hot RM3.90 · Cold RM4.90.', price: 3.90, spicy: false, popular: false, altPrice: 4.90 },
  { id: 87, category: 'drinks', name: 'Bandung Creamy (Iced)', desc: 'Creamy rose milk drink. Cold RM5.50.', price: 5.50, spicy: false, popular: false },
  { id: 88, category: 'drinks', name: 'Lemon & Lime', desc: 'Hot RM3.90 · Cold RM4.90. Refreshing citrus drink.', price: 3.90, spicy: false, popular: false, altPrice: 4.90 },
  { id: 89, category: 'drinks', name: 'Black Tea (Teh O)', desc: 'Hot RM3.90 · Cold RM4.90.', price: 3.90, spicy: false, popular: false, altPrice: 4.90 },
  { id: 90, category: 'drinks', name: 'Black Tea with Lemon (Teh O Limau)', desc: 'Hot RM4.50 · Cold RM5.50.', price: 4.50, spicy: false, popular: false, altPrice: 5.50 },
  { id: 91, category: 'drinks', name: 'Classic Milk Tea (Teh Susu)', desc: 'Hot RM4.50 · Cold RM5.50. The Malaysian comfort drink.', price: 4.50, spicy: false, popular: true, altPrice: 5.50 },
]

const filteredItems = computed(() => {
  let items = menuItems
  if (activeCategory.value !== 'all') {
    items = items.filter((i) => i.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    items = items.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q))
  }
  return items
})

const categoriesWithItems = computed(() =>
  categories.filter((c) => c.key !== 'all' && menuItems.some((i) => i.category === c.key))
)

function itemsByCategory(catKey) {
  return menuItems.filter((i) => i.category === catKey)
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
