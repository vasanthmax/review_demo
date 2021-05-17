import React, { useEffect, useState } from 'react';
import Star from '../assets/star.png';
import Tabletop from 'tabletop';
import table from '../assets/table.json';
import axios from 'axios';

const Card = () => {
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const [readMore, setReadMore] = useState();
  useEffect(() => {
    axios
      .get(
        `https://sheetdb.io/api/v1/7puf4ags6dznm?limit=50&offset=${page.toString}`
      )
      .then((lol) => {
        setdata([...data, ...lol.data]);

        setAll([...data, ...lol.data]);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  // data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredData = (filtervalue) => {
    if (filtervalue == 'All') {
      console.log('All');
      setAll(data);
      console.log(data);
    } else {
      const dataValue = data.filter((ch) => ch.Service === filtervalue);
      setAll(dataValue);
    }
  };
  console.log(data);

  // const handleScroll = (e) => {
  //   const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

  // };

  const scrollToend = () => {
    setPage(page + 50);
    console.log(page);
  };
  window.onscroll = function () {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      console.log('scrolling');
      scrollToend();
    }
    // console.log(
    //   Math.ceil(window.innerHeight + document.documentElement.scrollTop),
    //   document.documentElement.offsetHeight
    // );
  };

  return (
    <>
      <div className='filter-bar'>
        <button onClick={() => filteredData('All')}>All</button>
        <button onClick={() => filteredData('Health Insurance')}>Health</button>
        <button onClick={() => filteredData('Car Insurance')}>Motor</button>
        <button onClick={() => filteredData('Personal Insurance')}>
          Marine
        </button>
        <button onClick={() => filteredData('Personal Insurance')}>
          Travel
        </button>
      </div>
      <div className='no-view'>
        {all.map((ch, value) => {
          const Ratings = [];
          const star = ch.Rating.slice(0, 1);
          for (let i = 0; i < parseInt(star); i++) {
            Ratings.push(<img src={Star} alt='' />);
          }
          let read = ch.Review.slice(0, 100);
          const ReadMore = (index) => {
            console.log('isClicked');
            read = ch.Review;
            setReadMore(index);
          };
          return (
            <div className='col'>
              <div className='endorsal-card'>
                {ch.Photo === '' ? (
                  ''
                ) : (
                  <img src={ch.Photo} alt='' className='avatar' />
                )}
                <div className='rating'>{Ratings}</div>
                <h3 className='name'>{ch.Name}</h3>
                <h4 className='place'>{ch.Position}</h4>
                <h3>{ch.Title}</h3>
                {ch.Review === '' ? (
                  ''
                ) : (
                  <p>
                    {readMore === value ? ch.Review : read}
                    <span>
                      {readMore === value ? (
                        ''
                      ) : read.length < 100 ? (
                        ''
                      ) : (
                        <button onClick={() => ReadMore(value)}>
                          Read More
                        </button>
                      )}
                    </span>
                  </p>
                )}
                {ch.Companylogo === '' ? (
                  ''
                ) : (
                  <img src={ch.Companylogo} alt='' className='logo' />
                )}
                <p className='review'>{`Review for ${ch.Service}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
