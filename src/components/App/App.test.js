import React from 'react';
import App from '../App/App';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { getUrls } from '../../apiCalls';
jest.mock('../../apiCalls')

describe('App', () => {

  let appElement

  beforeEach(() => {

    appElement = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  })

  it('should render the app to the page', () => {
    const {getByTestId, getByText, getByRole} = render(appElement)
    const app = getByTestId('App')
    const header = getByTestId('header')
    const title = getByTestId('title')

    expect(app).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  it('Should display no URLs with the initial render', () => {
        const { getByText } = render (
            <MemoryRouter><App /></MemoryRouter>
        )
        const noUrlMessage = getByText('No urls yet! Find some to shorten!')
        expect(noUrlMessage).toBeInTheDocument()
    })

  it('should display urls once it fetches', async () => {
    getUrls.mockResolvedValue({
      urls: [{long_url: "https://www.google.com/search?q=how+to+install+rea…qs=chrome.0.0l8.7889j0j7&sourceid=chrome&ie=UTF-8", title: "yo", id: 9, short_url: "http://localhost:3001/useshorturl/9"}]
    })
    const {getByTestId, getByText, getByRole} = render(<App />)


    await waitFor(() => {
      const title = getByText('yo')
      const shortUrl = getByText("http://localhost:3001/useshorturl/9")

      expect(title).toBeInTheDocument()
      expect(shortUrl).toBeInTheDocument()
    })

  })
})
