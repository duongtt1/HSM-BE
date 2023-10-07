#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    # sudo apt-get update
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed."
fi

# Enable `npm` and set Node.js version
source ~/.nvm/nvm.sh

URL_REPO="https://github.com/duongtt1/HSM-BE.git"
DIR_REPO="$HOME/repo"
APP_NAME="HSMBE"
MAIN_SCRIPT="app.js"

# Function to clean up existing repository
cleanup_repo() {
    if [ -d "$DIR_REPO" ]; then
        rm -rf "$DIR_REPO"
        echo "Removed existing repository."
    fi
}

# Clone the repository and install dependencies
clone_and_install() {
    git clone "$URL_REPO" "$DIR_REPO"
    cd "$DIR_REPO" || exit 1
    npm install
    echo "Cloned repository and installed dependencies."
}

# Restart or start the application with pm2
manage_application() {
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 restart "$APP_NAME"
        echo "Application restarted."
    else
        pm2 start "$MAIN_SCRIPT" --name "$APP_NAME"
        echo "Application started."
    fi
}

# Main execution
cleanup_repo
clone_and_install
manage_application
