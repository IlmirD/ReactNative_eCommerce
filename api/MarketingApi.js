import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { GetToken } from '../asyncstorage/GetToken';

function MarketingApi () {
    // fetching Marketing from api
    const [Data, SetData] = useState({
        isLoading: true,
        data: null,
      });
      
    useEffect(() => {
    SetData({ isLoading: true})
    
      async function Marketing(){
        let token = await GetToken();
        axios.get('http://192.168.0.101:8000/api/mobile/marketing_category', {
        headers: {
            Authorization: 'Token ' + token
        }})
        .then(res => {
          SetData({
              isLoading: false,
              data: res.data.results
            });
        })
        .catch(function (error) {
        console.log(error);
        });
      }
      Marketing();
      
    }, [SetData]);
  
    let data = Data.data;

    return data;
}
export { MarketingApi };