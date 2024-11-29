const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Asegúrate de tenerlo correctamente importado

const app = express();
const PORT = 4040;

// Configurar CORS para aceptar solicitudes desde cualquier origen
app.use(cors({
  origin: '*',  // Permite solicitudes desde cualquier origen (reemplaza con tu URL si es necesario)
  methods: 'GET, POST, PUT, DELETE',  // Métodos HTTP permitidos
  allowedHeaders: 'Content-Type, Authorization', // Cabeceras permitidas
}));

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: '192.168.1.34',
  user: 'root',
  password: '',
  database: 'gourmetly',
});

// Verificar si la conexión a la base de datos es exitosa
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para manejar el registro
app.post('/registro', (req, res) => {
  const { nombre, mail, contrasena } = req.body;

  // Verificar si faltan datos
  if (!nombre || !mail || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el correo ya está registrado
  const checkQuery = 'SELECT * FROM usuarios WHERE mail = ?';
  db.query(checkQuery, [mail], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Insertar el nuevo usuario en la base de datos
    const insertQuery = 'INSERT INTO usuarios (nombre, mail, contrasena) VALUES (?, ?, ?)';
    db.query(insertQuery, [nombre, mail, contrasena], (err) => {
      if (err) {
        console.error('Error al insertar usuario:', err);
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }

      // Respuesta exitosa
      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

// Iniciar el servidor en el puerto 4040
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
