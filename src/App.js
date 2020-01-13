import React, {useState} from 'react';
import './App.css';
import styled from "styled-components";

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SWrapper = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
`;

const SButton = styled.button`
  height: 70px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-grow: 1;
  flex-basis: 0;
  font-size: 2rem;
  font-weight: bold;
  outline: none;
  background-color: #444230;
  color: #ff8111;
  border: none;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.25);
  transition: box-shadow .2s;
  
  :hover {
    box-shadow: inset 2px 2px 6px rgba(0,0,0,0.25);
  }
`;

const SInput = styled.input`
  font-size: 2rem;
  background-color: #444230;
  color: #fff;
  border: none;
  outline: none;
  padding: 1rem;
  width: 100%;
  
  :hover,
  :focus {
    box-shadow: inset 2px 2px 6px rgba(0,0,0,0.25);
  }
`;

const App = () => {
  let [curValue, setCurValue] = useState("");
  let [calcValue, setCalcValue] = useState([]);
  let [isAns, setIsAns] = useState(false);

  const handleValue = e => {
    setCurValue(e.target.value);
  };

  // const handleKeys = e => {
  //   TODO
  // };

  const handleDecimal = e => {
    if (curValue.includes(".") || curValue === "") {
      return;
    } else {
      setCurValue(curValue + e.target.value);
    }
  };

  const handleNumInput = e => {
    setCurValue(curValue + e.target.value);
  };

  const handleClear = () => {
    setCurValue("");
    setCalcValue([]);
    setIsAns(false);
  };

  const handleClearEntry = () => {
    if (!isAns) {
      setCurValue("");
    } else {
      setCurValue("");
      setCalcValue([]);
      setIsAns(false);
    }
  };

  const handleBackspace = () => {
    setCurValue(curValue.slice(0, -1));
  };

  const handleOperator = e => {
    if (!isAns) {
      setCalcValue([...calcValue, curValue, e.target.value]);
      setCurValue("");
    } else {
      setCalcValue([curValue, e.target.value]);
      setCurValue("");
      setIsAns(false);
    }
  };

  const handleMinus = e => {
    if (curValue === "") {
      setCurValue("-")
    } else {
      if (!isAns) {
        setCalcValue([...calcValue, curValue, e.target.value]);
        setCurValue("");
      } else {
        setCalcValue([curValue, e.target.value]);
        setCurValue("");
        setIsAns(false);
      }
    }
  };

  // TODO: ERROR HANDLING.
  const handleCalc = () => {
    let calcStr = calcValue.join('') + curValue;
    setCalcValue([...calcValue, curValue]);
    setCurValue(eval(calcStr).toString());
    setIsAns(true);
  };

  return (
    <AppWrapper className="App">
      {/* Screen */}
      <SWrapper>
        <SInput readOnly onChange={handleValue} value={curValue} />
      </SWrapper>
      {/* Numbers & operators */}
      <SWrapper>
        <SButton onClick={handleClear}>
          C
        </SButton>
        <SButton onClick={handleClearEntry}>
          CE
        </SButton>
        <SButton onClick={handleBackspace}>
          &lt;&lt;
        </SButton>
        <SButton onClick={handleOperator} value="/">
          /
        </SButton>
      </SWrapper>
      <SWrapper>
        <SButton value="7" onClick={handleNumInput}>
          7
        </SButton>
        <SButton value="8" onClick={handleNumInput}>
          8
        </SButton>
        <SButton value="9" onClick={handleNumInput}>
          9
        </SButton>
        <SButton onClick={handleOperator} value="+">
          +
        </SButton>
      </SWrapper>
      <SWrapper>
        <SButton value="4" onClick={handleNumInput}>
          4
        </SButton>
        <SButton value="5" onClick={handleNumInput}>
          5
        </SButton>
        <SButton value="6" onClick={handleNumInput}>
          6
        </SButton>
        <SButton onClick={handleMinus} value="-">
          -
        </SButton>
      </SWrapper>
      <SWrapper>
        <SButton value="1" onClick={handleNumInput}>
          1
        </SButton>
        <SButton value="2" onClick={handleNumInput}>
          2
        </SButton>
        <SButton value="3" onClick={handleNumInput}>
          3
        </SButton>
        <SButton onClick={handleOperator} value="*">
          *
        </SButton>
      </SWrapper>
      <SWrapper>
        <SButton value="." onClick={handleDecimal}>
          .
        </SButton>
        <SButton value="0" onClick={handleNumInput}>
          0
        </SButton>
        <SButton value={Math.PI} onClick={handleNumInput}>
          &#120587;
        </SButton>
        <SButton onClick={handleCalc}>
          =
        </SButton>
      </SWrapper>
    </AppWrapper>
  );
};

export default App;
