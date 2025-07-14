import Cookies from "js-cookie";

const CookieService = {
  set(key, value, days = 30) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    Cookies.set(key, value, { expires: expirationDate });
  },

  get(key) {
    return Cookies.get(key);
  },

  remove(key) {
    Cookies.remove(key);
  },
};

export default CookieService;
