import React, { useState } from 'react'
import {Line} from 'react-chartjs-2'

import { DynamodbroPostResponse } from "../../API/api";

type Props = {
  response: DynamodbroPostResponse,
};

const data ={
  labels: ["Mon","Tue","Wed","Thu","Fir","Sat","Sun"],
  datasets: [
    {
      label: "Demo line plot",
      backgroundColor: "#008080",
      borderColor: "#7fffd4",
      pointBorderWidth: 10,
      data: [5,6,9,15,30,40,80],
    }
  ]
}

const Chart = ( props: Props ) => {
  const { response } = props;
  const itemTypes = useState<string[]>([]);
  

  return (
    <>
      <Line data={data} />
    </>
  )
}

export default Chart;