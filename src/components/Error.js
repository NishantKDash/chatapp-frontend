import React from 'react'
import { useParams } from 'react-router-dom'

export default function Error() {
  const params = useParams()
  console.log(params)
  return (
    <div className='container'>
        <img className = "my-2" src='https://static2.bigstockphoto.com/5/9/5/large2/5953771.jpg' alt='errorimage'/>
        <h1>
            There is no such path as {params['*']}!
        </h1>
    </div>
  )
}