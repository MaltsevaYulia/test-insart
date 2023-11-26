import React from "react";

const CurrencyConvertor = () => {
  return (
    <div>
      <form>
        <label>
          <p>Change</p>
          <input />
          <select></select>
        </label>
        <label>
          <p>Get</p>
          <input />
        </label>
      </form>
    </div>
  );
};

export default CurrencyConvertor;

{
  /* <div
  class="currency-option flex items-center py-2 px-4 cursor-pointer"
>
  <img
    src="https://hatscripts.github.io/circle-flags/flags/{{
      codes[currency]
    }}.svg"
    width="48"
    alt="{{ currency }} flag"
    class="h-4 w-4 mr-2 inline-block"
  />
  <span class="currency-name">{ currency }</span>
</div> */
}

{
  /* <div class="relative relative bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
  <div class="flex items-center" (click)="toggleDropdown()">
    <img
                src="https://hatscripts.github.io/circle-flags/flags/{{
                  codes[selectedCurrency]
                }}.svg"
                width="48"
                alt="{{ selectedCurrency }} flag"
                class="h-4 w-4 mr-2 inline-block"
              />
    <span>{{ selectedCurrency }}</span>
    <svg class="fill-current h-4 w-4 ml-2 -mt-1 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>

  <div class="dropdown-menu absolute hidden right-0 mt-2 py-2 w-full bg-white rounded shadow-lg" [class.hidden]="!isOpen" *ngIf="isOpen">

      <app-currency-option [currency]="currency.key" [selectedCurrency]="selectedCurrency" (currencySelected)="selectCurrency($event)"></app-currency-option>

  </div>
</div> */
}
