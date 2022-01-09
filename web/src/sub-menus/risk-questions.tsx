import { Checkbox, FormControlLabel, Grid, Stack } from '@mui/material';
import * as React from 'react';

const options = ['Working with an Apprentice / Trainee', 'Any risk to operation', 'Any risk to yourself or others',
'Working at heights ( 1.5m + )', 'Working near live equipment', 'Working with an EWP', 'Work with restricted access',
'Working near a hazardous area', 'Hot Works', 'Group electrical isolations']

const YNCheckbox = (label: string) => (
  <Grid item key={label} xs={2}>
    <FormControlLabel
      control={<Checkbox/>}
      label={label}
      labelPlacement={"start"}
    />
  </Grid>
);

export default function QuestionStack() {
  return (
    <Grid container rowSpacing={2} columnSpacing={3} columns={{xs: 4}}>

      {options.map(YNCheckbox)}
    </Grid>
  );
}