import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forms(){
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

    const [radio, setradio] = useState({
        vehicule: "",
        ShoppingStyle: "",
        Otherenergy: "",
        lightonoff: "",
        AC_Heat: "", 
        plugin: ""
    });
    const [inputField, setInputField] = useState({
		time: 0,
		distance: 0,
        energyConsomption: 0,
        Housesize: 0,
        Income: 0,
        Expense: 0
	});

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        
        const { name, value } = e.target;

        setradio((prevState) => ({
			...prevState, 
			[name]: value, 
		}));
    };

    const inputsHandler = (event: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
		event.preventDefault();

		const { name, value } = event.target;

		
		setInputField((prevState) => ({
			...prevState, 
			[name]: value, 
		}));
	};

    const Checkfinish = () => {
        navigate("/report");
    };

    return (

        <div>
            <h1>Tell us a bit about your life</h1>
            <h3>Lifestyle</h3>
            

            <p>How long do you travel per day?</p>
            <input
                placeholder="time"
				type="number"
				name="time"
			    onChange={inputsHandler}
            ></input>


            <p>What is the distance you usaly travel per day in Km?</p>
            <input
                placeholder="Km"
				type="number"
				name="distance"
			    onChange={inputsHandler}
            ></input>


            <p>With which vehicule do you usaly travel?</p>
            <label>
                <input
                    type="radio"
                    value="Car"
                    name="vehicule"
                    checked={radio.vehicule === 'Car'}
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
                    checked={radio.vehicule === 'Bicycle'}
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
                    checked={radio.vehicule === 'Marche'}
                    onChange={handleChange}
                />
                Marche
            </label>

            <br />

            <label>
                <input
                    type="radio"
                    value="Transport en commun"
                    name="vehicule"
                    checked={radio.vehicule === 'Transport en commun'}
                    onChange={handleChange}
                />
                Transport en commun
            </label>

            <br />


            <p>What would you consider your shopping style?</p>
            <label>
                <input
                    type="radio"
                    value="impulse"
                    name="ShoppingStyle"
                    checked={radio.ShoppingStyle === 'impulse'}
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
                    checked={radio.ShoppingStyle === 'Moderate'}
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
                    checked={radio.ShoppingStyle === 'Minimal'}
                    onChange={handleChange}
                />
                Minimal
            </label>

            <br />


            <h3>Energy</h3>
            <p>On average, how much energy does your house use in kW/h?</p>
            <input
                placeholder="KW/h"
				type="number"
				name="energyConsomption"
			    onChange={inputsHandler}
            ></input>


            <p>How big is your house in square feet</p>
            <input
                placeholder="sqr/f"
				type="number"
				name="Housesize"
			    onChange={inputsHandler}
            ></input>


            <p>Where do you live?</p>




            <p>Do you use other source of energy other than the one provided by the city?</p>
            <label>
                <input
                    type="radio"
                    value="yes"
                    name="Otherenergy"
                    checked={radio.Otherenergy === 'yes'}
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
                    checked={radio.Otherenergy === 'no'}
                    onChange={handleChange}
                />
                No
            </label>

            <br />

            {radio.Otherenergy === 'yes' && (
            <div>
                <p>What is this other type of energy?</p>
                <select onChange={handleChange} value={selectedOption}>
                    <option value="">-- Choisir une option --</option>
                    <option value="Caol">Coal</option>
                    <option value="solar">Solar</option>
                    <option value="fuel">Fuel</option>
                    <option value="Gaz">Gaz</option>
                    <option value="Thermal">Thermal</option>
                    <option value="Hydroelectricity">Hydroelectricity</option>
                    <option value="Wind">WindPower</option>

                </select>
            </div>
            )}


            <h3>Finance</h3>
            <p>What is your income per year?</p>
            <input
                placeholder="$"
				type="number"
				name="Income"
			    onChange={inputsHandler}
            ></input>
            

            <p>how much are your expense per mounth?</p>
            <input
                placeholder="$"
				type="number"
				name="Expense"
			    onChange={inputsHandler}
            ></input>


            <h3>Awareness</h3>
            <p>Do you make sure that there is only the lights needed open in your house?</p>
            <label>
                <input
                    type="radio"
                    value="yes"
                    name="lightonoff"
                    checked={radio.lightonoff === 'yes'}
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
                    checked={radio.lightonoff === 'no'}
                    onChange={handleChange}
                />
                No
            </label>

            <br />


            <p>Do you make sure to use as little as possible the AC and the heater of your house? </p>
            <label>
                <input
                    type="radio"
                    value="yes"
                    name="AC_Heat"
                    checked={radio.AC_Heat === 'yes'}
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
                    checked={radio.AC_Heat === 'no'}
                    onChange={handleChange}
                />
                No
            </label>
g
            <br />


            <p>Do you leave your electronics always plug in?</p>
            <label>
                <input
                    type="radio"
                    value="yes"
                    name="plugin"
                    checked={radio.plugin === 'yes'}
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
                    checked={radio.plugin === 'no'}
                    onChange={handleChange}
                />
                No
            </label>

            <br />



            <button onClick={Checkfinish}>Done</button>
        </div>






    );
}
export default Forms