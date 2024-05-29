const redirectURL = "block.html";
const restrictedSites = ["youtube.com", "instagram.com", "whatsapp.com", "twitter.com"];
const startTime = 9;
const endTime = 18;
const startDay = 1;
const endDay = 5;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay();
        const isWithinRestrictedHours = currentHour >= startTime && currentHour < endTime;
        const isWithinRestrictedDays = currentDay >= startDay && currentDay < endDay;
        const isRestrictedSite = restrictedSites.some(site => tab.url.includes(site));

        if (isWithinRestrictedDays && isWithinRestrictedHours && isRestrictedSite) {
            chrome.tabs.update(tabId, { url: redirectURL });
        }
    }
});
