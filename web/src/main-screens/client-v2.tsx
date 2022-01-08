import React, { useState } from "react";
import { Box, BoxProps, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import * as fuzzysort from "fuzzysort";

export interface StandardJob {
  name:        string;
  address:     string;
  latitude:    number;
  longitude:   number;
  maiden_name: string;
  birth_data:  Date;
  phone_h:     string;
  phone_w:     string;
  email_u:     string;
  email_d:     string;
  username:    string;
  password:    string;
  domain:      string;
  useragent:   string;
  ipv4:        string;
  macaddress:  string;
  plasticcard: string;
  cardexpir:   string;
  bonus:       number;
  company:     string;
  color:       string;
  uuid:        string;
  height:      number;
  weight:      number;
  blood:       string;
  eye:         string;
  hair:        string;
  pict:        string;
  url:         string;
  sport:       string;
  ipv4_url:    string;
  email_url:   string;
  domain_url:  string;
}

export default function ClientV2() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchItems = async () => {
    setLoading(true)
    let fItems: Array<StandardJob> = []
    let x = Array.from({length: 10}, (x, i) => i).map(async () => {
      let res = await axios.get("https://api.namefake.com/")
      fItems.push(res.data)
    })
    await Promise.all(x);
    // @ts-ignore
    setItems(fItems)
    setLoading(false)
  }
  const [fuzzyItems, setFuzzyItems] = useState([])
  const updateSearch = (search: string) => {
    setSearchTerm(search)
    let x = fuzzysort.go(search, items, {keys:['name']})
    let y = x.map((x) => x.obj)
    setFuzzyItems(y)
  }
  function RenderItems() {
    if (searchTerm)
      return (<>{fuzzyItems.map(BasicCard)}</>)

    return <>{items.map(BasicCard)}</>
  }

  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 2,
        rowGap: 3,
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      <Stack spacing={2}>
        <TextField id="input-username"
                   label="Search"
                   variant="outlined"
                   disabled={loading}
                   onChange={(event) => updateSearch(event.target.value)}

        />

        <LoadingButton
          size="large"
          color="primary"
          loading={loading}
          onClick={fetchItems}
        >
          Generate Clients
        </LoadingButton>
      </Stack>

      <RenderItems />
    </Box>
  );
}

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

function BasicCard(item: StandardJob) {
  return (
    <Card key={item.uuid} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.address}
        </Typography>
        <Typography variant="body2">
          {item.username}

          <br />
          {`${item.email_u}@${item.email_d}`}
        </Typography>
      </CardContent>
      <Box display={"flex"} justifyContent={"space-around"}>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Directions</Button>
        </CardActions>
      </Box>
    </Card>
  );
}