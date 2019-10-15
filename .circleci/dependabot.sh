branch=$(git branch | grep \* | cut -d ' ' -f2)
lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
lastCommitClean=$lastCommit
lastDependabot=$(git log --author="clairesunstudio" --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
commitType="Changed"
# the filename that will be committed ends with the slugified version of the commit message starting from index 5 to index 20
# e.g. if the commit message is Bump react-scripts from 1.00 to 2.00 it will be saved as dependabot-react-scripts-fr.md
fileName=$(echo ${lastCommit:5:20} | iconv -t ascii//TRANSLIT | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9-]+/-/g' | sed -E 's/^-+|-+$//g' | tr A-Z a-z)
echo $fileName
if [[ $lastCommitClean =~ "[Security]"[[:space:]](.*) ]]; then
  lastCommitClean="${BASH_REMATCH[1]}"
  commitType="Security"
fi

if [[ $lastCommitClean =~ "/react" ]]; then
  lastCommitClean="(React) [Dependency] $lastCommitClean"
fi
if [[ $lastCommitClean =~ "/patternlab" ]]; then
  lastCommitClean="(Patternlab) [Dependency] $lastCommitClean"
fi

if [ "$lastCommit" = "$lastDependabot" ]
then
  printf "\n$commitType\n- $lastCommitClean" > changelogs/dependabot-${fileName}.md
  git add changelogs/dependabot-${branch##*/}.md
  git commit -m "Added a new changelog to the `changelogs/` folder"
  echo "Commit dependabot changelog";
  git push -u origin $branch
else
  echo "No changelog added"
fi
