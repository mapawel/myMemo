export class MyAcceptBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet"href="myAcceptBox/myAcceptBox.css">
        <style></style>
        <div class="accept-box">
            <h3>Czy wszystko usunąć?</h3>
            <p>Akceptując komunikat usuniesz wszystkie notatki zarówno z ekranu jak i kosza bez żadnej możliwości ich przywrócenia!</p>
            <button id="cancelReset" class="add icon">Anuluj</button>
            <button id="reset" class="reset icon">RESETUJ</button>
        </div>
        `
        const cancelResetBtn = this.shadowRoot.querySelector('#cancelReset');
        cancelResetBtn.onclick = () => {
            document.querySelector('my-accept-box').remove();
        };

        const resetBtn = this.shadowRoot.querySelector('#reset');
        resetBtn.onclick = () => {

            this.dispatchEvent(new CustomEvent('myAcceptBox', {
                bubbles: true,
                composed: true,
                detail: {
                    fooInit: 'reset'
                }
            }))

            document.querySelector('my-accept-box').remove();
        };
    }

}
customElements.define('my-accept-box', MyAcceptBox);