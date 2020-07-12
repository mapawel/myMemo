import {
    myMenu
} from './myMenu/myMenu.js';
import {
    myNotePanel
} from './myNotePanel/myNotePanel.js';
import {
    MyRestorePanel
} from './myRestorePanel/myRestorePanel.js';
import {
    myNotePanelOB
} from './myNotePanel/myNotePanel.js';
import {
    myRestorePanelOB
} from './myRestorePanel/myRestorePanel.js';
import {
    myinfoBoxOB
} from './myInfoBox/myInfoBox.js';
import {
    MyNote
} from './myNote/myNote.js';

export let notesDB = new Array;
window.notesDB = notesDB;
let cat;
let cid;
let txt;
let id;
let clickedNoteNr;

const editNote = () => {
    renderNotes();
};

const delNote = () => {
    notesDB
        .filter(note => note.nr == clickedNoteNr)
        .forEach(note => note.status = 'deleted');
    renderNotes();

};

const addNote = () => {
    myNotePanelOB.setAttribute('display', '1')
};

const saveNote = () => {
    const newNote = new MyNote(cat, cid, 'new', txt, id);

    notesDB.push(newNote);
    renderNotes();
    closeNotePanel();
    id++
};

const renderNotes = () => {
    notesDB
        .filter(note => note.status == 'deleted')
        .forEach(note => note.remove());
    notesDB
        .filter(note => note.status != 'deleted')
        .forEach(note => document.querySelector('.note-area').appendChild(note))
    localStorage.setItem('savedNotes', JSON.stringify(notesDB));
};

const closeNotePanel = () => {
    myNotePanelOB.setAttribute('display', '0')
};


const restoreChosenNotes = () => {
    renderNotes();
};

const restore = () => {
    myRestorePanelOB.setAttribute('display', '1')
    renderNotes();
};

const delAll = () => {
    notesDB.forEach(note => note.status = 'deleted');
    renderNotes();
}


const eraseBin = () => {
    notesDB = notesDB.filter(note => note.status != 'deleted');
    window.notesDB = notesDB;
}

const reset = () => {
    notesDB.forEach(note => note.remove());
    notesDB = new Array;
    window.notesDB = notesDB;
    id = 1;
    localStorage.setItem('savedNotes', JSON.stringify(notesDB));
}


const help = () => {
    myinfoBoxOB.setAttribute('display', '1')
};

const toggleMenu = () => {
    document.querySelector('my-menu').shadowRoot.querySelector('#menuBurger').classList.toggle('active');
    document.querySelector('my-menu').shadowRoot.querySelector('.menu-buttons').classList.toggle('active');
    document.querySelector('.note-area').classList.toggle('active');
    document.querySelector('my-menu').shadowRoot.querySelector('.menu-buttons').removeEventListener('click', toggleMenu)
}

const menuBurger = () => {
    toggleMenu();
    document.querySelector('my-menu').shadowRoot.querySelector('.menu-buttons').addEventListener('click', toggleMenu)
}







addEventListener('myMenuEvent', e => {
    eval(e.detail.fooInit)()
});

addEventListener('myNotePanel', e => {
    e.detail.cat ? cat = e.detail.cat : '';
    e.detail.cid ? cid = e.detail.cid : '';
    e.detail.txt ? txt = e.detail.txt : '';
    eval(e.detail.fooInit)();
});

addEventListener('myNote', e => {
    // e.detail.clickedNoteCat ? clickedNoteCat = e.detail.clickedNoteCat : '';
    // e.detail.clickedNoteCid ? clickedNoteCid = e.detail.clickedNoteCid : '';
    // e.detail.clickedNoteTxt ? clickedNoteTxt = e.detail.clickedNoteTxt : '';
    e.detail.clickedNoteNr ? clickedNoteNr = e.detail.clickedNoteNr : '';
    eval(e.detail.fooInit)();
});

addEventListener('myRestorePanel', e => eval(e.detail.fooInit)());


const loadNotes = (cat, cid, status, txt, id) => {
    const newNote = new MyNote(cat, cid, status, txt, id);
    notesDB.push(newNote);
    renderNotes();
};

if (JSON.parse(localStorage.getItem('savedNotes'))) {
    JSON.parse(localStorage.getItem('savedNotes')).forEach(note => loadNotes(note.cat, note.cid, note.status, note.txt, note.nr))
    id = JSON.parse(localStorage.getItem('savedNotes')).length + 1;
} else id = 1;
