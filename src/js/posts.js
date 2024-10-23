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
                <input type="text" class="event-search-input" placeholder="Event Name" id="event-search-text">
                <button class="event-search-button" onclick="
                        currentEvents = searchEvent(currentEvents);
                        displayEvents(currentEvents);
                ">
                    <img src="../../res/search.png" alt="Search">
                </button>
                </div>

                <div class="event-category-dropdown">
                    <button class="event-category-button" onclick="eventCategory()">
                        Category
                        <img src="../../res/arrow.png" alt="Dropdown Arrow" class="event-dropdown-arrow">
                    </button>
                    <div class="event-dropdown-content" id="categoryDropdown">
                        <button onclick="
                        currentEvents = filterEvent(events, 'Seminar')
                        displayEvents(currentEvents);
                        ">Seminar</button>
                        <button onclick="
                        currentEvents = filterEvent(events, 'Thanksgiving')
                        displayEvents(currentEvents);
                        ">Thanksgiving</button>
                        <button onclick="
                        currentEvents = filterEvent(events, 'Festival')
                        displayEvents(currentEvents);
                        ">Festival</button>
                        <button onclick="
                        currentEvents = filterEvent(events, 'Reunion')
                        displayEvents(currentEvents);
                        ">Reunion</button>
                    </div>
                </div>
                <button class="event-sort-button" onclick="
                    sortEvent(currentEvents);
                    displayEvents(currentEvents);
                ">
                    <img src="../../res/sort.png" alt="Sort">
                </button>
            `;
            tab.children.item(0).src = '../../res/calendar-posts-white.png';
            break;
        case 2:
            document.getElementById('searchContainer').innerHTML = `
                <div class="job-search-bar">
                <input type="text" class="job-search-input" placeholder="Event Name" id="job-search-text">
                <button class="job-search-button" onclick="
                    currentJobs = searchJobs(jobs);
                    displayJobs(currentJobs);
                ">
                    <img src="../../res/search.png" alt="Search">
                </button>
                </div>
                <button class="job-sort-button" onclick="
                sortJobs();
                displayJobs(currentJobs);
                ">
                    <img src="../../res/sort.png" alt="Sort">
                </button>
            `;
            tab.children.item(0).src = '../../res/jlisting-posts-white.png';
            break;

    }
}

function filterEvent(events, category) {
    function checkCategory(event) {
        return event.category.toLowerCase() == category.toLowerCase();
    }
    return events.filter(checkCategory);
}

function searchEvent(events) {
    query = document.getElementById('event-search-text').value;
    function searchEvent(event) {
        return `${event.title} ${event.description} ${event.eventloc}`.toLowerCase().includes(query.toLowerCase());
    }

    return events.filter(searchEvent);
}

function sortEvent(events) {
    events.sort(function (a, b) {
        let dateA = new Date(`${a.eventdate}T${a.eventtime}`);
        let dateB = new Date(`${b.eventdate}T${b.eventtime}`);

        if (sortOrder == 1) {
            // Ascending order
            sortOrder++;
            return dateA - dateB;
        } else {
            // Descending order
            sortOrder--;
            return dateB - dateA;
        }
    });
}

function searchJobs(jobs) {
    query = document.getElementById('job-search-text').value;
    function searchJob(job) {
        return `${job.title}${job.description}${job.location}${job.companyname}`.toLowerCase().includes(query.toLowerCase());
    }
    return jobs.filter(searchJob);
}

function sortJobs(jobs) {
    jobs.sort(function (a, b) {
        let dateA = new Date(`${a.eventdate}T${a.eventtime}`);
        let dateB = new Date(`${b.eventdate}T${b.eventtime}`);

        if (sortOrder == 1) {
            // Ascending order
            sortOrder++;
            return dateA - dateB;
        } else {
            // Descending order
            sortOrder--;
            return dateB - dateA;
        }
    });
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