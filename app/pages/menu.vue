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
  { id: 1,  category: 'western', name: 'Chicken Chop Mushroom Brown Sauce', desc: 'Tender chicken chop with creamy mushroom brown sauce, served with fries.', price: 17.90, spicy: false, popular: true },
  { id: 2,  category: 'western', name: 'Grilled Chicken with Fries', desc: 'Juicy grilled chicken with crispy golden fries.', price: 17.90, spicy: false, popular: false },
  { id: 3,  category: 'western', name: 'Fish & Chips', desc: 'Crispy battered fish fillet with thick-cut fries.', price: 18.90, spicy: false, popular: true },
  { id: 4,  category: 'western', name: 'Spaghetti Beef Bolognese (Meatball)', desc: 'Rich beef bolognese sauce with juicy meatballs on spaghetti.', price: 16.90, spicy: false, popular: false },
  { id: 5,  category: 'western', name: 'Spaghetti Carbonara (Chicken Slice)', desc: 'Creamy carbonara with tender chicken slices.', price: 16.90, spicy: false, popular: true },
  { id: 6,  category: 'western', name: 'Spaghetti Aglio Olio Spicy Prawn', desc: 'Garlic-infused spaghetti with spicy jumbo prawns.', price: 17.90, spicy: true, popular: true },

  // ── THAI NASI / RICE ─────────────────────────────────
  { id: 10, category: 'thai', name: 'Nasi Goreng Tom Yam', desc: 'Tom Yam flavoured fried rice — fragrant, spicy & tangy.', price: 11.90, spicy: true, popular: true },
  { id: 11, category: 'thai', name: 'Nasi Goreng Seafood Thai', desc: 'Thai-style seafood fried rice with fresh catches.', price: 12.90, spicy: true, popular: true },
  { id: 12, category: 'thai', name: 'Nasi Goreng Ayam Pandan', desc: 'Fragrant pandan chicken fried rice — aromatic & light.', price: 11.90, spicy: false, popular: false },
  { id: 13, category: 'thai', name: 'Nasi Goreng Kampung Thai', desc: 'Classic Thai village-style fried rice with chilli & anchovies.', price: 9.90, spicy: true, popular: true },
  { id: 14, category: 'thai', name: 'Nasi Goreng Pattaya', desc: 'Pattaya-style fried rice wrapped in a fluffy egg omelette.', price: 9.90, spicy: false, popular: false },
  { id: 15, category: 'thai', name: 'Nasi Putih / Goreng Daging Masak Merah', desc: 'Beef in spicy red Thai sauce, with white or fried rice.', price: 10.90, spicy: true, popular: false, altPrice: 11.90 },
  { id: 16, category: 'thai', name: 'Nasi Putih / Goreng Ayam Pad Prik', desc: 'Thai chilli stir-fried chicken with white or fried rice.', price: 10.90, spicy: true, popular: true, altPrice: 11.90 },
  { id: 17, category: 'thai', name: 'Nasi Putih / Goreng Ayam Kunyit', desc: 'Turmeric chicken with white or fried rice. Golden & aromatic.', price: 10.90, spicy: false, popular: false, altPrice: 11.90 },

  // ── THAI MEE / NOODLES ────────────────────────────────
  { id: 20, category: 'thai', name: 'Mee/Bihun/Koey Teow Goreng Ayam', desc: 'Choice of noodle stir-fried with chicken. Comfort in a bowl.', price: 8.90, spicy: false, popular: false },
  { id: 21, category: 'thai', name: 'Mee/Bihun/Koey Teow Goreng Seafood', desc: 'Stir-fried noodles with fresh seafood medley.', price: 10.90, spicy: false, popular: false },
  { id: 22, category: 'thai', name: 'Mee/Bihun Tom Yam Ayam', desc: 'Noodles in a spicy, tangy Tom Yam broth with chicken.', price: 9.90, spicy: true, popular: true },
  { id: 23, category: 'thai', name: 'Mee/Bihun Tom Yam Seafood', desc: 'Tom Yam noodles with an abundance of fresh seafood.', price: 11.90, spicy: true, popular: true },
  { id: 24, category: 'thai', name: 'Rad Na', desc: 'Wide rice noodles in thick gravy sauce — a Thai classic.', price: 9.90, spicy: false, popular: false },

  // ── TOM YUM / SOUP ────────────────────────────────────
  { id: 30, category: 'thai', name: 'Tom Yam Jernih Ayam/Beef', desc: 'Clear Tom Yam broth — light, sour & fragrant with chicken or beef.', price: 10.90, spicy: true, popular: false },
  { id: 31, category: 'thai', name: 'Tom Yam Jernih Seafood', desc: 'Clear Tom Yam with generous seafood. Bright & aromatic.', price: 13.90, spicy: true, popular: true },
  { id: 32, category: 'thai', name: 'Tom Yam Berkrim Ayam/Beef', desc: 'Creamy Tom Yam — rich coconut milk base, bold spice.', price: 11.90, spicy: true, popular: true },
  { id: 33, category: 'thai', name: 'Tom Yam Berkrim Seafood', desc: 'Creamy Tom Yam packed with mixed seafood. House favourite.', price: 14.90, spicy: true, popular: true },
  { id: 34, category: 'thai', name: 'Sup Sayur Thai Campur', desc: 'Clear Thai mixed vegetable soup — light & healthy.', price: 9.90, spicy: false, popular: false },
  { id: 35, category: 'thai', name: 'Tom Kha Ayam/Daging', desc: 'Coconut galangal soup with chicken or beef. Fragrant & soothing.', price: 10.90, spicy: false, popular: false },

  // ── AYAM & DAGING ────────────────────────────────────
  { id: 40, category: 'thai', name: 'Ayam / Daging Masak Halia Thai', desc: 'Chicken or beef stir-fried with fresh ginger. Warming & bold.', price: 9.90, spicy: false, popular: false, altPrice: 10.90 },
  { id: 41, category: 'thai', name: 'Ayam / Daging Masak Merah Thai', desc: 'Chicken or beef in spicy red Thai sauce.', price: 9.90, spicy: true, popular: false, altPrice: 10.90 },
  { id: 42, category: 'thai', name: 'Ayam / Daging Pad Prik Thai', desc: 'Stir-fried chilli chicken or beef — a Thai staple.', price: 9.90, spicy: true, popular: true, altPrice: 10.90 },
  { id: 43, category: 'thai', name: 'Ayam / Daging Masak Kunyit', desc: 'Golden turmeric-braised chicken or beef. Rich & aromatic.', price: 9.90, spicy: false, popular: false, altPrice: 10.90 },

  // ── SEAFOOD ──────────────────────────────────────────
  { id: 50, category: 'thai', name: 'Ikan Goreng Thai Bersambal', desc: 'Whole fried fish with traditional Thai sambal. Crispy & fiery.', price: 37.90, spicy: true, popular: false },
  { id: 51, category: 'thai', name: 'Ikan Siakap Stim Limau Thai', desc: 'Steamed sea bass with Thai lime sauce. Light, fresh & fragrant.', price: 35.90, spicy: false, popular: true },
  { id: 52, category: 'thai', name: 'Ikan Siakap Masak Tiga Rasa Thai', desc: 'Sea bass in sweet-sour-spicy three-flavour sauce. A must-try!', price: 35.90, spicy: true, popular: true },
  { id: 53, category: 'thai', name: 'Sotong Goreng Tepung', desc: 'Crispy battered squid rings. Golden & irresistible.', price: 12.90, spicy: false, popular: false },
  { id: 54, category: 'thai', name: 'Udang Buttermilk (6 pcs)', desc: 'Juicy prawns in creamy buttermilk sauce. Rich & indulgent.', price: 23.90, spicy: false, popular: true },

  // ── SAYUR ────────────────────────────────────────────
  { id: 60, category: 'thai', name: 'Kangkung Goreng Belacan Thai', desc: 'Water spinach stir-fried with Thai shrimp paste. Flame-cooked.', price: 8.90, spicy: true, popular: false },
  { id: 61, category: 'thai', name: 'Kailan Goreng Ikan Masin', desc: 'Chinese kale stir-fried with salted fish. Bold & savoury.', price: 8.90, spicy: false, popular: false },

  // ── ADD-ONS ──────────────────────────────────────────
  { id: 65, category: 'snacks', name: 'Nasi Putih', desc: 'Steamed white rice.', price: 2.00, spicy: false, popular: false },
  { id: 66, category: 'snacks', name: 'Telur Goreng Mata', desc: 'Sunny-side-up egg.', price: 2.00, spicy: false, popular: false },
  { id: 67, category: 'snacks', name: 'Telur Dadar', desc: 'Thai-style omelette.', price: 2.00, spicy: false, popular: false },
  { id: 68, category: 'snacks', name: 'Fries', desc: 'Crispy golden fries.', price: 9.90, spicy: false, popular: false },
  { id: 69, category: 'snacks', name: 'Sausage', desc: 'Grilled sausage.', price: 9.90, spicy: false, popular: false },

  // ── DRINKS: COFFEE ────────────────────────────────────
  { id: 70, category: 'drinks', name: 'Espresso', desc: 'Single shot. Pure & intense.', price: 7.90, spicy: false, popular: false },
  { id: 71, category: 'drinks', name: 'Americano / Long Black', desc: 'Hot RM8.90 · Cold RM10.90. Bold espresso diluted to perfection.', price: 8.90, spicy: false, popular: false, altPrice: 10.90 },
  { id: 72, category: 'drinks', name: 'Latte', desc: 'Hot RM10.90 · Cold RM12.90. Smooth espresso with silky milk.', price: 10.90, spicy: false, popular: true, altPrice: 12.90 },
  { id: 73, category: 'drinks', name: 'Cappuccino', desc: 'Hot RM10.90 · Cold RM12.90. Frothy & balanced.', price: 10.90, spicy: false, popular: false, altPrice: 12.90 },
  { id: 74, category: 'drinks', name: 'Mocha', desc: 'Hot RM11.90 · Cold RM13.90. Espresso with rich chocolate.', price: 11.90, spicy: false, popular: false, altPrice: 13.90 },
  { id: 75, category: 'drinks', name: 'Spanish Latte', desc: 'Hot RM11.90 · Cold RM13.90. Condensed milk latte — sweet & creamy.', price: 11.90, spicy: false, popular: true, altPrice: 13.90 },
  { id: 76, category: 'drinks', name: 'Matcha', desc: 'Hot RM12.90 · Cold RM14.90. Premium Japanese matcha.', price: 12.90, spicy: false, popular: false, altPrice: 14.90 },
  { id: 77, category: 'drinks', name: 'Signature Chocolate', desc: 'Hot RM11.90 · Cold RM13.90. Indulgent house chocolate drink.', price: 11.90, spicy: false, popular: false, altPrice: 13.90 },

  // ── DRINKS: THAI ─────────────────────────────────────
  { id: 80, category: 'drinks', name: 'Thai Green Milk Tea (Cha Keow Yen)', desc: 'Hot or Cold RM8.90. Authentic Thai green tea with milk.', price: 8.90, spicy: false, popular: true },
  { id: 81, category: 'drinks', name: 'Thai Milk Tea (Cha Yen)', desc: 'Hot or Cold RM7.90. The classic orange Thai milk tea.', price: 7.90, spicy: false, popular: true },

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
