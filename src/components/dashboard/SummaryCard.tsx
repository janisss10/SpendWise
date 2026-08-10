import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBackground: string;
  iconColor: string;
  children?: ReactNode;
}

function SummaryCard({
  title,
  value,
  icon,
  iconBackground,
  iconColor,
  children,
}: SummaryCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
    >
      <CardContent sx={{ p: 3.5 }}>
        <Stack direction="row" spacing={2.5}>
          {/* Icon */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: iconBackground,
              color: iconColor,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                "& svg": {
                  fontSize: 28,
                },
              }}
            >
              {icon}
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 0.5,
                mb: 1,
              }}
            >
              {value}
            </Typography>

            {children}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
