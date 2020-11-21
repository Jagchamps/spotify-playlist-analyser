import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js";
import { ThemeContext } from "../../../contexts/ThemeContext";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

const PlaylistChart = ({ completeTracks, trackFilter }) => {
  const [playlistChart, setPlaylistChart] = useState({});
  const { isLightTheme } = useContext(ThemeContext);

  const yLabels = {
    0: "C",
    1: "D Flat",
    2: "D",
    3: "E Flat",
    4: "E",
    5: "F",
    6: "G Flat",
    7: "G",
    8: "A Flat",
    9: "A",
    10: "B Flat",
    11: "B",
  };

  useEffect(() => {
    buildChart();
  }, []);

  const buildChart = () => {
    console.log("Chart being built");

    const ctx = document.getElementById("playlistChartId");

    const labels = completeTracks.map((track) => track.number);
    const data = completeTracks.map((track) => track.stats[trackFilter]);

    var style = getComputedStyle(document.body);
    var gridCol = style.getPropertyValue("--color-text");

    let yAxesMax = 0;
    let stepSize = 0;

    switch (trackFilter) {
      case "key":
        yAxesMax = 11;
        stepSize = 1;
        break;
      case "loudness":
        yAxesMax = -60;
        stepSize = 2;
        break;
      case "tempo":
        stepSize = 20;
        break;
      default:
        yAxesMax = 100;
        stepSize = 10;
    }

    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: trackFilter,
            data: data,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: gridCol,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: gridCol,
              },
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: yAxesMax,
                stepSize: stepSize,
                callback: function (value, index, values) {
                  switch (trackFilter) {
                    case "key":
                      return yLabels[value];
                    case "loudness":
                      return `${value}DB`;
                    case "tempo":
                      return `${value}BPM`;
                    default:
                      return `${value}%`;
                  }
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem) {
              return completeTracks[tooltipItem[0].index].name;
            },
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                switch (trackFilter) {
                  case "key":
                    var dataPoint =
                      data.datasets[tooltipItem.datasetIndex].data[
                        tooltipItem.index
                      ];

                    var mode =
                      completeTracks[tooltipItem.index].stats["mode"] === 0
                        ? "Minor"
                        : "Major";

                    label +=
                      dataPoint === "-1"
                        ? `: ${yLabels[dataPoint]}`
                        : `: ${yLabels[dataPoint]} ${mode}`;
                    break;
                  case "loudness":
                    label += `: ${Math.round(tooltipItem.yLabel * 100) / 100}%`;
                    break;
                  case "tempo":
                    label += `: ${tooltipItem.yLabel}BPM`;
                    break;
                  default:
                    label += `: ${Math.round(tooltipItem.yLabel * 100) / 100}%`;
                }
              }
              return label;
            },
          },
        },
      },
    });

    setPlaylistChart(chart);
  };

  useDidMountEffect(() => {
    console.log("Updating chart");

    const labels = completeTracks.map((track) => track.number);
    const data = completeTracks.map((track) => track.stats[trackFilter]);

    updateData(playlistChart, labels, data);

    updateOptions(playlistChart);
  }, [trackFilter, isLightTheme]);

  function updateData(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = trackFilter;
    chart.update();
  }

  function updateOptions(chart) {
    var style = getComputedStyle(document.body);
    var bgCol = style.getPropertyValue("--color-page-background");
    var textCol = style.getPropertyValue("--color-text");

    let yAxesMax = 0;
    let stepSize = 0;

    switch (trackFilter) {
      case "key":
        yAxesMax = 11;
        stepSize = 1;
        break;
      case "loudness":
        yAxesMax = -60;
        stepSize = 2;
        break;
      case "tempo":
        stepSize = 20;
        break;
      default:
        yAxesMax = 100;
        stepSize = 10;
    }

    chart.options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: textCol,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: textCol,
            },
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: yAxesMax,
              stepSize: stepSize,
              callback: function (value, index, values) {
                switch (trackFilter) {
                  case "key":
                    return yLabels[value];
                  case "loudness":
                    return `${value}DB`;
                  case "tempo":
                    return `${value}BPM`;
                  default:
                    return `${value}%`;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        backgroundColor: textCol,
        titleFontColor: bgCol,
        bodyFontColor: bgCol,
        callbacks: {
          title: function (tooltipItem) {
            return completeTracks[tooltipItem[0].index].name;
          },
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              switch (trackFilter) {
                case "key":
                  var dataPoint =
                    data.datasets[tooltipItem.datasetIndex].data[
                      tooltipItem.index
                    ];

                  var mode =
                    completeTracks[tooltipItem.index].stats["mode"] === 0
                      ? "Minor"
                      : "Major";

                  label +=
                    dataPoint === "-1"
                      ? `: ${yLabels[dataPoint]}`
                      : `: ${yLabels[dataPoint]} ${mode}`;
                  break;
                case "loudness":
                  label += `: ${Math.round(tooltipItem.yLabel * 100) / 100}%`;
                  break;
                case "tempo":
                  label += `: ${tooltipItem.yLabel}BPM`;
                  break;
                default:
                  label += `: ${Math.round(tooltipItem.yLabel * 100) / 100}%`;
              }
            }
            return label;
          },
        },
      },
    };

    chart.update();
  }

  return (
    <div className="col-12">
      <div className="card chart-card border-0">
        <div className="card-body">
          <canvas id="playlistChartId"></canvas>
        </div>
      </div>
    </div>
  );
};

export default PlaylistChart;
