# Data model and taxonomy

The root represents Omarchy. Components are grouped by type, manufacturer, and model. A report records one observation about one device and component, including Omarchy/kernel version, build stage, outcome, optional build specs, and at least one public source URL. The graph also links each report to its device and source. Incomplete component information is grouped under “Unspecified manufacturer” or “Unspecified model,” not guessed.

Device and component labels are currently free text. Case differences are grouped, but spelling variants are not automatically merged. Each report represents a particular build snapshot, not a universal compatibility finding. Hardware identities, aliases, and machine-readable component IDs can be normalized as the catalog grows.

Approved reports are held in D1. The website's export is capped at 500 reports, and the interactive graph displays at most 80 filtered reports; the interface identifies the graph limit. The JSON export contains approved records only, without account IDs, proposals, or work claims. GitHub is a source-code repository plus starter catalog; it is not a live database replica.

Build stages include Unknown, Researching, Boot blocked, Live boot, Installed, In use, Blocked, and Ready. They are contributor observations, not proof of an officially supported device. The review queue is a human moderation step, not an independent test of every claim.
