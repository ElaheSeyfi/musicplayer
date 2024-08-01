const artists=[
    {
        id: 1,
        name: 'Taylor Swift',
        image: 'img/Swift.jpg',
        music: 'Taylor-Swift.mp3', 
        namemusic: 'Fearless'
    },
    {
        id: 2,
        name: 'The Weeknd',
        image: 'img/Weeknd.jpg',
        music: 'RealLife.mp3', 
        namemusic: 'Real Life'
    },
    {
        id: 3,
        name: 'Dua Lipa',
        image: 'img/Dua Lipa.jpg',
        music: 'Good.mp3', 
        namemusic: 'We are Good'
    },
    {
        id: 4,
        name: 'Alicia Keys',
        image: 'img/Alicia.jpg',
        music: 'Alicia Keys.mp3',  
        namemusic: 'Perfect Way To Die'
    },
    {
        id: 5,
        name: 'Maroon 5',
        image: 'img/Maroon.jpg',
        music: 'maroon.mp3', 
        namemusic: 'lost'
    },
    {
        id: 6,
        name: 'imagine',
        image: 'img/imagine.jpg',
        music: 'Imagine.mp3',  
        namemusic: 'Believer'
    },
    {
        id: 7,
        name: 'Billie Eilish',
        image: 'img/Billie.jpg',
        music: 'Billie_Eilish.mp3',  
        namemusic: 'i dont'
    },
    {
        id: 8,
        name: 'Jimin',
        image: 'img/Jimin.jpg',
        music: 'Jimin.mp3',  
        namemusic: 'Promise'
    },
    
    {
        id: 9,
        name: 'Garsha Rezaei ',
        image: 'img/1.jfif',
        music: 'Garsha Rezaei.mp3',  
        namemusic: 'akseto'
    },
    {
        id: 10,
        name: 'GibranAlcocer',
        image: 'img/2.jfif',
        music: 'GibranAlcocer.mp3',  
        namemusic: 'idea'
    },
    {
        id: 11,
        name: 'Ibrahim Tatlises',
        image: 'img/3.jfif',
        music: 'Ibrahim-Tatlises.mp3',  
        namemusic: 'AI AI AI'
    },
    {
        id: 12,
        name: 'maziyar',
        image: 'img/4.jfif',
        music: 'Maziyar.mp3', 
        namemusic: 'Maziyar'
    },
    
]

const poster_slide=document.querySelectorAll('.poster-slide')
const my_music_img = document.querySelector('.my_music_img');
const my_music_title = document.querySelector('.my_music_title');
const audio_player=document.querySelector('#audio-player')
const playpausebtn=document.querySelector('#play-pause-button')
const myaudio=document.querySelector('#myaudio')
const container_progressbar = document.querySelector('.container_progressbar');
const progressbar = document.querySelector('.progressbar');
const currenttime = document.querySelector('.current-time');
const totaltime = document.querySelector('.total-time');
const prevbutton=document.querySelector('#prev-button')
const nextbutton=document.querySelector('#next-button')
const my_music_name=document.querySelector('.my_music_name')
let flag=0
let currentIndex=0
function loadMusic(index) {
    my_music_img.setAttribute('src','asset/' +artists[index].image);
    my_music_title.innerHTML = artists[index].namemusic;
    my_music_name.innerHTML = artists[index].name;
    myaudio.setAttribute('src', 'asset/music/' + artists[index].music);
    myaudio.load();
    myaudio.addEventListener('loadedmetadata', () => {
        const duration = formatTime(myaudio.duration);
        totaltime.innerHTML = duration;
    });
    progressbar.style.width = '0%';
    playpausebtn.classList.remove('fa-pause-circle');
    playpausebtn.classList.add('fa-play-circle');
    flag = 0;
}

prevbutton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadMusic(currentIndex);
    }
});
nextbutton.addEventListener('click', () => {
    if (currentIndex < artists.length - 1) {
        currentIndex++;
        loadMusic(currentIndex);
    }
});
poster_slide.forEach((val, i) => {
    val.children[0].children[0].setAttribute('src','asset/'+ artists[i].image);
    val.children[1].innerHTML = artists[i].name;
    val.children[2].innerHTML = artists[i].namemusic;

    val.addEventListener('click', () => {
        console.log("i:" + i);
        poster_slide.forEach((item) => {
            item.parentElement.style.background = 'none';
            item.parentElement.style.backgroundImage = 'none';
        });
        val.parentElement.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        currentIndex = i; 
        loadMusic(currentIndex);
    });
});
playpausebtn.addEventListener('click', () => {
    if (flag % 2 === 0) {
        playpausebtn.classList.remove('fa-play-circle');
        playpausebtn.classList.add('fa-pause-circle');
        myaudio.play();
    } else {
        playpausebtn.classList.remove('fa-pause-circle');
        playpausebtn.classList.add('fa-play-circle');
        progressbar.style.width = '0%';
        myaudio.pause();
    }
    flag++;
});
myaudio.addEventListener('timeupdate', () => {
    const progresspercent = (myaudio.currentTime / myaudio.duration) * 100;
    console.log(progresspercent);
    progressbar.style.width = `${progresspercent}%`;
    const currentTime = formatTime(myaudio.currentTime);
    currenttime.innerHTML = currentTime;
});

container_progressbar.addEventListener('click', (e) => {
    const width_parent = container_progressbar.clientWidth;
    console.log(width_parent);
    const clickX = e.offsetX;
    console.log(clickX);
    const duration = myaudio.duration;
    console.log("duration: " + duration);
    myaudio.currentTime = (clickX / width_parent) * duration;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}