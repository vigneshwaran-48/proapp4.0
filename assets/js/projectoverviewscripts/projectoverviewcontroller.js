const ProjectOverviewController = (view => {

    let init = () => {
        
        //This is for closing the project overview section
        _(MainView.getDomStrings().closeProjectOverViewButton).addEventListener("click", event => {
            event.stopPropagation();
            _(MainView.getDomStrings().projectOverviewSection).classList.remove(MainView.getDomStrings().showFromScale);
            _(MainView.getDomStrings().currentSectionHeading).textContent = "Project";
            _(MainView.getDomStrings().newButton).classList.remove(MainView.getDomStrings().hideButton);
            _(MainView.getDomStrings().closeProjectOverViewButton).classList.add(MainView.getDomStrings().hideButton);
            _(MainView.getDomStrings().closeProjectOverViewButton).classList.remove(MainView.getDomStrings().showButton);
        });
    }
    init();
})(ProjectOverviewView);