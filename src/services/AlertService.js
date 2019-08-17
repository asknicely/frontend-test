export default class AlertService {
  static showAlert(message) {
    const el = document.createElement('div');

    el.appendChild(document.createTextNode(message));

    el.classList.add('alert');
    el.classList.add('alert-success');
    el.classList.add('fade');

    const containerEl = document.getElementById('alert-container');

    // insert latest alerts at the top so earlier alerts pushed down fade out in a trail effect
    containerEl.insertBefore(el, containerEl.childNodes[0]);

    // fade in alert
    el.classList.add('in');

    // fade out alert after 3 seconds
    window.setTimeout(() => {
      el.classList.remove('in');

      window.setTimeout(() => {
        // remove element after fade out is complete
        containerEl.removeChild(el);
      }, 300);
    }, 3000);
  }
}
