export class MyNote extends HTMLElement {
    static get observedAttributes() {
        return ['animated'];
    }

    constructor(cat, cid, stat, txt, nr) {
        super();
        this.cat = cat;
        this.cid = cid;
        this.status = stat;
        this.txt = txt;
        this.nr = nr;
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        let color;
        switch (this.cid) {
            case '1':
                color = 'green';
                break;
            case '2':
                color = 'orange';
                break;
            case '3':
                color = 'blue';
                break;
            case '4':
                color = 'yellow';
                break;
            case '5':
                color = 'grey';
                break;
        };

        this.style.animation = (this.getAttribute('animated') == 'true') ? '' : '.7s fadeIn';
        this.setAttribute('animated', true);

        this.shadowRoot.innerHTML = `
        <style>
        .note {
            opacity: 0;
        }
        </style>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="myNote/myNote.css">

        <div class="note ${color}">
            <div class="note-header">
                <h3 class="note-title">#${this.nr} - ${this.cat}</h3>
                <button id="editNote" class="edit-note">
                    <i class="fa fa-pencil-square-o"></i>
                </button>
                <button id="delNote" class="delete-note">
                    <i class="fa fa-times icon"></i>
                </button>
            </div>
            <div class="note-body">
                ${this.txt}
            <textarea class="note-edit ${color}"></textarea>
            </div>
        </div>
        `
        const noteEditbtn = this.shadowRoot.querySelector('button.edit-note');
        const noteDelbtn = this.shadowRoot.querySelector('button.delete-note');
        noteDelbtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('myNote', {
                bubbles: true,
                composed: true,
                detail: {
                    fooInit: this.shadowRoot.querySelector('button.delete-note').getAttribute('id'),
                    clickedNoteCat: this.cat,
                    clickedNoteCid: this.cid,
                    clickedNoteTxt: this.txt,
                    clickedNoteNr: this.nr
                }
            }))
        })

        const acceptTxt = () => {
            this.shadowRoot.querySelector('.note-edit').style.display = 'none';
            noteEditbtn.addEventListener('click', changeTxt);
            this.txt = this.shadowRoot.querySelector('.note-edit').value;

            this.dispatchEvent(new CustomEvent('myNote', {
                bubbles: true,
                composed: true,
                detail: {
                    fooInit: this.shadowRoot.querySelector('button.edit-note').getAttribute('id'),
                    clickedNoteCat: this.cat,
                    clickedNoteCid: this.cid,
                    clickedNoteTxt: this.txt,
                    clickedNoteNr: this.nr
                }
            }))
        }

        const changeTxt = () => {
            this.shadowRoot.querySelector('.note-edit').style.display = 'block';
            this.shadowRoot.querySelector('.note-edit').value = this.txt;
            noteEditbtn.removeEventListener('click', changeTxt);
            noteEditbtn.addEventListener('click', acceptTxt);
        }

        noteEditbtn.addEventListener('click', changeTxt);
    }

    attributeChangedCallback(name, oldValue, newValue) {}

}
customElements.define('note-element', MyNote);