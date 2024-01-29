#!/bin/bash

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
parent_dir="$(dirname "$script_dir")"
source_file="$script_dir/fly.tmpl.toml"
destination_file="$parent_dir/fly.toml"

export $(cat "$parent_dir/.env" | xargs)

cp $source_file $destination_file

while IFS= read -r line; do
    if [[ "$line" == *"BUILD_"* ]]; then
        env_var_name=$(echo "$line" | sed -n 's/.*"BUILD_\([^"]*\)".*/\1/p')
        env_var_value=$(printenv "$env_var_name")
        if [ ! -z "$env_var_value" ]; then
            sed -i "s|BUILD_$env_var_name|$env_var_value|g" $destination_file
        fi
    fi
done < $destination_file
