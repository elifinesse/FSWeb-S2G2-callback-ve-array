const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const filtreleme = (obje) => obje.Year === 2014 && obje.Stage === "Final";
const ikiBinOnDort = fifaData.filter(filtreleme);
console.log(ikiBinOnDort[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(ikiBinOnDort[0]['Away Team Name']);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(ikiBinOnDort[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(ikiBinOnDort[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
if (ikiBinOnDort[0]["Home Team Goals"] > ikiBinOnDort[0]["Away Team Goals"]) {
	console.log(ikiBinOnDort[0]["Home Team Name"]);
} else {
	console.log(ikiBinOnDort[0]["Away Team Name"]);
}


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {
	return dizi.filter((obje) => obje["Stage"] === "Final");
}
console.log(Finaller(fifaData));



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dizi, callback) {
	const finals = callback(dizi);
	const years = finals.map((obje) => obje.Year)
	return years;
}
console.log(Yillar(fifaData, Finaller));


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(dizi, callback) {
	const finals = callback(dizi);
	const winners = finals.map((obje) => {
	if (obje["Home Team Goals"] > obje["Away Team Goals"]) {
		return obje["Home Team Name"];
	} else {
		return obje["Away Team Name"];
	}	
	});
	return winners;
}
console.log(Kazananlar(fifaData, Finaller));




/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dizi, callback1, callback2, callback3) {
	const finals = callback1(dizi);
	const years = callback2(dizi, callback1);
	const winners = callback3(dizi, callback1);
	const cumle = finals.map((obje, index) => {
		return  `${years[index]} yılında, ${winners[index]} dünya kupasını kazandı!`
	})
	return cumle
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(callback) {
	const mactaGol = callback.map((obje) => obje["Home Team Goals"] + obje["Away Team Goals"]);
	const toplamGol = mactaGol.reduce((toplam, goals) => {
		return toplam + goals;
	}, 0);
	return (toplamGol / mactaGol.length).toFixed(2);
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(tumData, takim) {
	const finals = tumData.filter((obje) => obje.Stage === "Final");
	const win = finals.reduce((total, mac) => {
		if (mac["Home Team Initials"] === takim && mac["Home Team Goals"] > mac["Away Team Goals"]) {
			return total + 1;
		} else if (mac["Away Team Initials"] === takim && mac["Away Team Goals"] > mac["Home Team Goals"]) {
			return total + 1;
		} else {
			return total;
		}
		}, 0);
	return win;

}
console.log(UlkelerinKazanmaSayilari(fifaData, "BRA"));



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(tumData) {
	const finals = tumData.filter((obje) => obje.Stage === "Final");
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(tumData) {
	const finals = tumData.filter((obje) => obje.Stage === "Final");
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
