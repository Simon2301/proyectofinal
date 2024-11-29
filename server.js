// const express = require('express');
// const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   //host: '192.168.141.1', // Cambiar por la IP local de tu máquina
//   // host: '192.168.x.x', // Cambiar por la IP local de tu máquina
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'gourmetly'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     return;
//   }
//   console.log('Conectado a la base de datos MySQL');
// });

// app.post('/registro', async (req, res) => {
//   const { nombre, correo, contrasena } = req.body;
//   if (!nombre || !correo || !contrasena) {
//     return res.status(400).json({ message: 'Todos los campos son obligatorios' });
//   }


//   const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
//   if (!validarCorreo(correo)) {
//     return res.status(400).json({ message: 'Correo inválido' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(contrasena, 10);

//     const query = 'INSERT INTO usuarios (nombre, mail, contrasena) VALUES (?, ?, ?)';
//     db.query(query, [nombre, correo, hashedPassword], (err, result) => {
//       if (err) {
//         if (err.code === 'ER_DUP_ENTRY') {
//           return res.status(409).json({ message: 'El correo ya está registrado' });
//         }
//         return res.status(500).json({ message: 'Error al crear el usuario', error: err });
//       }

//       console.log('Usuario creado:', { id: result.insertId, nombre, correo });
//       res.status(201).json({ message: 'Usuario creado exitosamente', userId: result.insertId });
//     });
//   } catch (error) {
//     console.error('Error en la creación del usuario:', error);
//     res.status(500).json({ message: 'Error en la creación del usuario' });
//   }
// });

// app.listen(3000, '0.0.0.0', () => {
//   console.log('Servidor corriendo en http://192.168.x.x:3000');
// });

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '192.168.141.1', // Dirección IP local
  user: 'root',
  password: '',
  database: 'gourmetly'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.post('/registro', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!validarCorreo(correo)) {
    return res.status(400).json({ message: 'Correo inválido' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const query = 'INSERT INTO usuarios (nombre, mail, contrasena) VALUES (?, ?, ?)';
    db.query(query, [nombre, correo, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'El correo ya está registrado' });
        }
        return res.status(500).json({ message: 'Error al crear el usuario', error: err });
      }

      console.log('Usuario creado:', { id: result.insertId, nombre, correo });
      res.status(201).json({ message: 'Usuario creado exitosamente', userId: result.insertId });
    });
  } catch (error) {
    console.error('Error en la creación del usuario:', error);
    res.status(500).json({ message: 'Error en la creación del usuario' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://192.168.141.1:3000');
});
