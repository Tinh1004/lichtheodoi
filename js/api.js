

//tạo biến chưa link Api
var cmtApi = "http://localhost:3000/posts";

//hàm chạy
function start(){
    getCourses(renderComment);

    handleCreateForm();
}

//gọi lại hàm 
start();

//functions
function getCourses(callback){
    fetch(cmtApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

//hàm render

function renderComment(elements){
    var listComments=  document.querySelector(".info");
    var html = elements.map(function(element){
        return `
            <li class="comment-item-${element.id}">
                <div class="title">
                    <h4>${element.name}</h4><span>${element.time}</span>
                </div>

                <div class= "comment">
                    <div class="comment-left">
                        <p>${element.content}</p>
                    </div>
                    <div class="comment-right">
                        <button id="close" onclick= "handleDeleteCourse(${element.id})">xóa</button>   
                    </div>
                <div>

            </li>
        `
    });
    listComments.innerHTML = html.join("");
}

//get time
function getDateNow() {
    var dateNow = new Date;
    return dateNow.getMinutes()>10
    ?`${dateNow.getHours()}:${dateNow.getMinutes()} - ${dateNow.getDate()}/${dateNow.getMonth()+1}/${dateNow.getFullYear()}`
    :`${dateNow.getHours()}:0${dateNow.getMinutes()} - ${dateNow.getDate()}/${dateNow.getMonth()+1}/${dateNow.getFullYear()}`;
}
console.log(getDateNow())



//xử lí tạo thêm
function handleCreateForm(){
    var createBtn = document.querySelector("#btn-print");
    createBtn.onclick = function(){
        var name = document.querySelector('#name').value;
        var email = document.querySelector('#email').value;
        var content = document.querySelector('#content').value;
        console.log(name)
        console.log(email)
        console.log(content)

        if(name==='' || content===''){
            alert('không được để trống');
            return;
        }

        var formData = {
            name: name,
            email: email,
            content: content,
            time: getDateNow()
        }
        createCourse(formData, function(){
            getCourses(renderComment);
        });
    }
}

//create 
function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(cmtApi,options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}


//hàm xóa handleDeleteCourse
function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    fetch(cmtApi+'/'+id,options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            //getCourses(renderCourse);//renderCourse
            var courseItem = document.querySelector(`.comment-item-${id}`);
            if(courseItem){
                courseItem.remove();
            }
        });
}