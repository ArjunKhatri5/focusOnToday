let tasks = document.querySelectorAll(".tasks");

let radioBtn = document.querySelectorAll(".radioBtn");

let paraMain = document.querySelector(".para-main")
let paraMain2 = document.querySelector(".para-main-2");

let progress = document.querySelector(".progress");

let deleteBtn = document.querySelectorAll(".deleteBtn");
// let addMoreTask = document.querySelector('..addMoreTask');
let reset = document.querySelector(".reset");

// variables
let taskObj = JSON.parse(localStorage.getItem('taskObj')) || {};
let taskSet = JSON.parse(localStorage.getItem('taskSet')) || [];
let completedTask = parseInt(localStorage.getItem("completedTask")) || 0;

// end quote
let q = document.querySelector('q');

let quotes = [
    'Raise the bar by completing you goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the tasks, time to chill 😄🎉'
]


function radioBtnOnLoad(n){

    if(taskSet.length === tasks.length){
        radioBtn[n].style.backgroundColor = 'gray';
        radioBtn[n].parentElement.children[1].classList.add('completed')

        radioBtn[n].parentElement.children[1].setAttribute('readOnly', 'true');
        
        if(completedTask > 0){
            progressBar();
            radioBtn[n].style.pointerEvents = 'none';
        }
    }
}


if(taskObj['task 1']){
    tasks[0].value = taskObj['task 1'].value;
    if(taskObj['task 1'].completed) radioBtnOnLoad(0);
}

if(taskObj['task 2']){
    tasks[1].value = taskObj['task 2'].value;
    if(taskObj['task 2'].completed) radioBtnOnLoad(1)
}

if(taskObj['task 3']){
    tasks[2].value = taskObj['task 3'].value;
    if(taskObj['task 3'].completed) radioBtnOnLoad(2);
}

// if(taskObj['task 4']){
//     tasks[2].value = taskObj['task 4'].value;
//     if(taskObj['task 4'].completed) radioBtnOnLoad(3);
// }



tasks.forEach((task)=>{
    
    task.addEventListener('change', (e)=>{
        taskObj[e.target.name] = {
            value : e.target.value,
            completed: false,
        };

        taskSet.push(e.target.name)
        
        localStorage.setItem("taskObj", JSON.stringify(taskObj));
        localStorage.setItem("taskSet", JSON.stringify(taskSet));

        e.target.setAttribute('readOnly', 'true');
        
        if(taskSet.length === tasks.length){
            paraMain2.innerText = ''
        }
    })
});



radioBtn.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{

        if(paraMain2.innerText) paraMain2.innerText = ''

        if(taskObj[e.target.parentElement.children[1].name].completed){
            paraMain2.innerText = 'can\'t unmarks completed tasks, use reset button instead';

        } else {
            if(taskSet.length === tasks.length){
                btn.style.backgroundColor = 'gray';
                btn.parentElement.children[1].classList.add('completed')
    
               taskObj[e.target.nextElementSibling.name].completed = true;
               localStorage.setItem("taskObj", JSON.stringify(taskObj));

               if(completedTask < tasks.length){
                   completedTask++;
                   localStorage.setItem('completedTask', completedTask);
                   progressBar();
                }
                
                e.target.setAttribute('readOnly', 'false');

            } else {
                paraMain2.innerText = "Please set all the 3 goals!"
            };
        }
        
    })
});



function progressBar(){
    progress.className = 'progress';

    if(completedTask > 0){
        progress.innerText = `${completedTask}/3 Task Completed.`
        progress.style.width = `${completedTask / tasks.length * 100}%`
        progress.style.height = `100%`
        paraMain.innerText = quotes[completedTask];

        if(completedTask === tasks.length) q.innerText = 'Keep going, you are making great progress!'
    }
}



deleteBtn.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        if(completedTask === 0){

            if(taskSet.length > 0 ){
                e.target.previousElementSibling.removeAttribute('readOnly');
                e.target.previousElementSibling.value = '';
                e.target.previousElementSibling.style.textDecoration = 'none';
                e.target.parentElement.children[0].style.backgroundColor = 'white';

                taskObj[e.target.previousElementSibling.name] = {
                    value : '',
                    completed: false,
                };

                completedTask > 0 && completedTask--
    
                taskSet.pop();
                
                localStorage.setItem("taskObj", JSON.stringify(taskObj));
                localStorage.setItem("taskSet", JSON.stringify(taskSet));
                localStorage.setItem('completedTask', completedTask);
                progressBar();
    
            }  else {
                paraMain2.innerText = "No task to remove";
            }

        } else {
            paraMain2.innerText = "You can only edit tasks when no tasks are completed. For now Use 'reset' button instead."
        }
        });
})


// addMoreTask.addEventListener('click', ()=>{

// });


reset.addEventListener('click', ()=>{
    localStorage.clear();
    location.reload();
})