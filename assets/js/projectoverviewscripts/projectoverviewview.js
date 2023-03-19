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
        projectStatsYetToStart : ".yet-to-start-tasks"
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
            console.log(tempDate + ", " + elem.todate);
            return currentDate == elem.todate;
        });
        console.log(deadLineTasks);
    }
    let renderProjectOverView = projectDetails => {
        //Setting contents of project details part here
        _(domStrings.projectName).textContent = projectDetails.projectName;
        _(domStrings.projectDesc).textContent = projectDetails.projectDesc;
        _(domStrings.projectFromDate).textContent = projectDetails.fromDate;
        _(domStrings.projectLastDate).textContent = projectDetails.toDate;
        _(domStrings.projectStatusValue).textContent = projectDetails.percentage;
        _(domStrings.projectStatusDiv).style.width = projectDetails.percentage + "%";
        _(domStrings.projectOwner).textContent = projectDetails.createdBy;

        renderProjectStatsSection(projectDetails);
        renderProjectDeadLineTasks(projectDetails);
    }

    return {
        getDomStrings : getDomStrings,
        renderProjectOverView : renderProjectOverView
    }
})();