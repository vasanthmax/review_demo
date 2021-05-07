import React, { useEffect, useState } from 'react';
import Star from '../assets/star.png';
import Tabletop from 'tabletop';

const Card = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    Tabletop.init({
      key: '1XLpHKgPIxivpTHiOuA1oa1axB-JLsoIOxLO3XTOceb8',
      simpleSheet: true,
    })
      .then((data) => {
        console.log(data);
        setdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className='no-view'>
      {data.map((ch) => {
        const Ratings = [];
        const star = ch.Rating.slice(0, 1);
        for (let i = 0; i < parseInt(star); i++) {
          Ratings.push(<img src={Star} alt='' />);
        }
        return (
          <div className='endorsal-card'>
            {ch.Photo === '' ? (
              ''
            ) : (
              <img src={ch.Photo} alt='' className='avatar' />
            )}
            <div className='rating'>{Ratings}</div>
            <h3 className='name'>{ch.Name}</h3>
            <h4 className='place'>{ch.Position}</h4>
            <p>{ch.Review}</p>
            {ch.Companylogo === '' ? (
              ''
            ) : (
              <img src={ch.Companylogo} alt='' className='logo' />
            )}
            <p className='review'>{`Review for ${ch.Service}`}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
