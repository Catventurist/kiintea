<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue?: number
  max?: number
  min?: number
  size?: number
  thickness?: number
  interactive?: boolean
  step?: number
  showValue?: boolean
}>(), { min: 0, max: 100, size: 64, thickness: 6, step: 1, showValue: true })

const emit = defineEmits(['update:modelValue'])

const el = ref<HTMLElement>()
const r = computed(() => (props.size - props.thickness) / 2)
const circumference = computed(() => 2 * Math.PI * r.value)
const percent = computed(() =>
  props.modelValue != null ? Math.round(((props.modelValue - props.min) / (props.max - props.min)) * 100) : 0
)

function angleToValue(angle: number) {
  const deg = (angle * 180 / Math.PI + 90 + 360) % 360
  const raw = (deg / 360) * (props.max - props.min) + props.min
  return Math.min(props.max, Math.max(props.min, Math.round(raw / props.step) * props.step))
}

function onPointerDown(e: PointerEvent) {
  if (!props.interactive || !el.value) return
  e.preventDefault()

  const move = (ev: PointerEvent) => {
    const rect = el.value!.getBoundingClientRect()
    const dx = ev.clientX - (rect.left + rect.width / 2)
    const dy = ev.clientY - (rect.top + rect.height / 2)
    emit('update:modelValue', angleToValue(Math.atan2(dy, dx)))
  }
  const up = () => {
    stopMove()
    stopUp()
  }

  const stopMove = useEventListener(window, 'pointermove', move, { passive: true })
  const stopUp = useEventListener(window, 'pointerup', up, { once: true })
}

function onKeydown(e: KeyboardEvent) {
  if (!props.interactive) return
  const delta = e.key === 'ArrowUp' || e.key === 'ArrowRight'
    ? props.step
    : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -props.step : 0
  if (!delta) return
  e.preventDefault()
  const next = Math.min(props.max, Math.max(props.min, (props.modelValue ?? 0) + delta))
  emit('update:modelValue', next)
}

const knobPosition = computed(() => {
  const pct = (props.modelValue ?? 0) / props.max
  const angle = pct * 2 * Math.PI - Math.PI / 2
  const x = props.size / 2 + r.value * Math.cos(angle)
  const y = props.size / 2 + r.value * Math.sin(angle)
  return { left: `${x - 6}px`, top: `${y - 6}px` }
})
</script>

<template>
  <div
    ref="el"
    role="slider"
    :aria-valuenow="modelValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :tabindex="interactive ? 0 : -1"
    :style="{ width: size + 'px', height: size + 'px' }"
    class="relative cursor-pointer outline-none focus-visible:ring-2"
    @pointerdown="onPointerDown"
    @keydown="onKeydown"
  >
    <svg
      :width="size"
      :height="size"
      class="-rotate-90"
    >
      <slot name="track">
        <circle
          :cx="size/2"
          :cy="size/2"
          :r="r"
          fill="none"
          :stroke-width="thickness"
          class="stroke-(--ui-bg-muted)"
        />
      </slot>
      <slot
        name="indicator"
        :value="modelValue"
        :percent="percent"
        :circumference="circumference"
      >
        <circle
          :cx="size/2"
          :cy="size/2"
          :r="r"
          fill="none"
          :stroke-width="thickness"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference * (1 - (modelValue ?? 0) / max)"
          class="stroke-primary transition-[stroke-dashoffset] duration-100"
        />
      </slot>
    </svg>

    <slot
      v-if="interactive"
      name="knob"
      :position="knobPosition"
    >
      <div
        class="absolute size-3 rounded-full bg-primary/80"
        :style="knobPosition"
      />
    </slot>

    <slot
      :value="modelValue"
      :percent="percent"
    >
      <span
        v-if="showValue"
        class="absolute inset-0 flex items-center justify-center text-sm font-medium"
      >
        {{ percent }}%
      </span>
    </slot>
  </div>
</template>
