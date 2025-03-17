// authService.js
let accessToken = null;
let refreshToken = null;

export const setTokens = (newAccessToken, newRefreshToken) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;

  // Optional: Store tokens in localStorage for persistence
  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('refreshToken', newRefreshToken);
};

export const getAccessToken = () => accessToken || localStorage.getItem('accessToken');
export const getRefreshToken = () => refreshToken || localStorage.getItem('refreshToken');
export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
