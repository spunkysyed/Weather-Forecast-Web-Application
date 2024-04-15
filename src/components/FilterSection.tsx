import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

interface Filter {
  name: string;
}

interface Tfilter {
  name: string;
}

interface FilterSectionProps {
  favourites: string[];
  setTimezoneFilter: React.Dispatch<React.SetStateAction<string>>;
  setCountrynameFilter: React.Dispatch<React.SetStateAction<string>>;
  fetchCitiesWithFilter: (
    timezoneFilter: string,
    countrynameFilter: string
  ) => void;
  fetchCities: () => void;
  setFilterFirst: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  favourites,
  setTimezoneFilter,
  setCountrynameFilter,
  fetchCitiesWithFilter,
  fetchCities,
  setFilterFirst
}) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filterTimezone, setFilterTimezone] = useState<Filter[]>([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/facets?timezone=UTC"
        );
        const data: Filter[] = response.data.facets[1].facets.map(
          (filters: any) => ({
            name: filters.name,
          })
        );
        const data2: Tfilter[] = response.data.facets[2].facets.map(
          (filters: any) => ({
            name: filters.name,
          })
        );
        setFilters(data);
        setFilterTimezone(data2);
      } catch (error) {
        console.error("Error fetching filters:", error);
        navigate(`/error/${404}/${"Error While Fetching API"}`);
      }
    };

    fetchFilters();
  }, [navigate]);

  const handleCountryFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      console.log(`Box Checked ${e.target.value}`);
      setCountrynameFilter(e.target.value);
      setFilterFirst(true);
      fetchCitiesWithFilter("", e.target.value);
    } else {
      setCountrynameFilter("");
      console.log("Box Unchecked");
      fetchCities();
    }
  };

  const handleTimezoneFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setTimezoneFilter(e.target.value);
      setFilterFirst(true);
      fetchCitiesWithFilter(e.target.value, "");
    } else {
      setTimezoneFilter("");
      fetchCities();
    }
  };

  return (
    <>
      <button
        className="text-3xl mb-2 absolute bottom-0 z-10 bg-black text-white rounded-full p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? <RxCross1 /> : <HiOutlineMenuAlt4 />}
      </button>
      {/* Menu content */}
      {isOpen && (
        <>
          <div className="w-full md:w-2/5 lg:w-1/5 h-4/5 rounded-lg flex flex-col pl-3 py-3 overflow-auto absolute backdrop-blur-lg lg:backdrop-blur-3xl">
            <h1 className="w-10/12 text-3xl pb-6 border-b-2">Filters</h1>
            <div className="w-10/12 h-1/4 mt-5 mb-20">
              <h2 className="text-2xl pb-2 mb-3">Country Name</h2>
              <ul className="w-full h-full overflow-auto">
                {filters.map((filter, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={`filter-${index}`}
                      name="country"
                      value={filter.name}
                      onChange={handleCountryFilterChange}
                    />
                    <label htmlFor={`filter-${index}`}>{filter.name}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-10/12 h-1/4">
              <h2 className="text-2xl pb-2 mb-3">Timezone</h2>
              <ul className="w-full h-full overflow-y-auto">
                {filterTimezone.map((filtert, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={`timezone-filter-${index}`}
                      name="timezone"
                      value={filtert.name}
                      onChange={handleTimezoneFilterChange}
                    />
                    <label htmlFor={`timezone-filter-${index}`}>
                      {filtert.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-10/12 h-1/4 mt-20 mb-6">
              <h2 className="text-2xl border-b-2 pb-2 mb-3">Favourites</h2>
              <ul className="w-full h-full overflow-auto">
                {favourites.map((f, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/weather/${f}`);
                    }}
                  >
                    <a href={`/weather/${f}`}>{f}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterSection;
