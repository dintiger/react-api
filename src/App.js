import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { CreateContact } from "./create-contact";

function App() {
  const [contactList, setContactList] = useState([]);
  const [catFacts, setCatFacts] = useState([]);
  const [catBreeds, setCatBreeds] = useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCatFactLoading, setIsCatFactLoading] = React.useState(false);
  const [isCatBreedsLoading, setIsCatBreedsLoading] = React.useState(false);

  function getContactList() {
    setIsLoading(true);
    try {
    
      setTimeout(async () => {
        const response = await axios.get(
          "https://malay-contact-list.onrender.com/api"
        );
        setContactList(response.data.contactBookList);
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  async function getCatFacts() {
    try {
      setIsCatFactLoading(true);
      const response = await axios.get("https://catfact.ninja/facts");
      setCatFacts(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsCatFactLoading(false);
    }
  }
  async function getCatBreeds(currentPage = 1) {
    try {
      setIsCatBreedsLoading(true);
      const response = await axios.get(
        `https://catfact.ninja/breeds?page=${currentPage}`
      );
      console.log(response.data);
      setCatBreeds(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsCatBreedsLoading(false);
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={getContactList}>Get contacts</button>
        <CreateContact />
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            contactList.map((contact) => (
              <div key={contact.id}>
                {contact.firstName} {contact.lastName}
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <nav>
          <button onClick={getCatFacts}>Get Cat Facts</button>
        </nav>
        <div>
          {isCatFactLoading ? (
            <Loading />
          ) : (
            catFacts.map((catFact) => (
              <div key={catFact.length}>{catFact.fact}</div>
            ))
          )}
        </div>
      </div>
      <div>
        <nav>
          <button
            disabled={!catBreeds}
            onClick={async () => {
              const prevPageNumber = catBreeds.current_page - 1;
              const isDisabled = prevPageNumber !== catBreeds.from;
              if (isDisabled) {
                await getCatBreeds(prevPageNumber);
              }
            }}
          >
            Prev
          </button>
          <button onClick={getCatBreeds}>Get Cat Facts</button>
          <button
            disabled={!catBreeds}
            onClick={async () => {
              const nextPageNumber = catBreeds.current_page + 1;
              const isDisabled = nextPageNumber > catBreeds.last_page;
              if (!isDisabled) {
                await getCatBreeds(nextPageNumber);
              }
            }}
          >
            Next
          </button>
        </nav>
        <div>
          {catBreeds && catBreeds.data ? (
            catBreeds.data.map((catFact) => (
              <div key={catFact.breed}>{catFact.breed}</div>
            ))
          ) : isCatBreedsLoading ? (
            <Loading />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return <div className="App">asking the oracle for the details....</div>;
}

export default App;
