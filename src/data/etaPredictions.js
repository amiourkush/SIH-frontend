export const etaPredictions = {
  "12345": {
    trainNumber: "12345",

    prediction: {
      scheduledArrival: "10:24 AM",
      currentEstimate: "10:42 AM",
      aiPrediction: "10:42 AM",
    },

    predictionRange: {
      early: "10:38 AM",
      late: "10:46 AM",
    },

    confidence: 92,

    factors: [
      {
        id: "current-delay",
        name: "Current Delay",
        value: "+18 min",
        impact: 18,
        type: "critical",
      },
      {
        id: "route-congestion",
        name: "Route Congestion",
        value: "+5 min",
        impact: 5,
        type: "warning",
      },
      {
        id: "historical-pattern",
        name: "Historical Pattern",
        value: "+3 min",
        impact: 3,
        type: "neutral",
      },
      {
        id: "current-speed",
        name: "Current Speed",
        value: "-2 min",
        impact: -2,
        type: "positive",
      },
    ],

    totalImpact: {
      value: "+16 min",
      minutes: 16,
    },

    trajectory: {
      scheduled: [
        {
          time: "09:08 AM",
          delay: 0,
        },
        {
          time: "09:30 AM",
          delay: 2,
        },
        {
          time: "10:00 AM",
          delay: 7,
        },
        {
          time: "10:15 AM",
          delay: 12,
        },
        {
          time: "10:24 AM",
          delay: 18,
        },
      ],

      aiPrediction: [
        {
          time: "09:08 AM",
          delay: 0,
        },
        {
          time: "09:30 AM",
          delay: 1,
        },
        {
          time: "10:00 AM",
          delay: 5,
        },
        {
          time: "10:15 AM",
          delay: 11,
        },
        {
          time: "10:42 AM",
          delay: 18,
        },
      ],
    },

    updatedAt: "32 seconds ago",
  },

  "22436": {
    trainNumber: "22436",

    prediction: {
      scheduledArrival: "02:30 PM",
      currentEstimate: "02:30 PM",
      aiPrediction: "02:30 PM",
    },

    predictionRange: {
      early: "02:27 PM",
      late: "02:33 PM",
    },

    confidence: 98,

    factors: [
      {
        id: "current-delay",
        name: "Current Delay",
        value: "0 min",
        impact: 0,
        type: "positive",
      },
      {
        id: "route-congestion",
        name: "Route Congestion",
        value: "+1 min",
        impact: 1,
        type: "warning",
      },
      {
        id: "historical-pattern",
        name: "Historical Pattern",
        value: "-1 min",
        impact: -1,
        type: "positive",
      },
      {
        id: "current-speed",
        name: "Current Speed",
        value: "-2 min",
        impact: -2,
        type: "positive",
      },
    ],

    totalImpact: {
      value: "0 min",
      minutes: 0,
    },

    trajectory: {
      scheduled: [
        {
          time: "01:00 PM",
          delay: 0,
        },
        {
          time: "01:20 PM",
          delay: 0,
        },
        {
          time: "01:40 PM",
          delay: 1,
        },
        {
          time: "02:00 PM",
          delay: 0,
        },
        {
          time: "02:30 PM",
          delay: 0,
        },
      ],

      aiPrediction: [
        {
          time: "01:00 PM",
          delay: 0,
        },
        {
          time: "01:20 PM",
          delay: 0,
        },
        {
          time: "01:40 PM",
          delay: 0,
        },
        {
          time: "02:00 PM",
          delay: 0,
        },
        {
          time: "02:30 PM",
          delay: 0,
        },
      ],
    },

    updatedAt: "32 seconds ago",
  },

  "19834": {
    trainNumber: "19834",

    prediction: {
      scheduledArrival: "02:40 PM",
      currentEstimate: "04:25 PM",
      aiPrediction: "04:25 PM",
    },

    predictionRange: {
      early: "04:18 PM",
      late: "04:32 PM",
    },

    confidence: 84,

    factors: [
      {
        id: "current-delay",
        name: "Current Delay",
        value: "+1h 45 min",
        impact: 105,
        type: "critical",
      },
      {
        id: "route-congestion",
        name: "Route Congestion",
        value: "+12 min",
        impact: 12,
        type: "warning",
      },
      {
        id: "historical-pattern",
        name: "Historical Pattern",
        value: "+8 min",
        impact: 8,
        type: "neutral",
      },
      {
        id: "current-speed",
        name: "Current Speed",
        value: "-4 min",
        impact: -4,
        type: "positive",
      },
    ],

    totalImpact: {
      value: "+1h 45 min",
      minutes: 105,
    },

    trajectory: {
      scheduled: [
        {
          time: "01:00 PM",
          delay: 0,
        },
        {
          time: "01:30 PM",
          delay: 15,
        },
        {
          time: "02:00 PM",
          delay: 35,
        },
        {
          time: "02:20 PM",
          delay: 60,
        },
        {
          time: "02:40 PM",
          delay: 105,
        },
      ],

      aiPrediction: [
        {
          time: "01:00 PM",
          delay: 0,
        },
        {
          time: "01:30 PM",
          delay: 12,
        },
        {
          time: "02:00 PM",
          delay: 30,
        },
        {
          time: "03:00 PM",
          delay: 70,
        },
        {
          time: "04:25 PM",
          delay: 105,
        },
      ],
    },

    updatedAt: "32 seconds ago",
  },

  "12952": {
    trainNumber: "12952",

    prediction: {
      scheduledArrival: "04:43 PM",
      currentEstimate: "04:45 PM",
      aiPrediction: "04:45 PM",
    },

    predictionRange: {
      early: "04:42 PM",
      late: "04:48 PM",
    },

    confidence: 98,

    factors: [
      {
        id: "current-delay",
        name: "Current Delay",
        value: "+2 min",
        impact: 2,
        type: "warning",
      },
      {
        id: "route-congestion",
        name: "Route Congestion",
        value: "+1 min",
        impact: 1,
        type: "warning",
      },
      {
        id: "historical-pattern",
        name: "Historical Pattern",
        value: "0 min",
        impact: 0,
        type: "neutral",
      },
      {
        id: "current-speed",
        name: "Current Speed",
        value: "-1 min",
        impact: -1,
        type: "positive",
      },
    ],

    totalImpact: {
      value: "+2 min",
      minutes: 2,
    },

    trajectory: {
      scheduled: [
        {
          time: "04:00 PM",
          delay: 0,
        },
        {
          time: "04:10 PM",
          delay: 0,
        },
        {
          time: "04:20 PM",
          delay: 1,
        },
        {
          time: "04:30 PM",
          delay: 2,
        },
        {
          time: "04:43 PM",
          delay: 2,
        },
      ],

      aiPrediction: [
        {
          time: "04:00 PM",
          delay: 0,
        },
        {
          time: "04:10 PM",
          delay: 0,
        },
        {
          time: "04:20 PM",
          delay: 1,
        },
        {
          time: "04:30 PM",
          delay: 2,
        },
        {
          time: "04:45 PM",
          delay: 2,
        },
      ],
    },

    updatedAt: "32 seconds ago",
  },
};

export function getETAPrediction(trainNumber) {
  return etaPredictions[trainNumber] || null;
}