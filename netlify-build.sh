#!/bin/bash
set -e

echo "🔧 Custom Netlify build script starting..."

# 1. Optional: print current directory
pwd

# 2. Optional: show environment info
echo "🔍 Node version: $(node -v)"
echo "🔍 NPM version: $(npm -v)"
echo "🔍 Python version: $(python3 --version)"
echo "🔍 Pip version: $(pip3 --version)"

# 3. Install AWS CLI
echo "📦 Installing AWS CLI..."
pip3 install --user awscli

# 4. Setup environment variables for AWS CLI if needed
# export PATH=$PATH:~/.local/bin

# 5. Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

# 6. Run your build step
echo "🚧 Building project..."
npm run build

echo "✅ Build complete!"
