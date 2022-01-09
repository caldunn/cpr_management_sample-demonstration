import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { LoadingButton } from "@mui/lab";
import { Box, Button, ButtonBase, CardActionArea, Grid, Paper } from "@mui/material";
import GenericSearch from "./generic-search";
import InputAdornments from "../mui/forms/client-form";

function SingleAddress() {

  return (
    <CardActionArea onClick={() => console.log('I AM GLICKED')}>
    <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="CPR Electrical" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="CPR Electrical - CPR"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Welshpool
              </Typography>
              {" — 92-94 Kurnall Rd"}
            </React.Fragment>
          }
        />

          <Button
            onMouseDown={event => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              console.log('site')
            }}
          >
            Sites
          </Button>


    </ListItem>
    </CardActionArea>
  );
}

export default function AlignItemsList() {
  return (
    <>
      <GenericSearch/>
      <Divider variant="fullWidth"/>
      <br />
      <Grid container columnSpacing={2}>
        <Grid item xs={4}>
        <Paper variant={"outlined"}>
          <List sx={{width: '100%', maxWidth: 400, bgcolor: 'background.paper', height: "85vh", overflow: "auto"}}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,19,20,21].map((value) =>
              <React.Fragment key={`client-${value}`}>
                <SingleAddress/>
                <Divider variant="fullWidth" component="li"/>
              </React.Fragment>
            )}
            <Divider variant="fullWidth" component="li"/>
          </List>
        </Paper>
        </Grid>
        <Grid item xs={8}>
        <Paper variant={"outlined"}>
          <InputAdornments />
        </Paper>
          </Grid>
      </Grid>
    </>
  );
}
