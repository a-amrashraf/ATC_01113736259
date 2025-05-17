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
  const response = await fetch(`${BASE_URL}/events/CreateEvent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),  
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create event");
  }

  return response.json();
}


export async function editEvent(id, eventData) {
  return putJson(`${BASE_URL}/events/EditEvent/:${id}`, eventData, true);
}

export async function deleteEvent(id) {
  const response = await fetch(`${BASE_URL}/Events/DeleteEvent/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Delete failed");
  }

  return response.json();
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



export async function getUserBookedEvents() {
  const username = localStorage.getItem("username");
  if (!username) throw new Error("No username found");

  try {
    const response = await fetch(`${BASE_URL}/booking/myBookings`, {
      headers: {
        "X-Username": username
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    return response.json();
  } catch (error) {
    console.error("Fetch bookings error:", error);
    throw error;
  }
}



