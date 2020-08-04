import React from 'react';
import UrlContainer from './UrlContainer/UrlContainer';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('UrlContainer', () => {

  let urlContainer
  let urls
  beforeEach(() => {

    urls = (
      [
        {
          long_url: "import React from 'react'; import App from './App'…ualMovieData } from '../FetchedData/FetchedData' ",
          title: "otherthing",
          id: 8,
          short_url: "http://localhost:3001/useshorturl/8"}
      ]
    )
    urlContainer = (
      <MemoryRouter>
        <urlContainer  urls={urls}/>
      </MemoryRouter>
    )
  })

  it('should render the UrlContainer to the page', () => {
    const { getByTestId, getByText } = render(urlContainer)
    // const title = getByText("otherthing")
    // const urlContainerElem = getByTestId('anchor-tag')


  })
})
