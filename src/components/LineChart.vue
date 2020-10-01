<template>
  <div>
    <!-- {{ information }} -->
    <Highcharts ref="highchartsRef" :options="options"></Highcharts>
    <button @click="updateCredits">update credits</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    information: Object,
  },
  setup(props) {
    const options = {
      title: {
        text: "Prepaid Mobile Internet",
        x: -20, //center
      },
      xAxis: {
        categories: props.information.labels,
      },
      yAxis: {
        title: {
          text: "Price (Rs)",
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080",
          },
        ],
      },
      tooltip: {
        valuePrefix: "Rs ",
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        borderWidth: 0,
      },
      series: [
        {
          name: "All Providers",
          data: props.information.series,
        },
        // {
        //   name: "New York",
        //   data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
        // },
        // {
        //   name: "Berlin",
        //   data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
        // },
        // {
        //   name: "London",
        //   data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
        // },
      ],
    };

    const highchartsRef = ref(null);
    function updateCredits() {
      const { chart } = highchartsRef.value;
      chart.credits.update({
        style: {
          color: "#" + ((Math.random() * 0xffffff) | 0).toString(16),
        },
      });
    }
    return { highchartsRef, updateCredits, options };
  },
};
</script>
