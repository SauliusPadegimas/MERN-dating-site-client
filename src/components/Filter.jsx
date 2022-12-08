import React, { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from './MainContext';
import MultiRangeSlider from 'multi-range-slider-react';
import DateToAge from './DateToAge';

function Filter() {
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('man');
  const [minAge, set_minAge] = useState(18);
  const [maxAge, set_maxAge] = useState(100);
  const { user, socket, users, setUsers, setFilteredUsers } = useContext(MainContext);

  const handleInput = (e) => {
    set_minAge(e.minValue);
    set_maxAge(e.maxValue);
  };

  useEffect(() => {
    let arr = [];
    arr = users.filter((x) => x.gender === gender);
    arr = arr.filter((x) => DateToAge(x.date) >= minAge);
    arr = arr.filter((x) => DateToAge(x.date) <= maxAge);
    if (city !== '') {
      arr = arr.filter((x) => x.city === city);
    }
    setFilteredUsers(arr);
  }, [city, gender, users, minAge, maxAge]);
  return (
    <div className='filter'>
      <div className='filter__container'>
        <select className='select' value={city} onChange={(e) => setCity(e.target.value)}>
          <option value=''>All Cities</option>
          <option value='New York'>New York</option>
          <option value='Los Angeles'>Los Angeles</option>
          <option value='Vilnius'>Vilnius</option>
          <option value='Kaunas'>Kaunas</option>
        </select>
        <div className='filter__gender'>
          <div className='container'>
            <input
              type='radio'
              id='male'
              defaultChecked
              name='genderRadio'
              className='radio-toggle'
              value='man'
              onChange={(e) => setGender(e.target.value)}
            />
            <label className='gender-label' htmlFor='male'>
              Man
            </label>
          </div>
          <div className='container'>
            <input
              type='radio'
              id='female'
              name='genderRadio'
              className='radio-toggle'
              value='woman'
              onChange={(e) => setGender(e.target.value)}
            />
            <label className='gender-label' htmlFor='female'>
              Female
            </label>
          </div>
        </div>
        <div className='filter__age-label'>
          <h5>min: {minAge}</h5> <h4>AGE</h4> <h5>max: {maxAge}</h5>
        </div>

        <MultiRangeSlider
          ruler='false'
          barInnerColor='rgb(245, 202, 194)'
          min={18}
          max={100}
          step={1}
          minValue={minAge}
          maxValue={maxAge}
          onInput={(e) => {
            handleInput(e);
          }}
        />
      </div>
    </div>
  );
}

export default Filter;
