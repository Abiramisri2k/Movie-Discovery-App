import { useParams, useNavigate } from "react-router-dom";
import MovieDetails from "../components/MovieDetails.jsx";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <MovieDetails 
      movieId={id}
      onClose={() => navigate('/')}
    />
  );
};

export default MovieDetailsPage;
