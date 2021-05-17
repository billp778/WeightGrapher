let obj;
let week = 0;
let month = 0;
let year = 0;
let total = 0;

function addWeight(){
    let weight = document.getElementById("weight").value;
    let date = document.getElementById("date").value;
    let data = {weight, date}

    if(weight > 999 || weight < 1){
        alert("Enter Better Weight");
    }else{
        fetch('http://localhost:8000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data =>{
                console.log('Success: data added', data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }

}

function getData(){
    fetch('http://localhost:8000/get')
  .then(response => response.json())
  .then(data => obj = data)
  .then(data => console.log(data));
}

function checkDate() {
    let selectedText = document.getElementById('date').value;
    let selectedDate = new Date(selectedText);
    let now = new Date();
    if (selectedDate < now) {
        for(let i = 0; i < obj.length; i++){
            if(obj[i].date === selectedText){
                let selectedWeight = obj[i].weight;
                document.getElementById("weight").value = selectedWeight;
            }
        }
    }
  }

function sortArr(){
    obj.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.date > b.date) ? 1 : -1) : -1 )
    obj.reverse();
}

function getWeek(){
    week = 1;
    month = 0;
    year = 0;
    total = 0;
}

function getMonth(){
    week = 0;
    month = 1;
    year = 0;
    total = 0;
}

function getYear(){
    week = 0;
    month = 0;
    year = 1;
    total = 0;
}

function getTotal(){
    week = 0;
    month = 0;
    year = 0;
    total = 1;
}

function drawChart(){
    let newDataArr = [];
    let dataArr = [];
    let str = "";

    for(let i = 0; i < obj.length; i++){
        dataArr.push(obj[i]);
    }

    if(week == 1){
        for (let n = 0; n < 7; n++) {
            newDataArr.push([dataArr[n].date, dataArr[n].weight]);
        }
        newDataArr.push(['Date', 'Weight']);
        newDataArr.reverse();
    }
    if(month == 1){
        let month = new Date();
        month = month.getMonth();

        for (let n = 0; n < 40; n++) {
            str = dataArr[n].date;
            str = str.split("-");
            str = str[1];

            if(str.includes(month + 1)){
                newDataArr.push([dataArr[n].date, dataArr[n].weight]);
                str = "";
            }
        }
        if(newDataArr.length < 7){
            for (let n = 0; n < 40; n++) {
                str = dataArr[n].date;
                str = str.split("-");
                str = str[1];
    
                if(str.includes(month)){
                    newDataArr.push([dataArr[n].date, dataArr[n].weight]);
                    str = "";
                }
            }
        }
        newDataArr.push(['Date', 'Weight']);
        newDataArr.reverse();
    }
    if(year == 1){
        let year = new Date();
        year = year.getFullYear();
    
        for (let n = 0; n < obj.length; n++) {
            str = dataArr[n].date;
            str = str.split("-");
            str = str[0];

            if(str.includes(year)){
                newDataArr.push([dataArr[n].date, dataArr[n].weight]);
                str = "";
            }
        }
        newDataArr.push(['Date', 'Weight']);
        newDataArr.reverse();
    }
    if(total == 1){
        for (let n = 0; n < obj.length; n++) {
            newDataArr.push([dataArr[n].date, dataArr[n].weight]);
        }
        newDataArr.push(['Date', 'Weight']);
        newDataArr.reverse();
    }
    

    let data = new google.visualization.arrayToDataTable(newDataArr);

    let options = {
        title: 'Check your weight over Time!',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}