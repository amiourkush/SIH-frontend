import { useCallback } from "react";

import {
  setSelectedTrain,
  clearSelectedTrain,

  setStatusFilter,
  setZoneFilter,
  setTrainTypeFilter,
  setSearch,
  resetFilters,

  setTrains,
  updateTrain,
} from "../features/trains/trainSlice";

import {
  selectTrains,
  selectFilteredTrains,
  selectSelectedTrain,
  selectDashboardStats,
} from "../features/trains/trainSelectors";

import {
  useAppDispatch,
  useAppSelector,
} from "./reduxHooks";


export function useTrains() {

  const dispatch =
    useAppDispatch();


  /* =======================================================
     ALL TRAINS
     ======================================================= */

  /*
   * IMPORTANT:
   *
   * This is the complete Redux train list.
   *
   * It is NOT affected by search/filter state.
   */

  const allTrains =
    useAppSelector(
      selectTrains
    );


  /* =======================================================
     FILTERED TRAINS
     ======================================================= */

  /*
   * This is useful for Dashboard.
   *
   * It respects:
   *
   * status
   * zone
   * train type
   * Redux search
   */

  const trains =
    useAppSelector(
      selectFilteredTrains
    );


  /* =======================================================
     SELECTED TRAIN
     ======================================================= */

  const selectedTrain =
    useAppSelector(
      selectSelectedTrain
    );


  /* =======================================================
     FILTERS
     ======================================================= */

  const filters =
    useAppSelector(
      (state) =>
        state.trains.filters
    );


  /* =======================================================
     DASHBOARD STATS
     ======================================================= */

  const stats =
    useAppSelector(
      selectDashboardStats
    );


  /* =======================================================
     SELECT TRAIN
     ======================================================= */

  const selectTrain =
    useCallback(
      (train) => {

        dispatch(
          setSelectedTrain(
            train.number
          )
        );

      },
      [dispatch]
    );


  /* =======================================================
     CLEAR SELECTED TRAIN
     ======================================================= */

  const clearSelectedTrainHandler =
    useCallback(
      () => {

        dispatch(
          clearSelectedTrain()
        );

      },
      [dispatch]
    );


  /* =======================================================
     STATUS FILTER
     ======================================================= */

  const setStatusFilterHandler =
    useCallback(
      (status) => {

        dispatch(
          setStatusFilter(status)
        );

      },
      [dispatch]
    );


  /* =======================================================
     ZONE FILTER
     ======================================================= */

  const setZoneFilterHandler =
    useCallback(
      (zone) => {

        dispatch(
          setZoneFilter(zone)
        );

      },
      [dispatch]
    );


  /* =======================================================
     TRAIN TYPE FILTER
     ======================================================= */

  const setTrainTypeFilterHandler =
    useCallback(
      (type) => {

        dispatch(
          setTrainTypeFilter(type)
        );

      },
      [dispatch]
    );


  /* =======================================================
     SEARCH
     ======================================================= */

  const setSearchHandler =
    useCallback(
      (search) => {

        dispatch(
          setSearch(search)
        );

      },
      [dispatch]
    );


  /* =======================================================
     RESET FILTERS
     ======================================================= */

  const resetFiltersHandler =
    useCallback(
      () => {

        dispatch(
          resetFilters()
        );

      },
      [dispatch]
    );


  /* =======================================================
     REPLACE TRAINS
     ======================================================= */

  const replaceTrains =
    useCallback(
      (trainList) => {

        dispatch(
          setTrains(trainList)
        );

      },
      [dispatch]
    );


  /* =======================================================
     UPDATE ONE TRAIN
     ======================================================= */

  const updateTrainData =
    useCallback(
      (train) => {

        dispatch(
          updateTrain(train)
        );

      },
      [dispatch]
    );


  /* =======================================================
     RETURN
     ======================================================= */

  return {

    /* ---------------- TRAIN DATA ---------------- */

    allTrains,

    trains,


    /* ---------------- SELECTION ---------------- */

    selectedTrain,

    selectTrain,

    clearSelectedTrain:
      clearSelectedTrainHandler,


    /* ---------------- FILTERS ---------------- */

    filters,

    setStatusFilter:
      setStatusFilterHandler,

    setZoneFilter:
      setZoneFilterHandler,

    setTrainTypeFilter:
      setTrainTypeFilterHandler,

    setSearch:
      setSearchHandler,

    resetFilters:
      resetFiltersHandler,


    /* ---------------- STATS ---------------- */

    stats,


    /* ---------------- DATA UPDATES ---------------- */

    replaceTrains,

    updateTrainData,

  };
}