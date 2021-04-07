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
