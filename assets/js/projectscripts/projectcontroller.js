let ProjectController = ((view, model) => {

    let addProject = async projectDetails => {
        await model.addProject(projectDetails, true);
        view.renderProjects(model.getProjectsArray());
        MainView.loadStatisticsData();
    }
    let deleteProject = async id => {
        let result = await sendPostRequest("project/delete?projectId=" + id);
        if(result.status == "success"){
            MainView.showSuccessMessage("Successfully deleted project");
            resetProjects();
            resetProjects();
            MainView.loadStatisticsData();
            sendMessage(JSON.stringify({
                messageType : "projectUpdate",
                projectId : id,
                isDeleted : true,
                deletedUsers : result.deletedUsers,
                description : USERNAME + " deleted the project you were in "
            }));
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    }
    let exitProject = async id => {
        let formData = new FormData();
        let obj = {
            projectId : id,
            userId : USERID
        }
        formData.append("userData", JSON.stringify(obj));
        let result = await sendPostRequest("project/user/delete", formData);
        if(result.status == "success"){
            MainView.showSuccessMessage("Successfully exited project");
            model.removeProject(id);
            view.renderProjects(ProjectModel.getProjectsArray());
            MainView.loadStatisticsData();
            sendMessage(JSON.stringify({
                messageType : "projectUpdate",
                projectId : id,
                isExited : true,
                remainingUsers : result.remainingUsers,
                description : USERNAME + " exited from the project you were in "
            }));
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    }

    let addUserToProject = async (userId, projectId) => {
        let formData = new FormData();
        formData.append("userId", userId);
        formData.append("projectId", projectId);

        let response = await sendPostRequest("/ProApp/project/user/add", formData);
        if(response.status){
            MainView.showSuccessMessage("User added to Project successfully");
            const {users, createdBy} = model.getDataById(projectId);
            let userDetails = users.find(elem => elem.userId == userId);
            let userDiv = ProjectOverviewView.createUserDiv(userDetails, createdBy);
            _(ProjectOverviewView.getDomStrings().usersList).append(userDiv);
            
            sendMessage(JSON.stringify({
                messageType: "projectUpdate",
                projectId : projectId,
                userId : USERID,
                description :USERNAME+ " has Added you in Project"
            }));
        }
        else {
            MainView.showErrorMessage("Oops, Something went wrong ...");
        }
    }
    MainView.loadStatisticsData();
    return {
        addProject : addProject,
        deleteProject : deleteProject,
        exitProject : exitProject,
        addUserToProject : addUserToProject
    }
})(ProjectView, ProjectModel);