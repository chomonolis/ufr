import axios from 'axios';
import Config from "../config";
import util from "../util";
import { UserData } from '../App';

export type DynamodbroPostQuery = {
  t_start: string,
  t_end: string,
  device: string,
};

type Response = {
  device_id: string,
  timestamp: number,
  payload: object,
};

export type DynamodbroPostResponse = Array<Response> | undefined;

const api = {
  dynamodbroPost: async ( userData: UserData, query: DynamodbroPostQuery ) => {
    if(query.device === "") return;
    const API_URL = Config.apiUrl;
    const idToken = userData.signInUserSession.idToken.jwtToken;
    const headers = { headers: {
      "Authorization": idToken,
    }, };
    const Object = {
      OperationType: "TDURING",
      Keys: {
        device_id: query.device,
        t_start: query.t_start,
        t_end: query.t_end,
      }
    }
    let res: DynamodbroPostResponse;
    res = undefined;
    await axios.post(API_URL, JSON.stringify(Object), headers)
    .then((r) => {
      const d = r.data;
      if(util.hasProperty(d, "Items")) {
        res = d.Items as Array<Response>;
      }
    }).catch((r) => {
      console.log(r);
    });
    return res;
  }
}

export default api;