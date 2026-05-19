<template>
  <main class="pt-20 min-h-screen bg-charcoal">
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="ornamental-line text-xs mb-4 justify-center max-w-xs mx-auto">
        <span class="tracking-[0.4em] text-gold/50 text-xs">RESERVATIONS</span>
      </div>
      <h1 class="section-title text-3xl sm:text-5xl mb-3">Book With Us</h1>
      <p class="text-cream/50 font-sans text-sm max-w-sm mx-auto">
        Events, dine-ins, catering & delivery — we've got you covered.
      </p>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      <!-- ── Booking Type Selector ─────────────────────── -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        <button
          v-for="type in bookingTypes"
          :key="type.key"
          :class="[
            'flex flex-col items-center gap-2 px-3 py-5 border transition-all duration-200 text-center',
            activeType === type.key
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-gold/20 text-cream/60 hover:border-gold/50 hover:text-cream',
          ]"
          @click="setType(type.key)"
        >
          <span class="text-3xl">{{ type.icon }}</span>
          <span class="font-sans text-xs font-semibold uppercase tracking-widest leading-tight">{{ type.label }}</span>
          <span class="font-sans text-xs text-current opacity-60 leading-tight">{{ type.sub }}</span>
        </button>
      </div>

      <!-- ── Form Card ─────────────────────────────────── -->
      <div class="bg-charcoal-light border border-gold/20 p-6 sm:p-10">
        <h2 class="section-title text-xl sm:text-2xl mb-1">
          {{ currentType.icon }} {{ currentType.label }}
        </h2>
        <p class="text-cream/50 font-sans text-sm mb-8">{{ currentType.desc }}</p>

        <div class="gold-divider mb-8" />

        <!-- ══ MAJOR EVENTS FORM ══ -->
        <form v-if="activeType === 'event'" class="space-y-5" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Your Name *</label>
              <input v-model="form.name" type="text" class="thai-input" placeholder="Full name" required />
            </div>
            <div>
              <label class="form-label">Phone / WhatsApp *</label>
              <input v-model="form.phone" type="tel" class="thai-input" placeholder="+60 1X-XXXXXXX" required />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Event Type *</label>
              <select v-model="form.eventType" class="thai-select" required>
                <option value="">Select event type</option>
                <option>Birthday Party</option>
                <option>Engagement / Wedding Anniversary</option>
                <option>Corporate Meeting</option>
                <option>Team Gathering</option>
                <option>Baby Shower</option>
                <option>Farewell Party</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label class="form-label">Number of Guests *</label>
              <input v-model="form.guests" type="number" class="thai-input" placeholder="e.g. 20" min="1" required />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Event Date *</label>
              <input v-model="form.date" type="date" class="thai-input" required />
            </div>
            <div>
              <label class="form-label">Preferred Time *</label>
              <input v-model="form.time" type="time" class="thai-input" required />
            </div>
          </div>
          <div>
            <label class="form-label">Special Requests / Theme</label>
            <textarea v-model="form.notes" class="thai-input resize-none h-28" placeholder="Cake, decorations, menu preferences, dietary needs…" />
          </div>
          <SubmitButton @click="submitForm" />
        </form>

        <!-- ══ CASUAL DINE-IN FORM ══ -->
        <form v-else-if="activeType === 'dinein'" class="space-y-5" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Your Name *</label>
              <input v-model="form.name" type="text" class="thai-input" placeholder="Full name" required />
            </div>
            <div>
              <label class="form-label">Phone / WhatsApp *</label>
              <input v-model="form.phone" type="tel" class="thai-input" placeholder="+60 1X-XXXXXXX" required />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Number of Pax *</label>
              <select v-model="form.guests" class="thai-select" required>
                <option value="">Select pax</option>
                <option>1–2 pax</option>
                <option>3–5 pax</option>
                <option>6–10 pax</option>
                <option>11–20 pax</option>
                <option>20+ pax</option>
              </select>
            </div>
            <div>
              <label class="form-label">Date *</label>
              <input v-model="form.date" type="date" class="thai-input" required />
            </div>
          </div>
          <div>
            <label class="form-label">Preferred Time *</label>
            <input v-model="form.time" type="time" class="thai-input" required />
          </div>
          <div>
            <label class="form-label">Pre-order any dishes? (optional)</label>
            <textarea v-model="form.notes" class="thai-input resize-none h-24" placeholder="e.g. Ikan Siakap Tiga Rasa x1, Tom Yam Seafood x2…" />
          </div>
          <SubmitButton @click="submitForm" />
        </form>

        <!-- ══ CATERING FORM ══ -->
        <form v-else-if="activeType === 'catering'" class="space-y-5" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Your Name *</label>
              <input v-model="form.name" type="text" class="thai-input" placeholder="Full name" required />
            </div>
            <div>
              <label class="form-label">Phone / WhatsApp *</label>
              <input v-model="form.phone" type="tel" class="thai-input" placeholder="+60 1X-XXXXXXX" required />
            </div>
          </div>
          <div>
            <label class="form-label">Event / Occasion *</label>
            <input v-model="form.eventType" type="text" class="thai-input" placeholder="e.g. Corporate lunch, family gathering, wedding…" required />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Number of Pax *</label>
              <input v-model="form.guests" type="number" class="thai-input" placeholder="e.g. 50" min="10" required />
            </div>
            <div>
              <label class="form-label">Date Required *</label>
              <input v-model="form.date" type="date" class="thai-input" required />
            </div>
          </div>
          <div>
            <label class="form-label">Delivery / Venue Address *</label>
            <input v-model="form.address" type="text" class="thai-input" placeholder="Full address for catering delivery" required />
          </div>
          <div>
            <label class="form-label">Menu Preferences</label>
            <textarea v-model="form.notes" class="thai-input resize-none h-28" placeholder="Any specific dishes, dietary requirements, budget per head…" />
          </div>
          <SubmitButton @click="submitForm" />
        </form>

        <!-- ══ IN-HOUSE DELIVERY FORM ══ -->
        <form v-else-if="activeType === 'delivery'" class="space-y-5" @submit.prevent="submitForm">
          <div class="bg-gold/10 border border-gold/30 p-4 text-sm text-gold/80 font-sans mb-2">
            🛵 In-house delivery available within Penang Island. Contact us to confirm coverage area & delivery time.
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="form-label">Your Name *</label>
              <input v-model="form.name" type="text" class="thai-input" placeholder="Full name" required />
            </div>
            <div>
              <label class="form-label">Phone / WhatsApp *</label>
              <input v-model="form.phone" type="tel" class="thai-input" placeholder="+60 1X-XXXXXXX" required />
            </div>
          </div>
          <div>
            <label class="form-label">Delivery Address *</label>
            <textarea v-model="form.address" class="thai-input resize-none h-20" placeholder="Full address including unit no., building, area…" required />
          </div>
          <div>
            <label class="form-label">Requested Delivery Time</label>
            <input v-model="form.time" type="time" class="thai-input" />
          </div>
          <div>
            <label class="form-label">Your Order *</label>
            <textarea v-model="form.notes" class="thai-input resize-none h-32" placeholder="List your items, e.g.:&#10;- Nasi Goreng Kampung Thai x2&#10;- Tom Yam Berkrim Seafood x1&#10;- Thai Milk Tea (Cold) x2" required />
          </div>
          <SubmitButton @click="submitForm" />
        </form>
      </div>

      <!-- ── Contact Alt ────────────────────────────── -->
      <div class="mt-8 text-center">
        <p class="text-cream/40 font-sans text-sm mb-3">Prefer to reach us directly?</p>
        <a
          :href="`https://wa.me/60198808724`"
          target="_blank"
          class="inline-flex items-center gap-2 text-gold font-sans text-sm hover:text-gold-light transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
          Chat on WhatsApp — +6019-8808724
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
// ── Inline SubmitButton to keep it in one file ──
const SubmitButton = {
  emits: ['click'],
  template: `
    <button
      type="button"
      class="w-full btn-primary py-4 flex items-center justify-center gap-3 text-sm"
      @click="$emit('click')"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      </svg>
      Send Booking Request via WhatsApp
    </button>
  `,
}

const WHATSAPP_NUMBER = '60198808724'

const bookingTypes = [
  {
    key: 'event',
    icon: '🎉',
    label: 'Major Events',
    sub: 'Birthday, meetings…',
    desc: 'Planning a birthday party, corporate event, or special celebration? Let us make it unforgettable.',
  },
  {
    key: 'dinein',
    icon: '🍽️',
    label: 'Dine In',
    sub: 'Table reservation',
    desc: 'Reserve your table for a casual meal. Walk-ins welcome, but bookings get priority seating.',
  },
  {
    key: 'catering',
    icon: '🍱',
    label: 'Catering',
    sub: 'Events & functions',
    desc: 'We bring the Thai experience to your venue. Minimum 10 pax. Contact us for a custom quote.',
  },
  {
    key: 'delivery',
    icon: '🛵',
    label: 'Delivery',
    sub: 'In-house delivery',
    desc: 'Order from the comfort of your home. In-house delivery within Penang Island.',
  },
]

const activeType = ref('event')
const currentType = computed(() => bookingTypes.find((t) => t.key === activeType.value))

const defaultForm = () => ({
  name: '',
  phone: '',
  eventType: '',
  guests: '',
  date: '',
  time: '',
  address: '',
  notes: '',
})

const form = ref(defaultForm())

function setType(key) {
  activeType.value = key
  form.value = defaultForm()
}

function submitForm() {
  const t = currentType.value
  let msg = `🌶️ *Booking Request — Dareia Coffee x Thai Food*\n`
  msg += `📋 *Type:* ${t.label}\n\n`
  msg += `👤 *Name:* ${form.value.name}\n`
  msg += `📞 *Phone:* ${form.value.phone}\n`

  if (form.value.eventType) msg += `🎊 *Event:* ${form.value.eventType}\n`
  if (form.value.guests)    msg += `👥 *Guests:* ${form.value.guests}\n`
  if (form.value.date)      msg += `📅 *Date:* ${form.value.date}\n`
  if (form.value.time)      msg += `🕐 *Time:* ${form.value.time}\n`
  if (form.value.address)   msg += `📍 *Address:* ${form.value.address}\n`
  if (form.value.notes)     msg += `\n📝 *Notes:*\n${form.value.notes}\n`

  msg += `\n_Sent from dareiacoffeexthaifood.com_`

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
}
</script>

<style>
.form-label {
  display: block;
  font-family: 'Sarabun', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(253, 246, 236, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}
</style>
