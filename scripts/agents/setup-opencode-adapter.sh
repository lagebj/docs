#!/bin/bash

# Setup script for opencode agent adapter
# Ensures opencode command is accessible in PATH

set -e

echo "Setting up opencode agent adapter..."

# Check if opencode is already in PATH
if command -v opencode &> /dev/null; then
    echo "opencode command is already accessible in PATH"
else
    # Check if opencode binary exists in common locations
    if [ -f "/usr/local/bin/opencode" ]; then
        echo "opencode binary found at /usr/local/bin/opencode"
    elif [ -f "./node_modules/.bin/opencode" ]; then
        echo "opencode binary found at ./node_modules/.bin/opencode"
        # Add to PATH for current session
        export PATH="./node_modules/.bin:$PATH"
    else
        echo "opencode binary not found. Please install opencode first."
        exit 1
    fi
fi

# Verify the adapter configuration
CONFIG_FILE="agents/config/cmo-agent-adapter.config.json"
if [ -f "$CONFIG_FILE" ]; then
    echo "Adapter configuration file found at $CONFIG_FILE"
    echo "Configuration:"
    cat "$CONFIG_FILE"
else
    echo "Adapter configuration file not found at $CONFIG_FILE"
    exit 1
fi

echo "opencode agent adapter setup completed successfully!"