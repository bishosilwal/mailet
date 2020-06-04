import React,{ Component } from 'react'

export default class EmailContainer extends Component{

  render(){
    return(
      <div className='container-fluid email-container'>
        <div className='row justify-content-center'>
          <div className='col-5 m-5'>
            <div className='row justify-content-center m-3 p-3 email-div-row'>
              <div className='email-div rounded-pill m-3 p-3'>test@gmail.com</div>
            </div>
            <div className='row m-5'>
              details
            </div>
          </div>
        </div>
      </div>
    )
  }
}