import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Samurai junior devops social network
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              2025 | React | Material UI | React Router| Hooks| TS | API| made by <Link color="inherit" href="https://github.com/MariaSuz/react-samurai-project">MariaSuz</Link>
            </Typography>           
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};


