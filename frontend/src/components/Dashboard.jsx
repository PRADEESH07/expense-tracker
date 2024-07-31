import React from "react";
import TransactionList from "./transaction/TransactionList";
import TransactionChart from "./transaction/TransactionChart";

const Dashboard = () => {
  return (
    <>
    <TransactionChart/>
    <TransactionList/>
    </>
  );
};

export default Dashboard;