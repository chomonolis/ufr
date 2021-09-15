import React from 'react';
import util from "../../util";

type Props = {
  payload: object,
};

const DisplayData = ( props: Props ) => {
  const { payload } = props;
  let humidity: number | undefined = undefined;
  let temperature: number | undefined = undefined;
  let time: string | undefined = undefined;

  if(util.hasProperty(payload, "humidity")) {
    if(typeof payload.humidity === "number") humidity = payload.humidity;
  }
  if(util.hasProperty(payload, "temperature")) {
    if(typeof payload.temperature === "number") temperature = payload.temperature;
  }
  if(util.hasProperty(payload, "time")) {
    if(typeof payload.time === "string") time = payload.time;
  }

  return (
    <>
      <div style={{padding: "10px", display: "flex"}}>
        {time &&
          <div>time:{time}  </div>
        }
        {humidity &&
          <div>humidity:{humidity}  </div>
        }
        {temperature &&
          <div>temperature:{temperature}</div>
        }
      </div>
    </>
  );
}

export default DisplayData
