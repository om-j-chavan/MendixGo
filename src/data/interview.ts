import type { Course } from './courses'

/**
 * Interview Prep — the priority MendixGo track.
 * Built from Om's real Mendix Q&A bank: MXTechies questions, the actual Three M
 * rounds (incl. the hands-on Vendor Verification exercise), scenarios, integration,
 * security, practical drills, and behavioural/logistics.
 */
export const interviewCourse: Course = {
  id: 'interview',
  title: 'Interview Prep',
  subtitle: 'Nail the Mendix interview',
  icon: '🎯',
  color: '#58cc02',
  blurb:
    'Drill the real questions, scenarios and hands-on tasks from actual Mendix interviews until every answer is automatic.',
  units: [
    /* ============================= UNIT 1 ============================= */
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      icon: '🧱',
      blurb: 'The core Mendix mechanics every interviewer probes first.',
      lessons: [
        {
          id: 'error-handling',
          title: 'Error Handling',
          exercises: [
            {
              kind: 'choice',
              q: 'How many error-handling options can you set on a microflow activity?',
              options: ['2', '3', '4', '5'],
              correct: 2,
              why: 'Four: Rollback, Custom with rollback, Custom without rollback, and Continue.',
            },
            {
              kind: 'reveal',
              q: 'Name the four error-handling options and when you pick each.',
              answer:
                'Rollback (undo the whole transaction and re-throw — the safe default for anything transactional), Custom with rollback (roll back then run your handler flow), Custom without rollback (keep committed work, branch to a handler — for best-effort side tasks), and Continue (swallow the error — only for truly optional steps).',
              hint: 'Think: is partial data safe to keep?',
            },
            {
              kind: 'choice',
              q: 'Inside an error handler, which variable holds the error type and message?',
              options: ['$currentError', '$latestError', '$exception', '$errorObject'],
              correct: 1,
              why: '$latestError exposes the caught error (its type and message) inside the error flow.',
            },
            {
              kind: 'reveal',
              q: 'If a microflow returns false, what happens next?',
              answer:
                'It depends where the false is used. In a before-commit event handler, false aborts the commit (this is what interviewers usually fish for). As a validation or a decision condition, the caller branches on false. As an unchecked sub-microflow return, nothing special happens.',
              hint: 'The special case is one specific event handler.',
            },
            {
              kind: 'choice',
              q: 'You have a best-effort side task (e.g. write an audit log) that must not undo the main work if it fails. Which error handling fits?',
              options: [
                'Rollback',
                'Custom without rollback',
                'Custom with rollback',
                'None — let it crash',
              ],
              correct: 1,
              why: 'Custom without rollback keeps the committed work and branches to your handler, ideal for optional side tasks.',
            },
            {
              kind: 'reveal',
              q: 'How do you throw your own error from a microflow?',
              answer:
                'Use Community Commons throwException, and log context with a Log message activity at the right level. In the handler you read $latestError for the details.',
            },
          ],
        },
        {
          id: 'entity-events',
          title: 'Entity Events',
          exercises: [
            {
              kind: 'reveal',
              q: 'What is a before-commit event handler and what can it do?',
              answer:
                'A microflow that runs just before the object is written to the DB. It returns a Boolean, and returning false aborts the commit. Use it to derive/normalise/validate values — compute a field, set a hash, trim text, enforce a rule.',
              hint: 'It can stop the save.',
            },
            {
              kind: 'reveal',
              q: 'What is an after-commit event handler and why can it not undo a save?',
              answer:
                'It runs just after the object is successfully saved, so the write already happened. Use it to trigger follow-ups — create a related object, write an audit log, send a notification, call an integration.',
            },
            {
              kind: 'choice',
              q: 'A before-commit handler returns false. What happens to the object?',
              options: [
                'It is saved anyway',
                'The commit is aborted — object not saved',
                'It saves but is immediately deleted',
                'A runtime error is thrown',
              ],
              correct: 1,
              why: 'Returning false from a before-commit handler cancels the commit.',
            },
            {
              kind: 'match',
              prompt: 'Match the event handler to a good use.',
              pairs: [
                { term: 'Before commit', def: 'Set a derived/computed value or hash before save' },
                { term: 'Before commit', def: 'Validate and block the save by returning false' },
                { term: 'After commit', def: 'Write an audit-trail record' },
                { term: 'After commit', def: 'Send a notification or call an integration' },
              ],
            },
            {
              kind: 'choice',
              q: 'Where do you register an entity event handler?',
              options: [
                "The microflow's own properties",
                "The entity's properties → Event handlers",
                'Project Settings → Runtime',
                'The page that shows the entity',
              ],
              correct: 1,
              why: "Event handlers are configured on the entity's properties.",
            },
          ],
        },
        {
          id: 'flows',
          title: 'Microflows, Nanoflows & Actions',
          exercises: [
            {
              kind: 'reveal',
              q: 'Microflow vs Nanoflow?',
              answer:
                'Microflow runs server-side — DB commits, transactions, REST calls, business logic. Nanoflow runs client-side as JavaScript — lightweight/offline logic, fast UI, no server round-trip. Data/security/DB goes to a microflow; quick client-side UI logic goes to a nanoflow.',
              hint: 'Server vs browser.',
            },
            {
              kind: 'choice',
              q: 'Which returns a Promise and runs in the browser?',
              options: ['Microflow', 'Nanoflow', 'Scheduled event', 'Before-commit handler'],
              correct: 1,
              why: 'Nanoflows run client-side as JavaScript.',
            },
            {
              kind: 'reveal',
              q: 'Java action vs JavaScript action?',
              answer:
                'Java action is custom server-side logic in javasource, exposed as a microflow activity — use it when a microflow cannot do it (algorithms, encryption, file parsing, libraries). JavaScript action is client-side, used in nanoflows, returns a Promise — use it for browser APIs like geolocation or clipboard.',
              hint: 'One is server-side, one runs in the browser.',
            },
            {
              kind: 'match',
              prompt: 'Match each to where it runs / is called.',
              pairs: [
                { term: 'Microflow', def: 'Server-side, business logic and DB' },
                { term: 'Nanoflow', def: 'Client-side JavaScript, returns a Promise' },
                { term: 'Java action', def: 'Server-side custom code, called from a microflow' },
                { term: 'JavaScript action', def: 'Client-side custom code, called from a nanoflow' },
              ],
            },
            {
              kind: 'choice',
              q: 'You need heavy logic using a third-party Java library. What do you build?',
              options: ['A nanoflow', 'A JavaScript action', 'A Java action', 'A scheduled event'],
              correct: 2,
              why: 'A Java action runs server-side and can use Java libraries; call it from a microflow.',
            },
            {
              kind: 'reveal',
              q: 'How does a Scheduled Event work?',
              answer:
                'It is a microflow that runs automatically on a schedule, headless in the background, in the system context (no logged-in user, so no user-based security). It has no parameters and no page. Configure the interval and start time under the project Scheduled Events. Guard it per environment, keep it idempotent, add logging.',
              hint: 'No user, no page, runs on a timer.',
            },
          ],
        },
        {
          id: 'domain-model',
          title: 'Domain Model',
          exercises: [
            {
              kind: 'reveal',
              q: 'What is the domain model? Explain entities, attributes and associations.',
              answer:
                'The domain model is your app data structure. An entity is a table, an attribute is a column/field, and an association links two entities with a multiplicity — one-to-one, one-to-many (most common), or many-to-many. A generalization is inheritance, where one entity specialises another.',
              hint: 'Table, column, relationship.',
            },
            {
              kind: 'choice',
              q: 'A non-persistable entity...',
              options: [
                'Is stored in the database like any other',
                'Lives only in memory for the session and never hits the DB',
                'Is only for associations',
                'Cannot have attributes',
              ],
              correct: 1,
              why: 'Non-persistable entities are in-memory only (wizards, view models, temporary calculations) — no DB.',
            },
            {
              kind: 'match',
              prompt: 'Match the domain-model term to its meaning.',
              pairs: [
                { term: 'Entity', def: 'A table in the data model' },
                { term: 'Attribute', def: 'A column/field on an entity' },
                { term: 'Association', def: 'A relationship between two entities' },
                { term: 'Generalization', def: 'Inheritance — one entity specialises another' },
              ],
            },
            {
              kind: 'choice',
              q: 'Which is the most common association multiplicity?',
              options: ['one-to-one', 'one-to-many', 'many-to-many', 'zero-to-one'],
              correct: 1,
              why: 'One-to-many is the most common relationship in a domain model.',
            },
            {
              kind: 'reveal',
              q: 'Persistable vs non-persistable — give one use for each.',
              answer:
                'Persistable is stored in the database (your real records). Non-persistable lives only in memory for the session — perfect for a wizard, a computed summary, or a view model you never want to store.',
            },
          ],
        },
        {
          id: 'querying',
          title: 'Querying the Data',
          exercises: [
            {
              kind: 'reveal',
              q: 'XPath vs OQL — the one-line distinction interviewers want.',
              answer:
                'XPath retrieves objects you can change and commit. OQL returns a read-only tabular result set (rows/columns) like SQL — for reporting and aggregations across entities. XPath gives objects; OQL gives a dataset.',
              hint: 'Objects vs rows.',
            },
            {
              kind: 'choice',
              q: 'You need a count/sum. What should you reach for instead of retrieving the whole list and looping?',
              options: [
                'A nanoflow',
                'An Aggregate (count/sum) activity or OQL',
                'A scheduled event',
                'A before-commit handler',
              ],
              correct: 1,
              why: 'Use an Aggregate activity or OQL — retrieving a full list to count it is the classic waste.',
            },
            {
              kind: 'choice',
              q: 'Which is TRUE about OQL?',
              options: [
                'You can commit OQL results',
                'OQL is read-only and returns rows/columns',
                'OQL replaces the domain model',
                'OQL only works in nanoflows',
              ],
              correct: 1,
              why: 'OQL is read-only, tabular, run via report Datasets (Reporting) or the OQL marketplace module.',
            },
            {
              kind: 'reveal',
              q: 'Where do you run OQL in Mendix, and when would you reach for it?',
              answer:
                "Via report Datasets in the Reporting feature (or the separate OQL marketplace module). Reach for it for complex reporting or aggregation — counts, sums, joining several entities for a summary — that would be slow or awkward with XPath plus loops.",
            },
            {
              kind: 'choice',
              q: 'What is XPath in Mendix?',
              options: [
                'A styling language',
                "Mendix's query/filter language over the domain model, e.g. [RiskScore > 70]",
                'A deployment tool',
                'A REST protocol',
              ],
              correct: 1,
              why: 'XPath is the query/filter language; a constraint like [RiskScore > 70] filters at the database.',
            },
          ],
        },
      ],
    },

    /* ============================= UNIT 2 ============================= */
    {
      id: 'scenarios',
      title: 'Scenarios & Troubleshooting',
      icon: '🔍',
      blurb: 'How Mendix shops actually interview — symptom, causes, isolate, fix.',
      lessons: [
        {
          id: 'data-not-saving',
          title: 'Data Not Saving',
          exercises: [
            {
              kind: 'reveal',
              q: 'An object is committed from my side, but the database is empty. Why?',
              answer:
                'First suspect: the entity is non-persistable — those never hit the DB. Otherwise: you did Create but never Commit; an error rolled back the transaction; a before-commit handler returned false; entity-access security is hiding the rows from you; or you are looking at the wrong environment/database.',
              hint: 'The most common intended answer is about the entity type.',
            },
            {
              kind: 'multi',
              q: 'Which are plausible reasons a committed object is not in the DB? (select all)',
              options: [
                'The entity is non-persistable',
                'Create was called but Commit was not',
                'A before-commit handler returned false',
                'The app has too many pages',
                'A later error rolled back the transaction',
              ],
              correct: [0, 1, 2, 4],
              why: 'Page count is irrelevant; the other four are all real causes.',
            },
            {
              kind: 'choice',
              q: 'A user cannot see rows that genuinely exist in the DB. Most likely?',
              options: [
                'The database is corrupt',
                'An entity-access XPath constraint is hiding the rows for that role',
                'Mendix is offline',
                'The rows are non-persistable',
              ],
              correct: 1,
              why: 'Entity access is enforced on retrieves; a constraint like an owner/tenant filter can hide rows.',
            },
            {
              kind: 'reveal',
              q: 'A required field is sometimes saved empty despite page validation. Why, and the fix?',
              answer:
                'Page validation only fires on that page. If the object is committed from an import, integration or another microflow, it skips that validation. Enforce it server-side in a before-commit handler (return false if empty) or an entity validation rule so it holds no matter the entry point.',
            },
            {
              kind: 'choice',
              q: 'A Change object runs with Commit unchecked and nothing commits later. What is in the DB?',
              options: [
                'The change is saved',
                'Nothing new — the change is only in the in-memory object',
                'Half of the change',
                'A validation error is thrown',
              ],
              correct: 1,
              why: 'Change without a Commit only updates the in-memory object; a Commit is needed to write it.',
            },
          ],
        },
        {
          id: 'performance',
          title: 'Performance Triage',
          exercises: [
            {
              kind: 'reveal',
              q: 'A page/list loads very slowly. How do you troubleshoot?',
              answer:
                'Measure first — microflow debugger and Cloud slow-query metrics. Usual culprits: retrieving too many objects without pagination, N+1 retrieves inside a loop, counting a full list instead of using an aggregate, over-broad XPath, or a heavy microflow on page load. Then add limits/pagination, replace count-by-loop with an aggregate/OQL, and tighten the XPath.',
              hint: 'Two senior phrases: "n+1 retrieve" and "aggregate instead of count".',
            },
            {
              kind: 'choice',
              q: 'What is the "n+1 retrieve problem"?',
              options: [
                'Committing too often',
                'Retrieving inside a loop instead of once outside it',
                'Using too many nanoflows',
                'Having n+1 entities',
              ],
              correct: 1,
              why: 'Retrieving per iteration causes one query per item — retrieve once outside the loop.',
            },
            {
              kind: 'reveal',
              q: 'You commit inside a loop over 10,000 records and the app slows/runs out of memory. Fix?',
              answer:
                'Batch it — process in chunks of ~500-1000, commit each batch (commit without events if handlers are not needed), clear the list between batches to free memory, and run it as a scheduled/background job. Never hold and commit 10k in one transaction.',
              hint: 'Chunks, commit the batch, free memory.',
            },
            {
              kind: 'multi',
              q: 'Good database performance moves in Mendix? (select all)',
              options: [
                'Filter with XPath constraints at the DB',
                'Retrieve inside every loop',
                'Use aggregates instead of counting objects in memory',
                'Index attributes you frequently filter/sort by',
                'Commit lists in one go, not object-by-object',
              ],
              correct: [0, 2, 3, 4],
              why: 'Retrieving inside a loop is the anti-pattern; the rest are all wins.',
            },
            {
              kind: 'reveal',
              q: 'How would you import 1,000,000 (10 lakh) records?',
              answer:
                'Never load them all at once. Batch in chunks of ~500-1000 and commit each batch, ideally without events; stream the file with the Excel/DB importer or a Java action; retrieve with pagination; run it as a scheduled/background job; log progress and handle errors per batch. Set Refresh in client = No. Keep memory flat.',
              hint: 'Batching plus streaming plus background.',
            },
          ],
        },
        {
          id: 'scope-bugs',
          title: 'Security & Scope Bugs',
          exercises: [
            {
              kind: 'reveal',
              q: 'A user can see data they should not. How do you fix it?',
              answer:
                'It is an access-rule gap. Check the module-role entity access and its XPath constraint (e.g. an owner or tenant filter), plus page/microflow access. Make sure the retrieve feeding that page respects entity access — a missing constraint is the usual leak.',
              hint: 'Entity access rule + XPath constraint.',
            },
            {
              kind: 'reveal',
              q: 'A microflow works for one user but behaves differently for another. Why?',
              answer:
                'Almost always security context or data scope: the second user has a different module role, or an XPath constraint using CurrentUser returns a different/empty set, or the flow depends on user-specific data that does not exist. It is usually security/data-scope, not the logic.',
              hint: 'Compare the two users, not the code.',
            },
            {
              kind: 'reveal',
              q: 'Two users edit the same record at the same time. What happens, and how do you handle it?',
              answer:
                'By default Mendix is last-write-wins with no automatic locking, so the second commit overwrites the first. Handle it with optimistic concurrency — a version/last-changed attribute checked in a before-commit handler that rejects the save if it changed — or an in-use flag so only one person edits at a time.',
              hint: 'Default = last-write-wins.',
            },
            {
              kind: 'choice',
              q: "How is one user's data isolated from another's in Mendix?",
              options: [
                'A separate database per user',
                "An XPath constraint on entity Read access, e.g. [owner = '[%CurrentUser%]']",
                'A nanoflow filter',
                'Hiding widgets on the page',
              ],
              correct: 1,
              why: 'Row-level isolation comes from an XPath constraint on the entity access rule, enforced on every retrieve.',
            },
            {
              kind: 'choice',
              q: "Mendix's default behaviour when two users commit the same record at once is...",
              options: [
                'First-write-wins with an automatic lock',
                'Last-write-wins — the second commit overwrites the first',
                'Both commits are merged automatically',
                'A concurrency error is always thrown',
              ],
              correct: 1,
              why: 'Mendix has no automatic locking; it is last-write-wins unless you add optimistic concurrency.',
            },
          ],
        },
        {
          id: 'deploy-failures',
          title: 'Deploy & Integration Failures',
          exercises: [
            {
              kind: 'reveal',
              q: 'APIs work in Acceptance but stop in Production after the shift. What do you do?',
              answer:
                'Pull the production logs for the exact error (auth/timeout/404/SSL tells the direction). Same package was promoted, so the difference is almost always environment configuration: a constant still pointing at the acceptance URL, a missing/wrong prod API key, or IP-whitelisting/certificates for prod. Verify from Postman with prod credentials, fix the config, then add error handling, logging and an alert.',
              hint: 'Same code, different environment — check constants/keys first.',
            },
            {
              kind: 'multi',
              q: 'Common Mendix Cloud deployment problems? (select all)',
              options: [
                'Environment constants set for acceptance but not production',
                'Build blocked by consistency errors',
                'Scheduled events need enabling per environment',
                'Certificates / IP allow-listing missing for prod',
                'Nanoflows cannot be deployed at all',
              ],
              correct: [0, 1, 2, 3],
              why: 'Nanoflows deploy fine; the other four are real, believable deployment pain points.',
            },
            {
              kind: 'choice',
              q: 'After a deploy, a scheduled event is not running in production. First check?',
              options: [
                'Rewrite the microflow',
                'Scheduled events must be enabled per environment — confirm it is switched on for prod',
                'Reinstall Studio Pro',
                'Change the domain model',
              ],
              correct: 1,
              why: 'Scheduled events are enabled per environment; it can be on in acceptance and off in production.',
            },
            {
              kind: 'reveal',
              q: 'An integration (REST call) intermittently fails or times out. How do you make it robust?',
              answer:
                'Wrap the call in error handling, add a retry with backoff for transient failures, set a sensible timeout, and log request/response (without secrets). For anything slow/high-volume, make it asynchronous via a queue or scheduled event so the UI is not blocked, and show the user a friendly message rather than a stack trace.',
              hint: 'Error handling + retry/backoff + async.',
            },
            {
              kind: 'reveal',
              q: 'The app worked locally in Studio Pro but breaks after deploy. First checks?',
              answer:
                'Local uses your dev constants and a local DB. After deploy check environment constants and credentials, any consistency errors, that the DB synced for model changes, and outbound connectivity like certificates or IP whitelisting — guided by the production logs.',
            },
          ],
        },
      ],
    },

    /* ============================= UNIT 3 ============================= */
    {
      id: 'integration',
      title: 'Integration',
      icon: '🔌',
      blurb: 'REST, OData, SOAP and enterprise systems — the biggest interview theme.',
      lessons: [
        {
          id: 'consume-rest',
          title: 'Consuming REST',
          exercises: [
            {
              kind: 'reveal',
              q: 'How do you consume a REST API in Mendix?',
              answer:
                'Get the endpoint, sample JSON, method and auth. Create a JSON structure from a sample, build an Import Mapping (JSON → entities). In a microflow use Call REST: set URL (from a constant), method, auth headers, request body (export mapping), and response mapping (import mapping) to get Mendix objects. Handle status codes/errors. Test in Postman first.',
              hint: 'JSON structure → import mapping → Call REST.',
            },
            {
              kind: 'order',
              q: 'Order the steps to consume a REST API.',
              items: [
                'Get the endpoint, sample JSON, method and auth',
                'Create a JSON structure from the sample response',
                'Build an import mapping (JSON → Mendix entities)',
                'Add a Call REST activity: URL, method, auth headers, body',
                'Map the response through the import mapping',
                'Handle status codes and errors, then commit',
              ],
              why: 'You define the shape and mapping before wiring the Call REST activity and handling the response.',
            },
            {
              kind: 'choice',
              q: 'Which mapping turns incoming JSON into Mendix objects?',
              options: ['Export mapping', 'Import mapping', 'Message definition', 'Document template'],
              correct: 1,
              why: 'Import mapping = incoming JSON/XML → Mendix objects; export mapping is the reverse.',
            },
            {
              kind: 'reveal',
              q: 'Why test the call in Postman first?',
              answer:
                'To confirm the endpoint, auth and response shape work independently of Mendix, so you isolate whether a failure is your Mendix config or the API itself before wiring the Call REST activity.',
            },
            {
              kind: 'choice',
              q: 'Where should the REST endpoint URL come from?',
              options: [
                'Hardcoded in the microflow',
                'A Constant, set per environment',
                'The domain model',
                'A page parameter',
              ],
              correct: 1,
              why: 'Use a per-environment Constant so the URL differs between test/acc/prod without code changes.',
            },
          ],
        },
        {
          id: 'publish-rest',
          title: 'Publishing REST',
          exercises: [
            {
              kind: 'reveal',
              q: 'How do you PUBLISH a REST service from Mendix (expose your own API)?',
              answer:
                'App → Published services → Published REST service; add resources/operations (GET/POST/...), each backed by a microflow. Mendix can auto-generate an OpenAPI/Swagger doc. Secure with API keys / username-password / active session. The JSON shape comes from an export mapping built on a message definition.',
              hint: 'Operations backed by microflows + export mapping.',
            },
            {
              kind: 'order',
              q: 'Order the steps to expose GET /vendors/{code} as your own API.',
              items: [
                'Add a Published REST service to the module',
                'Add a GET operation with path template /vendors/{code}',
                'Back the operation with a microflow taking the path parameter',
                'Retrieve the object by code with XPath',
                'Return it via an export mapping (built from a JSON structure)',
                'Deploy — public URL is /rest/<service>/<version>/vendors/ABC',
              ],
              why: 'A published service holds operations; each operation calls a microflow that returns JSON via an export mapping.',
            },
            {
              kind: 'match',
              prompt: 'Match the integration term to its job.',
              pairs: [
                { term: 'Message definition', def: 'Defines the JSON/XML structure (the contract shape)' },
                { term: 'Export mapping', def: 'Mendix objects → JSON/XML (outbound)' },
                { term: 'Import mapping', def: 'Incoming JSON/XML → Mendix objects' },
                { term: 'Published REST service', def: 'Exposes operations, each backed by a microflow' },
              ],
            },
            {
              kind: 'choice',
              q: 'Publishing a GET operation, which mapping serialises the response JSON?',
              options: ['Import mapping', 'Export mapping', 'A nanoflow', 'The domain model'],
              correct: 1,
              why: 'Export mapping turns your Mendix objects into the response JSON.',
            },
            {
              kind: 'choice',
              q: 'A Published REST service can auto-generate what documentation for consumers?',
              options: ['A WSDL', 'An OpenAPI/Swagger doc', 'A domain-model diagram', 'Nothing'],
              correct: 1,
              why: 'Mendix auto-generates an OpenAPI/Swagger doc for a published REST service (a WSDL is for SOAP).',
            },
          ],
        },
        {
          id: 'odata-soap',
          title: 'OData & SOAP',
          exercises: [
            {
              kind: 'reveal',
              q: 'What is OData, and REST vs OData?',
              answer:
                'OData is a standardized, REST-based protocol that exposes data as a queryable service — clients filter/sort/select via URL options ($filter, $select, $orderby, $top, $expand) and a $metadata document describes the model. Plain REST is best for custom operations you design; OData is best for a queryable data feed (BI tools, system-to-system).',
              hint: 'A queryable standard on top of REST, with $metadata.',
            },
            {
              kind: 'choice',
              q: 'Which query option filters an OData feed?',
              options: ['$where', '$filter', '$query', '$find'],
              correct: 1,
              why: 'OData uses $filter (plus $select, $orderby, $top, $expand).',
            },
            {
              kind: 'reveal',
              q: 'How do you consume/publish a SOAP web service in Mendix?',
              answer:
                'Consume: import the WSDL (App → Consumed services → import WSDL); Mendix generates operations you call from a microflow, mapping XML via import/export mappings over XSD. Publish: create a Published web service exposing microflows as operations, and Mendix generates the WSDL for consumers.',
              hint: 'SOAP is contract-first XML via a WSDL.',
            },
            {
              kind: 'match',
              prompt: 'Match REST vs SOAP vs OData traits.',
              pairs: [
                { term: 'REST', def: 'Lightweight, JSON, HTTP verbs, custom endpoints' },
                { term: 'SOAP', def: 'XML, contract-first via a WSDL' },
                { term: 'OData', def: 'Queryable REST standard with $filter and $metadata' },
                { term: 'Message definition', def: 'The request/response contract shape' },
              ],
            },
            {
              kind: 'reveal',
              q: 'How do you publish or consume OData in Mendix?',
              answer:
                'Publish: create a Published OData service, pick entities to expose, apply security/constraints; Mendix generates the endpoint and $metadata. Consume: use the Consumed OData service / OData connector pointed at the external metadata URL, import entities, then retrieve with query options.',
            },
          ],
        },
        {
          id: 'enterprise',
          title: 'ERP, PLM & External SQL',
          exercises: [
            {
              kind: 'reveal',
              q: 'How does Mendix integrate with Teamcenter / a PLM system?',
              answer:
                'Teamcenter is Siemens PLM (parts, BOMs, change objects); Mendix sits on top as the low-code layer. Consume Teamcenter REST/OData (or SOAP SOA) from a microflow, map the response into Mendix entities with an import mapping, and build the workflow/UI on top. It is the same pattern as any external system, pointed at PLM master data.',
              hint: 'Consume its published services; it is standard REST/OData/SOAP.',
            },
            {
              kind: 'reveal',
              q: 'How would you integrate Mendix with an ERP like SAP?',
              answer:
                'Same integration pattern: call the system API — usually REST/OData or SOAP — via Call REST/SOAP or the OData connector, map request/response with import/export mappings, handle auth (API key/OAuth/Basic), and wrap in error handling. You connect through the enterprise system published services.',
              hint: 'ERP = Enterprise Resource Planning (SAP).',
            },
            {
              kind: 'choice',
              q: 'To query an external MS SQL or Snowflake database directly, you use...',
              options: [
                'XPath',
                'The Database Connector or a JDBC Java action (connection string + driver)',
                'OQL',
                'A nanoflow',
              ],
              correct: 1,
              why: 'External relational DBs are reached via the Database Connector or JDBC; XPath/OQL are for Mendix’s own DB.',
            },
            {
              kind: 'multi',
              q: 'True statements about querying data in Mendix? (select all)',
              options: [
                "XPath queries Mendix's own database and returns objects",
                'OQL queries Mendix data and returns read-only rows',
                'You write raw SQL against Mendix’s own database directly',
                'External SQL sources use the Database Connector / JDBC',
                'OData is a clean option when the source can expose a feed',
              ],
              correct: [0, 1, 3, 4],
              why: 'You do NOT write raw SQL against Mendix’s own DB — that is XPath/OQL territory.',
            },
            {
              kind: 'reveal',
              q: 'How would you get Mendix data into Power BI?',
              answer:
                'Expose the data as a Published OData service, then connect Power BI (or Tableau) to that OData URL as a data source. It keeps the feed live and governed. Alternatives are a read replica the BI tool queries directly, or Excel/CSV export.',
            },
          ],
        },
      ],
    },

    /* ============================= UNIT 4 ============================= */
    {
      id: 'security-data',
      title: 'Security & Data',
      icon: '🔐',
      blurb: 'Roles, XPath row-level security, and SQL/OQL for reporting.',
      lessons: [
        {
          id: 'roles',
          title: 'Roles & Access',
          exercises: [
            {
              kind: 'reveal',
              q: 'User role vs Module role?',
              answer:
                'User role is app-level — who the person is (Administrator, Member), assigned to users. Module role is per-module — what can be done inside that module (entity CRUD, page, microflow access). You map user roles to module roles, and the actual access rules live on the module roles.',
              hint: 'Identity vs permissions.',
            },
            {
              kind: 'choice',
              q: 'Where do the actual entity/page/microflow access rules live?',
              options: ['On the user role', 'On the module role', 'On the entity only', 'On the page only'],
              correct: 1,
              why: 'Access rules are configured on module roles; user roles map to them.',
            },
            {
              kind: 'match',
              prompt: 'Match role concept to description.',
              pairs: [
                { term: 'User role', def: 'App-wide identity of the person, assigned to users' },
                { term: 'Module role', def: 'Permission set inside one module' },
                { term: 'Mapping', def: 'User roles map to one or more module roles' },
                { term: 'Entity access', def: 'CRUD + XPath constraint on a module role' },
              ],
            },
            {
              kind: 'choice',
              q: 'Role-based data visibility on a page is best enforced with...',
              options: [
                'Only hiding widgets',
                'Module roles + XPath entity constraints + page/microflow access',
                'A nanoflow',
                'Client-side JavaScript only',
              ],
              correct: 1,
              why: 'Security combines module roles, XPath entity constraints, and page/microflow access.',
            },
            {
              kind: 'reveal',
              q: 'How do user roles and module roles connect?',
              answer:
                'You map user roles to module roles: a user role gets one or more module roles per module. All the actual access rules — entity CRUD, page access, microflow access — live on the module roles, not the user role.',
              hint: 'User role -> one or more module roles per module.',
            },
          ],
        },
        {
          id: 'xpath-security',
          title: 'XPath Row-Level Security',
          exercises: [
            {
              kind: 'reveal',
              q: 'How do you secure data per user with XPath?',
              answer:
                "Put an XPath constraint on the entity Read access, e.g. [System.owner = '[%CurrentUser%]'], so a role only sees its own rows. For multi-tenant, tie the record's company to the current user's company through associations. Mendix enforces entity access on every retrieve.",
              hint: 'Constraint on the access rule, using CurrentUser.',
            },
            {
              kind: 'choice',
              q: 'Which XPath keyword represents the logged-in user in a constraint?',
              options: ["'[%CurrentUser%]'", "'[%Session%]'", "'[%Owner%]'", "'[%User%]'"],
              correct: 0,
              why: "[%CurrentUser%] resolves to the current user in an access-rule XPath constraint.",
            },
            {
              kind: 'reveal',
              q: 'Multi-tenant: users must see only their own company records. How?',
              answer:
                "Associate the record to Company (and User to Company). On the module role entity access rule, add an XPath constraint tying the record company to the current user company, e.g. through [%CurrentUser%]/User_Company/Company. Set read/write per attribute and page/microflow access via roles.",
              hint: 'Constraint walks the association from CurrentUser.',
            },
            {
              kind: 'choice',
              q: 'An XPath constraint like [RiskScore > 70] is conceptually most like...',
              options: ['A SELECT ... WHERE', 'A GROUP BY', 'An INSERT', 'A JOIN'],
              correct: 0,
              why: 'An XPath constraint filters rows, like SQL WHERE.',
            },
            {
              kind: 'choice',
              q: 'When are entity access rules (and their XPath constraints) enforced?',
              options: [
                'Only when a page renders',
                'On every retrieve of the entity',
                'Only inside nanoflows',
                'Only at commit time',
              ],
              correct: 1,
              why: 'Mendix enforces entity access on every retrieve, which is why a missing constraint leaks rows.',
            },
          ],
        },
        {
          id: 'oql-sql',
          title: 'SQL & OQL for Reporting',
          exercises: [
            {
              kind: 'reveal',
              q: 'What is OQL and where have you used it?',
              answer:
                "OQL is Mendix's SQL-like language for querying the domain model directly, returning a read-only tabular result — mainly reporting and aggregations. XPath retrieves objects; OQL returns a dataset (joins across entities, GROUP BY, counts/sums), run via report Datasets (Reporting) or the OQL marketplace module. It is read-only.",
              hint: 'SQL thinking applied in Mendix, read-only.',
            },
            {
              kind: 'match',
              prompt: 'Match the SQL clause to its job.',
              pairs: [
                { term: 'WHERE', def: 'Filters individual rows' },
                { term: 'GROUP BY', def: 'Buckets rows for aggregation' },
                { term: 'HAVING', def: 'Filters groups after aggregation' },
                { term: 'INNER JOIN', def: 'Only matching rows from both tables' },
              ],
            },
            {
              kind: 'choice',
              q: 'In MS SQL (T-SQL), which limits the number of rows returned?',
              options: ['LIMIT 10', 'ROWNUM <= 10', 'SELECT TOP 10', 'FETCH 10'],
              correct: 2,
              why: 'T-SQL uses SELECT TOP 10 (not LIMIT, which is MySQL/Postgres).',
            },
            {
              kind: 'choice',
              q: 'Primary key vs foreign key?',
              options: [
                'Both uniquely identify a row',
                'Primary key uniquely identifies a row; foreign key points to another table’s PK',
                'Foreign key uniquely identifies a row; primary key points elsewhere',
                'They are the same thing',
              ],
              correct: 1,
              why: 'A PK is the unique id of a row; an FK references another table’s PK.',
            },
            {
              kind: 'reveal',
              q: 'Difference between INNER JOIN and LEFT JOIN?',
              answer:
                'INNER JOIN returns only rows that match in both tables. LEFT JOIN returns all rows from the left table plus matches from the right, with nulls where there is no match.',
            },
          ],
        },
      ],
    },

    /* ============================= UNIT 5 ============================= */
    {
      id: 'real-round',
      title: 'The Real Round',
      icon: '🎯',
      blurb: 'The exact questions and hands-on exercise from Om’s Three M rounds.',
      lessons: [
        {
          id: 'associations-ref',
          title: 'Association, Reference, Reference Set',
          exercises: [
            {
              kind: 'reveal',
              q: 'Difference between an association, a reference, and a reference set?',
              answer:
                'Association is the umbrella term for any relationship between two entities. A reference is single-valued — one object points to exactly one other (Order to Customer); retrieving gives one object. A reference set is multi-valued — one object points to many (Student to Courses); retrieving gives a list.',
              hint: 'One concept, two forms.',
            },
            {
              kind: 'choice',
              q: 'Retrieving over a reference gives you...',
              options: ['A list', 'Exactly one object', 'A dataset', 'Nothing'],
              correct: 1,
              why: 'A reference is single-valued — retrieving returns one object.',
            },
            {
              kind: 'choice',
              q: 'A many-to-many relationship is implemented from each side as a...',
              options: ['Reference', 'Reference set', 'Generalization', 'Non-persistable entity'],
              correct: 1,
              why: 'Many-to-many is a reference set (multi-valued) from each side.',
            },
            {
              kind: 'match',
              prompt: 'Match the term to what it gives you.',
              pairs: [
                { term: 'Association', def: 'The relationship line between two entities' },
                { term: 'Reference', def: 'Single-valued — one object' },
                { term: 'Reference set', def: 'Multi-valued — a list of objects' },
                { term: 'Multiplicity', def: '1-1, 1-many, or many-many' },
              ],
            },
            {
              kind: 'choice',
              q: 'Order -> Customer (each order has one customer) is which kind of association?',
              options: ['A reference set', 'A single-valued reference', 'A generalization', 'A many-to-many'],
              correct: 1,
              why: 'One order points to exactly one customer — a single-valued reference.',
            },
          ],
        },
        {
          id: 'auth-apis',
          title: 'Auth vs Non-Auth APIs, SSO & SSL',
          exercises: [
            {
              kind: 'reveal',
              q: 'In consumption, difference between authenticated and non-authenticated APIs, and what dev changes are needed?',
              answer:
                'Non-authenticated: just call the URL — set method, endpoint and response mapping. Authenticated: add credentials to Call REST — Basic auth username/password, or an Authorization/Bearer or x-api-key header for token/key auth, or OAuth 2.0 (fetch the token first, attach as Bearer, refresh on expiry). Store secrets as per-environment constants and handle 401/403.',
              hint: 'The dev change is mainly the auth header/credentials.',
            },
            {
              kind: 'choice',
              q: 'For an API-key or Bearer-token API, the dev change is to...',
              options: [
                'Nothing — it just works',
                'Add a custom HTTP header (Authorization: Bearer <token> or x-api-key)',
                'Import a WSDL',
                'Publish an OData service',
              ],
              correct: 1,
              why: 'Token/key auth is sent as a custom Authorization or x-api-key header.',
            },
            {
              kind: 'choice',
              q: 'OAuth 2.0 consumption needs one extra thing over a static token. What?',
              options: [
                'A nanoflow',
                'A microflow that calls the token endpoint first and handles refresh/expiry',
                'A published REST service',
                'A document template',
              ],
              correct: 1,
              why: 'OAuth needs a token call up front, then attach the access token and handle expiry/refresh.',
            },
            {
              kind: 'reveal',
              q: 'Have you worked on SSO / SSL? (the honest-answer question)',
              answer:
                'SSO is done with the SAML or OIDC module against an identity provider (Azure AD, Okta) — IdP metadata exchange plus user provisioning. SSL/TLS is the HTTPS transport layer; on Mendix Cloud the platform terminates incoming SSL, so it is mostly infra, not a dev task. It is fine to say a senior owned the IdP config while you did app-side roles/logic — never claim infra you did not own.',
              hint: 'Know what each is; be honest about what you owned.',
            },
            {
              kind: 'choice',
              q: 'Where should API secrets (keys, tokens) live?',
              options: [
                'Hardcoded in the microflow',
                'In constants, set per environment in the Cloud portal',
                'In the page',
                'In the domain model as attributes',
              ],
              correct: 1,
              why: 'Secrets belong in constants configured per environment, never hardcoded.',
            },
          ],
        },
        {
          id: 'vendor-verify',
          title: 'The Vendor Verification Exercise',
          exercises: [
            {
              kind: 'reveal',
              q: 'The hands-on task: expose + consume your OWN API and update status. What is the one trick being tested?',
              answer:
                'The app must call its own published API over real HTTP (a loopback call), NOT just call the microflow as a sub-microflow. They want to see genuine REST consumption — publish REST, then consume it over HTTP, then a decision ladder that sets status.',
              hint: 'Real HTTP call, not an internal sub-microflow.',
            },
            {
              kind: 'order',
              q: 'Order the Vendor status decision ladder (highest priority first).',
              items: [
                'Call failed / vendor not found -> VerificationFailed',
                'IsBlacklisted = true -> Rejected',
                "GSTStatus = 'Inactive' -> Rejected",
                'PANAvailable = false -> ManualReview',
                'BankVerified = false -> ManualReview',
                'ComplianceScore >= 80 -> Approved',
                'ComplianceScore >= 60 (60-79) -> ManualReview',
                'Otherwise (< 60) -> Rejected',
              ],
              why: 'Blacklist and inactive GST must override the score, so they are checked before the score bands.',
            },
            {
              kind: 'reveal',
              q: 'VEN004 has ComplianceScore 90 but IsBlacklisted = Yes. Why does order matter?',
              answer:
                'If you check score first, a score of 90 wrongly returns Approved. Checking blacklist before score correctly returns Rejected. Narrating "blacklist and GST override the score, so I evaluate them first" is exactly the reasoning they probe.',
              hint: 'Precedence: overrides before bands.',
            },
            {
              kind: 'choice',
              q: 'In the Verify microflow, if the Call REST fails, the status should be set to...',
              options: ['Approved', 'ManualReview', 'VerificationFailed', 'New'],
              correct: 2,
              why: 'A failed call / not found maps to VerificationFailed on the error path.',
            },
            {
              kind: 'reveal',
              q: 'How would you open the answer when handed a task like this?',
              answer:
                'Restate it: one published REST service returning compliance for a vendorCode, and the onboarding flow consumes that endpoint over HTTP (not the microflow directly), then sets status from the response. Then: build the domain model + sample data, expose the GET with an export mapping, and a Verify microflow doing Call REST with an import mapping and a decision ladder. Flag rule precedence out loud.',
              hint: 'Restate, structure, narrate — that reads as competent even rusty.',
            },
          ],
        },
        {
          id: 'java-js-deploy',
          title: 'Actions & Deployment (Round 1)',
          exercises: [
            {
              kind: 'reveal',
              q: 'Have you created or used Java and JavaScript actions? (answer with a concrete example)',
              answer:
                'Yes — Community Commons is essentially a library of Java actions (throwException, string/date helpers, deep-copy) I use a lot. For custom Java actions you add one, define parameters and return type in Studio Pro, it generates the stub in javasource where you write the logic, then call it from a microflow. JavaScript actions are the nanoflow/client-side equivalent returning a Promise — for browser things like geolocation.',
              hint: 'Lead with what you have genuinely done (Community Commons).',
            },
            {
              kind: 'reveal',
              q: 'What problems have you faced deploying on Mendix Cloud?',
              answer:
                'The most common: environment-specific configuration — constants like API URLs or keys right in acceptance but not carried to production, breaking an integration after deploy; fixed by per-environment constants. Also deploys blocked by consistency errors that had to be cleaned first, and scheduled events needing separate enabling per environment.',
              hint: 'Env config is the classic one.',
            },
            {
              kind: 'choice',
              q: 'How do you add a Java action in Studio Pro?',
              options: [
                'Add other -> Java action, then define parameters and return type',
                'Edit the .java file directly with no Studio Pro step',
                'Only via the Marketplace',
                'Inside a nanoflow',
              ],
              correct: 0,
              why: 'Add other -> Java action; Studio Pro generates the stub in javasource for your logic.',
            },
            {
              kind: 'choice',
              q: 'A JavaScript action is called from a... and returns a...',
              options: [
                'Microflow / Boolean',
                'Nanoflow / Promise',
                'Scheduled event / dataset',
                'Page / FileDocument',
              ],
              correct: 1,
              why: 'JavaScript actions run client-side in nanoflows and return a Promise.',
            },
            {
              kind: 'choice',
              q: "You've used Community Commons Java actions but never written a complex custom one. Best honest framing?",
              options: [
                'Claim you built complex custom Java actions from scratch',
                'Say you have used/worked with Java actions, be confident there, and be lighter on JavaScript actions without saying "never"',
                'Say you have never touched Java at all',
                'Refuse to answer the question',
              ],
              correct: 1,
              why: 'Lead with what is genuinely true (Community Commons Java actions), do not over-claim custom ones.',
            },
          ],
        },
      ],
    },

    /* ============================= UNIT 6 ============================= */
    {
      id: 'drills',
      title: 'Practical Drills',
      icon: '🛠️',
      blurb: 'The live-build muscle memory a hands-on round tests — publish/consume, list ops, expressions.',
      lessons: [
        {
          id: 'list-ops',
          title: 'Domain & List Operations',
          exercises: [
            {
              kind: 'reveal',
              q: 'Model: a Customer has many Orders; an Order has many Order Lines; each line is for one Product. How?',
              answer:
                'Customer 1-* Order (Order owns a reference to Customer). Order 1-* OrderLine. OrderLine *-1 Product. Set delete behavior: block deleting a Customer with Orders (or cascade per rules), and delete an Order deletes its OrderLines. Reference = one object; reference set = a list.',
              hint: 'Get multiplicity, owner, and delete behavior right.',
            },
            {
              kind: 'choice',
              q: 'You already hold a list in a variable and want only blacklisted vendors. Best move?',
              options: [
                'Retrieve again from the DB',
                'List operations -> Filter, keep $item/IsBlacklisted = true',
                'Loop and build a new list manually',
                'Use OQL',
              ],
              correct: 1,
              why: 'If you already have the list, use a List-operations Filter; XPath is for filtering at the DB on retrieve.',
            },
            {
              kind: 'choice',
              q: 'To count/sum a list you should use...',
              options: [
                'A loop with a manual counter',
                'The Aggregate list activity',
                'A nanoflow',
                'A before-commit handler',
              ],
              correct: 1,
              why: 'Aggregate list is one activity, no loop — only loop when you need to change each item.',
            },
            {
              kind: 'reveal',
              q: 'Mark every invoice past its due date as Overdue — the performant way?',
              answer:
                'Retrieve invoices with [DueDate < CurrentDateTime][Status != Paid], Loop the list, inside each Change object set Status = Overdue with Commit = No and Refresh = No, then after the loop do one Commit on the whole list. One DB round-trip, not thousands.',
              hint: 'Change in the loop, commit the list once after.',
            },
            {
              kind: 'choice',
              q: 'Filtering at the database on retrieve uses...',
              options: ['A List-operations Filter', 'An XPath constraint', 'An Aggregate', 'A nanoflow'],
              correct: 1,
              why: 'XPath constrains the retrieve at the DB, e.g. [IsBlacklisted = true()]; efficient for DB-sourced lists.',
            },
          ],
        },
        {
          id: 'expressions',
          title: 'Expressions & Validation',
          exercises: [
            {
              kind: 'choice',
              q: 'Which expression sets High/Medium/Low from a score (>=80 / 60-79 / else)?',
              options: [
                "if $Vendor/Score >= 80 then 'High' else if $Vendor/Score >= 60 then 'Medium' else 'Low'",
                "case $Vendor/Score when 80 then 'High'",
                "$Vendor/Score >= 80 ? 'High' : 'Low'",
                "switch($Vendor/Score)",
              ],
              correct: 0,
              why: 'Mendix expressions chain if...then...else; there is no ternary or switch/case syntax.',
            },
            {
              kind: 'choice',
              q: "Which builds 'HELLO, ' + the first name in capitals?",
              options: [
                "'HELLO, ' + upper($person/FirstName)",
                "'HELLO, ' + toUpperCase($person/FirstName)",
                "concat('HELLO, ', capitals($person/FirstName))",
                "'HELLO, ' + $person/FirstName.toUpper()",
              ],
              correct: 1,
              why: 'toUpperCase is the Mendix string function; strings concatenate with +.',
            },
            {
              kind: 'choice',
              q: 'How do you check an attribute is empty in an expression?',
              options: ['$Vendor/Name == null', '$Vendor/Name = empty', 'isEmpty($Vendor/Name)', '$Vendor/Name is null'],
              correct: 1,
              why: 'Mendix uses = empty for the empty check (and trim(...) = ’’ for blank text).',
            },
            {
              kind: 'reveal',
              q: "Don't allow saving a Vendor with an empty PAN or a negative score. How?",
              answer:
                'Simple rules via entity validation rules (required, range). Business logic via a before-commit event handler: if PAN is empty or Score < 0, add Validation feedback on the field and return false to block the commit. Before-commit must return false to stop the save.',
              hint: 'Field-level = validation rules; cross-field = before-commit returning false.',
            },
            {
              kind: 'match',
              prompt: 'Match the expression function to its use.',
              pairs: [
                { term: 'toUpperCase', def: 'Uppercase a string' },
                { term: 'trim', def: 'Strip surrounding whitespace' },
                { term: 'length', def: 'Count characters in a string' },
                { term: '= empty', def: 'Test whether a value is empty' },
              ],
            },
          ],
        },
        {
          id: 'rest-drills',
          title: 'REST Build Drills',
          exercises: [
            {
              kind: 'reveal',
              q: 'Expose GET /vendors/{code} that returns a vendor as JSON. Build?',
              answer:
                'Published REST service -> GET operation with path /vendors/{code} -> backing microflow retrieves the Vendor by code with XPath and returns it via an export mapping built from a JSON structure. The path parameter {code} is passed into the microflow. Public URL: /rest/<service>/<version>/vendors/ABC.',
              hint: 'Operation -> microflow -> export mapping serialises the JSON.',
            },
            {
              kind: 'reveal',
              q: 'Call an external API returning a list of products and store them. Build?',
              answer:
                'Make a JSON structure from a sample response -> an import mapping to a Product entity -> Call REST (GET) with the endpoint, map the response through the import mapping -> commit the created objects. Add an Authorization header if the API is authenticated. Handle a JSON array in the mapping.',
              hint: 'Consuming = Call REST + import mapping.',
            },
            {
              kind: 'choice',
              q: 'Publishing uses an ___ mapping; consuming uses an ___ mapping.',
              options: [
                'import / export',
                'export / import',
                'export / export',
                'import / import',
              ],
              correct: 1,
              why: 'Publish serialises objects to JSON (export); consume turns JSON into objects (import).',
            },
            {
              kind: 'choice',
              q: 'For a published GET operation, the path parameter {code} is...',
              options: [
                'Ignored',
                'Passed into the backing microflow',
                'Stored in the database automatically',
                'Only usable in nanoflows',
              ],
              correct: 1,
              why: 'The path parameter is passed into the operation’s microflow to retrieve the right object.',
            },
            {
              kind: 'choice',
              q: 'A consumed API returns a JSON array. The import mapping produces...',
              options: [
                'A single Mendix object',
                'A list of Mendix objects',
                'An export mapping',
                'A read-only OQL dataset',
              ],
              correct: 1,
              why: 'An import mapping over a JSON array yields a list of Mendix objects you then commit.',
            },
          ],
        },
        {
          id: 'pages-workflow',
          title: 'Pages, Workflow & Scheduled Jobs',
          exercises: [
            {
              kind: 'reveal',
              q: 'List vendors in a grid with an Approve button that sets the selected vendor to Approved. Build?',
              answer:
                'Data grid on Vendor -> a control-bar/row button -> On click: Call microflow, passing the selected Vendor -> microflow Change object Status = Approved, Commit -> client refreshes. The button passes the selected object into the microflow.',
              hint: 'Grid button -> microflow with the selected object.',
            },
            {
              kind: 'reveal',
              q: 'When do you build a Mendix Workflow instead of a microflow?',
              answer:
                'When the process is long-running and human-in-the-loop — approvals, onboarding, case/change management. A workflow models user tasks (assigned to roles), decisions and call-microflow steps, and persists state across days/weeks. A microflow is short synchronous logic; a workflow orchestrates people and steps over time. Workflow Commons gives the task-inbox UI.',
              hint: 'Long-running + human tasks + persisted state.',
            },
            {
              kind: 'choice',
              q: 'A scheduled event microflow...',
              options: [
                'Can show a page and a Show-message',
                'Runs with no user/page, in the system context, on a timer',
                'Requires a logged-in user',
                'Must return a Boolean',
              ],
              correct: 1,
              why: 'Scheduled events run headless, no UI, in the system context.',
            },
            {
              kind: 'reveal',
              q: 'If an external API call fails, log it and mark the record Failed without aborting the whole flow. How?',
              answer:
                'On the Call REST activity set error handling = Custom without rollback, then draw the error flow: Log message with $latestError, Change object Status = Failed, End. The happy path continues normally so one bad call does not abort everything.',
              hint: 'Custom error handling + $latestError on the error path.',
            },
            {
              kind: 'choice',
              q: 'You need a computed PDF summary you do NOT want stored. What entity type?',
              options: [
                'A persistable entity',
                'A non-persistable entity, then a document template + Generate document',
                'A generalization',
                'A reference set',
              ],
              correct: 1,
              why: 'A non-persistable entity holds the in-memory summary; a document template + Generate document makes the PDF.',
            },
          ],
        },
      ],
    },

    /* ============================= UNIT 7 ============================= */
    {
      id: 'behavioural',
      title: 'Behavioural & Logistics',
      icon: '💬',
      blurb: 'The STAR story, honest screeners, logistics, and extra JD topics.',
      lessons: [
        {
          id: 'project-story',
          title: 'The Project Story (STAR)',
          exercises: [
            {
              kind: 'reveal',
              q: 'What is a challenge you faced in your project and how did you overcome it?',
              answer:
                'STAR, ~90s, dwell on how you FOUND it. Strongest: a performance fix. On the GRC platform a listing page grew slow; the microflow was retrieving a large unfiltered list, looping to compute, committing inside the loop and pulling associations one by one. I added XPath constraints, replaced the manual count with an Aggregate, moved the commit outside the loop, and tightened association retrieves. It went from several seconds to near-instant, and I reused the pattern elsewhere.',
              hint: 'Symptom -> diagnosis (spend most here) -> measurable result.',
            },
            {
              kind: 'order',
              q: 'Order a strong STAR delivery.',
              items: [
                'Situation: the listing page grew slow as data grew',
                'Task: find and fix the bottleneck',
                'Action: XPath constraints, Aggregate instead of count, commit outside the loop',
                'Result: several seconds -> near-instant, pattern reused',
              ],
              why: 'STAR = Situation, Task, Action, Result — lead with the symptom, dwell on diagnosis, close on the measurable result.',
            },
            {
              kind: 'choice',
              q: 'Where should most of your STAR answer time go?',
              options: [
                'The tools you used',
                'How you found/diagnosed the problem',
                'Blaming the previous developer',
                'The company background',
              ],
              correct: 1,
              why: 'The diagnosis is what they score — spend the most time on how you found it.',
            },
            {
              kind: 'choice',
              q: 'Which STAR story holds up best under probing?',
              options: [
                'One you can genuinely defend, ideally backed by your resume',
                'The most impressive one, even if invented',
                'The hardest technical topic you can think of',
                "A teammate's story told as your own",
              ],
              correct: 0,
              why: 'Never invent a challenge you cannot defend — a true, resume-backed story survives follow-up questions.',
            },
            {
              kind: 'reveal',
              q: 'A second true STAR story to keep in reserve?',
              answer:
                'The acceptance-to-production API failure: environment-specific values (base URL / credentials) were not set as per-environment constants, so an integration broke after promotion. Fixed by moving them to per-environment constants and checking IP whitelisting. Also true and impressive.',
              hint: 'Same root cause as the deploy scenario — env config.',
            },
          ],
        },
        {
          id: 'mobile-honesty',
          title: 'Mobile & Honest Screeners',
          exercises: [
            {
              kind: 'reveal',
              q: 'Have you worked on a mobile app?',
              answer:
                'Honest: no Native, but yes responsive web. The GRC/TPRM apps were responsive web apps — the same Mendix app adapting across desktop, tablet and phone using Atlas responsive layouts, the phone/tablet page profiles and conditional visibility. I have handled the responsive multi-device side; I have not done the React Native / offline-native track yet, though I understand how it works.',
              hint: 'Answer the screener honestly, then pivot to a real strength.',
            },
            {
              kind: 'choice',
              q: 'What distinguishes a Mendix Native mobile app from responsive web?',
              options: [
                'Nothing — they are identical',
                'Native = React Native, offline-first with a local DB, device hardware, app stores',
                'Responsive web needs an app store',
                'Native cannot use nanoflows',
              ],
              correct: 1,
              why: 'Native is true React Native — offline, device features, app-store distribution; responsive web renders across screen sizes in a browser.',
            },
            {
              kind: 'choice',
              q: 'Which Mendix mobile option is now deprecated?',
              options: ['Native (React Native)', 'Responsive web / PWA', 'Hybrid / Cordova', 'Atlas layouts'],
              correct: 2,
              why: 'Hybrid/Cordova is the old, now-deprecated option; Native and responsive web are current.',
            },
            {
              kind: 'choice',
              q: 'Responsive web in Mendix (one app across devices) is achieved with...',
              options: [
                'Atlas responsive layouts + phone/tablet page profiles + conditional visibility',
                'React Native only',
                'A separate app-store build',
                'Cordova hybrid packaging',
              ],
              correct: 0,
              why: 'The same app adapts via Atlas responsive layouts, page profiles and conditional visibility.',
            },
            {
              kind: 'reveal',
              q: 'How do you turn a "no" screener (like no Native) into a strength?',
              answer:
                'Answer the direct factual screener honestly and minimally, then pivot to what you have done — real responsive multi-device work — and show awareness of the Native/offline model so the "no" reads as informed, not a gap.',
              hint: 'Honest + minimal, then pivot to a genuine strength.',
            },
          ],
        },
        {
          id: 'logistics',
          title: 'Logistics & Fit',
          exercises: [
            {
              kind: 'reveal',
              q: 'Why are you looking to leave / move?',
              answer:
                'Frame it as growth: wanting deeper enterprise and integration work and a broader full-cycle role — build, integrate, debug, document. Never mention pay or anything negative.',
              hint: 'Growth-forward, never negative.',
            },
            {
              kind: 'reveal',
              q: 'A safe answer for "what is your weakness"?',
              answer:
                'Something real but harmless with a fix: "I sometimes over-polish a microflow; I have learned to balance clean design with delivery timelines." Show self-awareness plus the correction.',
              hint: 'A genuine one you have already corrected.',
            },
            {
              kind: 'choice',
              q: 'How do you deploy a Mendix app / work in a team?',
              options: [
                'Copy files over FTP',
                'Team Server (Git) -> build -> Mendix Cloud test/acc/prod, Scrum sprints with code reviews',
                'Only local builds',
                'Deploy straight to production from Studio Pro',
              ],
              correct: 1,
              why: 'Team Server version control, deploy across test/acceptance/production on Mendix Cloud, Agile/Scrum with reviews.',
            },
            {
              kind: 'reveal',
              q: 'How do you approach requirement analysis?',
              answer:
                'Clarify the actual business need with the analyst/stakeholder, break it into what data (domain model), what logic (microflows) and what screens (pages), confirm edge cases, then build incrementally and demo early to avoid rework.',
              hint: 'Clarify -> data/logic/pages -> edge cases -> build + demo.',
            },
            {
              kind: 'reveal',
              q: 'How do you handle notice period / expected CTC style questions?',
              answer:
                'Keep it factual and flexible: state your notice honestly (e.g. around 15 days, early release negotiable) and give expected CTC as a flexible range. Answer direct factual screeners honestly and minimally, without volunteering anything negative.',
              hint: 'Honest, factual, flexible — no negatives.',
            },
          ],
        },
        {
          id: 'extras',
          title: 'Extra JD Topics',
          exercises: [
            {
              kind: 'reveal',
              q: 'What GenAI capability does Mendix have?',
              answer:
                'Maia is the AI assistant inside Studio Pro that helps build microflows/models. GenAI connectors (OpenAI, Azure OpenAI, Amazon Bedrock) plus GenAI Commons and a Conversational UI module let you call an LLM from a microflow for chat, summarization or RAG over a vector/knowledge base. ML Kit runs ONNX models for in-app inference.',
              hint: 'Maia (build-time) + GenAI connectors (runtime) + ML Kit.',
            },
            {
              kind: 'choice',
              q: 'What is Atlas UI?',
              options: [
                "Mendix's design system — layouts, page templates, building blocks, responsive grid",
                'A REST connector',
                'A database engine',
                'A deployment pipeline',
              ],
              correct: 0,
              why: 'Atlas UI is the design system/theme framework; mobile-first, tuned with design properties and SASS.',
            },
            {
              kind: 'choice',
              q: 'When a standard widget cannot do the job, you build a...',
              options: [
                'Legacy custom widget (still recommended)',
                'Pluggable widget — a React component with an XML config, packaged as an .mpk',
                'Java action',
                'Scheduled event',
              ],
              correct: 1,
              why: 'Pluggable widgets (React + XML properties) replaced the deprecated custom-widget API.',
            },
            {
              kind: 'choice',
              q: 'Maia in Mendix is...',
              options: [
                'A REST connector',
                'The AI assistant inside Studio Pro that helps build microflows and models',
                'A mobile framework',
                'A database engine',
              ],
              correct: 1,
              why: 'Maia is the in-Studio AI assistant; GenAI connectors are the separate runtime LLM integration.',
            },
            {
              kind: 'reveal',
              q: 'PwC-style: Mendix vs other low-code platforms?',
              answer:
                'All enterprise low-code. Mendix is model-driven and visual-first with strong collaborative modeling (Studio Pro + Team Server) and Siemens/industrial backing — strong for complex standalone enterprise apps and integration. Power Platform is best inside the Microsoft ecosystem, Appian is process/BPM-first, OutSystems is the closest peer. Depth is in Mendix; the concepts transfer.',
              hint: 'Position Mendix, do not overclaim hands-on rivals.',
            },
          ],
        },
      ],
    },
  ],
}
