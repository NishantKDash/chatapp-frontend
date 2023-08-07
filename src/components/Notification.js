import React from 'react'

export default function Notification(props) {

 var mode = props.flag === 1 ? "success" : "warning";
 var classi = `alert alert-${mode} my-2 w-25 container p-2`


  if(props.flag === 1 || props.flag === 0)
  return (
    <div>
<div className= {classi} role="alert">
  {props.message}
</div>
    </div>
  )

}
