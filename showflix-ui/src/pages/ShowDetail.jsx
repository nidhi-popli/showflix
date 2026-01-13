import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Chip, Box } from "@mui/material";
import Loader from "../components/Loader";
import { getShowDetails } from "../services/api";

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShowDetails(id)
      .then((res) => {
        setShow(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!show) return <p>Show not found</p>;

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          alignItems: "flex-start"
        }}
      >
        {/* POSTER */}
        <Box sx={{ minWidth: 300 }}>
          <Box
            component="img"
            src={
              show.image?.original ||
              show.image?.medium ||
              "https://via.placeholder.com/300x450"
            }
            alt={show.name}
            sx={{
              width: 300,
              height: 450,
              objectFit: "cover",
              borderRadius: 2
            }}
          />
        </Box>

        {/* DETAILS */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {show.name}
          </Typography>

          {show.rating?.average && (
            <Typography sx={{ mb: 2 }}>
              ⭐ Rating: {show.rating.average}
            </Typography>
          )}

          <Box sx={{ mb: 2 }}>
            {show.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                color="error"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Typography sx={{ mb: 1 }}>
            📺 Network: {show.network?.name || "N/A"}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            ⏱ Runtime: {show.runtime || "N/A"} minutes
          </Typography>

          <Typography sx={{ mb: 3 }}>
            📡 Status: {show.status}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>

          <Typography
            sx={{ color: "#cfcfcf", lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: show.summary }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default ShowDetail;
