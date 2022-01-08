import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";

export default function AlignItemsList() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="CPR Electrical" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CPR Electrical"
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
          <Box component={"div"} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100',
          }}>
            <Button onClick={() => window.open("https://www.google.com/maps/place/CPR+Electrical+Services/@-31.991222,115.9576013,17z/data=!3m1!4b1!4m5!3m4!1s0x2a32bebb4342fa25:0x716da3bc5643ad3!8m2!3d-31.991222!4d115.95979")}>
              Directions
            </Button>
          </Box>

        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="RAAF" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="RAAF Base Pearce"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Bullsbrook
                </Typography>
                {" - PEARCE"}
              </React.Fragment>
            }
          />
        </ListItem>

      </List>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="CPR Electrical" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CPR Electrical"
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
          <Box component={"div"} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100',
          }}>
            <Button onClick={() => window.open("https://www.google.com/maps/place/CPR+Electrical+Services/@-31.991222,115.9576013,17z/data=!3m1!4b1!4m5!3m4!1s0x2a32bebb4342fa25:0x716da3bc5643ad3!8m2!3d-31.991222!4d115.95979")}>
              Directions
            </Button>
          </Box>

        </ListItem>

      </List>
    </Box>
  );
}
