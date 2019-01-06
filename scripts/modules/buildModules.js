define(['lib/getJSONFromFile',
          'modules/mod-content',
          'modules/mod-navigation',
          ], function() {
          // JSON call mainpage
          getJSONFromFile('resources/pagecontents.json', function(data) {
                var data = JSON.parse(data),
                defaults = data.defaults,
                navigation = data.navigation,
                pageContents = data.pageContents;

                // header ---------------------------------------------------------------------------------------------------------
                //  new navigation(defaults.imgPath, navigation);
                // pagecontents ---------------------------------------------------------------------------------------------------------
                // create objects
                for (i in pageContents) {
                  new contentWrapper(defaults, pageContents[i]);
                }
          });


});
