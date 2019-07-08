 var Config = {
    apiKey: "AIzaSyC6mX--QAioNWl7JqW2iQVIDvTVoJor7tg",
    authDomain: "timer-project-87071.firebaseapp.com",
    databaseURL: "https://timer-project-87071.firebaseio.com",
    projectId: "timer-project-87071",
    storageBucket: "timer-project-87071.appspot.com",
    messagingSenderId: "95039532676",
    appId: "1:95039532676:web:369fde0f04ffc6be"
  };
  firebase.initializeApp(Config);
  var mytime;
  var StartTime;
  var EndTime;
  var ElapsedTime;
  var counter=0;
  document.getElementById("button1").disabled=false;
  document.getElementById("button2").disabled=true;
  document.getElementById("label1").innerHTML="";
  function count_records(ref,time)
  {
    ref.once("value").then(function(snapshot)
    {
        var key=snapshot.key;
        if(counter!=null)
        counter=snapshot.val().length;
        else
        counter=1;
      firebase.database().ref("Timers/"+counter).set(time);
    });
  }
function start()
{  
    var time={
    StartTime:(new Date()).toLocaleTimeString(),
    EndTime:"",
    ElapsedTime:"",
    }
    localStorage.setItem("start",time.StartTime);
    document.getElementById("button1").disabled=true;
    document.getElementById("button2").disabled=false;
    document.getElementById("label1").innerHTML=time.StartTime;
    document.getElementById("label2").innerHTML="";
    document.getElementById("label3").innerHTML=""; 
    var ref=firebase.database().ref("Timers");
    count_records(ref,time);
    mytime=setInterval(function(){ timer(time.StartTime)},120000); 
}
function stop()
{
    clearInterval(mytime);
    document.getElementById("button2").disabled=true;
    document.getElementById("button1").disabled=false;
    endtime=(new Date()).toLocaleTimeString();
    document.getElementById("label2").innerHTML=endtime;
    var time={
        StartTime:localStorage.getItem("start"),
        EndTime:endtime,
        ElapsedTime:localStorage.getItem("elapsed"),
        }
        firebase.database().ref("Timers/"+counter).set(time);
        document.getElementById("label2").innerHTML=time.EndTime;
        document.getElementById("button1").disabled=false;  
     
}
function timer(start)
{
    var time={
        StartTime:start,
        EndTime:"",
        ElapsedTime:(new Date()).toLocaleTimeString()
    }
    document.getElementById("label3").innerHTML=time.ElapsedTime;
    firebase.database().ref("Timers/"+counter).set(time);
    localStorage.setItem("start",time.StartTime);
    localStorage.setItem("elapsed",time.ElapsedTime);
}