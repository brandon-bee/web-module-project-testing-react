import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");
import Display from './../Display';

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

test('renders without errors with no props', ()=>{
  render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
  fetchShow.mockResolvedValueOnce(showData);

  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const show = await screen.findByTestId(/show-container/i);
  expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
  fetchShow.mockResolvedValueOnce(showData);

  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const seasonOption = await screen.findAllByTestId(/season-option/i);
  expect(seasonOption).toHaveLength(4);
});

test('when fetch button is pressed, displayFunc is called', async () => {
  fetchShow.mockResolvedValueOnce(showData);
  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});