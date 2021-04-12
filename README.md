# vaccine-now-plz

A node CLI tool for checking CVS's covid vaccine availability, because who really enjoys using the internet anyhow

To run from your terminal:
- `git clone git@github.com:ShaynaCummings/vaccine-now-plz.git`
- `cd vaccine-now-plz`
- `node cvs.js`

If you want this script to run every X minutes, run `npm install node-cron` inside the repo and uncomment all lines marked with `cron`. Your terminal will make a beep sound when vaccines are available!

You can also further customize this script by: 
- substituting in a different state abbreviation
- limiting the results to specific cities

## Scheduling protips

- These appointments fill up FAST so be ready to move quickly
- Once there are appts, you need to go to the CVS website to fill out some info and select your state from the dropdown
- Have a list ready of zip codes that you are willing to travel to. At least in MA, it uses a 35 mile perimeter to show 'nearby' locations, so if you are able, try multiple zip codes
- The areas in MA with the most CVSes are Boston and Worcester, followed by Brockton, Cambridge/Somerville, Peabody/Salem area, Springfield area, Framingham area
- Have your insurance and prescription insurance (if that's different) cards / member info ready
- If you're getting a 2-dose vaccine it will ask you to book both appts today, so know your availability for 3-4 weeks from now