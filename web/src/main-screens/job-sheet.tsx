import React, { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";

import SpanningTable from "../mui/home-table";
import GenericSearch from "./generic-search";


export default function JobSheet() {

  return (
    <Stack
      spacing={2}
    >
      <GenericSearch />
      <SpanningTable />
    </Stack>

  );
}