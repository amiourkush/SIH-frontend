/* =========================================================
   TRAIN MOVEMENT SIMULATION
   ========================================================= */

/*
 * This is only frontend simulation.
 *
 * Later, when the backend provides live GPS coordinates,
 * this file can be removed/replaced by backend updates.
 */


/* =========================================================
   CONFIGURATION
   ========================================================= */

/*
 * 1 = real-world movement
 *
 * Higher values make the train visibly move faster
 * for demonstration purposes.
 */
const SIMULATION_MULTIPLIER = 30;


/*
 * Minimum speed used by the simulator.
 *
 * This prevents a train from appearing completely
 * stationary when mock data contains a low speed.
 */
const MINIMUM_SPEED = 40;


/* =========================================================
   DISTANCE BETWEEN TWO GPS COORDINATES
   ========================================================= */

export function calculateDistance(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {
  const earthRadius = 6371;

  const latitudeDifference =
    toRadians(
      latitude2 - latitude1
    );

  const longitudeDifference =
    toRadians(
      longitude2 - longitude1
    );

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(longitudeDifference / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}


/* =========================================================
   MOVE TRAIN
   ========================================================= */

export function moveTrainTowardsStation(
  train,
  elapsedSeconds = 1
) {
  if (!train) {
    return train;
  }

  if (!train.stations?.length) {
    return train;
  }


  /* -------------------------------------------------------
     Find current station
     ------------------------------------------------------- */

  const currentStationIndex =
    train.stations.findIndex(
      (station) =>
        station.status === "current"
    );


  /*
   * If there is no current station,
   * don't move the train.
   */

  if (currentStationIndex === -1) {
    return train;
  }


  /* -------------------------------------------------------
     Find next station
     ------------------------------------------------------- */

  const nextStation =
    train.stations[
      currentStationIndex + 1
    ];


  /*
   * Train has reached the final station.
   */

  if (!nextStation) {
    return {
      ...train,
      latitude:
        train.stations[
          train.stations.length - 1
        ].latitude,
      longitude:
        train.stations[
          train.stations.length - 1
        ].longitude,
      speed: 0,
      nextStation: null,
    };
  }


  /* -------------------------------------------------------
     Current position
     ------------------------------------------------------- */

  const currentLatitude =
    Number(train.latitude);

  const currentLongitude =
    Number(train.longitude);


  /* -------------------------------------------------------
     Distance to next station
     ------------------------------------------------------- */

  const distance =
    calculateDistance(
      currentLatitude,
      currentLongitude,
      nextStation.latitude,
      nextStation.longitude
    );


  /*
   * Distance travelled in one second.
   *
   * speed = km/hour
   *
   * divide by 3600 to get km/second
   *
   * multiply by simulation multiplier
   */

  const speedKmPerSecond =
    (
      Math.max(
        Number(train.speed) || MINIMUM_SPEED,
        MINIMUM_SPEED
      ) *
      SIMULATION_MULTIPLIER
    ) / 3600;


  const movementDistance =
    speedKmPerSecond *
    elapsedSeconds;


  /* =======================================================
     STATION REACHED
     ======================================================= */

  if (
    distance <= movementDistance
  ) {
    return moveToNextStation(
      train,
      currentStationIndex,
      nextStation
    );
  }


  /* =======================================================
     MOVE TOWARDS NEXT STATION
     ======================================================= */

  const movementRatio =
    movementDistance / distance;


  const newLatitude =
    currentLatitude +
    (
      nextStation.latitude -
      currentLatitude
    ) *
      movementRatio;


  const newLongitude =
    currentLongitude +
    (
      nextStation.longitude -
      currentLongitude
    ) *
      movementRatio;


  return {
    ...train,

    latitude:
      newLatitude,

    longitude:
      newLongitude,
  };
}


/* =========================================================
   MOVE TO NEXT STATION
   ========================================================= */

function moveToNextStation(
  train,
  currentStationIndex,
  nextStation
) {
  const nextStationIndex =
    currentStationIndex + 1;

  const updatedStations =
    train.stations.map(
      (station, index) => {

        if (
          index === currentStationIndex
        ) {
          return {
            ...station,
            status: "completed",
          };
        }

        if (
          index === nextStationIndex
        ) {
          return {
            ...station,
            status: "current",
          };
        }

        return station;
      }
    );


  const followingStation =
    train.stations[
      nextStationIndex + 1
    ];


  return {
    ...train,

    latitude:
      nextStation.latitude,

    longitude:
      nextStation.longitude,

    location:
      nextStation.name,

    nextStation:
      followingStation?.name ||
      null,

    stations:
      updatedStations,
  };
}


/* =========================================================
   HELPER
   ========================================================= */

function toRadians(value) {
  return (
    value *
    Math.PI /
    180
  );
}