import { useCallback, useState, useEffect, useLayoutEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpiryDate, setTokenExpiryDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 120);
    setTokenExpiryDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpiryDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiryDate) {
      const remainingTime = tokenExpiryDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiryDate]);

  useLayoutEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (
      localStorageData &&
      localStorageData.token &&
      new Date(localStorageData.expiration) > new Date()
    ) {
      login(
        localStorageData.userId,
        localStorageData.token,
        new Date(localStorageData.expiration)
      );
    }
  }, [login]);

  return { userId, token, login, logout };
};
