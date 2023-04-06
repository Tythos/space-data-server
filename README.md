# space data server

Space Data Server is an open-source software package that helps integrators get started including data standards from [SpaceDataStandards.org](https://spacedatastandards.org) into their workflows. ([Demo](https://api.spaceaware.io), under heavy development)
The SDS acts as a "waypoint" for ingestion / data services, allowing integrators to ingest data from any source (ex., Celestrak OMM).

[More information here](https://app.gitbook.com/o/Xod6MiZmdLiHApjIyioA/s/HPyJlS0CKXWqCdd5kz6y/space-data-server).

## TODO

- [x] Install script with service
- [x] Update server key from Ethereum key
- [x] Limit / delete based on time || number of files
- [x] Change 'localspacedata' to another name and fix API docs
- [x] Add querystring formatting options
- [x] Get IPFS folder hash published to IPFS and add it to server data
- [x] Change server data to just read the 'serverinfo.json' file in root, maybe rename it
- [ ] Host manifest.json in local API
- [ ] Add code examples
- [ ] Change to use default path for Ethereum wallet for compatibility
- [ ] Add a "add default server key" to the Admin Settings UI if the server key isn't trusted yet
- [ ] Add an "export settings" button
- [ ] Add export options for the user
- [ ] IPFS network address node addition to config
- [ ] API goes and gets file from IPFS network address
- [ ] IPFS pinning / unpinning config
- [ ] Data UI
- [ ] Document ingest api {filename}.STD.fbs
- [ ] Data matrix
- [ ] Home page & About Page
- [ ] Data parser service
- [ ] Use vCard for server