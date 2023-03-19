const ProjectOverviewView = (() => {

    let domStrings = {
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
        usersSection : ".project-overview-users-body"
    }

    let getDomStrings = () => domStrings;

    let renderProjectStatsSection = projectDetails => {
        _(domStrings.projectStatsName).textContent = projectDetails.projectName;

    }

    let renderProjectDeadLineTasks = async projectDetails => {
        let tasks = await sendGetRequest("task/getby-pid?projectId=" + projectDetails.id);
        console.log(tasks);
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
            singleTask.classList.add(domStrings.singleTask);
            singleTask.classList.add(domStrings.deadLineSingleTask);
            singleTask.classList.add("light-theme");
            singleTask.classList.add("x-axis-flex");
            // let peopleWrapper = ProjectView.getPhotoSection()

            taskName.textContent = elem.taskName;
            singleTask.append(taskName);
            _(domStrings.deadLineTasksWrapper).append(singleTask);
        });
    }

    let renderProjectDetails = async projectDetails => {
        _(domStrings.projectName).textContent = projectDetails.projectName;
        _(domStrings.projectDesc).textContent = projectDetails.projectDesc;
        _(domStrings.projectFromDate).textContent = projectDetails.fromDate;
        _(domStrings.projectLastDate).textContent = projectDetails.toDate;
        _(domStrings.projectStatusValue).textContent = projectDetails.percentage;
        _(domStrings.projectStatusDiv).style.width = projectDetails.percentage + "%";

        let userDeatils = await sendGetRequest("user/getusers?id=" + projectDetails.createdBy);
        _(domStrings.projectOwner).textContent = userDeatils.userName;
    }
    let renderProjectOverView = projectDetails => {
        renderProjectDetails(projectDetails);
        renderProjectStatsSection(projectDetails);
        renderProjectDeadLineTasks(projectDetails);
    }

    return {
        getDomStrings : getDomStrings,
        renderProjectOverView : renderProjectOverView
    }
})();