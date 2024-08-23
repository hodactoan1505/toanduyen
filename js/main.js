$(document).ready(function () {
    // process bar
    setTimeout(async function () {
        await firstQuestion();
        await $('.spinner').fadeOut();
        await $('#preloader').delay(350).fadeOut('slow');
        await $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

async function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/form_bg.jpg',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        input: 'text',
        inputPlaceholder: 'Nhập tại đây...',
        confirmButtonText: 'Gét gô',
        inputValidator: (value) => {
            if (!value) {
                return 'Nhầm rồi nè ..!!!';
            } else if (value.toLowerCase() === '24082024') {
                return;
            } else {
                return 'Nhập lại chính xác ngày nào bạn ơi ..!!!.';
            }
        }
    }).then(function () {
        $('.content').show(200);
        var audio = new Audio("./sound/littleLove.mp3");

        audio.addEventListener('play', () => {
            localStorage.setItem('audioState', 'playing');
        });
        audio.play();

        typeWriter().then(() => {
            $('#no').show();
            $('#yes').show();
        });
    })
}

init()

$('#no').click(() => {
    $('#no').toggleClass("move");
})

const textElement = document.getElementById('text');
let index = 0;

function typeWriter() {
    return new Promise((resolve) => {
        function typing() {
            if (index < CONFIG.message.length) {
                textElement.innerHTML += CONFIG.message.charAt(index);
                index++;
                setTimeout(typing, 100); // Adjust the speed here
            } else {
                resolve(); // Notify that typing is done
            }
        }
        typing();
    });
}


// show popup
$('#yes').click(function () {
    Swal.fire({
        width: 900,
        confirmButtonText: CONFIG.btnAccept,
        background: '#fff url("img/iput-bg.jpg")',
        title: CONFIG.mess,
        text: CONFIG.messDesc,
        confirmButtonColor: '#83d0c9',
        onClose: () => {
            window.location = CONFIG.messLink;
        }
    })
})

