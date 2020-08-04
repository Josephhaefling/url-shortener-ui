import React, { Component } from 'react';
import './App.css';
import { getUrls, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []

    }
  }

  removeUrlFromState() {

  }

  async componentDidMount () {
    try {
      const urlsList = await getUrls()
      this.setState({urls: urlsList.urls})
    } catch (error) {
      this.setState({error: error})
    }
  }

  render() {
    return (
        <main data-testid="App" className="App">
        <header data-testid="header">
          <h1 data-testid="title">URL Shortener</h1>
          <UrlForm  />
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
