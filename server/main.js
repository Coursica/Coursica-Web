Meteor.startup(function() {
  // var rose = JSON.parse(Assets.getText('companions/rose.json'));
  // var martha = JSON.parse(Assets.getText('companions/martha.json'));
  // var companions = [rose, martha];

  // _.each(companions, function(companion) {
  //   // replace this with something like Companions.insert(companion);
  //   console.log(companion);
  // });

  var courseData = Assets.getText('companions/coursedata1-10-16.json');
  var test
  //var courseData = JSON.parse(Assets.getText('companions/coursedata1-10-16.json'));
  //console.log(courseData);
  console.log(courseData[3]);

  // code to run on server at startup
    Assets.getText('companions/coursedata1-10-16.json', function(err, data) {
      var content = EJSON.parse(data);
      //console.log(content[5]);
      // for(key in content) {
      //   var infoJSON = content[key][0];
      //   console.log(infoJSON);
      // }


      for(key in content) {
          var infoJSON = content[key];
          if (typeof infoJSON !== "object"){
             console.log(infoJSON);
          }
       }

      for(key1 in infoJSON) {
          if (infoJSON.hasOwnProperty(key1)) {
             if(infoJSON[key1] instanceof Array) {
                for(var i=0;i<infoJSON[key1].length;i++) {
                   console.log(infoJSON[key1][i]);
                }
              } else {console.log(infoJSON[key1]);}
          }
       }
      //alert(content["  African and African American Studies 188x: Contemporary Art in Africa : Proseminar - AAAS 188xfrican and African American Studies 188x: Contemporary Art in Africa : Proseminar - AAAS 188x"].department);

      for(child in content){
        //console.log('inserting', child["department"]);
      }
    });

  courseDataCollection.insert({
        'title': "fdsafdsafdsa",
        'shortField': "HAA",
        'number': "3131",
        'instructor': "Joe Joseph",
        'enrollment': 100,
        'meets': "MW at 3"
      });

  var JSON;

 // $.getJSON('../private/companions/coursedata1-10-16.json', function(response){
 //       JSON = response;
 //       alert(JSON.property);
 // })
 //feel free to use chained handlers, or even make custom events out of them!
 // .success(function() { alert("second success"); })
 // .error(function() { alert("error"); })
 // .complete(function() { alert("complete"); });


});