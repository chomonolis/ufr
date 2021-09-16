import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { DynamodbroPostResponse } from "../../API/api";
import util from "../../util";

type Props = {
  response: DynamodbroPostResponse,
};

type Data = {
  timestamp: number,
  d: number,
}

type GraphData = {
  labels: string[],
  datasets: [{
    label: string,
    backgroundColor: string,
    borderColor: string,
    pointBorderWidth: number,
    data: number[],
  }],
}

// const data:GraphData ={
//   labels: ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"],
//   datasets: [
//     {
//       label: "Demo line plot",
//       backgroundColor: "#008080",
//       borderColor: "#7fffd4",
//       pointBorderWidth: 10,
//       data: [5,6,9,15,30,40,80],
//     }
//   ]
// }

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}),
);

const makeData = (itemMap: Map<string, Data[]>, type: string) => {
  const array = itemMap.get(type);
  if(!array) return undefined;
  const sortedArray = array.sort((l, r) => {
    if(l.timestamp > r.timestamp) return 1;
    if(l.timestamp < r.timestamp) return -1;
    return 0;
  })
  const addArray = Array<Data>();
  const dt = 1000*60*10;
  const bias = 1000*60*3;
  let beforeTime = 0;
  for(const d of sortedArray) {
    while((beforeTime === 0 || d.timestamp < beforeTime + dt + bias) === false) {
      const newData: Data = {
        timestamp: beforeTime+dt,
        d: NaN,
      };
      addArray.push(newData);
      beforeTime = beforeTime + dt;
    }
    addArray.push(d);
    beforeTime = d.timestamp;
  }
  const labels = Array<string>();
  const data = Array<number>();
  for(const d of addArray) {
    const dd = new Date(d.timestamp);
    const str = (dd.getMonth()+1) + "/" + dd.getDate() + " " + dd.getHours() + ":" + dd.getMinutes();
    labels.push(str);
    data.push(d.d);
  }
  const res: GraphData = {
    labels: labels,
    datasets: [{
      label: type,
      backgroundColor: "#008080",
      borderColor: "#7fffd4",
      pointBorderWidth: 10,
      data: data,
    }]
  };
  return res;
}

const Chart = ( props: Props ) => {
  const { response } = props;
  const [itemTypes, setItemTypes] = useState<string[]>([]);
  const [itemMap, setItemMap] = useState<Map<string, Data[]>>();
  const [type, setType] = useState<string>("");
  const [graphData, setGraphData] = useState<GraphData>();
  const classes = useStyles();

  useEffect(()=>{
    if(response === undefined) return ;
    let newMap = new Map<string, Data[]>();
    let initialType = "";
    for(const res of response) {
      for(const key of Object.keys(res.payload)) {
        if(util.hasProperty(res.payload, key)) {
          // console.log("key:", key, typeof res.payload[key], res.payload[key], res.payload);
          if(typeof res.payload[key] !== "number") continue;
          if(initialType === "") {
            initialType = key;
          }
          if(newMap.get(key) === undefined) newMap.set(key, []);
          let newData: Data = {
            timestamp: res.timestamp,
            d: res.payload[key] as number,
          };
          newMap.get(key)?.push(newData);
        }
      }
    }
    setItemMap(newMap);
    setType(initialType);
    setItemTypes([...newMap.keys()]);
  }, [response]);

  useEffect(() => {
    if(itemMap) {
      const newData = makeData(itemMap, type);
      setGraphData(newData);
    }
  }, [itemMap, type]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={handleChange}
        >
          {itemTypes &&
            itemTypes.map((t, idx) => { return(
              <MenuItem value={t} key={idx}>{t}</MenuItem>
            );})
          }
        </Select>
      </FormControl>
      <Line data={graphData} />
    </>
  )
}

export default Chart;