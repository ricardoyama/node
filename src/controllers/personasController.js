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

module.exports = controller;