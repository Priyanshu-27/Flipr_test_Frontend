import React, { useEffect, useState } from "react";
import { fetchPrizes } from "../Api/api";

function PrizeList() {
  const [prizes, setPrizes] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [multipleWinners, setMultipleWinners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prizesData = await fetchPrizes();
        setPrizes(prizesData);
        setFilteredPrizes(prizesData);
        updateMultipleWinners(prizesData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const extractLaureateNames = (laureates) => {
    return laureates
      ? laureates.map((laureate) => `${laureate.firstname} ${laureate.surname}`)
      : [];
  };

  const updateMultipleWinners = (data) => {
    const winners = data.reduce((acc, prize) => {
      const laureateNames = extractLaureateNames(prize.laureates);
      laureateNames.forEach((name) => {
        acc[name] = (acc[name] || 0) + 1;
      });
      return acc;
    }, {});

    const multipleWinnersList = Object.keys(winners).filter(
      (name) => winners[name] > 1
    );

    setMultipleWinners(multipleWinnersList);
  };

  const handleFilter = () => {
    let filteredData = prizes;

    if (selectedYear !== "") {
      filteredData = filteredData.filter(
        (prize) => prize.year === selectedYear
      );
    }

    if (selectedCategory !== "") {
      filteredData = filteredData.filter(
        (prize) =>
          prize.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredPrizes(filteredData);
    updateMultipleWinners(filteredData);
  };

  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold mb-4 bg-green-200 inline-block px-4 py-4 rounded-tl-2xl rounded-br-2xl">
        Nobel Prize List
      </h1>

      <div className="mb-4">
        <label className="mr-4">
          Filter by Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="ml-2 p-2 border"
          >
            <option value="">All</option>
            {[...new Set(prizes.map((prize) => prize.year))].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ml-2 p-2 border"
          >
            <option value="">All</option>
            {[...new Set(prizes.map((prize) => prize.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </label>

        <button
          onClick={handleFilter}
          className="ml-4 p-2 bg-gray-800 text-white font-bold rounded"
        >
          Apply Filters
        </button>
      </div>

      <div className="mb-8 bg-green-200 shadow-md px-4 py-4 md:w-1/2 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Multiple Winners 🎉</h2>
        <ul className="">
          {multipleWinners.map((winner) => (
            <li className="border border-black p-3" key={winner}>
              {winner}
            </li>
          ))}
        </ul>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Laureates</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrizes.map((prize) => (
            <tr key={prize.year + prize.category}>
              <td className="border px-4 py-2">{prize.year}</td>
              <td className="border px-4 py-2">{prize.category}</td>
              <td className="border px-4 py-2">
                {extractLaureateNames(prize.laureates).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrizeList;
