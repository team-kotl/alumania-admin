const allTabs = document.getElementById('ul-posts').children;

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