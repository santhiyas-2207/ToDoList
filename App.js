import React from 'react'
import Header from './Header'
import Proj from './Proj'
import Footer from './Footer'
import { useState,useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

const App = () => {
    const API_URL='http://localhost:3500/items'
    const[items,setItems]=useState([]);
    const [newItem,setNewItem]=useState('')
    const[search,setSearch]=useState('')
    const[isLoading,setIsLoading]=useState(true)
        
useEffect(()=>{
    const fetchItems=async()=>{
        try{
            const response=await fetch(API_URL);
            if(!response.ok) throw Error('Data not received')
                const ListItems=await response.json();
            console.log("welcome")
            setItems(ListItems)
               }
               catch(err){
                console.log(err.message)
               }
               finally{
                setIsLoading(false)
               }
    }

setTimeout(()=>{
   ( async()=>await fetchItems())()
},20)
},[])
    
    const addItem=(item)=>{
        const id=items.length ? items[items.length -1 ].id + 1 : 1;
        console.log(id)
        const addNewItem={id, checked:false, item}
        const listItems=[...items,addNewItem]
        setItems(listItems)
   const postOptions={
    method:'POST',
    headers:{'Content-Type':'applicqtion/json'},
    body:JSON.stringify(addNewItem)
   }
   const result=apiRequest(API_URL,postOptions)
    }
    const handleCheck = async(id)=>{
        const listItems=items.map((item)=>
            item.id===id ? {...item,checked:!item.checked}:item)
    setItems(listItems)
    const myItem=listItems.filter((item)=>item.id===id)
    const updateOptions={
        method:"PATCH",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({checked:myItem[0].checked})
    }
    const requrl=`${API_URL}/${id}`
    const result=await apiRequest(requrl,updateOptions)
    }
    const handleDelete = async(id)=>{
        const listItems=items.filter((item)=>
            item.id!==id)
    setItems(listItems)
   const myItem=listItems.filter((item)=>item.id!==id)
   const deleteOptions={ method:'DELETE'}
   const requrl=`${API_URL}/${id}`
   const result=await apiRequest(requrl,deleteOptions)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!newItem) return;
        console.log(newItem)
        console.log("Form Submitted")
        addItem(newItem)
        setNewItem('')
    }
  return (
    <div>
      <Header />
      <AddItem
       newItem={newItem}
       setNewItem={setNewItem}
       handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        
      <Proj 
      items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      setItem={setItems}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
      </main>
      <Footer
      length={items.length}
      />
    </div>
  )
}

export default App
