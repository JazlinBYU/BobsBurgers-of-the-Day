import React, { useState, useEffect } from "react";
import Search from "./Search";
import AddBurgerForm from "./AddBurgerForm";
import BurgerList from "./BurgerList";

function BurgerContainer({ searchInput, setSearchInput }) {
  const [burgers, setBurger] = useState([]);

  const fetchBurgers = () => {
    fetch("http://localhost:3001/burgers")
      .then((res) => res.json())
      .then((burgers) => setBurger(burgers));
  };

  useEffect(() => {
    fetchBurgers();
  }, []);

  const addBurger = (burger) => {
    const newBurger = { ...burger, isNew: true };
    fetch("http://localhost:3001/burgers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBurger),
    })
      .then((res) => res.json())
      .then((newBurger) => {
        setBurger([...burgers, newBurger]);
      })
      .then(() => {
        fetchBurgers();
      });
  };

  useEffect(() => {
    fetch("http://localhost:3001/burgers")
      .then((res) => res.json())
      .then(setBurger);
  }, []);

  function handleDeleteBurger(burgerId) {
    fetch(`http://localhost:3001/burgers/${burgerId}`, {
      method: "DELETE",
    })
      .then(() => fetchBurgers())
      .catch((error) => {
        console.error("Failed to delete");
      });
  }

  return (
    <div>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <BurgerList
        burgers={burgers}
        searchInput={searchInput}
        deleteBurger={handleDeleteBurger}
      />
      <AddBurgerForm addBurger={addBurger} />
    </div>
  );
}

export default BurgerContainer;
