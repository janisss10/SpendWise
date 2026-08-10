import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
