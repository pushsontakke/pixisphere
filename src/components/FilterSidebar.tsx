import { useState, useEffect } from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: Review[];
}

interface FilterState {
  priceRange: [number, number];
  rating: number;
  styles: string[];
  city: string;
  sort: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  photographers: Photographer[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  photographers,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allCities = [...new Set(photographers.map((p) => p.location))];
  const allStyles = [...new Set(photographers.flatMap((p) => p.styles))];

  useEffect(() => {
    setPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ rating: rating === filters.rating ? 0 : rating });
  };

  const handleStyleChange = (style: string) => {
    const newStyles = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];
    onFilterChange({ styles: newStyles });
  };

  const handleCityChange = (city: string) => {
    onFilterChange({ city: city === filters.city ? "" : city });
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 20000],
      rating: 0,
      styles: [],
      city: "",
      sort: "recent",
    });
  };

  return (
    <>
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-between"
        >
          <span>Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isMobileMenuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`
          w-full md:w-64 bg-white p-6 rounded-lg shadow-md
          ${isMobileMenuOpen ? "block" : "hidden md:block"}
          md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:overflow-y-auto
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-3">
            {/* <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            /> */}
            <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600">
              {/* <span>₹{priceRange[0].toLocaleString()}</span> */}
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center ml-2 text-sm text-gray-700 cursor-pointer"
                >
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>& up</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Style</h3>
          <div className="space-y-2">
            {allStyles.map((style) => (
              <div key={style} className="flex items-center">
                <input
                  type="checkbox"
                  id={`style-${style}`}
                  checked={filters.styles.includes(style)}
                  onChange={() => handleStyleChange(style)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`style-${style}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">City</h3>
          <div className="space-y-2">
            {allCities.map((city) => (
              <div key={city} className="flex items-center">
                <input
                  type="checkbox"
                  id={`city-${city}`}
                  checked={filters.city === city}
                  onChange={() => handleCityChange(city)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`city-${city}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                >
                  {city}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
