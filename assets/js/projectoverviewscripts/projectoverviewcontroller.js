const ProjectOverviewController = (view => {

    let resetCurrentSection = currentSectionButton => {
        console.log(currentSectionButton);
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
        console.log(currentSection);
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
        })
    }
    init();
})(ProjectOverviewView);