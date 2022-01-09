import * as React from 'react';
import {
  Box,
  InputAdornment,
  TextField, Checkbox, FormGroup, FormControlLabel, Divider, Typography, Button, MenuItem, Modal,
} from '@mui/material';
import {useParams} from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const types = ['Issued', 'Confirmed', 'Awaiting Approval']

export default function JobDetails() {
  const jid = useParams()?.jid

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
      <div>
        <Typography sx={{m: 1}}>Keys</Typography>
        <TextField
          label="Job Number"
          value={jid}
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Sales? Number"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Work Order"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Status"
          variant="outlined"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        >
          {types.map((value) => <MenuItem value={value}>{value}</MenuItem>)}
        </TextField>

        <Divider/>
        <Typography sx={{m: 1}}>Tech</Typography>
        <TextField
          label="Technician"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />

        <TextField
          id="outlined-select-currency"
          select
          label="Add Tech"
          variant="outlined"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        >
          <MenuItem value={"Tech1"}>
            {"tech1"}
          </MenuItem>
          <MenuItem value={"Tech2"}>
            {"tech2"}
          </MenuItem>
          <MenuItem value={"Tech3"}>
            {"tech3"}
          </MenuItem>
        </TextField>
        <BasicModal />

        <Divider/>
        <Typography sx={{m: 1}}>Client and Dates</Typography>
        <TextField
          label="Client"
          id="outlined-start-adornment"
          sx={{m: 1, width: '40ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Site"
          id="outlined-start-adornment"
          sx={{m: 1, width: '40ch'}}
          InputLabelProps={{shrink: true}}
        />
        <Button>Directions</Button>
        <TextField
          label="Date Created"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Due Date"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />

      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Button sx={{m: 1}}
                id="demo-customized-button"
                color={"error"}
                aria-haspopup="true"
                disableElevation
                onClick={() => console.log('bottom-start')}
        >
          Cancel
        </Button>

        <Button sx={{m: 1}}
                id="demo-customized-button"
                color={"success"}
                aria-haspopup="true"
                disableElevation
                onClick={() => console.log('bottom-start')}
        >
          Save
        </Button>
      </Box>
      </div>
    </Box>
  );
}

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Add Tech in Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/*@ts-ignore*/}
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            **SEARCH BAR**
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            LIST OF TECHS
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
