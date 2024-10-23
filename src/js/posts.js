const allTabs = document.getElementById('ul-posts').children;
var sortOrder = 1;

function setActiveTab(index) {
    const tab = allTabs.item(index);
    document.getElementById('searchContainer').innerHTML = ``;
    sortOrder = 1;
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
            document.getElementById('searchContainer').innerHTML = `
                <div class="event-search-bar">
                <input type="text" class="event-search-input" placeholder="Event Name">
                <button class="event-search-button">
                    <img src="../../res/search.png" alt="Search">
                </button>
                </div>

                <div class="event-category-dropdown">
                    <button class="event-category-button" onclick="eventCategory()">
                        Category
                        <img src="../../res/arrow.png" alt="Dropdown Arrow" class="event-dropdown-arrow">
                    </button>
                    <div class="event-dropdown-content" id="categoryDropdown">
                        <button onclick="eventCategory()">Seminar</button>
                        <button onclick="eventCategory()">Thanksgiving</button>
                        <button onclick="eventCategory()">Festival</button>
                        <button onclick="eventCategory()">Reunion</button>
                    </div>
                </div>
                <button class="event-sort-button">
                    <img src="../../res/sort.png" alt="Sort">
                </button>
            `;
            tab.children.item(0).src = '../../res/calendar-posts-white.png';
            break;
        case 2:
            document.getElementById('searchContainer').innerHTML = `
                <div class="job-search-bar">
                <input type="text" class="job-search-input" placeholder="Event Name">
                <button class="job-search-button">
                    <img src="../../res/search.png" alt="Search">
                </button>
                </div>
                <button class="job-sort-button">
                    <img src="../../res/sort.png" alt="Sort">
                </button>
            `;
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
        return `${event.title} ${event.description} ${event.eventloc}`.toLowerCase().includes(query.toLowerCase());
    }

    events = events.filter(searchEvent);
}

function sortEvent(events) {
    if (sortOrder % 2 != 0) {
        events.sort(function (a, b) {
            return Date(a.eventdate) < Date(b.eventdate);
        });
    } else {
        events.sort(function (a, b) {
            return Date(a.eventdate) > Date(b.eventdate);
        });
    }
}

function searchJob(jobs, query) {
    function searchEvent(job) {
        return `${job.title} ${job.description} ${job.location} ${job.companyname}`.toLowerCase().includes(query.toLowerCase());
    }

    jobs = jobs.filter(jobs);
}

function sortJobs(jobs) {
    if (sortOrder % 2 != 0) {
        jobs.sort(function (a, b) {
            return Date(a.publishtimestamp) < Date(b.publishtimestamp);
        });
    } else {
        jobs.sort(function (a, b) {
            return Date(a.publishtimestamp) > Date(b.publishtimestamp);
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