export async function getSpecialities() {
  let data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/specializations?$limit=100&$sort[name]=1`
  );
  data = await data.json();
  return data;
}

export async function getDoctors() {
  let data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/doctors?$limit=56&$skip=0`
  );
  data = await data.json();
  return data;
}

export async function getDoctorDetails(id) {
  let data = await fetch(`${process.env.REACT_APP_BASE_URL}/doctors/${id}`);
  data = await data.json();
  return data;
}

export async function getNumbersOfSlots(id) {
  const currentTime = new Date().toISOString();
  const queryParams = new URLSearchParams({
    doctorId: id,
    "startTime[$gte]": currentTime,
    "$sort[startTime]": 1,
  });
  const url = `${
    process.env.REACT_APP_BASE_URL
  }/slots?${queryParams.toString()}`;

  let response = await fetch(url);
  response = await response.json();
  return response;
}

export async function getDoctorsBySpeciality(speciality, name = "") {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const endpoint = "/doctors";

  // Create an object to hold the query parameters
  const queryParamsObj = {
    $limit: -1,
    $skip: 0,
    speciality: speciality,
  };

  // Add the name parameter only if it's provided
  if (name) {
    queryParamsObj.name = name;
  }

  const queryParams = new URLSearchParams(queryParamsObj);

  const url = `${baseUrl}${endpoint}?${queryParams}`;
  let data = await fetch(url);
  data = await data.json();
  return data;
}

export async function checkIfExists(searchParam, type) {
  let data = await fetch(
    `${process.env.REACT_APP_BASE_URL}/accounts?${type}=${searchParam}`
  );
  data = await data.json();
  return data;
}

export async function signUpPatient(data) {
  try {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function signUpDoctor(data) {
  try {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function userLogin(data) {
  try {
    let strategy = "local";
    if (data.contactNumber) {
      strategy = "local-mobile";
    }
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/authentication`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, strategy: strategy }),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default async function patientAppointment(id, accessToken) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointments?patientId=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function uploadPatientImage(data, id, accessToken) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/patients/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }
    );
    response = await response.json();
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getPatientImage(id, accessToken) {
  const queryParams = new URLSearchParams({
    avatar: 1,
    "$select[]": "avatarId",
  });
  let response = await fetch(
    `${
      process.env.REACT_APP_BASE_URL
    }/patients/${id}?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  response = await response.json();
  return response;
}

export async function getPatient(id, accessToken) {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/patients/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  response = await response.json();
  return response;
}

export async function updatePatientData(data, id, accessToken) {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/patients/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  response = await response.json();
  return response;
}

export async function makePayment(data, accessToken) {
  let response = await fetch(`${process.env.REACT_APP_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  response = await response.json();
  return response;
}

export async function getDocotor(id, accessToken) {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/doctors/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  response = await response.json();
  return response;
}

export async function updateDoctorData(data, id, accessToken) {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/doctors/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  response = await response.json();
  return response;
}

export async function uploadDoctorImage(data, id, accessToken) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/doctors/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }
    );
    response = await response.json();
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getDoctorImage(id, accessToken) {
  const queryParams = new URLSearchParams({
    avatar: 1,
    "$select[]": "avatarId",
  });

  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_BASE_URL
      }/doctors/${id}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor image:", error);
    throw error;
  }
}

export async function addSlots(data, accessToken) {
  let response = await fetch(`${process.env.REACT_APP_BASE_URL}/slots`, {
    method: "Post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  response = await response.json();
  return response;
}

export async function forgetPassword(data) {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/authManagement`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  response = await response.json();
  return response;
}
