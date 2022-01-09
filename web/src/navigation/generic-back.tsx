import React, { useState } from "react";

import {
  Box,
  Button,
} from "@mui/material";


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function GenericNavigation() {

  return (
    <Box display={"flex"} justifyContent={"space-between"} >

      <Button
        id="demo-customized-button"
        aria-haspopup="true"
        disableElevation
        startIcon={<ArrowBackIosIcon />}
      >
        Back
      </Button>

    </Box>
  );
}