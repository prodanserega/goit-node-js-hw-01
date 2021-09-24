const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { constants } = require("buffer");

const readContacts = async () => {
  const result = await fs.readFile(
    path.join(__dirname, "/db/contacts.json"),
    "utf8"
  );
  const contacts = JSON.parse(result);
  return contacts;
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const result = contacts.filter((contact) => contact.id != contactId);
  await fs.writeFile(
    path.join(__dirname, "/db/contacts.json"),
    JSON.stringify(result, null, 2)
  );
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContacts = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContacts);
  await fs.writeFile(
    path.join(__dirname, "/db/contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
