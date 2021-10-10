var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    var info_sent=req.body; //
    // {.....: ......, ......: .........}
    // {email: ......, password: ........}
    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "select * from USERS where email = ?"; //dòng lệnh lấy thông tin //
        connection.query(query, [info_sent.email], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            //password từ user: info_sent.password
            //password lấy từ database: rows.......

            //check if rows is empty of not
            if (rows.length > 0) {
                //compare password
                if (info_sent.password===rows[0].password) {
                    var data_sent={
                        fullname: rows[0].fullname,
                        email: rows[0].email,
                        redirectPath: "/userPage.html",
                        username: rows[0].username,
                        user_id: rows[0].userID
                    };

                    //set session
                    req.session.user=rows[0].userID;
                    console.log(data_sent);
                    //vd req.session.user=object (gồm id, name, dob)
                    //lấy id ra từ session, thì req.session.user.id/ lấy name:req.session.user.name

                    //vd req.session.user= id
                    //lấy id ra từ session, req.session.user


                    res.send(data_sent);
                } else {
                    //error unauthorized access
                    res.sendStatus(401);
                }
            } else {
                //error unauthorized access
                res.sendStatus(401);
            }

            //thông tin lấy từ database được lưu trong biến "rows"

        });
    });
});

router.post('/register', function(req, res, next) {
    var info_sent=req.body;
    console.log(req.body);
    req.pool.getConnection( function(err,connection) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            var query = "insert into USERS values(null, ?, ?, ?, ?, ?, ?, ?)"; //dòng lệnh lấy thông tin
            //Thay ? bằng thông tin trong array
            connection.query(query, [req.body.firstName, req.body.lastName, req.body.DOB, req.body.phoneNumber, req.body.email, req.body.username, req.body.password], function(err, rows, fields) {
                connection.release(); // release connection
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                console.log(rows);
                //thông tin lấy từ database được lưu trong biến "rows"
                res.send('Successfully registered!'); //send response

            });
        });
});

router.post('/logout', function(req, res, next) {

    //delete session
    delete req.session.user;
    res.send('Logout successfully');

});

router.get('/userInfo', function(req, res, next) {
    console.log(req.session.user);
    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = `select userID, firstName, lastName, DATE_FORMAT(DOB, "%Y-%m-%d") as DOB, phoneNumber, email, username, password from USERS WHERE userID = ? `; //dòng lệnh lấy thông tin
        //Thay ? bằng thông tin trong array
        connection.query(query, [req.session.user], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            //thông tin lấy từ database được lưu trong biến "rows"
            res.send(rows); //send response

        });
    });
});

router.post('/updateProfileSubmit', function(req, res, next) {
    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "update USERS set firstName = ? , lastName = ?, DOB = ?, phoneNumber = ?, email = ?, username = ?, password = ? where userID = ?"; //dòng lệnh lấy thông tin
        //Thay ? bằng thông tin trong array
        connection.query(query, [req.body.firstName, req.body.lastName, req.body.DOB, req.body.phoneNumber, req.body.email, req.body.username, req.body.password], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            userInfo();
            console.log(rows);
            //thông tin lấy từ database được lưu trong biến "rows"
            res.send(rows); //send response

        });
    });
});

router.post('/updateProfileCancel', function(req, res, next) {

    //delete session
    delete req.session.user;
    res.send('Logout successfully');

});


module.exports = router;
