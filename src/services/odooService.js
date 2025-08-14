import xmlrpc from "xmlrpc";
import { ODOO_URL, ODOO_DB, ODOO_USER, ODOO_API_KEY } from "../config/odooConfig.js";

const common = xmlrpc.createClient({ url: `${ODOO_URL}/xmlrpc/2/common` });
const object = xmlrpc.createClient({ url: `${ODOO_URL}/xmlrpc/2/object` });

let uidCache = null;

export const authenticateOdoo = () =>
  new Promise((resolve, reject) => {
    if (uidCache) return resolve(uidCache);

    common.methodCall("authenticate", [ODOO_DB, ODOO_USER, ODOO_API_KEY, {}], (err, uid) => {
      if (err) return reject(err);
      uidCache = uid;
      resolve(uid);
    });
  });

export const createLead = async ({ name, email, phone, message }) => {
  const uid = await authenticateOdoo();

  return new Promise((resolve, reject) => {
    object.methodCall(
      "execute_kw",
      [
        ODOO_DB,
        uid,
        ODOO_API_KEY,
        "crm.lead",
        "create",
        [
          {
            name: name,
            contact_name: name,
            email_from: email,
            phone: phone,
            description: message,
            type: "lead"
          }
        ]
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
