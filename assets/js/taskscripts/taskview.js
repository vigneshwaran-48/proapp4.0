let TaskView = (() => {

    let domStrings = {
        taskMiddleSectionBody : ".task-middle-section-body",
        singleProjectTaskWrapper : "single-project-task-wrapper",
        singleProjectsTaskHeading : "single-projects-task-heading",
        singleTaskWrapper : "single-task-wrapper",
        singleTask : "single-task",
        taskNameCheckboxWrapper : "task-name-checkbox-wrapper",
        taskCheckBox : "common-task-check-input",
        singleTaskHeading : "single-task-heading",
        taskButtonsPhotoWrapper : "task-buttons-photos-wrapper",
        taskButtonWrapper : "task-buttons-wrapper",
        singleTaskIcon : "single-task-icon",
        trashIconClasses : ["fa-solid", "fa-trash"],
        exitIconClasses : ["fa-solid", "fa-right-from-bracket"],
        allTaskPeopleImageWrapper : "all-task-people-wrapper",
        personImageWrapper : "person-image-wrapper",
        personImage : "person-image",
        taskOptionsWrapper : "task-options-wrapper",
        taskOption : "task-option",
        taskEditButton : "task-edit-button",
        taskMoreInfoButton : "task-more-info-button",
        taskCompleteButton : "task-complete-button"
    }
    
    let getDomStrings = () => domStrings;

    let renderTasks = projects => {
        let tasks = {};
        projects.forEach(elem => {
            tasks[elem.projectName] = TaskModel.getTasksByProjectId(elem.id);
        });
        _(domStrings.taskMiddleSectionBody).innerHTML = "";
        Object.keys(tasks).forEach(singleProject => {
            //This elements are for whole single task wrapper for a specific project
            let singleProjectTaskSection = document.createElement("section");
            let projectNameTag = document.createElement("h1");
            let tasksWrapper = document.createElement("div");

            singleProjectTaskSection.classList.add(domStrings.singleProjectTaskWrapper);
            singleProjectTaskSection.classList.add("semi-light-theme");
            singleProjectTaskSection.classList.add("y-axis-flex");

            projectNameTag.classList.add(domStrings.singleProjectsTaskHeading);
            tasksWrapper.classList.add(domStrings.singleTaskWrapper);
            tasksWrapper.classList.add("semi-light-theme");
            tasksWrapper.classList.add("y-axis-flex");

            singleProjectTaskSection.append(projectNameTag, tasksWrapper);
            tasks[singleProject].forEach(task => {
                //Creating elements for a single task starts here
                let singleTask = document.createElement("div");

                let taskNameCheckboxWrapper = document.createElement("div");
                let taskCheckBox = document.createElement("input");
                let taskHeadingTag = document.createElement("h2");

                let taskButtonsPhotosWrapper = document.createElement("div");
                let taskButtonsWrapper = document.createElement("div");
                let taskTrashIconSpan = document.createElement("span");
                let taskTrashIcon = document.createElement("i");
                let taskExitIconSpan = document.createElement("span");
                let taskExitIcon = document.createElement("i");
                let taskPeopleWrapper = document.createElement("div");
                //Setting photos for people
                ProjectView.getPhotoSection(task.users, taskPeopleWrapper, domStrings.personImageWrapper, domStrings.personImage);

                let taskOptionsWrapper = document.createElement("ul");
                let taskOption1 = document.createElement("li");
                let taskOption2 = document.createElement("li");
                let taskOption3 = document.createElement("li");
                //Creating elements for a single task ends here

                //Adding classes to created task components starts here
                singleTask.classList.add(domStrings.singleTask);
                singleTask.classList.add("light-theme");
                singleTask.classList.add("x-axis-flex");

                taskNameCheckboxWrapper.classList.add(domStrings.taskNameCheckboxWrapper);
                taskNameCheckboxWrapper.classList.add("x-axis-flex");
                taskCheckBox.classList.add(domStrings.taskCheckBox);
                taskCheckBox.id = "task" + task.id;
                taskCheckBox.type = "checkbox";
                taskHeadingTag.classList.add(domStrings.singleTaskHeading);
                
                taskButtonsPhotosWrapper.classList.add(domStrings.taskButtonsPhotoWrapper);
                taskButtonsPhotosWrapper.classList.add("x-axis-flex");
                taskButtonsWrapper.classList.add(domStrings.taskButtonWrapper);
                taskButtonsWrapper.classList.add("x-axis-flex");
                taskTrashIconSpan.classList.add(domStrings.singleTaskIcon);
                taskExitIconSpan.classList.add(domStrings.singleTaskIcon);
                trashIconClasses.forEach(elem => {
                    taskTrashIcon.classList.add(elem);
                });
                exitIconClasses.forEach(elem => {
                    taskExitIcon.classList.add(elem);
                });

                taskOptionsWrapper.classList.add(domStrings.taskOptionsWrapper);
                taskOptionsWrapper.classList.add("full-light-theme");
                taskOption1.classList.add(domStrings.taskOption);
                taskOption1.classList.add("task-edit-button");
                taskOption2.classList.add(domStrings.taskOption);
                taskOption2.classList.add("task-more-info-button")
                taskOption3.classList.add(domStrings.taskOption);
                taskOption3.classList.add("task-complete-button");

                //Inserting elements to its respective parent
                taskNameCheckboxWrapper.append(taskCheckBox, taskHeadingTag);
                taskButtonsWrapper.append(taskTrashIconSpan.append(taskTrashIcon), taskExitIconSpan.append(taskExitIcon));
                taskButtonsPhotosWrapper.append(taskButtonsWrapper, taskPeopleWrapper);
                taskOptionsWrapper.append(taskOption1, taskOption2, taskOption3);

                singleTask.append(taskNameCheckboxWrapper, taskButtonsPhotosWrapper, taskOptionsWrapper);
                tasksWrapper.append(singleTask);
            });
            _(domStrings.taskMiddleSectionBody).append(singleProjectTaskSection);
        })
    }

    return {
        getDomStrings : getDomStrings,
        renderTasks : renderTasks
    }
})();