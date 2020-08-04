import React from 'react';
import UrlForm from '../UrlForm/UrlForm';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { postUrls } from '../../apiCalls';
jest.mock('../../apiCalls')


describe('UrlForm', () => {

  let urlForm
  let handleSubmit

  beforeEach(() => {
    urlForm = (
      <MemoryRouter>
        <UrlForm postUrls={postUrls}/>
      </MemoryRouter>
    )
  })

  it('should render the url form', () => {

    const { getByTestId, getByText } = render(urlForm)
    const form = getByTestId('form')
    const titleInput = getByTestId('title-input')
    const urlInput = getByTestId('url-input')
    const button = getByText('Shorten Please!')

    expect(form).toBeInTheDocument()
    expect(titleInput).toBeInTheDocument()
    expect(urlInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()

  })

  it('should update the input is added', () => {

    const { getByTestId, getByText } = render(urlForm)
    const titleInput = getByTestId('title-input')
    const urlInput = getByTestId('url-input')

    fireEvent.change(titleInput, { target: { value: "Thing" }})
    fireEvent.change(urlInput, { target: { value: "http://localhost:3001/useshorturl/8"}})

    expect(titleInput).toBeInTheDocument()
    expect(titleInput.value).toEqual("Thing")
    expect(urlInput).toBeInTheDocument()
    expect(urlInput.value).toEqual("http://localhost:3001/useshorturl/8")
  })

  it('should call handleSubmit which the Shorten Please! button is clicked', async() => {
    postUrls.mockResolvedValue({long_url: "https://www.google.com/search?q=how+to+install+rea…qs=chrome.0.0l8.7889j0j7&sourceid=chrome&ie=UTF-8", title: "yo", id: 9, short_url: "http://localhost:3001/useshorturl/9"})
    const { getByTestId, getByText } = render(urlForm)
    const titleInput = getByTestId('title-input')
    const urlInput = getByTestId('url-input')
    const button = getByText('Shorten Please!')

    expect(postUrls).not.toHaveBeenCalled()

    fireEvent.change(titleInput, { target: { value: "Thing" }})
    fireEvent.change(urlInput, { target: { value: "http://localhost:3001/useshorturl/8"}})

    expect(titleInput.value).toEqual("Thing")
    expect(urlInput.value).toEqual("http://localhost:3001/useshorturl/8")

    fireEvent.click(button)

    expect(postUrls).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(titleInput.value).toEqual("")
      expect(urlInput.value).toEqual("")
    })
  })
})
