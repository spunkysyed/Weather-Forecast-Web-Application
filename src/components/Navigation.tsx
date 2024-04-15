import React, { useState } from 'react';

interface NavigationProps {
  handleSearch: (query: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ handleSearch }) => {
  const [locationSearch, setLocationSearch] = useState('');

  const handleOnChange =(e: React.KeyboardEvent<HTMLInputElement>)=>{
    let count=1;
    if (e.key === 'Enter' && count===1) {
      handleSearch(locationSearch);
      count++;
    }
  }
  return (
    <nav className="flex bg-blue-300 px-5 flex justify-between items-center gap-36">
      <h1 className="ml-1 text-lg md:text-xl lg:text-3xl font-semibold uppercase">
        <span className="text-white">Weather</span> Forecast
      </h1>
      <div className="pt-6 text-sm flex items-center">
        <input
          type="search"
          placeholder="City/Country/Timezone..."
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          onKeyDown={handleOnChange}
          className="border border-gray-300 rounded px-2 py-1 mb-4 w-3/4"
        />
      </div>
    </nav>
  );
};

export default Navigation;
