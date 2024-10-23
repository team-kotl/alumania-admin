const allTabs = document.getElementById('ul-posts').children;
const sortOrder = 1;

function setActiveTab(index) {
    const tab = allTabs.item(index);
    for (let i = 0; i < 3; i++) {
        const item = allTabs.item(i);
        item.classList.remove('selected-tab');
        item.children.item(1).style.color = 'rgba(0, 0, 0, 0.4)';
        switch (i) {
            case 0:
                item.children.item(0).src = '../../res/experience-posts.png';
                break;
            case 1:
                item.children.item(0).src = '../../res/calendar-posts.png';
                break;
            case 2:
                item.children.item(0).src = '../../res/jlisting-posts.png';
                break;
        }
    }

    tab.classList.add('selected-tab');
    tab.children.item(1).style.color = 'white';
    switch (index) {
        case 0:
            tab.children.item(0).src = '../../res/experience-posts-white.png';
            break;
        case 1:
            tab.children.item(0).src = '../../res/calendar-posts-white.png';
            break;
        case 2:
            tab.children.item(0).src = '../../res/jlisting-posts-white.png';
            break;
    }
}

function filterEvent(events, category) {
    function checkCategory(event) {
        return event.category == category;
    }

    events = events.filter(checkCategory);
}

function searchEvent(events, query) {
    function searchEvent(event) {
        return `${event.title} ${event.description} ${event.location}`.toLowerCase().includes(query.toLowerCase());
    }

    events = events.filter(searchEvent);
}

function sortEvent(events) {
    if (sortOrder % 2 != 0) {
        events.sort(function (a, b) {
            return Date(a) < Date(b);
        });
    } else {
        events.sort(function (a, b) {
            return Date(a) > Date(b);
        });
    }
}

function searchJob(events, query) {
    function searchEvent(event) {
        return `${event.title} ${event.description} ${event.location}`.toLowerCase().includes(query.toLowerCase());
    }

    events = events.filter(searchEvent);
}

function sortJobs(events) {
    if (sortOrder % 2 != 0) {
        events.sort(function (a, b) {
            return Date(a) < Date(b);
        });
    } else {
        events.sort(function (a, b) {
            return Date(a) > Date(b);
        });
    }
}

function eventCategory() {
    document.getElementById("categoryDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
} 