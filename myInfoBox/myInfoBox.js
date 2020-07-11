export const myinfoBoxOB = document.querySelector('my-info-box');

const infoBoxTemplate = document.createElement('template');

infoBoxTemplate.innerHTML =
    `
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet"href="myInfoBox/myInfoBox.css">
    <style></style>
    <div class="info-box">
        <h3>Oznaczenie przycisków</h3>
        <div class="info-content">
        <p><button id="addNote" class="add icon"><i class="fa fa-plus"></i> DODAJ</button> <br> dodaj nową notatkę do ekrany głównego</p>
        <p><button id="delAll" class="delete-all icon"><i class="fa fa-times"></i> WSZYSTKO DO KOSZA</button> <br> przenieś do kosza wszystkie widoczne notatki</p>
        <p><button id="restore" class="restore-chosen icon"><i class="fa fa-reply-all"></i> PRZYWRÓĆ Z KOSZA</button> <br> otwórz kosz, zaznacz usunięte notatki do przywrócenia i przywróć je do ekranu głównego</p>
        <p><button id="eraseBin" class="empty-bin icon"><i class="fa fa-trash-o"></i> OPRÓŻNIJ KOSZ</button> <br> UWAGA: usunięcie wsztstkich notatek z kosza - już ich nie będzie można przywrócić</p>
        <p><button id="reset" class="reset icon"><i class="fa fa-exclamation-triangle"></i> RESET</button> <br> UWAGA! usunięcie wszystich notatek zarówno z kosza jaki i z ekrany BEZ możliwości PRZYWRÓCENIA</p>
        </div>
        <h3>Informacje dodatkowe</h3>
        <p>Aplikacja wykorzystuje pamięć przeglądarki - zamykając lub odświeżając stronę nie utracisz swoich notatek. Utracisz je natomiast czyszcząc pamięć przeglądarki lub klikając RESET.
        <p>Aplikacja powstała w czystym JS z wykorzystaniem webComponents i shadowDOM</p>
        <p>Copyrights mapawel 2020</p>
        <div class="box-buttons">
        </div>
        </div>
    `;


export class MyInfoBox extends HTMLElement {
    static get observedAttributes() {
        return ['display'];
    }

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(infoBoxTemplate.content.cloneNode(true));

        const closeInfoBox = () => this.setAttribute('display', '0');
        this.onclick = closeInfoBox;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let showInfoBox = (this.getAttribute('display') == 1) ? 'flex' : 'none';
        this.shadowRoot.querySelector('style').innerText =
            `
            .info-box {
                display: ${showInfoBox};
            }
        `;
    }
}
customElements.define('my-info-box', MyInfoBox);