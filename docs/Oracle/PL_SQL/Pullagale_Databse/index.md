
### 1) What is a PDB, in one accurate sentence?
A **Pluggable Database (PDB)** is a logically isolated database (its own users, schemas, objects, and data) that runs **inside** a **Container Database (CDB)** and shares the same Oracle instance (memory + background processes).

### 2) What is a CDB, and what lives inside it?
A **Container Database (CDB)** is the “host” database that contains:
- **CDB$ROOT**: the root container holding Oracle’s shared metadata and common components.
- **PDB$SEED**: a read-only template used to create new PDBs quickly.
- **User PDBs**: your actual application databases (e.g., `SALES_PDB`, `HR_PDB`).

### 3) The mental model that never fails (apartment model)
- **CDB** = building (shared elevator/electricity/security)
- **PDB** = apartment (separate rooms/keys/people)
This explains “shared engine, isolated data”.

---


### 4) How do you know which container you are currently in?
```sql
SHOW CON_NAME;
```

### 5) How do you list all containers (root + all PDBs) and their open mode?

```sql
SHOW PDBS;

SELECT con_id, name, open_mode
FROM   v$pdbs
ORDER  BY con_id;
```

### 6) How do you switch between containers (within the same session)?

This is the most important command for day-to-day admin / troubleshooting:

```sql
ALTER SESSION SET CONTAINER = <pdb_name>;

ALTER SESSION SET CONTAINER = SALES_PDB;
SHOW CON_NAME;

Switch back to root:

ALTER SESSION SET CONTAINER = CDB$ROOT;
```

### 7) Connect directly to a PDB using a service name (common in apps)

Most apps connect using a service that points to a PDB.
```sql
sqlplus app_user/app_pwd@//dbhost:1521/SALES_PDB
If using TNS alias (from tnsnames.ora):

bash
Copy code
sqlplus app_user/app_pwd@SALES_PDB_ALIAS
```
### 8) Connect to CDB root as SYSDBA (admin work)

```sql
sqlplus / as sysdba
Then:

SHOW CON_NAME;
SHOW PDBS;
```

### 9) Create a PDB (typical pattern)
```sql 
CREATE PLUGGABLE DATABASE sales_pdb
  ADMIN USER sales_admin IDENTIFIED BY "StrongPasswordHere"
  FILE_NAME_CONVERT = ('/u01/app/oracle/oradata/CDB1/pdbseed/',
                       '/u01/app/oracle/oradata/CDB1/sales_pdb/');
Open it:

sql

ALTER PLUGGABLE DATABASE sales_pdb OPEN;
Make it auto-open after restart:

sql
ALTER PLUGGABLE DATABASE sales_pdb SAVE STATE;

Close it:

sql
ALTER PLUGGABLE DATABASE sales_pdb CLOSE IMMEDIATE;
Interview note: SAVE STATE is frequently asked; it controls whether PDBs reopen automatically after CDB restart.

```

### 10) What’s the difference between common user and local user?

**Common user** exists across all containers (created in root; name often begins with C## depending on settings).

**Local user exists** only inside one PDB (created while connected to that PDB).

```sql
Create local user (inside a PDB):

    ALTER SESSION SET CONTAINER = sales_pdb;

    CREATE USER app_user IDENTIFIED BY "AppPwd";
    GRANT CREATE SESSION, CREATE TABLE TO app_user;


    Create common user (in root):

    ALTER SESSION SET CONTAINER = CDB$ROOT;

    CREATE USER c##ops IDENTIFIED BY "OpsPwd" CONTAINER=ALL;
    GRANT CREATE SESSION TO c##ops CONTAINER=ALL;
Interview note: Most application users should be local (per-PDB isolation). Common users are usually for admin/ops automation.

```



### 11) What is isolated per PDB?

Each PDB has its own:

Schemas, tables, indexes, packages, views, synonyms

Local users/roles and privileges

Tablespaces/datafiles (logically and usually physically)

Data dictionary entries scoped to that PDB

### 12) What is shared across all PDBs in a CDB?

Shared at the CDB instance level:

SGA/PGA allocation (instance-level memory pool; resource governance can partition usage)

Background processes

Control files and redo logs (redo is CDB-wide; Oracle tracks container ID)

Some metadata in root that supports all containers

Why PDBs exist (the “so what” interview angle)

#### 13) What business problems do PDBs solve?

**Consolidation:** host many databases under one engine

**Operational simplicity:** patch/upgrade mostly once (depending on level)

**Tenant isolation:** strong separation compared to schemas

**Portability:** unplug/plug and clone flows

**Faster provisioning:** clone from seed/template

### 14) What does “unplug/plug” mean?

It means exporting the PDB’s metadata into an XML manifest and then attaching (plugging) it into another CDB.

```sql
Unplug:


code start
ALTER PLUGGABLE DATABASE sales_pdb CLOSE IMMEDIATE;

ALTER PLUGGABLE DATABASE sales_pdb
  UNPLUG INTO '/tmp/sales_pdb.xml';
  code end


**Drop while keeping datafiles (optional pattern):**

**DROP PLUGGABLE DATABASE sales_pdb KEEP DATAFILES;**


Plug into another CDB:

code start
CREATE PLUGGABLE DATABASE sales_pdb
  USING '/tmp/sales_pdb.xml'
  COPY
  FILE_NAME_CONVERT = ('/oldpath/sales_pdb/', '/newpath/sales_pdb/');
code end

Open:

code start
ALTER PLUGGABLE DATABASE sales_pdb OPEN;
code end

Interview note: They may ask COPY vs NOCOPY:

COPY copies datafiles to new location

NOCOPY uses existing files (fast but careful with paths/storage)

```

### 15) Clone a PDB (common test environment task)

```sql
code start
CREATE PLUGGABLE DATABASE sales_pdb_test
  FROM sales_pdb
  FILE_NAME_CONVERT = ('/oradata/sales_pdb/', '/oradata/sales_pdb_test/');
  code end
Open:

sql
code start

ALTER PLUGGABLE DATABASE sales_pdb_test OPEN;
code end
Interview note: Cloning is a big reason teams adopt multitenant—fast test copies and consistent environments.
```
### 16) Why can one PDB impact another if they are “isolated”?

Isolation is logical, but resources are shared. If one PDB runs heavy queries, it can consume:

CPU

I/O bandwidth

Memory

Shared pools / caches

### 17) How do you prevent a “noisy neighbor”?

Oracle Resource Manager can set PDB-level limits (CPU shares, I/O, sessions). Interviewers often want you to mention:

“Use Resource Manager directives to cap/allocate resources per PDB.”

(Exact RM syntax varies by design; the key is you know it exists and why it matters.)

### 18) Can you back up and restore a single PDB?

Yes. Oracle supports PDB-level backups/restores (commonly via RMAN) so you can recover one tenant without restoring everything.

Interview angle: This is one major reason PDBs are stronger than “schema per customer.”

### 19) Do PL/SQL packages behave differently in a PDB?

The package code is created and compiled inside a specific PDB (unless installed commonly). In most real systems:

Each PDB has its own application schema

Same package name exists in each PDB, compiled separately

Execution is scoped to that PDB’s data

### 20) What should you be careful about for PL/SQL in multitenant?

Hardcoded references to objects in root vs PDB

Using common users unintentionally

Privileges: grants may need to be issued per PDB

Maintenance: deploying to many PDBs requires repeatable scripts/pipelines

### 21) Can a PDB have a different character set than its CDB?

Typically no in common setups; PDBs are expected to align with CDB character set rules. (Interviewers want the safe answer: “Generally must match / be compatible with the CDB.”)

### 22) What happens if the CDB instance goes down?

All PDBs in that CDB go down because they depend on the same instance.

### 23) Is a PDB the same as a schema?

No:

Schema = logical owner within one database

PDB = an entire isolated database hosted under a container

### 24) How do you know if you are accidentally running in root?

Always check:
```sql

SHOW CON_NAME;
```

This is a real-world troubleshooting habit.

### 25) “We have 40 customers. Should we use 40 schemas or 40 PDBs?”

Answer approach:

Choose PDB per customer if you need:

Strong isolation

Separate backup/restore

Independent lifecycle (clone/move/patch windows)

Choose schema per customer if:

Data is small, isolation is light

You want simplest operational setup

Backup/restore is at full DB level anyway

### 26) “A single tenant is slowing down others. What do you do?”

Say:

Identify heavy workload in that PDB (top SQL/AWR scoped to PDB if available)

Apply Resource Manager limits (CPU shares / sessions / I/O)

Validate indexing, stats, and execution plans inside that PDB

### 27) “How do you deploy the same PL/SQL package to 30 PDBs safely?”

Say:

Use automated scripts/pipeline:

Connect to each PDB service

Run the same versioned DDL scripts

Record deployment results per PDB

Keep schemas consistent and avoid root-only assumptions

**Quick Command Checklist (Interview-ready)**
```sql
-- Check current container
SHOW CON_NAME;

-- List all PDBs and open modes
SHOW PDBS;

-- Switch container within a session
ALTER SESSION SET CONTAINER = pdb_name;
ALTER SESSION SET CONTAINER = SALES_PDB;

-- Switch back to root
ALTER SESSION SET CONTAINER = CDB$ROOT;

-- Create a PDB
CREATE PLUGGABLE DATABASE pdb_name
ADMIN USER admin IDENTIFIED BY pwd;

-- Open/Close PDB
ALTER PLUGGABLE DATABASE SALES_PDB OPEN;
ALTER PLUGGABLE DATABASE SALES_PDB CLOSE IMMEDIATE;

-- Auto-open after restart
ALTER PLUGGABLE DATABASE SALES_PDB SAVE STATE;

-- Drop a PDB
DROP PLUGGABLE DATABASE pdb_name INCLUDING DATAFILES;

-- Clone a PDB
CREATE PLUGGABLE DATABASE pdb_clone FROM pdb_name;

-- Unplug a PDB
ALTER PLUGGABLE DATABASE pdb_name UNPLUG INTO 'pdb.xml';

-- Plug a PDB
CREATE PLUGGABLE DATABASE pdb_name USING 'pdb.xml';
-- Create local user inside a PDB
ALTER SESSION SET CONTAINER = SALES_PDB;
CREATE USER app_user IDENTIFIED BY "pwd";
GRANT CREATE SESSION TO app_user;

-- Check if database is CDB
SELECT CDB FROM V$DATABASE;


Returns YES if it is a CDB.

-- View container details
SELECT CON_ID, NAME, OPEN_MODE FROM V$PDBS;

-- Open all PDBs
ALTER PLUGGABLE DATABASE ALL OPEN;

-- Close all PDBs
ALTER PLUGGABLE DATABASE ALL CLOSE IMMEDIATE;

-- Save state of all PDBs (auto-open on restart)
ALTER PLUGGABLE DATABASE ALL SAVE STATE;

-- Check common users
SELECT USERNAME FROM CDB_USERS WHERE COMMON = 'YES';

-- Check PDB services
SELECT NAME, PDB FROM DBA_SERVICES;

-- Enable restricted session (CDB level)
ALTER SYSTEM ENABLE RESTRICTED SESSION;

-- Shutdown and Startup CDB
SHUTDOWN IMMEDIATE;
STARTUP;

-- View CDB datafiles
SELECT * FROM CDB_DATA_FILES;

-- Check if PDB is in restricted mode
SELECT RESTRICTED FROM V$PDBS WHERE NAME = 'PDB_NAME';

-- Open PDB if not open
ALTER PLUGGABLE DATABASE pdb_name OPEN;

-- Open PDB in restricted mode (for maintenance)
ALTER PLUGGABLE DATABASE pdb_name OPEN RESTRICTED;

-- Check invalid objects in a PDB
SELECT OBJECT_NAME, OBJECT_TYPE
FROM   USER_OBJECTS
WHERE  STATUS = 'INVALID';

-- Recompile invalid objects
EXEC UTL_RECOMP.RECOMP_SERIAL();

-- Check tablespace usage in PDB
SELECT TABLESPACE_NAME, USED_SPACE, TABLESPACE_SIZE
FROM   DBA_TABLESPACE_USAGE_METRICS;

-- Check session activity in PDB
SELECT SID, SERIAL#, USERNAME, STATUS
FROM   V$SESSION;

-- Check PDB-level errors
SELECT * FROM V$DIAG_ALERT_EXT
WHERE  CONTAINER_NAME = 'PDB_NAME';

-- Check resource limits per PDB
SELECT * FROM DBA_CDB_RSRC_PLAN_DIRECTIVES;

-- Kill problematic session in PDB
ALTER SYSTEM KILL SESSION 'sid,serial#' IMMEDIATE;

-- Check services mapped to PDB
SELECT NAME, PDB FROM DBA_SERVICES;

-- Check if PDB is plugged correctly
SELECT NAME, PLUGGED_IN FROM V$PDBS;

-- Check PDB undo mode
SHOW PARAMETER undo;

-- Any plug-in violations?

SELECT * FROM PDB_PLUG_IN_VIOLATIONS WHERE NAME='PDB_NAME';

-- Space, invalid objects, sessions

SELECT * FROM DBA_TABLESPACE_USAGE_METRICS;
SELECT COUNT(*) FROM V$SESSION;
SELECT * FROM USER_OBJECTS WHERE STATUS='INVALID';
```

**Common PDB Errors and Fixes (Cheat Sheet)**
1) ORA-01033: ORACLE initialization or shutdown in progress

Meaning: CDB (instance) is starting up / shutting down, so PDB isn’t usable.
Fix:

 Check instance / PDB state
```
SHOW PDBS;
-- If instance is up, open the PDB
ALTER PLUGGABLE DATABASE pdb_name OPEN;
```

2) ORA-01034: ORACLE not available

Meaning: Instance is down (CDB not started).
Fix:

```
STARTUP;
SHOW PDBS;
ALTER PLUGGABLE DATABASE ALL OPEN;
```

3) ORA-12154: TNS: could not resolve the connect identifier specified

Meaning: Client can’t resolve the connect string / service.
Fix checklist:

Verify tnsnames.ora entry OR use EZCONNECT.

Verify service exists and is registered.

Commands:

-- From DB side
```
SELECT NAME, PDB FROM DBA_SERVICES;
```


Example connect:

```
sqlplus user/pwd@//host:1521/pdb_service
```

4) ORA-12514: TNS: listener does not currently know of service requested

Meaning: Listener doesn’t know the PDB service (not registered / PDB closed).
Fix:

SHOW PDBS;
```
ALTER PLUGGABLE DATABASE pdb_name OPEN;
```


Also verify service:

```
SELECT NAME, PDB FROM DBA_SERVICES;
```

5) ORA-65011: Pluggable database <name> does not exist

Meaning: Wrong PDB name or you’re in wrong CDB.
Fix:

SHOW PDBS;
```
SELECT NAME FROM V$PDBS;
```

6) ORA-65019: Pluggable database <name> already exists

Meaning: You tried creating a PDB name that already exists.
Fix:

```
SHOW PDBS;     -- confirm existing
-- Use a new name OR drop old one (careful!)
DROP PLUGGABLE DATABASE pdb_name INCLUDING DATAFILES;
```

7) ORA-65016: FILE_NAME_CONVERT must be specified

Meaning: When creating/cloning PDB using file system, Oracle needs path mapping.
Fix (typical):

```
CREATE PLUGGABLE DATABASE pdb_new
FROM pdb_source
FILE_NAME_CONVERT = ('/oldpath/pdb_source/', '/newpath/pdb_new/');
```

Or set OMF:

```
SHOW PARAMETER db_create_file_dest;
```
8) ORA-65096: invalid common user or role name

Meaning: In CDB root, common users often must start with C## (depending on settings).
Fix options:

Create a local user in a PDB:

```
ALTER SESSION SET CONTAINER = pdb_name;
CREATE USER app_user IDENTIFIED BY pwd;
```


Or create a common user correctly in root:

```
ALTER SESSION SET CONTAINER = CDB$ROOT;
CREATE USER c##ops IDENTIFIED BY pwd CONTAINER=ALL;
```
9) ORA-01017: invalid username/password; logon denied

Meaning: Wrong credentials OR user not created in that PDB OR locked/expired.
Fix:
```
ALTER SESSION SET CONTAINER = pdb_name;


SELECT USERNAME, ACCOUNT_STATUS
FROM DBA_USERS
WHERE USERNAME = 'APP_USER';

-- Unlock / reset
ALTER USER app_user IDENTIFIED BY newpwd ACCOUNT UNLOCK;
```
10) ORA-65054 / ORA-65040: operation not allowed from within a pluggable database

Meaning: You ran a root-only operation from a PDB (common for admin tasks).
Fix:

```
ALTER SESSION SET CONTAINER = CDB$ROOT;
-- rerun the command
```
11) ORA-65025: Pluggable database is not open

Meaning: PDB is closed/mounted.
Fix:

```
ALTER PLUGGABLE DATABASE pdb_name OPEN;
SHOW PDBS;
```
12) ORA-65144 / ORA-65146: PDB plug-in violations / incompatible

Meaning: Plugging a PDB into a CDB failed compatibility checks (versions/options/patch level).
Fix approach:

Check violations:

```
SELECT NAME, CAUSE, TYPE, MESSAGE, STATUS
FROM PDB_PLUG_IN_VIOLATIONS
WHERE NAME = 'PDB_NAME'
ORDER BY TIME;
```

Fix the reported incompatibility (patch mismatch, option mismatch, etc.)

Retry open:

```
ALTER PLUGGABLE DATABASE pdb_name OPEN;
```
13) ORA-04068: existing state of packages has been discarded

Meaning: Package state reset (often after recompilation/DDL). Common in long sessions using package variables.
Fix:

Re-run the operation; ensure package is valid.

Check invalid objects:

```
SELECT OBJECT_NAME, OBJECT_TYPE
FROM   DBA_OBJECTS
WHERE  STATUS='INVALID'
AND    OWNER='YOUR_SCHEMA';

```
Recompile:

```
EXEC UTL_RECOMP.RECOMP_SERIAL();
```
14) ORA-00020: maximum number of processes exceeded / connection storms

Meaning: Too many sessions/processes at CDB level impacting PDB availability.
Fix:

```
-- Find active sessions (in the relevant container)
SELECT COUNT(*) FROM V$SESSION WHERE USERNAME IS NOT NULL;

-- Kill runaway sessions if necessary
ALTER SYSTEM KILL SESSION 'sid,serial#' IMMEDIATE;
```

(Also adjust processes/sessions at system level if approved.)

15) Tablespace Full / ORA-01653 unable to extend ...

Meaning: PDB tablespace ran out of space.
Fix:

```
ALTER SESSION SET CONTAINER = pdb_name;

-- Identify usage
SELECT TABLESPACE_NAME, USED_SPACE, TABLESPACE_SIZE
FROM DBA_TABLESPACE_USAGE_METRICS;

-- Add datafile / resize
ALTER TABLESPACE users ADD DATAFILE '.../users02.dbf' SIZE 2G AUTOEXTEND ON;
```