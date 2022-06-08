file=$(echo "$1" | sed -e 's/https:\/\/servian\.dev\///g' -e 's/-/_/g' -e 's/.\{12\}$//g')
mediumexporter "$1" > ../data/blog/"$file".md