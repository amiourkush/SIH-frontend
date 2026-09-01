export const trains = [
  {
    number: "12345",
    name: "Intercity Express",
    route: "Delhi → Saharanpur",

    location: "Ghaziabad",
    latitude: 28.6692,
    longitude: 77.4538,

    speed: 67,
    nextStation: "Meerut",

    // Train-level arrival information
    arrivalTime: "10:24 AM",
    estimatedArrivalTime: "10:42 AM",

    // Kept for existing Dashboard components
    eta: "10:42 AM",

    delay: "+18m",
    delayMinutes: 18,

    status: "delayed",
    confidence: 92,

    zone: "North",
    type: "Express",

    stations: [
      {
        name: "Delhi",
        code: "DLI",
        latitude: 28.6139,
        longitude: 77.2090,
        arrivalTime: "09:00 AM",
        estimatedArrivalTime: "09:00 AM",
        status: "completed",
      },
      {
        name: "Ghaziabad",
        code: "GZB",
        latitude: 28.6692,
        longitude: 77.4538,
        arrivalTime: "10:24 AM",
        estimatedArrivalTime: "10:42 AM",
        status: "current",
      },
      {
        name: "Meerut",
        code: "MTC",
        latitude: 28.9845,
        longitude: 77.7064,
        arrivalTime: "10:30 AM",
        estimatedArrivalTime: "10:48 AM",
        status: "upcoming",
      },
      {
        name: "Muzaffarnagar",
        code: "MOZ",
        latitude: 29.4727,
        longitude: 77.7085,
        arrivalTime: "11:05 AM",
        estimatedArrivalTime: "11:23 AM",
        status: "upcoming",
      },
      {
        name: "Saharanpur",
        code: "SRE",
        latitude: 29.9671,
        longitude: 77.5452,
        arrivalTime: "12:00 PM",
        estimatedArrivalTime: "12:18 PM",
        status: "upcoming",
      },
    ],
  },

  {
    number: "22436",
    name: "Vande Bharat",
    route: "NDLS → Varanasi",

    location: "Kanpur",
    latitude: 26.4499,
    longitude: 80.3319,

    speed: 102,
    nextStation: "Prayagraj",

    // Train-level arrival information
    arrivalTime: "02:30 PM",
    estimatedArrivalTime: "02:30 PM",

    // Kept for existing Dashboard components
    eta: "02:30 PM",

    delay: "On Time",
    delayMinutes: 0,

    status: "on-time",
    confidence: 98,

    zone: "North",
    type: "Vande Bharat",

    stations: [
      {
        name: "New Delhi",
        code: "NDLS",
        latitude: 28.6431,
        longitude: 77.2197,
        arrivalTime: "08:00 AM",
        estimatedArrivalTime: "08:00 AM",
        status: "completed",
      },
      {
        name: "Kanpur",
        code: "CNB",
        latitude: 26.4499,
        longitude: 80.3319,
        arrivalTime: "12:30 PM",
        estimatedArrivalTime: "12:30 PM",
        status: "current",
      },
      {
        name: "Prayagraj",
        code: "PRYJ",
        latitude: 25.4358,
        longitude: 81.8463,
        arrivalTime: "02:30 PM",
        estimatedArrivalTime: "02:30 PM",
        status: "upcoming",
      },
      {
        name: "Varanasi",
        code: "BSB",
        latitude: 25.3176,
        longitude: 82.9739,
        arrivalTime: "04:15 PM",
        estimatedArrivalTime: "04:15 PM",
        status: "upcoming",
      },
    ],
  },

  {
    number: "19834",
    name: "Gujarat Mail",
    route: "Ahmedabad → Mumbai",

    location: "Surat",
    latitude: 21.1702,
    longitude: 72.8311,

    speed: 72,
    nextStation: "Borivali",

    // Train-level arrival information
    arrivalTime: "02:40 PM",
    estimatedArrivalTime: "04:25 PM",

    // Kept for existing Dashboard components
    eta: "04:25 PM",

    delay: "+1h 45m",
    delayMinutes: 105,

    status: "critical",
    confidence: 84,

    zone: "Western",
    type: "Mail",

    stations: [
      {
        name: "Ahmedabad",
        code: "ADI",
        latitude: 23.0225,
        longitude: 72.5714,
        arrivalTime: "09:00 AM",
        estimatedArrivalTime: "09:00 AM",
        status: "completed",
      },
      {
        name: "Vadodara",
        code: "BRC",
        latitude: 22.3072,
        longitude: 73.1812,
        arrivalTime: "11:00 AM",
        estimatedArrivalTime: "11:00 AM",
        status: "completed",
      },
      {
        name: "Surat",
        code: "ST",
        latitude: 21.1702,
        longitude: 72.8311,
        arrivalTime: "01:30 PM",
        estimatedArrivalTime: "03:15 PM",
        status: "current",
      },
      {
        name: "Borivali",
        code: "BVI",
        latitude: 19.2307,
        longitude: 72.8567,
        arrivalTime: "02:40 PM",
        estimatedArrivalTime: "04:25 PM",
        status: "upcoming",
      },
      {
        name: "Mumbai Central",
        code: "MMCT",
        latitude: 18.9690,
        longitude: 72.8194,
        arrivalTime: "03:25 PM",
        estimatedArrivalTime: "05:10 PM",
        status: "upcoming",
      },
    ],
  },

  {
    number: "12952",
    name: "Mumbai Rajdhani",
    route: "Mumbai → Delhi",

    location: "Kota Jn (KOTA)",
    latitude: 25.2138,
    longitude: 75.8648,

    speed: 124,
    nextStation: "Kota Jn (KOTA)",

    // Train-level arrival information
    arrivalTime: "04:43 PM",
    estimatedArrivalTime: "04:45 PM",

    // Kept for existing Dashboard components
    eta: "04:45 PM",

    delay: "+2m",
    delayMinutes: 2,

    status: "delayed",
    confidence: 98,

    zone: "Western",
    type: "Rajdhani",

    stations: [
      {
        name: "Mumbai Central",
        code: "MMCT",
        latitude: 18.9690,
        longitude: 72.8194,
        arrivalTime: "08:00 AM",
        estimatedArrivalTime: "08:00 AM",
        status: "completed",
      },
      {
        name: "Surat",
        code: "ST",
        latitude: 21.1702,
        longitude: 72.8311,
        arrivalTime: "10:05 AM",
        estimatedArrivalTime: "10:05 AM",
        status: "completed",
      },
      {
        name: "Vadodara",
        code: "BRC",
        latitude: 22.3072,
        longitude: 73.1812,
        arrivalTime: "11:20 AM",
        estimatedArrivalTime: "11:20 AM",
        status: "completed",
      },
      {
        name: "Kota Jn",
        code: "KOTA",
        latitude: 25.2138,
        longitude: 75.8648,
        arrivalTime: "04:43 PM",
        estimatedArrivalTime: "04:45 PM",
        status: "current",
      },
      {
        name: "Sawai Madhopur",
        code: "SWM",
        latitude: 26.0173,
        longitude: 76.5026,
        arrivalTime: "06:03 PM",
        estimatedArrivalTime: "06:05 PM",
        status: "upcoming",
      },
      {
        name: "New Delhi",
        code: "NDLS",
        latitude: 28.6431,
        longitude: 77.2197,
        arrivalTime: "09:28 PM",
        estimatedArrivalTime: "09:30 PM",
        status: "upcoming",
      },
    ],
  },
];