import React, { useState, useEffect } from 'react';
import './listings.scss';

import Paginate from '../paginate/paginate';

import { StarSaved, Money, Location, Timer } from '../images';
import { useApi } from '../../hooks/useApi';

const MAX_PER_PAGE = 3;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const { get } = useApi();

  const handleSuccess = (res) => {
    const { entries, meta } = res.data;
    setJobs(entries);
    setMeta(meta);
  };

  const fetchJobs = async (page = 1) => {
    await get('jobs', {
      onSuccess: (res) => handleSuccess(res),
      params: {
        'populate[company]': true,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section>
      {jobs.map((job) => {
        return (
          <div className='listing__card'>
            <header className='listing__header'>
              <h1 className='listing__title'>{job.title}</h1>
              <img className='listing__saved' src={StarSaved} alt='' />
              <p className='listing__company'>
                Posted by <span>Koco Media</span>
              </p>
            </header>

            <ul className='listing__items'>
              <li>
                <img src={Money} alt='' />
                <b>Salary negotiable</b>
              </li>
              <li>
                <img src={Location} alt='' />
                Heyes, <b>Uxbridge</b>
              </li>
              <li>
                <img src={Timer} alt='' />
                Contract, full-time
              </li>
            </ul>

            <p className='listing__detail'>
              {job.description} <b>Read more...</b>
            </p>

            <a href='' className='listing__cta'>
              Withdraw application
            </a>
          </div>
        );
      })}

      <Paginate />
    </section>
  );
}
