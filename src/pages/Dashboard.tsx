import { Button, Typography } from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div>
      <Typography variant="h3">Welcome to SpendWise</Typography>

      <Typography>Logged in as: {user?.email}</Typography>

      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
