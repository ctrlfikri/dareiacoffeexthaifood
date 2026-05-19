<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="backdrop">
      <div
        v-if="isCartOpen"
        class="fixed inset-0 bg-black/70 z-[60]"
        @click="closeCart"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer">
      <aside
        v-if="isCartOpen"
        class="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-charcoal-light z-[70] flex flex-col"
        style="border-left: 1px solid rgba(201,168,76,0.3)"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gold/20">
          <div>
            <h2 class="font-display text-gold text-lg">Your Order</h2>
            <p class="text-cream/50 text-xs font-sans mt-0.5">{{ itemCount }} item{{ itemCount !== 1 ? 's' : '' }}</p>
          </div>
          <button class="text-cream/50 hover:text-gold transition-colors" @click="closeCart">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center h-full text-center">
            <div class="text-5xl mb-4">🍜</div>
            <p class="text-cream/50 font-sans">Your cart is empty</p>
            <p class="text-cream/30 text-sm mt-1">Add some delicious items!</p>
            <button class="btn-outline mt-6 text-xs" @click="closeCart">Browse Menu</button>
          </div>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center gap-3 py-3 border-b border-gold/10"
          >
            <div class="flex-1 min-w-0">
              <p class="text-cream font-sans font-medium text-sm leading-tight truncate">{{ item.name }}</p>
              <p class="text-gold text-sm mt-0.5">RM{{ item.price.toFixed(2) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="w-7 h-7 flex items-center justify-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors text-lg leading-none"
                @click="updateQty(item.id, item.qty - 1)"
              >−</button>
              <span class="text-cream text-sm w-5 text-center">{{ item.qty }}</span>
              <button
                class="w-7 h-7 flex items-center justify-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors text-lg leading-none"
                @click="updateQty(item.id, item.qty + 1)"
              >+</button>
              <button
                class="w-7 h-7 flex items-center justify-center text-cream/30 hover:text-red-400 transition-colors ml-1"
                @click="removeItem(item.id)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartItems.length > 0" class="px-6 py-4 border-t border-gold/20 space-y-4">
          <!-- Note field -->
          <textarea
            v-model="note"
            class="thai-input text-sm resize-none h-20"
            placeholder="Special requests? Allergies? (optional)"
          />

          <!-- Total -->
          <div class="flex justify-between items-center">
            <span class="text-cream/70 font-sans text-sm uppercase tracking-wider">Total</span>
            <span class="font-display text-gold text-xl">RM{{ cartTotal.toFixed(2) }}</span>
          </div>

          <!-- Checkout -->
          <button
            class="w-full btn-primary flex items-center justify-center gap-2 py-4"
            @click="handleCheckout"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 17.396c-.256.713-.962 1.302-1.671 1.543-.574.196-1.304.283-2.019.172-1.058-.163-2.123-.713-2.832-1.172-1.79-1.149-3.287-2.807-4.217-4.736-.466-.967-.772-2.02-.759-3.088.016-1.361.614-2.613 1.599-3.484.35-.31.724-.488 1.104-.488h.162c.358.008.713.178.966.502.287.365.951 2.268 1.003 2.425.052.157.052.332-.025.468-.073.131-.11.215-.221.334l-.338.394c-.113.131-.234.271-.102.534.412.81 1.028 1.562 1.753 2.174.753.636 1.548 1.043 2.42 1.225.195.04.362-.016.494-.152l.334-.375c.141-.157.305-.225.472-.183.167.043 1.95.924 2.259 1.084.167.088.277.145.32.23.042.087.042.504-.213 1.157z"/>
            </svg>
            Order via WhatsApp
          </button>

          <button
            class="w-full text-cream/40 text-xs font-sans hover:text-red-400 transition-colors"
            @click="clearCart"
          >Clear all items</button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
const { cartItems, isCartOpen, itemCount, cartTotal, removeItem, updateQty, clearCart, closeCart, checkoutViaWhatsApp } = useCart()

const note = ref('')

function handleCheckout() {
  checkoutViaWhatsApp(note.value)
}
</script>

<style scoped>
.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.3s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

.drawer-enter-active, .drawer-leave-active { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }
</style>
