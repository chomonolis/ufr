import React, { useState } from 'react';

import { UserData } from "../../App";
import api, { DynamodbroPostQuery, DynamodbroPostResponse } from "../../API/api";
import Chart from "../Chart";
import Form, { Inputs } from "./Form";

type Props = {
  userData: UserData
}

const Main = (props: Props) => {
  const { userData } = props;
  const [respose, setResponse] = useState<DynamodbroPostResponse>();
  const devices: string[] = ["UF_raspberry", "UF_raspberry2"];

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

  const onSubmit = async (data: Inputs) => {
    const from = validateDate(data.fromTime);
    const to = validateDate(data.toTime);
    if(!to || !from) return;
    if(to <= from) return;
    if(data.device === "") return;
    const query: DynamodbroPostQuery = {
      t_start: from,
      t_end: to,
      device: data.device,
    };
    const r = await api.dynamodbroPost(userData, query);
    setResponse(r);
  };
  
  return (
    <>
      <Form onSubmit={onSubmit} devices={devices} />
      <Chart response={respose} />
    </>
  );
}

export default Main;
