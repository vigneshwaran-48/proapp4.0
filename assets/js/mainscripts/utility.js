let _ = element => document.querySelector(element);

let _All = element => document.querySelectorAll(element);

let CURRENTSECTION = "Project";
let USERID;
let USERNAME;
let CURRENTUSERPHOTO;
let webSocket;
let CURRENTMESSAGINTOPERSON;

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
        webSocket = new WebSocket("ws://10.52.0.38:8787/ProApp/chat?uid=" + USERID);
        webSocket.onmessage = (event) => {
            processMessage(JSON.parse(event.data));
        }
        getMessagesOfUser();
        resetNotification();
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

let sendPostRequest = (url, data, stopParsing) => {
    return new Promise((resolved, rejected) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send(data);
        xhr.onload = () => {
            if(!stopParsing){
                resolved(JSON.parse(xhr.response));
            }
            else {
                resolved("success");
            }
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
let getMessagesOfUser = async () => {
    let userMessages = await sendGetRequest("user/chats?userId=" + USERID);
    userMessages.forEach(elem => {
        elem.messageDate = elem.messageDate.replaceAll("-", "/");
        ChatModel.addMessage(ChatModel.changeFromServerObject(elem));
    });
}
let resetNotification = async () => {
    let userNotifications = await sendGetRequest("notification/getall?userId=" + USERID);
    NotificationModel.resetNotification();
    userNotifications.forEach(elem => {
        NotificationModel.addNotification(NotificationModel.changeNotificationFromServer(elem));
    });
    NotificationView.renderNotifications(NotificationModel.getNotificationsArray());
}
getCurrentUserDetails();
resetProjects();

setInterval(async () => {
    let users = await sendGetRequest("user/getusers?id=all");
    ChatView.renderStatusOfPeople(users);
    console.log(users);
}, 60000);