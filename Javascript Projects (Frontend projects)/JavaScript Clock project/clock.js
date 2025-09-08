const myForm = document.getElementById('myForm');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const timimg = document.getElementById('timimg');
const timer = document.querySelector('.timer');
const image = document.querySelector('#image');
const listItem = document.querySelector('.list');

//this will add 00 to 59 inside select of minutes
for (let i = 0; i <= 59; i++) {
    // Format the number as two digits
    let formattedNumber = i.toString().padStart(2, '0');
    // Create a new option element
    let option = document.createElement('option');
    option.value = formattedNumber;
    option.textContent = formattedNumber;
    // Append the option to the select element
    minutes.appendChild(option);
}

//this will add 1 to 12 inside select of hour
for (let i = 1; i <= 12; i++) {
    // Format the number as two digits
    let formattedNumber = i.toString().padStart(2, '0');
    // Create a new option element
    let option = document.createElement('option');
    option.value = formattedNumber;
    option.textContent = formattedNumber;
    // Append the option to the select element
    hours.appendChild(option);
}

// Calling showTime function at every second
setInterval(showTime, 1000);

// showing dynamci clock on  page
function showTime() {
    // to set the timing dynamically
    let dateInString = '';
    //get the correct date format
    if (new Date().getHours() < 12) {
        dateInString = new Date().getHours() + ' : ' + new Date().getMinutes() + ' : ' + new Date().getSeconds() + ' AM';
    } else
        dateInString = new Date().getHours() + ' : ' + new Date().getMinutes() + ' : ' + new Date().getSeconds() + ' PM';

    // console.log('dateInString = ' + dateInString);
    timer.textContent = dateInString
}
showTime();

//to display the images according to time
function setImage() {
    const imageTag = document.createElement('img');
    if (new Date().getHours() > 0 && new Date().getHours() < 12) {
        imageTag.src = 'GM.jpeg';
        image.appendChild(imageTag);
    }
    else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
        imageTag.src = 'GA.jpeg';
        imageTag.setAttribute("width", "100");
        image.appendChild(imageTag);
    }
    else if (new Date().getHours() >= 18 && new Date().getHours() <= 24) {
        imageTag.src = 'GN.jpeg';
        image.appendChild(imageTag);
    }
}
setImage();

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    console.log('submit');

    console.log('hours = ' + hours.value);
    console.log('minutes = ' + minutes.value);
    console.log('timimg = ' + timimg.value);
    let uuid = Date.now().toString();
    console.log('uuid = ' + uuid);

    if (hours.value != "" || minutes.value != "" || timimg.value != "") {

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(` ${hours.value} - ${minutes.value} - ${timimg.value}`));
        listItem.appendChild(li);

        //to delete the records
        const delBtn = document.createElement('input');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('value', 'Delete Alarm');
        //setting id as an email of user so we can pass the value
        delBtn.id = uuid;
        delBtn.addEventListener("click", () => deleteAlarm(uuid));
        li.appendChild(delBtn);
        delBtn.style.marginLeft = "70px";
        delBtn.style.padding = "2px";
        delBtn.style.backgroundColor = "#bfecc2";

        //for adding edit button functionality 
        const editBtn = document.createElement('input');
        editBtn.setAttribute('type', 'button');
        editBtn.setAttribute('value', 'Edit Alarm');
        editBtn.id = uuid;
        editBtn.addEventListener("click", () => editUser(uuid));
        li.appendChild(editBtn);
        editBtn.style.marginLeft = "70px";
        editBtn.style.padding = "2px";
        editBtn.style.backgroundColor = "#bfecc2";

        var obj = {
            hours: hours.value,
            minutes: minutes.value,
            timing: timimg.value,
        }
        localStorage.setItem(uuid, JSON.stringify(obj));
        // hours.value = "";
        // minutes.value = "";
        // timimg.value = "";
    }
}//onSubmit

function deleteAlarm(val) {
    console.log('deleteAlarm');
    //to delete the data from the BE server
    console.log('id = ' + val);

    if (confirm("Are you sure you want to delete the function ?")) {
        //deleting data from FE 
        let parentEle = document.getElementById(val).parentNode;
        listItem.removeChild(parentEle);
        //deleting from BE
        localStorage.removeItem(val);
    }
}//deleteAlarm

function editUser(val) {
    console.log('editAlarm');
    try {
        let obj = JSON.parse(localStorage.getItem(val));
        console.log('obj = ' + JSON.stringify(obj));
        if (obj) {
            console.log("hours = " + obj.hours);
            console.log("minutes = " + obj.minutes);
            console.log("timing = " + obj.timing);
            //deleting data from FE 
            let parentEle = document.getElementById(val).parentNode;
            listItem.removeChild(parentEle);
            //deleting from BE
            localStorage.removeItem(val);
            //to provide user for edit 
            hours.value = obj.hours;
            minutes.value = obj.minutes;
            timimg.value = obj.timing;
        }
    } catch (err) {
        console.log("can not parse the object error = " + err);
    }

}//editUser
