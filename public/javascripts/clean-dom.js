export function clearDOMTasks() {
    const taskDivs = document.querySelectorAll('.single-task')
    if (taskDivs) {
        taskDivs.forEach(child => {
            child.remove();
        })
    }
};

export function clearSearchRecs() {
    const recContainer = document.querySelectorAll('.search-rec');
    if (recContainer) {
        recContainer.forEach(child => {
            child.remove();
        })
    }
};

export function clearInput(formId) {
    const form = document.getElementById(`${formId}`);
    form.value = '';
};

export function clearSearch(e) {
    if (!e.target.classList.contains('search-container')) {
        clearSearchRecs();
        clearInput('search');
    }
};

export function clearTaskSummary() {
    const taskSummary = document.querySelector('#task-details');
    if (taskSummary.innerHTML) {
        while (taskSummary.firstChild) {
            taskSummary.removeChild(taskSummary.lastChild);
        }
    }
};
