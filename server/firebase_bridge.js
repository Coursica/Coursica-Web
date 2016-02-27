var Firebase = Meteor.npmRequire("firebase");

var firebase = new Firebase('https://glaring-heat-9505.firebaseio.com/courseData/jan-10-2016');
// firebase.on('child_added',   willLog);
// firebase.on('child_changed', willLog);
// firebase.on('child_removed', willLog);

// firebase.on("value", function(snapshot) {
//  	var data = snapshot.val().department;
// 	console.log(data);
// });

Meteor.bindEnvironment(function (error, result) {
    firebase.once("value", function(allCoursesSnapshot) {
          allCoursesSnapshot.forEach(function(courseSnapshot) {
          var title = courseSnapshot.child("title").val();
          var shortField = courseSnapshot.child("shortField").val();
          var number = courseSnapshot.child("number").val();
          var faculty = courseSnapshot.child("faculty").val();
          var meetings = courseSnapshot.child("meetings").val();
          // NEED TO FIGURE OUT ENROLLMENT
          //console.log(text);
          populateCoursesCollection(title, shortField, number, faculty, meetings);
          populateCurrentCoursesCollection();
          });
      });		
    });

  function populateCurrentCoursesCollection() {
    currentCoursesCollection = coursesCollection;
  }

  function populateCoursesCollection(title, shortField, number, faculty, meetings) {
    // coursesCollection.insert({
    //     'title': title,
    //     'shortField': shortField,
    //     'number': number,
    //     'instructor': faculty,
    //     'enrollment': 100,
    //     'meets': meetings
    //   });
    console.log("POPULATE!" + coursesCollection);
  }
// function willLog(snapshot) {
//     //console.log(snapshot.key() + " : " + EJSON.stringify(snapshot.val()));
//     firebase.orderByChild("title").on("child_added", function(snapshot) {
//   	console.log(snapshot.key() + " title is: " + snapshot.val().title);
// 	});
// }