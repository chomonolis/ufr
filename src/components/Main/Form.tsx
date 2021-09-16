import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';

import { registerMui } from "../../util";

type Props = {
  onSubmit: (event: any) => Promise<void>,
  devices: string[],
};

export type Inputs = {
  fromTime: string,
  toTime: string,
  device: string,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    formControl: {
      minWidth: 120,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

const makeInitialTime = () => {
  const s = new Date();
  s.setHours(0);
  s.setMinutes(0);
  s.setSeconds(0);
  s.setHours(s.getHours() + 9);
  const t = new Date(s);
  t.setDate(s.getDate() + 1);
  const initialFromTime = s.toISOString().substr(0, 16);
  const initialToTime = t.toISOString().substr(0, 16);
  return {initialFromTime, initialToTime};
}

const Form: React.FC<Props> = (props) => {
  const { onSubmit, devices } = props;
  const {initialFromTime, initialToTime} = makeInitialTime();
  const { register, handleSubmit, control } = useForm<Inputs>();
  const classes = useStyles();

  return (
    <>
      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="From Time"
          type="datetime-local"
          defaultValue={initialFromTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          {...registerMui(register("fromTime", {
            required: true,
          }))}
        />
        <TextField
          label="To Time"
          type="datetime-local"
          defaultValue={initialToTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          {...registerMui(register("toTime", {
            required: true,
          }))}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="select-label">Device</InputLabel>
          <Controller
            name="device"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={ ({ field }) => { return (
                <Select {...field}>
                  {devices.map((t, idx) => { return(
                    <MenuItem value={t} key={idx}>{t}</MenuItem>
                  );})}
                </Select>
            );}}
          />
        </FormControl>
        <Button variant="contained" type='submit' color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Form;