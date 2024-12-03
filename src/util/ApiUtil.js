import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

const frameToken = (token) => `Bearer ${token}`;
const frameResponse = (
  reqStatus = 0,
  reqPayLoad = "Invalid request. Please try again later."
) => {
  return {
    status: reqStatus,
    payLoad: reqPayLoad,
  };
};

export const registerApi = async (
  username,
  password,
  emailId,
  firstName,
  lastName,
  phone
) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/signup`;
    const apiResponse = await axios.post(url, {
      username,
      password,
      emailId,
      firstName,
      lastName,
      phone,
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//this function makes an API call to the http:localhost:8080/user/verifay/email in the backend
//this accepts token as a paramater wgich is recived from the verifaction email (that )

export const verifyEmailApi = async (token) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/verify/email`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });

    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

// this function makes an api call to http://localhost:8080/user/login/ to the back end

export const loginApi = async (username, password) => {
  //setting the insital value of status to 0 and payload to "Invalid request.please try again later."
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/login`;
    const apiResponse = await axios.post(url, { username, password });
    if (apiResponse.status === 200) {
      //userdata will consist of the body of the response
      //token is the token we extract from the header- authintication
      const payLoad = {
        userData: apiResponse.data,
        token: apiResponse.headers.authorization, //grant the jwt token
      };
      response = frameResponse(1, payLoad);
    }
    // response= frameResponse(1,)
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//this function makes an API to call to http://localhost:8080/userreset/{emailId}- emailId is passed as path variable
export const forgotPasswordApi = async (email) => {
  //setting the insitial value of state
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/reset/${email}`;
    const apiResponse = await axios.get(url);
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

// this function makes an API call to http://localhost:8080/user/rest
//new password is passed as a request body
// token (we received in the email) is passed into the header under Authorization

export const resetPasswordApi = async (token, password) => {
  // setting the insital value of status to 0 and payload to "invalid request. please try again later"
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/reset`;
    const apiResponse = await axios.post(
      url,
      {
        password,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
export const sessionApi = async (token) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/get`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
export const updatePublicProfileApi = async (
  token,
  bio,
  city,
  country,
  headline,
  picture
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/update/profile`;
    const apiResponse = await axios.post(
      url,
      {
        bio,
        city,
        country,
        headline,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const getOthersFeedsApi = async (token, pageNumber) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds/other/${pageNumber}/5`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const addFeedApi = async (token, content, picture) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds`;
    const apiResponse = await axios.post(
      url,
      {
        content,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
