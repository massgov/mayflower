branch=$(git branch | grep \* | cut -d ' ' -f2)
lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
lastCommitClean=$lastCommit
lastDependabot=$(git log --author="dependabot-preview" --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
commitType="Changed"
project="Patternlab, React"
component="Dependency"

if [[ $lastCommitClean =~ "[Security]"[[:space:]](.*) ]]; then
  lastCommitClean="${BASH_REMATCH[1]}"
  commitType="Security"
fi

if [[ $lastCommitClean =~ "/react" ]]; then
  project="React"
fi
if [[ $lastCommitClean =~ "/patternlab" ]]; then
  project="Patternlab"
fi

if [ "$lastCommit" = "$lastDependabot" ]
then
  printf "\n$commitType:
          \n- project: $lastCommitClean
          \n\s\scomponent: $component
          " > changelogs/dependabot-${branch##*/}.yml
  git add changelogs/dependabot-${branch##*/}.yml
  git commit -m "Added a new changelog to the `changelogs/` folder"
  echo "Commit dependabot changelog";
  git push -u origin $branch
else
  echo "No changelog added"
fi
