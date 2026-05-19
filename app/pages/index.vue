<template>
  <main>
    <!-- ═══════════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════════ -->
<section class="w-full relative">
  <div class="w-full h-[55vh] md:h-[65vh] lg:h-[70vh] overflow-hidden relative">
    <HeroCarousel class="w-full h-full" :slides="heroSlides" />
  </div>
</section>

<section class="relative py-24 px-4 overflow-hidden">

  <!-- Background glow -->
  <div class="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal"></div>

  <!-- Floating blur orbs -->
  <div class="absolute top-10 left-10 w-72 h-72 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
  <div class="absolute bottom-10 right-10 w-72 h-72 bg-gold/10 blur-3xl rounded-full animate-pulse"></div>

  <div class="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    <!-- LEFT: TEXT STORY -->
    <div>

      <h2 class="font-display text-4xl md:text-5xl text-cream leading-tight">
        Flavours that
        <span class="text-gold">move</span> with emotion
      </h2>

      <p class="text-cream/60 mt-6 text-sm leading-relaxed">
        At Dareia, every dish is crafted with intention — bold Thai spices,
        comforting Western classics, and coffee that completes the moment.
      </p>

      <div class="flex gap-4 mt-8">
        <NuxtLink to="/menu" class="btn-primary px-6 py-3">
          Explore Menu
        </NuxtLink>

        <NuxtLink to="/booking" class="btn-outline px-6 py-3">
          Book Table
        </NuxtLink>
      </div>

    </div>

    <!-- RIGHT: 3D STYLE FOOD HERO -->
    <div class="relative flex justify-center">

      <!-- rotating glow ring -->
      <div class="absolute w-72 h-72 rounded-full border border-gold/20 animate-spin-slow"></div>

      <!-- MAIN OBJECT -->
      <div class="relative w-64 h-64 md:w-80 md:h-80">

        <img
          src="/tomyam.png"
          class="w-full h-full object-contain drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
        />

      </div>

      <!-- floating labels -->
      <div class="absolute top-10 left-0 bg-primary border border-gold/30 px-3 py-1 text-xs text-gold animate-bounce">
        🌶️ Signature Tom Yam
      </div>

      <div class="absolute bottom-10 right-0 bg-charcoal border border-gold/20 px-3 py-1 text-xs text-cream/70 animate-pulse">
        Fresh Daily Cooked
      </div>

    </div>

  </div>

</section>

    <!-- ═══════════════════════════════════════════════
         BEST SELLERS
    ═══════════════════════════════════════════════ -->
    <section class="py-20 px-4 bg-charcoal bg-thai-pattern">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-14">
          <div class="ornamental-line text-xs mb-4 justify-center">
            <span class="tracking-[0.4em] text-gold/50 text-xs">MUST TRY</span>
          </div>

          <h2 class="section-title text-3xl sm:text-4xl mb-3">
            Our Best Sellers
          </h2>

          <p class="text-cream/50 font-sans max-w-md mx-auto text-sm">
            Dishes our regulars can't stop ordering. Crowd-pleasing, full of flavour.
          </p>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div
            v-for="item in bestSellers"
            :key="item.id"
            class="group bg-charcoal-light border border-gold/10 hover:border-gold/40 transition-all duration-300 overflow-hidden"
          >

            <!-- IMAGE -->
            <div class="relative overflow-hidden aspect-[4/5]">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              <!-- gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>

              <!-- badge -->
              <div class="absolute top-3 right-3 bg-gold text-charcoal text-xs px-3 py-1 font-semibold">
                Best Seller
              </div>
            </div>

            <!-- CONTENT -->
            <div class="p-5 flex flex-col gap-2">

              <h3 class="font-sans font-semibold text-cream text-base leading-tight">
                {{ item.name }}
              </h3>

              <p class="text-cream/50 font-sans text-xs leading-relaxed">
                {{ item.desc }}
              </p>

              <div class="flex items-center justify-between mt-3">
                <span class="font-display text-gold text-lg">
                  {{ item.price }}
                </span>

                <button
                  class="text-xs border border-gold/40 text-gold px-3 py-1.5 hover:bg-gold hover:text-charcoal transition-colors"
                  @click.stop="addToCartDirect(item)"
                >
                  + Add
                </button>
              </div>

            </div>
          </div>

        </div>

        <!-- CTA -->
        <div class="text-center mt-10">
          <NuxtLink to="/menu" class="btn-outline px-10">
            View Full Menu
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         OPERATING HOURS
    ═══════════════════════════════════════════════ -->
    <section class="py-20 px-4 bg-charcoal-light">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title text-3xl sm:text-4xl mb-3">Operating Hours</h2>
          <p class="text-cream/50 font-sans text-sm">We're open every day — come visit us!</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
          <div
            v-for="row in operatingHours"
            :key="row.day"
            :class="[
              'flex justify-between items-center px-5 py-3 border',
              row.today
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-gold/20 text-cream/70',
            ]"
          >
            <span class="font-sans font-medium text-sm">
              {{ row.day }}
              <span v-if="row.today" class="ml-2 text-xs bg-gold text-charcoal px-2 py-0.5">TODAY</span>
            </span>
            <span class="font-sans text-sm">{{ row.hours }}</span>
          </div>
        </div>
        <div class="text-center mt-8">
          <div class="inline-flex items-center gap-2 text-gold/60 font-sans text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Reservations: +6019-8808724
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         MAP + DISTANCE TO LANDMARKS
    ═══════════════════════════════════════════════ -->
    <section class="py-20 px-4 bg-charcoal">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title text-3xl sm:text-4xl mb-3">Find Us</h2>
          <p class="text-cream/50 font-sans text-sm">
            No 39A, Medan Angsana, Farlim, Air Itam, Penang
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Map embed -->
          <div class="border border-gold/30 overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.183921481467!2d100.28017157567724!3d5.3889169353057875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac1002259bc15%3A0x660a2d369418163a!2sDAREIA%20COFFEE%20FARLIM%20X%20THAI%20FOOD!5e0!3m2!1sen!2smy!4v1779167574966!5m2!1sen!2smy" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <!-- Distance to landmarks -->
          <div class="space-y-4">
            <h3 class="font-sans font-semibold text-gold text-sm uppercase tracking-widest mb-5">
              Distance from Tourist Hotspots
            </h3>
            <div
              v-for="lm in landmarks"
              :key="lm.name"
              class="flex items-center gap-4 bg-charcoal-light border border-gold/15 px-5 py-4 hover:border-gold/40 transition-colors"
            >
              <div class="text-2xl flex-shrink-0">{{ lm.icon }}</div>
              <div class="flex-1 min-w-0">
                <p class="font-sans font-medium text-cream text-sm">{{ lm.name }}</p>
                <p class="text-cream/40 font-sans text-xs">{{ lm.area }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-display text-gold text-base">{{ lm.distance }}</p>
                <p class="text-cream/40 font-sans text-xs">{{ lm.time }}</p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=No+39A+Medan+Angsana+Farlim+Air+Itam+Penang"
              target="_blank"
              class="btn-primary w-full text-center flex items-center justify-center gap-2 mt-6"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SOCIAL PROOF / CTA STRIP
    ═══════════════════════════════════════════════ -->
    <section class="bg-primary py-14 px-4 text-center">
      <div class="max-w-2xl mx-auto">
        <p class="font-serif text-cream/80 text-xl italic mb-2">"Best Thai food in Penang, hands down."</p>
        <p class="text-gold/60 font-sans text-xs tracking-widest uppercase mb-8">— Our regulars</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/menu" class="btn-primary px-10">Order Now</NuxtLink>
          <a
            href="https://www.instagram.com/dareiacoffeexthaifood"
            target="_blank"
            class="btn-outline px-10"
          >Follow Us</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const { addItem, openCart } = useCart()
const router = useRouter()
  
const bestSellers = [
  {
    id: 1,
    name: 'Ayam Pad Prik',
    image: '/best-seller/ayampadrik.jpg',
    desc: 'Spicy Thai stir-fried chicken with bold chilli punch.',
    price: 'RM 9.90',
  },
  {
    id: 2,
    name: 'Chicken Chop',
    image: '/best-seller/chickenchop.jpg',
    desc: 'Juicy grilled chicken served with signature sauce & fries.',
    price: 'RM 17.90',
  },
  {
    id: 3,
    name: 'Nasi Goreng Kampung Thai',
    image: '/best-seller/nasigorengkampugthai.jpg',
    desc: 'Classic Thai village fried rice with anchovies & spice.',
    price: 'RM 9.90',
  },
  {
    id: 4,
    name: 'Siakap Tiga Rasa',
    image: '/best-seller/siakaptigarase.jpg',
    desc: 'Sea bass in sweet, sour & spicy Thai sauce.',
    price: 'RM 35.90',
  },
  {
    id: 5,
    name: 'Thai Milk Tea',
    image: '/best-seller/thaimilktea.jpg',
    desc: 'Creamy, sweet Thai tea brewed the authentic way.',
    price: 'RM 7.90',
  },
  {
    id: 6,
    name: 'Tom Yam Berkrim Seafood',
    image: '/best-seller/tomyamberkrimseafood.jpg',
    desc: 'Rich creamy Tom Yam loaded with fresh seafood.',
    price: 'RM 14.90',
  },
]

const today = new Date().getDay() // 0=Sun, 1=Mon...
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const operatingHours = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
].map((day, i) => ({
  day,
  hours: '11:00 AM – 10:00 PM',
  today: dayNames[today] === day,
}))

const landmarks = [
  { icon: '🚡', name: 'Penang Hill (Bukit Bendera)', area: 'Air Itam', distance: '1.2 km', time: '~5 min drive' },
  { icon: '🛕', name: 'Kek Lok Si Temple', area: 'Air Itam', distance: '2.0 km', time: '~8 min drive' },
  { icon: '🏖️', name: 'Batu Ferringhi Beach', area: 'Penang', distance: '12 km', time: '~20 min drive' },
  { icon: '🏙️', name: 'Georgetown Heritage Zone', area: 'Georgetown', distance: '8 km', time: '~15 min drive' },
  { icon: '🌊', name: 'Penang National Park', area: 'Teluk Bahang', distance: '18 km', time: '~30 min drive' },
]

function goToMenu() {
  router.push('/menu')
}

function addToCartDirect(item) {
  addItem({ id: item.id, name: item.name, price: item.priceNum })
  openCart()
}

const heroSlides = [
  {
    image: '/banners/1.webp',
    tag: 'Signature Dish',
    title: 'Authentic Thai Flavours',
    desc: 'Bold, spicy, and crafted fresh every day.'
  },
  {
    image: '/banners/2.webp',
    tag: 'Coffee Culture',
    title: 'Tea Time with Dareia!',
    desc: 'think tea time, think dareia'
  },
  {
    image: '/banners/1.webp',
    tag: 'Set Lunch Promo',
    title: 'Affordable Premium Meals',
    desc: 'From RM12.90 — daily satisfaction.'
  }
]
</script>
