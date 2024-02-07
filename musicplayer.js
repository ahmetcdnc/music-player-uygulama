//Dosyayı yönetecek kısım. Yeni müzik, sonraki-önceki müzik geçişleri vb. metotların tutulduğu kısım

//Dışardan müzik listesini alan musicPlayer sınıfını oluşturuyoruz.
class MusicPlayer{
    constructor(musicList){
        this.musicList = musicList;
        //Hangi müzik bilgisini istediğimizi bilmek için index tutuyoruz. Nesne oluşturduğumuz anda index=0 olsun. Önceki veya sonraki şarkılara geçiş için bu index no ile işlem yapıyoruz.
        this.index = 0;
    }

    //Metot ile o andaki müzik index no'ya göre müzik bilgisini getiriyoruz.
    getMusic(){
        return this.musicList[this.index];
    }

    //index no'yu 1 arttırarak sonraki şarkıya geçtiğimiz metot.
    next(){//mevcut index(+1) toplam uzunluğa eşit değilse devam...
        if(this.index+1 != this.musicList.length){
          this.index++;
        }
        else{//Son müziğe geldiğinde başa dönmesi için index no = 0 dedik.
            this.index=0;
        }
    }

    //index no'yu 1 azaltarak önceki şarkıya geçiyoruz.
    prev(){
        if(this.index != 0){//index 0 değilse bir azaltarak önceki müziklere gideriz.
            this.index--;
        }
        else{//geri giderken en baştaki müziğe gelindiğinde en sondaki müziğe geçiş yapılır.
            //son müziğe(this.musicList.length-1) alırız.
            this.index = this.musicList.length-1;
        }
    }
}