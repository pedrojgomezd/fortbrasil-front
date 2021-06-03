import React from "react";
import AlgoliaPlaces from "algolia-places-react";

const SearchInput = ({ onChange }) => {
  return (
    <div className="p-4 bg-gray-500 justify-center  flex">
      <div className="w-96">
        <AlgoliaPlaces
          placeholder="Procupar por endereco"
          options={{
            appId: "pl49XC8IADGG",
            apiKey: "a4c7d238fd2b9ea964dfd26a720c4134",
            language: "pt",
            countries: ["br"],
            type: "city",
          }}
          onChange={({ rawAnswer, query, suggestions }) =>
            onChange(rawAnswer.hits[0].locale_names[0])
          }
          onLimit={({ message }) =>
            console.log("Fired when you reached your current rate limit.")
          }
        />
      </div>
    </div>
  );
};

export default SearchInput;
