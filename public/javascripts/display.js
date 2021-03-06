// Fade background
export function fadeBackground(e) {
    const isFaded = document.querySelector('.page-cover')
    if (!isFaded) {
        const body = document.body;
        const div = document.createElement('div');
        div.classList.add('page-cover');
        removeSelfOnClick(div);
        showPageListeners();
        div.addEventListener('click', hideListNameDiv)
        body.prepend(div);
    }
};

export function showPageListeners() {
    const buttons = document.querySelectorAll('button');
    const exitWindow = document.querySelector('.close');
    exitWindow.addEventListener('click', (e) => {
        hideContainer('page-cover');
    })
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            hideContainer('page-cover');
        })
    })
}

function removeSelfOnClick(container) {
    const className = container.className;
    container.addEventListener('click', (e) => {
        hideContainer(className)
    })
}

// Create / Rename List forms
export async function showCreateList(e) {
    const addListDiv = document.querySelector('#add-list');
    addListDiv.style.display = 'block';
    addListDiv.style.position = 'fixed';
    fadeBackground();
}

export async function showRenameList(e) {
    const renameListDiv = document.querySelector('#rename-list');
    renameListDiv.style.display = 'block';
    renameListDiv.style.position = 'fixed';
    fadeBackground()
}

// hide list options
export function hideListOptions(e) {
    if (!e.target.classList.contains('far')) {
        const box = document.querySelector('.list-edit-dropdown')
        if (box) {
            box.remove();
        }
    }
}

// Show / Hide Task Button
export function showTaskButton(e) {
    const addTaskInp = document.querySelector('input#name.inp-field');
    const addTaskButton = document.querySelector('.add-task-button > button');
    e.preventDefault()
    if (addTaskInp.value) {
        addTaskButton.disabled = false;
    }
    else addTaskButton.disabled = true;
};

export const hideTaskButton = (e) => {
    const addTaskFormDiv = document.querySelector('#add-task-form');
    const addTaskButtonDiv = document.querySelector('.add-task-button');
    if (addTaskFormDiv.contains(e.target)) {
        e.preventDefault()
        addTaskButtonDiv.classList.add('add-task-button-transition');
    }
    else addTaskButtonDiv.classList.remove('add-task-button-transition');
};

// Hide Add / Rename form
export function hideListNameDiv(e) {
    const addListDiv = document.querySelector('#add-list');
    const renameListDiv = document.querySelector('#rename-list');

    if (e.target.className !== 'logout') {
        if (((!addListDiv.contains(e.target) &&
            !renameListDiv.contains(e.target)) &&
            !e.target.id === 'summary-list-select' &&
            !e.target.classList.contains('list-edit-option') &&
            !e.target.classList.contains('far')) ||
            e.target.className === 'submit-list' ||
            e.target.className === 'cancel-submit-list' ||
            e.target.classList.contains('close') ||
            e.target.classList.contains('page-cover') ||
            e.target.className === 'rename-list') {
            addListDiv.style.display = 'none';
            renameListDiv.style.display = 'none';
            const nameForm = document.getElementById('addList');
            const renameForm = document.getElementById('renameList');

            nameForm.value = '';
            renameForm.value = '';
            hideContainer('page-cover');
        }
    }

};

export function hideDropDown(e) {
    const listMenu = document.querySelector(".list-of-lists");
    const postponeMenu = document.querySelector(".postpone-dates");
    const priorityList = document.querySelector('.list-of-tags');
    const calDiv = document.querySelector('.hidden-cal')
    //const listContainers = document.querySelectorAll('.list-container');
    const searchRecs = document.querySelector('.search-recommendations');
    if (e.target.className !== 'logout') {
        if (!listMenu.className.includes(e.target) &&
            !e.target.className.includes('grid-square') &&
            !e.target.className.includes('list-header') &&
            !e.target.className.includes('add-tag-input') &&
            !e.target.className.includes('fas') &&
            !e.target.className.includes('search')) {
            listMenu.style.display = 'none';
            postponeMenu.style.display = 'none';
            priorityList.style.display = 'none';
            searchRecs.style.display = 'none';
            calDiv.style.display = 'none';
            deselectSearchField()
        }
    }
};

export function selectSearchField(e) {
    const searchField = document.querySelector('.search')
    const searchIcon = document.querySelector('.fa-search');
    searchField.classList.add('search-selected');
    searchField.placeholder = 'Search task';
    searchIcon.classList.add('search-selected');
}

export function deselectSearchField(e) {
    const searchField = document.querySelector('.search');
    const searchIcon = document.querySelector('.fa-search');
    searchIcon.classList.remove('search-selected');
    searchField.classList.remove('search-selected');
    searchField.placeholder = '';
}

// Toggles
export async function toggleListSelect(e, listDiv) {
    const prevSelected = document.querySelector('.selected-list');
    const taskOptions = document.querySelector('.task-options');
    const checkBox = document.querySelector('.checkbox-all > input');
    const location = window.location.href.split('/')[4];
    checkBox.checked = false;
    taskOptions.style.visibility = 'hidden';

    let list = e.target
    if (listDiv) list = listDiv;

    if (list.classList.contains('sidebar-box')) {
        list = list.children[0];
    }
    if (prevSelected) {
        if (list.dataset.listid || list.classList.contains('inbox-list') || location === '#priority') {
            const taskSummaryDiv = document.querySelector('#task-details');
            taskSummaryDiv.classList.remove('task-details-display');
        }
        await deselectList()
    }
    await selectList(list)

};

export function toggleListDisplay(container, e) {
    const icon = container.parentNode.querySelector('.fas');
    const isSelected = container.style.display === 'block';
    if (e && e.target.classList.contains('fa-plus-square')) return

    if (isSelected) {
        container.style.display = 'none';
        icon.classList.remove('fa-caret-down');
        icon.classList.add('fa-caret-right');
    } else {
        container.style.display = 'block';
        icon.classList.add('fa-caret-down');
    }
};

export function selectNewList() {
    const listHeader = document.querySelector('.lists-header');
    const icon = listHeader.children[0];
    const listContainer = document.getElementById('task-lists');

    if (!icon.classList.contains('fa-caret-down')) {
        toggleListDisplay(listContainer)
    }
};

// Promises
export function selectList(list) {
    return new Promise((res, rej) => {
        list.classList.add('selected-list')
        res();
    })
};

export function deselectList() {
    return new Promise((res, rej) => {
        const selected = document.querySelector('.selected-list');
        if (selected) {
            selected.classList.remove('selected-list');
        }
        res();
    })
}

export function showContainer(container, showFn) {
    return new Promise((res, rej) => {
        const newContainer = showFn()
        container.appendChild(newContainer)
        res()
    })
};

// hide DOM container
export function hideContainer(className) {
    return new Promise((res, rej) => {
        hideDuplicateBox(className);
        res()
    })
};

// remove container from DOM
export async function hideDuplicateBox(className) {
    const box = document.querySelector(`.${className}`);
    if (box) {
        box.remove();
    }
};

export function hideDivContainer() {

    const visibleDiv = document.querySelector('.visible');
    if (visibleDiv) {
        visibleDiv.style.display = 'none';
        visibleDiv.classList.remove('visible');
    };

};

/*
Functions to toggle highlight on task creation.
*/
export async function toggleTaskHighlight(e) {
    const selectedTasks = document.querySelectorAll('input[type="checkbox"]:checked');
    const prevSelected = document.querySelector('.single-task-selected');
    const taskOptions = document.querySelector('.task-options');
    let nextSelection = e.target;
    const url = window.location.href.split('/')[4];

    if (nextSelection.localName == 'label' ||
        nextSelection.localName == 'span' ||
        e.target.type == 'checkbox') {
        nextSelection = nextSelection.parentNode;
    }

    if (prevSelected == nextSelection || e.target.type == 'checkbox') {
        await removeHighlight(nextSelection);
        if (url !== '#completed' && selectedTasks.length < 1) taskOptions.style.visibility = 'hidden';
    } else {
        if (nextSelection.classList.contains('single-task-selected')) await removeHighlight(nextSelection);
        else await addHighlight(nextSelection);
    }
}

function removeHighlight(selectedDiv) {
    return new Promise((res, rej) => {
        selectedDiv.classList.remove('single-task-selected');
        if (selectedDiv.children[0].checked) selectedDiv.children[0].checked = false;
        res();
    });
}


function addHighlight(nextSelection) {
    const taskOptions = document.querySelector('.task-options');
    const url = window.location.href.split('/')[4];
    return new Promise((res, rej) => {
        nextSelection.classList.add('single-task-selected');
        nextSelection.children[0].checked = true;
        if (taskOptions) {
            if (url !== '#completed') {
                taskOptions.style.visibility = 'visible';
                taskOptions.style.animation = "fadeIn 1s";
            }
        }
        res();
    });
}

/*
Functions to toggle task summary panel.
*/
export async function toggleTaskSummary(e) {
    const prevSelected = document.querySelector('.single-task-selected');
    const taskSummaryDiv = document.querySelector('#task-details');

    if (prevSelected) await showTaskSummary(taskSummaryDiv);
    else await hideTaskSummary(taskSummaryDiv, prevSelected)
};

function showTaskSummary(taskSummaryDiv) {
    return new Promise((res, rej) => {
        const checked = document.querySelectorAll('input[type="checkbox"]:checked');

        if (checked.length > 1) {
            checked.forEach(node => {
                if (node.checked) {
                    node.parentNode.classList.add('single-task-selected');
                } else {
                    node.parentNode.classList.remove('single-task-selected');
                }
            });
            taskSummaryDiv.classList.remove('task-details-display');
        } else {
            taskSummaryDiv.classList.add('task-details-display');
        }
        res();
    });
};

export function hideTaskSummary(taskSummaryDiv, prevSelected, nextSelection) {
    return new Promise((res, rej) => {
        taskSummaryDiv.classList.remove('task-details-display');
        res();
    });
};
