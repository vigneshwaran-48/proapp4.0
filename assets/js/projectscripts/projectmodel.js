let ProjectModel = (() => {

    let Project = function(id, projectName, projectDesc, status, fromDate, toDate, users, createdBy, percentage){
        this.id = id;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.status = status;
        this.percentage = percentage;
        this.users = users;
        this.createdBy = createdBy;
    }
    let changeServerObject = function(serverObject){        
        return new Project(serverObject.id, serverObject.projectName, serverObject.projectDesc, serverObject.status, serverObject.fromDate, serverObject.toDate, serverObject.users, serverObject.createdBy, serverObject.percentage);
    }
    //This method will send data to server and push it to local projectArray
    let addProjectToServer = (projectName, projectDesc, fromDate, toDate, users) => {
        let formData = new FormData();
        let tempCreated = USERID;
        let tempObj = {
            projectName : projectName,
            projectDesc : projectDesc,
            fromDate : fromDate,
            toDate : toDate,
            users : users,
            createdBy : tempCreated
        }
        
        formData.append("data", JSON.stringify(tempObj));
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/ProApp/project/add");
        xhr.send(formData);
        xhr.onload = () => {
            let serverObject = JSON.parse(xhr.response); 
            let project = changeServerObject(serverObject);
            projectsArray.push(project);
            MainView.showSuccessMessage("project added succesfully");
            // ProjectView.renderProjects(ProjectModel.getProjectsArray());
        }
    }
    let projectsArray = [];

    let getProjectsArray = () => projectsArray.slice();
    
    let getIndexOfProject = id => {
        return projectsArray.findIndex(elem => {
            return elem.id == id;
        });
    }
    let resetProject = () => projectsArray = [];
    
    let removeProject = id => projectsArray.splice(getIndexOfProject(id), 1);

    //This method split the object and give details to addProjectToServer.
    let addProject = projectDetails => addProjectToServer(projectDetails.name, projectDetails.description, projectDetails.fromDate, projectDetails.toDate, projectDetails.people);
    
    let changeStatus = (status, id) => projectsArray[getIndexOfProject(id)].status = status;
      
    return {
        getProjectsArray : getProjectsArray,
        removeProject : removeProject,
        changeStatus : changeStatus,
        addProject : addProject,
        getIndexOfProject : getIndexOfProject,
        resetProject : resetProject
    }
})();