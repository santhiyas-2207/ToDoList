import React from 'react'
import Css from './index'
import ItemList from './ItemList';


const Proj=({items,handleCheck,handleDelete}) => {
  return (
    <>
        {(items.length) ? (
            <ItemList 
            items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            />
                 ):(
                <p style={{marginTop:'2rem',textAlign:'center'}}>Your list is Empty</p>
            )
    }
    </>
  )
}

export default Proj
