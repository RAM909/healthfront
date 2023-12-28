import React, { useEffect } from 'react';
import DataTable from './DataTable';
import Header from '../Components/Header';

const Home = () => {

    useEffect(()=>{
        // const user = localStorage.getItem("loggedIn")
        // if()
    }, [])
  return (
    <>
        <Header/>
        <DataTable/>
    </>
  )
}

export default Home