let keys = document.querySelectorAll('.key');
let keyClicked = document.querySelector('#keyClicked');
let reset = document.querySelector('#reset');

function updateLockStates(e) {
    const caps = e.getModifierState('CapsLock');
    const num = e.getModifierState('NumLock');
    const scroll = e.getModifierState('ScrollLock');

    document.getElementById('clk').classList.toggle('on', caps);
    document.getElementById('clk').classList.toggle('off', !caps);

    document.getElementById('nlk').classList.toggle('on', num);
    document.getElementById('nlk').classList.toggle('off', !num);

    document.getElementById('slk').classList.toggle('on', scroll);
    document.getElementById('slk').classList.toggle('off', !scroll);
}

document.addEventListener('keydown', (e) => {
    // Prevent default Windows and F-key behavior
    if (e.key === 'Meta' || e.code.startsWith('F')) {
        e.preventDefault();
    }

    keys.forEach(key => {
        const dataKey = key.getAttribute('data-key');
        const dataCode = key.getAttribute('data-code');

        if (
            (dataKey && dataKey.toLowerCase() === e.key.toLowerCase()) ||
            (dataCode && dataCode === e.code)
        ) {
            keyClicked.innerText = e.key;
            key.classList.add("clicked");
            key.classList.add("active");
        }
    });

    updateLockStates(e);
});

document.addEventListener('keyup', (e) => {
    keys.forEach(key => {
        const dataKey = key.getAttribute('data-key');
        const dataCode = key.getAttribute('data-code');

        if (
            (dataKey && dataKey.toLowerCase() === e.key.toLowerCase()) ||
            (dataCode && dataCode === e.code)
        ) {
            key.classList.remove("active");
        }
    });

    updateLockStates(e);
});

reset.addEventListener('click', () => {
    keys.forEach(key => {
        key.classList.remove("clicked");
        key.classList.remove("active");
    });

    keyClicked.innerText = 'No Keys Clicked';

});
