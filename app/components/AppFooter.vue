<template>
  <footer class="bg-charcoal border-t border-gold/20 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        <!-- Brand -->
        <div>
          <div class="mb-4">
            <div class="font-display text-gold text-xl tracking-widest">DAREIA</div>
            <div class="font-sans text-cream/50 text-xs tracking-[0.3em] uppercase">Coffee × Thai Food</div>
          </div>
          <p class="font-sans text-cream/60 text-sm leading-relaxed">
            Authentic Thai cuisine meets Western comfort food & artisan coffee. A taste of Thailand in the heart of Penang.
          </p>
          <div class="flex gap-4 mt-6">
            <a
              href="https://instagram.com/dareiacoffeexthaifood"
              target="_blank"
              class="text-cream/40 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/dareiacoffeexthaifood"
              target="_blank"
              class="text-cream/40 hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com/@dareiacoffeexthaifood"
              target="_blank"
              class="text-cream/40 hover:text-gold transition-colors"
              aria-label="TikTok"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52V7.44a4.85 4.85 0 01-1-.75z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-sans font-semibold text-gold text-sm uppercase tracking-widest mb-5">Quick Links</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/" class="text-cream/60 hover:text-gold font-sans text-sm transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/menu" class="text-cream/60 hover:text-gold font-sans text-sm transition-colors">Full Menu</NuxtLink></li>
            <li><NuxtLink to="/booking" class="text-cream/60 hover:text-gold font-sans text-sm transition-colors">Make a Booking</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-cream/60 hover:text-gold font-sans text-sm transition-colors">About Us</NuxtLink></li>
            <li>
              <a href="https://wa.me/60198808724" target="_blank" class="text-cream/60 hover:text-gold font-sans text-sm transition-colors">
                Order via WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-sans font-semibold text-gold text-sm uppercase tracking-widest mb-5">Visit Us</h3>
          <ul class="space-y-4">
            <li class="flex gap-3">
              <svg class="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-cream/60 font-sans text-sm">No 39A, Medan Angsana,<br>Farlim, Air Itam, Penang</span>
            </li>
            <li class="flex gap-3">
              <svg class="w-4 h-4 text-gold mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              <a href="https://wa.me/60198808724" class="text-cream/60 hover:text-gold font-sans text-sm transition-colors">+6019-8808724</a>
            </li>
            <li class="flex gap-3">
              <svg class="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-cream/60 font-sans text-sm">Mon–Sun<br>11:00 AM – 10:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="gold-divider mb-8" />

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-cream/30 font-sans text-xs">
          © {{ new Date().getFullYear() }} Dareia Coffee x Thai Food. All rights reserved.
        </p>
        <p class="text-cream/30 font-sans text-xs">
          @dareiacoffeexthaifood
        </p>
      </div>
    </div>
  </footer>
</template>
