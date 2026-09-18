import type { Course } from './courses'

/**
 * Exam Prep — Mendix Intermediate Developer certification.
 *
 * Original, MCQ-heavy practice mirroring the exam blueprint (Domain Model,
 * Security, Pages, Microflows, XPath, Modules/Translation, Integration,
 * Agile/Team Server). Phrasing is original; no proprietary exam text is copied.
 * Every 'correct' index is cross-checked against standard Mendix behaviour.
 */
export const intermediateCourse: Course = {
  id: 'intermediate',
  title: 'Exam Prep',
  subtitle: 'Mendix Intermediate certification',
  icon: '📜',
  color: '#ff9600',
  blurb:
    'Drill the Mendix Intermediate Developer exam blueprint — domain model, security, pages, microflows, XPath, integration and Agile — with exam-style questions.',
  units: [
    /* ============================ 1. DOMAIN MODEL ============================ */
    {
      id: 'domain-model',
      title: 'Domain Model',
      icon: '🗂️',
      blurb: 'Associations, inheritance, delete behavior, attributes and entity types.',
      lessons: [
        {
          id: 'associations',
          title: 'Associations & ownership',
          exercises: [
            {
              kind: 'choice',
              q: `Which association multiplicities can you model between two entities?`,
              options: [
                `One-to-one, one-to-many, and many-to-many`,
                `Only one-to-many`,
                `One-to-many and many-to-many only`,
                `Zero-to-one and many-to-any`,
              ],
              correct: 0,
              why: `Multiplicity comes from the association Type (Reference vs Reference set) plus the Owner property, giving 1-1, 1-*, and *-*.`,
            },
            {
              kind: 'choice',
              q: `In a one-to-many association, on which entity is the reference stored?`,
              options: [
                `On the "one" side`,
                `On the "many" side — the association owner`,
                `Always in a separate join table`,
                `On both entities`,
              ],
              correct: 1,
              why: `For 1-* the many-side owns and stores the reference; only many-to-many uses a separate association table.`,
            },
            {
              kind: 'choice',
              q: `How does a "Reference" differ from a "Reference set"?`,
              options: [
                `A Reference is single-valued on the owner side (1-1 / 1-*); a Reference set is the multi-valued end used for many-to-many`,
                `A Reference set cannot have delete behavior`,
                `A Reference only works within one module`,
                `There is no functional difference`,
              ],
              correct: 0,
              why: `Reference = single-valued end; Reference set = the multi-valued *-* end. The Owner property decides which side owns it.`,
            },
            {
              kind: 'match',
              prompt: `Match each association concept to its meaning.`,
              pairs: [
                { term: `Reference`, def: `Single-valued association end (1-1 or 1-*)` },
                { term: `Reference set`, def: `Multi-valued end used for many-to-many` },
                { term: `Owner`, def: `Property that decides which side stores the reference` },
                { term: `Cross-module association`, def: `Link between entities in two different modules` },
              ],
            },
            {
              kind: 'reveal',
              q: `When would you model a many-to-many association, and how is it stored?`,
              answer: `Use it when many objects on each side relate to many on the other (e.g. Students ↔ Courses). Mendix stores a many-to-many in a separate association (join) table, not as a foreign key on either entity.`,
              hint: `Think about where the link lives when neither side is single-valued.`,
            },
          ],
        },
        {
          id: 'inheritance',
          title: 'Generalization & inheritance',
          exercises: [
            {
              kind: 'choice',
              q: `What is the difference between a generalization and an association?`,
              options: [
                `Generalization is an "is-a" (inheritance) relationship; an association is a "has-a" link between independent entities`,
                `They are identical`,
                `An association is inheritance; a generalization is a foreign key`,
                `Generalization only works across modules`,
              ],
              correct: 0,
              why: `A specialization inherits members from its generalization (is-a); an association merely links two independent entities (has-a).`,
            },
            {
              kind: 'multi',
              q: `A specialization inherits which of the following from its generalization? (Select all.)`,
              options: [`Attributes`, `Associations`, `Validation rules`, `Entity access (security) rules`],
              correct: [0, 1, 2],
              why: `Attributes, associations and validation rules flow down the inheritance chain; access rules are defined per entity and are NOT inherited.`,
            },
            {
              kind: 'choice',
              q: `When is generalization preferable to a one-to-one association?`,
              options: [
                `When the related data is always needed and you frequently search/display it together, with inserts dominating over updates`,
                `When you have very high update/transaction volume`,
                `When extending a Marketplace module without editing it`,
                `When only some objects need the extra data`,
              ],
              correct: 0,
              why: `Inheritance keeps data readable together and is good for reads/inserts; a 1-1 association suits high write volume or extending imported modules.`,
            },
            {
              kind: 'reveal',
              q: `You want to store an uploaded image on an entity. What should the entity generalize from, and why?`,
              answer: `Generalize from System.Image, which is a specialization of System.FileDocument and adds thumbnail handling. For non-image files, generalize from System.FileDocument instead.`,
            },
          ],
        },
        {
          id: 'delete-behavior',
          title: 'Delete behavior',
          exercises: [
            {
              kind: 'choice',
              q: `Which three delete-behavior options can an association apply?`,
              options: [
                `Keep associated object(s) (default), delete them as well (cascade), or delete only if not associated (prevent + error)`,
                `Only keep or only cascade`,
                `Always cascade-delete`,
                `Configurable only at runtime via a microflow`,
              ],
              correct: 0,
              why: `Delete behavior is set per association end and offers exactly these three referential-integrity rules.`,
            },
            {
              kind: 'choice',
              q: `An Order must never be deletable while it still has OrderLines. Which behavior enforces this?`,
              options: [
                `Cascading delete`,
                `Keep associated object(s)`,
                `Delete Order only if it is not associated with an OrderLine (prevent delete, showing an error)`,
                `A before-delete microflow only`,
              ],
              correct: 2,
              why: `Prevent-delete blocks the deletion and shows the message while the association is still populated.`,
            },
            {
              kind: 'choice',
              q: `You want each Profile removed automatically whenever its Customer is deleted. Which behavior?`,
              options: [
                `Keep Profile (default)`,
                `Delete Customer and delete its Profile object(s) as well (cascading delete)`,
                `Delete Customer only if it has no Profile`,
                `Prevent delete`,
              ],
              correct: 1,
              why: `Cascading delete propagates the delete across the association to the associated objects.`,
            },
            {
              kind: 'reveal',
              q: `What does delete behavior actually govern?`,
              answer: `Delete behavior governs committed associated objects and enforces referential integrity: cascade deletes the associated objects, prevent-delete blocks the delete while an association still exists.`,
            },
          ],
        },
        {
          id: 'attributes',
          title: 'Attributes, indexes & entity types',
          exercises: [
            {
              kind: 'choice',
              q: `How does an AutoNumber attribute behave?`,
              options: [
                `It is a random unique string per object`,
                `It is a database-generated, auto-incrementing whole number; it must be a stored attribute and cannot be user-edited`,
                `The user types it on a form`,
                `It is only available on non-persistable entities`,
              ],
              correct: 1,
              why: `The database assigns the next incrementing value automatically, so it is stored and cannot be edited or calculated.`,
            },
            {
              kind: 'choice',
              q: `How does a calculated (virtual) attribute differ from a stored one?`,
              options: [
                `It is saved in the database like any other attribute`,
                `Its value is recomputed by a microflow on every retrieve, is not stored, and cannot be sorted on`,
                `It can only hold strings`,
                `It is faster to sort on than a stored attribute`,
              ],
              correct: 1,
              why: `Calculated attributes run a microflow on read, so they aren't stored and can't be used in XPath sorts.`,
            },
            {
              kind: 'choice',
              q: `What is the effect of adding an index to an entity attribute?`,
              options: [
                `It speeds up every operation equally`,
                `It speeds up searches/constraints on that attribute but slows inserts/updates/deletes, and is only available on persistable entities`,
                `It makes the attribute required`,
                `It encrypts the attribute`,
              ],
              correct: 1,
              why: `An index trades faster reads for slower writes; add it to frequently-searched persistable attributes (contains-searches don't benefit).`,
            },
            {
              kind: 'multi',
              q: `Which statements about a non-persistable entity are TRUE? (Select all.)`,
              options: [
                `No database table is created for it`,
                `Its objects live in memory during the session`,
                `You cannot define an index on it`,
                `It cannot have attributes`,
              ],
              correct: [0, 1, 2],
              why: `Non-persistable entities keep data in memory with no table and no indexes, but they CAN still have attributes and associations.`,
            },
            {
              kind: 'match',
              prompt: `Match each attribute/entity concept to its meaning.`,
              pairs: [
                { term: `Enumeration`, def: `A single value from a fixed, predefined list` },
                { term: `AutoNumber`, def: `Database-generated incrementing whole number` },
                { term: `Calculated attribute`, def: `Value computed by a microflow on retrieve, not stored` },
                { term: `System.Image`, def: `Generalize from this to store an image with thumbnails` },
                { term: `Non-persistable entity`, def: `Kept in memory, no database table` },
              ],
            },
          ],
        },
      ],
    },

    /* ============================ 2. SECURITY ============================ */
    {
      id: 'security',
      title: 'Security',
      icon: '🔒',
      blurb: 'Security levels, user vs module roles, entity access and XPath constraints.',
      lessons: [
        {
          id: 'levels',
          title: 'Security levels',
          exercises: [
            {
              kind: 'choice',
              q: `Which three app security levels exist, and which is required for a licensed cloud deployment?`,
              options: [
                `None, Basic, Full — Full required`,
                `Off, Prototype/Demo, Production — Production required`,
                `Development, Staging, Live — Live required`,
                `Low, Medium, High — High required`,
              ],
              correct: 1,
              why: `There are exactly three levels; only Production is permitted for deployment to licensed Mendix Cloud nodes.`,
            },
            {
              kind: 'choice',
              q: `At the Prototype/Demo level, what is actually enforced?`,
              options: [
                `Full entity/data access rules and XPath constraints`,
                `Sign-in, page and microflow access — but users can access all data`,
                `No security at all`,
                `Only anonymous-user access`,
              ],
              correct: 1,
              why: `Prototype/Demo checks sign-in, page and microflow access, but entity (data) access is NOT enforced.`,
            },
            {
              kind: 'choice',
              q: `Raising security to Production makes which configuration mandatory that wasn't at Prototype/Demo?`,
              options: [
                `Page access`,
                `Microflow access`,
                `Entity (data) access rules and dataset access`,
                `Sign-in configuration`,
              ],
              correct: 2,
              why: `Production additionally requires entity and dataset access, on top of the page/microflow access already checked at Prototype/Demo.`,
            },
            {
              kind: 'reveal',
              q: `What does the "Off" security level mean, and where is it allowed?`,
              answer: `Off enforces no security — no sign-in, no access checks, users see everything. It is only allowed for local testing and Free Apps, never for a licensed production deployment.`,
            },
          ],
        },
        {
          id: 'roles',
          title: 'User roles & module roles',
          exercises: [
            {
              kind: 'choice',
              q: `What is the relationship between user roles and module roles?`,
              options: [
                `They are identical, just named differently`,
                `A user role is defined at app level and bundles one or more module roles; end-users are assigned only user roles`,
                `Module roles are assigned directly to end-users`,
                `User roles live inside a module; module roles live at app level`,
              ],
              correct: 1,
              why: `End-users get user roles; each user role bundles the module roles that carry the actual per-module access rights.`,
            },
            {
              kind: 'choice',
              q: `Why does Mendix separate module roles from user roles?`,
              options: [
                `To make deployment faster`,
                `To keep a module self-contained so it can be reused in other apps and published to the Marketplace`,
                `Because end-users need to see module roles`,
                `It is a legacy requirement with no purpose`,
              ],
              correct: 1,
              why: `Module roles keep a module independent of the app; the app maps its user roles onto the module's roles.`,
            },
            {
              kind: 'choice',
              q: `Where in Studio Pro do you connect user roles to module roles?`,
              options: [`App Security (User roles tab)`, `User settings`, `Module settings`, `System administration`],
              correct: 0,
              why: `The user-role → module-role mapping is configured in App Security.`,
            },
            {
              kind: 'match',
              prompt: `Match each security concept to its role.`,
              pairs: [
                { term: `User role`, def: `App-level role assigned to end-users` },
                { term: `Module role`, def: `Grants access to pages, microflows and entities within a module` },
                { term: `App Security`, def: `Where user roles map onto module roles` },
                { term: `Administrator`, def: `Default user role for app administration` },
              ],
            },
            {
              kind: 'reveal',
              q: `You import a Marketplace module that ships its own module roles and app security is Production. What must you do for them to take effect?`,
              answer: `Map each imported module role to one or more of your app's user roles in App Security. At Prototype/Demo and Production, module roles only grant access once linked to a user role.`,
            },
          ],
        },
        {
          id: 'entity-access',
          title: 'Entity access & XPath constraints',
          exercises: [
            {
              kind: 'choice',
              q: `An entity access rule for a module role can define which permissions?`,
              options: [
                `Only Read`,
                `Create/Read/Write/Delete on objects, plus per-member read/write and an XPath (row-level) constraint`,
                `Only page navigation`,
                `Only microflow execution`,
              ],
              correct: 1,
              why: `Access rules combine object CRUD rights, per-member read/write, and a row-level XPath constraint per module role.`,
            },
            {
              kind: 'choice',
              q: `What does an XPath constraint on an access rule do, and what is its key limitation?`,
              options: [
                `It restricts which pages are shown; works on all entities`,
                `It limits the SET of objects (rows) the rule covers — row-level security — and works only on persistable entities because the database enforces it`,
                `It changes attribute data types`,
                `It applies only to non-persistable entities`,
              ],
              correct: 1,
              why: `Member access controls columns; the XPath constraint controls which rows a role sees, and it runs against the database.`,
            },
            {
              kind: 'multi',
              q: `Which statements about entity access are TRUE? (Select all.)`,
              options: [
                `Multiple rules for the same module role are additive — granted rights are combined (OR logic)`,
                `Member access controls which attributes a role can read/write`,
                `The XPath constraint controls which rows a role can access`,
                `Access rules are inherited by specializations automatically`,
              ],
              correct: [0, 1, 2],
              why: `Rules union across matches, members control columns, XPath controls rows — but access rules are defined per entity and are NOT inherited.`,
            },
            {
              kind: 'reveal',
              q: `While testing you get "Creating object of type X failed for security reasons." What is the likely cause and fix?`,
              answer: `The acting user's module role has no Create (or required entity access) rule for entity X. Add an access rule granting the needed right to that module role.`,
            },
          ],
        },
        {
          id: 'access-scope',
          title: 'Anonymous, demo & page access',
          exercises: [
            {
              kind: 'choice',
              q: `With Production security, how do you allow users without an account to use the app?`,
              options: [
                `Set security back to Prototype/Demo`,
                `Enable anonymous users in App Security and assign them an anonymous user role`,
                `Give every user the Administrator role`,
                `Disable entity access rules`,
              ],
              correct: 1,
              why: `In App Security → Anonymous users you allow them and pick the role unauthenticated visitors receive.`,
            },
            {
              kind: 'choice',
              q: `When are the module-role permissions on a microflow checked?`,
              options: [
                `Always, including internal sub-microflow calls`,
                `Only when the microflow is triggered from the client`,
                `Never; microflows have no security`,
                `Only during deployment`,
              ],
              correct: 1,
              why: `Microflow access is validated on client-triggered execution; internally called sub-microflows are not re-checked.`,
            },
            {
              kind: 'choice',
              q: `Which statement about page access is TRUE?`,
              options: [
                `Restricting a page fully blocks all access, including deep links`,
                `Page access hides a page from navigation/buttons per module role, but real data protection relies on entity access (deep links can bypass menus)`,
                `Page access is set at user-role level directly`,
                `All pages are open to all roles by default at Production`,
              ],
              correct: 1,
              why: `Menu/button visibility is page access, but deep links can bypass it — so protect data with entity access rules.`,
            },
            {
              kind: 'reveal',
              q: `What are demo users for, and where are they available?`,
              answer: `Mendix auto-creates one demo user per user role (local runs and Free Apps only) so you can sign in as each role and verify what that role can see and do.`,
            },
          ],
        },
      ],
    },

    /* ============================ 3. PAGES & UI ============================ */
    {
      id: 'pages-ui',
      title: 'Pages & UI',
      icon: '🎨',
      blurb: 'Data widgets, reuse with snippets/layouts, visibility, theming and navigation.',
      lessons: [
        {
          id: 'data-widgets',
          title: 'Data widgets',
          exercises: [
            {
              kind: 'choice',
              q: `Which data widget shows the contents of exactly ONE object?`,
              options: [`Data grid`, `List view`, `Data view`, `Template grid`],
              correct: 2,
              why: `A data view is bound to a single object; list view and data grid show lists.`,
            },
            {
              kind: 'choice',
              q: `Which widget renders a list where each object uses a customizable template?`,
              options: [`Data grid`, `List view`, `Data view`, `Reference selector`],
              correct: 1,
              why: `A list view renders each object with a template you build inside its drop zone.`,
            },
            {
              kind: 'choice',
              q: `Which widget shows objects in a table of columns with built-in search, sort and paging?`,
              options: [`List view`, `Data view`, `Data grid`, `Snippet`],
              correct: 2,
              why: `A data grid displays objects in columns with controls to search, sort, page and edit.`,
            },
            {
              kind: 'multi',
              q: `Which data sources can populate a list view or data view? (Select all.)`,
              options: [`Database`, `Association`, `Microflow`, `Nanoflow`],
              correct: [0, 1, 2, 3],
              why: `Data widgets accept database, association, microflow or nanoflow sources.`,
            },
            {
              kind: 'match',
              prompt: `Match each widget to what it does.`,
              pairs: [
                { term: `Data view`, def: `Shows a single object` },
                { term: `List view`, def: `Templated list of objects` },
                { term: `Data grid`, def: `Tabular list with search, sort and paging` },
                { term: `Reference selector`, def: `Sets a reference by picking one object` },
              ],
            },
          ],
        },
        {
          id: 'reuse',
          title: 'Reuse: snippets, layouts & templates',
          exercises: [
            {
              kind: 'choice',
              q: `Which statement correctly distinguishes a snippet from a building block?`,
              options: [
                `Both keep a live link to their source`,
                `A snippet keeps a live link so edits propagate everywhere it's used; a building block copies its widgets onto the page with no live link`,
                `A building block propagates changes but a snippet does not`,
                `They are functionally identical`,
              ],
              correct: 1,
              why: `Change a snippet and every usage updates; a building block just drops its editable widgets onto the page once.`,
            },
            {
              kind: 'choice',
              q: `In a layout, what is the empty area that pages fill in with content called?`,
              options: [`Snippet`, `Placeholder`, `Building block`, `Region`],
              correct: 1,
              why: `A placeholder is the gap in a layout that pages based on it fill with their content.`,
            },
            {
              kind: 'choice',
              q: `When one layout is based on another, what is the parent layout called?`,
              options: [`Master layout`, `Base template`, `Snippet`, `Navigation profile`],
              correct: 0,
              why: `The master layout is the layout another layout is based on; the child fills the master's placeholders.`,
            },
            {
              kind: 'match',
              prompt: `Match each reuse concept to its meaning.`,
              pairs: [
                { term: `Snippet`, def: `Reusable widget set with a live link to all usages` },
                { term: `Building block`, def: `Widgets copied onto a page once, no live link` },
                { term: `Layout`, def: `Reusable page frame with placeholders` },
                { term: `Placeholder`, def: `The gap a page fills with its own content` },
                { term: `Master layout`, def: `The layout another layout is based on` },
              ],
            },
          ],
        },
        {
          id: 'visibility',
          title: 'Visibility, theming & navigation',
          exercises: [
            {
              kind: 'choice',
              q: `You want a container visible only to users with a specific module role. Where do you configure this?`,
              options: [
                `In a microflow`,
                `In the container's Conditional visibility (visible for selected module roles)`,
                `In the navigation document`,
                `In the domain model`,
              ],
              correct: 1,
              why: `Conditional visibility can restrict a widget to selected module roles or base it on a boolean/expression.`,
            },
            {
              kind: 'choice',
              q: `Where do you adjust global colours, fonts and styling without writing custom CSS?`,
              options: [
                `The domain model`,
                `The Theme Editor / design properties (Atlas UI)`,
                `The navigation document`,
                `The microflow editor`,
              ],
              correct: 1,
              why: `The Theme Editor sets theme colours/fonts; design properties apply predefined Atlas classes without raw CSS.`,
            },
            {
              kind: 'choice',
              q: `A user opens a web app on a tablet but no Tablet profile exists. Which navigation profile is used?`,
              options: [
                `Phone`,
                `The Responsive profile (the default web profile)`,
                `Native mobile`,
                `None; access is denied`,
              ],
              correct: 1,
              why: `The Responsive profile is the default web profile that devices fall back to when no matching profile exists.`,
            },
            {
              kind: 'reveal',
              q: `A page shows an attribute a role can open but has no read access to (security consistency error). How do you resolve it?`,
              answer: `Either grant that module role read access to the member, or set conditional visibility on the widget so it is hidden for roles that lack access.`,
            },
          ],
        },
      ],
    },

    /* ============================ 4. MICROFLOWS ============================ */
    {
      id: 'microflows',
      title: 'Microflows',
      icon: '⚙️',
      blurb: 'Flow control, object activities, error handling, aggregates and expressions.',
      lessons: [
        {
          id: 'flow-control',
          title: 'Flow control: splits, merges & loops',
          exercises: [
            {
              kind: 'choice',
              q: `At runtime, how many outgoing sequence flows does an exclusive split (decision) follow?`,
              options: [`All flows whose condition is true`, `Exactly one`, `At least one`, `None until a merge`],
              correct: 1,
              why: `A decision follows one and only one outgoing path — Mendix has no "inclusive split".`,
            },
            {
              kind: 'choice',
              q: `Two conditional paths each set a status, then you want ONE shared activity afterwards. Which element joins them?`,
              options: [`Merge`, `Exclusive split`, `Loop`, `Continue event`],
              correct: 0,
              why: `A merge recombines multiple sequence flows into one so a shared activity is modelled once.`,
            },
            {
              kind: 'multi',
              q: `Which two events can ONLY be used inside a loop? (Select all.)`,
              options: [`Break`, `Continue`, `Merge`, `Exclusive split`],
              correct: [0, 1],
              why: `Break exits the loop early; Continue skips to the next iteration. Both are loop-only.`,
            },
            {
              kind: 'order',
              q: `Order the steps to total an Order's lines and reflect it on the open page.`,
              items: [
                `Retrieve the Order and its OrderLines`,
                `Loop over the OrderLines, aggregating the amount`,
                `Change the Order's Total attribute with the result`,
                `Commit the Order with Refresh in client set to Yes`,
              ],
              why: `Retrieve first, iterate to sum, apply the change, then commit with refresh so bound widgets update.`,
            },
          ],
        },
        {
          id: 'objects',
          title: 'Objects: change, commit & retrieve',
          exercises: [
            {
              kind: 'choice',
              q: `Which statement about the Change Object activity is correct?`,
              options: [
                `It always commits changes to the database`,
                `It can change members with or without committing, and with or without triggering events`,
                `It always requires a separate Commit activity`,
                `It can never refresh the client`,
              ],
              correct: 1,
              why: `Change Object exposes Commit (Yes / No / Yes without events) and a Refresh-in-client option.`,
            },
            {
              kind: 'choice',
              q: `You changed an object and want an open page's data-source-driven widget to reflect it. What is required?`,
              options: [
                `Nothing — the client updates automatically`,
                `Commit the object with "Refresh in client" set to Yes`,
                `Delete and recreate the object`,
                `Restart the app`,
              ],
              correct: 1,
              why: `Committing persists the change; Refresh in client pushes the new state to widgets bound to that object.`,
            },
            {
              kind: 'choice',
              q: `True or false: retrieving an object "by association" always avoids a database query.`,
              options: [
                `True`,
                `False — if the associated object isn't already in memory, it is still fetched from the database`,
              ],
              correct: 1,
              why: `A retrieve by association reads from the database when the associated object isn't already loaded.`,
            },
            {
              kind: 'reveal',
              q: `When should you use "Retrieve from database" instead of "by association"?`,
              answer: `When you need XPath constraints, sorting or ranges beyond a single association, or you need the committed database values. Retrieve by association is best when the object is already in memory.`,
            },
          ],
        },
        {
          id: 'error-handling',
          title: 'Error handling',
          exercises: [
            {
              kind: 'choice',
              q: `An activity has error handling "Custom without rollback" and it fails. What happens?`,
              options: [
                `All database changes are reverted and the microflow aborts`,
                `Changes made before the error are kept and the error flow is followed`,
                `The error is suppressed and the flow continues as if nothing happened`,
                `Only the calling microflow is rolled back`,
              ],
              correct: 1,
              why: `Custom without rollback keeps changes made before the failing activity and routes down the error flow.`,
            },
            {
              kind: 'choice',
              q: `With "Custom with rollback" error handling, what happens to database changes when an error is caught?`,
              options: [
                `They are kept`,
                `All changes in scope are reverted, then the error flow is followed`,
                `Only the last change is reverted`,
                `Nothing — the microflow ends normally`,
              ],
              correct: 1,
              why: `Custom with rollback undoes all changes in scope and then follows the custom error path.`,
            },
            {
              kind: 'choice',
              q: `Which setting keeps all changes and continues silently, with nothing logged or shown to the user?`,
              options: [`Rollback`, `Custom with rollback`, `Continue`, `Custom without rollback`],
              correct: 2,
              why: `"Continue" suppresses the error and keeps changes; docs recommend Custom without rollback so failures stay visible.`,
            },
            {
              kind: 'match',
              prompt: `Match each error-handling setting to its behaviour.`,
              pairs: [
                { term: `Rollback`, def: `Default: revert changes and abort the microflow on error` },
                { term: `Custom with rollback`, def: `Revert changes, then follow the error flow` },
                { term: `Custom without rollback`, def: `Keep changes made so far, then follow the error flow` },
                { term: `Continue`, def: `Suppress the error and keep going silently` },
              ],
            },
          ],
        },
        {
          id: 'expressions',
          title: 'Aggregates, expressions & events',
          exercises: [
            {
              kind: 'choice',
              q: `You need the total number of objects in a list. Which aggregate function requires NO attribute or expression?`,
              options: [`Sum`, `Average`, `Count`, `Maximum`],
              correct: 2,
              why: `Count returns the number of objects and needs no attribute; Sum/Average/Min/Max need a numeric attribute.`,
            },
            {
              kind: 'choice',
              q: `When using Sum or Average over a list, the selected attribute must be of which type?`,
              options: [`String`, `Boolean`, `Numeric (Integer, Long or Decimal)`, `Enumeration`],
              correct: 2,
              why: `Sum, Average, Minimum and Maximum aggregate over numeric attributes (or a numeric expression) only.`,
            },
            {
              kind: 'choice',
              q: `Which expression returns "Adult" when age is 18 or over and "Minor" otherwise?`,
              options: [
                `if $Person/Age >= 18 then 'Adult' else 'Minor'`,
                `$Person/Age >= 18 ? 'Adult' : 'Minor'`,
                `case $Person/Age when >=18 'Adult'`,
                `iif($Person/Age,'Adult','Minor')`,
              ],
              correct: 0,
              why: `Mendix expressions use if-then-else keywords, not the ternary operator.`,
            },
            {
              kind: 'choice',
              q: `Which statement about a microflow triggered by a scheduled event is correct?`,
              options: [
                `It may have one input parameter`,
                `It must have no parameters and runs with all rights, without user interaction`,
                `It requires an active end-user session`,
                `It only runs when a user logs in`,
              ],
              correct: 1,
              why: `Scheduled-event microflows take no parameters and execute with full rights on the configured schedule.`,
            },
            {
              kind: 'reveal',
              q: `What is the index of the first character of a string in a Mendix expression (e.g. for substring)?`,
              answer: `0 — Mendix strings are zero-indexed, so the first character is at position 0.`,
            },
          ],
        },
      ],
    },

    /* ============================ 5. XPATH ============================ */
    {
      id: 'xpath',
      title: 'XPath',
      icon: '🧭',
      blurb: 'Tokens, current-user constraints, association traversal, operators and functions.',
      lessons: [
        {
          id: 'tokens',
          title: 'Tokens & current user',
          exercises: [
            {
              kind: 'choice',
              q: `Which XPath token represents the currently logged-in user, and what does it resolve to?`,
              options: [
                `[%CurrentObject%] — the page`,
                `[%CurrentUser%] — the GUID of the logged-in user`,
                `[%CurrentDateTime%] — now`,
                `[%UserRole%] — the role name`,
              ],
              correct: 1,
              why: `[%CurrentUser%] resolves to the logged-in user's object GUID, used in access rules and constraints.`,
            },
            {
              kind: 'match',
              prompt: `Match each XPath token/keyword to its meaning.`,
              pairs: [
                { term: `[%CurrentUser%]`, def: `GUID of the logged-in user` },
                { term: `[%CurrentObject%]`, def: `GUID of the active object in context` },
                { term: `[%CurrentDateTime%]`, def: `The current server date and time` },
                { term: `empty`, def: `Matches a member that has no value (NULL)` },
              ],
            },
            {
              kind: 'reveal',
              q: `Where can XPath constraints be applied in Mendix?`,
              answer: `In entity access rules (row-level security), in microflow and data-source Retrieve actions, and in page/data-grid data sources.`,
            },
          ],
        },
        {
          id: 'constraints',
          title: 'Constraints & traversal',
          exercises: [
            {
              kind: 'choice',
              q: `Which XPath returns all VacationRequests submitted by the current user?`,
              options: [
                `[VacationManagement.VacationRequest_Submitter = '[%CurrentUser%]']`,
                `[Submitter != CurrentUser]`,
                `[%CurrentUser%] = Submitter`,
                `[Status = 'Open']`,
              ],
              correct: 0,
              why: `The constraint traverses the Submitter association and compares it to the current-user token.`,
            },
            {
              kind: 'choice',
              q: `Which XPath retrieves all Customers who live in Rotterdam, following Customer → Address?`,
              options: [
                `[Sales.Customer_Address = 'Rotterdam']`,
                `[Sales.Customer_Address/Sales.Address/City = 'Rotterdam']`,
                `[City = 'Rotterdam' and Address]`,
                `[/Sales.Address/City = 'Rotterdam']`,
              ],
              correct: 1,
              why: `Association traversal uses forward slashes: association / target-entity / attribute.`,
            },
            {
              kind: 'choice',
              q: `A data grid uses the constraint [StartDate = empty]. What does it show?`,
              options: [
                `All requests that have a StartDate`,
                `All requests where StartDate is not populated (has no value)`,
                `Requests created today`,
                `A validation error`,
              ],
              correct: 1,
              why: `The "empty" keyword (like NULL) matches attributes/associations that have no value.`,
            },
            {
              kind: 'multi',
              q: `Which of these express a logical AND between two constraints on the same entity? (Select all.)`,
              options: [
                `[Name='Jansen'][City='Rotterdam']`,
                `[Name='Jansen' and City='Rotterdam']`,
                `[Name='Jansen' or City='Rotterdam']`,
                `[Name='Jansen'] / [City='Rotterdam']`,
              ],
              correct: [0, 1],
              why: `Adjacent bracket constraints are implicitly AND-ed, equivalent to the "and" operator; "or" means logical OR.`,
            },
          ],
        },
        {
          id: 'functions',
          title: 'Operators & functions',
          exercises: [
            {
              kind: 'choice',
              q: `What do the XPath functions contains() and starts-with() do?`,
              options: [
                `contains() tests whether a string contains a substring; starts-with() tests whether it begins with a substring`,
                `They compare numbers only`,
                `contains() checks associations; starts-with() checks enumerations`,
                `Both are only usable in OQL`,
              ],
              correct: 0,
              why: `These are string constraint functions for substring matching (contains-searches don't use DB indexes).`,
            },
            {
              kind: 'choice',
              q: `Which XPath lets each user see only their OWN Notification objects (Notification → Account)?`,
              options: [
                `[Notifications.Notification_Account = '[%CurrentObject%]']`,
                `[Notifications.Notification_Account = '[%CurrentUser%]']`,
                `[Account = CurrentUser]`,
                `[Notifications.Notification_Account != empty]`,
              ],
              correct: 1,
              why: `Constraining the Account association to [%CurrentUser%] limits results to the logged-in user's own notifications.`,
            },
            {
              kind: 'reveal',
              q: `Why can a "contains" substring search not use a database index, and what's the takeaway?`,
              answer: `Indexes optimise exact and prefix matches, not arbitrary substring (contains) matches, so a contains search scans instead of seeking. Index attributes you filter with equality/range, and expect contains-heavy searches to be slower on large tables.`,
            },
          ],
        },
      ],
    },

    /* ==================== 6. MODULES & MARKETPLACE ==================== */
    {
      id: 'modules',
      title: 'Modules & Marketplace',
      icon: '📦',
      blurb: 'Module contents, Marketplace imports, module roles and translation/languages.',
      lessons: [
        {
          id: 'marketplace',
          title: 'Modules & Marketplace',
          exercises: [
            {
              kind: 'choice',
              q: `After you download a module from the Marketplace, where does it appear in your app?`,
              options: [
                `In the System module`,
                `In the App Explorer under the Marketplace modules folder`,
                `In a hidden temp directory`,
                `Merged into your main module automatically`,
              ],
              correct: 1,
              why: `Downloaded Marketplace content is grouped in the Marketplace-modules folder and works like modules you build.`,
            },
            {
              kind: 'choice',
              q: `What does a Marketplace module typically include besides logic?`,
              options: [
                `Only microflows`,
                `Its own domain model and security (module roles), behaving like a module you create yourself`,
                `Only pages`,
                `A separate database`,
              ],
              correct: 1,
              why: `A Marketplace module is a full module, so it ships its own entities and module-level security.`,
            },
            {
              kind: 'multi',
              q: `A Mendix module can contain which of the following? (Select all.)`,
              options: [`A domain model`, `Pages and microflows`, `Module roles (security)`, `Resources such as images and documents`],
              correct: [0, 1, 2, 3],
              why: `A module bundles a domain model, documents, its own module roles and resources.`,
            },
            {
              kind: 'reveal',
              q: `How can you reuse a module you built across different apps?`,
              answer: `Export the module as a package (.mpk) from the source app and import it into the target app. Marketplace modules work the same way.`,
            },
          ],
        },
        {
          id: 'module-roles',
          title: 'Module roles & security scope',
          exercises: [
            {
              kind: 'choice',
              q: `Module roles are used to grant access to which of the following?`,
              options: [
                `Only entities`,
                `Pages, microflows and entities (and their members) defined in that module`,
                `Only Marketplace content`,
                `Only navigation items`,
              ],
              correct: 1,
              why: `Within a module, all security (page, microflow and entity access) is granted per module role.`,
            },
            {
              kind: 'choice',
              q: `You import a module with its own module roles while app security is Production. What must you do?`,
              options: [
                `Nothing — module roles work automatically`,
                `Map the imported module roles to the applicable user roles in App Security`,
                `Delete your existing user roles`,
                `Lower the security level to Off`,
              ],
              correct: 1,
              why: `At Prototype/Demo and Production, every module role (including imported ones) must be linked to a user role to take effect.`,
            },
            {
              kind: 'reveal',
              q: `Why does Mendix keep security as module roles inside a module rather than app-level roles?`,
              answer: `So a module stays self-contained and reusable: it defines its own module roles, and any app that imports it maps those roles onto its own user roles. This keeps the module independent and publishable.`,
            },
          ],
        },
        {
          id: 'translation',
          title: 'Languages & translation',
          exercises: [
            {
              kind: 'choice',
              q: `Which feature shows all translatable texts of a source and destination language in one place?`,
              options: [`System texts`, `Batch translate`, `Language selector`, `The domain model`],
              correct: 1,
              why: `Batch translate lists every translatable text side by side for a source and destination language.`,
            },
            {
              kind: 'choice',
              q: `What is the app's default language used for, and what is the initial default?`,
              options: [
                `Only in Studio Pro; initially Dutch`,
                `The fallback shown when a text isn't translated into the user's language; initially English (US)`,
                `It disables all other languages; initially French`,
                `The anonymous user's language; initially German`,
              ],
              correct: 1,
              why: `The default language is the fallback whenever a text has no translation in the user's language; it starts as English (US).`,
            },
            {
              kind: 'choice',
              q: `How can an end-user switch the application's language at runtime?`,
              options: [
                `By reinstalling the app`,
                `By using the Language Selector widget (data source System.Language)`,
                `By changing the default language in Studio Pro`,
                `Language cannot be changed at runtime`,
              ],
              correct: 1,
              why: `The Language Selector widget lets users pick from the enabled languages and applies the change immediately.`,
            },
            {
              kind: 'match',
              prompt: `Match each translation concept to its meaning.`,
              pairs: [
                { term: `Batch translate`, def: `Translate all texts of a source vs destination language in one place` },
                { term: `Default language`, def: `Fallback shown when a text has no translation` },
                { term: `Language Selector`, def: `Runtime widget to switch the app language` },
                { term: `System texts`, def: `Built-in platform UI strings you can translate per language` },
              ],
            },
          ],
        },
      ],
    },

    /* ============================ 7. INTEGRATION ============================ */
    {
      id: 'integration',
      title: 'Integration',
      icon: '🔌',
      blurb: 'REST, import/export mappings, OData, published services and Data Hub.',
      lessons: [
        {
          id: 'rest-mappings',
          title: 'REST & mappings',
          exercises: [
            {
              kind: 'choice',
              q: `Which activity fetches data from an external REST API, and how does the response become Mendix objects?`,
              options: [
                `Export mapping, via a JSON structure`,
                `Call REST service — the response is interpreted by an import mapping into Mendix objects`,
                `Retrieve Object, directly`,
                `An import mapping calls the API and exports objects`,
              ],
              correct: 1,
              why: `Call REST service fetches the data; an import mapping (built on a JSON/XML structure) converts it into Mendix objects.`,
            },
            {
              kind: 'choice',
              q: `What is the correct role of import mappings versus export mappings?`,
              options: [
                `Import converts objects to JSON; export converts JSON to objects`,
                `Import interprets incoming XML/JSON into Mendix objects; export serializes Mendix objects into XML/JSON`,
                `Both convert objects to JSON`,
                `Both are only used for CSV files`,
              ],
              correct: 1,
              why: `Import reads external data into objects; export writes objects out to XML/JSON.`,
            },
            {
              kind: 'choice',
              q: `What does an export mapping require that an import mapping does not?`,
              options: [
                `A JSON structure`,
                `A parameter — the root object/entity to serialize`,
                `An index`,
                `A scheduled event`,
              ],
              correct: 1,
              why: `An export mapping needs a parameter (the object to serialize) because it turns existing objects into JSON/XML.`,
            },
            {
              kind: 'reveal',
              q: `What is a JSON structure (or message definition) used for when building a mapping?`,
              answer: `It defines the schema — the shape of the JSON or XML — that a mapping maps to and from. You can generate a JSON structure by pasting a sample response, then base an import or export mapping on it.`,
            },
          ],
        },
        {
          id: 'odata-publish',
          title: 'OData & publishing',
          exercises: [
            {
              kind: 'choice',
              q: `What does a published OData service expose?`,
              options: [
                `Microflows as REST operations`,
                `Entities as a queryable data feed that consumers (Excel, other apps, Data Hub) can read`,
                `Only files`,
                `The app theme`,
              ],
              correct: 1,
              why: `Published OData exposes selected entities as a queryable feed for external consumers.`,
            },
            {
              kind: 'choice',
              q: `What does a published REST service expose?`,
              options: [
                `Entities as OData feeds`,
                `Microflows as REST operations/endpoints`,
                `The domain model diagram`,
                `Only static files`,
              ],
              correct: 1,
              why: `A published REST service maps operations to microflows, each running when its endpoint is called.`,
            },
            {
              kind: 'multi',
              q: `Which statements about Mendix integration are TRUE? (Select all.)`,
              options: [
                `Call REST service consumes an external REST API`,
                `Published OData exposes entities for consumption`,
                `Published REST exposes microflows as endpoints`,
                `Import mappings serialize Mendix objects to JSON`,
              ],
              correct: [0, 1, 2],
              why: `Import mappings do the reverse — they read JSON/XML into objects; serializing to JSON is an export mapping.`,
            },
            {
              kind: 'reveal',
              q: `What is the Mendix Data Hub, and how does it relate to OData?`,
              answer: `Data Hub is a catalog of shareable datasets published as OData services. You register a published OData service in the catalog, and other apps discover it and consume its entities as external entities via the Data Hub pane.`,
            },
          ],
        },
        {
          id: 'consuming',
          title: 'HTTP methods & consuming',
          exercises: [
            {
              kind: 'choice',
              q: `Which HTTP method typically retrieves data without changing it?`,
              options: [`POST`, `GET`, `DELETE`, `PUT`],
              correct: 1,
              why: `GET reads a resource; POST creates, PUT updates, DELETE removes.`,
            },
            {
              kind: 'choice',
              q: `When you consume an external OData service, the entities it provides are used as…`,
              options: [
                `Regular persistable entities stored in your database`,
                `External entities retrieved live from the source, not stored in your database`,
                `Non-persistable entities you must fill manually`,
                `Enumerations`,
              ],
              correct: 1,
              why: `Consumed OData surfaces external entities read live from the source system rather than stored locally.`,
            },
            {
              kind: 'match',
              prompt: `Match each integration term to its role.`,
              pairs: [
                { term: `Call REST service`, def: `Microflow activity that consumes an external REST API` },
                { term: `Import mapping`, def: `Turns incoming JSON/XML into Mendix objects` },
                { term: `Export mapping`, def: `Serializes Mendix objects into JSON/XML (needs a parameter)` },
                { term: `Published OData service`, def: `Exposes entities as a queryable feed` },
                { term: `Data Hub`, def: `Catalog for discovering and consuming shared OData datasets` },
              ],
            },
          ],
        },
      ],
    },

    /* ==================== 8. AGILE & TEAM SERVER ==================== */
    {
      id: 'agile',
      title: 'Agile & Team Server',
      icon: '🏃',
      blurb: 'Scrum roles and ceremonies, backlog and estimation, version control and deployment.',
      lessons: [
        {
          id: 'scrum-roles',
          title: 'Scrum roles & ceremonies',
          exercises: [
            {
              kind: 'choice',
              q: `What are the three Scrum roles, and what does Mendix call the developers on the team?`,
              options: [
                `Manager, Tester, Coder — called Coders`,
                `Product Owner, Scrum Master, Development Team — developers (Business Engineers in Mendix terminology)`,
                `Architect, Analyst, Admin — called Analysts`,
                `CEO, CTO, Developer — called Engineers`,
              ],
              correct: 1,
              why: `Scrum defines PO, Scrum Master and the Development Team; in Mendix terminology the developers are also known as "Business Engineers".`,
            },
            {
              kind: 'choice',
              q: `What is the primary responsibility of the Scrum Master?`,
              options: [
                `Prioritising the product backlog`,
                `Ensuring the team follows Agile best practices and removing impediments`,
                `Writing all the microflows`,
                `Approving the production deployment`,
              ],
              correct: 1,
              why: `The Scrum Master safeguards the process and clears blockers; backlog priority belongs to the Product Owner.`,
            },
            {
              kind: 'choice',
              q: `What is the primary responsibility of the Product Owner?`,
              options: [
                `Removing team blockers`,
                `Translating business/user needs into backlog items and prioritising the backlog`,
                `Running the standup as a status meeting`,
                `Merging branches on the Team Server`,
              ],
              correct: 1,
              why: `The Product Owner is the liaison to the business who builds and prioritises the backlog to maximise value.`,
            },
            {
              kind: 'match',
              prompt: `Match each Scrum role/ceremony to its purpose.`,
              pairs: [
                { term: `Product Owner`, def: `Owns and prioritises the product backlog` },
                { term: `Scrum Master`, def: `Safeguards the process and clears impediments` },
                { term: `Development Team`, def: `Builds the increment; "Business Engineers" in Mendix` },
                { term: `Sprint Planning`, def: `Team selects the stories for the coming sprint` },
                { term: `Daily Scrum`, def: `Short sync on progress, plans and blockers` },
              ],
            },
          ],
        },
        {
          id: 'backlog',
          title: 'Backlog & estimation',
          exercises: [
            {
              kind: 'choice',
              q: `How should items in the product backlog be ordered?`,
              options: [
                `Alphabetically`,
                `From top to bottom by descending priority`,
                `By oldest first`,
                `Randomly — order does not matter`,
              ],
              correct: 1,
              why: `The backlog is a prioritised list, highest-priority first, so the team always picks the most valuable work next.`,
            },
            {
              kind: 'choice',
              q: `What do the story points assigned to a user story represent?`,
              options: [
                `The exact number of hours required`,
                `A relative estimate of complexity/effort (often on the Fibonacci scale)`,
                `The number of developers needed`,
                `The story's priority`,
              ],
              correct: 1,
              why: `Story points are a relative estimate of complexity/effort, not a direct measure of hours.`,
            },
            {
              kind: 'reveal',
              q: `During Sprint Planning, what does the development team decide?`,
              answer: `Which backlog user stories it commits to completing in the upcoming sprint, pulling the highest-priority items it has capacity for.`,
            },
          ],
        },
        {
          id: 'team-server',
          title: 'Team Server & version control',
          exercises: [
            {
              kind: 'choice',
              q: `Why is it recommended to use the Team Server for Mendix apps?`,
              options: [
                `It hosts the production database`,
                `It is the built-in Git-based version control: collaboration, history, branching/merging and rollback`,
                `It is only for storing screenshots`,
                `It replaces the need for security`,
              ],
              correct: 1,
              why: `The Team Server lets multiple developers commit, branch, merge, tag and revert model changes safely.`,
            },
            {
              kind: 'choice',
              q: `Using the Git merge workflow, how do you bring the work from a feature branch into the main line?`,
              options: [
                `Delete the feature branch and recreate main from it`,
                `Merge the complete feature branch back into the main line`,
                `Copy each document manually between branches`,
                `Revert the main line to the branch's first commit`,
              ],
              correct: 1,
              why: `Merging pulls all of the feature branch's changes into the main line, keeping a single integrated history.`,
            },
            {
              kind: 'multi',
              q: `Which statements about the Mendix Team Server are TRUE? (Select all.)`,
              options: [
                `It supports branching and merging`,
                `Building a deployment package tags the underlying revision`,
                `It keeps a revision history you can revert to`,
                `It stores end-user runtime data`,
              ],
              correct: [0, 1, 2],
              why: `The Team Server versions the app model; end-user runtime data lives in the app's database, not the Team Server.`,
            },
            {
              kind: 'order',
              q: `Order a typical Team Server workflow for a change.`,
              items: [
                `Update to the latest revision`,
                `Make and test your changes`,
                `Commit the changes with a message`,
                `Build a deployment package (tagging the revision)`,
                `Deploy to the Test environment`,
              ],
              why: `Sync first to avoid conflicts, change and test, commit, then tag by building a package and deploy up the pipeline.`,
            },
          ],
        },
        {
          id: 'deployment',
          title: 'Deployment & feedback',
          exercises: [
            {
              kind: 'choice',
              q: `What are the standard deployment environments on a licensed Mendix Cloud node?`,
              options: [
                `Sandbox only`,
                `Test, Acceptance and Production (a Free App runs on a single Sandbox)`,
                `Dev, QA and Live only, no acceptance`,
                `Local, Team Server and Marketplace`,
              ],
              correct: 1,
              why: `A licensed node provides a Test → Acceptance → Production pipeline; Free Apps use one Sandbox.`,
            },
            {
              kind: 'choice',
              q: `What is a "tagged version" in the Mendix Team Server?`,
              options: [
                `Any commit made on a Friday`,
                `A revision that has been used to build a Mendix deployment package`,
                `A branch that was deleted`,
                `A comment on a user story`,
              ],
              correct: 1,
              why: `Building a deployment package tags the underlying revision, giving a labelled, reproducible version for rollback/audit.`,
            },
            {
              kind: 'reveal',
              q: `How do end-users submit feedback from a running app, and what context is attached automatically?`,
              answer: `Via the Mendix Feedback widget, which files the item straight into the app's backlog and automatically attaches context like the user's name/role, the active page, browser version and screen resolution.`,
            },
          ],
        },
      ],
    },
  ],
}
