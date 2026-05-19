// composables/useCart.js
// Global cart state — shared across all pages

const WHATSAPP_NUMBER = '60198808724'

const cartItems = ref([])
const isCartOpen = ref(false)

export const useCart = () => {
  const itemCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.qty, 0)
  )

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  function addItem(product) {
    const existing = cartItems.value.find((i) => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      cartItems.value.push({ ...product, qty: 1 })
    }
  }

  function removeItem(id) {
    cartItems.value = cartItems.value.filter((i) => i.id !== id)
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeItem(id)
    const item = cartItems.value.find((i) => i.id === id)
    if (item) item.qty = qty
  }

  function clearCart() {
    cartItems.value = []
  }

  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  function checkoutViaWhatsApp(customerNote = '') {
    if (cartItems.value.length === 0) return

    const lines = cartItems.value
      .map((i) => `✅ ${i.name} x${i.qty} — RM${(i.price * i.qty).toFixed(2)}`)
      .join('\n')

    const total = cartTotal.value.toFixed(2)

    const note = customerNote ? `\n\n📝 Note: ${customerNote}` : ''

    const message = encodeURIComponent(
      `🌶️ *Order — Dareia Coffee x Thai Food*\n\n${lines}\n\n💰 *Total: RM${total}*${note}\n\n📍 Please confirm: Dine In / Takeaway / Delivery?`
    )

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return {
    cartItems,
    isCartOpen,
    itemCount,
    cartTotal,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    openCart,
    closeCart,
    checkoutViaWhatsApp,
    WHATSAPP_NUMBER,
  }
}
