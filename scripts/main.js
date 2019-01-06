requirejs.config( {
      //By default load any module IDs from js/lib
      baseUrl: 'scripts',
      //except, if the module ID starts with "app",
      //load it from the js/app directory. paths
      //config is relative to the baseUrl, and
      //never includes a ".js" extension since
      //the paths config could be for a directory.
      paths: {
            recaptcha: '//www.google.com/recaptcha/api.js?render=6Le8QoMUAAAAAEZoktXj3O3JfdoIMoOTT1l05yxV',
            domReady: 'lib/domReady',
            jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
      },
      urlArgs: "bust=v2"

} );

// mainpage contents
requirejs( [ 'domReady', 'recaptcha', 'modules/buildModules', "jquery" ], function( domReady ) { // link: video js, framework for video


      domReady( function() {
            grecaptcha.ready( function() {
                  document.addEventListener( "touchstart", function() {}, true ); // ios touch fix
                  // event listeners
                  requirejs( [ 'lib/global-eventlisteners' ] );

            } );
            //start of doc

      } )
      // $ is guaranteed to be jQuery now */

} );
