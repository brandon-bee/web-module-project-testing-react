import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const episodeData = {
  id:1,
  image:"https://i.ibb.co/2FsfXqM/stranger-things.png",
  name:"",
  season:1,
  number:1,
  summary:"This is a summary of the current episode.",
  runtime:1
};

const otherEpisodeData = {
  id:1,
  image:null,
  name:"",
  season:1,
  number:1,
  summary:"This is a summary of the current episode.",
  runtime:1
};

test("renders without error", () => {
  render(<Episode episode={episodeData} />);
});

test("renders the summary test passed as prop", ()=>{
  render(<Episode episode={episodeData} />);

  const summary = screen.queryByText(/This is a summary of the current episode./i);

  expect(summary).toBeInTheDocument();
  expect(summary).toHaveTextContent("This is a summary of the current episode.");
  expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", ()=>{
  render(<Episode episode={otherEpisodeData} />);

  const altImage = screen.queryByAltText("https://i.ibb.co/2FsfXqM/stranger-things.png");

  expect(altImage).toBeInTheDocument();
});
