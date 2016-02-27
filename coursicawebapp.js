var loginStatus = true;

//var Firebase = Meteor.npmRequire("firebase");
fullCollection = new Mongo.Collection("fullCollection");
testCollection = new Mongo.Collection("testCollection");
//courseDataCollection = new Mongo.Collection("courseDataCollection");

// testCollection.insert({
//         'title': "fdsafdsafdsa",
//         'shortField': "HAA",
//         'number': "3131",
//         'instructor': "Joe Joseph",
//         'enrollment': 100,
//         'meets': "MW at 1"
//       });

if (Meteor.isClient) {

  Session.setDefault("overall_slider", [20, 80]);
  Session.setDefault("workload_slider", [20, 80]);
  Session.setDefault("enrollment_slider", [20, 80]);

  var fallButtonClicked, springButtonClicked = false;


  Template.checkboxFilter.created = function () {
      //this.filter = new ReactiveTable.Filter('checkbox-filter', ['checked']);
      
  };

    Template.checkboxFilter.helpers({
      checked: function () {
        if (Template.instance().filter.get() === "true") {
          return "checked";
        } 
        return "";
      } 
    });
    
    Template.checkboxFilter.events({
       "change .checkbox-filter": function (event, template) {
           if ($(event.target).is(":checked")) {
               template.filter.set("true");
           } else {
               template.filter.set("");
           }
       } 
    });

  Template.main.rendered = function () {
    this.$("#overall_slider").noUiSlider({
      start: Session.get("overall_slider"),
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      Session.set('overall_slider', val);
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      Session.set('overall_slider', [Math.round(val[0]), Math.round(val[1])]);
    });

    this.$("#workload_slider").noUiSlider({
      start: Session.get("workload_slider"),
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      Session.set('workload_slider', val);
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      Session.set('workload_slider', [Math.round(val[0]), Math.round(val[1])]);
    });

    this.$("#enrollment_slider").noUiSlider({
      start: Session.get("enrollment_slider"),
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      Session.set('enrollment_slider', val);
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      Session.set('enrollment_slider', [Math.round(val[0]), Math.round(val[1])]);
    });

  };

  

  // };

  Template.main.testcollection = function (){
    return testCollection.find();
  }

  var title; 
  var shortField; 
  var number; 
  var instructor; 
  var enrollment; 
  var meets;

  for (i = 0; i < 100; i++) {

    switch (i % 6) {
    case 0:
        title = "Poetry without Borders";
        shortField = "AESTH&INTP";
        number = i+1;
        instructor = "Joseph Regan Bell"
        enrollment = i*5 + 3
        meets = "Fall TTh at 3"
        break;
    case 1:
        title = "Poetry without Borders";
        shortField = "USW";
        number = i+1;
        instructor = "Joseph Regan Bell"
        enrollment = i*5 + 3
        meets = "Spring MWF at 9-10"
        break;
    case 2:
        title = "Fruits and Vegetables";
        shortField = "AESTH&INTP";
        number = i+1;
        instructor = "Akshay Saini"
        enrollment = i*5 + 3
        meets = "Spring TTh at 3"
        break;
    case 3:
        title = "Poetry without Borders";
        shortField = "MATH";
        number = i+1;
        instructor = "Joseph Regan Bell"
        enrollment = i*5 + 3
        meets = "Fall TTh at 3"
        break;
    case 4:
        title = "Advanced Class";
        shortField = "CS";
        number = i+1;
        instructor = "Joseph Regan Bell"
        enrollment = i*5 + 3
        meets = "Spring TTh at 10-11:30"
        break;
    case 5:
        title = "Quiltmaking";
        shortField = "HAA";
        number = i+1;
        instructor = "Joseph Regan Bell"
        enrollment = i*5 + 3
        meets = "Fall TTh at 3"
        break;
    case 6:
        title = "Buddhism";
        shortField = "AESTH&INTP";
        number = i+1;
        instructor = "Joseph Regan Bell"
        enrollment = i*5 + 3
        meets = "Fall TTh at 3"
        break;
    }

      testCollection._collection.insert({
        'title': title,
        'shortField': shortField,
        'number': number,
        'instructor': instructor,
        'enrollment': enrollment,
        'meets': meets
      });
  }

  fullCollection = testCollection;

  // Template.layout.helpers({

  //   loggedIn: function () {
  //     return Meteor.currentUser;
  //   }
  // });

  Template.main.helpers({
    loggedIn: function () {
      return Meteor.currentUser;
    },

    overall_slider: function () {
      return Session.get("overall_slider");
    },

    workload_slider: function () {
      return Session.get("workload_slider");
    },

    enrollment_slider: function () {
      return Session.get("enrollment_slider");
    },    

    settings: function () {
        return {
            collection: testCollection,
            rowsPerPage: 8,
            showFilter: false,
            showColumnToggles: false,
            filters: ['semesterfilter'],
            fields: ['title', 'shortField', 'number', 'instructor', 'enrollment', 'meets']

        };
    },

    // coursesCollection: function () {
    //     return Meteor.collections.coursesCollection;
    // },

    // testCollection: function () {
    //     return testCollection;
    // }

  });

  Template.main.created = function () {
      //this.filter = new ReactiveTable.Filter('semesterFilter', ['meets']);
      // $('input[type="rangeslide"]').ionRangeSlider({});
      // $("#slider_id").ionRangeSlider({
      //       hide_min_max: true,
      //       keyboard: true,
      //       min: 0,
      //       max: 5000,
      //       from: 1000,
      //       to: 4000,
      //       type: 'double',
      //       step: 1,
      //       prefix: "$",
      //       grid: true
      //   });
    this.semesterFilter = new ReactiveTable.Filter('semesterfilter', ['meets']);
  };

  Template.main.events({
    // 'click #fallButton': function (event, template) {
    //   console.log("you clicked a button!");
    //   //$('#fallButton').removeClass('btn-default');
    //   $("#fallButton").mouseup(function(){ $(this).blur(); })
      
    //   if (fallButtonClicked) {
    //     $('#fallButton').removeClass('btn-selected');
    //     template.fallFilter.set("");
    //     fallButtonClicked = false;
    //   }
    //   else
    //   {
    //     $('#fallButton').addClass('btn-selected');
    //     template.fallFilter.set("Fall");
    //     fallButtonClicked = true;
    //   }
    // },

      'click .btn-primary': function (event, template) {
        switch (event.target.id) {
          case "fallButton":
              console.log("you clicked a button!");
              //$('#fallButton').removeClass('btn-default');
              
              if (fallButtonClicked) {
                $('#fallButton').removeClass('btn-selected');
                template.semesterFilter.set("");
                fallButtonClicked = false;
              }
              else
              {
                $('#fallButton').addClass('btn-selected');
                template.semesterFilter.set("Fall");
                fallButtonClicked = true;
              }
          case "springButton":
              console.log("you clicked a button!");
              //$('#fallButton').removeClass('btn-default');
              
              if (fallButtonClicked) {
                $('#springButton').removeClass('btn-selected');
                template.semesterFilter.set("");
                springButtonClicked = false;
              }
              else
              {
                $('#springButton').addClass('btn-selected');
                template.semesterFilter.set("Spring");
                springButtonClicked = true;
              }
      }

      

      // fallFilter = new ReactiveTable.Filter('fallFilter', ['shortField']);
      // fallFilter.set('CS');
      

      // testCollection.insert({
      //   'title': "filterADDITIN",
      //   'shortField': "HAA",
      //   'number': "3131",
      //   'instructor': "TEFDS",
      //   'enrollment': 89321,
      //   'meets': "MW at 1"
      // });

      testCollection = fullCollection.find
      //testCollection.remove({shortField: 'CS'});
      //$(this).add('btn-warning');


    // });

    }
    
    // $('input[type="button"]').on('click', function(){ 
    //   $('input[type="button"]').removeClass('btn-default');
    //   $(this).toggleClass('btn-danger');
    // });


  });

  Template.login.events({

    'submit #login-form' : function(e, t){

      e.preventDefault();

      // retrieve the input field values
      var email = t.find('#login-email').value;
      var password = t.find('#login-password').value;

      // HUID real authentication
      loginStatus = true;

      Accounts.createUser({
            email: email,
            password: password
        });

      Meteor.users.find().fetch();
      Router.go('main');
      
      //stops from reloading page
      //window.location.reload();
      //return false; 
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      testCollection.remove({});

      //var courseData = JSON.parse(Assets.getText('lib/coursedata1-10-16.json'));
      //console.log(courseData);

      // testCollection.insert({
      //   'title': "fdsafdsafdsa",
      //   'shortField': "HAA",
      //   'number': "3131",
      //   'instructor': "Joe Joseph",
      //   'enrollment': 100,
      //   'meets': "MW at 3"
      // });

  });
}

// var requireLogin = function() { 
//   // TODO: DO this will calls to the meteor accounts API, not stupid boolean
//   if (true) {
//       if (false) {
//          // If user is not logged in render landingpage
//         this.render('login');
//       } else {
//          //if user is logged in render whatever route was requested
//         this.next(); 
//       }
//   }
//   else
//     {
//       this.next();
//     }
// };   

//code shared between client and server
// Router.configure({
//   // This is the default layout/top-level template 
//   layoutTemplate: 'layout'
// });

Router.map(function() {
  // Route for the landing page when user is not logged in
  this.route('login', {
    path: '/login'
  });

// Route to our main app. Note that I use / path as I treat this as default behavior
this.route('main', {
  path: '/',
  // onBeforeAction: [function() {
  //           requireLogin();
  //           this.next();
  //       }],
});

});

Router.route('/register');
Router.route('/logon');


//Router.onBeforeAction(requireLogin, {except: ['login']});