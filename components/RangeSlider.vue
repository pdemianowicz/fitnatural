<template>
  <div>
    <div class="flex">
      <label :for="id" class="flex-auto">{{ label }}</label>
      <input
        type="number"
        :id="id"
        v-model="value"
        :min="min"
        :max="max"
        class="font-bold text-gray-700 dark:text-neutral-200 border border-gray-300 dark:border-neutral-700 rounded-lg w-14 bg-transparent text-right" />
      <span class="font-medium text-gray-700 dark:text-neutral-200 ml-1">{{ unit }}</span>
    </div>
    <input
      type="range"
      :id="id + 'Range'"
      :aria-label="id + ' range'"
      v-model.number="value"
      @input="updateValue"
      :min="min"
      :max="max"
      :style="`--value: ${((value - min) / (max - min)) * 100};`"
      class="w-full my-4 range-slider" />
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

watch(value, (newValue) => {
  emit("update:modelValue", newValue);
});

function updateValue() {
  value.value = Math.min(Math.max(value.value, props.min), props.max);
}
</script>

<style scoped>
.range-slider {
  appearance: none;
  @apply bg-neutral-300 dark:bg-neutral-700;
  border-radius: 999px;
  outline: none;
}

.range-slider::-webkit-slider-runnable-track {
  height: 13px;
  border-radius: 999px;
}

.range-slider::-moz-range-track {
  height: 13px;
  border-radius: 999px;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  margin-top: -6px;
  border: solid;
  border-radius: 50%;
  cursor: pointer;
  @apply bg-neutral-50 dark:bg-neutral-500 border-4 border-neutral-600 dark:border-neutral-600;
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  margin-top: -6px;
  border: solid;
  border-radius: 50%;
  cursor: pointer;
  @apply bg-neutral-50 dark:bg-neutral-500 border-4 border-neutral-600 dark:border-neutral-600;
}
</style>
