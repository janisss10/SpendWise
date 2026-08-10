import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  ReceiptLong,
  Analytics,
  AccountBalanceWallet,
  Flag,
  Settings,
  Logout,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import { logoutUser } from "../../services/authService";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: <ReceiptLong />,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <Analytics />,
  },
  {
    label: "Budgets",
    path: "/budgets",
    icon: <AccountBalanceWallet />,
  },
  {
    label: "Goals",
    path: "/goals",
    icon: <Flag />,
  },
];

function Sidebar() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        borderRight: "1px solid",
        borderColor: "divider",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        SpendWise
      </Typography>

      <List>
        {navigationItems.map((item) => (
          <ListItemButton key={item.path} component={NavLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <ListItemButton component={NavLink} to="/settings">
        <ListItemIcon>
          <Settings />
        </ListItemIcon>

        <ListItemText primary="Settings" />
      </ListItemButton>

      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>

        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  );
}

export default Sidebar;
