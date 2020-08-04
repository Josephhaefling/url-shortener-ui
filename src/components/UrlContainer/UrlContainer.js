import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <div data-testid="url" className="url">
        <h3>{url.title}</h3>
        <a data-testid="anchor-tag" href={url.short_url} target="blank">{url.short_url}</a>
        <p data-testid="long-url">{url.long_url}</p>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
