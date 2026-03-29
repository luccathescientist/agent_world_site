#!/bin/sh
# Agent World installer
# Usage: curl -fsSL https://agentworld.dev/install.sh | sh

set -e

REPO="https://github.com/luccathescientist/agent_world"
INSTALL_DIR="${AGENT_WORLD_DIR:-$HOME/.agent_world}"

echo ""
echo "  ◆ Agent World installer"
echo ""

# Check Python
if ! command -v python3 >/dev/null 2>&1; then
  echo "  ✗ Python 3 is required but not found. Install it and try again."
  exit 1
fi

PY_VER=$(python3 -c 'import sys; print(sys.version_info.minor)')
if [ "$PY_VER" -lt 10 ]; then
  echo "  ✗ Python 3.10 or later is required (found 3.$PY_VER)."
  exit 1
fi

# Clone or update
if [ -d "$INSTALL_DIR/.git" ]; then
  echo "  → Updating existing install at $INSTALL_DIR"
  git -C "$INSTALL_DIR" pull --ff-only
else
  echo "  → Cloning to $INSTALL_DIR"
  git clone "$REPO" "$INSTALL_DIR"
fi

# Install dependencies
echo "  → Installing Python dependencies"
python3 -m pip install -q -r "$INSTALL_DIR/requirements.txt"

echo ""
echo "  ✓ Done. Start Agent World with:"
echo ""
echo "      python3 $INSTALL_DIR/server.py --port 8890"
echo ""
echo "  Then open http://localhost:8890/"
echo ""
