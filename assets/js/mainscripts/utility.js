let _ = element => document.querySelector(element);

let _All = element => document.querySelectorAll(element);

let CURRENTSECTION = "Project";
let USERID;
let USERNAME;
let CURRENTUSERPHOTO;
let webSocket;

let getCurrentUserDetails = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "user/currentuser");
    xhr.send();
    xhr.onload = () => {
        let temp = JSON.parse(xhr.response);
        USERID = temp.currentUserId;
        USERNAME = temp.currentUserName;
        CURRENTUSERPHOTO= temp.imagePath;
        _(".top-profile-image").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
        _(".big-profile-image").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
        _(".current-user-name").textContent = USERNAME;
        webSocket = new WebSocket("ws://192.168.43.247:8787/ProApp/chat?uid=" + USERID);
        webSocket.onmessage = (event) => {
            processMessage(JSON.parse(event.data));
            // MainView.showPopUpSymbol(JSON.parse(event.data).description);
        }
    }
}
let playNotificationSound = () => {
    let audio = new Audio("assets/audio/notification_sound.mp3");
    audio.play();
}
let sendGetRequest = async url => {
    return new Promise((resolved, rejected) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = () => {    
            resolved(JSON.parse(xhr.response));   
        }
        xhr.onerror = () => {
            rejected(xhr.status);
        }
    })

}

let sendPostRequest = (url, data) => {
    return new Promise((resolved, rejected) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send(data);
        xhr.onload = () => {
            console.log("post request received");
            resolved(JSON.parse(xhr.response));
        }
        xhr.onerror = () => {
            rejected(xhr.status);
        }
    });
}
let resetProjects = async () => {
    let response = await sendGetRequest("/ProApp/project/getall");
    ProjectModel.resetProject();

    response.forEach(elem => {
        ProjectModel.addProject(ProjectModel.changeServerObject(elem), false);
    });
    ProjectView.renderProjects(ProjectModel.getProjectsArray());
    MainView.loadStatisticsData();
    resetTasks();
}
let resetTasks = async () => {
    let response = await sendGetRequest("/ProApp/task/getall");
    TaskModel.resetTasks();
    response.forEach(elem => {
        TaskModel.addTask(TaskModel.changeServerObject(elem, true), false);
    });
    TaskView.renderTasks(ProjectModel.getProjectsArray());
}
// let getAllUsers = () => {
//     sendGetRequest("/ProApp/user/getusers?id=all", function(){
//         return JSON.parse()
//     });
// }
getCurrentUserDetails();
resetProjects();