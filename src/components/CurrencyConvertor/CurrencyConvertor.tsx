import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import { useRates } from "../../store";
import { IRate } from "../BuySellTable/BuySellTable";

const CurrencyConvertor = () => {
  const { rates } = useRates();
  const [from, setFrom] = useState<string>("UAN");
  const [into, setInto] = useState<string>("CHF");
  const [amount, setAmount] = useState<number>(1);
  const [currencyRate, setCurrencyRate] = useState<number>();

  const [currencyResult, setCurrencyResult] = useState<number>();

  useEffect(() => {
   
      if (from === "UAN" && into !== "UAN") {
        const rate = rates?.find((item: IRate) => item.ccy === into).sale;
        setCurrencyRate(1/parseFloat(rate));
    
      } else if (from !== "UAN" && into === "UAN") {
        const rate = rates.find((item: IRate) => item.ccy === from).sale;
        setCurrencyRate(parseFloat(rate));
    
      } else if (from !== "UAN" && into !== "UAN") {
        const ratefrom = rates.find((item: IRate) => item.ccy === from).sale;
        const rateinto = rates.find((item: IRate) => item.ccy === into).sale;
        setCurrencyRate(parseFloat(ratefrom) / parseFloat(rateinto));
        
      } else if (from === "UAN" && into === "UAN") {
        setCurrencyRate(1);
      }
      
  }, [amount, currencyRate, from, into, rates]);

  useEffect(() => {
     if (currencyRate) setCurrencyResult(amount * currencyRate);
  }, [amount, currencyRate]);



  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(parseFloat(value));
  };

  const handleFrom = (selectedOption: any) => {
    setFrom(selectedOption.target.value);
  };

  const handleInto = (selectedOption: any) => {
    setInto(selectedOption.target.value);
  };

  const handleSwitch = () => {
    setFrom(into);
    setInto(from);
  };

  return (
    <Form>
      <Row>
        <Col>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Change</Form.Label> */}
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                onChange={handleFrom}
                value={from}
              >
                <option>UAN</option>
                {rates?.map(({ ccy }: { ccy: string }) => (
                  <option key={ccy} value={ccy}>
                    {ccy}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col>
          <IoSwapHorizontalOutline onClick={handleSwitch} />
        </Col>
        <Col>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Get</Form.Label> */}
                <Form.Control type="number" value={currencyResult} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                onChange={handleInto}
                value={into}
              >
                {rates?.map(({ ccy }: { ccy: string }) => (
                  <option key={ccy} value={ccy}>
                    {ccy}
                  </option>
                ))}
                <option>UAN</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default CurrencyConvertor;


