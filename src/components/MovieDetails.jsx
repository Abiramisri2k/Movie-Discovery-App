import { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, DollarSign, Globe, Play } from 'lucide-react';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `${API_BASE_URL}/movie/${movieId}?language=en-US`,
          API_OPTIONS
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch cast
        const creditsResponse = await fetch(
          `${API_BASE_URL}/movie/${movieId}/credits`,
          API_OPTIONS
        );
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast?.slice(0, 6) || []);

        // Fetch trailer
        const videosResponse = await fetch(
          `${API_BASE_URL}/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const videosData = await videosResponse.json();
        const youtubeTrailer = videosData.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(youtubeTrailer);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  // const posterUrl = movie.poster_path
  //   ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  //   : '/no-movie.png';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
      <div className="min-h-screen relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-300"
        >
          <X size={24} />
        </button>

        {/* Backdrop Image with Gradient */}
        {backdropUrl && (
          <div className="relative h-[500px] w-full">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>
        )}

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 pb-12 -mt-64 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            {/* <div className="flex-shrink-0">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-64 rounded-lg shadow-2xl"
              />
            </div> */}

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
              
              {movie.tagline && (
                <p className="text-gray-400 italic text-xl mb-6">"{movie.tagline}"</p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="text-xl font-semibold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-gray-400">({movie.vote_count} votes)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-400" />
                  <span>{movie.release_date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" />
                  <span>{movie.runtime} min</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-gray-400" />
                  <span>{movie.original_language?.toUpperCase()}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className= "border-1 border-indigo-500/80 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Trailer Button */}
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-8"
                >
                  <Play size={20} fill="white" />
                  Watch Trailer
                </a>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
              </div>

              {/* Additional Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {movie.budget > 0 && (
                  <div>
                    <h3 className="text-gray-400 font-semibold mb-2 flex items-center gap-4">
                      <DollarSign size={18} />
                      Budget
                    </h3>
                    <p className="text-lg">${movie.budget.toLocaleString()}</p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="text-gray-400 font-semibold mb-2 flex items-center gap-4">
                      <DollarSign size={18} />
                      Revenue
                    </h3>
                    <p className="text-lg">${movie.revenue.toLocaleString()}</p>
                  </div>
                )}

                {movie.production_companies?.length > 0 && (
                  <div>
                    <h3 className="text-gray-400 font-semibold mb-2">Production Companies</h3>
                    <p className="text-lg">
                      {movie.production_companies.map(c => c.name).join(', ')}
                    </p>
                  </div>
                )}

                {movie.status && (
                  <div>
                    <h3 className="text-gray-400 font-semibold mb-2">Status</h3>
                    <p className="text-lg">{movie.status}</p>
                  </div>
                )}
              </div>

              {/* Cast */}
              {cast.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {cast.map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : '/no-movie.png'
                          }
                          alt={actor.name}
                          className="w-full aspect-square object-cover rounded-lg mb-2"
                        />
                        <p className="font-semibold text-sm">{actor.name}</p>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;