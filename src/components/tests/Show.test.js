import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const showData = {
  name:"",
  summary:"",
  seasons:[
    {
      id:0,
      name:"",
      episodes:[]
    },
    {
      id:1,
      name:"",
      episodes:[]
    },
    {
      id:2,
      name:"",
      episodes:[]
    },
    {
      id:3,
      name:"",
      episodes:[]
    }
  ]
}

test('renders without errors', ()=>{
  render(<Show show={showData} selectedSeason={"none"} />);
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} selectedSeason={"none"} />);

  const loading = screen.queryByTestId(/loading-container/i);

  expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
  render(<Show show={showData} selectedSeason={"none"} />);

  const seasonOption = screen.queryAllByTestId(/season-option/i);

  expect(seasonOption).toBeTruthy();
  expect(seasonOption).toHaveLength(4);
});

test('handleSelect is called when an season is selected', () => {
  const handleSelect = jest.fn();

  render(<Show show={showData} selectedSeason={"none"} handleSelect={handleSelect} />);

  const select = screen.queryByTestId(/select/i);
  userEvent.selectOptions(select, ["0"]);

  expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={showData} selectedSeason={"none"} />);

  let episodes = screen.queryByTestId(/episodes-container/i);

  expect(episodes).not.toBeTruthy();

  rerender(<Show show={showData} selectedSeason={1} />);

  episodes = screen.queryByTestId(/episodes-container/i);
  
  expect(episodes).toBeTruthy();
});
