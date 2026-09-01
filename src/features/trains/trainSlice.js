import { createSlice } from "@reduxjs/toolkit";

import {
  trains as initialTrains,
} from "../../data/trains";


/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState = {
  trains: initialTrains,

  selectedTrainId: null,

  filters: {
    status: "all",
    zone: "all",
    trainType: "all",
    search: "",
  },
};


/* =========================================================
   SLICE
   ========================================================= */

const trainSlice = createSlice({
  name: "trains",

  initialState,

  reducers: {

    /* =====================================================
       SELECT TRAIN
       ===================================================== */

    setSelectedTrain: (
      state,
      action
    ) => {
      state.selectedTrainId =
        action.payload;
    },


    /* =====================================================
       CLEAR SELECTED TRAIN
       ===================================================== */

    clearSelectedTrain: (
      state
    ) => {
      state.selectedTrainId = null;
    },


    /* =====================================================
       STATUS FILTER
       ===================================================== */

    setStatusFilter: (
      state,
      action
    ) => {
      state.filters.status =
        action.payload;
    },


    /* =====================================================
       ZONE FILTER
       ===================================================== */

    setZoneFilter: (
      state,
      action
    ) => {
      state.filters.zone =
        action.payload;
    },


    /* =====================================================
       TRAIN TYPE FILTER
       ===================================================== */

    setTrainTypeFilter: (
      state,
      action
    ) => {
      state.filters.trainType =
        action.payload;
    },


    /* =====================================================
       SEARCH
       ===================================================== */

    setSearch: (
      state,
      action
    ) => {
      state.filters.search =
        action.payload;
    },


    /* =====================================================
       RESET FILTERS
       ===================================================== */

    resetFilters: (
      state
    ) => {
      state.filters = {
        status: "all",
        zone: "all",
        trainType: "all",
        search: "",
      };
    },


    /* =====================================================
       REPLACE ALL TRAINS
       ===================================================== */

    setTrains: (
      state,
      action
    ) => {
      state.trains =
        action.payload;
    },


    /* =====================================================
       UPDATE ONE TRAIN
       ===================================================== */

    updateTrain: (
      state,
      action
    ) => {

      const updatedTrain =
        action.payload;


      const index =
        state.trains.findIndex(
          (train) =>
            train.number ===
            updatedTrain.number
        );


      if (index === -1) {
        return;
      }


      state.trains[index] = {
        ...state.trains[index],
        ...updatedTrain,
      };
    },
  },
});


/* =========================================================
   ACTIONS
   ========================================================= */

export const {
  setSelectedTrain,
  clearSelectedTrain,

  setStatusFilter,
  setZoneFilter,
  setTrainTypeFilter,
  setSearch,
  resetFilters,

  setTrains,
  updateTrain,
} = trainSlice.actions;


/* =========================================================
   REDUCER
   ========================================================= */

export default trainSlice.reducer;