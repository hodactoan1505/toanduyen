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
        imageUrl: 'img/lookMe.jpg',
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
            } else if (value.toLowerCase() === 'duyên' || value.toLowerCase() === 'duyen') {
                return;
            } else {
                return 'Nhập tên bạn để bắt đầu nhé ..!!!.';
            }
        }
    }).then(function () {
        $('.content').show(200);
        var audio = new Audio('https://res.cloudinary.com/dlibxjlp6/video/upload/v1724335827/hdtoan/qbcwxg3hzjqws2rikoty.mp3');

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

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}


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

