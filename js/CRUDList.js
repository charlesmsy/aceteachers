let assignmentApiurl = 'https://dmwxjh34he.execute-api.us-east-1.amazonaws.com/dev/EZAFunc/assignments/';

async function getAll() {
    await fetch(assignmentApiurl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            appendData(data);
        });
}

function appendData(data) {
    document.getElementById("dataView").innerHTML = null; 
    var mainContainer = document.getElementById("dataView");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Assignment id: ' + data[i].assignment_id + ' Name: ' + data[i].name +' Description: '+ data[i].description;
        mainContainer.appendChild(div);
        }
}

async function getOne(id) {
    await fetch(assignmentApiurl + id + '/', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.getElementById('dassignment_id').innerHTML = 'Assignment id: ' + data.assignment_id+"<br>";
            document.getElementById('dname').innerHTML = ' Name: ' + data.name+"<br>";
            document.getElementById('ddescription').innerHTML = ' Description: '+ data.description+"<br>";
            document.getElementById('dhours').innerHTML = ' Average hours to complete: ' + data.average_hours_to_complete+"<br>";
            document.getElementById('dworksheet').innerHTML = ' Workseet: ' + data.worksheet+"<br>";
            document.getElementById('danswersheet').innerHTML = ' answersheet: ' + data.answersheet+"<br>";
            document.getElementById('duser_id').innerHTML = ' User_ID: ' + data.user_id+"<br>";
        });
}

async function getOneUpdate(id) {
    await fetch(assignmentApiurl + id + '/', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        
            document.getElementById('edassignment_id').value = data.assignment_id;
            document.getElementById('edname').value = data.name;
            document.getElementById('eddescription').value = data.description;
            document.getElementById('edhours').value = data.average_hours_to_complete;
            document.getElementById('edworksheet').value =  data.worksheet;
            document.getElementById('edanswersheet').value = data.answersheet;
            document.getElementById('eduser_id').value = data.user_id;
        });
}

function addAssignment() {
    let newAssignmentData = {
      name: document.getElementById("aname").value,
      description: document.getElementById("adescription").value,
      average_hours_to_complete: document.getElementById("ahours").value,
      worksheet: document.getElementById("aworksheet").value,
      answersheet: document.getElementById("aanswersheet").value,
      user_id: document.getElementById("auser_id").value,
      assignment_id: document.getElementById("aassignment_id").value,
  }
    console.log(newAssignmentData)
    postOneAssignment(newAssignmentData)
    alert("Job Complete!");
};

function postOneAssignment(AssignmentInfo) {

    return fetch(assignmentApiurl, {
        method: 'POST',
        body: JSON.stringify(
            { 
                name: AssignmentInfo.name, 
                description:AssignmentInfo.description, 
                average_hours_to_complete: AssignmentInfo.average_hours_to_complete, 
                worksheet: AssignmentInfo.worksheet, 
                answersheet: AssignmentInfo.answersheet, 
                user_id: AssignmentInfo.user_id, assignment_id: AssignmentInfo.assignment_id
            }
        ), 
        headers: { "Content-type": "application/json; charset=UTF-8" } }) 
        .then(response => response.json()) 
        .then(json => console.log(json))
}

function updateOneAssignment(AssignmentInfo) {

    return fetch(assignmentApiurl+AssignmentInfo.assignment_id, {
        method: 'PUT',
        body: JSON.stringify({ name: AssignmentInfo.name, description:AssignmentInfo.description, average_hours_to_complete: AssignmentInfo.average_hours_to_complete, worksheet: AssignmentInfo.worksheet, answersheet: AssignmentInfo.answersheet, user_id: AssignmentInfo.user_id, assignment_id: AssignmentInfo.assignment_id}), 
        headers: { "Content-type": "application/json; charset=UTF-8" } }) 
        .then(response => response.json()) 
        .then(json => console.log(json))
}

function deleteOne(id) {
    return fetch(assignmentApiurl+id, {
        method: 'DELETE'
    }) .then(response => response.json()) 
        .then(json => console.log(json))
}

function updateAssignment() {
    let UpdateAssignmentData = {
      assignment_id: document.getElementById("edassignment_id").value,
      name: document.getElementById("edname").value,
      description: document.getElementById("eddescription").value,
      average_hours_to_complete: document.getElementById("edhours").value,
      worksheet: document.getElementById("edworksheet").value,
      answersheet: document.getElementById("edanswersheet").value,
      user_id: document.getElementById("eduser_id").value
  }
    console.log(UpdateAssignmentData)
    updateOneAssignment(UpdateAssignmentData)
    alert("Job Complete!");
};