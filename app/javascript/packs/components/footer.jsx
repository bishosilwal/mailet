import React,{ Component } from 'react'

export default class Header extends Component{

  render(){
    return(
     <div className='container-fluid bg-dark text-white'>
       <div className='row justify-content-center pt-5 pb-2'>
         <div className='col-6 p-3'>
           Contact: Test@gmail.com
         </div>
         <div className='col-12 text-center mt-3'>
           <p className='text-weigh-light m-0'>
             @2020 All right reserved
           </p>
         </div>
       </div>
     </div>
    )
  }
}