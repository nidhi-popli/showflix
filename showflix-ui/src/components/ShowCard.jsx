import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

function ShowCard({ show }) {
  if (!show) return null;

  return (
    <Card
      sx={{
        width: 180,
        height: 330,                 
        backgroundColor: "#1a1a1a",
        borderRadius: 2,
        cursor: "pointer",
        flexShrink: 0,

        /* 🔥 THIS IS THE KEY */
        overflow: "hidden",

        /* kill any internal scroll */
        "& *": {
          overflow: "hidden"
        },

        transition: "transform 0.25s ease",
        "&:hover": {
          transform: "scale(1.05)"
        },
        "&:hover .overlay": {
          opacity: 1
        }
      }}
    >
      {/* POSTER */}
      <Box sx={{ position: "relative", height: 260 }}>
        <CardMedia
          component="img"
          image={
            show.image?.medium ||
            "https://via.placeholder.com/210x295?text=No+Image"
          }
          alt={show.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />

        {/* HOVER OVERLAY */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            opacity: 0,
            transition: "opacity 0.25s ease"
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: 600
            }}
          >
            ▶ Play
          </Button>

          <Button
            component={Link}
            to={`/show/${show.id}`}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "white",
              color: "white"
            }}
          >
            ℹ Details
          </Button>
        </Box>
      </Box>

      {/* TITLE */}
      <CardContent
        sx={{
          px: 1,
          py: 0.8,
          height: 70,               
          boxSizing: "border-box"
        }}
      >
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 600,
            lineHeight: "1.3",
            height: "2.6em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {show.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ShowCard;
