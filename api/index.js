const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // => req body
app.use (express.urlencoded({extended: false}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// ROUTES //

// TABLE Iller // 

// Create
app.post("/iller", async (req, res) => {
    try {
        const {adi} = req.body
        const newil = await pool.query("INSERT INTO iller (adi) VALUES ($1) RETURNING *", [adi]);
        res.json(newil.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// Read
app.get("/iller", async (req, res) => {
    try {
        const tumIller = await pool.query("SELECT * FROM iller");

        res.json(tumIller.rows)
    } catch (error) {
        console.log(err.message);
    }
})
app.get("/iller/:id", async (req, res) => {
    const {id} = req.params
    try {
        const il = await pool.query("SELECT * FROM iller WHERE il_ID = $1",[id]);

        res.json(il.rows[0])
    } catch (error) {
        console.log("console.log eh?");
    }
})
// Update
app.put("/iller/:id", async (req, res) => {
    try {
        const {id} = req.params;  // where
        const {adi} = req.body; // set

        const updateil = await pool.query("UPDATE iller SET adi = $1 WHERE il_ID = $2",[adi, id]);

        res.json("Il guncellendi");
    } catch (err) {
        console.error(err.message);
    }
});
// Delete
app.delete("/iller/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteil = await pool.query("DELETE FROM iller WHERE il_ID = $1", [id]);
        res.json("Il Silindi!");
    } catch (err) {
        console.error(err.message);
    }
})


// TABLE 2 // 

// Create
app.post("/ilceler", async (req, res) => {
    try {
        const {adi} = req.body
        const newilce = await pool.query("INSERT INTO ilceler (ilce_adi) VALUES ($1) RETURNING *", [adi]);
        res.json(newilce.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Read
app.get("/ilceler", async (req, res) => {
    try {
        const allilceler = await pool.query("SELECT * FROM ilceler");

        res.json(allilceler.rows)
    } catch (error) {
        console.log(err.message);
    }
})

app.get("/ilceler/:id", async (req, res) => {
    const {id} = req.params
    try {
        const ilce = await pool.query("SELECT * FROM ilceler WHERE ilce_ID = $1",[id]);

        res.json(ilce.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a 
app.put("/ilceler/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {adi} = req.body; // set

        const updateilce = await pool.query("UPDATE ilceler SET ilce_adi = $1 WHERE ilce_id = $2",[adi, id]);

        res.json("Ilce updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/ilceler/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteilce = await pool.query("DELETE FROM ilceler WHERE ilce_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})
app.post("/test/", async (req, res) => {
    let id = req.query.id;
    
    let ot = req.query.ot;
    
    console.log(id);
    try {
        //const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        //res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})
// TABLE Iletisim_bilgileri // 

// Create
app.post("/iletisimBilgileri", async (req, res) => {
    try {
        let telefon_no = req.query.telefonNo;
        let il_id = req.query.ilId;
        let ilce_id = req.query.ilce_id;
        const newiletisimbilgisi= await pool.query("INSERT INTO iletisim_bilgileri (telefon_no, il_ID, ilce_ID) VALUES ($1, $2, $3) RETURNING *", [telefon_no,il_id,ilce_id]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Read
app.get("/iletisimBilgileri", async (req, res) => {
    try {
        const alliletisimbilgileri = await pool.query("SELECT * FROM iletisim_bilgileri");

        res.json(alliletisimbilgileri.rows)
    } catch (error) {
        console.log(err.message);
    }
})
app.get("/iletisimBilgileri/:id", async (req, res) => {
    const {id} = req.params
    try {
        const bilgi = await pool.query("SELECT * FROM iletisim_bilgileri WHERE iletisim_ID = $1",[id]);

        res.json(bilgi.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/iletisimBilgileri/:id", async (req, res) => {
    try {
        const {id} = req.params
        let telefon_no = req.query.telefonNo;
        let il_id = req.query.ilId;
        let ilce_id = req.query.ilce_id;

        const updateiletisim = await pool.query("UPDATE iletisim_bilgileri SET telefon_no = $1, il_ID = $2, ilce_ID = $3 WHERE iletisim_ID = $4",[telefon_no,il_id,ilce_id,id]);

        res.json("Iletisim Bilgileri Guncellendi");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/iletisimBilgileri/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteBilgi = await pool.query("DELETE FROM iletisim_bilgileri WHERE iletisim_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE kisiler // 

// Create
app.post("/saticilar", async (req, res) => {
    try {
        let ad = req.query.ad;
        let soyad = req.query.soyad;
        let puan = req.query.puan;
        let arac_sayisi= req.query.aracSayisi;
        
        const newsatici = await pool.query("INSERT INTO saticilar (ad, soyad, puan, arac_sayisi) VALUES ($1, $2, $3, $4) RETURNING *", [ad,soyad,puan, arac_sayisi]);
        
        res.json(newsatici.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Read
app.get("/saticilar", async (req, res) => {
    try {
        const allSaticilar  = await pool.query("SELECT * FROM saticilar");

        res.json(allSaticilar.rows)
    } catch (error) {
        console.log(err.message);
    }
})



app.get("/saticilar/:id", async (req, res) => {
    const {id} = req.params
    try {
        const satici = await pool.query("SELECT * FROM saticilar WHERE satici_ID = $1",[id]);

        res.json(satici.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/saticilar/:id", async (req, res) => {
    try {    
        let ad = req.query.ad;
        let soyad = req.query.soyad;
        let puan = req.query.puan;
        let arac_sayisi= req.query.aracSayisi;
        const { id } = req.params;
        const updateTodo = await pool.query("UPDATE saticilar SET ad = $1, soyad = $2, puan= $3, arac_sayisi= $4 WHERE satici_ID = $5",[ad,soyad,puan,arac_sayisi, id]);

        res.json("Satici updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/saticilar/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletesatici = await pool.query("DELETE FROM saticilar WHERE satici_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE musteri_hizmeteri // 

// Create
app.post("/musteriHizmetleri", async (req, res) => {
    try {
        let ad = req.query.ad;
        let soyad = req.query.soyad;
        let puan = req.query.puan;
        
        const newmusterihizmetleri = await pool.query("INSERT INTO musteri_hizmetleri (ad, soyad, puan) VALUES ($1, $2, $3) RETURNING *", [ad,soyad,puan]);
        
        res.json(newmusterihizmetleri.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Read
app.get("/musteriHizmetleri", async (req, res) => {
    try {
        const allmusterihizmetleri  = await pool.query("SELECT * FROM musteri_hizmetleri");

        res.json(allmusterihizmetleri.rows)
    } catch (error) {
        console.log(err.message);
    }
})



app.get("/musteriHizmetleri/:id", async (req, res) => {
    const {id} = req.params
    try {
        const mh = await pool.query("SELECT * FROM musteri_hizmetleri WHERE musteri_hizmetleri_ID = $1",[id]);

        res.json(mh.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/musteriHizmetleri/:id", async (req, res) => {
    try {    
        let ad = req.query.ad;
        let soyad = req.query.soyad;
        let puan = req.query.puan;
        const { id } = req.params;
        const updateTodo = await pool.query("UPDATE musteri_hizmetleri SET ad = $1, soyad = $2, puan= $3 WHERE musteri_hizmetleri_ID = $4",[ad,soyad,puan, id]);

        res.json("Musteri Hizmetleri updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/musteriHizmetleri/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletemh = await pool.query("DELETE FROM musteri_hizmetleri WHERE musteri_hizmetleri_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE musteriler // 

// Create
app.post("/musteriler", async (req, res) => {
    try {
        let ad = req.query.ad;
        let soyad = req.query.soyad;
        let kredi_karti = req.query.krediKarti;
        
        const newmusteri= await pool.query("INSERT INTO musteriler (ad, soyad, kredi_karti) VALUES ($1, $2, $3) RETURNING *", [ad,soyad,kredi_karti]);
        
        res.json(newmusteri.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Read
app.get("/musteriler", async (req, res) => {
    try {
        const allmusteri  = await pool.query("SELECT * FROM musteriler");

        res.json(allmusteri.rows)
    } catch (error) {
        console.log(err.message);
    }
})

app.get("/musteriler/:id", async (req, res) => {
    const {id} = req.params
    try {
        const m = await pool.query("SELECT * FROM musteriler WHERE musteri_ID = $1",[id]);

        res.json(m.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/musteriler/:id", async (req, res) => {
    try {    
        let ad = req.query.ad;
        let soyad = req.query.soyad;
        let kredi_karti = req.query.krediKarti;
        const { id } = req.params;
        const updatemusteriler = await pool.query("UPDATE musteriler SET ad = $1, soyad = $2, kredi_karti= $3 WHERE musteri_ID = $4",[ad,soyad,kredi_karti,id]);

        res.json("Musteri updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/musteriler/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletem = await pool.query("DELETE FROM musteriler WHERE musteri_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})



// TABLE 7 // 
app.get("/kisiTipleri", async (req, res) => {
    try {
        const alltipler = await pool.query("SELECT * FROM kisi_tipleri");

        res.json(alltipler.rows)
    } catch (error) {
        console.log(err.message);
    }
})

// Read
app.get("/kisiTipleri/:id", async (req, res) => {
    const {id} = req.params
    try {
        const kisi_tipleri = await pool.query("SELECT * FROM kisi_tipleri WHERE kisi_tipi_ID = $1",[id]);

        res.json(kisi_tipleri.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// TABLE Arac listesi // 

// Create
app.post("/aracListesi", async (req, res) => {
    try {
        let arac_ID = req.query.aracID;
        let musteri_ID = req.query.musteriID;
        let satici_ID = req.query.saticiID;
        
        const arac= await pool.query("INSERT INTO arac_listesi (arac_ID, musteri_ID, satici_ID) VALUES ($1, $2, $3) RETURNING *", [arac_ID, musteri_ID, satici_ID]);
        
        res.json(arac.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Read
app.get("/aracListesi", async (req, res) => {
    try {
        const allArac  = await pool.query("SELECT * FROM arac_listesi");

        res.json(allArac.rows)
    } catch (error) {
        console.log(err.message);
    }
})

app.get("/aracListesi/:id", async (req, res) => {
    const {id} = req.params
    try {
        const m = await pool.query("SELECT * FROM arac_listesi WHERE arac_listesi_ID = $1",[id]);

        res.json(m.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/aracListesi/:id", async (req, res) => {
    try {    
        let arac_ID = req.query.aracID;
        let musteri_ID = req.query.musteriID;
        let satici_ID = req.query.saticiID;
        const { id } = req.params;
        const updatearacListesi = await pool.query("UPDATE arac_listesi SET arac_ID = $1, musteri_ID = $2, satici_ID= $3 WHERE arac_listesi_ID = $4",[arac_ID,musteri_ID,satici_ID,id]);

        res.json("Arac Listesi updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/aracListesi/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteal = await pool.query("DELETE FROM arac_listesi WHERE arc_listesi_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE Renkler // 

// Create
app.post("/renkler", async (req, res) => {
    try {
        const {adi} = req.body
        const newrenk = await pool.query("INSERT INTO renkler (renk_adi) VALUES ($1) RETURNING *", [ad]);
        res.json(newrenk.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/renkler", async (req, res) => {
    try {
        const allrenkler = await pool.query("SELECT * FROM renkler");

        res.json(allrenkler.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/renkler/:id", async (req, res) => {
    const {id} = req.params
    try {
        const renk = await pool.query("SELECT * FROM renkler WHERE renk_ID = $1",[id]);

        res.json(renk.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/renkler/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {adi} = req.body; // set

        const updaterenk = await pool.query("UPDATE renkler SET description = $1 WHERE renk_ID = $2",[adi, id]);

        res.json("Renk updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/renkler/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleterenk = await pool.query("DELETE FROM renkler WHERE renkler_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE arac Kategoriler // 

// Create
app.post("/aracKategoriler", async (req, res) => {
    try {
        const {adi} = req.body
        const newrkategori = await pool.query("INSERT INTO arac_kategoriler (kategori) VALUES ($1) RETURNING *", [ad]);
        res.json(newrkategori.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/aracKategoriler", async (req, res) => {
    try {
        const allKategoriler = await pool.query("SELECT * FROM arac_kategoriler");

        res.json(allKategoriler.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/aracKategoriler/:id", async (req, res) => {
    const {id} = req.params
    try {
        const kategori = await pool.query("SELECT * FROM arac_kategoriler WHERE kategori_ID = $1",[id]);

        res.json(kategori.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/aracKategoriler/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {adi} = req.body; // set

        const updatekategori = await pool.query("UPDATE arac_kategoriler SET kategori = $1 WHERE kategori_ID = $2",[adi, id]);

        res.json("arac kategori updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/aracKategoriler/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletekategori = await pool.query("DELETE FROM arac_kategoriler WHERE kategori_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})


// Table Basvuru

app.post("/basvuru", async (req, res) => {
    try {
        const {adi} = req.body
        const newbas = await pool.query("INSERT INTO basvuru (basvuruadi) VALUES ($1) RETURNING *", [ad]);
        res.json(newbas.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/basvuru", async (req, res) => {
    try {
        const allbasvuru = await pool.query("SELECT * FROM basvuru");

        res.json(allbasvuru.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/basvuru/:id", async (req, res) => {
    const {id} = req.params
    try {
        const basvuru = await pool.query("SELECT * FROM basvuru WHERE basvuru_ID = $1",[id]);

        res.json(basvuru.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/basvuru/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {adi} = req.body; // set

        const updatebasvuru = await pool.query("UPDATE basvuru SET basvuruadi = $1 WHERE basvuru_ID = $2",[adi, id]);

        res.json("Basvuru updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/basvuru/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletebasvuru = await pool.query("DELETE FROM basvuru WHERE basvuru_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})
// TABLE Odeme Bilgisi// 

app.post("/odemeBilgisi", async (req, res) => {
    try {
        let basvuru = req.query.basvuru;
        let ornek = req.query.ornek
        const newob = await pool.query("INSERT INTO odemebilgisi (basvuru, ornekleme) VALUES ($1, $2) RETURNING *", [basvuru,ornek]);
        res.json(newob.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/odemeBilgisi", async (req, res) => {
    try {
        const allbilgi = await pool.query("SELECT * FROM odemebilgisi");

        res.json(allbilgi.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/odemeBilgisi/:id", async (req, res) => {
    const {id} = req.params
    try {
        const bilgi = await pool.query("SELECT * FROM odemebilgisi WHERE kredibilgisi = $1",[id]);

        res.json(bilgi.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/odemeBilgisi/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        let basvuru = req.query.basvuru;
        let ornek = req.query.ornek
        const updatebilgi = await pool.query("UPDATE odemebilgisi SET basvuru = $1, ornek = $2 WHERE kredibilgisi = $3",[basvuru,ornek, id]);

        res.json("Bilgi updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/odemeBilgisi/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteOdeme = await pool.query("DELETE FROM odemeBilgisi WHERE kredibilgisi = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})
// TABLE Musteri Degerlendirmesi // 

app.post("/degerlendirme", async (req, res) => {
    try {
        let kisi_ID = req.query.kisiID
        let puan = req.query.puan
        const newdeg = await pool.query("INSERT INTO musteri_degerlendirmesi (kisi_ID, puan) VALUES ($1, $2) RETURNING *", [kisi_ID, puan]);
        res.json(newdeg.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/degerlendirme", async (req, res) => {
    try {
        const alldeg = await pool.query("SELECT * FROM musteri_degerlendirmesi");

        res.json(alldeg.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/degerlendirme/:id", async (req, res) => {
    const {id} = req.params
    try {
        const degerlendirme = await pool.query("SELECT * FROM musteri_degerlendirme WHERE degerlendirme_ID = $1",[id]);

        res.json(degerlendirme.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/degerendirme/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        let kisi_ID = req.query.kisiID
        let puan = req.query.puan
        const musteri_degerlendirme = await pool.query("UPDATE musteri_degerlendirme SET kisi_ID = $1 WHERE Puan = $2",[kisi_ID, puan]);

        res.json("Musteri Degerlendirmesi updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/degerlendirme/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletedeg = await pool.query("DELETE FROM musteri_degerlendirme WHERE degerlendirme_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE Ornek// 

app.post("/ornek", async (req, res) => {
    try {
        const {adi} = req.body
        const newornek = await pool.query("INSERT INTO ornek (ornek_ID) VALUES ($1) RETURNING *", [ad]);
        res.json(newornek.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/ornek", async (req, res) => {
    try {
        const allornek = await pool.query("SELECT * FROM basvuru");

        res.json(allbasvuru.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/basvuru/:id", async (req, res) => {
    const {id} = req.params
    try {
        const basvuru = await pool.query("SELECT * FROM basvuru WHERE basvuru_ID = $1",[id]);

        res.json(basvuru.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/basvuru/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {adi} = req.body; // set

        const updatebasvuru = await pool.query("UPDATE basvuru SET basvuruadi = $1 WHERE basvuru_ID = $2",[adi, id]);

        res.json("Basvuru updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/basvuru/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletebasvuru = await pool.query("DELETE FROM basvuru WHERE basvuru_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})