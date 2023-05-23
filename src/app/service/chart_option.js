// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
import * as echarts from "echarts";

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
        name: "Running",
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

export function getDaemonMemChartOption(data = []) {
  const randomNumbers = Array.from({ length: 60 }, () => 0);
  return {
    grid: {
      show: false,
      borderWidth: 0,
      top: 10,
      bottom: 0,
      left: 0,
      right: 0
    },
    xAxis: { type: "category", show: false },
    yAxis: { type: "value", min: 0, max: 100, show: false, minInterval: 1 },
    series: [
      {
        data: data || randomNumbers,
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "rgb(67, 145, 250,0.9)",
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(67, 145, 250,0.8)"
            },
            {
              offset: 1,
              color: "rgb(17, 95, 200,0)"
            }
          ])
        }
      }
    ]
  };
}
