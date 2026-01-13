import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
  Select,
  Menu
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ search, setSearch, genre, setGenre, genres = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleOpenRegions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRegions = () => {
    setAnchorEl(null);
  };

  const handleRegionClick = (code) => {
    navigate(`/regions/${code}`);
    handleCloseRegions();
  };

  const navButtonStyle = {
    color: "white",
    textTransform: "uppercase",
    fontWeight: 500,
    position: "relative",
    paddingBottom: "6px",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "0%",
      height: "2px",
      backgroundColor: "#ff0000",
      transition: "width 0.3s ease"
    },

    "&:hover::after": {
      width: "100%"
    },

    "&.active::after": {
      width: "100%"
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(to bottom, #1c1c1c, #0f0f0f)"
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        {/* LOGO */}
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: "1.9rem",
            color: "#ff0000",
            mr: 6
          }}
        >
          ShowFlix
        </Typography>

        {/* NAV LINKS */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button
            component={NavLink}
            to="/"
            end
            sx={navButtonStyle}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/streaming"
            sx={navButtonStyle}
          >
            Explore
          </Button>

          {/* REGIONS BUTTON */}
          <Button
            onClick={handleOpenRegions}
            sx={navButtonStyle}
          >
            Regions ▾
          </Button>
        </Box>

        {/* REGIONS DROPDOWN */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseRegions}
          PaperProps={{
            sx: {
              backgroundColor: "#1c1c1c",
              color: "white",
              mt: 1,
              minWidth: 160
            }
          }}
        >
          <MenuItem onClick={() => handleRegionClick("us")}>
            🇺🇸 United States
          </MenuItem>
          <MenuItem onClick={() => handleRegionClick("in")}>
            🇮🇳 India
          </MenuItem>
          <MenuItem onClick={() => handleRegionClick("uk")}>
            🇬🇧 United Kingdom
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        {/* SEARCH */}
        {setSearch && (
          <TextField
            size="small"
            placeholder="Search shows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              backgroundColor: "#1f1f1f",
              borderRadius: 1,
              minWidth: 220,
              mr: 2,
              input: { color: "white" }
            }}
          />
        )}

        {/* GENRE SELECT */}
        {setGenre && (
          <Select
            size="small"
            value={genre}
            displayEmpty
            onChange={(e) => setGenre(e.target.value)}
            renderValue={(selected) =>
              selected === "" ? "Select genre" : selected
            }
            sx={{
              minWidth: 170,
              backgroundColor: "#1f1f1f",
              color: "white",
              borderRadius: 1
            }}
          >
            <MenuItem value="">All genres</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
