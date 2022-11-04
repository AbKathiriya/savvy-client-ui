/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import ConnectWallet from "./connectWallet.component";

const ResponsiveAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ marginBottom: "1em", backgroundColor: "#001E3C" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <img src="/logo.png" alt="logo" style={{ height: "75px" }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
