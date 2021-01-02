var express = require('express');
var squel = require("squel");
var multer = require('multer')
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mall'
});

con.connect();

app.get("/login", function (req, res) {
    var id = req.query.openid
    var name = req.query.name
    var head = req.query.head
    var sql = squel.select()
        .from("user")
        .where("id = \"" + id + "\"")
        .toString();
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (!result.length) {
            var sql = squel.insert()
                .into("user")
                .set("id", id)
                .set("name", name)
                .set("head", head)
                .toString();
            console.log(sql)
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send("注册成功");
            });
        } else {
            res.send("登陆成功");
        }
    });
})

app.get("/userupdate", function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var sex = req.query.sex
    var city = req.query.city
    var phone = req.query.phone
    var sql = squel.update()
        .table("user")
        .set("name", name)
        .set("sex", sex)
        .set("city", city)
        .set("phone", phone)
        .where("id = \"" + id + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/userinfo", function (req, res) {
    var id = req.query.id
    var sql = squel.select()
        .from("user")
        .where("id = \"" + id + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsall", function (req, res) {
    var sql = squel.select()
        .field("goods.id")
        .field("goods.name")
        .field("goods.price")
        .field("goods.picture")
        .field("user.name", "username")
        .from("goods")
        .left_join("user", null, "user.id = goods.userid")
        .where("goods.state != 2")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goods", function (req, res) {
    var name = req.query.name
    var sql = squel.select()
        .from("goods")
        .where("name like \"%" + name + "%\"")
        .where("state != 2")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsid", function (req, res) {
    var id = req.query.id
    var sql = squel.select()
        .from("goods")
        .where("id = \"" + id + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodscate", function (req, res) {
    var cate = req.query.cate
    var sql = squel.select()
        .from("goods")
        .where("cate = \"" + cate + "\"")
        .where("goods.state != 2")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsuserid", function (req, res) {
    var id = req.query.userid
    var sql = squel.select()
        .from("goods")
        .where("userid = \"" + id + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsadd", function (req, res) {
    var name = req.query.name
    var text = req.query.text
    var price = req.query.price
    var cate = req.query.cate
    var picture = req.query.picture
    var userid = req.query.userid
    var sql = squel.insert()
        .into("goods")
        .set("name", name)
        .set("text", text)
        .set("price", price)
        .set("cate", cate)
        .set("state", 0)
        .set("picture", picture)
        .set("userid", userid)
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsdel", function (req, res) {
    var id = req.query.id
    var sql = squel.delete()
        .from("goods")
        .where("id = \"" + id + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsupdate", function (req, res) {
    var id = req.query.id
    var name = req.query.name
    var text = req.query.text
    var price = req.query.price
    var cate = req.query.cate
    var state = req.query.state
    var picture = req.query.picture
    var userid = req.query.userid
    var sql = squel.update()
        .table("goods")
        .set("name", name)
        .set("text", text)
        .set("price", price)
        .set("cate", cate)
        .set("state", state)
        .set("picture", picture)
        .set("userid", userid)
        .where("id = " + id)
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/goodsstate", function (req, res) {
    var id = req.query.id
    var state = req.query.state
    var sql = squel.update()
        .table("goods")
        .set("state", state)
        .where("id = " + id)
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/cartadd", function (req, res) {
    var userid = req.query.userid
    var goodsid = req.query.goodsid
    var sql = squel.select()
        .from("cart")
        .where("userid = \"" + userid + "\"")
        .where("goodsid = \"" + goodsid + "\"")
        .toString();
    console.log(sql)
    con.query(sql, function (err, result) {
        console.log(result)
        if (err) throw err;
        if (!result.length) {
            var sql = squel.insert()
                .into("cart")
                .set("userid", userid)
                .set("goodsid", goodsid)
                .set("number", 1)
                .toString();
            console.log(sql)
            try {
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);
                });
            } catch (e) {
                console.log(e);
                res.status(500).send()
            }
        } else {
            var sql = squel.update()
                .table("cart")
                .set("number", result[0].number + 1)
                .where("userid = \"" + userid + "\"")
                .where("goodsid = " + goodsid)
                .toString();
            console.log(sql)
            try {
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);
                });
            } catch (e) {
                console.log(e);
                res.status(500).send()
            }
        }
    })
})

app.get("/cartid", function (req, res) {
    var userid = req.query.userid
    var sql = squel.select()
        .field("goods.name")
        .field("goods.price")
        .field("goods.picture")
        .field("goods.userid")
        .field("cart.number")
        .field("cart.goodsid")
        .from("cart")
        .left_join("goods", null, "cart.goodsid = goods.id")
        .where("cart.userid = \"" + userid + "\"")
        .toString()
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/cartupdate", function (req, res) {
    var userid = req.query.userid
    var goodsid = req.query.goodsid
    var number = req.query.number
    var sql = squel.update()
        .table("cart")
        .set("number", number)
        .where("userid = \"" + userid + "\"")
        .where("goodsid = " + goodsid)
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/cartdel", function (req, res) {
    var userid = req.query.userid
    var goodsid = req.query.goodsid
    var sql = squel.delete()
        .from("cart")
        .where("userid = \"" + userid + "\"")
        .where("goodsid = " + goodsid)
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/orderadd", function (req, res) {
    var goodsid = req.query.goodsid
    var buyid = req.query.buyid
    var sellid = req.query.sellid
    var datetime = req.query.datetime
    var state = req.query.state
    var remark = req.query.remark
    var address = req.query.address
    var phone = req.query.phone
    var sql = squel.insert()
        .into("mall.order")
        .set("goodsid", goodsid)
        .set("buyid", buyid)
        .set("sellid", sellid)
        .set("datetime", datetime)
        .set("state", state)
        .set("remark", remark)
        .set("address", address)
        .set("phone", phone)
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/ordersellid", function (req, res) {
    var sellid = req.query.sellid
    var sql = squel.select()
        .from("mall.order")
        .left_join("goods", null, "mall.order.goodsid = goods.id")
        .where("sellid = \"" + sellid + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/orderbuyid", function (req, res) {
    var buyid = req.query.buyid
    var sql = squel.select()
        .from("mall.order")
        .left_join("goods", null, "mall.order.goodsid = goods.id")
        .where("buyid = \"" + buyid + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

app.get("/orderupdate", function (req, res) {
    var goodsid = req.query.goodsid
    var buyid = req.query.buyid
    var sellid = req.query.sellid
    var datetime = req.query.datetime
    var state = req.query.state
    var remark = req.query.remark
    var address = req.query.address
    var phone = req.query.phone
    var sql = squel.update()
        .table("mall.order")
        .set("state", state)
        .set("remark", remark)
        .where("goodsid = \"" + goodsid + "\"")
        .where("buyid = \"" + buyid + "\"")
        .where("sellid = \"" + sellid + "\"")
        .where("datetime = \"" + datetime + "\"")
        .where("address = \"" + address + "\"")
        .where("phone = \"" + phone + "\"")
        .toString();
    console.log(sql)
    try {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

app.post('/upload', upload.single('singleFile'), (req, res) => {
    console.log(req.file);
    res.send(req.file.filename)
});

app.get("/img", function (req, res) {
    var fileName = 'E:/jsweb/uploads/' + req.query.img
    console.log(req.query.img)
    res.sendFile(fileName, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
})


app.listen(8888);