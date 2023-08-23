export async function getSpecialities() {
  let data = await fetch(`${process.env.REACT_APP_BASE_URL}/specializations`);
  data = await data.json();
  return data;
}

export async function getDoctors() {
  let data = await fetch(`${process.env.REACT_APP_BASE_URL}/doctors`);
  data = await data.json();
  return data;
}

export async function getDoctorDetails(id) {
  let data = await fetch(`${process.env.REACT_APP_BASE_URL}/doctors/${id}`);
  data = await data.json();
  return data;
}
