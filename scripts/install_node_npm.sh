#!/bin/bash

sudo apt-get update -y  # For Ubuntu or other Debian-based systems

# Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -  
sudo apt-get install -y nodejs   # For Ubuntu or other Debian-based systems

# Verify installation
node -v
npm -v
