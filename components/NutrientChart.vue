<template>
  <div class="w-24 h-24">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  nutrients: {
    type: Array,
    required: true,
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: props.nutrients,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      hover: {
        mode: null,
      },

      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  });
};

onMounted(() => {
  renderChart();
});
</script>
