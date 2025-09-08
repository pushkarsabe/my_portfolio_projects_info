const myForm = document.getElementById('my-form');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const option = document.getElementById('types');
const expenseList = document.getElementById('usersExpenses');

myForm.addEventListener('submit', submitData);

//to submit the input values from the form
function submitData(e) {
    e.preventDefault();

    if (amount.value != '' && description.value != '' && option.val != '') {
        console.log('amount = ' + amount.value);
        console.log('description = ' + description.value);
        console.log('option = ' + option.value);
        let uuid = Date.now().toString();
        console.log('uuid = ' + uuid);
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${amount.value}- ${option.value}-${description.value}`));
        expenseList.appendChild(li);

        //to delete the records
        const delBtn = document.createElement('input');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('value', 'Delete Expense');
        //setting id as an email of user so we can pass the value
        delBtn.id = uuid;
        delBtn.addEventListener("click", () => deleteUser(uuid));
        li.appendChild(delBtn);
        delBtn.style.margin = '10px';
        delBtn.style.marginLeft = '10px';
        delBtn.style.padding = '5px';
        delBtn.style.fontSize = '15px';
        delBtn.style.backgroundColor = '#333';
        delBtn.style.color = 'white';

        //for adding edit button functionality 
        const editBtn = document.createElement('input');
        editBtn.setAttribute('type', 'button');
        editBtn.setAttribute('value', 'Edit Expense');
        editBtn.id = uuid;
        editBtn.addEventListener("click", () => editUser(uuid));
        li.appendChild(editBtn);
        editBtn.style.margin = '10px';
        editBtn.style.marginLeft = '10px';
        editBtn.style.padding = '5px';
        editBtn.style.fontSize = '15px';
        editBtn.style.backgroundColor = '#333';
        editBtn.style.color = 'white';

        let obj = {
            amount: amount.value,
            description: description.value,
            option: option.value,
        }
        localStorage.setItem(uuid, JSON.stringify(obj));

        amount.value = ''
        description.value = ''
        option.value = ''
    }
}//submitData

function deleteUser(val) {
    //get a parent node element and delete the user details from the list
    if (confirm('Are You Sure?')) {
        console.log('val = ', val);
        localStorage.removeItem(val);
        let parentEle = document.getElementById(val).parentElement;
        // console.log('parent element = ', parentEle);
        expenseList.removeChild(parentEle);
    }
}//deleteUser

function editUser(val) {
    try {
        //remove user details from local storage and edit the user expeses
        //to fetch Amount , Description and Option 
        const obj = JSON.parse(localStorage.getItem(val));
        console.log('obj = ' + JSON.stringify(obj));
        //if obj is valid object after parsing it then only we will use it
        if (obj) {
            let userAmount = obj.amount;
            let userDescription = obj.description;;
            let userOption = obj.amount;
            console.log('userAmount = ' + userAmount);
            console.log('userDescription = ' + userDescription);
            console.log('userOption = ' + userOption);

            // this will only remove the user from local and the list
            localStorage.removeItem(val);
            let parentEle = document.getElementById(val).parentElement;
            expenseList.removeChild(parentEle);

            // to edit the user details
            amount.value = userAmount;
            description.value = userDescription;
            option.value = userOption;
        }
    }
    catch (err) {
        console.log("can not parse the object error = " + err);
    }
}//editUser