import React, { useEffect, useState } from 'react';
import Star from '../assets/star.png';
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
        `https://script.google.com/macros/s/AKfycbyS78rJrCu8JKkSw3qt43c047o1uMSM74dy0iYOP0dKO7sAlM0u1TAwCKjTbqBTzK9Ztw/exec?limit=50&offset=${page.toString}`
      )
      .then((lol) => {
        setdata([...data, ...lol.data[0].data]);

        setAll([...data, ...lol.data[0].data]);
        console.log(data);
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
  console.log(data.length);

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
  console.log(data);

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
        {all &&
          all.map((ch, value) => {
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
