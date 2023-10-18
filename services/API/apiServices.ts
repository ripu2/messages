import { APIServiceType } from "./types";
import { useCallback } from "react";

const axios = require('axios');


let apiService: APIServiceType

export class APIService {
  private readonly client
  constructor() {
    const options = {
      url: 'https://mapi.harmoney.dev/api/v1/messages/',
      headers: {
        "Authorization": "n5Vpg1xAG3PtxKg7",
        'content-type': 'application/json',
      }
    };

    this.client = options
  }
  
  get = async(params?: any) => {
    try {
      const response = await axios.request({
        ...this.client,
        method: 'GET',
        params: params,
      });
     return (response.data);
    } catch (error) {
      console.error(error);
    }
  };
  post = async(params: any) => {
    try {
      const response = await axios.request({
        ...this.client,
        body:{"text": 'hello man 2'},
        method: 'POST',
      });
      return (response.data);
    } catch (error) {
      console.error(error);
    }
  };

  delete = async(params: any) => {
    try {
      const response = await axios.request({
        ...this.client,
        url: `${this.client.url}${params}/`,
        method: 'DELETE',
      });
      return (response.data);
    } catch (error) {
      console.error(error);
    }
  };

}


apiService = new APIService();
export  {apiService};