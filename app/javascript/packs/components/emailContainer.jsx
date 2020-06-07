import React,{ Component } from 'react'

export default class EmailContainer extends Component{

  render(){
    return(
      <div className='container-fluid email-container text-white'>
        <div className='row justify-content-center pb-5'>
          <div className='col-6 mt-5'>
            <div className='row justify-content-center m-3 p-3'>
              <div className='col-8 pr-0'>
                <div className='temp-email-div rounded-pill m-3 p-3 text-center'>
                  <span className='text-dark'>temp-email@gmail.com</span>
                  <span className='float-right'>
                    <i className="far fa-copy fa-2x text-secondary"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className='row m-3 p-3'>
              <div className='col-12 p-0'>
                <div className='row mb-2 justify-content-center expire-counter'>
                  <div className='col-3 p-0'>
                    <p className='text-muted'>This Email will deleted after</p>
                  </div>
                  <div className='col-6'>
                    <div className='row justify-content-center'>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>2</div>
                      </div>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>0</div>
                      </div>
                      <span className='align-content-center'>:</span>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>0</div>
                      </div>
                      <div className='col-2 p-2 bg-light text-dark text-center rounded-lg m-2'>
                        <div className=''>0</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-3'>
                    <p className='text-muted'>Minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='row justify-content-around text-light'>
              <div className='col-4'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75'>
                   <span className='float-left ml-1'>
                     <i className="fas fa-edit"></i>
                   </span>
                  <span className=''>Change Email</span>
                </div>
              </div>
              <div className='col-4'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75'>
                  <span className='float-left ml-1'>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <span className=''>Delete Email</span>
                </div>
              </div>
              <div className='col-4'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75'>
                  <span className='float-left ml-1'>
                    <i className="fas fa-envelope-square"></i>
                  </span>
                  <span className=''>Send Email</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}