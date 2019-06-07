# Computers inventory API

## Data structures
Name | Structure
---|---
User | `{ _id: String, email: String, password: String(hash) }`
Associate | `{ _id: String, firstName: String, lastName: String, position: String }`
Motherboard | `{ _id: String, manufacturer: String, model: String, chipset: String }`
Processor | `{ _id: String, manufacturer: String, model: String, frequency: String }`
RAM | `{ _id: String, manufacturer: String, type: String, frequency: String, volume: Number }`
HDD | `{ _id: String, manufacturer: String, model: String, volume: Number }`
SSD | `{ _id: String, manufacturer: String, model: String, volume: Number }`
GraphicsCard | `{ _id: String, manufacturer: String, model: String }`
Computer | `{ _id: String, inventoryNumber: Number, configuration: Configuration, assignedTo: String(userId)}`
Configuration | `{ motherboard: String(id), ram: String(id)[], processor: String(id), graphicsCard: String(id), HDD: String(id), SSD: String(id) }`
Monitor | `{ _id: String, assignedTo: String(userId) }`
Mouse | `{ _id: String, assignedTo: String(userId) }`
Keyboard | `{ _id: String, assignedTo: String(userId) }`
Headphones | `{ _id: String, assignedTo: String(userId) }`

## Routes
`Base url - http://localhost:4000/api`
### Auth

`additional route: /auth`

Route | Method | Request | Response
:---|:---:|:---|:---
`/login`| `POST` | `{email: String, password: String}` | `{token: String}`
`/register` | `POST` | `{email: String. password: String}` | `{...User}`

### Motherboards

`additional route: /motherboards`

Route | Method | Request | Response
:---|:---:|:---|:---
`/` | `GET` | - | Motherboard[]
`/{id}` | `GET` | - | Motherboard
`/` | `POST` | `{ manufacturer: String, model: String, chipset: String }` | Motherboard
`/{id}` | `PUT` | `{ manufacturer?: String, model?: String, chipset?: String }` | Motherboard
`/{id}` | `DELETE` | - | -

? - optional fields
