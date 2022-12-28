const APP = {
  API_URL: "https://apigwsit.telkom.co.id:7777",
  // process.env.NODE_ENV === "development"
  //   ? process.env.REACT_APP_API_URL_DEV
  //   : process.env.REACT_APP_API_URL_PROD,
  origin: process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD,
  captchaSiteKey: "6LdGBB8fAAAAAGkk049cP3aVMoTy594ISq8ck1Mx",
};

export default APP;
