export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrls = (url, title) => {
  return fetch(
          'http://localhost:3001/api/v1/urls', {
              "method": "POST",
              "headers": {
                  "content-type": "application/json"
              },
              "body": JSON.stringify(
                {
                  long_url: url,
                  title: title
                }
              )
          }
      ).then(response => response.json())
}

export const deleteUrl = () => {
  return fetch('/api/v1/urls/:url_id').then(response => response.json())
}
