<template>
  <div class="">
    <h1 class="text-2xl md:text-4xl font-extrabold mt-8 mb-2 md:text-center">Kalkulator zapotrzebowania kalorycznego</h1>
    <p class="md:text-center">
      W tym miejscu możesz w prosty sposób obliczyć swoje zapotrzebowanie kaloryczne. Wystarczy, że uzupełnisz poniższy formularz.
    </p>

    <div class="grid md:grid-cols-2 gap-6 my-6">
      <div class="bg-[#f5f5f5] dark:bg-[#1e2021] p-4 rounded-lg grid gap-4 shadow">
        <h2 class="text-2xl font-bold my-2 text-center">Wprowadź swoje dane</h2>
        <ToggleSwitch
          :values="[
            { label: 'Kobieta', value: 'female' },
            { label: 'Mężczyzna', value: 'male' },
          ]"
          v-model="gender" />
        <RangeSlider id="age" label="Wiek" unit="lat" v-model="age" :modelValue="Number(age)" :min="1" :max="101" />
        <RangeSlider id="height" label="Wzrost" unit="cm" v-model="height" :modelValue="Number(height)" :min="90" :max="220" />
        <RangeSlider id="weight" label="Waga" unit="kg" v-model="weight" :modelValue="Number(weight)" :min="10" :max="125" />

        <div class="flex flex-col relative">
          <span>Poziom aktywności</span>
          <button @click="toggleSelect" class="border border-gray-300 dark:border-neutral-700 rounded-lg h-12 p-2 w-full mt-4 mb-2 flex items-center">
            <div class="flex flex-col items-start flex-auto">
              <span>{{ selectedActivity.label }}</span>
              <span class="text-sm text-neutral-500">{{ selectedActivity.desc }}</span>
            </div>
            <Icon name="lucide:chevron-down" size="1.3rem" />
          </button>

          <Transition name="fade">
            <div v-if="openSelect" class="absolute top-0 left-0 bg-white rounded-lg w-full shadow">
              <div
                v-for="activity in activityLevels"
                :key="activity.value"
                :class="{ 'bg-neutral-200': activity.value === selectedActivity.value }"
                @click="selectActivity(activity)">
                <div class="flex flex-col items-start flex-auto cursor-pointer px-2 py-1 hover:bg-neutral-200">
                  <span>{{ activity.label }}</span>
                  <span class="text-sm text-neutral-500">{{ activity.desc }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <span>Chcesz</span>
        <ToggleSwitch
          :values="[
            { label: 'Schudnąć', value: 'lose' },
            { label: 'Utrzymać', value: 'maintain' },
            { label: 'Przytyć', value: 'gain' },
          ]"
          v-model="goal" />
      </div>
      <div class="bg-[#f5f5f5] dark:bg-[#1e2021] p-4 rounded-lg grid gap-4 shadow">
        <h2 class="text-2xl font-bold my-2 text-center">Twoje wyniki</h2>
        <div class="border-b-2 border-neutral-300 dark:border-neutral-700">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700 dark:text-neutral-200">Metabolizm podstawowy</span>
            <a href="/" class="text-blue-500 font-medium text-sm">Wyjaśnienie</a>
          </div>
          <span class="block text-center font-bold text-3xl my-4">{{ bmr }} kcal</span>
        </div>
        <div class="border-b-2 border-neutral-300 dark:border-neutral-700">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700 dark:text-neutral-200">Wskaźnik BMI</span>
            <a href="/" class="text-blue-500 font-medium text-sm">Wyjaśnienie</a>
          </div>
          <span class="block text-center font-bold text-3xl my-4">{{ bmi }}</span>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700 dark:text-neutral-200">Zalecane dzienne spożycie kalorii</span>
            <a href="/" class="text-blue-500 font-medium text-sm">Wyjaśnienie</a>
          </div>
          <div class="flex flex-col my-4">
            <div class="flex">
              <NutrientChart class="" :nutrients="[macros.protein, macros.carbohydrates, macros.fats, macros.fiber]" />
              <span class="block text-center font-bold text-3xl my-4 flex-auto md:mr-20">{{ dailyCaloricNeeds }} kcal</span>
            </div>
            <ul class="my-4 list-disc ml-5">
              <li v-for="(macro, index) in macrosArray" :key="index" class="font-medium" :class="macro.color">
                <div class="flex">
                  <span class="flex-auto">{{ macro.name }}</span>
                  <div class="flex">
                    <span class="block mr-2">{{ macro.value }}g</span>
                    <span>
                      {{
                        (((macro.value * (macro.name === "Tłuszcze" ? 9 : macro.name === "Błonnik" ? 2 : 4)) / dailyCaloricNeeds) * 100).toFixed(0)
                      }}%
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const gender = ref("male");
const age = ref(24);
const height = ref(191);
const weight = ref(74);
const openSelect = ref(false);
const activityLevel = ref(1.55);
const activityLevels = ref([
  { value: "1.0", label: "Brak ruchu", desc: "Osoba leżąca/chora, całkowity brak ruchu" },
  { value: "1.2", label: "Siedząca aktywność", desc: "Praca siedząca, np. pracownik biurowy" },
  { value: "1.375", label: "Lekka aktywność", desc: "Praca w ruchu, np. nauczyciel" },
  { value: "1.55", label: "Średnia aktywność", desc: "Chodzenie i lekki wysiłek, np. przewodnik" },
  { value: "1.725", label: "Duża aktywność", desc: "Praca fizyczna, np. murarz" },
  { value: "1.9", label: "Ekstremalna aktywność", desc: "Bardzo wymagający wysiłek, np. sportowiec" },
]);
const selectedActivity = ref(activityLevels.value.find((a) => a.value === "1.55"));
const goal = ref("maintain");

const toggleSelect = () => {
  openSelect.value = !openSelect.value;
};

function selectActivity(activity) {
  selectedActivity.value = activity;
  activityLevel.value = activity.value;
  openSelect.value = false;
}

const bmi = computed(() => {
  return (weight.value / (height.value / 100) ** 2).toFixed(2);
});

const bmr = computed(() => {
  if (gender.value === "male") {
    return (10 * weight.value + 6.25 * height.value - 5 * age.value + 5).toFixed(0);
  } else {
    return (10 * weight.value + 6.25 * height.value - 5 * age.value - 161).toFixed(0);
  }
});

const dailyCaloricNeeds = computed(() => {
  let adjustment = 0;

  const baseCalories = bmr.value * activityLevel.value;

  if (goal.value === "gain") {
    adjustment = baseCalories * 0.1;
  } else if (goal.value === "lose") {
    adjustment = -baseCalories * 0.15;
  }

  return (baseCalories + adjustment).toFixed(0);
});

const macros = computed(() => {
  let proteinPercentage, carbsPercentage, fatsPercentage, fiberPercentage;

  if (goal.value === "lose") {
    proteinPercentage = 0.275;
    carbsPercentage = 0.424;
    fatsPercentage = 0.28;
    fiberPercentage = 0.0235;
  } else if (goal.value === "gain") {
    proteinPercentage = 0.246;
    carbsPercentage = 0.48;
    fatsPercentage = 0.25;
    fiberPercentage = 0.018;
  } else {
    proteinPercentage = 0.25;
    carbsPercentage = 0.465;
    fatsPercentage = 0.265;
    fiberPercentage = 0.02;
  }

  const dailyCalories = dailyCaloricNeeds.value;

  const protein = Math.round((dailyCalories * proteinPercentage) / 4);
  const carbohydrates = Math.round((dailyCalories * carbsPercentage) / 4);
  const fats = Math.round((dailyCalories * fatsPercentage) / 9);
  const fiber = Math.round((dailyCalories * fiberPercentage) / 2);

  return {
    protein,
    carbohydrates,
    fats,
    fiber,
  };
});

const macrosArray = computed(() => [
  { name: "Białko", value: macros.value.protein, color: "text-red-500" },
  { name: "Węglowodany", value: macros.value.carbohydrates, color: "text-blue-500" },
  { name: "Tłuszcze", value: macros.value.fats, color: "text-yellow-500" },
  { name: "Błonnik", value: macros.value.fiber, color: "text-green-500" },
]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
