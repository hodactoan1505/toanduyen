const message = `Anh yêu em rất nhiều. 
Mỗi ngày trôi qua bên em là một ngày hạnh phúc. 
Em là điều tuyệt vời nhất trong cuộc đời anh. 
Anh mong muốn được cùng em trải qua mọi khoảnh khắc, 
vui vẻ, buồn bã, và mọi điều trong cuộc sống. 
Em có đồng ý làm bạn gái của anh không?`;

const textElement = document.getElementById('text');
let index = 0;

function typeWriter() {
    if (index < message.length) {
        textElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Tốc độ gõ chữ
    }
}

typeWriter();
