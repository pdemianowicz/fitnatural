<template>
  <div class="flex h-12 w-full bg-[#D9D9D9] dark:bg-neutral-800 rounded-lg font-bold">
    <button
      v-for="(value, index) in values"
      :key="index"
      @click="selectValue(value.value)"
      :class="
        selectedValue === value.value
          ? 'bg-white dark:bg-neutral-900 text-black dark:text-neutral-300 shadow'
          : 'bg-transparent text-[#515151] dark:text-neutral-400'
      "
      class="flex-auto rounded-lg transition-all">
      {{ value.label }}
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  values: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits();
const selectedValue = ref(props.modelValue);

function selectValue(value) {
  selectedValue.value = value;
  emit("update:modelValue", value);
}
</script>
