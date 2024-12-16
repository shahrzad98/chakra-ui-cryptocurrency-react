import React, { useEffect, useState } from "react";
import { Ledger } from "./Ledger";

const SpotOrders = () => {
  const [ledger, setLedger] = useState([]);
  useEffect(() => {}, []);

  return <Ledger />;
};

export { SpotOrders };
