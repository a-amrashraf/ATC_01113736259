import { BASE_URL, fetchJson, postJson, putJson, deleteRequest } from '/https.js';



export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/user/login`, {  // <-- backticks here
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  return response.json();
}



export async function registerUser(userData) {
  return postJson(`${BASE_URL}/user/register`, userData, false);
}



// =========================
// Events APIs
// =========================

export async function getEvents(params = {}) {
  const query = new URLSearchParams(params).toString();
  return fetchJson(`${BASE_URL}/events/Events?${query}`);
}

export async function getEventById(id) {
  const url = `${BASE_URL}/events/Event/${id}`;
  console.log("Fetching from URL:", url); // Debug
  return fetchJson(url);
}



export async function createEvent(eventData) {
  return postJson(`${BASE_URL}/events/createEvent`, eventData, true);
}

export async function editEvent(id, eventData) {
  return putJson(`${BASE_URL}/events/EditEvent/:${id}`, eventData, true);
}

export async function deleteEvent(id) {
  return deleteRequest(`${BASE_URL}/events/DeleteEvent/:${id}`, true);
}

// =========================
// Bookings APIs
// =========================

export async function bookEvent(eventId) {
  return postJson(`${BASE_URL}/booking/book/:${eventId}`, {}, true);
}

export async function addBooking(bookingData) {
  return postJson(`${BASE_URL}/booking/myBookings`, bookingData, true);
}


// to do
export async function getUserBookingsById(userId) {
  return fetchJson(`${BASE_URL}/user/users/${userId}/bookings`, true);
}

export async function deleteBooking(id) {
  return deleteRequest(`${BASE_URL}/bookings/${id}`, true);
}
