function startInterval() {
    let interval = setInterval(() => {
        chrome.tabs.query({active:true}, function(tabs){
            if (localStorage.getItem('isToggled') === 'true') {
                console.log("refreshing")
                chrome.tabs.executeScript(tabs[0].id, {
                    code: "document.querySelector('[data-test-id=views_views-list_header-refresh]').click();"
                });
            }
        });
    }, 10000)
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === 'startInterval') {
      startInterval();
    }
  }
);