const ProjectOverviewController = (view => {

    let resetCurrentSection = currentSectionButton => {
        let detailsSection = _(view.getDomStrings().detailsSectionButton);
        let taskSection = _(view.getDomStrings().taskSectionButton);
        let usersSection = _(view.getDomStrings().usersSectionButton);

        let sections = [detailsSection, taskSection, usersSection];
        sections.forEach(elem => {
            if(elem != currentSectionButton){
                elem.classList.remove(view.getDomStrings().currentOverviewSection);
            }
        });
    }   
    let resetSections = currentSection => {
        let detailsSection = _(view.getDomStrings().detailsSection);
        let tasksSection = _(view.getDomStrings().taskSection);
        let usersSection = _(view.getDomStrings().usersSection);

        let sections = [detailsSection, tasksSection, usersSection];
        sections.forEach(elem => {
            if(elem != currentSection){
                elem.classList.remove(MainView.getDomStrings().showFromRightToLeft);
            }
        })
    } 

    let addUserToProjectEvent = event => {
        event.stopPropagation();
        ProjectController.addUserToProject(event.target.dataset.userId, event.target.dataset.projectId);
        _(view.getDomStrings().userSearchBar).value = "";
        _(view.getDomStrings().singleSearchUserWrapper).classList.remove(view.getDomStrings().showSingleSearchUserWrapper);
    }
    let renderSearchPeople = async event => {
        const userInput = event.target.value;
        if(event.keyCode != 8 && !userInput.trim()){
            return;
        }
        const {id, createdBy} = JSON.parse(localStorage.projectDetails);
        let users;
        if(createdBy == USERID){
            users = await sendGetRequest(`/ProApp/user/project/notpresent?projectId=${id}&queryString=${userInput}`);
        }
        else {
            users = await sendGetRequest(`/ProApp/user/getusers/project?id=${id}`);
            users = users.filter(elem => userInput.length && elem.userName.toLowerCase().includes(userInput.toLowerCase()));
        }
        view.renderSearchPeople(users);
    }
    //This is for user removing action 
    let removeUser = async userId => {
        let projectId = _(view.getDomStrings().usersList).dataset.currentProjectId;
        const formData = new FormData();
        const userDetails = {
            projectId : projectId,
            userId : userId
        };
        formData.append("userData", JSON.stringify(userDetails));
        let response = await sendPostRequest("project/user/remove", formData);
        if(response.status == "success"){
            MainView.showSuccessMessage("User removed successfully");
            view.removeUser(userId);
        }
        else {
            MainView.showErrorMessage("Oops, Something went wrong");
        }
    }

    //This is for opening chat of the user action 
    let openChatOfUser = async userId => {
        _(ChatView.getDomStrings().chattingWindowCloseButton).click();
        let users = await sendGetRequest("user/getusers?id=all");
        ChatView.renderChatPeople(users);
        Array.from(_(ChatView.getDomStrings().chatAllPeopleWrapper).children).forEach(elem => {
            elem.dataset.userId == userId ? elem.click() : 0;
        });
    }
    
    let init = () => {
        
        //This is for closing the project overview section
        _(MainView.getDomStrings().closeProjectOverViewButton).addEventListener("click", event => {
            event.stopPropagation();
            _(MainView.getDomStrings().projectOverviewSection).classList.remove(MainView.getDomStrings().showFromScale);
            _(MainView.getDomStrings().currentSectionHeading).textContent = CURRENTSECTION;
            _(MainView.getDomStrings().newButton).classList.remove(MainView.getDomStrings().hideButton);
            _(MainView.getDomStrings().closeProjectOverViewButton).classList.add(MainView.getDomStrings().hideButton);
            _(MainView.getDomStrings().closeProjectOverViewButton).classList.remove(MainView.getDomStrings().showButton);
            
        });

        //This is for opening details section 
        _(view.getDomStrings().detailsSectionButton).addEventListener("click", event => {
            event.stopPropagation();
            _(view.getDomStrings().detailsSectionButton).classList.add(view.getDomStrings().currentOverviewSection);
            resetCurrentSection(_(view.getDomStrings().detailsSectionButton));
            resetSections(_(view.getDomStrings().detailsSection));
            _(view.getDomStrings().detailsSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
        });

        //This is for opening tasks section 
        _(view.getDomStrings().taskSectionButton).addEventListener("click", event => {
            event.stopPropagation();
            _(view.getDomStrings().taskSectionButton).classList.add(view.getDomStrings().currentOverviewSection);
            resetCurrentSection(_(view.getDomStrings().taskSectionButton));
            resetSections(_(view.getDomStrings().taskSection));
            _(view.getDomStrings().taskSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
        });

        //This is for opening users section 
        _(view.getDomStrings().usersSectionButton).addEventListener("click", event => {
            event.stopPropagation();
            _(view.getDomStrings().usersSectionButton).classList.add(view.getDomStrings().currentOverviewSection);
            resetCurrentSection(_(view.getDomStrings().usersSectionButton));
            resetSections(_(view.getDomStrings().usersSection));
            _(view.getDomStrings().usersSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
        });

        //This is for people searching
        _(view.getDomStrings().userSearchBar).addEventListener("keyup", renderSearchPeople);

    }
    init();

    return {
        removeUser : removeUser,
        openChatOfUser : openChatOfUser,
        addUserToProjectEvent : addUserToProjectEvent
    }
})(ProjectOverviewView);