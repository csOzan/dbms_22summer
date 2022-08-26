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
app.delete("/musteriHizmetleri/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deletemh = await pool.query("DELETE FROM musteri_hizmetleri WHERE musteri_hizmetleri_ID = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})



// TABLE 7 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 8 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 9 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 10 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})


// TABLE 11 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 12 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 13 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 14 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 15 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 16 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 17 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 18 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 19 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})

// TABLE 20 // 

// Create
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})


// Read

app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(Todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // where
        const {description} = req.body; // set

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);

        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted succesfully!");
    } catch (err) {
        console.error(err.message);
    }
})



app.listen(5000, () => {
    console.log("server is listening on 5000");
} );