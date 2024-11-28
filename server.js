const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: '192.168.x.x', // Cambia esto por la IP local de tu máquina
  user: 'root',
  password: '',
  database: 'gourmetly'
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar usuarios
app.post('/registro', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  // Validación de los campos
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validación del formato del correo
  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!validarCorreo(correo)) {
    return res.status(400).json({ message: 'Correo inválido' });
  }

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Consulta para insertar un nuevo usuario
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

// Servidor escuchando en el puerto 3000
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://192.168.x.x:3000'); // Cambia x.x por la IP de tu máquina
});
