# SQl Dökümantasyonu



## Saklı Yordamlar (Ozan Çakmak)
Proje için 4 farklı saklı yordam yazdım. Bunları sırasıyla başlıklar altında aşağıda
açıklayacağım. Açıklamalarım ve ekran görüntülerim aynı zamanda Githubdaki
readme dosyalarında bulunmaktadır. (Bu kısım için /sql/readme.md bakabilirsiniz)

### int MusteriSayisi(void):
MusteriSayısı fonksiyonu müşteriler tablosundaki müşteri sayısını integer
olarak döner. Bunu Count fonksiyonu yardımıyla yapar. API de kullanmak için
“musterisayisi” strinigini kullanabilirsiniz

#### Fonksiyon
![f](/sql/readme_files/musterisayisi.png)

#### Uygulama
![u](/sql/readme_files/musterisayisi_uygulama.png)

### int KisiSayisi(void):
KisiSayısı fonksiyonu, kisiler tablosunu kalıtım olarak alan tabloların
(müşteri_hizmetleri, musteriler, satıcılar) toplam satır sayısını döner. Burada count
fonksiyondan faydalanılır. API’de kullanmak için “kisisayisi” strinigini kullanabilirsiniz.

#### Fonksiyon
![f](/sql/readme_files/kisisayisi.png)

#### Uygulama
![u](/sql/readme_files/kisisayisi_uygulama.png)

### void IlSil (int kod):
Argüman olarak verilen Id’li İli iller tablosundan siler. API’de kullanmak için
“ilsil” strinigini kullanabilirsiniz.

#### Fonksiyon
![f](/sql/readme_files/ilsil.png)

#### Uygulama
![u](/sql/readme_files/ilsil_uygulama.png)

### void SaticiMusteriHizSil (void):
Müsteri hizmetleri ve satıcılar tablosundan puanı 5’in altındaki kişileri siler.
API’de kullanmak için “sil” strinigini kullanabilirsiniz.

#### Fonksiyon
![f](/sql/readme_files/sil.png)

#### Uygulama
![u](/sql/readme_files/sil_uygulama.png)
