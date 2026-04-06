#!/bin/bash
cd /vercel/share/v0-project
git add -A
git commit -m "refactor: Reorganize project into proper MERN stack structure

- Separated frontend into client/ folder with proper React structure
- Separated backend into server/ folder with MVC pattern
- Organized components, pages, context, and API utilities
- Organized models, controllers, routes, and middleware
- Added proper package.json files for both client and server
- Added root package.json with concurrent dev scripts
- Added .env.example for environment configuration

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>"
git push origin organize-code
