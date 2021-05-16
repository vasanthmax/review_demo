import React, { useEffect, useState } from 'react';
import Star from '../assets/star.png';
import Tabletop from 'tabletop';

const Card = () => {
  const [data, setdata] = useState([]);
  const [all, setAll] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const [readMore, setReadMore] = useState();
  useEffect(() => {
    Tabletop.init({
      // key: params.get('id'),
      key: '1XLpHKgPIxivpTHiOuA1oa1axB-JLsoIOxLO3XTOceb8',
      simpleSheet: true,
    })
      .then((data) => {
        setdata(data);
        setAll(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
