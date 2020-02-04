import React, {Component} from 'react';

function withSplashScreen(WrappedComponent) {
     return (
       <div className="splash-screen">
         Wait a moment while we load your app.
         <div className="loading-dot">.</div>
       </div>
     );
  };


export default withSplashScreen;