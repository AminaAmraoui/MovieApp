import React, { Component } from 'react';
import './LoaderHOC.css';

const LoaderHOC =(WrappedComponent) => {

    return class LoaderHOC extends Component {
        render(){
            return this.props.isLoading ? <div className="d-flex justify-content-center loader">
                                                <div className="spinner-border text-info" role="status">
                                                <span className="sr-only">Loading...</span>
                                                </div>
                                           </div> : <WrappedComponent {...this.props}/>
        }
    }
}

export default LoaderHOC