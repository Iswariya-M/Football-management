const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aishu@2003',
  database: 'admin_panel'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/teams', (req, res) => {
    const { name, caption, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10 } = req.body;
    const query = `INSERT INTO teams (name, caption, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, caption,player1, player2, player3, player4, player5, player6, player7, player8, player9, player10 ], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the team.' });
      } else {
        console.log('Team added successfully');
        res.status(200).json({ message: 'Team added successfully' });
      }
    });
  });

  app.post('/addMatch', (req, res) => {
    const { team1, team2, date } = req.body;
    const query = `INSERT INTO \`match\` (team1, team2, date) VALUES (?, ?, ?)`;
    db.query(query, [team1, team2, date], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the match.' });
      } else {
        console.log('Match added successfully');
        res.status(200).json({ message: 'Match added successfully' });
      }
    });
  });
  

app.get('/teams', (req, res) => {
  const query = `SELECT * FROM teams`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching teams.' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/matches', (req, res) => {
  const query = `SELECT * FROM \`match\``;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching matches.' });
    } else {
      res.status(200).json(result);
    }
  });
});



app.post('/team', (req, res) => {
    const { teamName, teamCaption, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, imageUrl } = req.body;
  
   
    db.query(
      `INSERT INTO teams (name, caption, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [teamName, teamCaption, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, imageUrl],
      (err, result) => {
        if (err) {
          console.error('Error adding team to MySQL:', err);
          res.status(500).send('Error adding team to MySQL');
          return;
        }
        console.log('Team added to MySQL:', result);
        res.status(200).send('Team added successfully');
      }
    );
  });

  app.get('/teams', (req, res) => {
    
    db.query(`SELECT * FROM teams`, (err, result) => {
      if (err) {
        console.error('Error fetching teams from MySQL:', err);
        res.status(500).send('Error fetching teams from MySQL');
        return;
      }
      console.log('Teams fetched from MySQL:', result);
      res.status(200).json(result);
    });
  });

  app.get('/team/:id', (req, res) => {
    const teamId = req.params.id;
    
    
    const query = 'SELECT * FROM teams WHERE id = ?';
    db.query(query, [teamId], (err, results) => {
      if (err) {
        console.error('Error fetching team details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Team not found' });
        return;
      }
  
      const teamDetails = results[0];
      res.status(200).json(teamDetails); 
    });
  });


// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
  const values = [username, email, password, 'user']; 
  

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).json({ message: 'Failed to signup' });
      return;
    }
    console.log('User signed up successfully');
    res.status(200).json({ message: 'Successfully signed up' }); 
  });
});



app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Failed to login' });
      return;
    }

    if (result.length === 0) {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('User logged in successfully:', result[0]);
    const userRole = result[0].role; // Assuming role is stored in the database
    if (userRole === 'admin') {
      res.status(200).json({ message: 'Admin logged in successfully' });
    } else {
      res.status(200).json({ message: 'User logged in successfully' });
    }
  });
});


app.post('/book', (req, res) => {
  const { name, email, mobile, match } = req.body;
  const query = `INSERT INTO book (name, email, mobile, \`match\`) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, mobile, match], (err, result) => {
    if (err) {
      console.error('Error adding booking to MySQL:', err);
      res.status(500).json({ error: 'An error occurred while adding the booking.' });
      return;
    }
    console.log('Booking added to MySQL:', result);
    res.status(200).json({ message: 'Booking successful' });
  });
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
