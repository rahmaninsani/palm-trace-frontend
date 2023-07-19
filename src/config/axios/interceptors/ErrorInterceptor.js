const errorInterceptor = (error) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Network Error"));
  }

  return Promise.reject(error);
};

export default errorInterceptor;
