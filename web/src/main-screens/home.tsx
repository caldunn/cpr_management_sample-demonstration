import React, { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import axios from "axios";
import SpanningTable from "../mui/home-table";
import { useStore } from "../App";


export default function NewHome() {
  const setTitle = useStore((state => state.setTitle))
  useEffect(() => {
    setTitle("Home")
  }, [])

  const [motd, setMotd] = useState('');
  const fetchMessage = async () => {
    let x = await axios.get("http://metaphorpsum.com/paragraphs/2/4")
    setMotd(x.data)
  }
  return (
      <Stack
        spacing={2}
        alignItems={"center"}
      >
      <SpanningTable />
      <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" >
              Message of the day
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{whiteSpace: 'pre-line'}}>
              {motd}
            </Typography>
          </CardContent>

        <CardActions>
          <LoadingButton
            size="large"
            color="primary"
            loading={false}
            onClick={fetchMessage}
          >
            Generate
          </LoadingButton>
        </CardActions>
      </Card>

      </Stack>

  );
}