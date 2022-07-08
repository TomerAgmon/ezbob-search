import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AutoCompleteInput, ResultsList } from "./components";
import styled from "styled-components";
import { mockData } from "./mock-data";
import { useAutoComplete } from "./hooks/use-auto-complete";

const Container = styled.div({
  display: "flex",
  paddingTop: "5rem",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
});

function App() {
  const { autoCompleteResults, handleAutoCompleteInputChanged, searchResults } =
    useAutoComplete(mockData);

  return (
    <Container>
      <img src="./ezbob.png" />
      <AutoCompleteInput
        autoCompleteResults={autoCompleteResults}
        onInputChanged={handleAutoCompleteInputChanged}
      />
      {searchResults.length > 0 ? (
        <ResultsList results={searchResults} />
      ) : null}
    </Container>
  );
}

export default App;
