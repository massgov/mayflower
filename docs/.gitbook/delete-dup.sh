#!/bin/bash
#
# Usage:  ./delete-duplicates.sh  [<files...>]
#
declare -A filecksums

# No args, use files in current directory
test 0 -eq $# && set -- assets/*

for file in "$@"
do
    # Files only (also no symlinks)
    [[ -f "$file" ]] && [[ ! -h "$file" ]] || continue

    # Generate the checksum
    cksum=$(cksum <"$file" | tr ' ' _)

    # Have we already got this one?
    if [[ -n "${filecksums[$cksum]}" ]] && [[ "${filecksums[$cksum]}" != "$file" ]]
    then
        echo "Found '$file' is a duplicate of '${filecksums[$cksum]}'" >&2
        rm -f "$file"
    else
        filecksums[$cksum]="$file"
    fi
done

#rename file names with duplicates, e.g. button (1).png
find . -type f -name "* *" -exec rename "s/\s\([0-9]+\)//g" {} \;