#!/bin/bash

# Path to the packages.json
PACKAGES_JSON="package.json"

# Check if packages.json exists
if [[ ! -f "$PACKAGES_JSON" ]]; then
  echo "Error: package.json not found in dist/"
  exit 1
fi

# Read the packages.json and iterate over each package
jq -r '.packages[]' "$PACKAGES_JSON" | while read package; do
  # Define the path to the package.json for each package
  PACKAGE_JSON="dist/$package/package.json"

  # Check if the package.json exists
  if [[ -f "$PACKAGE_JSON" ]]; then
    echo "Updating version for package: $package"

    # Update the version in the package.json
    jq --arg version "$VERSION" '.version = $version' "$PACKAGE_JSON" > tmp.json && mv tmp.json "$PACKAGE_JSON"

    echo "Version updated to $VERSION for package: $package"
  else
    echo "Error: package.json not found for $PACKAGE_JSON"
  fi
done

echo "Version update completed for all packages."
