const startup = {
  //urlBase: 'https://us-central1-irango-62221.cloudfunctions.net/api',
  urlBase: 'http://localhost:5001/irango-62221/us-central1/api',
  getUrl: function (path) {
    return `${this.urlBase}/${path}`;
  }
};

export default startup;
