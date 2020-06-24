import React,{ Component } from 'react'

export default class Header extends Component{

  render(){
    return(
     <div className='container-fluid footer text-light'>
       <div className='row'>
         <div className='container pt-4 pb-2'>
           <div className='row'>
             <div className='col-md-6 col-sm-12'>
               <h4>CONTACT</h4>
               <h4>REVIEW</h4>
               <h4>FAQ</h4>
             </div>
             <div className='col-md-5 col-sm-12'>
               <h5>Contact: Test@gmail.com</h5>
             </div>
             <div className='col-12 text-center mt-3'>
               <p className='text-weigh-light m-0'>
                 @2020 All right reserved
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
    )
  }
}