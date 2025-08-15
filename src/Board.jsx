import React, {useState} from 'react'

const Board = () => {
  return (
    <>
    <h1>Wordle</h1>
    <div className='container'>
      <hr />
        <div className='row'>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
        </div>
         <div className='row'>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
        </div>
         <div className='row'>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
        </div>
         <div className='row'>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
        </div>
         <div className='row'>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
        </div>
        <div className='row'>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
            <div className='block'></div>
        </div>
        
    </div>
    </>
  )
}

export default Board