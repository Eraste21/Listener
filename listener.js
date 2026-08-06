document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("listen").addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: listenUnderlinedText
            })
        })
    })
})

function listenUnderlinedText() {
    const selection = window.getSelection().toString().trim();
    if (selection.length > 0) {
        const underlinedText = new SpeechSynthesisUtterance(selection);
        underlinedText.lang = "fr-FR";
        underlinedText.rate = 1;
        underlinedText.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(underlinedText);
    }
}