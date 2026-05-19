<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex flex-col leading-none">
          <span class="font-display text-gold text-sm md:text-base tracking-widest">DAREIA</span>
          <span class="font-sans text-cream/60 text-xs tracking-[0.3em] uppercase">Coffee × Thai Food</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="nav-link" active-class="active">Home</NuxtLink>
          <NuxtLink to="/menu" class="nav-link" active-class="active">Menu</NuxtLink>
          <NuxtLink to="/booking" class="nav-link" active-class="active">Booking</NuxtLink>
          <NuxtLink to="/about" class="nav-link" active-class="active">About</NuxtLink>
        </nav>

        <!-- Right: Cart + Order CTA -->
        <div class="flex items-center gap-4">
          <!-- Cart Button -->
          <button
            class="relative p-2 text-cream/70 hover:text-gold transition-colors"
            aria-label="Open cart"
            @click="openCart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span v-if="itemCount > 0" class="cart-dot">{{ itemCount }}</span>
          </button>

          <!-- Order CTA -->
          <a
            :href="`https://wa.me/${WHATSAPP_NUMBER}`"
            target="_blank"
            class="hidden sm:inline-flex btn-primary text-xs py-2 px-4"
          >
            Order Now
          </a>

          <!-- Mobile menu toggle -->
          <button
            class="md:hidden p-2 text-cream/70 hover:text-gold"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <Transition name="mobile-nav">
        <nav
          v-if="mobileOpen"
          class="md:hidden py-4 border-t border-gold/20 flex flex-col gap-3"
        >
          <NuxtLink to="/" class="nav-link py-1" @click="mobileOpen = false">Home</NuxtLink>
          <NuxtLink to="/menu" class="nav-link py-1" @click="mobileOpen = false">Menu</NuxtLink>
          <NuxtLink to="/booking" class="nav-link py-1" @click="mobileOpen = false">Booking</NuxtLink>
          <NuxtLink to="/about" class="nav-link py-1" @click="mobileOpen = false">About</NuxtLink>
          <a
            :href="`https://wa.me/${WHATSAPP_NUMBER}`"
            target="_blank"
            class="btn-primary text-center mt-2"
            @click="mobileOpen = false"
          >Order via WhatsApp</a>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup>
const { itemCount, openCart, WHATSAPP_NUMBER } = useCart()

const scrolled = ref(false)
const mobileOpen = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
.mobile-nav-enter-active, .mobile-nav-leave-active {
  transition: all 0.3s ease;
}
.mobile-nav-enter-from, .mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
