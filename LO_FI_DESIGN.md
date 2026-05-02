# IKNwild - Detailed Lo-Fi UI Design

This design is optimized for low-connectivity, fast decision-making (10s for Rangers), and quick reporting (5m for Workers).

---

## 1. Global Navigation & Branding
- **Logo:** IKNwild Shield
- **Theme:** High-contrast (Forest Green #2D5A27, Alert Orange #E67E22, Clean White)
- **Floating Action Button (Public):** [ WhatsApp Center ] - Fixed bottom right.

---

## 2. Shared Authentication
**Route:** `/login`
```text
+------------------------------------------+
|            [ IKNwild Logo ]              |
|        Protecting IKN Wildlife           |
+------------------------------------------+
|                                          |
|  Enter Your Special Access Code          |
|  [_________________________]             |
|                                          |
|  [       SIGN IN AS STAFF       ]        |
|                                          |
|  *Session stays active for 24 hours      |
|                                          |
|  ------------------------------------    |
|  [ Continue to Public Portal ]           |
|                                          |
+------------------------------------------+
```

---

## 3. Construction Worker Persona (Rian Pratama)
**Goal:** Submit report in < 5 mins.

### A. Dashboard (`/worker`)
```text
+------------------------------------------+
| [Menu]     Worker Dashboard     [Profile]|
+------------------------------------------+
|                                          |
|  [ !! REPORT WILDLIFE SIGHTING !! ]      |
|  (Large Orange Button - Accessible)      |
|                                          |
|  MY RECENT REPORTS                       |
|  +------------------------------------+  |
|  | Sun Bear | Sector A4 | [PENDING]   |  |
|  +------------------------------------+  |
|  | Python   | Barracks  | [RESOLVED]  |  |
|  +------------------------------------+  |
|                                          |
|  [ View All History ]                    |
+------------------------------------------+
```

### B. Report Form (`/worker/report`)
```text
+------------------------------------------+
| [Back]        New Report Form            |
+------------------------------------------+
|  1. Reporter: [ Rian Pratama ]           |
|  2. What did you see?                    |
|     [ Dropdown: Bear, Snake, Monkey... ] |
|  3. Add Photo (Optional)                 |
|     [ [ CAMERA ICON - CLICK TO SNAP ] ]  |
|  4. Describe details:                    |
|     [ ............................... ]  |
|  5. Pinpoint Location:                   |
|     [ [ GOOGLE MAPS PREVIEW ] ]          |
|     *Current location pinned automatically|
|  6. Address: [ Automatically Fetched ]   |
|                                          |
|  [        SUBMIT TO RANGER        ]      |
+------------------------------------------+
```

---

## 4. Forest Ranger Persona (Heru Wibowo)
**Goal:** Decision in < 10 seconds.

### A. Dashboard & Alerts (`/ranger`)
```text
+------------------------------------------+
| [Menu]     Ranger Command Center [Heru]  |
+------------------------------------------+
|  INCOMING ALERTS (Real-time)             |
|  +------------------------------------+  |
|  | [!] NEW: BEAR - SECTOR A4          |  |
|  | [ Map Preview ] [ OPEN FULL DATA ] |  |
|  +------------------------------------+  |
|                                          |
|  ONGOING TASKS                           |
|  - [ In Progress ] Python removal        |
|                                          |
+------------------------------------------+
```

### B. Full Report & Map Detail (`/ranger/report/[id]`)
```text
+------------------------------------------+
| [Back]      Incident #123456             |
+------------------------------------------+
|  UPDATE STATUS: [ PENDING / IN-PROG / OK ]|
|                                          |
|  [ IMAGE: SUN BEAR PHOTO - EXPANDABLE ]  |
|                                          |
|  REPORT DATA:                            |
|  - Time: 14:30 WITA                      |
|  - Animal: Sun Bear                      |
|  - Reporter: Rian Pratama                |
|  - Desc: Near excavator fuel storage     |
|                                          |
|  MAP PINPOINT (High Accuracy):           |
|  +------------------------------------+  |
|  |             [ MAP ]                |  |
|  |      ( ! ) <--- 5m Radius Circle   |  |
|  +------------------------------------+  |
|                                          |
|  [ UPDATE TAG ] [ START NAVIGATION ]     |
+------------------------------------------+
```

---

## 5. Public Educational Portal
**Route:** `/` (Home)

### A. Education & Infographics
```text
+------------------------------------------+
| [Logo]        IKNwild Education          |
+------------------------------------------+
|  [ Map ] [ Stats ] [ DOs & DONTS ]       |
|                                          |
|  WILDLIFE SAFETY 101:                    |
|  +------------------------------------+  |
|  |  [IMG] Snake Encounter             |  |
|  |  - Stay calm, back away slowly     |  |
|  |  - Call Rangers immediately        |  |
|  +------------------------------------+  |
|                                          |
|  [ BUTTON: OPEN WHATSAPP CALL CENTER ]   |
+------------------------------------------+
```

### B. Interactive Map (Public)
```text
+------------------------------------------+
|  WILDLIFE DISTRIBUTION MAP               |
+------------------------------------------+
|  [ [ INTERACTIVE MAP LAYERS ] ]          |
|  - Regional Population Counts            |
|  - Protection Status (Color Coded)       |
|  - Conflict History Heatmap              |
|                                          |
|  LEGEND:                                 |
|  (Red) High Activity  (Green) Low        |
+------------------------------------------+
```
