function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(tabItem => {
            tabItem.style.display = 'none';
            tabItem.classList.remove('fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, index) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
}

export default tabs;