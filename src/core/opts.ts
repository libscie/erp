import { ScaleTypes } from "@carbon/charts"

const activityOpts = {
  // title: "Sparkline (modified area chart)",
  height: "150px",
  grid: {
    x: {
      enabled: false,
    },
    y: {
      enabled: false,
    },
  },
  axes: {
    bottom: {
      visible: false,
      title: "What happened lately?",
      mapsTo: "date",
      scaleType: "time" as ScaleTypes,
    },
    left: {
      visible: false,
      mapsTo: "value",
      scaleType: "linear" as ScaleTypes,
    },
  },
  color: {
    gradient: {
      enabled: false,
    },
  },
  points: {
    enabled: false,
  },
  legend: {
    enabled: true,
  },
  toolbar: {
    enabled: false,
  },
}

export { activityOpts }
