import { Typography } from "@mui/material";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Typography variant="h3">Welcome to SpendWise</Typography>

      <Typography>Logged in as: {user?.email}</Typography>
    </div>
  );
}

export default Dashboard;
