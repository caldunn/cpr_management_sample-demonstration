import React, { useState } from "react";

import CollapsibleTable from "../mui/data-table";
import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import axios from "axios";
import SpanningTable from "../mui/home-table";


export default function NewHome() {
  const [motd, setMotd] = useState('');
  const fetchMessage = async () => {
    let x = await axios.get("http://metaphorpsum.com/paragraphs/2/4")
    console.log(x.data)
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