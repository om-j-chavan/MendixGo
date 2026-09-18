import type { Course } from './courses'

/**
 * Cortex Build — a guided-build track for Cortex, a spaced-repetition study
 * SaaS built in Mendix (+ a FastAPI SM-2 scheduler). Faithful to the Cortex
 * guided-build course (Modules 0-7). Exercises test both the concept and the
 * actual build-step recall.
 */
export const cortexCourse: Course = {
  id: 'cortex',
  title: 'Cortex Build',
  subtitle: 'Build your Cortex project',
  icon: '🧠',
  color: '#ce82ff',
  blurb: 'Build Cortex, a multi-tenant spaced-repetition study SaaS, in Mendix plus a FastAPI scheduler, one lesson at a time.',
  units: [
    {
      id: 'foundations',
      title: 'Foundations & Tenancy',
      icon: '🏗️',
      blurb: 'A clean, version-controlled app with the right structure, roles, config, and the multi-tenant pattern decided.',
      lessons: [
        {
          id: 'app-security-vc',
          title: 'App, security & version control',
          exercises: [
            {
              kind: 'choice',
              q: 'You start Cortex with Production security instead of Prototype. What does that change?',
              options: [
                'Nothing until you deploy to production',
                'Access is deny-by-default; you grant it explicitly per role',
                'It disables self-registration automatically',
                'It encrypts every attribute at rest',
              ],
              correct: 1,
              why: 'Production security is deny-by-default: unconfigured pages and entities are blocked until you grant access per module role. That forces you to think about access from day one.',
            },
            {
              kind: 'reveal',
              q: 'In an interview: "How do you work in a team in Mendix?" Give the version-control answer.',
              answer: 'Team Server is Git-based version control. I commit small snapshots often, do isolated work on a branch (e.g. one branch per module), and merge back to main at each definition-of-done. History gives a safety net and traceability.',
              hint: 'Commit / branch / merge, and why branching keeps main stable.',
            },
            {
              kind: 'choice',
              q: 'Why start Cortex from a Blank App rather than a template?',
              options: [
                'Templates cannot use Production security',
                'It forces you to build every piece yourself, so you learn each one',
                'Blank apps deploy faster to Mendix Cloud',
                'Templates do not support Team Server',
              ],
              correct: 1,
              why: 'Blank (not template) means you build every piece by hand — the point of a guided-build course. There is nothing pre-wired to hide the mechanics.',
            },
          ],
        },
        {
          id: 'modules-roles',
          title: 'Modules & roles',
          exercises: [
            {
              kind: 'reveal',
              q: 'You are about to make Decks depend on Study, but Study already uses Decks. What do you do?',
              answer: 'Do not create the cycle. Move the shared entity into Core (or Config) and have both feature modules depend on Core. Dependencies should flow one way, down toward Core/Config, never in a loop.',
              hint: 'Cycles are the smell; Core is the sink.',
            },
            {
              kind: 'choice',
              q: 'Cortex keeps shared entities (Member, Card, CardSchedule, ReviewLog, Tag) in which module?',
              options: ['Study', 'Notes', 'Core', 'Integration'],
              correct: 2,
              why: 'Shared entities live in Core so feature modules can depend down onto them without depending on each other. Feature-specific entities stay in their own module.',
            },
            {
              kind: 'choice',
              q: 'What is the difference between a user role and a module role?',
              options: [
                'User roles are for admins; module roles are for everyone else',
                'A user role is app-level identity; a module role is per-module permissions, and user roles map to module roles',
                'They are two names for the same thing',
                'Module roles are only used in the Administration module',
              ],
              correct: 1,
              why: 'User roles (Member, Moderator, Administrator) are app-level identity. Each maps to module roles that carry the actual per-module permissions. An unmapped role cannot act in that module.',
            },
          ],
        },
        {
          id: 'accounts-constants-marketplace',
          title: 'Accounts, constants & marketplace',
          exercises: [
            {
              kind: 'choice',
              q: 'In Cortex, Member specialises Administration.Account. Why does that matter for tenancy?',
              options: [
                'It lets Members bypass security',
                'So a Member is a user: [%CurrentUser%] matches owner associations and login is reused',
                'It makes Member non-persistable',
                'It removes the need for module roles',
              ],
              correct: 1,
              why: 'Because Member specialises Account, a logged-in Member IS the current user, so [%CurrentUser%] lines up with the _Owner associations that point at Member — the whole tenancy scheme relies on this.',
            },
            {
              kind: 'choice',
              q: 'Why store LlmApiKey and SchedulerBackendUrl as App Constants instead of hard-coding them?',
              options: [
                'Constants run faster than literals',
                'They can be set per environment and keep secrets out of the model',
                'Microflows cannot read literals',
                'It is the only way to reference a URL',
              ],
              correct: 1,
              why: 'A Constant is a named config value settable per environment, so test/acc/prod differ and no secret is baked into the committed model. Hard-coding is the classic junior mistake.',
            },
            {
              kind: 'reveal',
              q: 'Before installing a Marketplace module, what should you always do, and why?',
              answer: 'Read its README first: it tells you the configuration, dependencies, supported version, and whether it overlaps with something you already have. Prefer current supported modules over deprecated ones (e.g. Deep Link needs an after-startup microflow to register links).',
              hint: 'Config, dependencies, version, overlap.',
            },
          ],
        },
        {
          id: 'tenant-xpath',
          title: 'The multi-tenant XPath rule ⭐',
          exercises: [
            {
              kind: 'reveal',
              q: 'Interview keystone: "How do you isolate tenants in Mendix?"',
              answer: 'Many users share one database; each sees only their own rows. Every owned entity has an _Owner association to Member, and I put an XPath on the entity’s Read access on the module role: [<Module>.<Entity>_Owner = \'[%CurrentUser%]\']. On create I set _Owner to the current Member, or the row belongs to nobody.',
              hint: 'XPath on Read access + set _Owner on create.',
            },
            {
              kind: 'choice',
              q: 'Which Cortex entity is deliberately NOT owner-scoped, and why?',
              options: [
                'CardSchedule — it is personal state',
                'PublishedDeck — it is public by design for the marketplace',
                'ReviewLog — logs are shared',
                'Member — it is the owner itself',
              ],
              correct: 1,
              why: 'PublishedDeck is shared/public, secured by state and role rather than owner. Owner-scoping it would break the deck marketplace where anyone can browse published decks.',
            },
            {
              kind: 'choice',
              q: 'You put the tenant XPath on the entity. Does that automatically secure a published REST/OData service over that entity?',
              options: [
                'Yes, entity access always applies everywhere',
                'No — you must re-apply the access logic in the service microflow / OData filter',
                'Only if security is set to Production',
                'Only for OData, not REST',
              ],
              correct: 1,
              why: 'Split the two cases. For REST-over-microflow the backing microflow defaults to Apply entity access = OFF, so the tenant XPath is NOT applied and you must re-add the filter server-side. For published OData, a published service DOES apply the consuming user’s entity access automatically, so an authenticated Member is already scoped — the leak only appears when a shared/BI service account (without the owner constraint) consumes the feed.',
            },
          ],
        },
      ],
    },
    {
      id: 'domain-css',
      title: 'Domain Model, Notes & CSS',
      icon: '🗂️',
      blurb: 'Build and secure the full model, a working Note editor, and both CSS styles. Tenancy becomes real — proven with a 2nd user.',
      lessons: [
        {
          id: 'enums-entities',
          title: 'Enums & core entities',
          exercises: [
            {
              kind: 'choice',
              q: 'Why model CardState and Rating as enumerations rather than free-text status strings?',
              options: [
                'Enums are stored more efficiently than strings',
                'They constrain values to a fixed safe set and can drive UI (captions/colors) and logic',
                'Free text cannot be committed in Production security',
                'Enums are required for associations',
              ],
              correct: 1,
              why: 'An enumeration is a fixed set of named values, so attributes can only hold valid states. Captions and colors also feed badge styling, and your XPath/expressions reference the exact values.',
            },
            {
              kind: 'reveal',
              q: 'Why does Cortex split shareable content (Card) from personal study state (CardSchedule)?',
              answer: 'Card holds the shareable Front/Back content; CardSchedule holds one member’s personal SR state (interval, ease, due date, state). The split lets a deck be cloned/shared cleanly while each member keeps independent progress, and it keeps the tenant XPath simple.',
              hint: 'Shareable content vs personal state (ADR-1).',
            },
            {
              kind: 'choice',
              q: 'Which CardSchedule attribute should be indexed, and why?',
              options: [
                'Ease — it is read most often',
                'DueDate — the daily queue retrieves by due date (NFR-4)',
                'State — it is an enumeration',
                'No attribute needs an index',
              ],
              correct: 1,
              why: 'DueDate is indexed because the daily queue builder retrieves cards due today; an index keeps that lookup fast at scale.',
            },
          ],
        },
        {
          id: 'associations-validation',
          title: 'Associations & validation',
          exercises: [
            {
              kind: 'reveal',
              q: 'Why do BOTH Card and CardSchedule carry their own _Owner association?',
              answer: 'It is a deliberate denormalisation so the tenant XPath is simple and fast on each entity directly — [Core.Card_Owner = \'[%CurrentUser%]\'] and [Core.Schedule_Owner = \'[%CurrentUser%]\'] — instead of having to traverse the association to check ownership on every retrieve.',
              hint: 'Denormalised owner for a cheap, direct XPath (SSOT §8.4).',
            },
            {
              kind: 'choice',
              q: 'A Note *-* Note self-association powers the [[note links]] feature. What does the "owner side" of an association decide?',
              options: [
                'Which entity is allowed to be deleted',
                'Which entity carries the reference, which affects XPath and mappings',
                'Which user can read the data',
                'The multiplicity of the association',
              ],
              correct: 1,
              why: 'The owner side determines which entity "carries" the association reference, which affects how you write XPath and mappings. Choosing the wrong owner side breaks retrieves.',
            },
            {
              kind: 'choice',
              q: 'Deck.Name must be unique per owner. Can the built-in unique validation rule enforce that alone?',
              options: [
                'Yes, unique validation handles per-owner uniqueness',
                'No — "unique per owner" needs a retrieve-and-check microflow (or a scoped rule), not the plain unique rule',
                'Yes, but only in Production security',
                'No, uniqueness is impossible in Mendix',
              ],
              correct: 1,
              why: 'The built-in unique rule is global across the entity. "Unique per owner" needs a retrieve of that owner’s decks and a check, since two different owners may legitimately reuse a name.',
            },
          ],
        },
        {
          id: 'commit-events',
          title: 'Commit events',
          exercises: [
            {
              kind: 'choice',
              q: 'ContentHash for card dedup should be computed in which event?',
              options: [
                'After-commit on Card',
                'Before-commit on Card — derive/normalise the value just before the write',
                'On a scheduled event',
                'In the page microflow only',
              ],
              correct: 1,
              why: 'A before-commit event runs just before the object is written — perfect for deriving or normalising a value like ContentHash so it is always present and correct.',
            },
            {
              kind: 'reveal',
              q: 'Why create a Card’s CardSchedule in an after-commit event rather than before-commit?',
              answer: 'The Card must already exist and be committed before you can create a CardSchedule that associates to it. After-commit runs just after the write, so the Card is available to point the Schedule_Card association at.',
              hint: 'The card has to exist first to associate to it.',
            },
            {
              kind: 'choice',
              q: 'What is the classic gotcha when writing a before-commit event?',
              options: [
                'It cannot read the object being committed',
                'Re-committing the same object inside it can cause an infinite loop',
                'It only runs in nanoflows',
                'It blocks all other users',
              ],
              correct: 1,
              why: 'If a before-commit microflow commits the same object again, it re-triggers itself — an infinite loop. Derive values in place and let the original commit proceed.',
            },
          ],
        },
        {
          id: 'tenancy-pages-css',
          title: 'Tenancy applied, pages & CSS',
          exercises: [
            {
              kind: 'reveal',
              q: 'You created a new owned object but its creator cannot even see it. What went wrong?',
              answer: 'You forgot to set _Owner on create. The tenant Read XPath filters by owner, so a row with no owner is invisible to everyone — including the person who made it. Set _Owner to the current Member in the create/save microflow.',
              hint: 'No owner set = the XPath hides it from everyone.',
            },
            {
              kind: 'order',
              q: 'Order the steps to make a card badge color follow its CardState with a conditional class.',
              items: [
                'Add global SCSS classes in theme/web (.badge-new, .badge-review, etc.)',
                'Select the badge widget on the card',
                'Open the widget’s Class field and switch it to an expression',
                'Write a conditional expression off ENUM_CardState returning the class name',
                'Rebuild styles and verify the color follows the card’s state',
              ],
              why: 'Global SCSS defines reusable classes; a conditional class expression on the widget makes the applied class follow the data (the CardState enum).',
            },
            {
              kind: 'choice',
              q: 'When do you reach for inline/appearance styling instead of a global SCSS class?',
              options: [
                'Always — inline is faster',
                'For a genuine one-off tweak on a single widget; use global classes for anything reused',
                'Only in the Administration module',
                'Never — inline styling is not allowed',
              ],
              correct: 1,
              why: 'Inline styling suits one-off tweaks (e.g. the flip-card animation on just the study page). Anything reused should be a global class so it stays consistent and maintainable.',
            },
            {
              kind: 'choice',
              q: 'To restyle a Marketplace widget safely, you should target...',
              options: [
                'Its internal classes directly for precision',
                'Your own wrapper class around it, since internal classes can change on upgrade',
                'The theme’s root element with !important',
                'The widget’s XML file',
              ],
              correct: 1,
              why: 'Marketplace widgets’ internal classes are implementation detail that can change on upgrade. Wrap the widget and override via your own wrapper class to stay upgrade-safe.',
            },
          ],
        },
      ],
    },
    {
      id: 'study-ai-errors',
      title: 'Study Loop, AI & Errors',
      icon: '🤖',
      blurb: 'A working review loop (stubbed scheduler), AI card generation that fails gracefully, and the reusable error plumbing.',
      lessons: [
        {
          id: 'review-loop',
          title: 'The review loop (stubbed)',
          exercises: [
            {
              kind: 'reveal',
              q: 'Why build the study loop with a stubbed scheduler before the real SM-2 backend exists?',
              answer: 'Incremental delivery: get the whole loop working end-to-end (show front, reveal back, rate, advance, write a ReviewLog) with a trivial placeholder rule first. Then you swap the stub for the real scheduler once the loop is proven, instead of debugging both at once.',
              hint: 'Prove the loop first; swap in the hard part later.',
            },
            {
              kind: 'order',
              q: 'Order the review flow a member goes through on the study page.',
              items: [
                'Show the card’s Front',
                'Member taps "Show answer" to reveal the Back',
                'Member picks a rating (Again / Hard / Good / Easy)',
                'Apply the scheduling rule and write a ReviewLog',
                'Load the next card in the queue',
              ],
              why: 'Front → reveal Back → rate → schedule + log → next card is the core review loop, whether the scheduler is a stub or the real SM-2 service.',
            },
          ],
        },
        {
          id: 'llm-drafts',
          title: 'Consume the LLM & drafts',
          exercises: [
            {
              kind: 'choice',
              q: 'You Call REST to the LLM and get JSON back. What turns that JSON into Mendix objects?',
              options: [
                'An export mapping',
                'An import mapping built from a JSON structure',
                'A microflow expression',
                'The Deep Link module',
              ],
              correct: 1,
              why: 'An import mapping (built from a JSON structure you paste in as a sample) maps the JSON reply into Mendix objects — here the non-persistable GenDraftCard drafts.',
            },
            {
              kind: 'reveal',
              q: 'Why stage AI results as non-persistable GenDraftCard objects rather than committing Cards straight away?',
              answer: 'You never trust generated content blindly. Non-persistable drafts let the user review, edit, and accept before anything hits the database; only accepted, non-duplicate drafts are then committed as real Cards.',
              hint: 'Nothing reaches the DB until the user accepts.',
            },
            {
              kind: 'choice',
              q: 'How does Cortex avoid creating duplicate cards from AI generation?',
              options: [
                'It trusts the LLM not to repeat itself',
                'SUB_Card_DedupByHash skips drafts whose ContentHash already exists',
                'It deletes and recreates the whole deck each time',
                'Unique validation on Front only',
              ],
              correct: 1,
              why: 'Each card has a ContentHash; the dedup sub-microflow skips any draft whose hash already exists before committing, so accepting drafts never creates duplicates.',
            },
          ],
        },
        {
          id: 'error-modes-logging',
          title: 'Error-handling modes & logging',
          exercises: [
            {
              kind: 'match',
              prompt: 'Match each microflow error-handling mode to what it does.',
              pairs: [
                { term: 'Rollback', def: 'Undo everything and re-raise — nothing was changed' },
                { term: 'Custom with rollback', def: 'Undo the work, then run your own error flow' },
                { term: 'Custom without rollback', def: 'Keep committed work, then run your own error flow' },
                { term: 'Continue', def: 'Ignore the error and carry on (use sparingly)' },
              ],
            },
            {
              kind: 'choice',
              q: 'The LLM times out mid-generation. You want to keep the user’s note, warn, and queue a retry. Which mode?',
              options: [
                'Rollback',
                'Continue',
                'Custom without rollback',
                'Custom with rollback',
              ],
              correct: 2,
              why: 'Custom without rollback keeps the already-committed work (the note) and runs your error flow — log a warning, enqueue a retry, show a friendly message — so the app stays usable.',
            },
            {
              kind: 'reveal',
              q: 'Why build one SUB_LogError sub-microflow instead of logging inside every handler?',
              answer: 'No copy-pasted error handling (NFR-10) and consistent logs (NFR-5). SUB_LogError takes the caught error and a context string, reads $latestError for the details, and writes one Log message at the right level. Every error handler just calls it.',
              hint: '$latestError + a context string, at the right log level.',
            },
          ],
        },
        {
          id: 'exceptions-retry',
          title: 'Exceptions & retry queue',
          exercises: [
            {
              kind: 'choice',
              q: 'A Free user exceeds the daily new-card limit. Why throw a custom exception (Community Commons throwException) rather than return a boolean?',
              options: [
                'Booleans cannot be returned from microflows',
                'It cleanly separates the failure path — you catch it upstream to show an upgrade prompt instead of threading a flag through every caller',
                'Exceptions are faster',
                'It is the only way to stop a commit',
              ],
              correct: 1,
              why: 'A custom exception gives clean control flow: the rule violation is raised where it is detected and caught upstream to react (show the upgrade prompt), without passing a status flag through every intermediate microflow.',
            },
            {
              kind: 'reveal',
              q: 'How does the RetryQueue pattern make transient failures self-heal, and what stops it looping forever?',
              answer: 'On failure you write a RetryQueue row (kind, payload, attempts=0, next-attempt, state=Pending). A scheduled event later drains the queue with backoff. What stops an infinite loop is MaxAttempts: once a row exceeds it, it goes to a dead-letter state instead of retrying again.',
              hint: 'Enqueue with payload; scheduled processor with backoff; MaxAttempts → dead-letter.',
            },
            {
              kind: 'choice',
              q: 'What is the easy mistake to make when enqueuing a RetryQueue row?',
              options: [
                'Storing too much data',
                'Not storing enough payload to actually perform the retry later',
                'Setting Attempts to 0',
                'Using an enumeration for the kind',
              ],
              correct: 1,
              why: 'The retry processor runs later with no page context, so the row must carry everything needed to redo the operation. Too little payload and the retry cannot run.',
            },
          ],
        },
      ],
    },
    {
      id: 'sm2-backend',
      title: 'SM-2 Scheduler Backend',
      icon: '🧮',
      blurb: 'A real SM-2 service in FastAPI that Cortex calls on every rating, with a local fallback when it is down.',
      lessons: [
        {
          id: 'fastapi-sm2',
          title: 'FastAPI & SM-2',
          exercises: [
            {
              kind: 'choice',
              q: 'You scaffolded the FastAPI app. What serves the API locally so you can hit /docs?',
              options: ['pip', 'uvicorn', 'Docker Compose', 'Mendix Studio Pro'],
              correct: 1,
              why: 'uvicorn is the ASGI server that runs the FastAPI app (uvicorn main:app --reload); the interactive docs are then at /docs.',
            },
            {
              kind: 'choice',
              q: 'Under SM-2, what happens to a card’s repetitions and interval when the user rates it Again (a lapse)?',
              options: [
                'Repetitions increment; interval doubles',
                'Repetitions reset to 0 and it relearns from a short interval',
                'Nothing changes until the third lapse',
                'Ease increases to make it easier',
              ],
              correct: 1,
              why: 'A failing rating resets repetitions to 0 and sends the card back to relearning with a short interval. Successful ratings grow the interval (roughly 1 → 6 → 15 days on Good).',
            },
            {
              kind: 'choice',
              q: 'SM-2 has an ease floor. What is the classic implementation gotcha around it?',
              options: [
                'Letting ease rise without limit',
                'Letting ease fall below the 1.3 floor (and integer-rounding intervals wrong)',
                'Storing ease as a string',
                'Never updating ease at all',
              ],
              correct: 1,
              why: 'Ease must not drop below 1.3, or intervals collapse. Interval rounding also has to be handled consistently. These are the details you must get exactly right.',
            },
          ],
        },
        {
          id: 'forecast-wire',
          title: 'Forecast & wiring Mendix',
          exercises: [
            {
              kind: 'reveal',
              q: 'What does POST /forecast return, and why compute it in the backend rather than Mendix?',
              answer: 'Given all of a member’s schedules it buckets due-dates into the next 30 days and returns a series like [{day, dueCount}] for the dashboard forecast. Doing it in the backend keeps the date math cheaper and cleaner and reuses the same service. Watch timezone/day-boundary bugs.',
              hint: '30-day due-count series; watch day boundaries.',
            },
            {
              kind: 'choice',
              q: 'When Mendix calls your own /schedule endpoint, what maps the JSON reply back into Mendix?',
              options: [
                'An export mapping',
                'An import mapping (with JSON structures for ScheduleRequest/ScheduleResponse)',
                'A conditional class expression',
                'A scheduled event',
              ],
              correct: 1,
              why: 'The Call REST activity sends the request built from an export mapping; the response is turned back into Mendix objects by an import mapping. Watch date-format mismatches between Mendix and Python.',
            },
          ],
        },
        {
          id: 'persist-fallback',
          title: 'Persist & local fallback',
          exercises: [
            {
              kind: 'choice',
              q: 'On a real rating (scheduler wired in), which two rows change?',
              options: [
                'Card and Deck',
                'CardSchedule is updated and a new ReviewLog is created',
                'Member and Subscription',
                'Only CardSchedule',
              ],
              correct: 1,
              why: 'The rating calls the scheduler, writes the returned SM-2 state (interval, ease, due date, state, LastReviewedDate) onto CardSchedule, and creates a ReviewLog row recording the review.',
            },
            {
              kind: 'reveal',
              q: 'How do you keep members studying when the scheduler backend is down, and how do you prove it works?',
              answer: 'Put Custom without rollback on the Call REST: on failure run SUB_Scheduler_LocalFallback — apply a safe local interval, set ScheduledLocally=true, and enqueue a retry — so the rating still completes. Prove it by killing the backend mid-study: rating still works and a Pending retry is queued.',
              hint: 'Custom without rollback → safe local interval + flag + retry; test by stopping the backend.',
            },
            {
              kind: 'order',
              q: 'Order the resilient rate-card flow when the scheduler may be unavailable.',
              items: [
                'Member rates the card',
                'Call REST to /schedule (with custom error handling)',
                'On failure: apply a safe local interval and set ScheduledLocally=true',
                'Enqueue a RetryQueue row so it re-syncs later',
                'Update CardSchedule, write ReviewLog, advance to the next card',
              ],
              why: 'The rating must never be blocked by an outage: try the backend, fall back locally on failure, queue a retry, and always finish by persisting and moving on.',
            },
          ],
        },
      ],
    },
    {
      id: 'code-complex-logic',
      title: 'Java, JS & Complex Logic',
      icon: '⚙️',
      blurb: 'Reach beyond low-code — Deep Link, Java and JavaScript actions, Excel/PDF — then the hardest logic, workflow, and jobs.',
      lessons: [
        {
          id: 'deeplink-java',
          title: 'Deep Link & Java actions',
          exercises: [
            {
              kind: 'choice',
              q: 'The Deep Link module maps a URL path to a microflow. Where do you register the links?',
              options: [
                'In each page’s onload event',
                'In an after-startup microflow',
                'In a scheduled event',
                'In the domain model',
              ],
              correct: 1,
              why: 'Deep links are registered once in an after-startup microflow so the path-to-microflow mappings exist as soon as the app runs.',
            },
            {
              kind: 'reveal',
              q: 'A share link opens a deck via deck/{token} instead of deck/{id}. Why a token, not the raw id?',
              answer: 'A token does not leak or let anyone guess internal object ids. Using the raw id exposes your sequential identifiers and invites people to enumerate other objects — a token is the security-minded choice (ADR-6).',
              hint: 'Do not leak or allow-guess internal ids.',
            },
            {
              kind: 'choice',
              q: 'A Java action appears in a microflow as an activity. Where does its code live?',
              options: ['theme/web', 'javasource', 'userlib only', 'the .mpr file'],
              correct: 1,
              why: 'Java action code lives in javasource; the action surfaces as a normal microflow activity with typed inputs and output. Third-party JARs go in userlib (carefully, so they do not break the cloud build).',
            },
            {
              kind: 'choice',
              q: 'JA_ImportDeckFile parses an uploaded CSV into cards. A parse error occurs. Which error mode should ACT_Deck_ImportFile use?',
              options: [
                'Continue — import what parsed',
                'Rollback — a bad file changes nothing',
                'Custom without rollback — keep the half-imported cards',
                'No error handling needed',
              ],
              correct: 1,
              why: 'A file import is all-or-nothing: on a parse error you Rollback so the database is unchanged, rather than leaving a partial, inconsistent import.',
            },
          ],
        },
        {
          id: 'js-excel-email',
          title: 'JS actions, Excel & email',
          exercises: [
            {
              kind: 'reveal',
              q: 'In Cortex, flipping a card is a nanoflow but rating it is a microflow. Why the split?',
              answer: 'A nanoflow runs client-side and is instant — perfect for the flip, which just reveals the back with no server work. Rating hits the database and the scheduler service, which is server-side work, so it belongs in a microflow. JavaScript actions (returning a Promise) run inside nanoflows.',
              hint: 'Flip is instant client-side; rating touches DB + scheduler.',
            },
            {
              kind: 'choice',
              q: 'Where does a JavaScript action run, and what does it return?',
              options: [
                'Server-side, returning a Mendix object',
                'Client-side, returning a Promise',
                'In the database, returning a row count',
                'On the scheduler, returning JSON',
              ],
              correct: 1,
              why: 'A JavaScript action runs client-side and returns a Promise; you call it from a nanoflow (e.g. JS_BindReviewKeys for keyboard rating, JS_SpeakText for text-to-speech). Do not do DB work in a JS action.',
            },
            {
              kind: 'choice',
              q: 'Which Marketplace module sends the reminder emails Cortex needs in Module 5?',
              options: ['Excel Exporter', 'Email Connector', 'Community Commons', 'Charts'],
              correct: 1,
              why: 'The Email Connector sends SMTP mail. Excel Exporter produces the xlsx deck export. SMTP config differs per environment, so configure it per env.',
            },
          ],
        },
        {
          id: 'queue-analytics-lifecycle',
          title: 'Queue, analytics & lifecycle',
          exercises: [
            {
              kind: 'reveal',
              q: 'The daily queue builder is the whiteboard question. What is "sibling burying"?',
              answer: 'Don’t show two cards from the same note on the same day. When assembling today’s queue you merge due + new(capped) + lapsed cards, order them, and bury siblings so only one card per note appears that day — into an ordered list of non-persistable StudyQueueItem.',
              hint: 'One card per note per day.',
            },
            {
              kind: 'choice',
              q: 'In Cortex, what is "true retention"?',
              options: [
                'The percentage of members who return each day',
                'The percentage of reviews rated Good or better (reviews ≥ Good ÷ total)',
                'The number of cards in the deck',
                'The streak length',
              ],
              correct: 1,
              why: 'True retention = reviews rated at least Good, divided by total reviews. Streak is consecutive study days; the forecast comes from the /forecast endpoint.',
            },
            {
              kind: 'choice',
              q: 'Card lifecycle enforcement follows a state machine. What triggers Review → Relearning?',
              options: [
                'A rating of Good',
                'A rating of Again (a lapse)',
                'The card being suspended',
                'The nightly recompute job',
              ],
              correct: 1,
              why: 'A lapse — rating a Review card Again — sends it to Relearning. Guarding transitions to the allowed state-machine moves stops invalid jumps like New skipping Learning.',
            },
          ],
        },
        {
          id: 'workflow-clone-jobs',
          title: 'Workflow, clone & jobs',
          exercises: [
            {
              kind: 'reveal',
              q: 'When would you use a Mendix Workflow instead of a microflow? Use the deck moderation feature to explain.',
              answer: 'A Workflow models a long-running, human-in-the-loop process. Deck moderation publishes a deck, then a Moderator user task approves or rejects it — that pause for a human is what a microflow can’t do. A microflow is for instant, synchronous logic; a workflow spans time and people.',
              hint: 'Workflow = long-running + human tasks; microflow = instant logic.',
            },
            {
              kind: 'choice',
              q: 'On approve/reject, Cortex must move Deck.Visibility and PublishedDeck.ApprovalState together. What breaks if you move Visibility alone?',
              options: [
                'Nothing — they are independent',
                'The two states drift out of sync, so a deck can look public while unapproved (or vice-versa)',
                'The workflow cannot start',
                'The clone count resets',
              ],
              correct: 1,
              why: 'The two fields represent one decision. Moving them together keeps the public-visibility and approval states consistent; moving one alone leaves the marketplace showing the wrong thing.',
            },
            {
              kind: 'choice',
              q: 'Cloning a public deck creates fresh CardSchedules for the cloner. Why fresh rather than copied?',
              options: [
                'To save database space',
                'So the cloner’s study progress is independent of the original owner’s',
                'Because schedules cannot be copied in Mendix',
                'To reset the deck’s CloneCount',
              ],
              correct: 1,
              why: 'Fresh schedules give the cloner their own SR progress starting from New, independent of the original. The clone runs in one transaction (Custom with rollback) so a mid-clone failure leaves nothing behind.',
            },
            {
              kind: 'match',
              prompt: 'Match each of Cortex’s five scheduled events to its job.',
              pairs: [
                { term: 'SE_NightlyRecompute', def: 'Rebuild analytics rollups overnight' },
                { term: 'SE_SendReminders', def: 'Email members their due cards (with a deep link)' },
                { term: 'SE_RetryProcessor', def: 'Drain the RetryQueue with backoff and dead-letter' },
                { term: 'SE_StreakReset', def: 'Reset streaks for members who missed a day' },
                { term: 'SE_FreeTierReset', def: 'Reset the daily new-card allowance for Free users' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'odata-deploy-drills',
      title: 'OData, Deploy & Interview Drills',
      icon: '🚀',
      blurb: 'Expose data to BI, ship to production, then drill the live-round build tasks — publishing and consuming a REST API.',
      lessons: [
        {
          id: 'odata-publish-consume',
          title: 'OData publish & consume',
          exercises: [
            {
              kind: 'reveal',
              q: 'When do you publish an OData service rather than a REST service, and what is the classic tenant trap?',
              answer: 'Publish OData when you need a queryable, read-only data feed for BI tools (Excel/Power BI) that support $filter/$select/$expand. REST is better for discrete operations. The trap: a published OData service applies the consuming user’s entity access, so an authenticated Member is scoped by the tenant XPath automatically — but BI tools usually connect through a shared service account with no owner constraint, so that account sees every tenant’s data unless you scope the feed. (REST-over-microflow is different: microflows default to Apply entity access = OFF, so there you must re-apply the tenant filter yourself.)',
              hint: 'OData applies entity access for real users; the trap is the shared BI service account.',
            },
            {
              kind: 'choice',
              q: 'Consuming an external OData feed for featured decks, what does $select do?',
              options: [
                'Filters which rows come back',
                'Limits which fields are returned, avoiding over-fetching',
                'Expands related entities',
                'Sorts the results',
              ],
              correct: 1,
              why: '$select limits the returned fields so you do not over-fetch. $filter narrows the rows; $expand pulls in related entities.',
            },
          ],
        },
        {
          id: 'deploy-ops',
          title: 'Deploy & ops',
          exercises: [
            {
              kind: 'order',
              q: 'Order the Mendix Cloud promotion pipeline for Cortex.',
              items: [
                'Deploy the build to the test environment',
                'Promote to the acceptance environment and verify',
                'Promote to the production environment',
              ],
              why: 'Test → acceptance → production is safe promotion: you build and verify on lower environments before production. Skipping acceptance removes your last check before real users.',
            },
            {
              kind: 'choice',
              q: 'Where should LlmApiKey and SchedulerBackendUrl live in production, and what points prod at the wrong place?',
              options: [
                'Committed defaults in the model; nothing can go wrong',
                'Per-environment Constants set on prod; the gotcha is prod still pointing at your local backend',
                'A shared config file for all environments',
                'Hard-coded in the microflow',
              ],
              correct: 1,
              why: 'Secrets and URLs are per-environment Constants, never in the committed model. The common mistake is leaving prod’s SchedulerBackendUrl pointed at a local/dev backend.',
            },
            {
              kind: 'reveal',
              q: 'You deployed the FastAPI backend. What secures it, and why guard scheduled events per environment?',
              answer: 'Lock the backend down with an API key and a restricted CORS policy (not open CORS / an unauthenticated endpoint). Guard scheduled events to the right environment via a Constant so, for example, test doesn’t email real users or double-run jobs — and turn debug logging off in prod.',
              hint: 'API key + CORS lock for the backend; env-guard the jobs.',
            },
          ],
        },
        {
          id: 'publish-consume-rest',
          title: 'Publish & consume a REST API ⭐',
          exercises: [
            {
              kind: 'order',
              q: 'Order the steps to publish GET /decks/{deckCode} as a REST service from Cortex.',
              items: [
                'Add a Published REST service DeckAPI (version v1, path /decks)',
                'Add a GET operation with path /decks/{deckCode}',
                'Create backing microflow PUB_GetDeck(deckCode)',
                'Retrieve the Deck by [Code = $deckCode]; if empty, return 404',
                'Build a non-persistable DeckDTO (name, public fields, card count via Aggregate)',
                'Return the response via an export mapping built from a JSON structure',
              ],
              why: 'A published REST service holds operations; each is backed by a microflow that produces the JSON body via an export mapping. The path param {deckCode} is passed into the microflow.',
            },
            {
              kind: 'choice',
              q: 'When you publish a REST operation, where does the JSON response shape come from?',
              options: [
                'You hand-write the JSON string in the microflow',
                'From an export mapping built off a JSON structure',
                'From the entity’s domain model automatically',
                'From an import mapping',
              ],
              correct: 1,
              why: 'The response shape comes from an export mapping (built from a JSON structure), not hand-written JSON. Export = out of Mendix; import = into Mendix.',
            },
            {
              kind: 'reveal',
              q: 'Interview instruction: "Consume the API — don’t call the microflow internally." What does that mean and why?',
              answer: 'Call your own endpoint over HTTP: Call REST (GET) to $BaseUrl + /rest/DeckAPI/v1/decks/<code>, then import-map the response and branch on it. Do NOT invoke PUB_GetDeck as a sub-microflow. Going over HTTP is what "consume the API" means — it proves a real integration and decouples the caller from the implementation.',
              hint: 'Real HTTP loopback via Call REST, not a sub-microflow call.',
            },
            {
              kind: 'choice',
              q: 'Why is PublishedDeck the safe entity to expose from the public REST endpoint?',
              options: [
                'It is non-persistable',
                'It is already non-owner-scoped (public by design), so exposing it does not leak a tenant’s private data',
                'REST can only expose Core entities',
                'It has no associations',
              ],
              correct: 1,
              why: 'PublishedDeck is intentionally not owner-scoped (the marketplace). Exposing owner-scoped data unfiltered would leak tenants; remember a REST backing microflow defaults to Apply entity access = OFF, so the entity XPath does not auto-apply — re-apply access in the microflow.',
            },
          ],
        },
        {
          id: 'practical-drills',
          title: 'Practical drills: lists, expressions, loops, buttons',
          exercises: [
            {
              kind: 'choice',
              q: 'To get the count of cards due today, what is the clean approach?',
              options: [
                'Loop the list with a manual counter',
                'Retrieve by [DueDate <= \'[%CurrentDateTime%]\'] then Aggregate → Count',
                'Export to Excel and count rows',
                'Call the backend',
              ],
              correct: 1,
              why: 'Aggregate → Count is one activity. Looping with a manual counter to compute a count or sum is the anti-pattern the drill trains you out of.',
            },
            {
              kind: 'reveal',
              q: 'Rapid expressions drill — write an empty-safe note title (fall back to "Untitled").',
              answer: 'if trim($Note/Title) = \'\' then \'Untitled\' else $Note/Title. Watch the details: use toString() when concatenating numbers into text, and know the difference between = empty (no value) and = \'\' (empty string).',
              hint: 'trim(...) = \'\' then a default.',
            },
            {
              kind: 'order',
              q: 'Order a bulk update: "suspend every card not reviewed in 90 days" — committing once.',
              items: [
                'Retrieve cards where [LastReviewed < \'[%CurrentDateTime%]\' minus 90 days]',
                'Loop over the retrieved list',
                'Change object: State = Suspended, with Commit = No',
                'After the loop, Commit the whole list once',
              ],
              why: 'Change objects inside the loop with Commit = No, then commit the list once after — one database round-trip instead of thousands. Committing inside the loop is the performance mistake.',
            },
            {
              kind: 'reveal',
              q: 'How would you build a "Reset progress" button on a deck grid row?',
              answer: 'Add a row/control-bar button to the Deck data grid, set On click → Call microflow, passing the selected Deck. The microflow loops the deck’s cards, sets DueDate = today, commits the list once, and the client refreshes the grid after commit.',
              hint: 'Grid button → Call microflow with the selected object → loop, commit-once, refresh.',
            },
          ],
        },
      ],
    },
  ],
}
