let tickets = -2

function startInterval() {
  let interval = setInterval(() => {
      chrome.tabs.query({active:true}, function(tabs){
        if (tabs && tabs[0].url) {
          if (tabs[0].url.indexOf('ensurem.zendesk.com') > -1) {
            if (localStorage.getItem('isToggled') === 'true') {
              chrome.tabs.executeScript(tabs[0].id, {
                  code: `
                  chrome.runtime.sendMessage({ action: "LOG_INFO", viewCount: document.querySelector('a[data-view-id="360111822573"] div[data-test-id="views_views-list_row_count"]').innerHTML }, function(response) {});
                  document.querySelector('[data-test-id=views_views-list_header-refresh]').click();
                  `
              });
            }
          }
        }
      });
  }, 10000)
}

function logInfo(viewCount) {
  if (tickets === -2) {
    tickets = parseInt(viewCount)
  }
  if (parseInt(viewCount) < tickets && localStorage.getItem('taken_checkboxChecked')) {
    let sound = new Audio('aud-taken-tik.wav');
    sound.play();
    tickets = parseInt(viewCount)
  }
  if (parseInt(viewCount) > tickets && localStorage.getItem('new_checkboxChecked')) {
    let sound = new Audio('aud-new-tik.wav');
    sound.play();
    tickets = parseInt(viewCount)
  }
}

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  if (request.message === 'startInterval') {
    startInterval();
  }
  if (request.action === "LOG_INFO") {
    logInfo(request.viewCount)
  }
});