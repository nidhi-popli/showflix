import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ShowCard from "../components/ShowCard";
import Loader from "../components/Loader";
import { getAllShows } from "../services/api";

function Streaming() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Load first page of shows
    getAllShows(0)
      .then((res) => {
        setShows(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Explore Shows
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(5, 1fr)",
                lg: "repeat(7, 1fr)"
              }
            }}
          >
            {shows
              .filter((show) => show && show.id)
              .map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export default Streaming;
