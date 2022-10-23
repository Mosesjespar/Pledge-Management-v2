import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/main';
import { PledgeProvider } from './context/PledgeContext';
// import { Router } from 'react-router-dom';
// import ViewContributorsModal from "./components/ViewContributorsModal";
export default function App() {

  return (
    <>
      
        <PledgeProvider>
          <Main />
        </PledgeProvider>
      
    </>
  )
}