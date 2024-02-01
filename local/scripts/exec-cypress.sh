#!/bin/bash

echo "Installing the assets (takes a while!)"
rm -rf "${ROOT}/node_modules"
cd "${ROOT}"
npm ci

echo "Start creating cypress.config.js from Joomla configuration.php"
source  ${ROOT}/scripts/config-setup.sh

echo "Start Cypress"
cypress open --project ${ROOT}/tests --e2e

exit 1