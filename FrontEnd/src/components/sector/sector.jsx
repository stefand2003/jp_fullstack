import React, { useEffect, useState } from 'react';
import './sector.scss';
import { useApi } from '../../hooks/useApi';
import { Link } from 'react-router-dom';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function sector() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [sectors, setSectors] = useState([]);

  const { get } = useApi();

  const handleSuccess = (res) => {
    const {
      title,
      subTitle,
      sectors: { data: sectorArray },
    } = res.data.data.attributes;

    setTitle(title);
    setSubTitle(subTitle);
    setSectors(sectorArray);
  };

  const fetchHomeSector = async () => {
    await get('home-sector', {
      onSuccess: (res) => handleSuccess(res),
      params: {
        'populate[sectors][populate][categories][populate][jobs]': true,
        'populate[sectors][populate][small_image]': true,
        'populate[sectors][populate][big_image]': true,
        'populate[sectors][limit]': 3,
      },
    });
  };

  useEffect(() => {
    fetchHomeSector();
  }, []);

  return (
    <div className='sector'>
      <h2>{title}</h2>
      <p>{subTitle}</p>

      <div className='sector__types'>
        {sectors.map((sector) => {
          const { title, small_image, big_image, categories } =
            sector.attributes;
          const smallImgUrl = small_image.data.attributes.url;
          const bigImgUrl = big_image.data.attributes.url;
          return (
            <div key={sector.id} className='sector__wrap'>
              <picture className='sector__picture'>
                <source
                  srcSet={`${VITE_BASE_URL}${bigImgUrl}`}
                  media='(min-width: 767px)'
                />
                <source srcSet={`${VITE_BASE_URL}${smallImgUrl}`} />
                <img srcSet={`${VITE_BASE_URL}${smallImgUrl}`} alt='' />
              </picture>
              <div className='sector__name'>{title}</div>
              <ul className='sector__list'>
                {categories.data.map((category) => {
                  const {
                    title,
                    jobs: { data: jobArray },
                  } = category.attributes;

                  return (
                    <li key={category.id}>
                      <Link to={''}>
                        {title}
                        <span> {jobArray.length}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <a href=''>
          <div className='sector__browse'>Browse all sectors</div>
        </a>

        <ul className='sector__mlist'>
          <li>
            <a href=''>
              Accountancy jobs <span>5, 757</span>
            </a>
          </li>
          <li>
            <a href=''>
              Acturial jobs <span>5, 757</span>
            </a>
          </li>
          <li>
            <a href=''>
              Admin, Secretarial jobs <span>5, 757</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
