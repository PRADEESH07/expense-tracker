import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { listTransactionApi } from "../../services/transactions/transactionService";
ChartJS.register(ArcElement, Tooltip, Legend);
const TransactionChart = () => {
  const{data:transactions, isError,isFetched,isLoading,error}=useQuery({
    queryFn: listTransactionApi,
    queryKey: ["listtransaction"]
  })
  //!!!!!!!!!!!!!!!
  const total= transactions?.reduce((acc,transaction)=>{
    if(transaction?.type==="income")
    {
      acc.income+=transaction?.amount;
    }
    else{
      acc.expense+=transaction?.amount
    }
    return acc;
  },{income:0,expense:0})
  const data={
    labels:["Income","Expense"],
    datasets:[
      {
        label: "transactions",
        data: [total?.income,total?.expense],
        backgroundColor: ["#36A2EB","#FF6384"],
        borderColor: [ "#36A2EB","#FF6384"],
        borderWidth:1,
        hoverOffSet: 4,  
      }
    ]
  }
  const options = {
    maintainAspectRatio: false,
    plugins: {
    legend: {
    position: "bottom",
    labels: {
    padding: 25,
    boxWidth: 12,
    font:{
    size: 14
    }
    },
    },
    title:{
      display: true,
      text: "income vs expense",
      font:{
        size: 18, weight: "bold"
      },
      padding:{
        top: 10, bottom: 30
      }
    }
    },
    cutout:"70%"
  }
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}><Doughnut data={data} options={options}/></div>
    </div>
  );
};

export default TransactionChart;