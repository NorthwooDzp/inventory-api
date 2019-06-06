# Computers inventory API

## Data structures
Name | Structure
---|---
User | `{ _id: String, email: String, password: String(hash) }`
Associate | `{ _id: String, <br/> firstName: String, lastName: String, position: String }`
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

Route | Method | Request | Response
-----|---|---|---
`/auth/login`| `POST` | `{email: String, password: String}` | `{token: String}`
**`/auth./register` | `POST` | `{email: String. password: String}` | `{...User}`

** - should be disabled after main accounts will be created,

? - optional fields


