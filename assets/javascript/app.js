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

        $("form").trigger("reset");
    });

    database.ref().on("child_added", function(snapshot) {
        let tRow = $("<tr>");
        let tName = $("<td>");
        let tDestination = $("<td>");
        let tTime = $("<td>");
        let tFrequency = $("<td>");
        let minutesRemaining = $("<td>");

        let firstTrainTime = snapshot.val().trainTime;
        let timeFreq = parseInt(snapshot.val().frequency);

        let firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        let tRemainder = diffTime % timeFreq;
        console.log(tRemainder);

        let tMinutesTillTrain = timeFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        tRow.append(tName, tDestination, tFrequency, tTime, minutesRemaining);
        $("#stats").append(tRow);

        $(tName).html(snapshot.val().trainName);
        $(tDestination).html(snapshot.val().destination);       
        $(tFrequency).html(firstTrainTime);  
        $(tTime).html(nextTrain);
        $(minutesRemaining).html(tMinutesTillTrain);
    });


    


});