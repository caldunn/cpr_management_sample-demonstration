import React, { useState } from "react";
import { Box, Button, Paper, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HorizontalLinearStepper from "./horizontal-stepper";
import JobDetails from "./jobs/details";
import { useNavigate } from "react-router-dom";

export default function JobMain() {
  const [startJob, setStartJob] = useState(true)
  const [details, setDetails] = useState(false)
  const navigate = useNavigate();

  return (
    <Stack spacing={5}>
      <Box display={"flex"} justifyContent={"center"} >
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
          onClick={() => setDetails(!details)}
        >
          Details
        </Button>
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
        >
          Labour
        </Button>

        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
        >
          Materials
        </Button>
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
        >
          Sign
        </Button>
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
        >
          Job PDF
        </Button>
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          color={"success"}
          disableElevation
          onClick={() => setStartJob(!startJob)}
        >
          View / Start Job
        </Button>
      </Box>

      <Box hidden={startJob}>
        <HorizontalLinearStepper />
      </Box>
      <Box hidden={details}>
        <Paper variant={"outlined"}>
          <JobDetails />
        </Paper>
      </Box>
    </Stack>
  );
}