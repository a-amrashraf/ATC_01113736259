export const BASE_URL = 'http://localhost:5000';

function getHeaders(requiresAuth = false) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = localStorage.getItem('token'); // adjust this if your token is stored elsewhere
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function fetchJson(url, requiresAuth = false) {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(requiresAuth),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GET ${url} failed: ${errorText}`);
  }
  return response.json();
}

export async function postJson(url, data, requiresAuth = false) {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(requiresAuth),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`POST ${url} failed: ${errorText}`);
  }
  return response.json();
}

export async function putJson(url, data, requiresAuth = false) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(requiresAuth),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PUT ${url} failed: ${errorText}`);
  }
  return response.json();
}

export async function deleteRequest(url, requiresAuth = false) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(requiresAuth),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DELETE ${url} failed: ${errorText}`);
  }
  return response.json();
}
