
export function getDefaultOption() {
  return {
    grid: {
      show: false,
      borderWidth: 0,
      top: 8,
      bottom: 30,
      left: 30,
      right: 8
    },
    xAxis: { type: "category", show: true },
    yAxis: { type: "value", min: 0, max: 100, show: true, minInterval: 1 },
    series: [
      {
        type: "line",
        areaStyle: {},
        smooth: true,
        symbol: "none"
      }
    ]
  };
}

export function getStatusChartOption1() {
  return {
    grid: {
      show: false,
      borderWidth: 0,
      top: 8,
      bottom: 30,
      left: 30,
      right: 8
    },
    xAxis: { type: "category", show: true },
    yAxis: { type: "value", show: true, minInterval: 1 },
    series: [
      {
        type: "line",
        areaStyle: {},
        smooth: true,
        symbol: "none"
      }
    ]
  };
}

export function getStatusChartOption2() {
  return {
    // legend: {
    //   left: "center",
    //   data: ["运行数"]
    // },
    grid: {
      show: false,
      borderWidth: 0,
      top: 8,
      bottom: 30,
      left: 30,
      right: 8
    },
    xAxis: { type: "category", show: true },
    yAxis: { type: "value", show: true, minInterval: 1, max: 10 },
    series: [
      {
        name: "运行数",
        type: "line",
        areaStyle: {},
        smooth: true,
        symbol: "none"
      }
    ]
  };
}

export function getPlayersOption() {
  return {
    grid: {
      show: false,
      borderWidth: 0,
      top: 8,
      bottom: 30,
      left: 30,
      right: 8
    },
    xAxis: { type: "category", show: true },
    yAxis: { type: "value", alignTicks: true, min: 0, show: true, minInterval: 1 },
    series: [
      {
        type: "line",
        areaStyle: {},
        symbol: "none"
      }
    ]
  };
}
