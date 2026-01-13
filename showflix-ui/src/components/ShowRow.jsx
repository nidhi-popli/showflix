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
        backgroundColor: "#1a1a1a",
        borderRadius: 2,
        overflow: "hidden",          
        flexShrink: 0,
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.25s ease",
        "&:hover": {
          transform: "scale(1.05)"
        }
      }}
    >
      {/* POSTER */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",        
          height: 260
        }}
      >
        <CardMedia
          component="img"
          image={
            show.image?.medium ||
            "https://via.placeholder.com/210x295?text=No+Image"
          }
          alt={show.name}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover"
          }}
        />

        {/* HOVER OVERLAY */}
        <Box
          className="showcard-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            opacity: 0,
            transition: "opacity 0.25s ease",
            overflow: "hidden"        
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: 600,
              minWidth: 70,
              "&:hover": { backgroundColor: "#e6e6e6" }
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
              color: "white",
              minWidth: 70,
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main"
              }
            }}
          >
            ℹ Details
          </Button>
        </Box>
      </Box>

      {/* TITLE */}
      <CardContent
        sx={{
          px: 1.2,
          py: 1,
          overflow: "hidden"        
        }}
      >
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 600,
            lineHeight: 1.3,
            height: "2.6em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical"
          }}
        >
          {show.name}
        </Typography>
      </CardContent>

      {/* HOVER EFFECT */}
      <style>
        {`
          .MuiCard-root:hover .showcard-overlay {
            opacity: 1;
          }
        `}
      </style>
    </Card>
  );
}

export default ShowCard;
