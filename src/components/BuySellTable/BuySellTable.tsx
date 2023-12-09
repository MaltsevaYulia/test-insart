import React, { ChangeEvent, useCallback, useState } from "react";
import Table from "react-bootstrap/Table";
import { GrEdit, GrClose, GrCheckmark } from "react-icons/gr";

import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import { isValid } from "../../helpers/isValid";
import { useRates } from "../../store";


const LS_KEY = "requests";

export interface IRate {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
  // [key: string]: string;
}

const BuySellTable = () => {
  const {
    rates,
    loading,
    error,
    setInitialRates,
    setRates,
    setLoading,
    setError,
    editableCell,
    setEditableCell,
  } = useRates();

  const [editableValue, SeteditableValue] = useState<string>("");
  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: string;
  } | null>(null);

    const [isChangeValid, setIsChangeValid] = useState(false);

    const onRetry = useCallback(() => {
      setLoading(true);
      setError(null);
    }, [setLoading, setError]);

  useSWR<IRate[]>(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4",
    fetcher,
    {
      onSuccess: (newData) => {
        setLoading(false);
        setInitialRates(newData);
        const quantity = localStorage.getItem(LS_KEY);

        if (!quantity) localStorage.setItem(LS_KEY, "1");
        else if (quantity && parseFloat(quantity) < 5) {
          const number = (parseFloat(quantity) + 1).toString();
          localStorage.setItem(LS_KEY, number);
        } else if (parseFloat(quantity) >= 5) {
          localStorage.setItem(LS_KEY, "");
          throw new Error();
        }
      },
      onError: (error) => {
        console.log("🚀 ~ BuySellTable ~ error:", error);
        setLoading(false);
        setError(error);
      },
    }
  );

  const handleEditClick = (row: number, col: string) => {
    SeteditableValue(rates[row][col]);
    setEditableCell(row, col);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const inputValue = e.target.value;
      SeteditableValue(inputValue);
const isValueValid=isValid(inputValue,rates[index][field])
    
      if (isValueValid) setIsChangeValid(true);
      else setIsChangeValid(false);
    
  };
    
  const handleSaveClick = (index: number, field: string, value: string) => {
   
    if (isChangeValid) {
      setRates(index, field,editableValue);
    } else {
      setRates(index, field, value);
      console.error(
        "Невалидное значение. Допустимо изменение в пределах ± 10% от начального значения."
      );
    }
    setEditableCell(null, null);
  };

  const handleCancelClick = (index: number, field: string, value: string) => {
    setRates(index, field, value);
    setEditableCell(null, null);
  };

  if (error) return (
    <div className="error-container mb-4">
      <p className="error-message">Failed to load. Try again.</p>
      <button className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );;
  if (loading) return <div>loading...</div>;

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Currency/Current Date</th>
          <th>Buy</th>
          <th>Sell</th>
        </tr>
      </thead>
      <tbody>
        {rates?.map((rowData: IRate, rowIndex: number) => (
          <tr key={rowIndex}>
            <td>
              {rowData.ccy}/{rowData.base_ccy}
            </td>
            {Object.keys(rowData)
              .filter((key: string) => key !== "ccy" && key !== "base_ccy")
              .map((key: string, colIndex) => (
                <td
                  key={colIndex}
                  onMouseEnter={() =>
                    setHoveredCell({ row: rowIndex, col: key })
                  }
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {editableCell.row === rowIndex && editableCell.col === key ? (
                    <>
                      <input
                        type="number"
                        // value={rates[rowIndex][key]}
                        value={editableValue}
                        onChange={(e) => handleInputChange(e, rowIndex, key)}
                      />
                      {!isChangeValid &&editableValue!==rates[rowIndex][key]&& <div className="validation">must be +- 10%</div>}
                      <button type="button" disabled={!isChangeValid}>
                        <GrCheckmark
                          onClick={() =>
                            handleSaveClick(rowIndex, key, rates[rowIndex][key])
                          }
                        />
                      </button>
                      <GrClose
                        onClick={() =>
                          handleCancelClick(rowIndex, key, rates[rowIndex][key])
                        }
                      />
                    </>
                  ) : (
                    <>
                      {rates[rowIndex][key]}
                      {hoveredCell &&
                        hoveredCell.row === rowIndex &&
                        hoveredCell.col === key && (
                          <GrEdit
                            onClick={() => handleEditClick(rowIndex, key)}
                          />
                        )}
                    </>
                  )}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BuySellTable;

