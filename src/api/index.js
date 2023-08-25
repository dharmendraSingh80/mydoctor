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
