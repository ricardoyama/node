const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM personas',(err, rows) => {
            if(err){
                res.json(err);
            }
            res.render('personas', {
                data: rows
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO personas set ?', data, (err, rows) => {
        console.log(rows)
        res.redirect('/');
      })
    })
  };

  controller.edit = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM personas WHERE idpersona = ?", [id], (err, rows) => {
        res.render('edit.ejs', {
          data: rows[0]
        })
      });
    });
  };
  
  controller.update = (req, res) => {
    const id = req.params.id;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE personas set ? where idpersona = ?', [newCustomer, id], (err, rows) => {
      res.redirect('/');
    });
    });
  };
  

  controller.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM personas WHERE idpersona = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
  };

  controller.data = (req, res) => {
    var dato = req.params.data;
    console.log(dato);
    
    var  plotly = require('plotly')('RicardoYama','71QYpGeWceNtEFAxS06Q'),
    token = 'hvx28cb6ub';
    contador = 50;
    
    // helper function to get a nicely formatted date string
    function getDateString() {
        var time = new Date().getTime();
        // 32400000 is (GMT+9 Japan)
        // for your timezone just multiply +/-GMT by 36000000
        var datestr = new Date(time -18000000).toISOString().replace(/T/, ' ').replace(/Z/, '');
        return datestr;
    }

    var initdata = [{x:[], y:[], stream:{token:token, maxpoints: 500}}];
    var initlayout = {fileopt : "extend", filename : "sensor-test"};
    var data=6;

    plotly.plot(initdata, initlayout, function (err, msg) {
        if (err) return console.log(err)

        console.log(msg);
        var stream = plotly.stream(token, function (err, res) {
            console.log(err, res);
        });

        
            
            var streamObject = JSON.stringify({ x : getDateString(), y : dato });
            console.log(streamObject);
            stream.write(streamObject+'\n');
            
    });
    res.send('Sucess');
  };

  controller.home = (req, res) => {
    res.render('datos')
    
  };

module.exports = controller;