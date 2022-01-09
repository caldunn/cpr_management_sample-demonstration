import * as React from 'react';
import {
  Box,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  TextField, Checkbox, FormGroup, FormControlLabel, Divider, Typography, Button,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function InputAdornments() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });


  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  //@ts-ignore
  const handleMouseDownPassword = (event: MouseEventHandler<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
      <div>
        <Typography sx={{m: 1}}>Details</Typography>
        <TextField
          label="Client Code"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Client Name"
          id="outlined-start-adornment"
          sx={{m: 1, width: '50ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Phone number"
          id="outlined-start-adornment"
          sx={{m: 1, width: '50ch'}}

          InputProps={{
            startAdornment: <InputAdornment position={"start"}>#</InputAdornment>,
          }}
        />

        <Divider/>
        <Typography sx={{m: 1}}>Location</Typography>
        <TextField
          label="Address 1"
          id="outlined-start-adornment"
          sx={{m: 1, width: '50ch'}}
          InputLabelProps={{shrink: true}}
        />

        <TextField
          label="Address 2"
          id="outlined-start-adornment"
          sx={{m: 1, width: '50ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Suburb"
          id="outlined-start-adornment"
          sx={{m: 1, width: '50ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="State"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Postcode"
          id="outlined-start-adornment"
          sx={{m: 1, width: '25ch'}}
          InputLabelProps={{shrink: true}}
        />

        <Divider/>
        <Typography sx={{m: 1}}>Portal</Typography>
        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormGroup sx={{m: 1, width: "25ch"}}>
          <FormControlLabel
            control={<Checkbox
              inputProps={{'aria-label': 'controlled'}}/>}
            label="Has client portal access"/>
        </FormGroup>
      </div>
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
    </Box>
  );
}
