document.getElementById('reloadButton').addEventListener('click', function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        chrome.tabs.executeScript(tabs[0].id, {
            code: "document.querySelector('[data-test-id=views_views-list_header-refresh]').click();"
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let isToggled = localStorage.getItem('isToggled');
    if (isToggled === 'true') {
        let button = document.querySelector('[data-toggle="toggle"]');
        button.setAttribute('data-toggled', 'true');
        button.style.backgroundColor = 'rgb(56, 146, 56)';
        startInterval();
    }
});

document.querySelector('[data-toggle="toggle"]').addEventListener('click', function() {
    let isToggled = this.getAttribute('data-toggled') === 'true';
    this.setAttribute('data-toggled', !isToggled);
    if (isToggled) {
        this.style.backgroundColor = '#333';
        this.style.color = '#ccc';
        localStorage.setItem('isToggled', 'false');
    } else {
        this.style.backgroundColor = 'rgb(56, 146, 56)';
        localStorage.setItem('isToggled', 'true');
        chrome.runtime.sendMessage({message: 'startInterval'});
    }
});