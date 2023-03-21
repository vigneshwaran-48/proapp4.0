const ProjectOverviewView = (() => {

    const domStrings = {
        projectName : ".project-name",
        projectDesc : ".project-description",
        projectStatusValue : ".single-project-info-div-inner-progress-value",
        projectStatusDiv : ".single-project-info-div-inner-progress",
        projectFromDate : ".project-start-date",
        projectLastDate : ".project-last-date",
        projectOwner : ".project-owner",
        projectStatsName : ".project-overview-stats-name",
        projectStatsTotal : ".total-number-of-tasks",
        projectStatsCompleted : ".completed-tasks",
        projectStatsInProgress : ".in-progress-tasks",
        projectStatsYetToStart : ".yet-to-start-tasks",
        deadLineTasksWrapper : ".project-overview-details-tasks-wrapper",
        singleTask : "single-task",
        deadLineSingleTask : "project-overview-single-task",
        currentOverviewSection : "current-project-overview-section",
        detailsSectionButton : ".project-overview-details",
        taskSectionButton : ".project-overview-tasks",
        usersSectionButton : ".project-overview-users",
        detailsSection : ".project-overview-details-body",
        taskSection : ".project-overview-tasks-body",
        usersSection : ".project-overview-users-body",
        statCircle : ".project-overview-right-page-outer-circle",
        tasksWrapper : ".project-overview-tasks-wrapper",
        singleOverviewTask : "single-overview-task",
        userDiv : "single-project-overview-user",
        userImageDiv : "single-project-overview-user-image",
        userNamePara : "single-project-overview-user-name",
        userDeleteSpan : "single-project-overview-user-delete-button",
        userDeleteIcon : ["fa-solid", "fa-trash"],
        userChatButton : "project-overview-chat-button",
        usersList : ".project-overview-users-body-users-list"
    }

    const getDomStrings = () => domStrings;

    const renderProjectStatsSection = async projectDetails => {
        _(domStrings.projectStatsName).textContent = projectDetails.projectName;
        let projectStats = await sendGetRequest("project/get-stats?projectId=" + projectDetails.id);
        _(domStrings.projectStatsYetToStart).textContent = projectStats.yetToStart;
        _(domStrings.projectStatsInProgress).textContent = projectStats.onProgress;
        _(domStrings.projectStatsCompleted).textContent = projectStats.completed;
        _(domStrings.projectStatsTotal).textContent = projectStats.total;

        if(!projectStats.yetToStartPercentage && !projectStats.onProgressPercentage && !projectStats.completedPercentage){
            _(domStrings.statCircle).style.backgroundImage = `conic-gradient(rgb(64, 142, 238) 0%, rgb(64, 142, 238) 100%)`; 
        }
        else {
            _(domStrings.statCircle).style.backgroundImage = `conic-gradient(
                rgb(64, 142, 238) 0%,
                rgb(64, 142, 238) ${projectStats.yetToStartPercentage}%,
                rgb(255, 165, 0) ${projectStats.yetToStartPercentage}%,
                rgb(255, 165, 0) ${projectStats.onProgressPercentage + projectStats.yetToStartPercentage}%,
                green ${projectStats.onProgressPercentage}%,
                green ${projectStats.completedPercentage + projectStats.onProgressPercentage}%`;
        }
    }

    const renderProjectDeadLineTasks = async projectDetails => {
        let tasks = await sendGetRequest("task/getby-pid?projectId=" + projectDetails.id + "&userId=" + USERID);
        let deadLineTasks = tasks.filter(elem => {
            let currentDate = new Date();
            let tempDate = currentDate.getFullYear() + "-";
            tempDate += (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1): currentDate.getMonth() + 1;
            tempDate += "-" + currentDate.getDate();
            return tempDate == elem.todate;
        });
        _(domStrings.deadLineTasksWrapper).innerHTML = "";
        deadLineTasks.forEach(elem => {
            let singleTask = document.createElement("div");
            let taskName = document.createElement("h2");
            let peopleWrapper = document.createElement("div");

            singleTask.classList.add(domStrings.singleTask);
            singleTask.classList.add(domStrings.deadLineSingleTask);
            singleTask.classList.add("light-theme");
            singleTask.classList.add("x-axis-flex");
            peopleWrapper.classList.add(TaskView.getDomStrings().allTaskPeopleImageWrapper);
            peopleWrapper.classList.add("x-axis-flex");

            ProjectView.getPhotoSection(elem.users, peopleWrapper, TaskView.getDomStrings().personImageWrapper, TaskView.getDomStrings().personImage, true)

            taskName.textContent = elem.taskName;
            singleTask.append(taskName, peopleWrapper);
            _(domStrings.deadLineTasksWrapper).append(singleTask);
        });
    }

    const removeTask = taskId => {
        const displayingTasks = _All("." + domStrings.singleOverviewTask);
        displayingTasks.forEach(elem => {
            elem.id.slice(24) == taskId ? elem.remove() : 0;
        });
    }

    const renderProjectDetails = async projectDetails => {
        _(domStrings.projectName).textContent = projectDetails.projectName;
        _(domStrings.projectDesc).textContent = projectDetails.projectDesc;
        _(domStrings.projectFromDate).textContent = projectDetails.fromDate;
        _(domStrings.projectLastDate).textContent = projectDetails.toDate;
        _(domStrings.projectStatusValue).textContent = projectDetails.percentage;
        _(domStrings.projectStatusDiv).style.width = projectDetails.percentage + "%";

        let userDeatils = await sendGetRequest("user/getusers?id=" + projectDetails.createdBy);
        _(domStrings.projectOwner).textContent = userDeatils.userName;
    }

    const createUserDiv = userDetails => {
        let userDiv = document.createElement("div");
        let userImageDiv = document.createElement("div");
        let userNamePara = document.createElement("p");
        let userDeleteSpan = document.createElement("span");
        let userDeleteIcon = document.createElement("i");
        let userChatButton = document.createElement("button");

        userDiv.classList.add(domStrings.userDiv);
        userDiv.classList.add("x-axis-flex");
        userDiv.classList.add("light-theme");

        userImageDiv.classList.add(domStrings.userImageDiv);
        userImageDiv.classList.add("full-light-theme");

        userNamePara.classList.add(domStrings.userNamePara);
        userDeleteSpan.classList.add(domStrings.userDeleteSpan);
        domStrings.userDeleteIcon.forEach(elem => userDeleteIcon.classList.add(elem));
        userChatButton.classList.add(domStrings.userChatButton);
        userChatButton.classList.add("common-button");

        userChatButton.type = "button";
        userChatButton.textContent = "Chat";
        userImageDiv.style.backgroundImage =   `url(/ProApp/assets/images/usersImages/${userDetails.imagePath})`;
        userNamePara.textContent = userDetails.userName;
        userDeleteSpan.id = "project-overview-user-" + userDetails.userId;
        userDeleteIcon.id = "project-overview-user-" + userDetails.userId;

        userDeleteSpan.append(userDeleteIcon);
        userDiv.append(userImageDiv, userNamePara, userDeleteSpan, userChatButton);

        return userDiv;
    }

    const renderTasks = async projectDetails => {
        const tasks = await sendGetRequest("task/getby-pid?projectId=" + projectDetails.id + "&userId=" + USERID);
        console.log(tasks);
        _(domStrings.tasksWrapper).innerHTML = "";
        tasks.forEach(task => {
            //Creating elements for a single task starts here
            let singleTask = document.createElement("div");

            let taskNameCheckboxWrapper = document.createElement("div");
            let taskCheckBox = document.createElement("input");
            let taskHeadingTag = document.createElement("h2");

            let taskButtonsPhotosWrapper = document.createElement("div");
            let taskButtonsWrapper = document.createElement("div");
            let taskTrashIconSpan = document.createElement("span");
            taskTrashIconSpan.id = "delete-task-overview" + task.taskId;
            let taskTrashIcon = document.createElement("i");
            taskTrashIcon.id = "delete-task-overview" + task.taskId;
            let taskExitIconSpan = document.createElement("span")
            taskTrashIconSpan.id = "delete-task-overview" + task.taskId;
            let taskExitIcon = document.createElement("i");
            taskExitIcon.id = "delete-task-overview" + task.taskId;
            let taskPeopleWrapper = document.createElement("div");
            //Setting photos for people
            ProjectView.getPhotoSection(task.users, taskPeopleWrapper, TaskView.getDomStrings().personImageWrapper, TaskView.getDomStrings().personImage, true);
            //Creating elements for a single task ends here

            //Adding classes to created task components starts here
            singleTask.classList.add(TaskView.getDomStrings().singleTask);
            singleTask.classList.add(domStrings.singleOverviewTask);
            singleTask.classList.add("light-theme");
            singleTask.classList.add("x-axis-flex");
            singleTask.id = "single-task-overview-id-" + task.taskId;
            
            taskNameCheckboxWrapper.classList.add(TaskView.getDomStrings().taskNameCheckboxWrapper);
            taskNameCheckboxWrapper.classList.add("x-axis-flex");
            taskCheckBox.classList.add(TaskView.getDomStrings().taskCheckBox);
            taskCheckBox.id = "task-overview" + task.taskId;
            taskCheckBox.type = "checkbox";
            taskHeadingTag.classList.add(TaskView.getDomStrings().singleTaskHeading);
            
            taskButtonsPhotosWrapper.classList.add(TaskView.getDomStrings().taskButtonsPhotoWrapper);
            taskButtonsPhotosWrapper.classList.add("x-axis-flex");
            taskButtonsWrapper.classList.add(TaskView.getDomStrings().taskButtonWrapper);
            taskButtonsWrapper.classList.add("x-axis-flex");
            taskTrashIconSpan.classList.add(TaskView.getDomStrings().singleTaskIcon);
            taskExitIconSpan.classList.add(TaskView.getDomStrings().singleTaskIcon);
            TaskView.getDomStrings().trashIconClasses.forEach(elem => {
                taskTrashIcon.classList.add(elem);
            });
            TaskView.getDomStrings().exitIconClasses.forEach(elem => {
                taskExitIcon.classList.add(elem);
            });
            
            taskPeopleWrapper.classList.add(TaskView.getDomStrings().allTaskPeopleImageWrapper);
            taskPeopleWrapper.classList.add("x-axis-flex");
            //Making the task div checked if it is completed here
            console.log(task.isCompleted);
            if(task.isCompleted){
                
                taskCheckBox.checked = true;
                taskHeadingTag.classList.add(TaskView.getDomStrings().finishTask);
            }

            //Adding contents and listeners to the created elements
            taskCheckBox.addEventListener("click", event => {
                event.stopPropagation();
                TaskController.finishTask(event);
            });
            taskHeadingTag.textContent = task.taskName.slice(0, 15);
            taskTrashIconSpan.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                console.log(event.target.id.slice(20));
                TaskController.deleteTask(event.target.id.slice(20));
                removeTask(event.target.id.slice(20));
            });
            taskExitIconSpan.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                TaskController.exitTask(event.target.id.slice(20));
                removeTask(event.target.id.slice(20));
            });
            
            //Inserting elements to its respective parent
            taskNameCheckboxWrapper.append(taskCheckBox, taskHeadingTag);
            taskTrashIconSpan.append(taskTrashIcon);
            taskExitIconSpan.append(taskExitIcon);
            if(USERID == task.createdBy){
                taskButtonsWrapper.append(taskTrashIconSpan);
            }
            else {
                taskButtonsWrapper.append(taskExitIconSpan);
            }
            taskButtonsPhotosWrapper.append(taskButtonsWrapper, taskPeopleWrapper);

            singleTask.append(taskNameCheckboxWrapper, taskButtonsPhotosWrapper);
            _(domStrings.tasksWrapper).append(singleTask);
        });
    }

    const renderUserSection = userDetails => {
        _(domStrings.usersList).innerHTML = "";
        userDetails.forEach(elem => {
            _(domStrings.usersList).append(createUserDiv(elem));
        });
    }

    const renderProjectOverView = projectDetails => {
        renderProjectDetails(projectDetails);
        renderProjectStatsSection(projectDetails);
        renderProjectDeadLineTasks(projectDetails);
        renderTasks(projectDetails);
        renderUserSection(projectDetails.users);
    }

    return {
        getDomStrings : getDomStrings,
        renderProjectOverView : renderProjectOverView
    }
})();