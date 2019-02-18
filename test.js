// Write a JavaScript program to display the current day and time in the following format
function timeFormat() {
    var date = new Date();
    var day = date.getDay();
    var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    console.log("Today is : " + days[day]);
    console.log("Current time is : " + hours + " PM : " + minutes + " : " +  seconds);
    console.log("HelloXchange");
}

timeFormat();

