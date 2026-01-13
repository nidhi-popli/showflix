import { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Navbar from "../components/Navbar";
import ShowCard from "../components/ShowCard";
import Loader from "../components/Loader";
import { searchShows } from "../services/api";

// remove duplicate shows
const removeDuplicates = (arr) =>
  Array.from(new Map(arr.map((s) => [s.id, s])).values());

// Netflix-style reusable row
function ShowRow({ title, emoji, shows }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({
      left: dir === "left" ? -500 : 500,
      behavior: "smooth"
    });
  };

  if (!shows.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 1.2, fontWeight: 600 }}
      >
        {emoji} {title}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* LEFT ARROW */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -10,
            top: "40%",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.85)"
            }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* ROW */}
        <Box
          ref={rowRef}
          sx={{
            display: "flex",
            gap: 1.8,
            overflowX: "hidden",
            pb: 1
          }}
        >
          {shows.map((show) => (
            <Box key={show.id} sx={{ minWidth: 180 }}>
              <ShowCard show={show} />
            </Box>
          ))}
        </Box>

        {/* RIGHT ARROW */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -10,
            top: "40%",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.85)"
            }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function Explore() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load base catalog for explore
  useEffect(() => {
    async function loadExplore() {
      setLoading(true);
      try {
        const responses = await Promise.all(
          ["a", "e", "i", "o", "u"].map((l) =>
            searchShows(l)
          )
        );

        const merged = responses
          .flatMap((r) => r.data.map((i) => i.show))
          .filter(Boolean);

        setShows(removeDuplicates(merged));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    loadExplore();
  }, []);

  // EXPLORE CATEGORIES
  const recommended = [...shows]
    .filter(
      (s) =>
        s.rating?.average >= 7 &&
        s.rating?.average <= 8.5
    )
    .slice(0, 12);

  const bingeWatch = [...shows]
    .filter((s) => s.runtime >= 45)
    .slice(0, 12);

  const dramaShows = [...shows]
    .filter((s) => s.genres?.includes("Drama"))
    .slice(0, 12);

  const thrillerShows = [...shows]
    .filter(
      (s) =>
        s.genres?.includes("Thriller") ||
        s.genres?.includes("Mystery")
    )
    .slice(0, 12);

  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 2.5 }}>
        {/* INTRO – makes Explore feel different */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Explore Shows
          </Typography>
          <Typography sx={{ color: "gray", mt: 0.5 }}>
            Browse by mood, genre & binge categories
          </Typography>
        </Box>

        {loading ? (
          <Loader />
        ) : (
          <>
            <ShowRow
              title="Recommended Picks"
              shows={recommended}
            />

            <ShowRow
              title="Binge Watch"
              shows={bingeWatch}
            />

            <ShowRow
              title="Drama TV Shows"
              shows={dramaShows}
            />

            <ShowRow
              title="Thriller Shows"
              shows={thrillerShows}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default Explore;
