import { Search, Bell, Clock3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useTrains } from "../../hooks/useTrains";

export default function Topbar() {
  const { filters, setSearch } = useTrains();

  const [searchValue, setSearchValue] = useState(
    filters.search
  );

  const isTyping = useRef(false);

  /*
   * Debounce local search -> Redux
   */
  useEffect(() => {
    if (!isTyping.current) {
      return;
    }

    const timer = setTimeout(() => {
      setSearch(searchValue);
      isTyping.current = false;
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, setSearch]);

  /*
   * Synchronize Redux -> local input.
   *
   * This is useful if another component changes
   * the search value.
   */
  useEffect(() => {
    if (!isTyping.current) {
      setSearchValue(filters.search);
    }
  }, [filters.search]);

  const handleSearchChange = (event) => {
    isTyping.current = true;
    setSearchValue(event.target.value);
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#dedfe5] bg-white px-4 sm:px-5 lg:px-6">

      {/* SEARCH */}

      <div className="relative w-full max-w-xs">
        <Search
          className="
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
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search trains, stations..."
          aria-label="Search trains and stations"
          className="
            h-9
            w-full
            rounded-full
            border
            border-[#d7d9df]
            bg-[#fafafa]
            pl-10
            pr-4
            text-xs
            text-gray-700
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-blue-300
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </div>

      {/* RIGHT SIDE */}

      <div className="ml-4 flex shrink-0 items-center gap-2 sm:gap-4">

        {/* LIVE CONNECTION */}

        <div className="flex items-center gap-2 rounded-full bg-[#f0f1f5] px-3 py-1.5">
          <span
            className="h-2 w-2 rounded-full bg-green-500"
            aria-hidden="true"
          />

          <span className="hidden text-xs font-medium text-gray-600 sm:inline">
            Live Data Connected
          </span>
        </div>

        {/* NOTIFICATIONS */}

        <button
          type="button"
          aria-label="Notifications"
          className="
            rounded-md
            p-1.5
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* CLOCK */}

        <button
          type="button"
          aria-label="Clock"
          className="
            hidden
            rounded-md
            p-1.5
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
            sm:block
          "
        >
          <Clock3 className="h-5 w-5" />
        </button>

        {/* USER */}

        <button
          type="button"
          aria-label="User profile"
          className="
            h-8
            w-8
            shrink-0
            rounded-full
            border
            border-gray-300
            bg-gray-200
            transition
            hover:ring-2
            hover:ring-gray-200
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
          "
        />
      </div>
    </header>
  );
}