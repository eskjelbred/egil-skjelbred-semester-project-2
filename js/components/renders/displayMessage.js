export function displayMessage(messageType, message, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = `<div class="message my-2 p-2 bg-${messageType}">${message}</div>`;
}