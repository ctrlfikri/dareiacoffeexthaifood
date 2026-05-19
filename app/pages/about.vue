<template>
  <main class="pt-20 min-h-screen bg-charcoal">

    <!-- ───────── HERO ───────── -->
    <section class="text-center px-4 pb-16">
      <div class="ornamental-line text-xs mb-4 justify-center max-w-xs mx-auto">
        <span class="tracking-[0.4em] text-gold/50 text-xs uppercase">Our Story</span>
      </div>

      <h1 class="font-display text-4xl sm:text-6xl text-cream tracking-wider">
        About Dareia
      </h1>

      <p class="text-cream/50 font-sans text-sm max-w-lg mx-auto mt-4 leading-relaxed">
        Where Thai passion meets Penang warmth — every dish tells a story.
      </p>
    </section>

    <!-- ───────── STORY ───────── -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <!-- Visual -->
        <div class="relative">

          <div class="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-primary-dark via-charcoal to-charcoal flex items-center justify-center">

            <img
              src="/store.jpg"
              class="w-full h-full object-cover"
              alt="Dareia Store"
            />

          </div>

          <!-- Badge -->
          <div class="absolute -bottom-6 -right-6 bg-primary border border-gold/40 px-6 py-5 text-center shadow-xl">
            <div class="font-display text-gold text-3xl">100%</div>
            <div class="text-cream/60 text-xs tracking-widest uppercase">Authentic Thai</div>
          </div>

        </div>

        <!-- Text -->
        <div>
          <h2 class="font-display text-2xl sm:text-3xl text-gold mb-6">
            Our Story
          </h2>

          <div class="space-y-4 text-cream/70 text-sm leading-relaxed font-sans">
            <p>
              Dareia Coffee x Thai Food was born from a simple belief: great food creates connection.
              Located in Farlim, Air Itam, we built a space where comfort meets culture.
            </p>

            <p>
              From bold Thai curries to comforting Western dishes and artisan coffee,
              every plate is crafted with intention, freshness, and heart.
            </p>

            <p>
              This isn’t just a restaurant — it’s a place where flavours, people, and stories come together.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ───────── VALUES ───────── -->
    <section class="py-16 px-4 bg-charcoal-light">
      <div class="max-w-5xl mx-auto text-center mb-10">
        <h2 class="font-display text-2xl sm:text-3xl text-cream">
          What We Stand For
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div
          v-for="val in values"
          :key="val.title"
          class="p-6 border border-gold/20 bg-charcoal hover:border-gold/50 transition-all rounded-lg"
        >
          <div class="text-3xl mb-3">{{ val.icon }}</div>
          <h3 class="font-display text-gold text-lg mb-2">
            {{ val.title }}
          </h3>
          <p class="text-cream/60 text-sm leading-relaxed">
            {{ val.desc }}
          </p>
        </div>

      </div>
    </section>

    <!-- ───────── FOOD GRID ───────── -->
    <section class="py-16 px-4">
      <div class="max-w-5xl mx-auto text-center mb-10">
        <h2 class="font-display text-2xl sm:text-3xl text-cream">
          What We Serve
        </h2>
        <p class="text-cream/50 text-sm mt-2">
          Thai • Western • Coffee • Comfort Food
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">

        <div
          v-for="cat in foodCategories"
          :key="cat.name"
          class="p-5 border border-gold/15 hover:border-gold/40 transition rounded-lg text-center bg-charcoal"
        >
          <div class="text-3xl mb-3">{{ cat.icon }}</div>
          <p class="text-cream font-semibold text-sm">{{ cat.name }}</p>
          <p class="text-cream/40 text-xs mt-1">{{ cat.examples }}</p>
        </div>

      </div>
    </section>

    <!-- ───────── LOCATION ───────── -->
    <section class="py-16 px-4 bg-charcoal-light">
      <div class="max-w-4xl mx-auto text-center">

        <h2 class="font-display text-2xl sm:text-3xl text-cream mb-10">
          Come Find Us
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div class="border border-gold/20 p-6 rounded-lg bg-charcoal">
            <div class="text-2xl mb-2">📍</div>
            <p class="text-cream font-semibold text-sm">Location</p>
            <p class="text-cream/60 text-xs mt-2">
              Farlim, Air Itam, Penang
            </p>
          </div>

          <div class="border border-gold/20 p-6 rounded-lg bg-charcoal">
            <div class="text-2xl mb-2">🕐</div>
            <p class="text-cream font-semibold text-sm">Hours</p>
            <p class="text-cream/60 text-xs mt-2">
              11:00 AM – 10:00 PM<br>Daily
            </p>
          </div>

          <div class="border border-gold/20 p-6 rounded-lg bg-charcoal">
            <div class="text-2xl mb-2">📞</div>
            <p class="text-cream font-semibold text-sm">Contact</p>
            <p class="text-cream/60 text-xs mt-2">
              WhatsApp / Socials
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- ───────── SOCIAL ───────── -->
    <section class="py-14 px-4 bg-primary text-center">

      <h2 class="font-display text-2xl text-cream mb-3">
        Follow Our Journey
      </h2>

      <p class="text-cream/60 text-sm mb-6">
        Behind the scenes, new dishes & daily life at Dareia
      </p>

      <div class="flex justify-center gap-8">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="text-cream/60 hover:text-gold transition flex flex-col items-center gap-2"
        >
          <span class="text-2xl">{{ social.icon }}</span>
          <span class="text-xs">{{ social.name }}</span>
        </a>
      </div>

      <p class="text-cream/30 text-xs mt-6 tracking-widest">
        @dareiacoffeexthaifood
      </p>

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
