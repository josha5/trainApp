$(document).ready(function() {
    console.log("ready");


    $("#submit").on("click", function(e) {
        e.preventDefault();
        let trainName = $("#nameInput").val().trim();
        let destination = $("#destinationInput").val().trim();
        let trainTime = $("#timeInput").val().trim();
        let frequency = $("#frequencyInput").val().trim();
    });
});