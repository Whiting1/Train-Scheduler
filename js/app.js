// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAAHcbm08hlkKK1pzpMJQZswWsdQD35KBs",
    authDomain: "first-ever-33016.firebaseapp.com",
    databaseURL: "https://first-ever-33016.firebaseio.com",
    projectId: "first-ever-33016",
    storageBucket: "first-ever-33016.appspot.com",
    messagingSenderId: "897452068373"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(e){
    e.preventDefault();

    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = $("#start-time").val().trim();
    var frequency = $("#frequency").val().trim();


    database.ref().push({
        Name: name,
        Destination: destination,
        StartTime: startTime,
        Frequency: frequency,
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#start-time").val("");
    $("#frequency").val("");
    

});

database.ref().on("child_added", function(snapshot){
    var snap = snapshot.val();

    console.log(snapshot.key);

    console.log(`
    Name: ${snap.name}
    Destination: ${snap.destination}
    StartTime: ${snap.startTime}
    Frequency: ${snap.frequency}
    `);

    var timeline = $("<div>");
    $(timeline).addClass("row time-line");

    var name = $("<div>");
    $(name).addClass("col-sm-2 textEnter name");
    $(name).text(snap.name);
    
    var destination = $("<div>");
    $(destination).addClass("col-sm-2 textEnter destination");
    $(destination).text(snap.destination);
    
    var startTime = $("<div>");
    $(startTime).addClass("col-sm-2 textEnter nextArrival");
    $(startTime).text(snap.startTime);
    
    var months = $("<div>");
    $(months).addClass("col-sm-2 textEnter months");
    $(months).text(12);
    
    var frequency = $("<div>");
    $(frequency).addClass("col-sm-1 textEnter frequency");
    $(frequency).text(snap.frequency);
    
    var billed = $("<div>");
    $(billed).addClass("col-sm-2 textEnter billed");
    $(billed).text(12 * parseInt(snap.rate));

    var btn = $("button");
    $(btn).addClass("col-sm-1 btn btn-danger delete");
    $(btn).attr("key", snapshot.key);
    $(btn).text("X");


    $(timeline).append([name, destination, startTime, months, frequency, billed, btn]);
    $("#records").append(timeline);
});

$(".btn").on("click", function(){
    $("#add-train").modal("toggle");
});

$(document).on("click", ".delete", function(){
    console.log($(this).attr("key"));
    database.ref("/"+$(this).attr("key")+"/").remove();
});