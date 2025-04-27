import React, { useState } from "react";
import AddressAutocomplete from "./AddressSelect";
import { useNavigate } from "react-router-dom";
import "../styles/form.css"; // Adjust the path as necessary

function Forms(props: any) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState("");

  const [radio, setradio] = useState({
    selectedOption: "",
    vehicule: "",
    ShoppingStyle: "",
    Otherenergy: "",
    lightonoff: "",
    AC_Heat: "",
    plugin: "",
  });

  const [inputField, setInputField] = useState({
    time: 0,
    distance: 0,
    energyConsomption: 0,
    Housesize: 0,
    Income: 0,
    Expense: 0,
    Address: "",
  });

  const returnToLandingPage = () => {
    navigate("/");
  };

  const returnhome = () => {
    navigate("/home");
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setradio((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(`${name}: ${value}`);
  };

  const inputsHandler = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();

    const { name, value } = event.target;

    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Checkfinish = async () => {
    const requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commuteTime: inputField.time,
        commuteDistance: inputField.distance,
        commuteMethod: radio.vehicule,
        shoppingStyle: radio.ShoppingStyle,
        energyConsumption: inputField.energyConsomption,
        houseSize: inputField.Housesize,
        userLocation: radio.selectedOption,
        Income: inputField.Income,
        Expense: inputField.Expense,
        Otherenergy: radio.Otherenergy,
        lightonoff: radio.lightonoff,
        AC_Heat: radio.AC_Heat,
        plugin: radio.plugin,
      }),
    };
    const response = await fetch("http://localhost:1339/report", requestBody);

    const data = await response.json();
    setUserData(data);
    navigate("/report", { state: { userData: data } });
  };

  return (
    <>
      <div id="navForm">
        <img
          src="src/assets/EnviroActions.png"
          alt="EnviroAction Logo"
          id="logo"
          onClick={returnToLandingPage}
        ></img>
        <button onClick={returnhome}>Home</button>
      </div>

      <div>
        <h1 id="formTitle">About You</h1>
        <div className="scrollable-div">
          <h3>Lifestyle</h3>
          <p>How long do you commute everyday? (in minutes)</p>
          <input
            placeholder="Time"
            type="number"
            name="time"
            onChange={inputsHandler}
          ></input>
          <p>What distance do you usually travel everyday? (in KM)</p>
          <input
            placeholder="Distance"
            type="number"
            name="distance"
            onChange={inputsHandler}
          ></input>
          <p>With which vehicule do you usually travel?</p>
          <label>
            <input
              type="radio"
              value="Car"
              name="vehicule"
              checked={radio.vehicule === "Car"}
              onChange={handleChange}
            />
            Car
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Bicycle"
              name="vehicule"
              checked={radio.vehicule === "Bicycle"}
              onChange={handleChange}
            />
            Bicycle
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Marche"
              name="vehicule"
              checked={radio.vehicule === "Marche"}
              onChange={handleChange}
            />
            Walking
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Transport en commun"
              name="vehicule"
              checked={radio.vehicule === "Transport en commun"}
              onChange={handleChange}
            />
            Public Transport
          </label>
          <br />
          <p>What would you consider your shopping style?</p>
          <label>
            <input
              type="radio"
              value="impulse"
              name="ShoppingStyle"
              checked={radio.ShoppingStyle === "impulse"}
              onChange={handleChange}
            />
            Impulsive
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Moderate"
              name="ShoppingStyle"
              checked={radio.ShoppingStyle === "Moderate"}
              onChange={handleChange}
            />
            Moderate
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Minimal"
              name="ShoppingStyle"
              checked={radio.ShoppingStyle === "Minimal"}
              onChange={handleChange}
            />
            Minimal
          </label>
          <br />
          <h3>Energy</h3>
          <p>On average, how much energy does your house use? (in KW/h)</p>
          <input
            placeholder="KW/h"
            type="number"
            name="energyConsomption"
            onChange={inputsHandler}
          ></input>
          <p>How big is your house? (In square feet)</p>
          <input
            placeholder="sqr/f"
            type="number"
            name="Housesize"
            onChange={inputsHandler}
          ></input>
          <p>What is your address?</p>
          <AddressAutocomplete setAddress={setAddress} address={address} />
          <p>
            Do you use other energy source other than the one provided by the
            city?
          </p>
          <label>
            <input
              type="radio"
              value="yes"
              name="Otherenergy"
              checked={radio.Otherenergy === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="no"
              name="Otherenergy"
              checked={radio.Otherenergy === "no"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          {radio.Otherenergy === "yes" && (
            <div>
              <p>What is this other type of energy?</p>
              <select
                name="selectedOption"
                onChange={handleChange}
                value={radio.selectedOption || ""}
              >
                <option value="">Choose an Option</option>
                <option value="Coal">Coal</option>
                <option value="Solar">Solar</option>
                <option value="Fuel">Fuel</option>
                <option value="Gaz">Gaz</option>
                <option value="Thermal">Thermal</option>
                <option value="Hydroelectricity">Hydroelectricity</option>
                <option value="Wind">WindPower</option>
              </select>
            </div>
          )}
          <h3>Finance</h3>
          <p>What is your yearly income?</p>
          <input
            placeholder="$"
            type="number"
            name="Income"
            onChange={inputsHandler}
          ></input>
          <p>Approximatly, what are your monthly expenses?</p>
          <input
            placeholder="$"
            type="number"
            name="Expense"
            onChange={inputsHandler}
          ></input>
          <h3>Awareness</h3>
          <p>Do you make sure all unused lights are close in your house ?</p>
          <label>
            <input
              type="radio"
              value="yes"
              name="lightonoff"
              checked={radio.lightonoff === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="no"
              name="lightonoff"
              checked={radio.lightonoff === "no"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <p>Do you overuse heating and AC?</p>
          <label>
            <input
              type="radio"
              value="yes"
              name="AC_Heat"
              checked={radio.AC_Heat === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="no"
              name="AC_Heat"
              checked={radio.AC_Heat === "no"}
              onChange={handleChange}
            />
            No
          </label>
          g
          <br />
          <p>Do you leave your electronics always plugged in?</p>
          <label>
            <input
              type="radio"
              value="yes"
              name="plugin"
              checked={radio.plugin === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="no"
              name="plugin"
              checked={radio.plugin === "no"}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <button onClick={Checkfinish}>Done</button>
        </div>
      </div>
    </>
  );
}

export default Forms;
