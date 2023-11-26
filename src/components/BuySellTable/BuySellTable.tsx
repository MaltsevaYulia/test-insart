import React, { ChangeEvent, useState } from "react";
import Table from "react-bootstrap/Table";
import { GrEdit, GrClose, GrCheckmark } from "react-icons/gr";

import useSWR from "swr";
import { useRates } from "../../store";

const rates = require("../../db.json");

interface IRate {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

// type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;

// const fetcher: Fetcher = (url, init) =>
//     fetch(url, init).then((res) => res.json());

const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return rates;
    });

const BuySellTable = () => {
  const {
    rates,
    loading,
    error,
    setRates,
    setLoading,
    setError,
    editableCell,
    setEditableCell,
  } = useRates();

  const [editableValue, SeteditableValue] = useState('');

  const { data } = useSWR<IRate[]>(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4",
    fetcher,
    {
      onSuccess: (newData) => {
        setLoading(false);
        setRates(newData);
      },
      onError: (error) => {
        setLoading(false);
        setError(error);
      },
    }
  );

  const handleEditClick = (row: number, col: string) => {
    SeteditableValue(rates[row][col]);
    setEditableCell(row, col);
  };

  const handleSaveClick = (index: number, field: string, value: string) => {
      console.log("editableValue:", editableValue);
      const inputValue = parseFloat(value);
      console.log("🚀 ~ handleSaveClick ~ inputValue:", inputValue)
      console.log(
        "🚀 ~ inputValue >= parseFloat(editableValue) * 0.9",
        inputValue >= parseFloat(editableValue) * 0.9
      );
      console.log(
        "🚀 ~ inputValue <= parseFloat(editableValue) * 1.1",
        inputValue <= parseFloat(editableValue) * 1.1
      );

      const isValidChange =
        inputValue >= parseFloat(editableValue) * 0.9 &&
        inputValue <= parseFloat(editableValue) * 1.1;

      if (isValidChange) {
        setRates(index, field, inputValue);
      } else {
          setRates(index, field, editableValue);
        console.error(
          "Невалидное значение. Допустимо изменение в пределах ± 10% от начального значения."
        );
      }
    setEditableCell(null, null);
  };

  const handleCancelClick = (index: number, field: string) => {
    setRates(index, field, editableValue);
    setEditableCell(null, null);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const inputValue = parseFloat(e.target.value);
    setRates(index, field, inputValue);
  };

  if (error) return <div>failed to load</div>;
  if (loading) return <div>loading...</div>;

  return (
    <Table
      striped
      bordered
      hover
        variant="dark"
    >
      <thead>
        <tr>
          <th>Currency/Current Date</th>
          <th>Buy</th>
          <th>Sell</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rowData: IRate, rowIndex: number) => (
          <tr key={rowIndex}>
            <td>
              {rowData.ccy}/{rowData.base_ccy}
            </td>
            {Object.keys(rowData)
              .filter((key) => key !== "ccy" && key !== "base_ccy")
              .map((key, colIndex) => (
                <td key={colIndex}>
                  {editableCell.row === rowIndex && editableCell.col === key ? (
                    <>
                      <input
                        type="number"
                        value={rates[rowIndex][key]}
                        onChange={(e) => handleInputChange(e, rowIndex, key)}
                      />
                      <GrCheckmark
                        onClick={() =>
                          handleSaveClick(rowIndex, key, rates[rowIndex][key])
                        }
                      />
                      <GrClose
                        onClick={() =>
                          handleCancelClick(rowIndex, key, )
                        }
                      />
                    </>
                  ) : (
                    <>
                      {rates[rowIndex][key]}
                      <GrEdit onClick={() => handleEditClick(rowIndex, key)} />
                    </>
                  )}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
      {/* <tbody>
        {data?.map((data) => (
          <tr key={data.ccy}>
            <td>
              {data.ccy}/{data.base_ccy}
            </td>
            <td>{parseFloat(data.buy).toFixed(1)}</td>
            <td>{parseFloat(data.sale).toFixed(1)}</td>
          </tr>
        ))}
      </tbody> */}
    </Table>
  );
};

export default BuySellTable;
