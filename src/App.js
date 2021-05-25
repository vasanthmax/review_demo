import React, { useEffect, useState } from "react";
import Card from "./components/card";
import Star from "./assets/star.png";
import axios from "axios";
import Tabletop from "tabletop";
function App() {
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [all, setAll] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filtervalue, setFilterValue] = useState("All");
  useEffect(() => {
    Tabletop.init({
      key: "1cEPidFqz355bL5LD058JRPVl-Unmg3nD1pIeQIkcb5c",
      simpleSheet: true,
    })

      .then((lol) => {
        console.log(lol);
        setdata([...lol]);
        setAll([...lol]);
        // setFilters(lol.data[0].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterCards = (value) => {
    if (value === "All") {
      console.log("All");
      setAll(data);
    } else {
      const dataValue = data.filter((ch) => ch.Service === value);
      setAll(dataValue);
    }
  };

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
  // const [dropdownlist, setDropdownlist] = useState([]);
  // for (let i = 0; i < filters.length; i++) {
  //   const filterTitle = filters[i].Service;
  //   if (dropdownlist.findIndex((ch) => ch.Service === filterTitle) === -1) {
  //     dropdownlist.push({ Service: filterTitle });
  //   }
  // }

  // console.log(dropdownlist);
  return (
    <>
      <div className="filter-bar">
        <button
          onClick={() => {
            filterCards("All");
          }}
        >
          All
        </button>
        {data.map((ns) => {
          return (
            <span>
              {ns.Headers === "" ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    filterCards(ns.Headers);
                  }}
                >
                  {ns.Headers}
                </button>
              )}
            </span>
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
