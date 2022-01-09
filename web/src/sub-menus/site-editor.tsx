import * as React from "react";

import {
  Box,
  BoxProps,
  Button, Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";


function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          CPR Electrical
        </Typography>
        <Typography variant="h5" component="div">
          Welshpool
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          'Headquarters'
        </Typography>
        <Typography variant="body2">
          92 / 94 Kurnall Rd
          <br />
          Door 1
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Google Maps</Button>
      </CardActions>
    </Card>
  );
}

export default function SubClient() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {[1, 2, 3, 4].map(BasicCard)}

      </Box>
    </>
  );

}