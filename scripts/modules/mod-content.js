function contentWrapper( defaults, pC ) {

      // define contentSection wrapper
      // if customwrapper is defined, use that instead

      var htmlWrapper = document.createElement( "section" );
      htmlWrapper.id = pC.navPoint;

      // background Image
      if ( pC.backgroundImage != false ) {
            imgPath = defaults.imgPath + "/" + pC.backgroundImage;
            htmlWrapper.style.backgroundImage = "url('" + imgPath + "')";
      }


      // headline
      if ( pC.displayNavPoint != false ) {
            var htmlHeadline = document.createElement( "h2" );
            htmlHeadline.appendChild( document.createTextNode( pC.navPoint ) );
            htmlWrapper.appendChild( htmlHeadline );
      }

      var data = pC.content;
      var htmlContent = document.createElement( "div" );

      for ( i in data ) {
            var thisData = data[ i ];
            switch ( thisData.type ) {
                  case "text":
                        var htmlText = createHTMLTextEl( thisData );
                        htmlContent.appendChild( htmlText );
                        break;
                  case "image":
                        var htmlImg = createHTMLImgEl( defaults, thisData );
                        htmlContent.appendChild( htmlImg );
                        break;
                  case "video":
                        var htmlVideo = createHTMLVideoEl( defaults, thisData );
                        htmlContent.innerHTML += htmlVideo;
                        break;
                  case "videoEmbed":
                        var htmlYoutubeVideo = createYoutubeVideo( defaults, thisData );
                        htmlContent.innerHTML += htmlYoutubeVideo;
                        break;
                  case "form":
                        var htmlForm = createHTMLFormEl( thisData );
                        htmlContent.appendChild( htmlForm );
                        break;
                  default:
                        break;
            }
      }

      htmlWrapper.appendChild( htmlContent );


      var HTMLtoAppend = htmlWrapper;
      render = function() {
                  document.querySelector( 'main' ).appendChild( HTMLtoAppend );
            },
            render();
}





function createHTMLTextEl( data ) {
      var htmlText = undefined;
      switch ( data.style ) {
            case "listItem":
                  htmlText = document.createElement( "li" );
                  break;
            case "runningText":
                  htmlText = document.createElement( "p" );
                  break;
            case "pre-headline":
                  htmlText = document.createElement( "h4" );
                  break;
            case "sub-headline":
                  htmlText = document.createElement( "h3" );
                  break;
            case "h1":
                  htmlText = document.createElement( "h1" );
                  htmlText.style.display = "none";
                  break;
            case "termsOfService":
                  htmlText = document.createElement( "p" );
                  htmlText.className += "termsOfService";
                  break;
            case "cta":
                  htmlText = document.createElement( "div" );
                  htmlText.setAttribute( "data-type", "button" )
                  break;
      }

      htmlText.innerHTML = data.text;
      return htmlText;
}


function createHTMLImgEl( defaults, data ) {
      var htmlImg = document.createElement( "div" );
      htmlImg.setAttribute( "data-attr", "img" );
      // set bg
      var imgPath = defaults.imgPath + "/" + data.source;
      htmlImg.style.backgroundImage = "url('" + imgPath + "')";

      return htmlImg;
}

function createYoutubeVideo( defaults, data ) {
      var vidPath = data.source;
      var youtubeVid = '<iframe width="1280" height="720" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"\
      src="' + vidPath + '">\
      </iframe>';
      return youtubeVid;
}


function createHTMLVideoEl( defaults, data ) {
      var vidPath = defaults.vidPath + "/" + data.source;


      // standard video
      var htmlVid = '<video class="video-js" controls preload="auto" width="1280" height="720" ' +
            '  poster data-setup="{}">' +
            '    <source src="' + vidPath + '" type=\'video/mp4\'>' +
            '    <p class="vjs-no-js">' +
            '      To view this video please enable JavaScript, and consider upgrading to a web browser that' +
            '      <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>' +
            '    </p>' +
            '  </video>';

      return htmlVid;
}

function createHTMLFormEl( data ) {
      var htmlForm = document.createElement( "form" );
      htmlForm.setAttribute( "method", "post" );
      htmlForm.setAttribute( "action", data.action );
      htmlForm.setAttribute( "id", data.id )
      for ( k in data.content ) {
            var thisData = data.content[ k ];
            var inputEl = document.createElement( thisData.tag ); // create input/textarea/button
            inputEl.setAttribute( "type", thisData.type );
            inputEl.setAttribute( "name", thisData.name );
            if ( thisData.value != false ) {
                  inputEl.setAttribute( "value", thisData.value );
                  inputEl.appendChild( document.createTextNode( thisData.value ) )
            }
            if ( thisData.placeholder != false )
                  inputEl.setAttribute( "placeholder", thisData.placeholder );
            if ( thisData.required == true )
                  inputEl.setAttribute( "required", "required" );
            if ( thisData.label != false ) {
                  var wrapperEl = document.createElement( "div" );
                  wrapperEl.setAttribute( "data-type", "inputWrapper" )
                  var labelEl = document.createElement( "label" );
                  labelEl.setAttribute( "for", thisData.name )
                  labelEl.appendChild( document.createTextNode( thisData.label ) )
                  wrapperEl.appendChild( labelEl )
                  wrapperEl.appendChild( inputEl )
            }
            if ( thisData.label != false ) {
                  htmlForm.appendChild( wrapperEl )
            }
            else {
                  htmlForm.appendChild( inputEl )
            }



      }

      return htmlForm;
}
