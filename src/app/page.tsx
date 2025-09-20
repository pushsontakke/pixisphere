"use client";

import { useState, useMemo, useCallback } from "react";
import PhotographerCard from "../components/PhotographerCard";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import { photographers } from "../Data/mockData";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Photographer {
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

interface FilterChangeProps {
  priceRange?: [number, number];
  rating?: number;
  styles?: string[];
  city?: string;
  sort?: string;
}

export interface FilterState {
  priceRange: [number, number];
  rating: number;
  styles: string[];
  city: string;
  sort: string;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    city: "",
    sort: "recent",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState<number>(6);

  const filteredPhotographers = useMemo(() => {
    let result = [...photographers];


    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (photographer) =>
          photographer.name.toLowerCase().includes(query) ||
          photographer.location.toLowerCase().includes(query) ||
          photographer.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    result = result.filter(
      (photographer) =>
        photographer.price >= filters.priceRange[0] &&
        photographer.price <= filters.priceRange[1]
    );


    if (filters.rating > 0) {
      result = result.filter(
        (photographer) => photographer.rating >= filters.rating
      );
    }


    if (filters.styles.length > 0) {
      result = result.filter((photographer) =>
        filters.styles.some((style) => photographer.styles.includes(style))
      );
    }


    if (filters.city) {
      result = result.filter(
        (photographer) => photographer.location === filters.city
      );
    }


    switch (filters.sort) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
      default:
        // Default sort by ID (simulating recently added)
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [photographers, filters, searchQuery]);

  const visiblePhotographers = filteredPhotographers.slice(0, visibleItems);

  const handleFilterChange = useCallback((newFilters: FilterChangeProps) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setVisibleItems(6); // Reset to initial count when filters change
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Maternity Photographers in Bengaluru
        </h1>

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            photographers={photographers}
          />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredPhotographers.length} photographers found
              </p>
              <select
                className="border rounded-md px-3 py-2"
                value={filters.sort}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
              >
                <option value="recent">Recently Added</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePhotographers.map((photographer: Photographer) => (
                <PhotographerCard
                  key={photographer.id}
                  photographer={photographer}
                />
              ))}
            </div>

            {visiblePhotographers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No photographers found matching your criteria
                </p>
              </div>
            )}

            {visiblePhotographers.length < filteredPhotographers.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
