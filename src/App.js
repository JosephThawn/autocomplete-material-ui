import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useGetCountriesQuery } from "./countriesApi";

function App() {
  const { data: countriesData, isLoading } = useGetCountriesQuery();
  const [inputValue, setInputValue] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const [addedCountries, setAddedCountries] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // New state for typing loading

  //load added countries from local storage on mount
  useEffect(() => {
    const savedCountries = localStorage.getItem("addedCountries");
    if (savedCountries) {
      setAddedCountries(JSON.parse(savedCountries));
    }
  }, []);

  // Extract country names from the API data
  const countryNames = countriesData
    ? countriesData.map((country) => country.name.common)
    : [];

  // Combine API countries with manually added countries
  const countries = [...countryNames, ...addedCountries];

  // Handle input change
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const isNewCountry =
      newInputValue !== "" && !countries.includes(newInputValue);
    setShowAddButton(isNewCountry);
    setIsTyping(isNewCountry); // Set typing loading if it's a new country
  };

  // Handle adding a new country
  const handleAddCountry = () => {
    if (inputValue && !countries.includes(inputValue)) {
      const newAddedCountries = [...addedCountries, inputValue];
      setAddedCountries(newAddedCountries);
      // Save the new list of added countries to local storage
      localStorage.setItem("addedCountries", JSON.stringify(newAddedCountries));
      setInputValue("");
      setShowAddButton(false);
      setIsTyping(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Autocomplete
        freeSolo
        options={countries || []}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Select or add a new country" />
        )}
      />
      {isTyping && (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            marginTop: "10px",
          }}
        >
          <CircularProgress size={20} color="secondary" />
        </div>
      )}
      {showAddButton && (
        <Button
          variant="contained"
          onClick={handleAddCountry}
          style={{ marginTop: "10px" }}
        >
          Create New Country
        </Button>
      )}
    </div>
  );
}

export default App;
//Aside from localStoargem what are the menthods and tools I canuse to persist the newly added countires in this application.
//Redux-persist would be ideal
//Cache Api and others etc...
