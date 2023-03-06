export const tabs = () => {
    const tabsWrappers = document.querySelectorAll("[data-tabs]");

    tabsWrappers.forEach((tabWrapper) => tabInit(tabWrapper));

    function tabInit(tabWrapper) {
        let isNested = tabWrapper.closest("[data-tab-content]") ? true : false;
        const tabButtons = [];
        const tabContents = [];
        tabWrapper
            .querySelectorAll("[data-tab-button]")
            .forEach((tabButton) => {
                if (isNested && tabButton.closest("[data-tab-content]")) {
                    tabButtons.push(tabButton);
                }
                if (!isNested && !tabButton.closest("[data-tab-content]")) {
                    tabButtons.push(tabButton);
                }
            });

        tabWrapper
            .querySelectorAll("[data-tab-content]")
            .forEach((tabContent) => {
                if (isNested) {
                    tabContents.push(tabContent);
                }
                if (
                    !isNested &&
                    !tabContent.parentNode.closest("[data-tab-content]")
                ) {
                    tabContents.push(tabContent);
                }
            });

        hideTabContent(tabContents, tabButtons);

        tabButtons[0].classList.add("active");
        tabContents[0].classList.add("active");
        // /* start tab */

        tabButtons.forEach((tabButton, index) => {
            tabButton.addEventListener("click", (e) => {
                hideTabContent(tabContents, tabButtons);
                showTabContent(tabContents[index], tabButton);
            });
        });
    }

    function hideTabContent(tabContents, tabButtons) {
        tabButtons.forEach((tabButton) => {
            tabButton.classList.remove("active");
        });
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("active");
        });
    }

    function showTabContent(tabContent, tabButton) {
        tabContent.classList.add("active");
        tabButton.classList.add("active");
    }
};
