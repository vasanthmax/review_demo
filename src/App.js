import React, { useEffect, useState } from "react";
import Card from "./components/card";
import Star from "./assets/star.png";
import axios from "axios";
function App() {
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [all, setAll] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filtervalue, setFilterValue] = useState("All");
  useEffect(() => {
    axios
      .get(
        `https://script.google.com/macros/s/AKfycbyS78rJrCu8JKkSw3qt43c047o1uMSM74dy0iYOP0dKO7sAlM0u1TAwCKjTbqBTzK9Ztw/exec`
      )
      .then((lol) => {
        setdata([...data, ...lol.data[0].data]);
        setAll([...data, ...lol.data[0].data]);
        setFilters(lol.data[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const filterCards = () => {
    if (filtervalue === "All") {
      console.log("All");
      setAll(data);
    } else {
      const dataValue = data.filter((ch) => ch.Service === filtervalue);
      setAll(dataValue);
    }
  };
  useEffect(() => {
    filterCards();
  }, [filtervalue, page]);
  console.log(data.length);

  // const scrollToend = () => {
  //   setPage(page + 50);
  //   console.log(page);
  // };
  console.log(page);
  // window.onscroll = function () {
  //   if (
  //     Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     console.log("scrolling");
  //     scrollToend();
  //   }
  // };
  console.log(filters.length);
  const [dropdownlist, setDropdownlist] = useState([]);
  for (let i = 0; i < filters.length; i++) {
    const filterTitle = filters[i].Service;
    if (dropdownlist.findIndex((ch) => ch.Service === filterTitle) === -1) {
      dropdownlist.push({ Service: filterTitle });
    }
  }

  console.log(dropdownlist);
  return (
    <>
      <div className="filter-bar">
        <button>All</button>
        {dropdownlist.map((ns) => {
          return (
            <button onClick={() => setFilterValue(ns.Service)}>
              {ns.Service}
            </button>
          );
        })}
      </div>
      <div className="App">
        {all.map((ch) => {
          const Ratings = [];
          const star = ch.Rating.slice(0, 1);
          for (let i = 0; i < parseInt(star); i++) {
            Ratings.push(<img src={Star} alt="" />);
          }
          return (
            <div className="col">
              <Card
                Photo={ch.Photo}
                Ratings={Ratings}
                Name={ch.Name}
                Position={ch.Position}
                Review={ch.Review}
                Title={ch.Title}
                Companylogo={ch.Companylogo}
                Service={ch.Service}
              ></Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
