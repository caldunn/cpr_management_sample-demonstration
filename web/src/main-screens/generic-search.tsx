import React, { useState } from "react";
import fuzzysort from "fuzzysort";
import {
  Box,
  Button,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  TextField,
} from "@mui/material";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


export default function GenericSearch() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  //@ts-ignore
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box display={"flex"} justifyContent={"space-between"} >
      <TextField id="data-search"
                 label="Search"
                 variant="outlined"
                 disabled={false}
                 onChange={() => console.log("Abc")}
      />
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
      >
        Search
      </Button>

      <Button
        id="demo-customized-button"
        aria-haspopup="true"
        disableElevation
        onClick={handleClick('bottom-start')}
      >
        Options
      </Button>

      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <CheckboxList />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>


    </Box>
  );
}
function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}