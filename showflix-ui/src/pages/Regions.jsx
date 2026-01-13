import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ShowCard from "../components/ShowCard";
import Loader from "../components/Loader";
import { getSchedule, searchShows } from "../services/api";


// remove duplicate shows by id
const uniqueById = (arr) =>
  Array.from(new Map(arr.map((s) => [s.id, s])).values());

const REGION_NAMES = {
  us: "United States",
  in: "India",
  uk: "United Kingdom"
};


function ShowRow({ title, shows }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current?.scrollBy({
      left: dir === "left" ? -420 : 420,
      behavior: "smooth"
    });
  };

  if (!shows.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1.2, fontWeight: 600 }}>
        {title}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* LEFT ARROW */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 4,
            top: "50%",
            transform: "translateY(-50%)",
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

            /*  SCROLLBAR FIX */
            overflowX: "hidden",
            overflowY: "hidden",
            height: 340,

            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none" // Chrome / Edge / Safari
            },

            scrollBehavior: "smooth",
            pb: 0.5
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
            right: 4,
            top: "50%",
            transform: "translateY(-50%)",
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

   /*REGIONS PAGE*/


function Regions() {
  const { code } = useParams(); // us | in | uk
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegion() {
      setLoading(true);

      try {
        let data = [];

        // 🇺🇸 United States → live TV schedule
        if (code === "us") {
          const res = await getSchedule("US");
          data = res.data
            .map((item) => item.show)
            .filter(Boolean);
        }

        // 🇮🇳 India / 🇬🇧 UK → catalog search
        else {
          const query =
            code === "in"
              ? "india"
              : code === "uk"
              ? "british"
              : "tv";

          const res = await searchShows(query);
          data = res.data
            .map((item) => item.show)
            .filter(Boolean);
        }

        setShows(uniqueById(data));
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadRegion();
  }, [code]);

     /*Row Data*/
  

  const currentlyAiring = shows.slice(0, 12);

  const top10 = [...shows]
    .filter((s) => s.rating?.average)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 10);

  const recommended = shows
    .filter((s) => s.rating?.average >= 7)
    .slice(0, 12);

  const baseGenres = shows[0]?.genres || [];
  const peopleAlsoWatch =
    baseGenres.length > 0
      ? shows
          .filter((s) =>
            s.genres?.some((g) => baseGenres.includes(g))
          )
          .slice(0, 12)
      : shows.slice(0, 12);

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {REGION_NAMES[code]} Shows
      </Typography>

      {loading ? (
        <Loader />
      ) : (
        <>
          <ShowRow
            title="Currently Airing"
            shows={currentlyAiring}
          />

          <ShowRow
            title="Top 10 TV Shows"
            shows={top10}
          />

          <ShowRow
            title="Recommended For You"
            shows={recommended}
          />

          <ShowRow
            title="People Also Watch"
            shows={peopleAlsoWatch}
          />
        </>
      )}
    </Container>
  );
}

export default Regions;
