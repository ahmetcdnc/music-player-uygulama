//Dosyaların işlevsel hale geldiği yer.

//Container
const container = document.querySelector(".container");
//Müzik resmi
const image = document.querySelector("#music-image");
//Başlık
const title = document.querySelector("#music-details .title");
//Şarkıcı
const singer = document.querySelector("#music-details .singer");
//Prev icon
const prev = document.querySelector("#controls #prev");
//Play icon
const play = document.querySelector("#controls #play");
//Next icon
const next = document.querySelector("#controls #next");
//Süre
const duration = document.querySelector("#duration");
//Şuanki zaman
const currentTime = document.querySelector("#current-time");
//Progress bar
const progressBar = document.querySelector("#progress-bar");
//Volume icon
const volume = document.querySelector("#volume");
//Volume bar
const volumeBar = document.querySelector("#volume-bar");
//Repeat
const repeat = document.querySelector("#repeat");
//Ul (müzik listesi içeriklerini içine eklemek için Ul'ye ulaştık)
const ul = document.querySelector("ul");




//MusicPlayer'den player isimli nesne türettik.
const player = new MusicPlayer(musicList);


//Sayfa bileşenleri yüklendikten sonra müziği gösteriyoruz.
window.addEventListener("load", () =>{
    //player'ın getMusic metodu ile o andaki müziği getirip music içine attık.
    let music = player.getMusic();
    //Müziği sayfada göstermek için bu fonksiyonu çağırıyoruz.
    displayMusic(music);
    //Müzik listesini göstermek için bu fonksiyonu çağırıyoruz.
    displayMusicList(player.musicList);
    //Çalınan müziğin seçili olduğunu göstermek için metodu çağırıyoruz.
    isPlayingNow();
});


//Müzik ile ilgili bilgileri html kısmında gösterdiğimiz-getirdiğimiz metot.
function displayMusic(music){
    //eşitlikte sol kısım html kısmını, sağ kısım ise music parametresinden gelen değerleri temsil eder.
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

//"play"e tıkladığımızda şarkıyı başlatıyoruz, zaten çalıyorsa durduruyoruz.
play.addEventListener("click", () => {
    //Başlangıçta müzik çalıyor mu çalmıyor mu bilmek için sabit tanımlıyoruz. Bu da "container" içinde "playing" sınıfı var mı sorgulayarak yapıyoruz.
    const isMusicPlay = container.classList.contains("playing");
    //Tıkladığımda  container içinde "playing" yoksa playMusic çalışıyor, varsa pauseMusic.
    // "isMusicPlay" true değerini getiriyorsa "pauseMusic", false değerini getiriyorsa "playMusic" metodu çalışır.
    isMusicPlay ? pauseMusic() : playMusic();
})

//önceki butonuna tıklayarak önceki şarkıya geçiyoruz.
prev.addEventListener("click", () =>{
    //prevMusic metodu çalışsın.
    prevMusic();
})
//prev butonuna tıklandığında bu func. çağrılacak
const prevMusic = () => {
    //Bu func. çağrıldığında player içinden "prev" metodu çalışacak.(index no'yu 1 azalttık.)
    player.prev();
    //index no'su 1 azaltılmış şarkıyı "music" içine atıyoruz.
    let music = player.getMusic();
    //Bu şarkıyı da "displayMusic" içine parametre olarak gönderip ekranda gösteriyoruz.
    displayMusic(music);
    //Müziği çalıyoruz.
    playMusic();
    //Çalınan müziğin seçili olduğunu göstermek için metodu çağırıyoruz.
    isPlayingNow();
}



//Sonraki butonuna tıklayarak sonraki şarkıya geçiyoruz.
next.addEventListener("click", () =>{
    //nextMusic metodu çalışsın.
    nextMusic();
})
//next butonuna tıklandığında bu func. çağrılacak.
const nextMusic = () => {
    //Bu func. çağrıldığında player içinden "next" metodu çalışacak.(index no'yu 1 arttırdık)
    player.next();
    //index no'su 1 arttırılmış şarkıyı "music" içine atıyoruz.
    let music = player.getMusic();
    //Bu şarkıyı da "displayMusic" içine parametre olarak gönderip ekranda gösteriyoruz.
    displayMusic(music);
    //Müziği çalıyoruz.
    playMusic();
    //Çalınan müziğin seçili olduğunu göstermek için metodu çağırıyoruz.
    isPlayingNow();
}


//Şarkıyı durduran func.
const pauseMusic = () => {
    //pauseMusic aktif olacaksa "playing" classı var demektir, o yüzden siliyoruz.
    container.classList.remove("playing");
    //"pause" metodu audio elementiyle alakalı
    //Play iconu getirdik.
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

//Şarkıyı başlatan func.
const playMusic = () => {
    //playMusic aktif olacaksa "playing" classı yok demektir, o yüzden ekliyoruz.
    container.classList.add("playing");
    //"play" metodu audio elementiyle alakalı
    //Pause iconu getirdik.
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
   
}

// Şarkıdan gelen saniye bilgisini dakika ve saniyeye çeviriyoruz.
const calculateTime = (toplamSaniye) => {
    //Gelen toplamSaniye'yi 60'a bölüp dakikayı buluyoruz. Ondalıklı geleceği için floor ile, çıkan sonucu aşağı yuvarlayıp "dakika" olarak atıyoruz.
    const dakika = Math.floor(toplamSaniye / 60);
    //Gelen toplamSaniye'nin mod 60'ını alıp saniyeyi buluyoruz. Ondalıklı geleceği için floor ile, çıkan sonucu aşağı yuvarlayıp "dakika" olarak atıyoruz.
    const saniye = Math.floor(toplamSaniye % 60);
    //Saniye 10dan az ise 9 veya 8 değil 09 08 şeklinde iki basamaklı gösterilsin
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;  
    // Döndüreceğimiz sonuç
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;


}

// !!!!!audio için tetiklenen event "loadedmetadata" ile müziğin bağlanmasını, ilişki altına alınmasını sağlıyoruz.
audio.addEventListener("loadedmetadata", () => {
    //Sol taraf html, sağ taraf gelen audio'nun gelen süre kısmını getirir. Saniye olarak gelen süreyi "calculateTime" metodu istediğimiz formata(dk:sn) çeviriyoruz.
    duration.textContent = calculateTime(audio.duration);
    //Progress bar ne kadar sürede dolacak ayarlıyoruz. Progress bar max değeri varsayılan olarak 100. Biz Şarkı süresine göre aşağı yuvarlıyoruz. 
    progressBar.max = Math.floor(audio.duration);
    
})

//Progress bar üzerinde geçen süreyi gösteriyoruz
audio.addEventListener("timeupdate", () =>{//"timeupdate" saniye değiştiği sürece demek.
    //Saniyeyi progress bar içinde gösteriyoruz. "currentTime" ile şarkının o anki saniyesini getiriyoruz.
    progressBar.value = Math.floor(audio.currentTime);
    //Şimdiki saniye süresi için progress bar değerini veriyoruz. Fakat Saniye olarak geldiği için "calculateTime" ile hesaplatıyoruz.
    currentTime.textContent = calculateTime(progressBar.value);
    
})


//Kullanıcının progress bar üzerinde tıklama yaparak süre üzerinde hareket etmesini sağlıyoruz.
//"input" eventi = bir input kontrolüne konumlanma.
progressBar.addEventListener("input", () =>{
    //O an hangi konuma tıkladıysak o anki süreyi değiştiriyoruz.
    currentTime.textContent = calculateTime(progressBar.value);
    //Müziğin süre bilgisini de değiştiriyoruz.
    audio.currentTime = progressBar.value;
})


//Volume iconuna tıkladığımızda işlemler yapılacak fakat o an hangi durumda olduğunu bilmemiz için bunu tutmamız gerekli.
let sesDurumu = "sesli";

//Volume bar üzerinden sesi değiştiriyoruz !!!"input" eventi ile!!!
volumeBar.addEventListener("input", (e) => {//e: slider referansı, bilgileri gönderir
    //Slider konumunu tutan bilgiye ulaşıp "value" içinde tutuyoruz.(0-100) arası bilgi gelecek.
    const value = e.target.value;
    //audio volume bilgisine bu "value" bilgisini veriyoruz fakat "volume" 0-1 arası değer aldığı için 100'e bölerek atama yapıyoruz.
    audio.volume = value / 100;
    //ses durumuna göre
    if(value==0){
        //Diyerek sesi kapatıyoruz.(sessizliğe true diyoruz)
        audio.muted = true;
        //sesDurumunu değiştiriyoruz.
        sesDurumu = "sessiz";
        //İconu değiştiriyoruz
        volume.classList = "fa-solid fa-volume-xmark";
    }
    else{
        //Diyerek sesi açıyoruz.(sessizliğe false diyoruz)
        audio.muted = false;
        //sesDurumunu değiştiriyoruz.
        sesDurumu = "sesli";
        //İconu değiştiriyoruz
        volume.classList = "fa-solid fa-volume-high";
    }
})

//Volume iconu için tıklama eventi ekliyoruz. Tıkladığımızda volumebar 0 olacak, ses ikonu değişecek, audio'nun muted özelliği true yaparak sesi kapatıyoruz.
volume.addEventListener("click", () => {
    //Eğer ses durumu "sesli" ise yani ses açıksa
    if(sesDurumu === "sesli"){
        //Diyerek sesi kapatıyoruz.(sessizliğe true diyoruz)
        audio.muted = true;
        //sesDurumunu değiştiriyoruz.
        sesDurumu = "sessiz";
        //İconu değiştiriyoruz
        volume.classList = "fa-solid fa-volume-xmark";
        //volumeBArı kapatıyoruz 0 yapıyoruz
        volumeBar.value = 0;
    }
    //Eğer ses durumu "sessiz" ise yani ses kapalıysa
    else{
        //Diyerek sesi açıyoruz.(sessizliğe false diyoruz)
        audio.muted = false;
        //sesDurumunu değiştiriyoruz.
        sesDurumu = "sesli";
        //İconu değiştiriyoruz
        volume.classList = "fa-solid fa-volume-high";
        //volumeBArı açıyoruz sesi kapatmadan önceki haline getiriyoruz.!!!! audio.volume 0-1 arası değer alırken, volumebar 0-100 arası değer alırken atamayı yaparken "audio.volume" değerini 100'le çarpıyoruz.
        volumeBar.value = audio.volume * 100;

    }
})

//Şarkı bittiğinde sonraki şarkıya geçiyoruz.
audio.addEventListener("ended", () => {
     //Başlangıçta repeat butonu aktif mi değil mi sorguluyoruz. "repeat_music" sınıfı var mı yok mu kontrolü yaparak gerçekleştiriyoruz.
     let isRepeatActive = repeat.classList.contains("repeat_music");
     
    //Eğer "repeat_music" ekli değilse yani değer false dönüyorsa
    if(isRepeatActive==false){
         //audio sonlandığında(ended eventi) diğer sonraki şarkıya geçiyoruz.
        nextMusic();
    }
    //Eğer "repeat_music" ekli ise yani değer true dönüyorsa
    else{
        //Şarkının süresini sıfırlayıp başa alıyoruz.
        audio.currentTime = 0;
        //Şarkıyı getiriyoruz.
        player.getMusic();
        //Şarkıyı başlatıyoruz.
        audio.play();
    }
   
})


//Müzik bittiğinde baştan başlatacak butonu aktif değilse aktif, aktifse aktif değil olarak işaretliyoruz. "repeat_music" sınıfı ile de butonun görüntüsüne css sayfasında css veriyoruz.
repeat.addEventListener("click", () => {
    //Başlangıçta repeat butonu aktif mi değil mi sorguluyoruz. "repeat_music" sınıfı var mı yok mu kontrolü yaparak gerçekleştiriyoruz.
    let isRepeatActive = repeat.classList.contains("repeat_music");

    if(isRepeatActive == false){//eğer "repeat_music" sınıfı yoksa yani false ise
        //sınıfı ekliyoruz
        repeat.classList.add("repeat_music");
    }
    else{
        //sınıfı kaldırıyoruz
        repeat.classList.remove("repeat_music");
    }
    
})

//Müzik listesini sayfada gösterdiğimiz metot.
const displayMusicList = (list) => {//Parametre olarak liste alıyoruz(player.musicList)
    //Liste üzerindeki her elemanı dolaşıp li elemanı olarak gösterelim.
    for(let i=0; i<list.length; i++){
        //her elemanı "liTag" olarak tutuyoruz.//şarkı ve şarkıcıyı "getName" metoduyla dinamik olarak getiriyoruz.//"pnclick="selectedMusic(this)" ile seçili müziği alıyoruz.//"li-index='${i}'" ile hangi şarkıdayız biliyoruz.
        let liTag =
        `<li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
             <span>${list[i].getName()}</span>
             <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
             <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
         </li>
        `;
        //ul içine "liTag" üzerinden liste üzerinden dolaşarak tüm elemanları ekliyoruz. "beforeend" ile sonuna ekleriz.
        ul.insertAdjacentHTML("beforeend",liTag);
        //"src"den süre bilgisini alıp içine aktarıyoruz.
        let liAudioDuration = ul.querySelector(`#music-${i}`)
        let liAudioTag = ul.querySelector(`.music-${i}`)

        //Müzik dosyası yüklendiğinde
        liAudioTag.addEventListener("loadeddata", () => {
            //Şarkıının saniye olarak gelen süresini çevirip dk:sn olarak aktarıyoruz
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);

        }) 
    }
}

//"li" parametresi ile müziği seçmiş oluyoruz. "li"ye onclick verdiğimiz için burası tıklama işlemi gerçekleştiğinde çalışacak func.
const selectedMusic = (li) =>{
    //"li-index" isimli bir attribute kendimiz tanımladık ve ona ulaştık. //playerdaki indexi, seçtiğimiz index yapıyoruz
    player.index = li.getAttribute("li-index");
    //müziği alıyoruz. ve sayfada yazdırıyoruz.
    displayMusic(player.getMusic());
    //Müziği başlatıyoruz.
    playMusic();
    //Çalınan müziğin seçili olduğunu göstermek için metodu çağırıyoruz.
    isPlayingNow();
}

//Eğer müzik çalıyorsa
const isPlayingNow = () =>{
    //tüm li elemanlarını getiriyorum 
    for(let li of ul.querySelectorAll("li")){
        //li elemanlarında "playing" classı var mı bakıyorum
        if(li.classList.contains("playing")){//varsa
            //"playing" classını kaldırıyorum
            li.classList.remove("playing");
        }
        //li elemanının kendim oluşturduğum "li-index"i ile, o anda çalınan müziğin indexi(player.index) eşitse
        if(li.getAttribute("li-index")==player.index){
            //"playing" classını ekliyorum
            li.classList.add("playing");
        }

    }

}
