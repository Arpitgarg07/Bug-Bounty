// Shared auth helper for talking to the Bug Bounty backend API.
const API_BASE_URL = "http://localhost:4000/api/v1";

const AUTH_STORAGE_KEYS = {
  accessToken: "bb_access_token",
  refreshToken: "bb_refresh_token",
  user: "bb_user",
};

function saveSession(data) {
  localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, data.tokens.accessToken);
  localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, data.tokens.refreshToken);
  localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(data.user));
}

function getAccessToken() {
  return localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);
}

function getUser() {
  const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.user);
  return userStr ? JSON.parse(userStr) : null;
}

function isAuthenticated() {
  return !!getAccessToken();
}

function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
  localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
  localStorage.removeItem(AUTH_STORAGE_KEYS.user);
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}

// Redirect to login if not authenticated (for protected pages)
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Redirect to discover if already authenticated (for login/signup pages)
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = 'discover.html';
  }
}

async function apiRequest(path, options = {}) {
  const headers = Object.assign(
    { "Content-Type": "application/json" },
    options.headers || {}
  );

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok || !body || body.success === false) {
    // If unauthorized, clear session and redirect to login
    if (response.status === 401) {
      clearSession();
      window.location.href = 'login.html';
      return;
    }

    const message = body && body.error && body.error.message
      ? body.error.message
      : "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return body.data;
}

async function registerUser({ name, email, password, confirmPassword }) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });

  saveSession(data);
  return data;
}

async function loginUser({ email, password }) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  saveSession(data);
  return data;
}

async function getCurrentUser() {
  return await apiRequest("/auth/me");
}

// Program API functions
async function getPrograms() {
  return await apiRequest("/program");
}

async function getProgramById(id) {
  return await apiRequest(`/program/${id}`);
}

async function createProgram(data) {
  return await apiRequest("/program", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Report API functions
async function getMyReports() {
  return await apiRequest("/report/my");
}

async function getReportById(id) {
  return await apiRequest(`/report/${id}`);
}

async function createReport(data) {
  return await apiRequest("/report", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function showFormError(form, message) {
  let errorBox = form.querySelector(".form-error");

  if (!errorBox) {
    errorBox = document.createElement("p");
    errorBox.className = "form-error";
    errorBox.style.color = "#e5484d";
    errorBox.style.marginTop = "0.5rem";
    errorBox.style.fontSize = "0.9rem";
    form.appendChild(errorBox);
  }

  errorBox.textContent = message;
}

function clearFormError(form) {
  const errorBox = form.querySelector(".form-error");
  if (errorBox) {
    errorBox.textContent = "";
  }
}
