import { createSelector } from "@reduxjs/toolkit";

/* =========================================================
   BASIC SELECTORS
   ========================================================= */

export const selectTrains = (state) =>
  state.trains.trains;

export const selectFilters = (state) =>
  state.trains.filters;

const selectSelectedTrainId = (state) =>
  state.trains.selectedTrainId;


/* =========================================================
   FILTERED TRAINS
   ========================================================= */

export const selectFilteredTrains = createSelector(
  [selectTrains, selectFilters],
  (trains, filters) => {

    const {
      status = "all",
      zone = "all",
      trainType = "all",
      search = "",
    } = filters;

    const searchValue =
      search.trim().toLowerCase();


    return trains.filter((train) => {

      /* ---------------- STATUS ---------------- */

      const matchesStatus =
        status === "all" ||
        train.status === status;


      /* ---------------- ZONE ---------------- */

      const matchesZone =
        zone === "all" ||
        train.zone === zone;


      /* ---------------- TRAIN TYPE ---------------- */

      const matchesTrainType =
        trainType === "all" ||
        train.type === trainType;


      /* ---------------- SEARCH ---------------- */

      const matchesSearch =
        !searchValue ||

        train.number
          ?.toString()
          .toLowerCase()
          .includes(searchValue) ||

        train.name
          ?.toLowerCase()
          .includes(searchValue) ||

        train.location
          ?.toLowerCase()
          .includes(searchValue) ||

        train.route
          ?.toLowerCase()
          .includes(searchValue) ||

        train.nextStation
          ?.toLowerCase()
          .includes(searchValue);


      return (
        matchesStatus &&
        matchesZone &&
        matchesTrainType &&
        matchesSearch
      );

    });

  }
);


/* =========================================================
   SELECTED TRAIN
   ========================================================= */

export const selectSelectedTrain =
  createSelector(
    [
      selectTrains,
      selectSelectedTrainId,
    ],

    (
      trains,
      selectedTrainId
    ) => {

      if (!selectedTrainId) {
        return null;
      }

      return (
        trains.find(
          (train) =>
            train.number ===
            selectedTrainId
        ) || null
      );

    }
  );


/* =========================================================
   DASHBOARD STATISTICS
   ========================================================= */

export const selectDashboardStats =
  createSelector(
    [selectTrains],

    (trains) => {

      const activeTrains =
        trains.length;


      const onTime =
        trains.filter(
          (train) =>
            train.status ===
            "on-time"
        ).length;


      const delayed =
        trains.filter(
          (train) =>
            train.status ===
            "delayed"
        ).length;


      const critical =
        trains.filter(
          (train) =>
            train.status ===
            "critical"
        ).length;


      /* ---------------- DELAYS ---------------- */

      const trainsWithDelay =
        trains.filter(
          (train) =>
            train.status ===
              "delayed" ||
            train.status ===
              "critical"
        );


      const totalDelay =
        trainsWithDelay.reduce(
          (total, train) => {

            return (
              total +
              Number(
                train.delayMinutes || 0
              )
            );

          },
          0
        );


      const averageDelay =
        trainsWithDelay.length > 0
          ? Math.round(
              totalDelay /
                trainsWithDelay.length
            )
          : 0;


      return {
        activeTrains,
        onTime,
        delayed,
        critical,
        averageDelay:
          `+${averageDelay}m`,
      };

    }
  );