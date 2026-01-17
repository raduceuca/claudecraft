#!/bin/bash

# init.sh - Initialize a new project from this template
# Usage: ./scripts/init.sh <project-name> [destination]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")"

show_help() {
    echo -e "${BLUE}init.sh${NC} - Initialize a new project from this template"
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./scripts/init.sh <project-name> [destination]"
    echo ""
    echo -e "${YELLOW}Arguments:${NC}"
    echo "  project-name  Name for your new project (required)"
    echo "  destination   Parent directory (default: current directory)"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./scripts/init.sh my-app"
    echo "  ./scripts/init.sh my-app ~/projects"
    echo ""
    echo -e "${YELLOW}What it does:${NC}"
    echo "  1. Copies template to destination"
    echo "  2. Updates package.json and index.html with project name"
    echo "  3. Updates CLAUDE.md with project name"
    echo "  4. Initializes git repository"
    echo "  5. Installs dependencies with bun"
}

if [[ $# -eq 0 ]] || [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]]; then
    show_help
    exit 0
fi

PROJECT_NAME="$1"
DESTINATION="${2:-.}"
PROJECT_PATH="$DESTINATION/$PROJECT_NAME"

# Validate
if [[ -z "$PROJECT_NAME" ]]; then
    echo -e "${RED}Error:${NC} Project name is required"
    exit 1
fi

if [[ -d "$PROJECT_PATH" ]]; then
    echo -e "${RED}Error:${NC} Directory already exists: $PROJECT_PATH"
    exit 1
fi

# Check for bun
if ! command -v bun &> /dev/null; then
    echo -e "${RED}Error:${NC} bun is not installed."
    echo "Install it with: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo -e "${BLUE}Creating new project...${NC}"
echo ""
echo "  Name:        $PROJECT_NAME"
echo "  Destination: $PROJECT_PATH"
echo ""

# Create destination
mkdir -p "$DESTINATION"

# Copy template (excluding scripts/init.sh itself and .git)
echo -e "${YELLOW}[1/5]${NC} Copying template..."
cp -r "$TEMPLATE_DIR" "$PROJECT_PATH"
rm -rf "$PROJECT_PATH/.git"
rm -f "$PROJECT_PATH/scripts/init.sh"
rmdir "$PROJECT_PATH/scripts" 2>/dev/null || true

# Update package.json
echo -e "${YELLOW}[2/5]${NC} Updating package.json..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\"name\": \"project-name\"/\"name\": \"$PROJECT_NAME\"/" "$PROJECT_PATH/package.json"
    sed -i '' "s/<title>Project Name<\/title>/<title>${PROJECT_NAME}<\/title>/" "$PROJECT_PATH/index.html"
else
    sed -i "s/\"name\": \"project-name\"/\"name\": \"$PROJECT_NAME\"/" "$PROJECT_PATH/package.json"
    sed -i "s/<title>Project Name<\/title>/<title>${PROJECT_NAME}<\/title>/" "$PROJECT_PATH/index.html"
fi

# Update CLAUDE.md
echo -e "${YELLOW}[3/5]${NC} Updating CLAUDE.md..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/Brief description of what this project does/${PROJECT_NAME} - Brief description of what this project does/" "$PROJECT_PATH/CLAUDE.md"
else
    sed -i "s/Brief description of what this project does/${PROJECT_NAME} - Brief description of what this project does/" "$PROJECT_PATH/CLAUDE.md"
fi

# Initialize git
echo -e "${YELLOW}[4/5]${NC} Initializing git..."
cd "$PROJECT_PATH"
git init -q
git add .
git commit -q -m "Initial commit from claude-code-template"

# Install dependencies
echo -e "${YELLOW}[5/5]${NC} Installing dependencies with bun..."
bun install

echo ""
echo -e "${GREEN}Project created successfully!${NC}"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_PATH"
echo "  bun dev"
echo ""
