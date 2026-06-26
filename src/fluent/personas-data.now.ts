import { Record } from '@servicenow/sdk/core';

// ─── Demo personas (sys_user) ───────────────────────────────────────────────
// All fictional. Used as incident callers and as work-note / comment authors so
// the activity stream and caller fields render with consistent named people.
// Email domain is the reserved example.com so nothing resembles real data.

// Callers
Record({
  $id: Now.ID['persona-camille-roux'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'camille.roux', first_name: 'Camille', last_name: 'Roux', email: 'camille.roux@example.com', active: true },
});

Record({
  $id: Now.ID['persona-theo-bernard'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'theo.bernard', first_name: 'Théo', last_name: 'Bernard', email: 'theo.bernard@example.com', employee_number: 'TBERN02', active: true },
});

Record({
  $id: Now.ID['persona-ines-lefevre'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'ines.lefevre', first_name: 'Inès', last_name: 'Lefèvre', email: 'ines.lefevre@example.com', active: true },
});

Record({
  $id: Now.ID['persona-lea-garnier'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'lea.garnier', first_name: 'Léa', last_name: 'Garnier', email: 'lea.garnier@example.com', active: true },
});

Record({
  $id: Now.ID['persona-mathis-fontaine'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'mathis.fontaine', first_name: 'Mathis', last_name: 'Fontaine', email: 'mathis.fontaine@example.com', active: true },
});

Record({
  $id: Now.ID['persona-hugo-mercier'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'hugo.mercier', first_name: 'Hugo', last_name: 'Mercier', email: 'hugo.mercier@example.com', active: true },
});

Record({
  $id: Now.ID['persona-chloe-dubois'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'chloe.dubois', first_name: 'Chloé', last_name: 'Dubois', email: 'chloe.dubois@example.com', active: true },
});

Record({
  $id: Now.ID['persona-lucas-girard'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'lucas.girard', first_name: 'Lucas', last_name: 'Girard', email: 'lucas.girard@example.com', active: true },
});

Record({
  $id: Now.ID['persona-nathan-lopez'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'nathan.lopez', first_name: 'Nathan', last_name: 'Lopez', email: 'nathan.lopez@example.com', active: true },
});

// Support agents (work-note authors)
Record({
  $id: Now.ID['persona-sofia-marchetti'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'sofia.marchetti', first_name: 'Sofia', last_name: 'Marchetti', email: 'sofia.marchetti@example.com', active: true },
});

Record({
  $id: Now.ID['persona-karim-haddad'],
  $meta: { installMethod: 'demo' },
  table: 'sys_user',
  data: { user_name: 'karim.haddad', first_name: 'Karim', last_name: 'Haddad', email: 'karim.haddad@example.com', active: true },
});
