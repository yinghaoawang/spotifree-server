let wrapper = {
  spot_token: null
};

const getSpotToken = () => {
  return wrapper.spot_token;
};

const setSpotToken = (token) => {
  wrapper.spot_token = token;
};

module.exports = {
  getSpotToken,
  setSpotToken
};
