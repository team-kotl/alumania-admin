const allTabs = document.getElementById('ul-posts').children;
setActiveTab(1);

function setActiveTab(index) {
    const tab = allTabs.item(index);
    for (let i = 0; i < 3; i++) {
        allTabs.item(i).classList.remove('selected-tab');
    }
    tab.classList.add('selected-tab');
    tab.children.item(1).style.color = 'white';
    switch(index) {
        case 0:
            tab.children.item(0).src = '../../res/experience-posts-blue.png';
            break;
        case 1:
            tab.children.item(1).src = '../../res/calendar-posts-blue.png';
            break;
        case 2:
            tab.children.item(2).src = '../../res/jlisting-posts-blue.png';
            break;

    }
}

function displayJobs(jobs) {
    const container = document.getElementById("card-jobs");
    for (let i = 0; i < jobs.length; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.id = jobs[i].jobpid;
        cardContainer.classList.add("joblisting");
        cardContainer.innerHTML = `
                    <div class="listing-title">
                        <h3>${jobs[i].title}</h3>
                    </div>
                    <div class="listing-com-loc">
                        <p>${jobs[i].companyname}</p>
                        <p>${jobs[i].location}</p>
                    </div>
                    <div class="listing-summary">
                        <p>${jobs[i].description}</p>
                    </div>
                    <div class="listing-button">
                        <button class="listing-bdesign" onclick="togglePopup()">View Interested</button>
                    </div>
                    <div class="listing-more">
                        <a href="#"><img src="../../res/more-options.png" alt="More Options">
                    </div>
                    <div class="listing-exit">
                            <a href="#"><img src="../../res/close-posts.png" alt="Close Listing">
                    </div>
                `;
        container.appendChild(cardContainer);
    }
}

function displayEvents(events) {
    const container = document.getElementById("card-events");
    for (let i = 0; i < jobs.length; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.id = $events[i].eventid;
        cardContainer.classList.add("event-card");
        cardContainer.innerHTML = `
                    <div class="card-image">
                        <img src="data:image/jpeg;base64,'.base64_encode(${events[i].eventphoto}).'">
                        <div class="more-options">
                            <img src="../../res/eventbutton.png">
                        </div>
                    </div>
                    <div class="card-content">
                        <h2 class="event-title">${events[i].title}</h2>
                        <div class="event-details">
                            <div class="event-date">${events[i].eventdate}</div>
                            <div class="event-time">${events[i].eventtime}</div>
                        </div>
                        <div class="event-location">${events[i].eventloc}</div>
                        <div class="interest-count">
                            <img src = "../../res/star.png" alt="star">
                            <span class="count">0 interested</span>
                        </div>
                        <button class="view-button">View interested</button>
                    </div>
                `;
        container.appendChild(cardContainer);
    }
}