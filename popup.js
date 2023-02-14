// RELOAD BUTTON CLICK
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
        chrome.runtime.sendMessage({message: 'startInterval', new_checkboxChecked: new_checkboxChecked, taken_checkboxChecked: taken_checkboxChecked});
    }
});

const new_checkbox = document.querySelector('input[name="new_checkbox"]');
let new_checkboxChecked = false;
const taken_checkbox = document.querySelector('input[name="taken_checkbox"]');
let taken_checkboxChecked = false;

new_checkbox.addEventListener('change', () => {
if (new_checkbox.checked) {
    localStorage.setItem('new_checkboxChecked', true);
    new_checkboxChecked = true;
    console.log('checked');
} else {
    localStorage.setItem('new_checkboxChecked', false);
    new_checkboxChecked = false;
}
});

// Check if the new_checkbox has been checked before
if (localStorage.getItem('new_checkboxChecked') === 'true') {
new_checkbox.checked = true;
new_checkboxChecked = true;
console.log('checked');
} else {
new_checkbox.checked = false;
new_checkboxChecked = false;
}

taken_checkbox.addEventListener('change', () => {
if (taken_checkbox.checked) {
    localStorage.setItem('taken_checkboxChecked', true);
    taken_checkboxChecked = true;
    console.log('checked');
} else {
    localStorage.setItem('taken_checkboxChecked', false);
    taken_checkboxChecked = false;
}
});

// Check if the taken_checkbox has been checked before
if (localStorage.getItem('taken_checkboxChecked') === 'true') {
taken_checkbox.checked = true;
taken_checkboxChecked = true;
console.log('checked');
} else {
taken_checkbox.checked = false;
taken_checkboxChecked = false;
}