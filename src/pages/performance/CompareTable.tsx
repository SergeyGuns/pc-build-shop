import React from "react";
import FlipMove from "react-flip-move";
import results from "./performance_result.js";
import "./style.css";
const resultsMap = Object.keys(results).map((key) => [key, results[key]]);
enum SORT_BY {
  NAME = "NAME",
  SCORE = "SCORE",
}

const maxScore = resultsMap.reduce((acc, [, score]) => {
  return Math.max(acc, score);
}, 0);
const getPercentGradient = (percent) => {
  return {
    background: `linear-gradient(90deg, rgba(255,231,1,1) 0%, rgba(255,231,1,1) ${percent.toFixed(
      2
    )}%, rgba(154,21,236,1) ${percent.toFixed(2)}%, rgba(154,21,236,1) 100%)`,
  };
};

const compareHandler = (comparedList, cpu, result, setComparedList) => {
  if (comparedList.findIndex(isEqualCpu(cpu)) === -1) {
    setComparedList([...comparedList, [cpu, result]]);
  } else {
    const currIndex = comparedList.findIndex(isEqualCpu(cpu));
    setComparedList([...comparedList.toSpliced(currIndex, 1)]);
  }

  localStorage.setItem("comparedList", JSON.stringify(comparedList));
};

const isEqualCpu =
  (cpu) =>
  ([compareCpu]) =>
    compareCpu === cpu;

const isComaredElement = (comparedList, cpu) =>
  comparedList.some(isEqualCpu(cpu));

const sortByName = ([nameA], [nameB]) => (nameA < nameB ? 1 : -1);
const sortByScore = ([, scoreA], [, scoreB]) =>
  parseInt(scoreA) < parseInt(scoreB) ? 1 : -1;
type PerformanceResultCpu = [string, string];

type PerformanceResult = PerformanceResultCpu[];

export default function CompareTable() {
  const [originResultList] = React.useState<PerformanceResult>(
    resultsMap as PerformanceResult
  );
  const [sortBy, setSortBy] = React.useState<SORT_BY>(SORT_BY.NAME);
  const [comparedList, setComparedList] = React.useState<PerformanceResult[]>(
    []
  );
  const [hiddenList, setHiddenList] = React.useState<PerformanceResult>([]);
  const [serch, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    const compareList = localStorage.getItem("comparedList");
    if (compareList) {
      setComparedList(JSON.parse(compareList));
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  return (
    <div>
      <div className="result">
        <button className="build-btn" onClick={() => setSortBy(SORT_BY.NAME)}>
          by name
        </button>
        <button className="build-btn" onClick={() => setSortBy(SORT_BY.SCORE)}>
          by score
        </button>
        <div className="--search-icon">
          <input
            onChange={}
            placeholder="Intel Core I9"
            type="text"
            value={serch}
            className="build-btn"
            list="cpu"
          />
          <datalist id="cpu">
            {originResultList.map(([cpu]) => (
              <option value={cpu} />
            ))}
          </datalist>
        </div>
      </div>
      <FlipMove>
        {[
          ...comparedList,
          ...originResultList
            .filter(([cpu]) => {
              return !(
                comparedList.length && comparedList.some(isEqualCpu(cpu))
              );
            })
            .sort(sortBy === SORT_BY.NAME ? sortByName : sortByScore),
        ].map(([cpu, result]) => {
          const percent = (result * 100) / maxScore;
          console.log(getPercentGradient(percent));
          return (
            <div key={cpu + result}>
              <div
                key={cpu}
                className="result__item"
                style={getPercentGradient(percent)}
              >
                <div>{cpu}</div>
                <div>
                  {result}
                  {/* <a
                    className="build-btn"
                    href={`https://www.avito.ru/all/tovary_dlya_kompyutera/komplektuyuschie/protsessory?cd=1&q=${cpu.replace(
                      /\s/g,
                      "+"
                    )}`}
                  >
                    найти на авито
                  </a> */}
                  <span
                    onClick={() =>
                      compareHandler(comparedList, cpu, result, setComparedList)
                    }
                    className="build-btn"
                  >
                    {isComaredElement(comparedList, cpu) ? "-" : "+"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </FlipMove>
    </div>
    // <div>Hello World</div>
  );
}
