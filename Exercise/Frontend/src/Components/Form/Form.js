import React, { useState } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Form.css";

const Form = (props) => {
  const [data, setData] = useState("");
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  const HandleSubmit = async (event) => {
    event.preventDefault();
    const ipaddress = {
      ip: data,
    };
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(ipaddress),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(
        "http://localhost:5006/ipaddress",
        requestOptions
      );
      const jsondata = await response.json();
      setLatitude(jsondata['data'].latitude)
      setlongitude(jsondata['data'].longitude)
    } catch (error) {
      console.log(error);
    }
  };

  const Handler = (event) => {
    setData(event.target.value);
  };

  return (
    <section id="principalForm">
      <form onSubmit={HandleSubmit}>
        <Input
          type="text"
          label="Enter Your IP Address"
          placeholder="Ip Address"
          id="title"
          value={data}
          onChange={Handler}
        />
        <Button type="submit">Get Latitude and Logitude</Button>
      </form>
      <div>
        <h3>The latitude is: { latitude}</h3>
        <h3>The Longitude is: { longitude}</h3>
      </div>
    </section>
  );
};

export default Form;
