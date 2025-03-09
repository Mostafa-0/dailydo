import { createContext, useEffect, useState } from "react";

export const DailiesContext = createContext();

export const DailiesProvider = ({ children }) => {
  const [dailies, setDailies] = useState(() => {
    const localValue = localStorage.getItem("DAILIES");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("DAILIES", JSON.stringify(dailies));
  }, [dailies]);

  const addDaily = (daily) => {
    setDailies((prevDailies) => [daily, ...prevDailies]);
  };

  const editDaily = (id, data) => {
    setDailies((prevDailies) =>
      prevDailies.map((t) =>
        t.id === id
          ? {
              ...t,
              title: data.title,
              description: data.description,
              priority: data.priority,
              status: data.status,
            }
          : t
      )
    );
  };

  const deleteDaily = (id) => {
    setDailies((prevDailies) => prevDailies.filter((daily) => daily.id !== id));
  };

  return (
    <DailiesContext.Provider
      value={{
        dailies,
        setDailies,
        addDaily,
        editDaily,
        deleteDaily,
      }}
    >
      {children}
    </DailiesContext.Provider>
  );
};
