import { useEffect, useState, useRef, useCallback } from "react";
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

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

//helper to remove duplicate shows
const removeDuplicates = (arr) => {
  const map = new Map();
  arr.forEach((s) => {
    if (s?.id && !map.has(s.id)) {
      map.set(s.id, s);
    }
  });
  return Array.from(map.values());
};


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

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const observerRef = useRef(null);

  // Infinite load logic
  const loadMoreShows = useCallback(async () => {
    if (loading || !hasMore) return;

    const letter = LETTERS[pageIndex];
    if (!letter) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const res = await searchShows(letter);
      const newShows = res.data
        .map((i) => i.show)
        .filter(Boolean);

      setShows((prev) =>
        removeDuplicates([...prev, ...newShows])
      );
      setPageIndex((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [loading, hasMore, pageIndex]);

  // initial load
  useEffect(() => {
    loadMoreShows();
  }, [loadMoreShows]);

  // search override
  useEffect(() => {
    if (!search) return;

    setLoading(true);
    searchShows(search)
      .then((res) => {
        setShows(
          removeDuplicates(
            res.data.map((i) => i.show).filter(Boolean)
          )
        );
        setHasMore(false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  // infinite scroll observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreShows();
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMoreShows]);

  // Genres
  const genres = Array.from(
    new Set(shows.flatMap((s) => s?.genres || []))
  );

  const filteredShows = genre
    ? shows.filter((s) => s.genres?.includes(genre))
    : shows;

  // HOME ROW DATA
  const recentlyAdded = filteredShows.slice(0, 10);

  const recommendedShows = [...filteredShows]
    .filter(
      (s) =>
        s.rating?.average >= 7 &&
        s.rating?.average <= 8.5
    )
    .slice(0, 10);

  const trendingShows = [...filteredShows]
    .filter((s) => s.rating?.average)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 10);

  const popularShows = [...filteredShows]
    .sort(
      (a, b) => (b.weight || 0) - (a.weight || 0)
    )
    .slice(0, 10);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        genres={genres}
      />

      <Container maxWidth="xl" sx={{ mt: 2.5 }}>
        <ShowRow
          title="Recently Added"
          shows={recentlyAdded}
        />

        <ShowRow
          title="Recommended For You"
          shows={recommendedShows}
        />

        <ShowRow
          title="Trending Shows"
          shows={trendingShows}
        />

        <ShowRow
          title="Popular Shows"
          shows={popularShows}
        />

        {hasMore && !search && (
          <Box ref={observerRef} sx={{ mt: 3 }}>
            <Loader />
          </Box>
        )}
      </Container>
    </>
  );
}

export default Home;
