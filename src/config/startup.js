const startup = {
  urlBase: 'https://us-central1-irango-62221.cloudfunctions.net/api/',
  getUrl: function (path) {
    return `${this.urlBase}/${path}`;
  }
};

export default startup;
