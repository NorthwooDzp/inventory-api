# Computers inventory API

## Data structures
Name | Structure
---|---
User | `{` <br/>&nbsp;&nbsp;  `_id: String,` <br/>&nbsp;&nbsp; `email: String,` <br/>&nbsp;&nbsp; `password: String(hash)`<br/> `}`
Associate | `{` <br/>&nbsp;&nbsp; `_id: String,` <br/>&nbsp;&nbsp; `firstName: String,`<br/>&nbsp;&nbsp; `lastName: String,` <br/>&nbsp;&nbsp; `position: String` <br/> `}`
Motherboard | `{`<br/>&nbsp;&nbsp; `_id: String,`<br/>&nbsp;&nbsp; `manufacturer: String,`<br/>&nbsp;&nbsp; `model: String,`<br/>&nbsp;&nbsp; `chipset: String`<br/> `}`
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


