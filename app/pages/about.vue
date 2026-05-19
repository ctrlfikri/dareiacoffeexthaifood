<template>
  <main class="pt-20 min-h-screen bg-charcoal">
    <!-- Page Hero -->
    <div class="page-hero pb-16">
      <div class="ornamental-line text-xs mb-4 justify-center max-w-xs mx-auto">
        <span class="tracking-widest text-gold/50 text-xs">OUR STORY</span>
      </div>
      <h1 class="section-title text-3xl sm:text-5xl mb-3">About Us</h1>
      <p class="text-cream/50 font-sans text-sm max-w-md mx-auto">
        Where Thai passion meets Penang warmth — every dish tells a story.
      </p>
    </div>

    <!-- ── Story Section ─────────────────────────────── -->
    <section class="py-20 px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Visual side -->
        <div class="relative">
          <div
            class="w-full h-80 sm:h-96 flex items-center justify-center border border-gold/30"
            style="background: linear-gradient(135deg, #550000 0%, #2D1F0E 60%, #3D2200 100%)"
          >
            <div class="text-center">
              <div class="text-8xl mb-4"><img src="store.jpg"></div>
              <div class="font-display text-gold text-2xl tracking-widest">DAREIA</div>
              <div class="font-sans text-cream/50 text-xs tracking-[0.4em] mt-1">COFFEE × THAI FOOD</div>
            </div>
          </div>
          <!-- Floating badge -->
          <div
            class="absolute -bottom-5 -right-5 bg-primary border border-gold/40 px-5 py-4 text-center shadow-xl"
          >
            <div class="font-display text-gold text-3xl">100%</div>
            <div class="font-sans text-cream/70 text-xs tracking-widest uppercase">Authentic Thai</div>
          </div>
        </div>

        <!-- Text side -->
        <div>
          <h2 class="section-title text-2xl sm:text-3xl mb-6">Our Story</h2>
          <div class="space-y-4 font-sans text-cream/70 leading-relaxed text-sm">
            <p>
              Dareia Coffee x Thai Food was born from a simple belief: that great food brings people together.
              Nestled in the heart of Farlim, Air Itam, Penang, we set out to create a space where neighbours
              become regulars, and strangers leave as friends.
            </p>
            <p>
              Our menu is a love letter to Thailand — from the fragrant, spicy Tom Yams that warm the soul,
              to the bold Pad Prik dishes that ignite the senses. Alongside our Thai roots, we serve Western
              comfort food with a local soul, and artisan coffees brewed with care.
            </p>
            <p>
              Every dish that leaves our kitchen carries the same promise: honest flavours, fresh ingredients,
              and the warmth of genuine hospitality. That's the Dareia way.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Values ─────────────────────────────────────── -->
    <section class="py-16 px-4 bg-charcoal-light">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title text-2xl sm:text-3xl mb-3">What We Stand For</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="val in values"
            :key="val.title"
            class="border border-gold/20 p-7 text-center hover:border-gold/50 transition-colors"
          >
            <div class="text-4xl mb-4">{{ val.icon }}</div>
            <h3 class="font-display text-gold text-lg mb-3 tracking-wider">{{ val.title }}</h3>
            <p class="font-sans text-cream/60 text-sm leading-relaxed">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── What We Serve ─────────────────────────────── -->
    <section class="py-16 px-4 bg-charcoal">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title text-2xl sm:text-3xl mb-3">What We Serve</h2>
          <p class="text-cream/50 font-sans text-sm">A little bit of everything, done with a lot of heart.</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="cat in foodCategories"
            :key="cat.name"
            class="flex flex-col items-center text-center p-5 border border-gold/15 hover:border-gold/40 transition-colors"
          >
            <span class="text-4xl mb-3">{{ cat.icon }}</span>
            <p class="font-sans font-semibold text-cream text-sm">{{ cat.name }}</p>
            <p class="font-sans text-cream/40 text-xs mt-1">{{ cat.examples }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Location ──────────────────────────────────── -->
    <section class="py-16 px-4 bg-charcoal-light">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="section-title text-2xl sm:text-3xl mb-8">Come Find Us</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="border border-gold/20 p-6">
            <div class="text-3xl mb-3">📍</div>
            <p class="font-sans font-semibold text-cream text-sm mb-1">Address</p>
            <p class="font-sans text-cream/60 text-xs leading-relaxed">
              No 39A, Medan Angsana,<br>Farlim, Air Itam,<br>Penang
            </p>
          </div>
          <div class="border border-gold/20 p-6">
            <div class="text-3xl mb-3">🕐</div>
            <p class="font-sans font-semibold text-cream text-sm mb-1">Hours</p>
            <p class="font-sans text-cream/60 text-xs leading-relaxed">
              Monday – Sunday<br>11:00 AM – 10:00 PM<br>Open Daily
            </p>
          </div>
          <div class="border border-gold/20 p-6">
            <div class="text-3xl mb-3">📞</div>
            <p class="font-sans font-semibold text-cream text-sm mb-1">Contact</p>
            <p class="font-sans text-cream/60 text-xs leading-relaxed">
              <a href="https://wa.me/60198808724" class="hover:text-gold transition-colors">
                +6019-8808724
              </a><br>
              @dareiacoffeexthaifood
            </p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <NuxtLink to="/menu" class="btn-primary px-10">See Our Menu</NuxtLink>
          <NuxtLink to="/booking" class="btn-outline px-10">Make a Booking</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── Social Follow ─────────────────────────────── -->
    <section class="py-14 px-4 bg-primary text-center">
      <h2 class="section-title text-xl sm:text-2xl mb-3">Follow Our Journey</h2>
      <p class="text-cream/60 font-sans text-sm mb-6">
        Behind-the-scenes, new dishes, promos & more — follow us on social.
      </p>
      <div class="flex justify-center gap-6">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="flex flex-col items-center gap-2 text-cream/60 hover:text-gold transition-colors"
        >
          <span class="text-2xl">{{ social.icon }}</span>
          <span class="font-sans text-xs">{{ social.name }}</span>
        </a>
      </div>
      <p class="text-cream/30 font-sans text-xs mt-6 tracking-widest">@dareiacoffeexthaifood</p>
    </section>
  </main>
</template>

<script setup>
const values = [
  {
    icon: '🌿',
    title: 'Fresh Ingredients',
    desc: 'We source fresh, quality ingredients daily. No shortcuts — only the real deal on every plate.',
  },
  {
    icon: '🤝',
    title: 'Genuine Warmth',
    desc: "You're not just a customer here. You're family. We treat every guest with the same love we put into our food" ,
  },
  {
    icon: '🌶️',
    title: 'Authentic Flavours',
    desc: 'Our recipes stay true to Thai roots. Bold, fragrant, and unapologetically flavourful.',
  },
]

const foodCategories = [
  { icon: '🌶️', name: 'Thai Food', examples: 'Tom Yam, Pad Prik, Tiga Rasa' },
  { icon: '🍗', name: 'Western', examples: 'Chicken chop, pasta, fish & chips' },
  { icon: '☕', name: 'Coffee', examples: 'Latte, Spanish latte, matcha' },
  { icon: '🧋', name: 'Tea & Drinks', examples: 'Cha Yen, Teh Susu, lime drinks' },
  { icon: '🥞', name: 'Tea Time', examples: 'Cucur udang, roti bakar & more' },
]

const socials = [
  { name: 'Instagram', icon: '📸', url: 'https://instagram.com/dareiacoffeexthaifood' },
  { name: 'Facebook',  icon: '📘', url: 'https://facebook.com/dareiacoffeexthaifood' },
  { name: 'TikTok',    icon: '🎵', url: 'https://tiktok.com/@dareiacoffeexthaifood' },
]
</script>
