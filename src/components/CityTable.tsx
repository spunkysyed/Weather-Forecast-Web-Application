import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Footer from "./Footer";
import FilterSection from "./FilterSection";
import Navigation from "./Navigation";

interface City {
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  population: number;
}

const CityTable: React.FC = () => {
  const [timezoneFilter, setTimezoneFilter] = useState("");
  const [countrynameFilter, setCountrynameFilter] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const navigate = useNavigate();
  const [offset, setOffSet] = useState(0);
  const [filterOffSet,setFilterOffSet]=useState(0)
  const [hasMore, setHasMore] = useState(true);
  const [filterFirst,setFilterFirst]=useState(true);
  const [searchQuery,setSearchQuery]=useState('');
  const [searchTable,setSearchedTable]=useState<City[]>([])
  

  // API CALL TO FETCH TABLE DATA

  const fetchCities = async () => {
    if(!filterFirst){
      setFilterFirst(true);
    }
    try {
      let apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`;
      const response = await axios.get(apiUrl);
      const data: City[] = await response.data.results.map((record: any) => ({
        ascii_name: record.ascii_name,
        cou_name_en: record.cou_name_en,
        timezone: record.timezone,
      }));

      setCities((prevData) => [...prevData, ...data]);
      console.log("fetchCities");

      if (data.length > 0) {
        // If new data is received, update the offset for the next fetch
        setOffSet((prevOffset) => prevOffset + 20);
      } else {
        // If no new data is received, there are no more cities to load
        setHasMore(false);
      }
    
    }
     catch (error) {
      console.error("Error fetching cities:", error);
      navigate(`/error/${404}/${"Error While Fetching API"}`);
    }
  };

  // FilterCitiesWithFilter

  const fetchCitiesWithFilter = async (
    timezoneFilter: string,
    countrynameFilter: string
  ) => {
    if(filterFirst){
    setCities([])
    setHasMore(true)
    setFilterFirst(false);
    }

    try {
        let apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${filterOffSet}`;
        if (timezoneFilter) {
          apiUrl += `&refine=timezone%3A%22${timezoneFilter}%22`;
        }
        if (countrynameFilter) {
          apiUrl += `&refine=cou_name_en%3A%22${countrynameFilter}%22`;
        }
        
        const response = await axios.get(apiUrl);
        const data: City[] = await response.data.results.map((record: any) => ({
          ascii_name: record.ascii_name,
          cou_name_en: record.cou_name_en,
          timezone: record.timezone,
        }));
        console.log("FetchFilteredCities");
        setCities((prevData) => [...prevData, ...data]);
        if (data.length > 0) {
          // If new data is received, update the offset for the next fetch
          setFilterOffSet((prevfilterOffSet) => prevfilterOffSet + 20);
        } else {
          // If no data is received, there are no cities to load
          setHasMore(false);
        }
    } catch (error) {
      console.error("Error fetching cities with filters:", error);
      navigate(`/error/${404}/${"Error While Fetching API"}`);
    }
  };

  if (offset === 0) {
    fetchCities();
  }

  const fetchMoreData = () => {
    if (timezoneFilter || countrynameFilter) {
      fetchCitiesWithFilter(timezoneFilter, countrynameFilter);
    }
     else {
      fetchCities();
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filteredCities = cities.filter(city =>
        city.ascii_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.cou_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.timezone.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedTable(filteredCities);
      setHasMore(false); // Since we're filtering based on search query, there are no more cities to load
    }
  }, [searchQuery, cities]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredTable = cities.filter((f) => f.ascii_name === searchQuery || f.cou_name_en === searchQuery || f.timezone === searchQuery);
      setSearchedTable([...filteredTable]);
    }
    else {
      setSearchedTable([]);
      setHasMore(true)
    }
  };

  return (
    <>
      <div className="w-full h-screen font-mono overflow-x-hidden">
        {/* Navigation Bar */}
        <Navigation handleSearch={handleSearch} />

        {/* Main DIV Containing Table & filter*/}
        <div className="w-full h-screen flex justify-between px-5 py-5 bg-gray-100 ">
          {/* Filter Div */}
          <FilterSection
            favourites={favourites}
            setTimezoneFilter={setTimezoneFilter}
            setCountrynameFilter={setCountrynameFilter}
            fetchCitiesWithFilter={fetchCitiesWithFilter}
            fetchCities={fetchCities}
            setFilterFirst={setFilterFirst}
            
          />

          {/* Table Div */}
          <div
            id="scrollableDiv"
            className=" w-full h-6/7 rounded-lg bg-white overflow-auto border-2 shadow-md shadow-blue-300"
          >
            <InfiniteScroll
              dataLength={cities.length} //This is important field to render the next data
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p className="text-center">
                  <b>All Cities Loaded</b>
                </p>
              }
              scrollableTarget="scrollableDiv"
            >
              <table className="table-auto w-full text-center">
                <thead>
                  <tr className="text-2xl bg-blue-300">
                    <th className="px-1 py-3 ">City Name</th>
                    <th className="px-1 py-3 border-x-2">Country Name</th>
                    <th className="px-1 py-3 ">Timezone</th>
                    <th className="px-1 py-3 border-2">Favourite</th>
                  </tr>
                </thead>
                <tbody>
                {(searchQuery.length > 0 ? searchTable : cities).map((city, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f2f2f2" : "transparent",
                        }}
                      >
                        <td
                          onClick={() => {
                            navigate(`/weather/${city.ascii_name}`);
                          }}
                        >
                          <a href={`/weather/${city.ascii_name}`}>
                            {city.ascii_name}
                          </a>
                        </td>
                        <td className="px-2 py-1 border-x-2">
                          {city.cou_name_en}
                        </td>
                        <td className="px-2 py-1">{city.timezone}</td>

                        <td className="px-2 py-1 border-l-2 ">
                          <button
                            onClick={() => {
                              if (favourites.includes(city.ascii_name)) {
                                setFavourites(
                                  favourites.filter(
                                    (item) => item !== city.ascii_name
                                  )
                                );
                              } else {
                                setFavourites([...favourites, city.ascii_name]);
                              }
                            }}
                          >
                            {favourites.includes(city.ascii_name) ? (
                              <AiFillStar /> // Icon when city is favorite
                            ) : (
                              <AiOutlineStar /> // Icon when city is not favorite
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default CityTable;
