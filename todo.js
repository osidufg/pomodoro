 const inputVal = document.getElementsByClassName('inputVal')[0];

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please Enter a Task")
    }
    else{
        let localItems = JSON.parse( localStorage.getItem('localItem'))
        if(localItems === null){
            taskList = []
   
        } else{
           taskList = localItems;
        }
        taskList.push(inputVal.value)
        localStorage.setItem('localItem', JSON.stringify(taskList));

        showItem();

        // document.querySelector('#tasks').innerHTML += `
        // <div class="task">
        //     <span id="taskname">
        //         ${document.querySelector('#newtask input').value}
        //     </span>
        //     <button class="delete">
        //     delete
        //     </button>
        // </div>
        // `;
        


        // var current_tasks = document.querySelectorAll(".delete");
        // for(var i=0; i<current_tasks.length; i++){
        //     current_tasks[i].onclick = function(){
        //         this.parentNode.remove();
        //     }
        // }

        var tasks = document.querySelectorAll(".task");
        for(var i=0; i<tasks.length; i++){
            tasks[i].onclick = function(){
                this.classList.toggle('done');
            }
        }


        document.querySelector("#newtask input").value = "";
    }
}

function showItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    if(localItems === null){
         taskList = []
    }else{
        taskList = localItems;
    }

    let html = '';
    taskList.forEach((data, index) => {
        html += `
        <div class="task">
            <span id="taskname" onClick="doneItem()">                
                ${data}
            </span>
            <button class="delete" onClick="deleteItem(${index})">delete</button>
        </div>
        `
    })
    document.querySelector('#tasks').innerHTML = html
    // ${document.querySelector('#newtask input').value}
    // <button class="delete">
    // delete
    // </button>
}
showItem();

function deleteItem(index){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showItem()
}

function doneItem(){
    let localItems = JSON.parse( localStorage.getItem('localItem'))
    var tasks = document.querySelectorAll(".task");
    for(var i=0; i<tasks.length; i++){
        tasks[i].onclick = function(){
            this.classList.toggle('done');
        }
    }
}