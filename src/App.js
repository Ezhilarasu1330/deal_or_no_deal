import "./App.css";
import { useEffect, useMemo, useState } from "react";

import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";

import { questionsData, moneyData } from "./data/data";

function App() {

  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");

  const moneyPyramid = useMemo(() => moneyData.reverse(), []);

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>

          {questionNumber == 16 ? (
            <h1 className="endText">Congratulations you have earned: {earned}</h1>
          ) : (
            <>
              <div className="main">
                {timeOut ? (
                  <h1 className="endText">You earned: {earned}</h1>
                ) : (
                  <>
                    <div className="top">
                      <div className="timer">
                        <Timer
                          setTimeOut={setTimeOut}
                          questionNumber={questionNumber}
                        />
                      </div>
                    </div>
                    <div className="bottom">
                      <Trivia
                        data={questionsData}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                        setTimeOut={setTimeOut}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="pyramid">
                <ul className="moneyList">
                  {moneyPyramid.map((m) => (
                    <li
                      className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}
                    >
                      <span className="moneyListItemNumber">{m.id}</span>
                      <span className="moneyListItemAmount">{m.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}


        </>
      )}
    </div>
  );
}

export default App;
