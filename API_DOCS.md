# API Pagos - Documentación

Esta es la documentación de la API del microservicio de pagos (`api-pagos`), diseñada para ser consumida desde otras aplicaciones web (por ejemplo, el frontend).

## Configuración Base

- **Puerto por defecto:** 3004
- **URL Base local:** `http://localhost:3004`
- **CORS:** Habilitado para todos los orígenes (`*`).

---

## Endpoints de Pagos

El recurso principal de esta API se encuentra bajo la ruta `/pagos`.

### 1. Obtener pagos
`GET /pagos`

Devuelve una lista de los pagos registrados. Se pueden aplicar filtros utilizando los parámetros de consulta (query params). Si se filtra por `reservaId`, la respuesta suele incluir el saldo pendiente para dicha reserva.

**Parámetros de consulta (Query Params) - Opcionales:**
- `reservaId` (number): Filtra los pagos por el ID de una reserva específica.
- `tipoPago` (string): Filtra por tipo de pago.
- `metodoPago` (string): Filtra por método de pago.
- `limite` (number): Limita la cantidad de resultados devueltos.

**Ejemplo de petición:**
```http
GET /pagos?reservaId=123&limite=10
```

---

### 2. Obtener estadísticas de pagos
`GET /pagos/estadisticas`

Devuelve información estadística sobre los pagos procesados por el sistema.

**Ejemplo de petición:**
```http
GET /pagos/estadisticas
```

---

### 3. Obtener un pago por ID
`GET /pagos/:id`

Devuelve los detalles de un pago específico a partir de su ID.

**Parámetros de ruta:**
- `id` (number): ID único del pago.

**Ejemplo de petición:**
```http
GET /pagos/5
```

---

### 4. Crear un nuevo pago
`POST /pagos`

Registra un nuevo pago en el sistema.

**Cuerpo de la petición (JSON):**

| Campo | Tipo | Obligatorio | Descripción |
| :--- | :--- | :---: | :--- |
| `reservaId` | number | Sí | ID de la reserva asociada (Debe ser un número entero mayor o igual a 1). |
| `monto` | number | Sí | Monto del pago (Debe ser un número positivo). |
| `tipoPago` | string | Sí | Tipo del pago. Valores permitidos: `'seña'`, `'saldo'`, `'completo'`, `'devolucion'`. |
| `metodoPago` | string | Sí | Método de pago. Valores permitidos: `'efectivo'`, `'tarjeta'`, `'transferencia'`. |
| `observaciones` | string | No | Comentarios o notas adicionales sobre el pago. |

**Ejemplo de Payload (Body):**
```json
{
  "reservaId": 123,
  "monto": 1500.50,
  "tipoPago": "seña",
  "metodoPago": "transferencia",
  "observaciones": "Transferencia bancaria Banco Nación"
}
```

**Respuesta Exitosa:**
- Código de estado: `201 Created`
