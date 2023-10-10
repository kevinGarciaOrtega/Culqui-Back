import Redis from 'ioredis';

// Configura la conexión a Redis con host y puerto
const redis = new Redis({
  host: 'localhost', // Cambia esto al host de tu servidor Redis
  port: 6379, // Cambia esto al puerto de tu servidor Redis
});

export async function generateToken(): Promise<string> {
  // Genera un token único
  const token = generateUniqueToken();
  
  // Almacena el token en Redis con una expiración de 15 minutos
  await redis.set(token, 'data', 'EX', 900);

  return token;
}

// Implementa tu lógica para generar un token único aquí
function generateUniqueToken(): string {
  const randomToken = Math.random().toString(36).substring(2); // Genera una cadena aleatoria
  return randomToken;
}

// Agrega una función para verificar si un token existe en Redis
export async function tokenExists(token: string): Promise<boolean> {
  const exists = await redis.exists(token);
  return exists === 1;
}
