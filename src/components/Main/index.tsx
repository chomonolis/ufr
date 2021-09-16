import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { UserData } from "../../App";
import api, { DynamodbroPostQuery, DynamodbroPostResponse } from "../../API/api";
import Chart from "../Chart";

type Props = {
  userData: UserData
}

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

const Main = (props: Props) => {
  const { userData } = props;
  const {initialFromTime, initialToTime} = makeInitialTime();
  console.log(initialFromTime, initialToTime);
  const [respose, setResponse] = useState<DynamodbroPostResponse>();
  const [fromTime, setFromTime] = useState<string>(initialFromTime);
  const [toTime, setToTime] = useState<string>(initialToTime);
  const [device, setDevice] = useState<string>("");
  const devices: string[] = ["UF_raspberry", "UF_raspberry2"];
  const classes = useStyles();

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const s = event.target.value;
    setFromTime(s);
  };

  const handleChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const s = event.target.value;
    setToTime(s);
  };

  const validateDate = (s: string) => {
    const year = s.substr(0, 4);
    if(year < "2021" || s[4] !== '-') return undefined;
    if("2100" <= year) return undefined;
    let res = year.substr(2, 2);
    res += s.substr(5, 2);
    res += s.substr(8, 2);
    res += s.substr(11, 2);
    res += s.substr(14, 2);
    res += "00";
    return res;
  }

  const handleSubmit = async(event: any) => {
    const from = validateDate(fromTime);
    const to = validateDate(toTime);
    if(!to || !from) return ;
    if(to <= from) return ;
    const query: DynamodbroPostQuery = {
      t_start: from,
      t_end: to,
    };
    const r = await api.dynamodbroPost( userData, query, device );
    setResponse(r);
  };

  const handleDeviceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDevice(event.target.value as string);
  };
  
  return (
    <>
      <form className={classes.container} noValidate>
        <TextField
          label="From Time"
          type="datetime-local"
          defaultValue={initialFromTime}
          onChange={handleChangeFrom}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="To Time"
          type="datetime-local"
          defaultValue={initialToTime}
          onChange={handleChangeTo}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Devices</InputLabel>
          <Select
            value={device}
            onChange={handleDeviceChange}
          >
          {devices.map((t, idx) => { return(
            <MenuItem value={t} key={idx}>{t}</MenuItem>
          );})}
          </Select>
        </FormControl>
      </form>
      <button onClick={handleSubmit}>
        API
      </button>
      <Chart response={respose} />
    </>
  );
}

export default Main;
