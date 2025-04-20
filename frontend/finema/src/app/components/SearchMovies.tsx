'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchMovies.module.css';
import Button from '../components/Button';
import MovieCard from '../components/MovieCard';

interface Movie {
  id: number;
  title: string;
  trailerPicture: string;
  synopsis: string;
  director: string;
  producer: string;
  mpaaRating: string;
  cast: string;
  category: string; // Assuming each movie has a category field
}

interface ShowTime {
  id: number;
  movieId: number;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM
}

const categories = ['Action', 'Drama', 'Comedy', 'Mystery', 'Kids', 'Horror', 'Documentary', 'Romance'];

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [filteredResults, setFilteredResults] = useState<Movie[]>([]); // New state for filtered results
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [isCategoryModalOpened, setIsCategoryModalOpened] = useState(false);
  const [isShowDatesModalOpened, setIsShowDatesModalOpened] = useState(false);
  const categoryModalRef = useRef<HTMLDialogElement>(null);
  const showDatesModalRef = useRef<HTMLDialogElement>(null);
  const [showTimesCache, setShowTimesCache] = useState<{ [date: string]: ShowTime[] }>({});
  const [showTimesForDay, setShowTimesForDay] = useState<ShowTime[]>([]); // New state for showtimes

  const sendQuery = async () => {

    try {
      const endpoint = query.trim()
        ? `http://localhost:8080/movies/search?query=${query}` // Search with a limit of 30
        : `http://localhost:8080/movies/all`; // Fetch all movies with a limit of 30
  
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const limitedData = data.slice(0,30); // Limit to 30 results
      setResults(limitedData);
      setFilteredResults(limitedData); // Initialize filteredResults with all search results
      setSelectedCategory(''); // Reset selected category when a new search is made
      setSelectedDate(''); // Reset selected date when a new search is made
      setError('');
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch search results.');
    }
  };

  // Fetch all movies on initial load
  useEffect(() => {
    sendQuery(); // Fetch all movies by default
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const fetchShowTimesForDay = async (date: string) => {
    const showDate = date || getTodayDate(); // Default to today if no date is selected
    if (showTimesCache[showDate]) {
      setShowTimesForDay(showTimesCache[showDate]); // Use cached showtimes if available
      console.log('Using cached showtimes for date:', showDate);
      return;
    }

    try {
      const showTimes = await fetchShowTimesByDate(showDate);
      setShowTimesCache((prev) => ({ ...prev, [showDate]: showTimes })); // Cache the showtimes
      setShowTimesForDay(showTimes);
    } catch (err) {
      console.error('Error fetching showtimes for the day:', err);
      setShowTimesForDay([]); // Clear the showtimes if an error occurs
    }
  };

  useEffect(() => {
    fetchShowTimesForDay(selectedDate); // Fetch showtimes whenever the selected date changes
  }, [selectedDate]);

  const applyFilters = (category: string, date: string) => {
    let filtered = results;
  
    // Apply category filter if a category is selected
    if (category) {
      filtered = filtered.filter((movie) => movie.category === category);
    }
  
    // Apply show date filter if a date is selected
    if (date) {
      const showTimes = showTimesCache[date] || []; // Use cached showtimes if available
      filtered = filtered.filter((movie) =>
        showTimes.some((showTime) => showTime.movieId === movie.id)
      );
    }
  
    setFilteredResults(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(category, selectedDate); // Apply filters when a category is selected
  };

  const fetchShowTimesByDate = async (date: string): Promise<ShowTime[]> => {
    try {
      const response = await fetch(`http://localhost:8080/showtimes/get-by-date?date=${date}`, {
        method: 'GET', // Use GET instead of POST
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch showtimes for the selected date.');
      }
  
      const data = await response.json();
      return data; // Return the fetched showtimes
    } catch (err) {
      console.error('Error fetching showtimes by date:', err);
      setError('No showtimes found for this date.');
      return [];
    }
  };

  const handleShowDateFilter = async (date: string) => {
    setSelectedDate(date);
  
    // Fetch showtimes for the selected date if not already cached
    if (!showTimesCache[date]) {
      const showTimes = await fetchShowTimesByDate(date);
      setShowTimesCache((prev) => ({ ...prev, [date]: showTimes })); // Cache the showtimes
    }
  
    applyFilters(selectedCategory, date); // Apply both filters
  };

  const handleShowDateSearch = () => {
    if (selectedDate) {
      handleShowDateFilter(selectedDate);
      setIsShowDatesModalOpened(false); // Close the modal after filtering
    } else {
      alert('Please select a date.');
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDate('');
    setFilteredResults(results); // Reset to the full search results
  };

  useEffect(() => {
    if (isCategoryModalOpened) {
      categoryModalRef.current?.showModal();
      document.body.classList.add('modal-open');
    } else {
      categoryModalRef.current?.close();
      document.body.classList.remove('modal-open');
    }
  }, [isCategoryModalOpened]);

  useEffect(() => {
    if (isShowDatesModalOpened) {
      showDatesModalRef.current?.showModal();
      document.body.classList.add('modal-open');
    } else {
      showDatesModalRef.current?.close();
      document.body.classList.remove('modal-open');
    }
  }, [isShowDatesModalOpened]);

  return (
    <section className={styles.main_body}>
      {/* Category Modal */}
      <dialog ref={categoryModalRef} className={styles.dialog}>
        <section className={styles.modal_body}>
          <section className={styles.modal_button}>
            <Button onClick={() => setIsCategoryModalOpened(false)}> X </Button>
          </section>
          <section className={styles.filter_section}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  handleCategoryFilter(category);
                  setIsCategoryModalOpened(false); // Close the modal after filtering
                }}
                type="button"
              >
                {category}
              </Button>
            ))}
          </section>
        </section>
      </dialog>

      {/* ShowDates Modal */}
      <dialog ref={showDatesModalRef} className={styles.dialog}>
        <section className={styles.modal_body}>
          <section className={styles.modal_button}>
            <Button onClick={() => setIsShowDatesModalOpened(false)}> X </Button>
          </section>
          <section className={styles.filter_section}>
            <h2>Select Show Date</h2>
            <input
              type="date"
              className={styles.date_input}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Button onClick={handleShowDateSearch}>Filter</Button>
          </section>
        </section>
      </dialog>

      <h1>Search Movies</h1>
      <section>
        <input
          type="text"
          className={styles.search_section}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <Button onClick={sendQuery}>Go</Button>
      </section>
      <section className={styles.active_filters}>
        <h2>Active Filters:</h2>
        {query && <p>Title: {query}</p>}
        {selectedCategory && <p>Category: {selectedCategory}</p>}
        {selectedDate && <p>Show Date: {selectedDate}</p>}
        {(selectedCategory || selectedDate) && (
          <Button onClick={clearFilters}>Clear Filters</Button>
        )}
      </section>
      <section className={styles.filter_section}>
        <h2> Filter by: </h2>
        <Button onClick={() => setIsCategoryModalOpened(true)}> Categories </Button>
        <Button onClick={() => setIsShowDatesModalOpened(true)}> Show Dates </Button>
      </section>
      <section className={styles.grid_container}>
        {filteredResults.length > 0 ? (
          filteredResults.map((movie: Movie) => (
            <div key={movie.id} className={styles.grid_item}>
              <MovieCard
                name={movie.title}
                source={movie.trailerPicture}
                mpaaRating={movie.mpaaRating}
                movieId={movie.id}
                synopsis={movie.synopsis}
                director={movie.director}
                producer={movie.producer}
                cast={movie.cast}
              />
              <section className={styles.show_times}>
                <h2>Show Times for {selectedDate || getTodayDate()}:</h2>
                {showTimesForDay
                  .filter((showTime) => showTime.movieId === movie.id) // Filter showtimes for this movie
                  .map((showTime) => (
                    <p key={showTime.id}>{showTime.time}</p> // Display only the time
                  ))}
              </section>
            </div>
          ))
        ) : (
          <p className={styles.no_results}>No results</p>
        )}
      </section>
      
    </section>
  );
}