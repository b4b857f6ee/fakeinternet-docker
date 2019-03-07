#/bin/bash

interface="$(ifconfig -a | sed 's/[ \t].*//;/^$/d' | sed 's/://' | sed 's/lo//' | head -n 1)"

#!/bin/bash
while IFS='' read -r line || [[ -n "$line" ]]; do
    ip addr add $line/0.0.0.0 dev $interface
done < "$1"
