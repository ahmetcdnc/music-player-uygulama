// Müzik ismi, şarkıcısı, yolu vb. bilgiler

//Müzik için bir class oluşturuyoruz.
class Music {
    constructor(title,singer,img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    //Metot yazarak şarkıcı ismini getiriyoruz. İstediğimiz müzik objesi üzerinden kullanmak için oluşturuyoruz.
    getName(){
        return this.title + " - " + this.singer;
    }

}

//Normalde servis kullanıldığı zaman müzikler servis üzerinden gelir ama şuan biz kendimiz müzikler için bir liste oluşturuyoruz.
const musicList = [
    new Music("Boşver", "Nilüfer", "1.jpeg", "1.mp3"),
    new Music("Bu da Geçer mi Sevgilim", "Yalın", "2.jpeg", "2.mp3"),
    new Music("Aramızda Uçurumlar", "Suat Suna", "3.jpeg", "3.mp3"),
]