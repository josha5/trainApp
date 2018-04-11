$(document).ready(function() {
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDzO5oWQdQ3Yl75KRyZ8Z9G5Eg0dUOVwfw",
        authDomain: "trainapp-2990b.firebaseapp.com",
        databaseURL: "https://trainapp-2990b.firebaseio.com",
         projectId: "trainapp-2990b",
        storageBucket: "",
        messagingSenderId: "1027838223037"
    };
    firebase.initializeApp(config);

    const database = firebase.database();

    $("#submit").on("click", function(e) {
        e.preventDefault();
        let trainName = $("#nameInput").val().trim();
        let destination = $("#destinationInput").val().trim();
        let trainTime = $("#timeInput").val().trim();
        let frequency = $("#frequencyInput").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency    
        });
    });

    database.ref().on("child_added", function(snapshot) {
        let tRow = $("<tr>");
        let tName = $("<td>");
        let tDestination = $("<td>");
        let tTime = $("<td>");
        let tFrequency = $("<td>");
    });
});