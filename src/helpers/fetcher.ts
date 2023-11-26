import { checkAPIAvailability } from "./checkAPIAvailability";

const rates = require('../db.json');

export const fetcher = (url: string, init?: RequestInit) =>
    fetch(url, init).then((res) => res.json());
  
// export    const getRate = (url: string, init?: RequestInit
//         ) => {
//   // Проверяем, доступно ли реальное API
//   const isRealAPIAvailable =asyncawait checkAPIAvailability(); /* Ваш код проверки доступности реального API */

//   if (isRealAPIAvailable) {
//     // Если доступно, делаем реальный запрос к API
//     return fetch(url, init).then((res) => res.json());
//   } else {
//     // Имитируем вызов API с фиктивными данными
//     const fakeData = [
//       {"ccy":"CHF","base_ccy":"UAH","buy":"40.00670","sale":"40.00670"},
//       {"ccy":"CZK","base_ccy":"UAH","buy":"1.56860","sale":"1.56860"},
//       // Другие фиктивные данные...
//     ];
//     return Promise.resolve(fakeData);
//   }
// };


