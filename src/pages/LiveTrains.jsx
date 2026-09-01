import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Radio,
  Search,
  TrainFront,
  X,
} from "lucide-react";

import LiveTrainMap from "../components/live-trains/LiveTrainMap";

import {
  useTrains,
} from "../hooks/useTrains";


export default function LiveTrains() {

  /* =======================================================
     LOCAL SEARCH
     ======================================================= */

  const [search, setSearch] =
    useState("");


  /* =======================================================
     CLOCK
     ======================================================= */

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(
    new Date()
  );


  /* =======================================================
     REDUX TRAIN DATA
     ======================================================= */

  const {
    allTrains,
  } = useTrains();


  /* =======================================================
     UPDATE CLOCK
     ======================================================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setLastUpdated(
          new Date()
        );

      }, 1000);


    return () => {

      clearInterval(
        interval
      );

    };

  }, []);


  /* =======================================================
     LOCAL SEARCH
     ======================================================= */

  const filteredTrains =
    useMemo(() => {

      const value =
        search
          .trim()
          .toLowerCase();


      /* No search */

      if (!value) {
        return allTrains;
      }


      return allTrains.filter(
        (train) => {

          return (

            train.number
              ?.toString()
              .toLowerCase()
              .includes(value)

            ||

            train.name
              ?.toLowerCase()
              .includes(value)

            ||

            train.location
              ?.toLowerCase()
              .includes(value)

            ||

            train.route
              ?.toLowerCase()
              .includes(value)

            ||

            train.nextStation
              ?.toLowerCase()
              .includes(value)

          );

        }
      );

    }, [
      allTrains,
      search,
    ]);


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        bg-[#f8f8fa]
      "
    >

      {/* ===================================================
          HEADER
          =================================================== */}

      <header
        className="
          flex
          shrink-0
          flex-wrap
          items-center
          justify-between
          gap-4
          border-b
          border-[#dedfe5]
          bg-white
          px-4
          py-3
          sm:px-5
          lg:px-6
        "
      >

        {/* =================================================
            TITLE
            ================================================= */}

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <TrainFront
              className="
                h-5
                w-5
                shrink-0
                text-[#253f69]
              "
            />

            <h1
              className="
                truncate
                text-lg
                font-semibold
                text-[#202126]
                sm:text-xl
              "
            >
              Live Train Tracking
            </h1>

          </div>


          <p
            className="
              mt-1
              text-xs
              text-gray-500
              sm:text-sm
            "
          >
            Monitor train locations and
            predicted station arrivals.
          </p>

        </div>


        {/* =================================================
            SEARCH
            ================================================= */}

        <div
          className="
            order-3
            w-full
            sm:order-2
            sm:w-auto
          "
        >

          <div
            className="
              relative
              w-full
              sm:w-64
              lg:w-72
            "
          >

            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-gray-400
              "
            />


            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search train, station..."
              aria-label="Search trains and stations"
              className="
                h-9
                w-full
                rounded-full
                border
                border-[#d7d9df]
                bg-[#fafafa]
                pl-10
                pr-10
                text-xs
                text-gray-700
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-300
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
              "
            />


            {search && (

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  rounded-full
                  p-1
                  text-gray-400
                  hover:bg-gray-100
                  hover:text-gray-600
                "
              >

                <X
                  className="
                    h-3.5
                    w-3.5
                  "
                />

              </button>

            )}

          </div>


          {search && (

            <p
              className="
                mt-1
                px-2
                text-[10px]
                text-gray-400
              "
            >
              {filteredTrains.length}{" "}
              {filteredTrains.length === 1
                ? "train"
                : "trains"}{" "}
              found
            </p>

          )}

        </div>


        {/* =================================================
            LIVE STATUS
            ================================================= */}

        <div
          className="
            order-2
            ml-auto
            flex
            shrink-0
            items-center
            gap-2
            sm:order-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-[#e8f8ef]
              px-3
              py-1.5
            "
          >

            <span
              className="
                relative
                flex
                h-2
                w-2
              "
            >

              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-green-400
                  opacity-75
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-green-500
                "
              />

            </span>


            <span
              className="
                hidden
                text-xs
                font-medium
                text-green-600
                sm:inline
              "
            >
              Live Data Connected
            </span>

          </div>


          <div
            className="
              hidden
              rounded-full
              bg-[#f0f1f5]
              px-3
              py-1.5
              text-xs
              font-medium
              text-gray-600
              md:block
            "
          >
            {filteredTrains.length} trains
          </div>


          <div
            className="
              hidden
              rounded-full
              bg-[#f0f1f5]
              px-3
              py-1.5
              text-xs
              text-gray-500
              lg:block
            "
          >
            Updated{" "}

            {lastUpdated.toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            )}

          </div>

        </div>

      </header>


      {/* ===================================================
          MAP
          =================================================== */}

      <main className="min-h-0 flex-1">

        <LiveTrainMap
          trainsOverride={
            filteredTrains
          }
        />

      </main>

    </div>
  );
}